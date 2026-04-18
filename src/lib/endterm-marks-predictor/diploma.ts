// Define constants for grade thresholds
export const gradeThresholds = [
  { grade: 'S', min: 90, max: 100, points: 10 },
  { grade: 'A', min: 80, max: 89, points: 9 },
  { grade: 'B', min: 70, max: 79, points: 8 },
  { grade: 'C', min: 60, max: 69, points: 7 },
  { grade: 'D', min: 50, max: 59, points: 6 },
  { grade: 'E', min: 40, max: 49, points: 4 }
];

// Diploma level subjects - updated for 2026
export const diplomaSubjects = [
  { value: 'ml_foundations', label: 'Machine Learning Foundations', code: 'MLF' },
  { value: 'ml_techniques', label: 'Machine Learning Techniques', code: 'MLT' },
  { value: 'ml_practice', label: 'Machine Learning Practice', code: 'MLP' },
  { value: 'business_data_management', label: 'Business Data Management', code: 'BDM' },
  { value: 'business_analytics', label: 'Business Analytics', code: 'BA' },
  { value: 'tools_in_data_science', label: 'Tools in Data Science', code: 'TDS' },
  { value: 'pdsa', label: 'Programming Data Structures and Algorithms', code: 'PDSA' },
  { value: 'dbms', label: 'Database Management System', code: 'DBMS' },
  { value: 'app_dev_1', label: 'Application Development - 1', code: 'AD1' },
  { value: 'java', label: 'Programming Concepts Using Java', code: 'JAVA' },
  { value: 'system_commands', label: 'System Commands', code: 'SC' },
  { value: 'app_dev_2', label: 'Application Development - 2', code: 'AD2' },
  { value: 'dl_genai', label: 'Introduction to Deep Learning and Generative AI', code: 'DLDG' }
];

