<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            // Add other columns if needed
            $table->json('questions')->nullable();
            
            // If you also need to add foreign key and other columns:
            if (!Schema::hasColumn('exams', 'course_id')) {
                $table->foreignId('course_id')->nullable()->constrained()->onDelete('cascade');
            }
            
            if (!Schema::hasColumn('exams', 'title')) {
                $table->string('title');
            }
            
            if (!Schema::hasColumn('exams', 'duration_minutes')) {
                $table->integer('duration_minutes')->default(60);
            }
            
            if (!Schema::hasColumn('exams', 'passing_score')) {
                $table->integer('passing_score')->default(70);
            }
            
            if (!Schema::hasColumn('exams', 'is_active')) {
                $table->boolean('is_active')->default(true);
            }
            
            if (!Schema::hasColumn('exams', 'max_attempts')) {
                $table->integer('max_attempts')->default(3);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exams', function (Blueprint $table) {
            $table->dropColumn('questions');
            $table->dropColumn('course_id');
            $table->dropColumn('title');
            $table->dropColumn('duration_minutes');
            $table->dropColumn('passing_score');
            $table->dropColumn('is_active');
            $table->dropColumn('max_attempts');
        });
    }
};