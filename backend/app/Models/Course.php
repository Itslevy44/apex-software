<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'price',
        'thumbnail',
        'duration',
        'lessons_count',
        'level',
        'instructor',
        'students_enrolled',
        'rating',
        'requirements',
        'what_you_will_learn',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'rating' => 'float',
        'requirements' => 'array',
        'students_enrolled' => 'integer',
        'lessons_count' => 'integer',
    ];

    /**
     * Get the enrollments for the course.
     */
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function exam()
    {
        return $this->hasOne(Exam::class);
    }
}