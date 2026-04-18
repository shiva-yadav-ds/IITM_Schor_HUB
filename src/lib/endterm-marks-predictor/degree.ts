// Define constants for grade thresholds (same as foundation and diploma)
export const gradeThresholds = [
  { grade: 'S', min: 90, max: 100, points: 10 },
  { grade: 'A', min: 80, max: 89, points: 9 },
  { grade: 'B', min: 70, max: 79, points: 8 },
  { grade: 'C', min: 60, max: 69, points: 7 },
  { grade: 'D', min: 50, max: 59, points: 6 },
  { grade: 'E', min: 40, max: 49, points: 4 },
  { grade: 'U', min: 0, max: 39, points: 0 }
];

// Degree level subjects
export const degreeSubjects = [
  { value: 'ST', label: 'Software Testing', code: 'ST' },
  { value: 'SE', label: 'Software Engineering', code: 'SE' },
  { value: 'DL', label: 'Deep Learning', code: 'DL' },
  { value: 'AIPS', label: 'AI: Search Methods for Problem Solving', code: 'AIPS' },
  { value: 'SPG', label: 'Strategies for Professional Growth', code: 'SPG' },
  { value: 'IBD', label: 'Introduction to Big Data', code: 'IBD' },
  { value: 'PC', label: 'Programming in C', code: 'PC' },
  { value: 'FF', label: 'Financial Forensics', code: 'FF' },
  { value: 'INLP', label: 'Introduction to Natural Language Processing', code: 'INLP' },
  { value: 'CF', label: 'Corporate Finance', code: 'CF' },
  { value: 'DLP', label: 'Deep Learning Practice', code: 'DLP' },
  { value: 'DLCV', label: 'Deep Learning for CV', code: 'DLCV' },
  { value: 'DV', label: 'Data Visualization', code: 'DV' },
  { value: 'ME', label: 'Managerial Economics', code: 'ME' },
  { value: 'ATB', label: 'Algorithmic Thinking in Bioinformatics', code: 'ATB' },
  { value: 'I4', label: 'Industry 4.0', code: 'I4' },
  { value: 'MT', label: 'Mathematical Thinking', code: 'MT' },
  { value: 'LSM', label: 'Linear Statistical Models', code: 'LSM' },
  { value: 'OS', label: 'Operating Systems', code: 'OS' },
  { value: 'STML', label: 'Special Topics in ML (Reinforcement Learning)', code: 'STML' },
  { value: 'BDBN', label: 'Big Data & Biological Networks', code: 'BDBN' },
  { value: 'LLM', label: 'Large Language Models', code: 'LLM' },
  { value: 'CN', label: 'Computer Networks', code: 'CN' },
  { value: 'DSAL', label: 'Data Science and AI Lab', code: 'DSAL' },
  { value: 'ADL', label: 'Application Development Lab', code: 'ADL' },
  { value: 'MR', label: 'Market Research', code: 'MR' },
];

// Input interface for prediction
export interface DegreePredictorInput {
  subject: string;
  gaa?: number;
  gaap?: number;
  quiz1?: number;
  quiz2?: number;
  quiz3?: number;
  f?: number;
  gp?: number;
  gp1?: number;
  gp2?: number;
  pp?: number;
  cp?: number;
  oppe1?: number;
  oppe2?: number;
  nppe1?: number;
  nppe2?: number;
  nppe3?: number;
  gpa?: number;
  viva?: number; // Viva score for Deep Learning Practice
  [key: string]: string | number | undefined;
}

// Result interface for prediction (same as foundation and diploma)
export interface PredictionResult {
  grade: string;
  required: number;
  achievable: boolean;
}

/**
 * Get required fields based on selected subject
 */
