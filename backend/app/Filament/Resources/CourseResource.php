<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CourseResource\Pages;
use App\Models\Course;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str; // Fixed: Added missing Str import
use Illuminate\Support\Collection; // Fixed: Added missing Collection import

class CourseResource extends Resource
{
    protected static ?string $model = Course::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Academics';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Course Details')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Basic Information')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpanFull()
                                    ->placeholder('e.g., Laravel Web Development'),
                                
                                Forms\Components\Textarea::make('description')
                                    ->required()
                                    ->columnSpanFull()
                                    ->rows(3)
                                    ->placeholder('Brief description of the course'),
                                
                                Forms\Components\Textarea::make('short_description')
                                    ->nullable()
                                    ->columnSpanFull()
                                    ->rows(2)
                                    ->maxLength(160)
                                    ->placeholder('Short description for preview cards'),
                                
                                Forms\Components\RichEditor::make('content')
                                    ->nullable()
                                    ->columnSpanFull()
                                    ->toolbarButtons(['bold', 'italic', 'bulletList', 'orderedList', 'link'])
                                    ->fileAttachmentsDirectory('courses'),
                                
                                Forms\Components\Section::make('Media')
                                    ->schema([
                                        Forms\Components\FileUpload::make('thumbnail')
                                            ->label('Course Thumbnail')
                                            ->image()
                                            ->directory('courses/thumbnails')
                                            ->maxSize(2048)
                                            ->columnSpan(1),
                                        
                                        Forms\Components\FileUpload::make('featured_image')
                                            ->label('Featured Image')
                                            ->image()
                                            ->directory('courses/featured')
                                            ->maxSize(4096)
                                            ->columnSpan(1),
                                    ])
                                    ->columns(2),
                            ]),
                        
                        Forms\Components\Tabs\Tab::make('Pricing & Duration')
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Forms\Components\Section::make('Course Details')
                                    ->schema([
                                        Forms\Components\TextInput::make('price')
                                            ->numeric()
                                            ->prefix('KSh')
                                            ->default(0)
                                            ->columnSpan(1),
                                        
                                        Forms\Components\TextInput::make('duration')
                                            ->label('Duration (weeks)')
                                            ->numeric()
                                            ->suffix('weeks')
                                            ->default(4)
                                            ->columnSpan(1),
                                        
                                        Forms\Components\TextInput::make('total_lessons')
                                            ->numeric()
                                            ->default(10)
                                            ->columnSpan(1),
                                        
                                        Forms\Components\TextInput::make('total_hours')
                                            ->numeric()
                                            ->suffix('hours')
                                            ->default(20)
                                            ->columnSpan(1),
                                    ])
                                    ->columns(2),
                            ]),
                        
                        Forms\Components\Tabs\Tab::make('Exam Questions')
                            ->icon('heroicon-o-question-mark-circle')
                            ->schema([
                                Forms\Components\Section::make('Exam Configuration')
                                    ->schema([
                                        Forms\Components\TextInput::make('exam_duration')->numeric()->default(60)->columnSpan(1),
                                        Forms\Components\TextInput::make('passing_score')->numeric()->default(70)->suffix('%')->columnSpan(1),
                                        Forms\Components\TextInput::make('max_attempts')->numeric()->default(3)->columnSpan(1),
                                    ])->columns(3),
                                
                                Forms\Components\Repeater::make('exam_questions')
                                    ->schema([
                                        Forms\Components\Select::make('type')
                                            ->options([
                                                'multiple_choice' => 'Multiple Choice',
                                                'true_false' => 'True/False',
                                                'short_answer' => 'Short Answer',
                                            ])->default('multiple_choice')->required(),
                                        Forms\Components\Textarea::make('question')->required()->columnSpan(2),
                                        // Simplified options for the fixed code
                                        Forms\Components\TextInput::make('correct_answer')->required()->columnSpanFull(),
                                    ])->columns(3)->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail')->circular()->size(40),
                Tables\Columns\TextColumn::make('title')->searchable()->sortable()
                    ->description(fn(Course $record): string => Str::limit($record->description ?? '', 50)),
                Tables\Columns\TextColumn::make('price')->money('KES')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active'),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\DeleteAction::make(),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('activate')
                        ->action(fn (Collection $records) => $records->each->update(['is_active' => true]))
                        ->deselectRecordsAfterCompletion(),
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        // Fixed: Removed missing 'view' and 'enrollments' routes
        return [
            'index' => Pages\ListCourses::route('/'),
            'create' => Pages\CreateCourse::route('/create'),
            'edit' => Pages\EditCourse::route('/{record}/edit'),
        ];
    }
}