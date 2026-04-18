// Define constants for grade thresholds
export const gradeThresholds = [
  { grade: 'S', min: 90, max: 100, points: 10 },
  { grade: 'A', min: 80, max: 89, points: 9 },
  { grade: 'B', min: 70, max: 79, points: 8 },
  { grade: 'C', min: 60, max: 69, points: 7 },
  { grade: 'D', min: 50, max: 59, points: 6 },
  { grade: 'E', min: 40, max: 49, points: 4 }
];

// Foundation level subjects
export const foundationSubjects = [
  { value: 'BSCCS1004', label: 'Mathematics for Data Science 1', code: 'BSCCS1004' },
  { value: 'BSCCS1005', label: 'English 1', code: 'BSCCS1005' },
  { value: 'BSCCS1003', label: 'Computational Thinking', code: 'BSCCS1003' },
  { value: 'BSCCS1002', label: 'Statistics for Data Science 1', code: 'BSCCS1002' },
  { value: 'BSCCS1001', label: 'Intro to Python Programming', code: 'BSCCS1001' },
  { value: 'BSCCS1006', label: 'Mathematics for Data Science 2', code: 'BSCCS1006' },
  { value: 'BSCCS1007', label: 'Statistics for Data Science 2', code: 'BSCCS1007' },
  { value: 'BSCCS1008', label: 'English 2', code: 'BSCCS1008' }
];

// Input interface for prediction (no GAA fields anymore)
export interface FoundationPredictorInput {
  subject: string;
  quiz1?: number;
  quiz2?: number;
  pe1?: number;  // OPPE-1 for Python
  pe2?: number;  // OPPE-2 for Python
  targetGrade?: string;
  [key: string]: string | number | undefined;
}

// Result interface for prediction
export interface PredictionResult {
  grade: string;
  required: number;
  achievable: boolean;
}

/**
 * Get required fields based on selected subject
 * NOTE: GAA fields removed - no longer required for any foundation subject
 */
export function getRequiredFields(subject: string): string[] {
  if (subject === 'BSCCS1001') { // Python
    // Quiz 1, OPPE-1, OPPE-2 (Final Exam is what we're predicting)
    return ['quiz1', 'pe1', 'pe2'];
  } else {
    // All other subjects: Quiz 1, Quiz 2 (Final Exam is what we're predicting)
    return ['quiz1', 'quiz2'];
  }
}

/**
 * Check eligibility for standard foundation subjects
 * Now only checks if at least one quiz was attended
 */
function checkStandardEligibility(quiz1?: number, quiz2?: number): { eligible: boolean, reason: string } {
  // Check if attended at least one quiz
  if ((quiz1 === 0 || quiz1 === undefined) && (quiz2 === 0 || quiz2 === undefined)) {
    return { eligible: false, reason: 'Must attend at least one quiz' };
  }

  return { eligible: true, reason: '' };
}

/**
 * Check eligibility for Python Programming
 */
function checkPythonEligibility(quiz1?: number, pe1?: number, pe2?: number): { eligible: boolean, reason: string } {
  // Check if attended quiz
  if (quiz1 === 0 || quiz1 === undefined) {
    return { eligible: false, reason: 'Must attend Quiz 1' };
  }

  // Check if attempted at least one OPPE with score >= 40
  const maxPE = Math.max(pe1 || 0, pe2 || 0);
  if (maxPE < 40) {
    return { eligible: false, reason: 'Must score at least 40/100 in one OPPE' };
  }

  return { eligible: true, reason: '' };
}

/**
 * Calculate required final exam score for standard subjects
 * Formula: T = max(0.6F + 0.3*max(Qz1, Qz2), 0.45F + 0.25*Qz1 + 0.3*Qz2)
 */
