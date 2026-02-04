<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MpesaController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/mpesa/callback', [MpesaController::class, 'callback']);

// Public resource routes (viewable without login)
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

// Protected routes (authentication required)
Route::middleware('auth:sanctum')->group(function () {
    // Authentication routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    
    // User Profile routes (using UserController for consistency)
    Route::prefix('user')->group(function () {
        Route::get('/profile', [UserController::class, 'profile']); // Get user profile
        Route::put('/profile', [UserController::class, 'updateProfile']); // Update profile
        Route::put('/password', [UserController::class, 'updatePassword']); // Change password
        Route::post('/avatar', [UserController::class, 'updateAvatar']); // Upload avatar
        
        Route::get('/orders', [OrderController::class, 'index']); // User's orders
        Route::get('/enrollments', [EnrollmentController::class, 'myEnrollments']); // User's enrollments
        Route::get('/achievements', [UserController::class, 'achievements']); // User achievements
        Route::get('/progress', [UserController::class, 'learningProgress']); // Learning progress
        Route::get('/notifications', [UserController::class, 'notifications']); // User notifications
        Route::post('/notifications/read', [UserController::class, 'markNotificationsAsRead']); // Mark notifications as read
    });
    
    // MPesa routes
    Route::post('/mpesa/stkpush', [MpesaController::class, 'stkPush']);
    
    // Course routes
    Route::post('/courses/{course}/enroll', [CourseController::class, 'enroll']); // Enroll in a course
    Route::get('/my-courses', [CourseController::class, 'myCourses']); // Get user's enrolled courses
    
    // Exam routes
    Route::get('/courses/{course}/exam/eligibility', [ExamController::class, 'checkEligibility']);
    Route::get('/courses/{course}/exam/questions', [ExamController::class, 'getExamQuestions']);
    Route::post('/courses/{course}/exam/submit', [ExamController::class, 'submitExam']);
    
    // Certificate routes
    Route::get('/certificates/{certificateNumber}/download', [ExamController::class, 'downloadCertificate'])
        ->name('certificate.download');
    
    // Enrollment routes
    Route::get('/enrollments', [EnrollmentController::class, 'index']); // All enrollments (admin/overview)
    Route::get('/enrollments/{enrollment}', [EnrollmentController::class, 'show']);
    Route::patch('/enrollments/{enrollment}/progress', [EnrollmentController::class, 'updateProgress']);
    Route::get('/enrollments/{enrollment}/certificate', [EnrollmentController::class, 'downloadCertificate']);
    Route::get('/enrollments/statistics', [EnrollmentController::class, 'statistics']);
    Route::post('/enrollments/{enrollment}/mark-lesson', [EnrollmentController::class, 'markLessonCompleted']);
    Route::delete('/enrollments/{enrollment}/cancel', [EnrollmentController::class, 'cancelEnrollment']);
    
    // Cart routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add/{product}', [CartController::class, 'add']);
    Route::delete('/cart/remove/{product}', [CartController::class, 'remove']);
    Route::delete('/cart/clear', [CartController::class, 'clear']);
    Route::put('/cart/update/{product}', [CartController::class, 'updateQuantity']);
    
    // Order routes
    Route::get('/orders', [OrderController::class, 'index']); // All orders (if admin) or user's orders
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::post('/orders/{order}/pay', [OrderController::class, 'initiatePayment']);
});