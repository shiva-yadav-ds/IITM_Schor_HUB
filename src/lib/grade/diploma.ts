import { CourseGrade, calculateGradeAndPoints, roundUpScore } from "./foundation";

/**
 * Apply rounding rule to scores
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
 * Result interface for Diploma score calculations
 * Shows both actual score and score with +2% bonus
 */
export interface DiplomaScoreResult {
  baseScore: number;      // Actual calculated score
  finalScore: number;     // Score + 2% (capped at 100)
  bonusApplied: number;   // 2 marks bonus
  formula: string;        // Formula used for calculation
}

/**
 * Parameters for calculating diploma level course scores
 * Updated with new fields for 2026 rules
 */
export interface DiplomaParams {
  subject: string;
  gaa?: number;      // GAA (5% for most subjects now)
  gaa2?: number;     // For DBMS: SQL assignments
  gaa3?: number;     // For DBMS: Programming assignment
  quiz1?: number;
  quiz2?: number;
  finalExam?: number;
  programmingBonus?: number;  // For ML Techniques (3 marks)
  // ML Practice fields
  oppe1?: number;
  oppe2?: number;
  ka?: number;       // Kaggle Assignments average
  // BDM fields
  ga?: number;       // Graded Assignments (absolute marks out of 10)
  timedAssignment?: number;  // Timed Assignment (out of 20)
  // Business Analytics fields
  a?: number;        // Sum of best 2 out of 3 assignments (out of 20)
  // Tools in Data Science fields
  roe?: number;      // Remote Online Exam
  p1?: number;       // Project 1
  p2?: number;       // Project 2
  // PDSA, DBMS, Java fields
  op?: number;       // Online Proctored exam
  pe1?: number;      // OPPE 1 for Java
  pe2?: number;      // OPPE 2 for Java
  // App Dev 1 field
  gla?: number;      // Graded Lab Assignments
  // System Commands fields
  bpta?: number;     // Biweekly Programming Test Average
  oppe?: number;     // OPPE for System Commands
  // Deep Learning & GenAI fields
  nppe1?: number;    // Non-proctored programming exam 1
  nppe2?: number;    // Non-proctored programming exam 2
  [key: string]: string | number | undefined;
}

/**
 * Calculate total score for diploma level course
 * Updated with 2026 formulas - GAA reduced to 5%, no +2 bonus
 */
