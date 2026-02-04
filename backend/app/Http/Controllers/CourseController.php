<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of courses.
     */
    public function index()
    {
        try {
            $courses = Course::all();

            return response()->json([
                'success' => true,
                'data' => $courses
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch courses',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified course.
     */
    public function show($id)
    {
        try {
            $course = Course::with(['lessons', 'exam'])->find($id);

            if (!$course) {
                return response()->json([
                    'success' => false,
                    'message' => 'Course not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $course
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch course',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Enroll in a course.
     */
    public function enroll(Request $request, $courseId)
    {
        try {
            $user = Auth::user();

            // Check if already enrolled
            $existingEnrollment = Enrollment::where('user_id', $user->id)
                ->where('course_id', $courseId)
                ->first();

            if ($existingEnrollment) {
                return response()->json([
                    'success' => true,
                    'message' => 'Already enrolled in this course',
                    'data' => $existingEnrollment
                ]);
            }

            $enrollment = Enrollment::create([
                'user_id' => $user->id,
                'course_id' => $courseId,
                'status' => 'active',
                'enrolled_at' => now(),
                'progress_percentage' => 0,
                'progress_hours' => 0
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Successfully enrolled in course',
                'data' => $enrollment
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to enroll in course',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user's enrolled courses.
     */
    public function myCourses()
    {
        try {
            $user = Auth::user();
            $enrollments = Enrollment::where('user_id', $user->id)
                ->with('course')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $enrollments
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch your courses',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