export function getRequiredFields(subject: string): string[] {
  switch (subject) {
    case 'ST': // Software Testing
      return ['gaa', 'quiz1', 'quiz2'];
    case 'SE': // Software Engineering
      return ['gaa', 'quiz2', 'gp1', 'gp2', 'pp', 'cp'];
    case 'DL': // Deep Learning
      return ['gaa', 'quiz1', 'quiz2'];
    case 'AIPS': // AI: Search Methods for Problem Solving
      return ['gaa', 'quiz1', 'quiz2'];
    case 'SPG': // Strategies for Professional Growth
      return ['gaa', 'gp', 'quiz2'];
    case 'IBD': // Introduction to Big Data
      return ['gaa', 'oppe1', 'oppe2'];
    case 'PC': // Programming in C
      return ['gaa', 'quiz1', 'oppe1', 'oppe2'];
    case 'FF': // Financial Forensics
      return ['gaa', 'quiz1', 'gp1'];
    case 'INLP': // Introduction to Natural Language Processing
      return ['gaa', 'quiz1', 'quiz2'];
    case 'CF': // Corporate Finance
      return ['gaa', 'quiz1', 'quiz2'];
    case 'DLP': // Deep Learning Practice
      return ['gaa', 'quiz1', 'quiz2', 'quiz3', 'nppe1', 'nppe2', 'nppe3', 'viva'];
    case 'DLCV': // Deep Learning for CV
      return ['gaa', 'quiz1', 'quiz2'];
    case 'DV': // Data Visualization
      return ['gaa', 'quiz1', 'quiz2', 'gp'];
    case 'ME': // Managerial Economics
      return ['gaa', 'quiz1', 'quiz2'];
    case 'ATB': // Algorithmic Thinking in Bioinformatics
      return ['gaa', 'gaap', 'quiz1', 'quiz2'];
    case 'I4': // Industry 4.0
      return ['gaa', 'quiz1', 'quiz2', 'gp'];
    case 'MT': // Mathematical Thinking
      return ['gaa', 'quiz1', 'quiz2'];
    case 'LSM': // Linear Statistical Models
      return ['gaa', 'quiz1', 'quiz2'];
    case 'OS': // Operating Systems
      return ['gaa', 'quiz1', 'quiz2'];
    case 'STML': // Special Topics in ML
      return ['gaa', 'gpa', 'quiz1', 'quiz2'];
    case 'BDBN': // Big Data & Biological Networks
      return ['gaa', 'quiz1', 'quiz2'];
    case 'LLM': // Large Language Models
      return ['gaa', 'quiz1', 'quiz2'];
    case 'CN': // Computer Networks
      return ['gaa', 'gaap', 'quiz1', 'quiz2'];
    case 'DSAL': // Data Science and AI Lab (no end term, uses Viva)
      return ['gaa', 'quiz2', 'gp', 'viva'];
    case 'ADL': // Application Development Lab (no end term, uses Viva)
      return ['gaa', 'quiz2', 'viva'];
    case 'MR': // Market Research
      return ['gaa', 'quiz1', 'quiz2', 'gp'];
    default:
      return [];
  }
}

/**
 * Check eligibility based on course requirements
 */
function checkEligibility(input: DegreePredictorInput): { eligible: boolean, reason: string } {
  const {
    subject,
    gaa = 0,
    gaap = 0,
    quiz1 = 0,
    quiz2 = 0,
    quiz3 = 0,
    gp1 = 0,
    oppe1 = 0,
    oppe2 = 0,
    gp = 0
  } = input;

  // Common eligibility rules for most courses
  // Best 5 out of first 7 weeks GAA should be >= 40/100
  const weeklyAssessmentAvg = gaa;
  const hasAttendedQuiz = quiz1 > 0 || quiz2 > 0 || quiz3 > 0;

  // Base eligibility check that applies to most subjects
  if (weeklyAssessmentAvg < 40) {
    return { eligible: false, reason: 'Best 5 out of the first 7 weeks\' GAA must be at least 40/100' };
  }

  // Subject-specific eligibility rules
  switch (subject) {
    case 'ST':
    case 'DL':
    case 'AIPS':
    case 'INLP':
    case 'CF':
    case 'DLP':
    case 'DLCV':
    case 'ME':
    case 'ATB':
    case 'MT':
    case 'LSM':
    case 'OS':
    case 'BDBN':
    case 'LLM':
      // These subjects require attendance in at least one quiz
      if (!hasAttendedQuiz) {
        return { eligible: false, reason: 'Must attend at least one quiz' };
      }
      break;

    case 'SE':
      // Software Engineering specific rules
      if (gp1 <= 0) {
        return { eligible: false, reason: 'Submission of Group Project Milestones 1-3 is required' };
      }
      break;

    case 'IBD':
    case 'PC':
      // Programming subjects might require scoring in programming exams
      if (oppe1 < 40 && oppe2 < 40) {
        return { eligible: false, reason: 'Must score at least 40/100 in one of the programming exams' };
      }
      break;

    case 'FF':
      // Financial Forensics has a higher GAA requirement
      if (weeklyAssessmentAvg < 50) {
        return { eligible: false, reason: 'Best 5 out of the first 7 weeks\' GAA must be at least 50/100' };
      }
      break;

    case 'DV':
      // Data Visualization requires project score > 50
      if (gp < 50) {
        return { eligible: false, reason: 'Group Project score must be at least 50/100' };
      }
      if (!hasAttendedQuiz) {
        return { eligible: false, reason: 'Must attend at least one quiz' };
      }
      break;

    case 'I4':
      // Industry 4.0 requires at least one quiz and project participation
      if (!hasAttendedQuiz) {
        return { eligible: false, reason: 'Must attend at least one quiz' };
      }
      if (gp <= 0) {
        return { eligible: false, reason: 'Participation in the project is required' };
      }
      break;

    case 'STML':
      // Special Topics in ML requires at least one quiz
      if (!hasAttendedQuiz) {
        return { eligible: false, reason: 'Must attend at least one quiz' };
      }
      break;
  }

  return { eligible: true, reason: '' };
}

