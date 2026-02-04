<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;

class AcademySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'title' => 'Fullstack Laravel & React',
                'description' => 'Build high-end systems like the Apex ecosystem. Master both backend with Laravel and frontend with React to create complete web applications.',
                'price' => 5000.00,
                'thumbnail' => 'courses/laravel-react.jpg',
            ],
            [
                'title' => 'Data Science with Python',
                'description' => 'Learn data analysis, machine learning, and visualization using Python. Perfect for aspiring data scientists.',
                'price' => 4500.00,
                'thumbnail' => 'courses/data-science.jpg',
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Create cross-platform mobile applications using React Native. Build apps for both iOS and Android.',
                'price' => 4000.00,
                'thumbnail' => 'courses/mobile-dev.jpg',
            ],
            [
                'title' => 'UI/UX Design Fundamentals',
                'description' => 'Master user interface and user experience design principles. Learn Figma, prototyping, and design thinking.',
                'price' => 3500.00,
                'thumbnail' => 'courses/ui-ux.jpg',
            ],
            [
                'title' => 'Cybersecurity Essentials',
                'description' => 'Learn to protect systems and networks from digital attacks. Covering ethical hacking, network security, and encryption.',
                'price' => 5500.00,
                'thumbnail' => 'courses/cybersecurity.jpg',
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }

        $this->command->info('Successfully seeded ' . count($courses) . ' academy courses!');
    }
}