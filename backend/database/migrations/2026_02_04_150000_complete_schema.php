<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Add columns to enrollments
        Schema::table('enrollments', function (Blueprint $table) {
            if (!Schema::hasColumn('enrollments', 'status')) {
                $table->string('status')->default('active');
            }
            if (!Schema::hasColumn('enrollments', 'enrolled_at')) {
                $table->timestamp('enrolled_at')->nullable();
            }
            if (!Schema::hasColumn('enrollments', 'progress_percentage')) {
                $table->decimal('progress_percentage', 5, 2)->default(0);
            }
            if (!Schema::hasColumn('enrollments', 'progress_hours')) {
                $table->decimal('progress_hours', 8, 2)->default(0);
            }
            if (!Schema::hasColumn('enrollments', 'completed_at')) {
                $table->timestamp('completed_at')->nullable();
            }
            if (!Schema::hasColumn('enrollments', 'certificate_number')) {
                $table->string('certificate_number')->nullable();
            }
            if (!Schema::hasColumn('enrollments', 'certificate_issued_at')) {
                $table->timestamp('certificate_issued_at')->nullable();
            }
            if (!Schema::hasColumn('enrollments', 'last_accessed_at')) {
                $table->timestamp('last_accessed_at')->nullable();
            }
            if (!Schema::hasColumn('enrollments', 'last_lesson_completed')) {
                $table->string('last_lesson_completed')->nullable();
            }
            if (!Schema::hasColumn('enrollments', 'completed_lessons')) {
                $table->json('completed_lessons')->nullable();
            }
        });

        // Create OrderItems table
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });

        // Create Carts table
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

        // Create CartItems table
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->timestamps();
        });

        // Create ProgressUpdates table
        Schema::create('progress_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('enrollment_id')->constrained()->onDelete('cascade');
            $table->decimal('progress_percentage', 5, 2);
            $table->decimal('progress_hours', 8, 2)->default(0);
            $table->string('lesson_completed')->nullable();
            $table->string('lesson_id')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // Create Lessons table
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug');
            $table->text('content')->nullable();
            $table->string('video_url')->nullable();
            $table->integer('duration_minutes')->default(0);
            $table->integer('order')->default(0);
            $table->boolean('is_preview')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
        Schema::dropIfExists('progress_updates');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('carts');
        Schema::dropIfExists('order_items');

        Schema::table('enrollments', function (Blueprint $table) {
            $table->dropColumn([
                'status',
                'enrolled_at',
                'progress_percentage',
                'progress_hours',
                'completed_at',
                'certificate_number',
                'certificate_issued_at',
                'last_accessed_at',
                'last_lesson_completed',
                'completed_lessons'
            ]);
        });
    }
};