/**
 * Calculate required final exam score for Software Testing
 */
function calculateST(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.25 * quiz1;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2
  // T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2 = 0.4×F
  // F = (T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2) / 0.4

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.4;
}

/**
 * Calculate required final exam score for Software Engineering
 */
function calculateSE(gaa: number, quiz2: number, gp1: number, gp2: number, pp: number, cp: number, targetScore: number): number {
  // T = 0.05×GAA + 0.2×Qz2 + 0.4×F + 0.1×GP1 + 0.1×GP2 + 0.1×PP + 0.05×CP

  const gaaComponent = 0.05 * gaa;
  const quiz2Component = 0.2 * quiz2;
  const gp1Component = 0.1 * gp1;
  const gp2Component = 0.1 * gp2;
  const ppComponent = 0.1 * pp;
  const cpComponent = 0.05 * cp;

  // T = 0.05×GAA + 0.2×Qz2 + 0.4×F + 0.1×GP1 + 0.1×GP2 + 0.1×PP + 0.05×CP
  // T - 0.05×GAA - 0.2×Qz2 - 0.1×GP1 - 0.1×GP2 - 0.1×PP - 0.05×CP = 0.4×F
  // F = (T - 0.05×GAA - 0.2×Qz2 - 0.1×GP1 - 0.1×GP2 - 0.1×PP - 0.05×CP) / 0.4

  return (targetScore - gaaComponent - quiz2Component - gp1Component - gp2Component - ppComponent - cpComponent) / 0.4;
}

/**
 * Calculate required final exam score for Deep Learning
 */
function calculateDL(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.05×GAA + 0.25×Qz1 + 0.25×Qz2 + 0.45×F
  // (Bonus marks not included as they are added after base score calculation)

  const gaaComponent = 0.05 * gaa;
  const quiz1Component = 0.25 * quiz1;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.05×GAA + 0.25×Qz1 + 0.25×Qz2 + 0.45×F
  // T - 0.05×GAA - 0.25×Qz1 - 0.25×Qz2 = 0.45×F
  // F = (T - 0.05×GAA - 0.25×Qz1 - 0.25×Qz2) / 0.45

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.45;
}

/**
 * Calculate required final exam score for AI: Search Methods for Problem Solving
 */
function calculateAIPS(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + max(0.45×F + 0.35×max(Qz1, Qz2), 0.4×F + 0.25×Qz1 + 0.25×Qz2)

  const gaaComponent = 0.1 * gaa;

  // We need to adjust the target score to account for bonus marks
  const adjustedTarget = targetScore;

  // Now we need to solve for F in each of the max() formulas

  // Formula 1: T = 0.1×GAA + 0.45×F + 0.35×max(Qz1, Qz2)
  // adjustedTarget - 0.1×GAA - 0.35×max(Qz1, Qz2) = 0.45×F
  // F = (adjustedTarget - 0.1×GAA - 0.35×max(Qz1, Qz2)) / 0.45
  const maxQuiz = Math.max(quiz1, quiz2);
  const formula1 = (adjustedTarget - gaaComponent - 0.35 * maxQuiz) / 0.45;

  // Formula 2: T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2
  // adjustedTarget - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2 = 0.4×F
  // F = (adjustedTarget - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2) / 0.4
  const formula2 = (adjustedTarget - gaaComponent - 0.25 * quiz1 - 0.25 * quiz2) / 0.4;

  // We want the minimum F that satisfies either formula
  return Math.min(formula1, formula2);
}

