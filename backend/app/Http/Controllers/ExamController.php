<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ExamController extends Controller
{
    /**
     * Submit exam results and generate certificate if passed
     */
    public function submitExam(Request $request, $courseId)
    {
        $request->validate([
            'score' => 'required|integer|min:0|max:100',
            'answers' => 'sometimes|array',
            'time_taken' => 'sometimes|integer|min:0',
        ]);

        $user = Auth::user();
        
        // Check if course exists
        $course = Course::findOrFail($courseId);
        
        // Find user's enrollment
        $enrollment = Enrollment::where('user_id', $user->id)
                                ->where('course_id', $courseId)
                                ->firstOrFail();

        // Prevent resubmission if already passed
        if ($enrollment->completed) {
            return response()->json([
                'message' => 'You have already completed this course!',
                'certificate_number' => $enrollment->certificate_number,
                'score' => $enrollment->exam_score
            ], 409);
        }

        $score = $request->score;
        $passingScore = 70; // You can make this configurable per course
        
        // Calculate percentage if needed
        if ($request->has('total_questions') && $request->has('correct_answers')) {
            $total = $request->total_questions;
            $correct = $request->correct_answers;
            $score = ($correct / $total) * 100;
        }

        if ($score >= $passingScore) {
            // Generate unique certificate number
            $certificateNumber = 'APEX-' . strtoupper(Str::random(8)) . '-' . date('Ymd');
            
            $enrollment->update([
                'completed' => true,
                'exam_score' => $score,
                'certificate_number' => $certificateNumber,
                'certificate_issued_at' => now(),
                'completed_at' => now(),
                'status' => 'completed',
            ]);

            // Generate PDF certificate (you'll implement this separately)
            // $this->generateCertificate($enrollment);

            return response()->json([
                'message' => 'Congratulations! You passed the exam.',
                'score' => $score,
                'certificate_number' => $certificateNumber,
                'certificate_url' => route('certificate.download', $certificateNumber), // Define this route
                'course_title' => $course->title,
                'completion_date' => now()->format('F d, Y'),
            ], 200);
        }

        // User failed the exam
        $enrollment->update([
            'exam_score' => $score,
            'status' => 'active', // Keep active to allow retake
        ]);

        return response()->json([
            'message' => 'You did not pass the exam. Minimum passing score is ' . $passingScore . '%.',
            'score' => $score,
            'required_score' => $passingScore,
            'attempts_left' => 3 - $enrollment->exam_attempts, // Example: 3 attempts allowed
            'retake_available' => true,
        ], 200); // Return 200 even for failure, but with success: false
    }

    /**
     * Get exam questions for a course
     */
    public function getExamQuestions($courseId)
    {
        $user = Auth::user();
        
        // Check enrollment
        $enrollment = Enrollment::where('user_id', $user->id)
                                ->where('course_id', $courseId)
                                ->firstOrFail();

        // Check if user has already passed
        if ($enrollment->completed) {
            return response()->json([
                'message' => 'You have already completed this course',
                'certificate_number' => $enrollment->certificate_number
            ], 403);
        }

        // Check exam attempts limit (example: 3 attempts)
        if ($enrollment->exam_attempts >= 3) {
            return response()->json([
                'message' => 'Maximum exam attempts reached. Please contact support.',
                'attempts' => $enrollment->exam_attempts
            ], 403);
        }

        // Get course
        $course = Course::findOrFail($courseId);
        
        // In a real app, fetch questions from database
        $questions = [
            [
                'id' => 1,
                'question' => 'What is Laravel?',
                'type' => 'multiple_choice',
                'options' => [
                    'A PHP framework',
                    'A JavaScript library',
                    'A CSS framework',
                    'A database system'
                ],
                'correct_answer' => 'A PHP framework',
                'points' => 10,
            ],
            [
                'id' => 2,
                'question' => 'Explain MVC architecture.',
                'type' => 'short_answer',
                'points' => 20,
            ],
            // Add more questions...
        ];

        // Increment exam attempts
        $enrollment->increment('exam_attempts');

        return response()->json([
            'course_title' => $course->title,
            'questions' => $questions,
            'total_points' => 100,
            'passing_score' => 70,
            'time_limit' => 3600, // seconds
            'instructions' => 'You have 1 hour to complete the exam. Minimum passing score is 70%.',
        ]);
    }

    /**
     * Check exam eligibility
     */
    public function checkEligibility($courseId)
    {
        $user = Auth::user();
        
        $enrollment = Enrollment::where('user_id', $user->id)
                                ->where('course_id', $courseId)
                                ->firstOrFail();

        // Check course completion prerequisites
        $completedLessons = $user->completedLessons($courseId)->count(); // You need to implement this
        $totalLessons = $course->lessons()->count();
        
        $progress = $completedLessons / $totalLessons * 100;
        $minProgressRequired = 80; // Must complete 80% of course before exam

        return response()->json([
            'eligible' => $progress >= $minProgressRequired && !$enrollment->completed && $enrollment->exam_attempts < 3,
            'progress' => $progress,
            'required_progress' => $minProgressRequired,
            'completed' => $enrollment->completed,
            'exam_attempts' => $enrollment->exam_attempts,
            'max_attempts' => 3,
            'certificate_issued' => (bool) $enrollment->certificate_number,
        ]);
    }

    /**
     * Generate certificate PDF (placeholder)
     */
    private function generateCertificate($enrollment)
    {
        // You'll need to implement PDF generation
        // Example with DomPDF or TCPDF:
        // $pdf = PDF::loadView('certificates.course', compact('enrollment'));
        // $path = 'certificates/' . $enrollment->certificate_number . '.pdf';
        // Storage::put($path, $pdf->output());
        // $enrollment->update(['certificate_path' => $path]);
        
        return true;
    }

    /**
     * Download certificate
     */
    public function downloadCertificate($certificateNumber)
    {
        $enrollment = Enrollment::where('certificate_number', $certificateNumber)
                                ->where('user_id', Auth::id())
                                ->firstOrFail();

        if (!$enrollment->certificate_path || !Storage::exists($enrollment->certificate_path)) {
            // Generate if not exists
            $this->generateCertificate($enrollment);
            $enrollment->refresh();
        }

        return response()->download(
            storage_path('app/' . $enrollment->certificate_path),
            'APEX-Certificate-' . $certificateNumber . '.pdf'
        );
    }
}