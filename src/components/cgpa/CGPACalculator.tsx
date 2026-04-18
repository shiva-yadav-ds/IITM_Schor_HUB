"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  Plus,
  Trash2,
  AlertCircle,
  ChevronRight,
  Check,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import {
  CourseData,
  CourseEntry,
  ProgramLevel,
  Grade,
  gradePoints,
  getCoursesForLevel,
  getCoursesByLevel,
  calculateCGPA,
  calculateLevelCGPA,
  calculateCombinedCGPA,
  isPassingGrade,
  getAvailableLevels,
  levelDisplayNames,
  levelDescriptions,
  generateId,
  CGPAResult,
  LEVEL_CREDITS,
} from '@/lib/cgpa';

// Storage keys
const STORAGE_KEYS = {
  PROGRAM_LEVEL: 'cgpaCalculator.programLevel',
  COURSE_ENTRIES: 'cgpaCalculator.courseEntries',
  CURRENT_STEP: 'cgpaCalculator.currentStep',
  SHOW_NPTEL: 'cgpaCalculator.showNptel',
  CALCULATION_MODE: 'cgpaCalculator.calculationMode',
  PREVIOUS_CGPA: 'cgpaCalculator.previousCGPA',
};

// Calculation mode type
export type CalculationMode = 'level_only' | 'combined';

// Grade options for dropdown
const gradeOptions: { value: Grade; label: string; points: number }[] = [
  { value: 'S', label: 'S (Outstanding)', points: 10 },
  { value: 'A', label: 'A (Excellent)', points: 9 },
  { value: 'B', label: 'B (Very Good)', points: 8 },
  { value: 'C', label: 'C (Good)', points: 7 },
  { value: 'D', label: 'D (Average)', points: 6 },
  { value: 'E', label: 'E (Pass)', points: 4 },
  { value: 'U', label: 'U (Fail)', points: 0 },
];

// Step configuration
const steps = [
  { id: 1, title: 'Choose Program Level', icon: GraduationCap },
  { id: 2, title: 'Add Your Courses', icon: BookOpen },
  { id: 3, title: 'View Results', icon: Award },
];

