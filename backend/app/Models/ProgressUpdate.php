<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressUpdate extends Model
{
    use HasFactory;

    protected $fillable = [
        'enrollment_id',
        'progress_percentage',
        'progress_hours',
        'lesson_completed',
        'lesson_id',
        'notes'
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class);
    }
}