// Input interface for prediction - updated with new fields
export interface DiplomaPredictorInput {
  subject: string;
  gaa?: number;
  gaa2?: number;  // For DBMS: SQL assignments
  gaa3?: number;  // For DBMS: Programming assignment
  quiz1?: number;
  quiz2?: number;
  oppe1?: number;  // ML Practice
  oppe2?: number;  // ML Practice
  ka?: number;     // Kaggle Assignments for ML Practice
  ga?: number;     // BDM: Graded Assignments (out of 10)
  timedAssignment?: number;  // BDM: Timed Assignment (out of 20)
  a?: number;      // Business Analytics: Best 2 of 3 assignments (out of 20)
  roe?: number;    // Tools in DS: Remote Online Exam
  p1?: number;     // Tools in DS: Project 1
  p2?: number;     // Tools in DS: Project 2
  op?: number;     // PDSA, DBMS: Online Proctored Exam
  gla?: number;    // App Dev 1: Graded Lab Assignments
  pe1?: number;    // Java: OPPE 1
  pe2?: number;    // Java: OPPE 2
  bpta?: number;   // System Commands: Biweekly Programming Test Average
  oppe?: number;   // System Commands: OPPE
  nppe1?: number;  // DL GenAI: Non-proctored programming exam 1
  nppe2?: number;  // DL GenAI: Non-proctored programming exam 2
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
 * Updated for 2026 formulas - uses subject CODE (e.g., MLP, MLF)
 */
export function getRequiredFields(subject: string): string[] {
  switch (subject) {
    case 'MLF': // ML Foundations
      return ['gaa', 'quiz1', 'quiz2'];
    case 'MLT': // ML Techniques
      return ['gaa', 'quiz1', 'quiz2'];
    case 'MLP': // ML Practice
      return ['gaa', 'oppe1', 'oppe2', 'ka'];
    case 'BDM': // Business Data Management
      return ['ga', 'quiz2', 'timedAssignment'];
    case 'BA': // Business Analytics
      return ['quiz1', 'quiz2', 'a'];
    case 'TDS': // Tools in Data Science
      return ['gaa', 'roe', 'p1', 'p2'];
    case 'PDSA':
      return ['gaa', 'quiz1', 'quiz2', 'op'];
    case 'DBMS':
      return ['gaa2', 'gaa3', 'quiz1', 'quiz2', 'op'];
    case 'AD1': // App Dev 1
      return ['gla', 'quiz1', 'quiz2'];
    case 'JAVA':
      return ['gaa', 'quiz1', 'quiz2', 'pe1', 'pe2'];
    case 'SC': // System Commands
      return ['gaa', 'quiz1', 'bpta', 'oppe'];
    case 'AD2': // App Dev 2
      return ['gaa', 'quiz1', 'quiz2'];
    case 'DLDG': // DL GenAI
      return ['gaa', 'quiz1', 'quiz2', 'nppe1', 'nppe2'];
    default:
      return [];
  }
}

/**
 * Get the formula as a string for display purposes
 */
export function getFormula(subject: string): string {
  switch (subject) {
    case 'MLF':
      return 'T = 0.05×GAA + max(0.6×F + 0.25×max(Qz1,Qz2), 0.4×F + 0.25×Qz1 + 0.3×Qz2)';
    case 'MLT':
      return 'T = 0.05×GAA + max(0.6×F + 0.25×max(Qz1,Qz2), 0.4×F + 0.25×Qz1 + 0.3×Qz2) + Bonus (3)';
    case 'MLP':
      return 'T = 0.1×GAA + 0.3×F + 0.2×OPPE1 + 0.2×OPPE2 + 0.2×KA';
    case 'BDM':
      return 'T = GA(10) + Qz2(20) + Timed(20) + F(50)';
    case 'BA':
      return 'T = Qz + A + F where Qz = 0.7×max + 0.3×min';
    case 'TDS':
      return 'T = 0.1×GAA + 0.2×ROE + 0.2×P1 + 0.2×P2 + 0.3×F';
    case 'PDSA':
      return 'T = 0.05×GAA + 0.2×OP + 0.45×F + max(0.2×max(Qz1,Qz2), 0.1×Qz1 + 0.2×Qz2)';
    case 'DBMS':
      return 'T = 0.03×GAA2 + 0.02×GAA3 + 0.2×OP + 0.45×F + max(0.2×max(Qz1,Qz2), 0.1×Qz1 + 0.2×Qz2)';
    case 'AD1':
      return 'T = 0.05×GLA + max(0.6×F + 0.25×max(Qz1,Qz2), 0.4×F + 0.25×Qz1 + 0.3×Qz2)';
    case 'JAVA':
      return 'T = 0.05×GAA + 0.2×max(PE1,PE2) + 0.45×F + max(0.2×max(Qz1,Qz2), 0.1×Qz1 + 0.2×Qz2) + 0.1×min(PE1,PE2)';
    case 'SC':
      return 'T = 0.05×GAA + 0.25×Qz1 + 0.3×OPPE + 0.3×F + 0.1×BPTA';
    case 'AD2':
      return 'T = 0.05×GAA + max(0.6×F + 0.25×max(Qz1,Qz2), 0.4×F + 0.25×Qz1 + 0.3×Qz2)';
    case 'DLDG':
      return 'T = 0.1×GAA + 0.2×Qz1 + 0.2×Qz2 + 0.25×F + 0.1×NPPE1 + 0.15×NPPE2';
    default:
      return '';
  }
}

// ML Foundations: T = 0.05*GAA + max(0.6F + 0.25*max(Qz1,Qz2), 0.4F + 0.25*Qz1 + 0.3*Qz2)
function calculateMLFoundations(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  const maxQuiz = Math.max(quiz1, quiz2);
  const gaaComponent = 0.05 * gaa;

  // Formula 1: F = (T - 0.05*GAA - 0.25*max(Qz1, Qz2)) / 0.6
  const formula1 = (targetScore - gaaComponent - 0.25 * maxQuiz) / 0.6;

  // Formula 2: F = (T - 0.05*GAA - 0.25*Qz1 - 0.3*Qz2) / 0.4
  const formula2 = (targetScore - gaaComponent - 0.25 * quiz1 - 0.3 * quiz2) / 0.4;

  return Math.min(formula1, formula2);
}

// ML Techniques: Same as ML Foundations (bonus is handled separately in grade calc)
function calculateMLTechniques(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  return calculateMLFoundations(gaa, quiz1, quiz2, targetScore);
}

// ML Practice: T = 0.1*GAA + 0.3*F + 0.2*OPPE1 + 0.2*OPPE2 + 0.2*KA
function calculateMLPractice(gaa: number, oppe1: number, oppe2: number, ka: number, targetScore: number): number {
  const gaaComponent = 0.1 * gaa;
  const oppe1Component = 0.2 * oppe1;
  const oppe2Component = 0.2 * oppe2;
  const kaComponent = 0.2 * ka;

  // F = (T - 0.1*GAA - 0.2*OPPE1 - 0.2*OPPE2 - 0.2*KA) / 0.3
  return (targetScore - gaaComponent - oppe1Component - oppe2Component - kaComponent) / 0.3;
}

// BDM: T = GA + Qz2 + TimedAssignment + F (absolute marks: 10+20+20+50)
function calculateBDM(ga: number, quiz2: number, timedAssignment: number, targetScore: number): number {
  // F = T - GA - Qz2 - TimedAssignment
  return targetScore - ga - quiz2 - timedAssignment;
}

// Business Analytics: T = Qz + A + F where Qz = 0.7*max + 0.3*min
function calculateBA(quiz1: number, quiz2: number, a: number, targetScore: number): number {
  const quizScore = 0.7 * Math.max(quiz1, quiz2) + 0.3 * Math.min(quiz1, quiz2);
  // F = T - Qz - A
  return targetScore - quizScore - a;
}

// Tools in DS: T = 0.1*GAA + 0.2*ROE + 0.2*P1 + 0.2*P2 + 0.3*F
function calculateTDS(gaa: number, roe: number, p1: number, p2: number, targetScore: number): number {
  const gaaComponent = 0.1 * gaa;
  const roeComponent = 0.2 * roe;
  const p1Component = 0.2 * p1;
  const p2Component = 0.2 * p2;

  // F = (T - 0.1*GAA - 0.2*ROE - 0.2*P1 - 0.2*P2) / 0.3
  return (targetScore - gaaComponent - roeComponent - p1Component - p2Component) / 0.3;
}

// PDSA: T = 0.05*GAA + 0.2*OP + 0.45*F + max(0.2*max(Qz1,Qz2), 0.1*Qz1 + 0.2*Qz2)
function calculatePDSA(gaa: number, quiz1: number, quiz2: number, op: number, targetScore: number): number {
  const gaaComponent = 0.05 * gaa;
  const opComponent = 0.2 * op;
  const maxQuiz = Math.max(quiz1, quiz2);

  // Quiz option 1: 0.2*max(Qz1,Qz2), Quiz option 2: 0.1*Qz1 + 0.2*Qz2
  const quizComponent = Math.max(0.2 * maxQuiz, 0.1 * quiz1 + 0.2 * quiz2);

  // F = (T - 0.05*GAA - 0.2*OP - quizComponent) / 0.45
  return (targetScore - gaaComponent - opComponent - quizComponent) / 0.45;
}

// DBMS: T = 0.03*GAA2 + 0.02*GAA3 + 0.2*OP + 0.45*F + max(0.2*max(Qz1,Qz2), 0.1*Qz1 + 0.2*Qz2)
function calculateDBMS(gaa2: number, gaa3: number, quiz1: number, quiz2: number, op: number, targetScore: number): number {
  const gaa2Component = 0.03 * gaa2;
  const gaa3Component = 0.02 * gaa3;
  const opComponent = 0.2 * op;
  const maxQuiz = Math.max(quiz1, quiz2);

  const quizComponent = Math.max(0.2 * maxQuiz, 0.1 * quiz1 + 0.2 * quiz2);

  // F = (T - 0.03*GAA2 - 0.02*GAA3 - 0.2*OP - quizComponent) / 0.45
  return (targetScore - gaa2Component - gaa3Component - opComponent - quizComponent) / 0.45;
}

// App Dev 1: T = 0.05*GLA + max(0.6F + 0.25*max(Qz1,Qz2), 0.4F + 0.25*Qz1 + 0.3*Qz2)
function calculateAppDev1(gla: number, quiz1: number, quiz2: number, targetScore: number): number {
  const glaComponent = 0.05 * gla;
  const maxQuiz = Math.max(quiz1, quiz2);

  // Formula 1: F = (T - 0.05*GLA - 0.25*max(Qz1, Qz2)) / 0.6
  const formula1 = (targetScore - glaComponent - 0.25 * maxQuiz) / 0.6;

  // Formula 2: F = (T - 0.05*GLA - 0.25*Qz1 - 0.3*Qz2) / 0.4
  const formula2 = (targetScore - glaComponent - 0.25 * quiz1 - 0.3 * quiz2) / 0.4;

  return Math.min(formula1, formula2);
}

// Java: T = 0.05*GAA + 0.2*max(PE1,PE2) + 0.45*F + max(0.2*max(Qz1,Qz2), 0.1*Qz1 + 0.2*Qz2) + 0.1*min(PE1,PE2)
function calculateJava(gaa: number, quiz1: number, quiz2: number, pe1: number, pe2: number, targetScore: number): number {
  const gaaComponent = 0.05 * gaa;
  const peMaxComponent = 0.2 * Math.max(pe1, pe2);
  const peMinComponent = 0.1 * Math.min(pe1, pe2);
  const maxQuiz = Math.max(quiz1, quiz2);

  const quizComponent = Math.max(0.2 * maxQuiz, 0.1 * quiz1 + 0.2 * quiz2);

  // F = (T - 0.05*GAA - 0.2*max(PE1,PE2) - quizComponent - 0.1*min(PE1,PE2)) / 0.45
  return (targetScore - gaaComponent - peMaxComponent - quizComponent - peMinComponent) / 0.45;
}

// System Commands: T = 0.05*GAA + 0.25*Qz1 + 0.3*OPPE + 0.3*F + 0.1*BPTA
function calculateSystemCommands(gaa: number, quiz1: number, bpta: number, oppe: number, targetScore: number): number {
  const gaaComponent = 0.05 * gaa;
  const quiz1Component = 0.25 * quiz1;
  const bptaComponent = 0.1 * bpta;
  const oppeComponent = 0.3 * oppe;

  // F = (T - 0.05*GAA - 0.25*Qz1 - 0.3*OPPE - 0.1*BPTA) / 0.3
  return (targetScore - gaaComponent - quiz1Component - oppeComponent - bptaComponent) / 0.3;
}

// App Dev 2: T = 0.05*GAA + max(0.6F + 0.25*max(Qz1,Qz2), 0.4F + 0.25*Qz1 + 0.3*Qz2)
function calculateAppDev2(gaa: number, quiz1: number, quiz2: number, targetScore: number): number {
  const gaaComponent = 0.05 * gaa;
  const maxQuiz = Math.max(quiz1, quiz2);

  // Formula 1: F = (T - 0.05*GAA - 0.25*max(Qz1, Qz2)) / 0.6
  const formula1 = (targetScore - gaaComponent - 0.25 * maxQuiz) / 0.6;

  // Formula 2: F = (T - 0.05*GAA - 0.25*Qz1 - 0.3*Qz2) / 0.4
  const formula2 = (targetScore - gaaComponent - 0.25 * quiz1 - 0.3 * quiz2) / 0.4;

  return Math.min(formula1, formula2);
}

// DL GenAI: T = 0.1*GAA + 0.2*Qz1 + 0.2*Qz2 + 0.25*F + 0.1*NPPE1 + 0.15*NPPE2
function calculateDLGenAI(gaa: number, quiz1: number, quiz2: number, nppe1: number, nppe2: number, targetScore: number): number {
  const gaaComponent = 0.1 * gaa;
  const quiz1Component = 0.2 * quiz1;
  const quiz2Component = 0.2 * quiz2;
  const nppe1Component = 0.1 * nppe1;
  const nppe2Component = 0.15 * nppe2;

  // F = (T - 0.1*GAA - 0.2*Qz1 - 0.2*Qz2 - 0.1*NPPE1 - 0.15*NPPE2) / 0.25
  return (targetScore - gaaComponent - quiz1Component - quiz2Component - nppe1Component - nppe2Component) / 0.25;
}

/**
 * Calculate predictions for all grades
 */
export function calculatePredictions(input: DiplomaPredictorInput): PredictionResult[] {
  const { subject } = input;

  return gradeThresholds.map(grade => {
    const targetScore = grade.min;
    let requiredFinalScore = 0;

    switch (subject) {
      case 'MLF':
        requiredFinalScore = calculateMLFoundations(
          input.gaa || 0, input.quiz1 || 0, input.quiz2 || 0, targetScore
        );
        break;
      case 'MLT':
        requiredFinalScore = calculateMLTechniques(
          input.gaa || 0, input.quiz1 || 0, input.quiz2 || 0, targetScore
        );
        break;
      case 'MLP':
        requiredFinalScore = calculateMLPractice(
          input.gaa || 0, input.oppe1 || 0, input.oppe2 || 0, input.ka || 0, targetScore
        );
        break;
      case 'BDM':
        requiredFinalScore = calculateBDM(
          input.ga || 0, input.quiz2 || 0, input.timedAssignment || 0, targetScore
        );
        break;
      case 'BA':
        requiredFinalScore = calculateBA(
          input.quiz1 || 0, input.quiz2 || 0, input.a || 0, targetScore
        );
        break;
      case 'TDS':
        requiredFinalScore = calculateTDS(
          input.gaa || 0, input.roe || 0, input.p1 || 0, input.p2 || 0, targetScore
        );
        break;
      case 'PDSA':
        requiredFinalScore = calculatePDSA(
          input.gaa || 0, input.quiz1 || 0, input.quiz2 || 0, input.op || 0, targetScore
        );
        break;
      case 'DBMS':
        requiredFinalScore = calculateDBMS(
          input.gaa2 || 0, input.gaa3 || 0, input.quiz1 || 0, input.quiz2 || 0, input.op || 0, targetScore
        );
        break;
      case 'AD1':
        requiredFinalScore = calculateAppDev1(
          input.gla || 0, input.quiz1 || 0, input.quiz2 || 0, targetScore
        );
        break;
      case 'JAVA':
        requiredFinalScore = calculateJava(
          input.gaa || 0, input.quiz1 || 0, input.quiz2 || 0, input.pe1 || 0, input.pe2 || 0, targetScore
        );
        break;
      case 'SC':
        requiredFinalScore = calculateSystemCommands(
          input.gaa || 0, input.quiz1 || 0, input.bpta || 0, input.oppe || 0, targetScore
        );
        break;
      case 'AD2':
        requiredFinalScore = calculateAppDev2(
          input.gaa || 0, input.quiz1 || 0, input.quiz2 || 0, targetScore
        );
        break;
      case 'DLDG':
        requiredFinalScore = calculateDLGenAI(
          input.gaa || 0, input.quiz1 || 0, input.quiz2 || 0, input.nppe1 || 0, input.nppe2 || 0, targetScore
        );
        break;
    }

    const finalScore = Math.max(0, Math.min(100, Math.round(requiredFinalScore)));
    const achievable = requiredFinalScore <= 100;

    return {
      grade: grade.grade,
      required: finalScore,
      achievable
    };
  });
}