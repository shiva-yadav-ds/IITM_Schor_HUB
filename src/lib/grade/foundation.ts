// Define CourseGrade interface for CGPA calculation
export interface CourseGrade {
  courseCode: string;
  courseName: string;
  credits: number;
  score: number;
  grade: string;
  gradePoint: number;
}

// Parameters for calculating foundation level course scores
// NOTE: GAA has been removed from all foundation subjects as per new rules
export interface FoundationParams {
  subject: string;
  quiz1?: number;
  quiz2?: number;
  finalExam?: number;
  pe1?: number;  // OPPE-1 for Python
  pe2?: number;  // OPPE-2 for Python
  extraActivityBonus?: number;  // For Stats 1, Stats 2, Math 2
  [key: string]: string | number | undefined;
}

/**
 * Apply rounding rule to scores:
 * - If decimal part is > 0.5, round up to next integer
 * - If decimal part is <= 0.5, keep the integer part
 */
function roundScore(score: number): number {
  const integerPart = Math.floor(score);
  const decimalPart = score - integerPart;

  if (decimalPart > 0.5) {
    return integerPart + 1;
  }
  return integerPart;
}

/**
 * Result interface for Foundation score calculations
 */
export interface FoundationScoreResult {
  baseScore: number;
  finalScore: number;
  bonusApplied: number;
  formula: string;
}

/**
 * Calculate foundation scores based on new formulas (no GAA)
 * Now includes +2% universal bonus display
 * 
 * New Formulas:
 * - Standard subjects: T = max(0.6F + 0.3*max(Qz1, Qz2), 0.45F + 0.25*Qz1 + 0.3*Qz2)
 * - Stats 1 & Stats 2: Above + up to 5 bonus marks
 * - Math 2: Above + up to 6 bonus marks (capped to 100)
 * - Python: T = 0.15*Qz1 + 0.4*F + 0.25*max(PE1, PE2) + 0.2*min(PE1, PE2)
 */
export function calculateFoundationScores(params: FoundationParams): FoundationScoreResult {
  const {
    subject,
    quiz1 = 0,
    quiz2 = 0,
    finalExam = 0,
    extraActivityBonus = 0,
    pe1 = 0,
    pe2 = 0
  } = params;

  let calculatedScore = 0;
  let subjectBonus = 0;
  let formula = '';

  // Python Programming - completely different formula
  if (subject === 'BSCCS1001') {
    // T = 0.15*Qz1 + 0.4*F + 0.25*max(PE1, PE2) + 0.2*min(PE1, PE2)
    calculatedScore = 0.15 * quiz1 + 0.4 * finalExam +
      0.25 * Math.max(pe1, pe2) + 0.2 * Math.min(pe1, pe2);
    formula = 'T = 0.15×Qz1 + 0.4×F + 0.25×max(PE1,PE2) + 0.2×min(PE1,PE2)';
  }
  // Statistics 1 - has extra activity bonus (up to 5)
  else if (subject === 'BSCCS1002') {
    const maxQuizScore = Math.max(quiz1, quiz2);
    const formula1 = 0.6 * finalExam + 0.3 * maxQuizScore;
    const formula2 = 0.45 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    calculatedScore = Math.max(formula1, formula2);

    // Bonus only applied when passing (T >= 40)
    if (calculatedScore >= 40) {
      subjectBonus = Math.min(5, extraActivityBonus);
    }
    formula = 'T = max(0.6F + 0.3×max(Qz1,Qz2), 0.45F + 0.25×Qz1 + 0.3×Qz2) + Bonus';
  }
  // Mathematics 2 - has extra activity bonus (up to 6)
  else if (subject === 'BSCCS1006') {
    const maxQuizScore = Math.max(quiz1, quiz2);
    const formula1 = 0.6 * finalExam + 0.3 * maxQuizScore;
    const formula2 = 0.45 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    calculatedScore = Math.max(formula1, formula2);

    // Bonus applied (capped to 100)
    subjectBonus = Math.min(6, extraActivityBonus);
    formula = 'T = max(0.6F + 0.3×max(Qz1,Qz2), 0.45F + 0.25×Qz1 + 0.3×Qz2) + Bonus';
  }
  // Statistics 2 - has extra activity bonus (up to 5)
  else if (subject === 'BSCCS1007') {
    const maxQuizScore = Math.max(quiz1, quiz2);
    const formula1 = 0.6 * finalExam + 0.3 * maxQuizScore;
    const formula2 = 0.45 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    calculatedScore = Math.max(formula1, formula2);

    // Bonus only applied when passing (T >= 40)
    if (calculatedScore >= 40) {
      subjectBonus = Math.min(5, extraActivityBonus);
    }
    formula = 'T = max(0.6F + 0.3×max(Qz1,Qz2), 0.45F + 0.25×Qz1 + 0.3×Qz2) + Bonus';
  }
  // All other subjects: Math 1, English 1, Computational Thinking, English 2
  else {
    const maxQuizScore = Math.max(quiz1, quiz2);
    const formula1 = 0.6 * finalExam + 0.3 * maxQuizScore;
    const formula2 = 0.45 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    calculatedScore = Math.max(formula1, formula2);
    formula = 'T = max(0.6F + 0.3×max(Qz1,Qz2), 0.45F + 0.25×Qz1 + 0.3×Qz2)';
  }

  // Base score = calculated score + subject-specific bonus (this is the actual score)
  const baseScore = Math.min(100, calculatedScore + subjectBonus);

  // Final score = base score + universal 2% bonus (capped at 100)
  const universalBonus = 2;
  const finalScore = Math.min(100, baseScore + universalBonus);

  return {
    baseScore: roundScore(baseScore),
    finalScore: roundScore(finalScore),
    bonusApplied: universalBonus,
    formula
  };
}