export function calculateDiplomaTotal(params: DiplomaParams): number {
  const {
    subject,
    gaa = 0,
    gaa2 = 0,
    gaa3 = 0,
    quiz1 = 0,
    quiz2 = 0,
    finalExam = 0,
    programmingBonus = 0,
    oppe1 = 0,
    oppe2 = 0,
    ka = 0,
    ga = 0,
    timedAssignment = 0,
    a = 0,
    roe = 0,
    p1 = 0,
    p2 = 0,
    op = 0,
    gla = 0,
    pe1 = 0,
    pe2 = 0,
    bpta = 0,
    oppe = 0,
    nppe1 = 0,
    nppe2 = 0
  } = params;

  let total = 0;

  // ML Foundations: T = 0.05*GAA + max(0.6F + 0.25*max(Qz1,Qz2), 0.4F + 0.25*Qz1 + 0.3*Qz2)
  if (subject === 'ml_foundations') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gaa + Math.max(option1, option2);
  }
  // ML Techniques: Same as ML Foundations + 3 bonus (if avg assignments >= 40)
  else if (subject === 'ml_techniques') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gaa + Math.max(option1, option2);

    // Add 3 marks bonus if avg assignments >= 40
    if (gaa >= 40) {
      total += Math.min(3, programmingBonus);
    }
  }
  // ML Practice: T = 0.1*GAA + 0.3*F + 0.2*OPPE1 + 0.2*OPPE2 + 0.2*KA
  else if (subject === 'ml_practice') {
    total = 0.1 * gaa + 0.3 * finalExam + 0.2 * oppe1 + 0.2 * oppe2 + 0.2 * ka;
  }
  // BDM: T = GA + Qz2 + TimedAssignment + F (absolute marks: 10+20+20+50=100)
  else if (subject === 'business_data_management') {
    total = ga + quiz2 + timedAssignment + finalExam;
  }
  // Business Analytics: T = Qz + A + F where Qz = 0.7*max + 0.3*min
  else if (subject === 'business_analytics') {
    const quizScore = 0.7 * Math.max(quiz1, quiz2) + 0.3 * Math.min(quiz1, quiz2);
    total = quizScore + a + finalExam;
  }
  // Tools in DS: T = 0.1*GAA + 0.2*ROE + 0.2*P1 + 0.2*P2 + 0.3*F
  else if (subject === 'tools_in_data_science') {
    total = 0.1 * gaa + 0.2 * roe + 0.2 * p1 + 0.2 * p2 + 0.3 * finalExam;
  }
  // PDSA: T = 0.05*GAA + 0.2*OP + 0.45*F + max(0.2*max(Qz1,Qz2), 0.1*Qz1 + 0.2*Qz2)
  else if (subject === 'pdsa') {
    const quizOption1 = 0.2 * Math.max(quiz1, quiz2);
    const quizOption2 = 0.1 * quiz1 + 0.2 * quiz2;
    total = 0.05 * gaa + 0.2 * op + 0.45 * finalExam + Math.max(quizOption1, quizOption2);
  }
  // DBMS: T = 0.03*GAA2 + 0.02*GAA3 + 0.2*OP + 0.45*F + max(0.2*max(Qz1,Qz2), 0.1*Qz1 + 0.2*Qz2)
  else if (subject === 'dbms') {
    const quizOption1 = 0.2 * Math.max(quiz1, quiz2);
    const quizOption2 = 0.1 * quiz1 + 0.2 * quiz2;
    total = 0.03 * gaa2 + 0.02 * gaa3 + 0.2 * op + 0.45 * finalExam + Math.max(quizOption1, quizOption2);
  }
  // App Dev 1: T = 0.05*GLA + max(0.6F + 0.25*max(Qz1,Qz2), 0.4F + 0.25*Qz1 + 0.3*Qz2)
  else if (subject === 'app_dev_1') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gla + Math.max(option1, option2);
  }
  // Java: T = 0.05*GAA + 0.2*max(PE1,PE2) + 0.45*F + max(0.2*max(Qz1,Qz2), 0.1*Qz1 + 0.2*Qz2) + 0.1*min(PE1,PE2)
  else if (subject === 'java') {
    const quizOption1 = 0.2 * Math.max(quiz1, quiz2);
    const quizOption2 = 0.1 * quiz1 + 0.2 * quiz2;
    total = 0.05 * gaa + 0.2 * Math.max(pe1, pe2) + 0.45 * finalExam +
      Math.max(quizOption1, quizOption2) + 0.1 * Math.min(pe1, pe2);
  }
  // System Commands: T = 0.05*GAA + 0.25*Qz1 + 0.3*OPPE + 0.3*F + 0.1*BPTA
  else if (subject === 'system_commands') {
    total = 0.05 * gaa + 0.25 * quiz1 + 0.3 * oppe + 0.3 * finalExam + 0.1 * bpta;
  }
  // App Dev 2: T = 0.05*GAA + max(0.6F + 0.25*max(Qz1,Qz2), 0.4F + 0.25*Qz1 + 0.3*Qz2)
  else if (subject === 'app_dev_2') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gaa + Math.max(option1, option2);
  }
  // Deep Learning & GenAI: T = 0.1*GAA + 0.2*Qz1 + 0.2*Qz2 + 0.25*F + 0.1*NPPE1 + 0.15*NPPE2
  else if (subject === 'dl_genai') {
    total = 0.1 * gaa + 0.2 * quiz1 + 0.2 * quiz2 + 0.25 * finalExam + 0.1 * nppe1 + 0.15 * nppe2;
  }

  // Cap the total at 100
  total = Math.min(total, 100);

  return roundUpScore(total);
}

/**
 * Calculate diploma scores with dual display (actual vs +2% bonus)
 * Returns both base score and score with +2% bonus
 */
export function calculateDiplomaScores(params: DiplomaParams): DiplomaScoreResult {
  const { subject } = params;

  // Calculate base score using existing function logic (without the final roundUp)
  const baseTotal = calculateDiplomaTotalRaw(params);
  const baseScore = roundScore(Math.min(baseTotal, 100));

  // Add 2% bonus (capped at 100)
  const bonusApplied = 2;
  const finalScore = roundScore(Math.min(baseTotal + bonusApplied, 100));

  // Get formula based on subject
  const formula = getDiplomaFormula(subject);

  return {
    baseScore,
    finalScore,
    bonusApplied,
    formula
  };
}

/**
 * Calculate raw diploma total (without rounding) for internal use
 */