/**
 * Calculate required final exam score for Strategies for Professional Growth
 */
function calculateSPG(gaa: number, gp: number, quiz2: number, targetScore: number): number {
  // T = 0.15×GAA + 0.25×GP + 0.25×Qz2 + 0.35×F

  const gaaComponent = 0.15 * gaa;
  const gpComponent = 0.25 * gp;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.15×GAA + 0.25×GP + 0.25×Qz2 + 0.35×F
  // T - 0.15×GAA - 0.25×GP - 0.25×Qz2 = 0.35×F
  // F = (T - 0.15×GAA - 0.25×GP - 0.25×Qz2) / 0.35

  return (targetScore - gaaComponent - gpComponent - quiz2Component) / 0.35;
}

/**
 * Calculate required final exam score for Introduction to Big Data
 */
function calculateIBD(gaa: number, oppe1: number, oppe2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.3×F + 0.2×OPPE1 + 0.4×OPPE2

  const gaaComponent = 0.1 * gaa;
  const oppe1Component = 0.2 * oppe1;
  const oppe2Component = 0.4 * oppe2;

  // T = 0.1×GAA + 0.3×F + 0.2×OPPE1 + 0.4×OPPE2
  // T - 0.1×GAA - 0.2×OPPE1 - 0.4×OPPE2 = 0.3×F
  // F = (T - 0.1×GAA - 0.2×OPPE1 - 0.4×OPPE2) / 0.3

  return (targetScore - gaaComponent - oppe1Component - oppe2Component) / 0.3;
}

/**
 * Calculate required final exam score for Programming in C
 */
function calculatePC(gaa: number, gaap: number, quiz1: number, oppe1: number, oppe2: number, targetScore: number): number {
  // T = 0.10×GAA + 0.20×Qz1 + 0.20×OPPE1 + 0.20×OPPE2 + 0.30×F

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.2 * quiz1;
  const oppe1Component = 0.2 * oppe1;
  const oppe2Component = 0.2 * oppe2;

  // T = 0.10×GAA + 0.20×Qz1 + 0.20×OPPE1 + 0.20×OPPE2 + 0.30×F
  // T - 0.10×GAA - 0.20×Qz1 - 0.20×OPPE1 - 0.20×OPPE2 = 0.30×F
  // F = (T - 0.10×GAA - 0.20×Qz1 - 0.20×OPPE1 - 0.20×OPPE2) / 0.30

  return (targetScore - gaaComponent - quiz1Component - oppe1Component - oppe2Component) / 0.3;
}

/**
 * Calculate required final exam score for Financial Forensics
 */
function calculateFF(gaa: number, quiz1: number, gp1: number, targetScore: number): number {
  // T = 0.1×GAA + max(0.25×Qz1 + 0.3×GP1 + 0.35×F, 0.5×F + 0.3×max(Qz1, GP1))

  const gaaComponent = 0.1 * gaa;

  // Now we need to solve for F in each of the max() formulas

  // Formula 1: T = 0.1×GAA + 0.25×Qz1 + 0.3×GP1 + 0.35×F
  // T - 0.1×GAA - 0.25×Qz1 - 0.3×GP1 = 0.35×F
  // F = (T - 0.1×GAA - 0.25×Qz1 - 0.3×GP1) / 0.35
  const formula1 = (targetScore - gaaComponent - 0.25 * quiz1 - 0.3 * gp1) / 0.35;

  // Formula 2: T = 0.1×GAA + 0.5×F + 0.3×max(Qz1, GP1)
  // T - 0.1×GAA - 0.3×max(Qz1, GP1) = 0.5×F
  // F = (T - 0.1×GAA - 0.3×max(Qz1, GP1)) / 0.5
  const maxQuizGP = Math.max(quiz1, gp1);
  const formula2 = (targetScore - gaaComponent - 0.3 * maxQuizGP) / 0.5;

  // We want the minimum F that satisfies either formula
  return Math.min(formula1, formula2);
}

/**
 * Calculate required final exam score for Introduction to Natural Language Processing
 */
