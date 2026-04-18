// Re-export all CGPA calculation utilities
export * from './foundation';
export * from './diploma';
export * from './degree';

// Common function to calculate overall CGPA across all levels
import { CourseGrade } from './foundation';

export function calculateOverallCGPA(courses: CourseGrade[]): number {
  if (courses.length === 0) return 0;

  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach((course) => {
    totalCredits += course.credits;
    totalGradePoints += course.credits * course.gradePoint;
  });

  return totalGradePoints / totalCredits;
} 