function calculateDiplomaTotalRaw(params: DiplomaParams): number {
  const {
    subject,
    gaa = 0,
    gaa2 = 0,
    gaa3 = 0,
    quiz1 = 0,
    quiz2 = 0,
    finalExam = 0,
    programmingBonus = 0,
    oppe1 = 0,
    oppe2 = 0,
    ka = 0,
    ga = 0,
    timedAssignment = 0,
    a = 0,
    roe = 0,
    p1 = 0,
    p2 = 0,
    op = 0,
    gla = 0,
    pe1 = 0,
    pe2 = 0,
    bpta = 0,
    oppe = 0,
    nppe1 = 0,
    nppe2 = 0
  } = params;

  let total = 0;

  if (subject === 'ml_foundations') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gaa + Math.max(option1, option2);
  } else if (subject === 'ml_techniques') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gaa + Math.max(option1, option2);
    if (gaa >= 40) total += Math.min(3, programmingBonus);
  } else if (subject === 'ml_practice') {
    total = 0.1 * gaa + 0.3 * finalExam + 0.2 * oppe1 + 0.2 * oppe2 + 0.2 * ka;
  } else if (subject === 'business_data_management') {
    total = ga + quiz2 + timedAssignment + finalExam;
  } else if (subject === 'business_analytics') {
    const quizScore = 0.7 * Math.max(quiz1, quiz2) + 0.3 * Math.min(quiz1, quiz2);
    total = quizScore + a + finalExam;
  } else if (subject === 'tools_in_data_science') {
    total = 0.1 * gaa + 0.2 * roe + 0.2 * p1 + 0.2 * p2 + 0.3 * finalExam;
  } else if (subject === 'pdsa') {
    const quizOption1 = 0.2 * Math.max(quiz1, quiz2);
    const quizOption2 = 0.1 * quiz1 + 0.2 * quiz2;
    total = 0.05 * gaa + 0.2 * op + 0.45 * finalExam + Math.max(quizOption1, quizOption2);
  } else if (subject === 'dbms') {
    const quizOption1 = 0.2 * Math.max(quiz1, quiz2);
    const quizOption2 = 0.1 * quiz1 + 0.2 * quiz2;
    total = 0.03 * gaa2 + 0.02 * gaa3 + 0.2 * op + 0.45 * finalExam + Math.max(quizOption1, quizOption2);
  } else if (subject === 'app_dev_1') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gla + Math.max(option1, option2);
  } else if (subject === 'java') {
    const quizOption1 = 0.2 * Math.max(quiz1, quiz2);
    const quizOption2 = 0.1 * quiz1 + 0.2 * quiz2;
    total = 0.05 * gaa + 0.2 * Math.max(pe1, pe2) + 0.45 * finalExam +
      Math.max(quizOption1, quizOption2) + 0.1 * Math.min(pe1, pe2);
  } else if (subject === 'system_commands') {
    total = 0.05 * gaa + 0.25 * quiz1 + 0.3 * oppe + 0.3 * finalExam + 0.1 * bpta;
  } else if (subject === 'app_dev_2') {
    const option1 = 0.6 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.3 * quiz2;
    total = 0.05 * gaa + Math.max(option1, option2);
  } else if (subject === 'dl_genai') {
    total = 0.1 * gaa + 0.2 * quiz1 + 0.2 * quiz2 + 0.25 * finalExam + 0.1 * nppe1 + 0.15 * nppe2;
  }

  return total;
}

/**
 * Get formula string for diploma subject
 */
function getDiplomaFormula(subject: string): string {
  const formulas: Record<string, string> = {
    'ml_foundations': 'T = 0.05×GAA + max(0.6F + 0.25×max(Qz1,Qz2), 0.4F + 0.25×Qz1 + 0.3×Qz2)',
    'ml_techniques': 'T = 0.05×GAA + max(0.6F + 0.25×max(Qz1,Qz2), 0.4F + 0.25×Qz1 + 0.3×Qz2) + Bonus',
    'ml_practice': 'T = 0.1×GAA + 0.3×F + 0.2×OPPE1 + 0.2×OPPE2 + 0.2×KA',
    'business_data_management': 'T = GA + Qz2 + TimedAssignment + F',
    'business_analytics': 'T = 0.7×max(Qz1,Qz2) + 0.3×min(Qz1,Qz2) + A + F',
    'tools_in_data_science': 'T = 0.1×GAA + 0.2×ROE + 0.2×P1 + 0.2×P2 + 0.3×F',
    'pdsa': 'T = 0.05×GAA + 0.2×OP + 0.45×F + max(0.2×max(Qz1,Qz2), 0.1×Qz1 + 0.2×Qz2)',
    'dbms': 'T = 0.03×GAA2 + 0.02×GAA3 + 0.2×OP + 0.45×F + max(0.2×max(Qz1,Qz2), 0.1×Qz1 + 0.2×Qz2)',
    'app_dev_1': 'T = 0.05×GLA + max(0.6F + 0.25×max(Qz1,Qz2), 0.4F + 0.25×Qz1 + 0.3×Qz2)',
    'java': 'T = 0.05×GAA + 0.2×max(PE1,PE2) + 0.45×F + max(0.2×max(Qz1,Qz2), 0.1×Qz1 + 0.2×Qz2) + 0.1×min(PE1,PE2)',
    'system_commands': 'T = 0.05×GAA + 0.25×Qz1 + 0.3×OPPE + 0.3×F + 0.1×BPTA',
    'app_dev_2': 'T = 0.05×GAA + max(0.6F + 0.25×max(Qz1,Qz2), 0.4F + 0.25×Qz1 + 0.3×Qz2)',
    'dl_genai': 'T = 0.1×GAA + 0.2×Qz1 + 0.2×Qz2 + 0.25×F + 0.1×NPPE1 + 0.15×NPPE2'
  };
  return formulas[subject] || 'Standard formula';
}