export default function CGPACalculator() {
  // State
  const [programLevel, setProgramLevel] = useState<ProgramLevel | null>(null);
  const [courseEntries, setCourseEntries] = useState<CourseEntry[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showNptel, setShowNptel] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('level_only');
  const [previousLevelCGPA, setPreviousLevelCGPA] = useState<string>('');

  // Get previous level info
  const getPreviousLevel = useCallback((level: ProgramLevel): ProgramLevel | null => {
    switch (level) {
      case 'diploma': return 'foundation';
      case 'bsc': return 'diploma';
      case 'bs': return 'bsc';
      default: return null;
    }
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem(STORAGE_KEYS.PROGRAM_LEVEL);
      if (savedLevel) {
        setProgramLevel(savedLevel as ProgramLevel);
      }

      const savedEntries = localStorage.getItem(STORAGE_KEYS.COURSE_ENTRIES);
      if (savedEntries) {
        try {
          setCourseEntries(JSON.parse(savedEntries));
        } catch (e) {
          console.error('Error parsing saved entries:', e);
        }
      }

      const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP);
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }

      const savedShowNptel = localStorage.getItem(STORAGE_KEYS.SHOW_NPTEL);
      if (savedShowNptel) {
        setShowNptel(savedShowNptel === 'true');
      }

      const savedMode = localStorage.getItem(STORAGE_KEYS.CALCULATION_MODE);
      if (savedMode) {
        setCalculationMode(savedMode as CalculationMode);
      }

      const savedPrevCGPA = localStorage.getItem(STORAGE_KEYS.PREVIOUS_CGPA);
      if (savedPrevCGPA) {
        setPreviousLevelCGPA(savedPrevCGPA);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (programLevel) {
      localStorage.setItem(STORAGE_KEYS.PROGRAM_LEVEL, programLevel);
    }
  }, [programLevel]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSE_ENTRIES, JSON.stringify(courseEntries));
  }, [courseEntries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHOW_NPTEL, showNptel.toString());
  }, [showNptel]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CALCULATION_MODE, calculationMode);
  }, [calculationMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PREVIOUS_CGPA, previousLevelCGPA);
  }, [previousLevelCGPA]);

  // Get available courses - only current level for diploma+ in level_only mode
  const availableCourses = useMemo(() => {
    if (!programLevel) return [];
    if (programLevel === 'foundation') {
      return getCoursesByLevel('foundation');
    }
    // For diploma and above, only show current level courses (not foundation)
    return getCoursesByLevel(programLevel);
  }, [programLevel]);

  // Get courses not yet added
  const unaddedCourses = useMemo(() => {
    const addedCodes = new Set(courseEntries.map(e => e.course.code));
    return availableCourses.filter(c => !addedCodes.has(c.code));
  }, [availableCourses, courseEntries]);

  // Check for duplicate courses
  const hasDuplicates = useMemo(() => {
    const codes = courseEntries.map(e => e.course.code);
    return codes.length !== new Set(codes).size;
  }, [courseEntries]);

  // Calculate overall CGPA (with combined mode support)
  const overallResult = useMemo(() => {
    if (!programLevel) return { cgpa: 0, percentage: 0, totalCredits: 0, coursesCount: 0 };

    // For foundation or level_only mode, just calculate current level CGPA
    if (programLevel === 'foundation' || calculationMode === 'level_only') {
      return calculateCGPA(courseEntries);
    }

    // For combined mode, use direct CGPA from previous level
    const prevLevel = getPreviousLevel(programLevel);
    const prevCGPANum = parseFloat(previousLevelCGPA) || 0;
    const prevCredits = prevLevel ? LEVEL_CREDITS[prevLevel] : 0;

    return calculateCombinedCGPA(prevCGPANum, prevCredits, courseEntries);
  }, [courseEntries, programLevel, calculationMode, previousLevelCGPA, getPreviousLevel]);

  // Calculate level-wise CGPAs
  const levelResults = useMemo(() => {
    if (!programLevel) return {};
    const results: Record<ProgramLevel, CGPAResult> = {} as any;

    // Only calculate for current level (not foundation for diploma+)
    results[programLevel] = calculateCGPA(courseEntries);

    return results;
  }, [courseEntries, programLevel]);

  // Handle program level selection
  const handleLevelSelect = useCallback((level: ProgramLevel) => {
    setProgramLevel(level);
    // Clear courses when changing level
    setCourseEntries([]);
    setCalculationMode('level_only');
    setPreviousLevelCGPA('');
    setCurrentStep(2);
  }, []);

  // Add a new course
  const handleAddCourse = useCallback(() => {
    if (!selectedCourse || !programLevel) return;

    const course = availableCourses.find(c => c.code === selectedCourse);
    if (!course) return;

    const newEntry: CourseEntry = {
      id: generateId(),
      course,
      grade: '',
      includeInCGPA: true,
    };

    setCourseEntries(prev => [...prev, newEntry]);
    setSelectedCourse('');
  }, [selectedCourse, availableCourses, programLevel]);

  // Update course grade
  const handleGradeChange = useCallback((id: string, grade: Grade) => {
    setCourseEntries(prev =>
      prev.map(entry => {
        if (entry.id === id) {
          // Auto-uncheck include for U grade
          const includeInCGPA = grade === 'U' ? false : entry.includeInCGPA;
          return { ...entry, grade, includeInCGPA };
        }
        return entry;
      })
    );
  }, []);

  // Toggle include in CGPA
  const handleIncludeToggle = useCallback((id: string, checked: boolean) => {
    setCourseEntries(prev =>
      prev.map(entry => {
        if (entry.id === id) {
          // Don't allow including U-grade courses
          if (entry.grade === 'U' && checked) return entry;
          return { ...entry, includeInCGPA: checked };
        }
        return entry;
      })
    );
  }, []);

  // Remove a course
  const handleRemoveCourse = useCallback((id: string) => {
    setCourseEntries(prev => prev.filter(entry => entry.id !== id));
  }, []);

  // Reset everything
  const handleReset = useCallback(() => {
    setProgramLevel(null);
    setCourseEntries([]);
    setCurrentStep(1);
    setShowNptel(false);
    setSelectedCourse('');
    setCalculationMode('level_only');
    setPreviousLevelCGPA('');
    localStorage.removeItem(STORAGE_KEYS.PROGRAM_LEVEL);
    localStorage.removeItem(STORAGE_KEYS.COURSE_ENTRIES);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP);
    localStorage.removeItem(STORAGE_KEYS.SHOW_NPTEL);
    localStorage.removeItem(STORAGE_KEYS.CALCULATION_MODE);
    localStorage.removeItem(STORAGE_KEYS.PREVIOUS_CGPA);
  }, []);

  // Get grade color - professional muted palette
  const getGradeColor = (grade: Grade) => {
    switch (grade) {
      case 'S': return 'text-primary';
      case 'A': return 'text-emerald-600';
      case 'B': return 'text-sky-600';
      case 'C': return 'text-amber-600';
      case 'D': return 'text-orange-600';
      case 'E': return 'text-rose-600';
      case 'U': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  // Get grade badge styling - professional look
  const getGradeBadgeStyle = (grade: Grade, isSelected: boolean) => {
    if (!isSelected) return 'border border-border/80 bg-secondary/80 text-muted-foreground hover:bg-secondary';
    return 'border border-primary/15 bg-primary/10 text-primary shadow-[var(--shadow-sm)]';
  };

  // Render Step Indicator
  const renderStepIndicator = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${currentStep >= step.id
                ? 'bg-primary border-primary text-white'
                : 'border-border text-muted-foreground'
                }`}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span className={`ml-2 text-sm hidden sm:inline ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.id ? 'bg-primary' : 'bg-border'
                }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Render Step 1: Program Level Selection
  const renderLevelSelection = () => (
    <Card className="border-border/80 bg-card/92">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          Step 1: Choose Your Program Level
        </CardTitle>
        <CardDescription>
          Select your current program to see relevant courses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['foundation', 'diploma', 'bsc', 'bs'] as ProgramLevel[]).map(level => (
            <Card
              key={level}
              className={`cursor-pointer transition-all hover:border-primary/30 ${programLevel === level
                ? 'border-primary bg-primary/8'
                : 'border-border bg-secondary/40'
                }`}
              onClick={() => handleLevelSelect(level)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{levelDisplayNames[level]}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{levelDescriptions[level]}</p>
                  </div>
                  {programLevel === level && (
                    <Check className="w-6 h-6 text-primary" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Render Step 2: Course Entry - Improved Mobile-Friendly Version
  const renderCourseEntry = () => {
    if (!programLevel) return null;

    const prevLevel = getPreviousLevel(programLevel);
    const showModeSelection = programLevel !== 'foundation';

    // Short grade labels for mobile buttons
    const shortGrades = ['S', 'A', 'B', 'C', 'D', 'E'];

    // Quick add all courses at once
    const handleQuickAddAll = () => {
      const newEntries: CourseEntry[] = availableCourses
        .filter(c => !courseEntries.find(e => e.course.code === c.code))
        .map(course => ({
          id: generateId(),
          course,
          grade: '' as Grade,
          includeInCGPA: true,
        }));
      setCourseEntries(prev => [...prev, ...newEntries]);
    };

    // Quick grade set for a course (add if not exists, update if exists)
    const handleQuickGrade = (course: CourseData, grade: Grade) => {
      const existing = courseEntries.find(e => e.course.code === course.code);
      if (existing) {
        handleGradeChange(existing.id, grade);
      } else {
        const newEntry: CourseEntry = {
          id: generateId(),
          course,
          grade,
          includeInCGPA: true,
        };
        setCourseEntries(prev => [...prev, newEntry]);
      }
    };

    // Get grade for a course
    const getGradeForCourse = (code: string): Grade => {
      const entry = courseEntries.find(e => e.course.code === code);
      return entry?.grade || '' as Grade;
    };

    return (
      <Card className="border-border/80 bg-card/92">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                Select Grades
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Tap a grade for each course you completed
              </CardDescription>
            </div>
            <Badge variant="outline" className="w-fit border-primary/20 bg-primary/8 text-primary">
              {levelDisplayNames[programLevel]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {/* Mode Selection for non-Foundation levels - Compact */}
          {showModeSelection && (
            <div className="rounded-[1.25rem] border border-border/80 bg-secondary/70 p-3">
              <div className="flex flex-wrap gap-2 mb-2">
                <Button
                  variant={calculationMode === 'level_only' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCalculationMode('level_only')}
                  className={calculationMode === 'level_only' ? '' : 'border-border'}
                >
                  {levelDisplayNames[programLevel]} Only
                </Button>
                <Button
                  variant={calculationMode === 'combined' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCalculationMode('combined')}
                  className={calculationMode === 'combined' ? '' : 'border-border'}
                >
                  + {prevLevel && levelDisplayNames[prevLevel]} CGPA
                </Button>
              </div>

              {/* Previous Level CGPA Input */}
              {calculationMode === 'combined' && prevLevel && (
                <div className="flex items-center gap-2 mt-2">
                  <Label htmlFor="prevCGPA" className="text-xs whitespace-nowrap">
                    {levelDisplayNames[prevLevel]} CGPA:
                  </Label>
                  <input
                    id="prevCGPA"
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="e.g., 8.5"
                    value={previousLevelCGPA}
                    onChange={(e) => setPreviousLevelCGPA(e.target.value)}
                    className="w-20 rounded-xl border border-border bg-background px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                  <span className="text-xs text-muted-foreground">({LEVEL_CREDITS[prevLevel]} credits)</span>
                </div>
              )}
            </div>
          )}

          {/* Live CGPA Display - Compact Professional */}
          {courseEntries.some(e => e.grade && e.grade !== 'U') && (
            <div className="flex items-center justify-between rounded-[1.25rem] border border-border/80 bg-secondary/80 px-4 py-3">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">CGPA</span>
                <span className="text-lg font-semibold text-foreground">{overallResult.cgpa.toFixed(2)}</span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>{overallResult.totalCredits} cr</span>
                <span>{overallResult.coursesCount} courses</span>
              </div>
            </div>
          )}

          {/* All Courses List with Quick Grade Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">
                {levelDisplayNames[programLevel]} Courses
              </Label>
              <span className="text-xs text-muted-foreground">
                {courseEntries.filter(e => e.grade && e.grade !== '').length}/{availableCourses.length} graded
              </span>
            </div>

            <div className="space-y-1">
              {availableCourses.map(course => {
                const currentGrade = getGradeForCourse(course.code);
                return (
                  <div
                    key={course.code}
                    className={`rounded-lg border p-2 sm:p-3 transition-all ${currentGrade && currentGrade !== 'U'
                      ? 'border-primary/25 bg-primary/8'
                      : 'border-border/80 bg-background/90'
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      {/* Course Name */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.credits} credits</p>
                      </div>

                      {/* Grade Buttons - Professional monochrome style */}
                      <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
                        {shortGrades.map(grade => (
                          <button
                            key={grade}
                            onClick={() => handleQuickGrade(course, grade as Grade)}
                            className={`min-w-[28px] h-7 rounded text-xs font-medium transition-all ${getGradeBadgeStyle(grade as Grade, currentGrade === grade)}`}
                          >
                            {grade}
                          </button>
                        ))}
                        {currentGrade && (
                          <button
                            onClick={() => handleRemoveCourse(courseEntries.find(e => e.course.code === course.code)?.id || '')}
                            className="min-w-[28px] h-7 rounded-full text-xs text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                            title="Clear"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-2 border-t border-border/80">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(1)}
              className="border-border"
            >
              ← Back
            </Button>
            <Button
              onClick={() => setCurrentStep(3)}
              disabled={!courseEntries.some(e => e.grade && e.grade !== '' && e.grade !== 'U')}
              size="sm"
              className=""
            >
              View Results →
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render Step 3: Results - Professional Compact Design
  const renderResults = () => {
    if (!programLevel) return null;

    const levels = getAvailableLevels(programLevel);

    return (
      <Card className="border-border/80 bg-card/92">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Award className="w-5 h-5 text-primary" />
                CGPA Results
              </CardTitle>
              <CardDescription className="text-xs">
                Your calculated CGPA based on added courses
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentStep(2)}
              className="border-border text-xs"
            >
              Edit Courses
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Overall CGPA Card - Professional Compact */}
          <div className="rounded-[1.5rem] border border-border/80 bg-secondary/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Overall CGPA</span>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {overallResult.percentage.toFixed(1)}%
                </span>
                <span>{overallResult.totalCredits} credits</span>
                <span>{overallResult.coursesCount} courses</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-foreground">{overallResult.cgpa.toFixed(2)}</span>
              <Progress
                value={overallResult.cgpa * 10}
                className="flex-1 h-1.5 bg-border"
              />
            </div>
          </div>

          {/* Level-wise CGPA - Compact inline */}
          <div className="flex flex-wrap gap-3">
            {levels.map(level => {
              const result = levelResults[level];
              if (!result || result.coursesCount === 0) return null;
              return (
                <div key={level} className="rounded-full border border-border/80 bg-secondary/70 px-3 py-2">
                  <span className="text-xs text-muted-foreground">{levelDisplayNames[level]}</span>
                  <span className="ml-2 text-sm font-semibold text-foreground">{result.cgpa.toFixed(2)}</span>
                  <span className="ml-2 text-xs text-muted-foreground">{result.totalCredits}cr</span>
                </div>
              );
            })}
          </div>

          {/* Course Summary - Compact horizontal */}
          <div className="border-t border-border/80 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Grade Distribution</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {gradeOptions.slice(0, 6).map(opt => {
                const count = courseEntries.filter(
                  e => e.grade === opt.value && e.includeInCGPA
                ).length;
                if (count === 0) return null;
                return (
                  <div
                    key={opt.value}
                    className="flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/70 px-2.5 py-1.5"
                  >
                    <span className={cn("text-xs font-medium", getGradeColor(opt.value))}>{opt.value}</span>
                    <span className="text-xs text-muted-foreground">×{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grading Scale Reference - Compact */}
          <div className="border-t border-border/80 pt-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="mr-2 text-xs uppercase tracking-wider text-muted-foreground">Scale</span>
              {gradeOptions.map(opt => (
                <span key={opt.value} className="text-xs text-muted-foreground">
                  {opt.value}={opt.points}
                </span>
              ))}
            </div>
          </div>

          {/* Reset Button - Subtle */}
          <div className="flex justify-center pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-3 h-3 mr-1.5" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Current Step Content */}
      {currentStep === 1 && renderLevelSelection()}
      {currentStep === 2 && renderCourseEntry()}
      {currentStep === 3 && renderResults()}
    </div>
  );
}
