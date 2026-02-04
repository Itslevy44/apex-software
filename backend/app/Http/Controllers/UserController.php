<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Order;
use App\Models\Enrollment;
use App\Models\Certificate;

class UserController extends Controller
{
    /**
     * Get user's achievements
     */
    public function achievements(Request $request)
    {
        $user = $request->user();

        // Get completed courses
        $completedCourses = Enrollment::where('user_id', $user->id)
            ->where('status', 'completed')
            ->with('course')
            ->get();

        // Get certificates
        $certificates = Certificate::where('user_id', $user->id)
            ->with('course')
            ->get();

        // Get learning statistics
        $totalLearningHours = Enrollment::where('user_id', $user->id)
            ->sum('progress_hours');

        $activeEnrollments = Enrollment::where('user_id', $user->id)
            ->where('status', 'active')
            ->count();

        $completedCount = $completedCourses->count();

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'achievements' => [
                    'completed_courses' => $completedCourses,
                    'certificates' => $certificates,
                    'learning_statistics' => [
                        'total_courses_completed' => $completedCount,
                        'total_learning_hours' => $totalLearningHours,
                        'active_courses' => $activeEnrollments,
                        'certificates_earned' => $certificates->count(),
                    ],
                    'badges' => $this->getUserBadges($user)
                ]
            ]
        ]);
    }

    /**
     * Update user profile
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id)
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'bio' => ['nullable', 'string', 'max:500'],
            'location' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'job_title' => ['nullable', 'string', 'max:255'],
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => $user->fresh()
        ]);
    }

    /**
     * Update user avatar
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = $request->user();

        // Delete old avatar if exists
        if ($user->avatar_url) {
            $oldPath = str_replace('storage/', '', $user->avatar_url);
            Storage::disk('public')->delete($oldPath);
        }

        // Store new avatar
        $path = $request->file('avatar')->store('avatars', 'public');

        // Update user's avatar URL
        $user->update([
            'avatar_url' => Storage::url($path)
        ]);

        return response()->json([
            'message' => 'Avatar updated successfully',
            'avatar_url' => $user->avatar_url
        ]);
    }

    /**
     * Change user password
     */
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8', 'confirmed']
        ]);

        $user = $request->user();

        // Check current password
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 422);
        }

        // Update password
        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'message' => 'Password updated successfully'
        ]);
    }

    /**
     * Get user's learning progress
     */
    public function learningProgress(Request $request)
    {
        $user = $request->user();

        $enrollments = Enrollment::where('user_id', $user->id)
            ->with([
                'course',
                'progressUpdates' => function ($query) {
                    $query->orderBy('created_at', 'desc')->limit(5);
                }
            ])
            ->get();

        $progressByCourse = $enrollments->map(function ($enrollment) {
            return [
                'course_id' => $enrollment->course_id,
                'course_title' => $enrollment->course->title,
                'progress_percentage' => $enrollment->progress_percentage,
                'status' => $enrollment->status,
                'last_activity' => $enrollment->updated_at->format('Y-m-d H:i:s'),
                'total_hours' => $enrollment->progress_hours
            ];
        });

        return response()->json([
            'progress_by_course' => $progressByCourse,
            'total_enrollments' => $enrollments->count(),
            'average_progress' => $enrollments->avg('progress_percentage') ?? 0
        ]);
    }

    /**
     * Get user's notifications
     */
    public function notifications(Request $request)
    {
        $user = $request->user();

        $notifications = $user->notifications()
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get()
            ->map(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'data' => $notification->data,
                    'read_at' => $notification->read_at,
                    'created_at' => $notification->created_at->format('Y-m-d H:i:s')
                ];
            });

        $unreadCount = $user->unreadNotifications()->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count' => $unreadCount
        ]);
    }

    /**
     * Mark notifications as read
     */
    public function markNotificationsAsRead(Request $request)
    {
        $user = $request->user();

        if ($request->has('notification_id')) {
            $notification = $user->notifications()
                ->where('id', $request->notification_id)
                ->first();

            if ($notification) {
                $notification->markAsRead();
                return response()->json(['message' => 'Notification marked as read']);
            }
        } else {
            $user->unreadNotifications->markAsRead();
            return response()->json(['message' => 'All notifications marked as read']);
        }

        return response()->json(['message' => 'Notification not found'], 404);
    }

    /**
     * Get user badges/achievements
     */
    private function getUserBadges($user)
    {
        $badges = [];

        // Get user's enrollment statistics
        $completedCount = Enrollment::where('user_id', $user->id)
            ->where('status', 'completed')
            ->count();

        $activeCount = Enrollment::where('user_id', $user->id)
            ->where('status', 'active')
            ->count();

        $totalHours = Enrollment::where('user_id', $user->id)
            ->sum('progress_hours');

        // Define badges based on achievements
        if ($completedCount >= 1) {
            $badges[] = [
                'name' => 'First Course',
                'icon' => '🎓',
                'description' => 'Completed your first course'
            ];
        }

        if ($completedCount >= 3) {
            $badges[] = [
                'name' => 'Quick Learner',
                'icon' => '⚡',
                'description' => 'Completed 3 courses'
            ];
        }

        if ($completedCount >= 10) {
            $badges[] = [
                'name' => 'Master Learner',
                'icon' => '🏆',
                'description' => 'Completed 10 courses'
            ];
        }

        if ($totalHours >= 50) {
            $badges[] = [
                'name' => 'Dedicated Learner',
                'icon' => '⏱️',
                'description' => 'Spent 50+ hours learning'
            ];
        }

        if ($activeCount >= 5) {
            $badges[] = [
                'name' => 'Multi-tasker',
                'icon' => '🔀',
                'description' => 'Enrolled in 5+ active courses'
            ];
        }

        return $badges;
    }
}