function calculateINLP(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.5×F + 0.2×Qz1 + 0.2×Qz2

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.2 * quiz1;
  const quiz2Component = 0.2 * quiz2;

  // T = 0.1×GAA + 0.5×F + 0.2×Qz1 + 0.2×Qz2
  // T - 0.1×GAA - 0.2×Qz1 - 0.2×Qz2 = 0.5×F
  // F = (T - 0.1×GAA - 0.2×Qz1 - 0.2×Qz2) / 0.5

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.5;
}

/**
 * Calculate required final exam score for Corporate Finance
 */
function calculateCF(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.4×F + 0.2×Qz1 + 0.3×Qz2

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.2 * quiz1;
  const quiz2Component = 0.3 * quiz2;

  // T = 0.1×GAA + 0.4×F + 0.2×Qz1 + 0.3×Qz2
  // T - 0.1×GAA - 0.2×Qz1 - 0.3×Qz2 = 0.4×F
  // F = (T - 0.1×GAA - 0.2×Qz1 - 0.3×Qz2) / 0.4

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.4;
}

/**
 * Calculate required Viva score for Deep Learning Practice
 * This course uses Viva instead of Final Exam
 */
function calculateDLP(gaa: number, quiz1: number, quiz2: number, quiz3: number, nppe1: number, nppe2: number, nppe3: number, targetScore: number): number {
  // T = 0.05×GA + 0.15×Qz1 + 0.15×Qz2 + 0.15×Qz3 + 0.25×Avg(NPPE) + 0.25×Viva

  const gaaComponent = 0.05 * gaa;
  const quiz1Component = 0.15 * quiz1;
  const quiz2Component = 0.15 * quiz2;
  const quiz3Component = 0.15 * quiz3;
  const nppeAverage = (nppe1 + nppe2 + nppe3) / 3;
  const nppeComponent = 0.25 * nppeAverage;

  // T = 0.05×GA + 0.15×Qz1 + 0.15×Qz2 + 0.15×Qz3 + 0.25×Avg(NPPE) + 0.25×Viva
  // T - other components = 0.25×Viva
  // Viva = (T - other components) / 0.25

  return (targetScore - gaaComponent - quiz1Component - quiz2Component - quiz3Component - nppeComponent) / 0.25;
}

/**
 * Calculate required final exam score for Deep Learning for CV
 */
function calculateDLCV(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.25 * quiz1;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2
  // T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2 = 0.4×F
  // F = (T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2) / 0.4

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.4;
}

/**
 * Calculate required final exam score for Data Visualization
 */
function calculateDV(gaa: number, quiz1: number, quiz2: number, gp: number, targetScore: number): number {
  // T = 0.3×GA + max(0.2×Qz1 + 0.2×Qz2, 0.3×max(Qz1, Qz2)) + 0.3×P

  const gaaComponent = 0.3 * gaa;
  const gpComponent = 0.3 * gp;

  // Calculate the maximum of the two quiz formulas
  const quizFormula1 = 0.2 * quiz1 + 0.2 * quiz2;
  const quizFormula2 = 0.3 * Math.max(quiz1, quiz2);
  const quizComponent = Math.max(quizFormula1, quizFormula2);

  // Since this formula doesn't have an F component, return 0
  // The prediction results will check if the current total meets the target
  const currentTotal = gaaComponent + quizComponent + gpComponent;

  // If current total already meets or exceeds target, return 0
  // Otherwise, this grade is not achievable
  if (currentTotal >= targetScore) {
    return 0;
  } else {
    return 101; // Not achievable (requires > 100%)
  }
}

/**
 * Calculate required final exam score for Managerial Economics
 */
