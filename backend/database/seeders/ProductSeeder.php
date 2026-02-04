<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if products table exists
        if (!Schema::hasTable('products')) {
            $this->command->error('Products table does not exist! Please run migrations first.');
            return;
        }

        // Get existing columns
        $columns = Schema::getColumnListing('products');
        
        $this->command->info('Available columns: ' . implode(', ', $columns));

        // Sample products data - only include columns that exist
        $products = [
            [
                'name' => 'Apex Tech Hoodie',
                'description' => 'Premium cotton hoodie with Apex branding. Perfect for developers.',
                'price' => 3500.00,
                'category' => 'Clothing',
                'stock' => 42,
            ],
            [
                'name' => 'Apex Dev T-Shirt',
                'description' => 'Soft cotton t-shirt with minimalist Apex design.',
                'price' => 1500.00,
                'category' => 'Clothing',
                'stock' => 89,
            ],
            [
                'name' => 'Apex Branded Cap',
                'description' => 'Adjustable cap with embroidered Apex logo.',
                'price' => 800.00,
                'category' => 'Accessories',
                'stock' => 125,
            ],
            [
                'name' => 'Apex Developer Backpack',
                'description' => 'Water-resistant backpack with laptop compartment.',
                'price' => 4500.00,
                'category' => 'Accessories',
                'stock' => 28,
            ],
            [
                'name' => 'Apex Code Mug',
                'description' => 'Ceramic mug with developer-themed design.',
                'price' => 600.00,
                'category' => 'Accessories',
                'stock' => 200,
            ],
            [
                'name' => 'Apex Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with RGB lighting.',
                'price' => 2500.00,
                'category' => 'Electronics',
                'stock' => 56,
            ],
        ];

        // Add optional columns if they exist
        foreach ($products as &$product) {
            // Add is_active if column exists
            if (in_array('is_active', $columns)) {
                $product['is_active'] = true;
            }
            
            // Add features if column exists
            if (in_array('features', $columns)) {
                // Add different features for each product
                switch ($product['name']) {
                    case 'Apex Tech Hoodie':
                        $product['features'] = json_encode(['Premium Cotton', 'Embroidered Logo', 'Unisex Fit', 'Machine Washable']);
                        break;
                    case 'Apex Dev T-Shirt':
                        $product['features'] = json_encode(['100% Cotton', 'Screen Printed', 'Regular Fit', 'Breathable']);
                        break;
                    case 'Apex Branded Cap':
                        $product['features'] = json_encode(['Adjustable Strap', 'Embroidered Logo', 'Breathable Fabric', 'Unisex']);
                        break;
                    case 'Apex Developer Backpack':
                        $product['features'] = json_encode(['Water-resistant', 'Laptop Compartment', 'Multiple Pockets', 'Ergonomic']);
                        break;
                    case 'Apex Code Mug':
                        $product['features'] = json_encode(['Ceramic', 'Microwave Safe', 'Dishwasher Safe', '15oz Capacity']);
                        break;
                    case 'Apex Wireless Mouse':
                        $product['features'] = json_encode(['Wireless', 'RGB Lighting', 'Ergonomic', 'Long Battery']);
                        break;
                }
            }
            
            // Add tags if column exists
            if (in_array('tags', $columns)) {
                switch ($product['name']) {
                    case 'Apex Tech Hoodie':
                    case 'Apex Developer Backpack':
                        $product['tags'] = json_encode(['bestseller', 'new']);
                        break;
                    case 'Apex Dev T-Shirt':
                    case 'Apex Code Mug':
                        $product['tags'] = json_encode(['popular']);
                        break;
                    default:
                        $product['tags'] = json_encode(['new']);
                }
            }
            
            // Add color if column exists
            if (in_array('color', $columns)) {
                switch ($product['name']) {
                    case 'Apex Tech Hoodie':
                    case 'Apex Developer Backpack':
                    case 'Apex Wireless Mouse':
                        $product['color'] = 'Black/Green';
                        break;
                    case 'Apex Dev T-Shirt':
                    case 'Apex Code Mug':
                        $product['color'] = 'White/Green';
                        break;
                    case 'Apex Branded Cap':
                        $product['color'] = 'Navy/Green';
                        break;
                }
            }
            
            // Add rating if column exists
            if (in_array('rating', $columns)) {
                switch ($product['name']) {
                    case 'Apex Developer Backpack':
                    case 'Apex Tech Hoodie':
                        $product['rating'] = 4.9;
                        break;
                    case 'Apex Branded Cap':
                        $product['rating'] = 4.7;
                        break;
                    case 'Apex Dev T-Shirt':
                        $product['rating'] = 4.6;
                        break;
                    case 'Apex Code Mug':
                        $product['rating'] = 4.5;
                        break;
                    case 'Apex Wireless Mouse':
                        $product['rating'] = 4.4;
                        break;
                }
            }
            
            // Add reviews if column exists
            if (in_array('reviews', $columns)) {
                switch ($product['name']) {
                    case 'Apex Code Mug':
                        $product['reviews'] = 312;
                        break;
                    case 'Apex Dev T-Shirt':
                        $product['reviews'] = 234;
                        break;
                    case 'Apex Tech Hoodie':
                        $product['reviews'] = 156;
                        break;
                    case 'Apex Branded Cap':
                        $product['reviews'] = 89;
                        break;
                    case 'Apex Developer Backpack':
                        $product['reviews'] = 67;
                        break;
                    case 'Apex Wireless Mouse':
                        $product['reviews'] = 45;
                        break;
                }
            }
            
            // Add timestamps
            $product['created_at'] = now();
            $product['updated_at'] = now();
        }

        // Clear the table first (optional - comment out if you want to keep existing data)
        // DB::table('products')->truncate();
        
        // Insert products
        $inserted = DB::table('products')->insert($products);
        
        if ($inserted) {
            $this->command->info('Successfully seeded ' . count($products) . ' products.');
        } else {
            $this->command->error('Failed to seed products.');
        }
    }
}