<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, check if products table exists
        if (!Schema::hasTable('products')) {
            // Create the table if it doesn't exist
            Schema::create('products', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->text('description')->nullable();
                $table->decimal('price', 10, 2);
                $table->string('category');
                $table->integer('stock')->default(0);
                $table->string('image')->nullable();
                $table->boolean('is_active')->default(true);
                $table->json('features')->nullable();
                $table->json('tags')->nullable();
                $table->string('color')->nullable();
                $table->decimal('rating', 3, 1)->default(4.5);
                $table->integer('reviews')->default(0);
                $table->timestamps();
            });
            
            $this->command->info('Created products table.');
        } else {
            // Table exists, add missing columns
            $this->command->info('Products table exists. Adding missing columns...');
            
            Schema::table('products', function (Blueprint $table) {
                // Add is_active if it doesn't exist
                if (!Schema::hasColumn('products', 'is_active')) {
                    $table->boolean('is_active')->default(true);
                    $this->command->info('Added is_active column.');
                }
                
                // Add features if it doesn't exist
                if (!Schema::hasColumn('products', 'features')) {
                    $table->json('features')->nullable();
                    $this->command->info('Added features column.');
                }
                
                // Add tags if it doesn't exist
                if (!Schema::hasColumn('products', 'tags')) {
                    $table->json('tags')->nullable();
                    $this->command->info('Added tags column.');
                }
                
                // Add color if it doesn't exist
                if (!Schema::hasColumn('products', 'color')) {
                    $table->string('color')->nullable();
                    $this->command->info('Added color column.');
                }
                
                // Add rating if it doesn't exist
                if (!Schema::hasColumn('products', 'rating')) {
                    $table->decimal('rating', 3, 1)->default(4.5);
                    $this->command->info('Added rating column.');
                }
                
                // Add reviews if it doesn't exist
                if (!Schema::hasColumn('products', 'reviews')) {
                    $table->integer('reviews')->default(0);
                    $this->command->info('Added reviews column.');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Only drop columns if they exist
        Schema::table('products', function (Blueprint $table) {
            $columnsToDrop = ['is_active', 'features', 'tags', 'color', 'rating', 'reviews'];
            
            foreach ($columnsToDrop as $column) {
                if (Schema::hasColumn('products', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};