function calculateME(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.15×GAA + max(0.2×Qz1 + 0.2×Qz2 + 0.45×F, 0.5×F + 0.25×max(Qz1, Qz2))

  const gaaComponent = 0.15 * gaa;

  // We need to solve for F in each formula and take the minimum

  // Formula 1: T = 0.15×GAA + 0.2×Qz1 + 0.2×Qz2 + 0.45×F
  // T - 0.15×GAA - 0.2×Qz1 - 0.2×Qz2 = 0.45×F
  // F = (T - 0.15×GAA - 0.2×Qz1 - 0.2×Qz2) / 0.45
  const formula1 = (targetScore - gaaComponent - 0.2 * quiz1 - 0.2 * quiz2) / 0.45;

  // Formula 2: T = 0.15×GAA + 0.5×F + 0.25×max(Qz1, Qz2)
  // T - 0.15×GAA - 0.25×max(Qz1, Qz2) = 0.5×F
  // F = (T - 0.15×GAA - 0.25×max(Qz1, Qz2)) / 0.5
  const maxQuiz = Math.max(quiz1, quiz2);
  const formula2 = (targetScore - gaaComponent - 0.25 * maxQuiz) / 0.5;

  // Return the minimum required score from the two formulas
  return Math.min(formula1, formula2);
}

/**
 * Calculate required final exam score for Algorithmic Thinking in Bioinformatics
 */
function calculateATB(gaa: number, gaap: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.075×GAA + 0.025×GRPa + 0.25×Qz1 + 0.25×Qz2 + 0.4×F

  const gaaComponent = 0.075 * gaa;
  const gaapComponent = 0.025 * gaap;
  const quiz1Component = 0.25 * quiz1;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.075×GAA + 0.025×GRPa + 0.25×Qz1 + 0.25×Qz2 + 0.4×F
  // T - components = 0.4×F
  // F = (T - components) / 0.4

  return (targetScore - gaaComponent - gaapComponent - quiz1Component - quiz2Component) / 0.4;
}

/**
 * Calculate required final exam score for Industry 4.0
 */
function calculateI4(gaa: number, quiz1: number, quiz2: number, gp: number, targetScore: number): number {
  // T = 0.4×A + 0.15×Qz1 + 0.15×Qz2 + 0.3×F + Project

  const assignmentComponent = 0.4 * gaa;
  const quiz1Component = 0.15 * quiz1;
  const quiz2Component = 0.15 * quiz2;
  const projectComponent = gp; // Project score (up to 10 marks)

  // T = 0.4×A + 0.15×Qz1 + 0.15×Qz2 + 0.3×F + Project
  // T - 0.4×A - 0.15×Qz1 - 0.15×Qz2 - Project = 0.3×F
  // F = (T - 0.4×A - 0.15×Qz1 - 0.15×Qz2 - Project) / 0.3

  return (targetScore - assignmentComponent - quiz1Component - quiz2Component - projectComponent) / 0.3;
}

/**
 * Calculate required final exam score for Mathematical Thinking
 */
function calculateMT(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + max(0.6×F + 0.2×max(Qz1, Qz2), 0.4×F + 0.2×Qz1 + 0.3×Qz2)

  const gaaComponent = 0.1 * gaa;

  // We need to solve for F in each formula and take the minimum

  // Formula 1: T = 0.1×GAA + 0.6×F + 0.2×max(Qz1, Qz2)
  // T - 0.1×GAA - 0.2×max(Qz1, Qz2) = 0.6×F
  // F = (T - 0.1×GAA - 0.2×max(Qz1, Qz2)) / 0.6
  const maxQuiz = Math.max(quiz1, quiz2);
  const formula1 = (targetScore - gaaComponent - 0.2 * maxQuiz) / 0.6;

  // Formula 2: T = 0.1×GAA + 0.4×F + 0.2×Qz1 + 0.3×Qz2
  // T - 0.1×GAA - 0.2×Qz1 - 0.3×Qz2 = 0.4×F
  // F = (T - 0.1×GAA - 0.2×Qz1 - 0.3×Qz2) / 0.4
  const formula2 = (targetScore - gaaComponent - 0.2 * quiz1 - 0.3 * quiz2) / 0.4;

  // Return the minimum required score from the two formulas
  return Math.min(formula1, formula2);
}

/**
 * Calculate required final exam score for Linear Statistical Models
 */
function calculateLSM(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + max(0.6×F + 0.2×max(Qz1, Qz2), 0.4×F + 0.25×Qz1 + 0.25×Qz2)

  const gaaComponent = 0.1 * gaa;

  // We need to solve for F in each formula and take the minimum

  // Formula 1: T = 0.1×GAA + 0.6×F + 0.2×max(Qz1, Qz2)
  // T - 0.1×GAA - 0.2×max(Qz1, Qz2) = 0.6×F
  // F = (T - 0.1×GAA - 0.2×max(Qz1, Qz2)) / 0.6
  const maxQuiz = Math.max(quiz1, quiz2);
  const formula1 = (targetScore - gaaComponent - 0.2 * maxQuiz) / 0.6;

  // Formula 2: T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2
  // T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2 = 0.4×F
  // F = (T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2) / 0.4
  const formula2 = (targetScore - gaaComponent - 0.25 * quiz1 - 0.25 * quiz2) / 0.4;

  // Return the minimum required score from the two formulas
  return Math.min(formula1, formula2);
}