/**
 * Calculate CGPA for diploma level courses
 */
export function calculateDiplomaCGPA(courses: CourseGrade[]): number {
  if (courses.length === 0) return 0;

  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach(course => {
    totalCredits += course.credits;
    totalGradePoints += course.gradePoint * course.credits;
  });

  return totalGradePoints / totalCredits;
}

/**
 * Diploma level subjects with their credits
 */
export const diplomaSubjects = [
  { value: 'ml_foundations', label: 'Machine Learning Foundations', credits: 4 },
  { value: 'ml_techniques', label: 'Machine Learning Techniques', credits: 4 },
  { value: 'ml_practice', label: 'Machine Learning Practice', credits: 4 },
  { value: 'business_data_management', label: 'Business Data Management', credits: 4 },
  { value: 'business_analytics', label: 'Business Analytics', credits: 4 },
  { value: 'tools_in_data_science', label: 'Tools in Data Science', credits: 3 },
  { value: 'pdsa', label: 'Programming Data Structures and Algorithms using Python', credits: 4 },
  { value: 'dbms', label: 'Database Management System', credits: 4 },
  { value: 'app_dev_1', label: 'Application Development - 1', credits: 4 },
  { value: 'java', label: 'Programming Concepts Using Java', credits: 4 },
  { value: 'system_commands', label: 'System Commands', credits: 3 },
  { value: 'app_dev_2', label: 'Application Development - 2', credits: 4 },
  { value: 'dl_genai', label: 'Introduction to Deep Learning and Generative AI', credits: 4 },
];

/**
 * Get course details based on subject code
 */
export function getSubjectDetails(subject: string) {
  switch (subject) {
    case 'ml_foundations':
      return {
        code: 'DLMLF',
        name: 'Machine Learning Foundations',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam']
      };
    case 'ml_techniques':
      return {
        code: 'DLMLT',
        name: 'Machine Learning Techniques',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'programmingBonus']
      };
    case 'ml_practice':
      return {
        code: 'DLMLP',
        name: 'Machine Learning Practice',
        requiredFields: ['gaa', 'oppe1', 'oppe2', 'ka', 'finalExam']
      };
    case 'business_data_management':
      return {
        code: 'DLBDM',
        name: 'Business Data Management',
        requiredFields: ['ga', 'quiz2', 'timedAssignment', 'finalExam']
      };
    case 'business_analytics':
      return {
        code: 'DLBA',
        name: 'Business Analytics',
        requiredFields: ['quiz1', 'quiz2', 'a', 'finalExam']
      };
    case 'tools_in_data_science':
      return {
        code: 'DLTDS',
        name: 'Tools in Data Science',
        requiredFields: ['gaa', 'roe', 'p1', 'p2', 'finalExam']
      };
    case 'pdsa':
      return {
        code: 'DLPDSA',
        name: 'Programming Data Structures and Algorithms using Python',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'op', 'finalExam']
      };
    case 'dbms':
      return {
        code: 'DLDBMS',
        name: 'Database Management System',
        requiredFields: ['gaa2', 'gaa3', 'quiz1', 'quiz2', 'op', 'finalExam']
      };
    case 'app_dev_1':
      return {
        code: 'DLAD1',
        name: 'Application Development - 1',
        requiredFields: ['gla', 'quiz1', 'quiz2', 'finalExam']
      };
    case 'java':
      return {
        code: 'DLJAVA',
        name: 'Programming Concepts Using Java',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'pe1', 'pe2', 'finalExam']
      };
    case 'system_commands':
      return {
        code: 'DLSC',
        name: 'System Commands',
        requiredFields: ['gaa', 'quiz1', 'bpta', 'oppe', 'finalExam']
      };
    case 'app_dev_2':
      return {
        code: 'DLAD2',
        name: 'Application Development - 2',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam']
      };
    case 'dl_genai':
      return {
        code: 'DLDLG',
        name: 'Introduction to Deep Learning and Generative AI',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'nppe1', 'nppe2', 'finalExam']
      };
    default:
      return {
        code: '',
        name: '',
        requiredFields: []
      };
  }
}