/**
 * Calculate total score for foundation level course
 * Returns the final score
 */
export function calculateFoundationTotal(params: FoundationParams): number {
  const result = calculateFoundationScores(params);
  return result.finalScore;
}

/**
 * Calculate grade and grade points based on score
 */
export function calculateGradeAndPoints(score: number): { grade: string; gradePoint: number } {
  const roundedScore = roundScore(score);

  if (roundedScore >= 90) return { grade: 'S', gradePoint: 10 };
  if (roundedScore >= 80) return { grade: 'A', gradePoint: 9 };
  if (roundedScore >= 70) return { grade: 'B', gradePoint: 8 };
  if (roundedScore >= 60) return { grade: 'C', gradePoint: 7 };
  if (roundedScore >= 50) return { grade: 'D', gradePoint: 6 };
  if (roundedScore >= 40) return { grade: 'E', gradePoint: 4 };
  return { grade: 'U', gradePoint: 0 };
}

/**
 * Calculate CGPA for foundation level courses
 */
export function calculateFoundationCGPA(courses: CourseGrade[]): number {
  if (courses.length === 0) return 0;

  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach((course) => {
    totalCredits += course.credits;
    totalGradePoints += course.credits * course.gradePoint;
  });

  return totalGradePoints / totalCredits;
}

/**
 * Foundation level subjects with their credits
 */
export const foundationSubjects = [
  { value: 'BSCCS1001', label: 'Intro to Python Programming', credits: 4 },
  { value: 'BSCCS1002', label: 'Statistics for Data Science 1', credits: 4 },
  { value: 'BSCCS1003', label: 'Computational Thinking', credits: 4 },
  { value: 'BSCCS1004', label: 'Mathematics for Data Science 1', credits: 4 },
  { value: 'BSCCS1005', label: 'English 1', credits: 4 },
  { value: 'BSCCS1006', label: 'Mathematics for Data Science 2', credits: 4 },
  { value: 'BSCCS1007', label: 'Statistics for Data Science 2', credits: 4 },
  { value: 'BSCCS1008', label: 'English 2', credits: 4 }
];

/**
 * Get course details based on subject code
 */
export function getSubjectDetails(subject: string): { name: string; code: string } {
  const subjectInfo = foundationSubjects.find(s => s.value === subject);

  if (!subjectInfo) {
    return { name: "", code: subject };
  }

  return {
    name: subjectInfo.label,
    code: subjectInfo.value
  };
}

/**
 * Get required input fields based on course
 * NOTE: GAA fields removed - no longer required for any foundation subject
 */
export function getRequiredFields(subject: string): string[] {
  if (subject === 'BSCCS1001') { // Python
    // Fields: Quiz 1, OPPE-1, OPPE-2, Final Exam
    return ['quiz1', 'pe1', 'pe2', 'finalExam'];
  } else if (subject === 'BSCCS1002' || subject === 'BSCCS1007') { // Stats 1 or Stats 2
    // Fields: Quiz 1, Quiz 2, Final Exam, Extra Activity Bonus (up to 5)
    return ['quiz1', 'quiz2', 'finalExam', 'extraActivityBonus'];
  } else if (subject === 'BSCCS1006') { // Math 2
    // Fields: Quiz 1, Quiz 2, Final Exam, Extra Activity Bonus (up to 6)
    return ['quiz1', 'quiz2', 'finalExam', 'extraActivityBonus'];
  } else {
    // Math 1, English 1, Computational Thinking, English 2
    // Fields: Quiz 1, Quiz 2, Final Exam
    return ['quiz1', 'quiz2', 'finalExam'];
  }
}

// Round up scores to the nearest integer
export function roundUpScore(score: number): number {
  return Math.ceil(score);
}