/**
 * Calculate required final exam score for Operating Systems
 */
function calculateOS(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.25 * quiz1;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2
  // T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2 = 0.4×F
  // F = (T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2) / 0.4

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.4;
}

/**
 * Calculate required final exam score for Special Topics in ML (Reinforcement Learning)
 */
function calculateSTML(gaa: number, gpa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.05×GAA + 0.25×GPA + 0.2×Qz1 + 0.2×Qz2 + 0.3×F

  const gaaComponent = 0.05 * gaa;
  const gpaComponent = 0.25 * gpa;
  const quiz1Component = 0.2 * quiz1;
  const quiz2Component = 0.2 * quiz2;

  // T = 0.05×GAA + 0.25×GPA + 0.2×Qz1 + 0.2×Qz2 + 0.3×F
  // T - components = 0.3×F
  // F = (T - components) / 0.3

  return (targetScore - gaaComponent - gpaComponent - quiz1Component - quiz2Component) / 0.3;
}

/**
 * Calculate required final exam score for Big Data & Biological Networks
 */
function calculateBDBN(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.25 * quiz1;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2
  // T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2 = 0.4×F
  // F = (T - 0.1×GAA - 0.25×Qz1 - 0.25×Qz2) / 0.4

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.4;
}

/**
 * Calculate required final exam score for Large Language Models
 */
function calculateLLM(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.05×GAA + 0.35×F + 0.3×Qz1 + 0.3×Qz2

  const gaaComponent = 0.05 * gaa;
  const quiz1Component = 0.3 * quiz1;
  const quiz2Component = 0.3 * quiz2;

  // T = 0.05×GAA + 0.35×F + 0.3×Qz1 + 0.3×Qz2
  // T - 0.05×GAA - 0.3×Qz1 - 0.3×Qz2 = 0.35×F
  // F = (T - 0.05×GAA - 0.3×Qz1 - 0.3×Qz2) / 0.35

  return (targetScore - gaaComponent - quiz1Component - quiz2Component) / 0.35;
}

/**
 * Calculate required final exam score for Computer Networks
 */
function calculateCN(gaa: number, gaap: number, quiz1: number, quiz2: number, targetScore: number): number {
  // T = 0.1×GAA + 0.3×F + 0.25×Qz1 + 0.25×Qz2 + 0.1×Prog

  const gaaComponent = 0.1 * gaa;
  const gaapComponent = 0.1 * gaap;
  const quiz1Component = 0.25 * quiz1;
  const quiz2Component = 0.25 * quiz2;

  // T = 0.1×GAA + 0.3×F + 0.25×Qz1 + 0.25×Qz2 + 0.1×Prog
  // F = (T - components) / 0.3

  return (targetScore - gaaComponent - gaapComponent - quiz1Component - quiz2Component) / 0.3;
}

/**
 * Calculate required final exam score for Market Research
 */
function calculateMR(gaa: number, quiz1: number, quiz2: number, project: number, targetScore: number): number {
  // T = 0.1×GAA + 0.2×Qz1 + 0.2×Qz2 + 0.25×Project + 0.25×F

  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.2 * quiz1;
  const quiz2Component = 0.2 * quiz2;
  const projectComponent = 0.25 * project;

  // T = 0.1×GAA + 0.2×Qz1 + 0.2×Qz2 + 0.25×P + 0.25×F
  // F = (T - components) / 0.25

  return (targetScore - gaaComponent - quiz1Component - quiz2Component - projectComponent) / 0.25;
}

/**
 * Calculate predictions for all grades
 */