function calculateStandard(quiz1: number, quiz2: number, targetScore: number): number {
  const maxQuiz = Math.max(quiz1, quiz2);

  // Formula 1: T = 0.6*F + 0.3*max(Qz1, Qz2)
  // F = (T - 0.3*max(Qz1, Qz2)) / 0.6
  const formula1 = (targetScore - 0.3 * maxQuiz) / 0.6;

  // Formula 2: T = 0.45*F + 0.25*Qz1 + 0.3*Qz2
  // F = (T - 0.25*Qz1 - 0.3*Qz2) / 0.45
  const formula2 = (targetScore - 0.25 * quiz1 - 0.3 * quiz2) / 0.45;

  // Return the minimum (easier to achieve)
  return Math.min(formula1, formula2);
}

/**
 * Calculate required final exam score for Python Programming
 * Formula: T = 0.15*Qz1 + 0.4*F + 0.25*max(PE1, PE2) + 0.2*min(PE1, PE2)
 */
function calculatePython(quiz1: number, pe1: number, pe2: number, targetScore: number): number {
  const quiz1Component = 0.15 * quiz1;
  const maxPE = Math.max(pe1, pe2);
  const minPE = Math.min(pe1, pe2);
  const peMaxComponent = 0.25 * maxPE;
  const peMinComponent = 0.2 * minPE;

  // T = 0.15*Qz1 + 0.4*F + 0.25*max(PE1, PE2) + 0.2*min(PE1, PE2)
  // F = (T - 0.15*Qz1 - 0.25*max(PE1, PE2) - 0.2*min(PE1, PE2)) / 0.4
  return (targetScore - quiz1Component - peMaxComponent - peMinComponent) / 0.4;
}

/**
 * Get the formula as a string for display purposes
 */
export function getFormula(subject: string): string {
  if (subject === 'BSCCS1001') { // Python
    return 'T = 0.15×Qz1 + 0.4×F + 0.25×max(PE1, PE2) + 0.2×min(PE1, PE2)';
  } else if (subject === 'BSCCS1002' || subject === 'BSCCS1007') { // Stats 1 or Stats 2
    return 'T = max(0.6×F + 0.3×max(Qz1, Qz2), 0.45×F + 0.25×Qz1 + 0.3×Qz2) + Bonus (up to 5)';
  } else if (subject === 'BSCCS1006') { // Math 2
    return 'T = max(0.6×F + 0.3×max(Qz1, Qz2), 0.45×F + 0.25×Qz1 + 0.3×Qz2) + Bonus (up to 6)';
  } else {
    return 'T = max(0.6×F + 0.3×max(Qz1, Qz2), 0.45×F + 0.25×Qz1 + 0.3×Qz2)';
  }
}

/**
 * Calculate predictions for all grades
 */
export function calculatePredictions(input: FoundationPredictorInput): PredictionResult[] {
  const { subject, quiz1 = 0, quiz2 = 0, pe1 = 0, pe2 = 0 } = input;

  let eligibility = { eligible: true, reason: '' };

  // Check eligibility based on subject
  if (subject === 'BSCCS1001') { // Python
    eligibility = checkPythonEligibility(quiz1, pe1, pe2);
  } else {
    eligibility = checkStandardEligibility(quiz1, quiz2);
  }

  // If not eligible, mark all grades as not achievable
  if (!eligibility.eligible) {
    return gradeThresholds.map(grade => ({
      grade: grade.grade,
      required: 0,
      achievable: false
    }));
  }

  // Calculate required score for each grade
  return gradeThresholds.map(grade => {
    const targetScore = grade.min; // Target the minimum score needed for this grade
    let requiredFinalScore = 0;

    if (subject === 'BSCCS1001') { // Python
      requiredFinalScore = calculatePython(quiz1, pe1, pe2, targetScore);
    } else { // All other subjects use the same standard formula
      requiredFinalScore = calculateStandard(quiz1, quiz2, targetScore);
    }

    // Round to nearest integer and cap between 0 and 100
    const finalScore = Math.max(0, Math.min(100, Math.round(requiredFinalScore)));

    // Check if the required score is achievable (less than or equal to 100)
    const achievable = requiredFinalScore <= 100;

    return {
      grade: grade.grade,
      required: finalScore,
      achievable
    };
  });
}