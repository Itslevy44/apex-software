<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'completed',
        'exam_attempts',
        'exam_score',
        'certificate_path',
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
    ];

    protected $casts = [
        'completed' => 'boolean',
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
        'certificate_issued_at' => 'datetime',
        'last_accessed_at' => 'datetime',
        'completed_lessons' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function progressUpdates()
    {
        return $this->hasMany(ProgressUpdate::class);
    }
}