export function calculatePredictions(input: DegreePredictorInput): PredictionResult[] {
  const { subject } = input;

  // Check eligibility
  const eligibility = checkEligibility(input);
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
    let achievable = true;

    // Special handling for DLP which uses Viva instead of final exam
    if (subject === 'DLP') {
      // Calculate required Viva score for DLP
      requiredFinalScore = calculateDLP(
        input.gaa || 0,
        input.quiz1 || 0,
        input.quiz2 || 0,
        input.quiz3 || 0,
        input.nppe1 || 0,
        input.nppe2 || 0,
        input.nppe3 || 0,
        targetScore
      );

      // Check if achievable (Viva score between 0 and 100)
      achievable = requiredFinalScore >= 0 && requiredFinalScore <= 100;

      return {
        grade: grade.grade,
        required: Math.max(0, Math.ceil(requiredFinalScore)),
        achievable
      };
    }

    // Special handling for DV which doesn't have a final exam component
    if (subject === 'DV') {
      // Calculate required for DV
      requiredFinalScore = calculateDV(
        input.gaa || 0,
        input.quiz1 || 0,
        input.quiz2 || 0,
        input.gp || 0,
        targetScore
      );

      // Check if achievable (DV doesn't have a final component, so if we get 101, it's not achievable)
      achievable = requiredFinalScore <= 100;

      if (requiredFinalScore === 0) {
        // If required is 0, it means current total already meets the target
        return {
          grade: grade.grade,
          required: 0,
          achievable: true
        };
      }

      return {
        grade: grade.grade,
        required: 0, // No final exam
        achievable: false // Not achievable
      };
    }

    // For other subjects, calculate required final exam score
    switch (subject) {
      case 'ST':
        requiredFinalScore = calculateST(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'SE':
        requiredFinalScore = calculateSE(
          input.gaa || 0,
          input.quiz2 || 0,
          input.gp1 || 0,
          input.gp2 || 0,
          input.pp || 0,
          input.cp || 0,
          targetScore
        );
        break;
      case 'DL':
        requiredFinalScore = calculateDL(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'AIPS':
        requiredFinalScore = calculateAIPS(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'SPG':
        requiredFinalScore = calculateSPG(
          input.gaa || 0,
          input.gp || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'IBD':
        requiredFinalScore = calculateIBD(
          input.gaa || 0,
          input.oppe1 || 0,
          input.oppe2 || 0,
          targetScore
        );
        break;
      case 'PC':
        requiredFinalScore = calculatePC(
          input.gaa || 0,
          input.gaap || 0,
          input.quiz1 || 0,
          input.oppe1 || 0,
          input.oppe2 || 0,
          targetScore
        );
        break;
      case 'FF':
        requiredFinalScore = calculateFF(
          input.gaa || 0,
          input.quiz1 || 0,
          input.gp1 || 0,
          targetScore
        );
        break;
      case 'INLP':
        requiredFinalScore = calculateINLP(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'CF':
        requiredFinalScore = calculateCF(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'DLCV':
        requiredFinalScore = calculateDLCV(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'ME':
        requiredFinalScore = calculateME(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'ATB':
        requiredFinalScore = calculateATB(
          input.gaa || 0,
          input.gaap || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'I4':
        requiredFinalScore = calculateI4(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          input.gp || 0,
          targetScore
        );
        break;
      case 'MT':
        requiredFinalScore = calculateMT(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'LSM':
        requiredFinalScore = calculateLSM(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'OS':
        requiredFinalScore = calculateOS(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'STML':
        requiredFinalScore = calculateSTML(
          input.gaa || 0,
          input.gpa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'BDBN':
        requiredFinalScore = calculateBDBN(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'LLM':
        requiredFinalScore = calculateLLM(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'CN':
        requiredFinalScore = calculateCN(
          input.gaa || 0,
          input.gaap || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          targetScore
        );
        break;
      case 'MR':
        requiredFinalScore = calculateMR(
          input.gaa || 0,
          input.quiz1 || 0,
          input.quiz2 || 0,
          input.gp || 0,
          targetScore
        );
        break;
      case 'DSAL':
      case 'ADL':
        // These courses use Viva instead of final exam
        // Return 0 as they don't have a traditional end-term
        requiredFinalScore = 0;
        achievable = true;
        break;
    }

    // Round to nearest integer and cap between 0 and 100
    const finalScore = Math.max(0, Math.min(100, Math.round(requiredFinalScore)));

    // Check if the required score is achievable (less than or equal to 100)
    achievable = requiredFinalScore <= 100;

    return {
      grade: grade.grade,
      required: finalScore,
      achievable
    };
  });
} 