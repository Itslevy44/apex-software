<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'category',
        'stock',
        'image',
        'is_active',
        'features',
        'tags',
        'color',
        'rating',
        'reviews'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'stock' => 'integer',
        'is_active' => 'boolean',
        'features' => 'array',
        'tags' => 'array',
        'rating' => 'decimal:1',
        'reviews' => 'integer'
    ];

    /**
     * Default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'is_active' => true,
        'rating' => 4.5,
        'reviews' => 0,
        'features' => '[]',
        'tags' => '[]'
    ];
}