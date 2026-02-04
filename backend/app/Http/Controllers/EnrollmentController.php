<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\Certificate;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class EnrollmentController extends Controller
{
    /**
     * Display all enrollments (admin or overview)
     */
    public function index(Request $request)
    {
        // Check if user is admin or get their own enrollments
        $user = $request->user();

        if ($user->is_admin) {
            $enrollments = Enrollment::with(['user', 'course'])
                ->latest()
                ->paginate(20);
        } else {
            // For non-admin users, return their own enrollments
            $enrollments = Enrollment::where('user_id', $user->id)
                ->with('course')
                ->latest()
                ->paginate(20);
        }

        return response()->json([
            'success' => true,
            'data' => $enrollments
        ]);
    }

    /**
     * Get authenticated user's enrollments
     */
    public function myEnrollments(Request $request)
    {
        $user = $request->user();

        $enrollments = Enrollment::where('user_id', $user->id)
            ->with([
                'course' => function ($query) {
                    $query->select('id', 'title', 'description', 'thumbnail', 'price', 'duration');
                }
            ])
            ->latest()
            ->paginate(10);

        // Add summary statistics
        $summary = [
            'total' => Enrollment::where('user_id', $user->id)->count(),
            'completed' => Enrollment::where('user_id', $user->id)
                ->where('status', 'completed')
                ->count(),
            'in_progress' => Enrollment::where('user_id', $user->id)
                ->where('status', 'active')
                ->count(),
            'pending' => Enrollment::where('user_id', $user->id)
                ->where('status', 'pending')
                ->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $enrollments,
            'summary' => $summary
        ]);
    }

    /**
     * Display a specific enrollment
     */
    public function show($id)
    {
        $enrollment = Enrollment::with(['user', 'course', 'progressUpdates'])
            ->findOrFail($id);

        // Authorization: User can only view their own enrollment unless admin
        if (!Auth::user()->is_admin && $enrollment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Add certificate info if completed
        if ($enrollment->status === 'completed') {
            $certificate = Certificate::where('enrollment_id', $enrollment->id)->first();
            $enrollment->certificate = $certificate;
        }

        return response()->json([
            'success' => true,
            'data' => $enrollment
        ]);
    }

    /**
     * Update enrollment progress
     */
    public function updateProgress(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'progress_percentage' => 'required|numeric|min:0|max:100',
            'progress_hours' => 'nullable|numeric|min:0',
            'last_lesson_completed' => 'nullable|string',
            'notes' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $enrollment = Enrollment::findOrFail($id);

        // Authorization: User can only update their own enrollment
        if ($enrollment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $oldProgress = $enrollment->progress_percentage;

        $enrollment->update([
            'progress_percentage' => $request->progress_percentage,
            'progress_hours' => $request->progress_hours ?? $enrollment->progress_hours,
            'last_accessed_at' => now(),
        ]);

        // If progress reached 100%, mark as completed
        if ($request->progress_percentage >= 100 && $enrollment->status !== 'completed') {
            $enrollment->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);

            // Generate certificate
            $this->generateCertificate($enrollment);
        }

        // Record progress update
        if ($request->progress_percentage > $oldProgress) {
            $enrollment->progressUpdates()->create([
                'progress_percentage' => $request->progress_percentage,
                'progress_hours' => $request->progress_hours ?? 0,
                'lesson_completed' => $request->last_lesson_completed,
                'notes' => $request->notes,
            ]);
        }

        return response()->json([
            'message' => 'Progress updated successfully',
            'enrollment' => $enrollment->fresh(['course', 'progressUpdates'])
        ]);
    }

    /**
     * Download certificate for an enrollment
     */
    public function downloadCertificate($id)
    {
        $enrollment = auth()->user()->enrollments()
            ->with('course')
            ->findOrFail($id);

        if ($enrollment->status !== 'completed') {
            return response()->json(['error' => 'Course not completed'], 403);
        }

        // Get or create certificate
        $certificate = Certificate::firstOrCreate(
            ['enrollment_id' => $enrollment->id],
            [
                'user_id' => auth()->id(),
                'course_id' => $enrollment->course_id,
                'certificate_number' => $this->generateCertificateNumber(),
                'issue_date' => now(),
                'expiry_date' => now()->addYears(2),
            ]
        );

        // Generate PDF
        $pdf = Pdf::loadView('certificates.certificate', [
            'user' => auth()->user(),
            'course' => $enrollment->course,
            'enrollment' => $enrollment,
            'certificate' => $certificate,
            'issue_date' => $enrollment->completed_at ?? now(),
            'completion_date' => $enrollment->completed_at ?? now(),
            'certificate_number' => $certificate->certificate_number
        ]);

        $filename = "Apex_Certificate_{$certificate->certificate_number}.pdf";

        return $pdf->download($filename);
    }

    /**
     * Enroll in a course (called from CourseController)
     */
    public function enroll(Request $request, Course $course)
    {
        $user = $request->user();

        // Check if already enrolled
        $existingEnrollment = Enrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existingEnrollment) {
            return response()->json([
                'message' => 'Already enrolled in this course',
                'enrollment' => $existingEnrollment
            ], 200);
        }

        // Create enrollment
        $enrollment = Enrollment::create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'status' => 'active',
            'enrolled_at' => now(),
            'progress_percentage' => 0,
            'progress_hours' => 0,
        ]);

        // Send enrollment notification
        // Mail::to($user->email)->send(new CourseEnrollmentMail($user, $course, $enrollment));

        return response()->json([
            'message' => 'Successfully enrolled in course',
            'enrollment' => $enrollment->load('course')
        ], 201);
    }

    /**
     * Cancel enrollment
     */
    public function cancelEnrollment($id)
    {
        $enrollment = Enrollment::findOrFail($id);

        // Authorization
        if ($enrollment->user_id !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Can only cancel active enrollments
        if ($enrollment->status !== 'active') {
            return response()->json([
                'error' => 'Only active enrollments can be cancelled'
            ], 422);
        }

        $enrollment->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);

        return response()->json([
            'message' => 'Enrollment cancelled successfully',
            'enrollment' => $enrollment
        ]);
    }

    /**
     * Generate certificate for completed enrollment
     */
    private function generateCertificate($enrollment)
    {
        // Check if certificate already exists
        $existingCertificate = Certificate::where('enrollment_id', $enrollment->id)->first();

        if ($existingCertificate) {
            return $existingCertificate;
        }

        // Generate certificate
        $certificate = Certificate::create([
            'user_id' => $enrollment->user_id,
            'course_id' => $enrollment->course_id,
            'enrollment_id' => $enrollment->id,
            'certificate_number' => $this->generateCertificateNumber(),
            'issue_date' => now(),
            'expiry_date' => now()->addYears(2),
            'grades' => $this->calculateGrades($enrollment),
            'metadata' => [
                'completion_date' => $enrollment->completed_at,
                'course_duration' => $enrollment->course->duration ?? 'N/A',
                'final_score' => $enrollment->final_score ?? null,
            ]
        ]);

        return $certificate;
    }

    /**
     * Generate unique certificate number
     */
    private function generateCertificateNumber()
    {
        $prefix = 'APEX-';
        $year = date('Y');
        $random = strtoupper(substr(md5(uniqid()), 0, 8));

        return $prefix . $year . '-' . $random;
    }

    /**
     * Calculate grades for certificate
     */
    private function calculateGrades($enrollment)
    {
        // Implement your grading logic here
        // This could be based on exam scores, assignments, etc.

        $progress = $enrollment->progress_percentage;

        if ($progress >= 90)
            return 'A+';
        if ($progress >= 80)
            return 'A';
        if ($progress >= 70)
            return 'B+';
        if ($progress >= 60)
            return 'B';
        if ($progress >= 50)
            return 'C';
        return 'D';
    }

    /**
     * Get enrollment statistics
     */
    public function statistics(Request $request)
    {
        $user = $request->user();

        $totalEnrollments = Enrollment::where('user_id', $user->id)->count();
        $completedEnrollments = Enrollment::where('user_id', $user->id)
            ->where('status', 'completed')
            ->count();
        $activeEnrollments = Enrollment::where('user_id', $user->id)
            ->where('status', 'active')
            ->count();
        $totalLearningHours = Enrollment::where('user_id', $user->id)
            ->sum('progress_hours');

        $recentEnrollments = Enrollment::where('user_id', $user->id)
            ->with('course')
            ->latest()
            ->take(5)
            ->get();

        $courseCategories = Course::whereIn('id', function ($query) use ($user) {
            $query->select('course_id')
                ->from('enrollments')
                ->where('user_id', $user->id);
        })
            ->groupBy('category')
            ->select('category', \DB::raw('count(*) as count'))
            ->get();

        return response()->json([
            'statistics' => [
                'total_enrollments' => $totalEnrollments,
                'completed_courses' => $completedEnrollments,
                'active_courses' => $activeEnrollments,
                'total_learning_hours' => $totalLearningHours,
                'completion_rate' => $totalEnrollments > 0
                    ? round(($completedEnrollments / $totalEnrollments) * 100, 1)
                    : 0,
            ],
            'recent_enrollments' => $recentEnrollments,
            'course_categories' => $courseCategories,
        ]);
    }

    /**
     * Mark lesson as completed
     */
    public function markLessonCompleted(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'lesson_id' => 'required|string',
            'lesson_title' => 'required|string',
            'duration_minutes' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $enrollment = Enrollment::findOrFail($id);

        if ($enrollment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Update completion data
        $completedLessons = $enrollment->completed_lessons ?? [];
        if (!in_array($request->lesson_id, $completedLessons)) {
            $completedLessons[] = $request->lesson_id;
        }

        // Calculate progress based on completed lessons
        // This assumes you have a total_lessons field in the course
        $totalLessons = $enrollment->course->total_lessons ?? 10;
        $progressPercentage = min(100, round((count($completedLessons) / $totalLessons) * 100, 2));

        $enrollment->update([
            'completed_lessons' => $completedLessons,
            'progress_percentage' => $progressPercentage,
            'progress_hours' => $enrollment->progress_hours + ($request->duration_minutes / 60),
            'last_accessed_at' => now(),
            'last_lesson_completed' => $request->lesson_title,
        ]);

        // Record progress update
        $enrollment->progressUpdates()->create([
            'progress_percentage' => $progressPercentage,
            'progress_hours' => $enrollment->progress_hours,
            'lesson_completed' => $request->lesson_title,
            'lesson_id' => $request->lesson_id,
            'notes' => 'Lesson completed',
        ]);

        return response()->json([
            'message' => 'Lesson marked as completed',
            'enrollment' => $enrollment->fresh(),
            'progress' => $progressPercentage
        ]);
    }
}