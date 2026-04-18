import { CourseGrade, calculateGradeAndPoints, roundUpScore } from "./foundation";

/**
 * Parameters for calculating degree level course scores
 */
export interface DegreeParams {
  subject: string;
  gaa?: number;
  gaap?: number; // Programming assignments average (for Programming in C)
  gpa?: number; // Graded Programming Assignments score (for Special Topics in ML)
  quiz1?: number;
  quiz2?: number;
  quiz3?: number;
  finalExam?: number;
  normalBonus?: number;
  programmingBonus?: number; // Used by deep_learning and ai_search_methods
  llmProgrammingBonus?: number; // Programming Assignments Bonus for Large Language Models
  extraAssignmentBonus?: number;
  gameBonus?: number; // For Industry 4.0
  game?: number; // Game score for Industry 4.0
  quizzes?: number; // Combined quiz score for Industry 4.0
  assignment1?: number; // Assignment 1 for Industry 4.0
  assignment2?: number; // Assignment 2 for Industry 4.0
  assignment3?: number; // Assignment 3 for Industry 4.0
  projectSubmission?: number; // Project submission for Industry 4.0
  projectPresentation?: number; // Project presentation for Industry 4.0
  gp1?: number;  // Group Project Milestone 1-3
  gp2?: number;  // Group Project Milestone 4-6
  pp?: number;   // Project Presentation
  cp?: number;   // Course Participation Activity
  gp?: number;   // Group Project (for Strategies for Professional Growth)
  oppe1?: number; // Online Proctored Exam 1 (for Big Data and Programming in C)
  oppe2?: number; // Online Proctored Exam 2 (for Big Data and Programming in C)
  nppe1?: number;
  nppe2?: number;
  nppe3?: number;
  ga?: number;
  project?: number;
  viva?: number; // Viva score for Deep Learning Practice
  [key: string]: string | number | undefined; // Allow any string key with number values
}

/**
 * Result interface for Degree score calculations
 * Shows both actual score and score with +2% bonus
 */
export interface DegreeScoreResult {
  baseScore: number;      // Actual calculated score
  finalScore: number;     // Score + 2% (capped at 100)
  bonusApplied: number;   // 2 marks bonus
  formula: string;        // Formula used for calculation
}

/**
 * Calculate total score for degree level course
 */
export function calculateDegreeTotal(params: DegreeParams): number {
  const {
    subject,
    gaa = 0,
    gaap = 0,
    gpa = 0,
    quiz1 = 0,
    quiz2 = 0,
    quiz3 = 0,
    finalExam = 0,
    normalBonus = 0,
    programmingBonus = 0,
    llmProgrammingBonus = 0,
    extraAssignmentBonus = 0,
    gameBonus = 0,
    game = 0,
    quizzes = 0,
    assignment1 = 0,
    assignment2 = 0,
    assignment3 = 0,
    projectSubmission = 0,
    projectPresentation = 0,
    gp1 = 0,
    gp2 = 0,
    pp = 0,
    cp = 0,
    gp = 0,
    oppe1 = 0,
    oppe2 = 0,
    nppe1 = 0,
    nppe2 = 0,
    nppe3 = 0,
    ga = 0,
    project = 0
  } = params;

  let total = 0;

  if (subject === 'software_testing') {
    // T = 0.1GAA + 0.4F + 0.25Qz1 + 0.25Qz2 + Normal Bonus
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'software_engineering') {
    // T = 0.05GAA + 0.2Qz2 + 0.4F + 0.1GP1 + 0.1GP2 + 0.1PP + 0.05CP + Normal Bonus
    total = 0.05 * gaa + 0.2 * quiz2 + 0.4 * finalExam + 0.1 * gp1 + 0.1 * gp2 + 0.1 * pp + 0.05 * cp;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'deep_learning') {
    // T = 0.05GAA + 0.25Qz1 + 0.25Qz2 + 0.45F + Programming Activity Bonus (max 5)
    total = 0.05 * gaa + 0.25 * quiz1 + 0.25 * quiz2 + 0.45 * finalExam;

    // Add bonuses if total is passing (≥40)
    if (total >= 40) {
      total += programmingBonus + normalBonus;
    }
  }
  else if (subject === 'ai_search_methods') {
    // T = 0.1GAA + 0.4F + 0.25Qz1 + 0.25Qz2 + Programming Assignment Bonus + Normal Bonus
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;

    // Add bonuses if total is passing (≥40)
    if (total >= 40) {
      total += programmingBonus + normalBonus;
    }
  }
  else if (subject === 'professional_growth') {
    // T = 0.15GAA + 0.25GP + 0.25Qz2 + 0.35F + Normal Bonus
    total = 0.15 * gaa + 0.25 * gp + 0.25 * quiz2 + 0.35 * finalExam;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'big_data') {
    // T = 0.1GAA + 0.3F + 0.2OPPE1 + 0.4OPPE2 + Normal Bonus
    total = 0.1 * gaa + 0.3 * finalExam + 0.2 * oppe1 + 0.4 * oppe2;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'programming_in_c') {
    // T = 0.10GAA + 0.20Qz1 + 0.20OPPE1 + 0.20OPPE2 + 0.30F + Normal Bonus
    total = 0.1 * gaa + 0.2 * quiz1 + 0.2 * oppe1 + 0.2 * oppe2 + 0.3 * finalExam;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'financial_forensics') {
    // T = 0.1GAA + max(0.25Qz1 + 0.3GP1 + 0.35F, 0.5F + 0.3max(Qz1, GP1)) + Normal Bonus
    const option1 = 0.25 * quiz1 + 0.3 * gp1 + 0.35 * finalExam;
    const option2 = 0.5 * finalExam + 0.3 * Math.max(quiz1, gp1);

    total = 0.1 * gaa + Math.max(option1, option2);

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'nlp') {
    // T = 0.1GAA + 0.5F + 0.2Qz1 + 0.2Qz2 + Normal Bonus
    total = 0.1 * gaa + 0.5 * finalExam + 0.2 * quiz1 + 0.2 * quiz2;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'corporate_finance') {
    // T = 0.1GAA + 0.4F + 0.2Qz1 + 0.3Qz2 + Normal Bonus
    total = 0.1 * gaa + 0.4 * finalExam + 0.2 * quiz1 + 0.3 * quiz2;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  // New courses
  else if (subject === 'deep_learning_practice') {
    // T = 0.05GA + 0.15Quiz1 + 0.15Quiz2 + 0.15Quiz3 + 0.25*((NPPE1+NPPE2+NPPE3)/3) + 0.25Viva + Normal Bonus
    const nppeAverage = (nppe1 + nppe2 + nppe3) / 3;

    total = 0.05 * ga + 0.15 * quiz1 + 0.15 * quiz2 + 0.15 * quiz3 +
      0.25 * nppeAverage + 0.25 * (params.viva || 0);

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'deep_learning_cv') {
    // T = 0.1GAA + 0.4F + 0.25Qz1 + 0.25Qz2 + Normal Bonus
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'data_visualization') {
    // T = 0.3GA + max(0.2Qz1 + 0.2Qz2, 0.3max(Qz1, Qz2)) + 0.3P + Bonus + Normal Bonus
    const option1 = 0.2 * quiz1 + 0.2 * quiz2;
    const option2 = 0.3 * Math.max(quiz1, quiz2);

    total = 0.3 * ga + Math.max(option1, option2) + 0.3 * project;

    // Add bonuses if total is passing (≥40)
    if (total >= 40) {
      total += extraAssignmentBonus + normalBonus;
    }
  }
  else if (subject === 'managerial_economics') {
    // T = 0.15GAA + max(0.2Qz1 + 0.2Qz2 + 0.45F, 0.5F + 0.25max(Qz1, Qz2)) + Normal Bonus
    const option1 = 0.2 * quiz1 + 0.2 * quiz2 + 0.45 * finalExam;
    const option2 = 0.5 * finalExam + 0.25 * Math.max(quiz1, quiz2);

    total = 0.15 * gaa + Math.max(option1, option2);

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  // New courses - 2nd batch
  else if (subject === 'algorithmic_thinking') {
    // T = 0.075GAA + 0.025GRPa + 0.25Qz1 + 0.25Qz2 + 0.4F + Normal Bonus
    total = 0.075 * gaa + 0.025 * gaap + 0.25 * quiz1 + 0.25 * quiz2 + 0.4 * finalExam;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'industry_4_0') {
    // T = (Quiz Marks) + (Game Marks) + A + (Project Marks) + F + Game Bonus + Normal Bonus
    // A = Best 2 out of 3 assignments (Assignment 1, 2, 3)

    // Calculate best 2 out of 3 assignments
    const assignments = [assignment1, assignment2, assignment3].sort((a, b) => b - a);
    const bestTwoAssignments = assignments[0] + assignments[1];

    // Project marks = Project Submission + Project Presentation
    const projectMarks = projectSubmission + projectPresentation;

    total = quizzes + game + bestTwoAssignments + projectMarks + finalExam;

    // Add bonuses if total is passing (≥40)
    if (total >= 40) {
      total += gameBonus + normalBonus;
    }
  }
  else if (subject === 'mathematical_thinking') {
    // T = 0.1GAA + max(0.6F + 0.2max(Qz1, Qz2), 0.4F + 0.2Qz1 + 0.3Qz2) + Normal Bonus
    const option1 = 0.6 * finalExam + 0.2 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.2 * quiz1 + 0.3 * quiz2;

    total = 0.1 * gaa + Math.max(option1, option2);

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'linear_statistical_models') {
    // T = 0.1GAA + max(0.6F + 0.2max(Qz1, Qz2), 0.4F + 0.25Qz1 + 0.25Qz2) + Normal Bonus
    const option1 = 0.6 * finalExam + 0.2 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;

    total = 0.1 * gaa + Math.max(option1, option2);

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'operating_systems') {
    // T = 0.1GAA + 0.4F + 0.25Qz1 + 0.25Qz2 + Normal Bonus
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  // Courses added in 3rd batch
  else if (subject === 'special_topics_ml') {
    // T = 0.05GAA + 0.25GPA + 0.2Qz1 + 0.2Qz2 + 0.3F + Bonus
    total = 0.05 * gaa + 0.25 * gpa + 0.2 * quiz1 + 0.2 * quiz2 + 0.3 * finalExam;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'big_data_biological_networks') {
    // T = 0.1GAA + 0.4F + 0.25Qz1 + 0.25Qz2 + Normal Bonus
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'large_language_models') {
    // T = 0.05GAA + 0.35F + 0.3Qz1 + 0.3Qz2 + Bonus + Normal Bonus
    total = 0.05 * gaa + 0.35 * finalExam + 0.3 * quiz1 + 0.3 * quiz2;

    // Add bonuses if total is passing (≥40)
    if (total >= 40) {
      total += llmProgrammingBonus + normalBonus;
    }
  }
  // New subjects - 4th batch
  else if (subject === 'computer_networks') {
    // T = 0.1GAA + 0.3F + 0.25Qz1 + 0.25Qz2 + 0.1 Programming Assignment + Normal Bonus
    total = 0.1 * gaa + 0.3 * finalExam + 0.25 * quiz1 + 0.25 * quiz2 + 0.1 * gaap;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'data_science_ai_lab') {
    // T = 0.05GAA + 0.25Quiz + 0.4Project + 0.3Viva + Bonus
    total = 0.05 * gaa + 0.25 * quiz2 + 0.4 * project + 0.3 * (params.viva || 0);

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'app_dev_lab') {
    // T = 0.2Quiz2 + 0.3 Weekly Assignments + 0.5 Project Viva
    total = 0.2 * quiz2 + 0.3 * gaa + 0.5 * (params.viva || 0);

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }
  else if (subject === 'market_research') {
    // T = 0.1GAA + 0.2Qz1 + 0.2Qz2 + 0.25Project + 0.25F + Normal Bonus
    total = 0.1 * gaa + 0.2 * quiz1 + 0.2 * quiz2 + 0.25 * project + 0.25 * finalExam;

    // Add normal bonus if total is passing (≥40)
    if (total >= 40) {
      total += normalBonus;
    }
  }

  // Cap the total at 100
  total = Math.min(total, 100);

  // Round up the score
  return roundUpScore(total);
}

/**
 * Helper function for rounding scores
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
 * Calculate degree scores with dual display (actual vs +2% bonus)
 * Returns both base score and score with +2% bonus
 */
export function calculateDegreeScores(params: DegreeParams): DegreeScoreResult {
  const { subject } = params;

  // Calculate base score using existing function logic (without roundUp)
  // We need to recalculate without bonuses for base score to show actual computed value
  const baseTotal = calculateDegreeTotalRaw(params);
  const baseScore = roundScore(Math.min(baseTotal, 100));

  // Add 2% bonus (capped at 100)
  const bonusApplied = 2;
  const finalScore = roundScore(Math.min(baseTotal + bonusApplied, 100));

  // Get formula based on subject
  const formula = getDegreeFormula(subject);

  return {
    baseScore,
    finalScore,
    bonusApplied,
    formula
  };
}

/**
 * Calculate raw degree total (without rounding) for internal use
 */
function calculateDegreeTotalRaw(params: DegreeParams): number {
  const {
    subject,
    gaa = 0,
    gpa = 0,
    quiz1 = 0,
    quiz2 = 0,
    quiz3 = 0,
    finalExam = 0,
    normalBonus = 0,
    programmingBonus = 0,
    llmProgrammingBonus = 0,
    extraAssignmentBonus = 0,
    gameBonus = 0,
    game = 0,
    quizzes = 0,
    assignment1 = 0,
    assignment2 = 0,
    assignment3 = 0,
    projectSubmission = 0,
    projectPresentation = 0,
    gp1 = 0,
    gp2 = 0,
    pp = 0,
    cp = 0,
    gp = 0,
    oppe1 = 0,
    oppe2 = 0,
    nppe1 = 0,
    nppe2 = 0,
    nppe3 = 0,
    ga = 0,
    project = 0
  } = params;

  let total = 0;

  if (subject === 'software_testing') {
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'software_engineering') {
    total = 0.05 * gaa + 0.2 * quiz2 + 0.4 * finalExam + 0.1 * gp1 + 0.1 * gp2 + 0.1 * pp + 0.05 * cp;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'deep_learning') {
    total = 0.05 * gaa + 0.25 * quiz1 + 0.25 * quiz2 + 0.45 * finalExam;
    if (total >= 40) total += programmingBonus + normalBonus;
  } else if (subject === 'ai_search_methods') {
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;
    if (total >= 40) total += programmingBonus + normalBonus;
  } else if (subject === 'professional_growth') {
    total = 0.15 * gaa + 0.25 * gp + 0.25 * quiz2 + 0.35 * finalExam;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'big_data') {
    total = 0.1 * gaa + 0.3 * finalExam + 0.2 * oppe1 + 0.4 * oppe2;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'programming_in_c') {
    total = 0.1 * gaa + 0.2 * quiz1 + 0.2 * oppe1 + 0.2 * oppe2 + 0.3 * finalExam;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'financial_forensics') {
    const option1 = 0.25 * quiz1 + 0.3 * gp1 + 0.35 * finalExam;
    const option2 = 0.5 * finalExam + 0.3 * Math.max(quiz1, gp1);
    total = 0.1 * gaa + Math.max(option1, option2);
    if (total >= 40) total += normalBonus;
  } else if (subject === 'nlp') {
    total = 0.1 * gaa + 0.5 * finalExam + 0.2 * quiz1 + 0.2 * quiz2;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'corporate_finance') {
    total = 0.1 * gaa + 0.4 * finalExam + 0.2 * quiz1 + 0.3 * quiz2;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'deep_learning_practice') {
    const nppeScores = [nppe1, nppe2, nppe3].sort((a, b) => b - a);
    total = 0.2 * ga + 0.15 * quiz1 + 0.15 * quiz2 + 0.15 * quiz3 +
      0.2 * nppeScores[0] + 0.15 * nppeScores[1] + 0.1 * nppeScores[2];
    if (total >= 40) total += normalBonus;
  } else if (subject === 'deep_learning_cv') {
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'data_visualization') {
    const option1 = 0.2 * quiz1 + 0.2 * quiz2;
    const option2 = 0.3 * Math.max(quiz1, quiz2);
    total = 0.3 * ga + Math.max(option1, option2) + 0.3 * project;
    if (total >= 40) total += extraAssignmentBonus + normalBonus;
  } else if (subject === 'managerial_economics') {
    const option1 = 0.2 * quiz1 + 0.2 * quiz2 + 0.45 * finalExam;
    const option2 = 0.5 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    total = 0.15 * gaa + Math.max(option1, option2);
    if (total >= 40) total += normalBonus;
  } else if (subject === 'algorithmic_thinking') {
    const option1 = 0.2 * quiz1 + 0.2 * quiz2 + 0.4 * finalExam;
    const option2 = 0.45 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    total = 0.2 * gaa + Math.max(option1, option2);
    if (total >= 40) total += normalBonus;
  } else if (subject === 'industry_4_0') {
    const assignments = [assignment1, assignment2, assignment3].sort((a, b) => b - a);
    const bestTwoAssignments = assignments[0] + assignments[1];
    const projectMarks = projectSubmission + projectPresentation;
    total = quizzes + game + bestTwoAssignments + projectMarks + finalExam;
    if (total >= 40) total += gameBonus + normalBonus;
  } else if (subject === 'mathematical_thinking') {
    const option1 = 0.6 * finalExam + 0.2 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.2 * quiz1 + 0.3 * quiz2;
    total = 0.1 * gaa + Math.max(option1, option2);
    if (total >= 40) total += normalBonus;
  } else if (subject === 'linear_statistical_models') {
    const option1 = 0.6 * finalExam + 0.2 * Math.max(quiz1, quiz2);
    const option2 = 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;
    total = 0.1 * gaa + Math.max(option1, option2);
    if (total >= 40) total += normalBonus;
  } else if (subject === 'operating_systems') {
    total = 0.1 * gaa + 0.4 * finalExam + 0.25 * quiz1 + 0.25 * quiz2;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'special_topics_ml') {
    const quizOption1 = 0.2 * quiz1 + 0.2 * quiz2;
    const quizOption2 = 0.3 * Math.max(quiz1, quiz2);
    total = 0.1 * gaa + 0.2 * gpa + Math.max(quizOption1, quizOption2) + 0.3 * finalExam;
    if (total >= 40) total += normalBonus;
  } else if (subject === 'big_data_biological_networks') {
    const option1 = 0.2 * quiz1 + 0.2 * quiz2 + 0.45 * finalExam;
    const option2 = 0.5 * finalExam + 0.25 * Math.max(quiz1, quiz2);
    total = 0.15 * gaa + Math.max(option1, option2);
    if (total >= 40) total += normalBonus;
  } else if (subject === 'large_language_models') {
    total = 0.05 * gaa + 0.35 * finalExam + 0.3 * quiz1 + 0.3 * quiz2;
    if (total >= 40) total += llmProgrammingBonus + normalBonus;
  }

  return total;
}

/**
 * Get formula string for degree subject
 */
function getDegreeFormula(subject: string): string {
  const formulas: Record<string, string> = {
    'software_testing': 'T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2 + Bonus',
    'software_engineering': 'T = 0.05×GAA + 0.2×Qz2 + 0.4×F + 0.1×GP1 + 0.1×GP2 + 0.1×PP + 0.05×CP + Bonus',
    'deep_learning': 'T = 0.05×GAA + 0.25×Qz1 + 0.25×Qz2 + 0.45×F + Bonus',
    'ai_search_methods': 'T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2 + Bonus',
    'professional_growth': 'T = 0.15×GAA + 0.25×GP + 0.25×Qz2 + 0.35×F + Bonus',
    'big_data': 'T = 0.1×GAA + 0.3×F + 0.2×OPPE1 + 0.4×OPPE2 + Bonus',
    'programming_in_c': 'T = 0.1×GAA + 0.2×Qz1 + 0.2×OPPE1 + 0.2×OPPE2 + 0.3×F + Bonus',
    'financial_forensics': 'T = 0.1×GAA + max(0.25×Qz1 + 0.3×GP1 + 0.35×F, 0.5×F + 0.3×max(Qz1,GP1)) + Bonus',
    'nlp': 'T = 0.1×GAA + 0.5×F + 0.2×Qz1 + 0.2×Qz2 + Bonus',
    'corporate_finance': 'T = 0.1×GAA + 0.4×F + 0.2×Qz1 + 0.3×Qz2 + Bonus',
    'deep_learning_practice': 'T = 0.05×GA + 0.15×Qz1 + 0.15×Qz2 + 0.15×Qz3 + 0.25×Avg(NPPE) + 0.25×Viva + Bonus',
    'deep_learning_cv': 'T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2 + Bonus',
    'data_visualization': 'T = 0.3×GA + max(0.2×Qz1 + 0.2×Qz2, 0.3×max(Qz1,Qz2)) + 0.3×P + Bonus',
    'managerial_economics': 'T = 0.15×GAA + max(0.2×Qz1 + 0.2×Qz2 + 0.45×F, 0.5×F + 0.25×max(Qz1,Qz2)) + Bonus',
    'algorithmic_thinking': 'T = 0.2×GAA + max(0.2×Qz1 + 0.2×Qz2 + 0.4×F, 0.45×F + 0.25×max(Qz1,Qz2)) + Bonus',
    'industry_4_0': 'T = Quiz + Game + Best2of3 Assignments + Project + F + Bonus',
    'mathematical_thinking': 'T = 0.1×GAA + max(0.6×F + 0.2×max(Qz1,Qz2), 0.4×F + 0.2×Qz1 + 0.3×Qz2) + Bonus',
    'linear_statistical_models': 'T = 0.1×GAA + max(0.6×F + 0.2×max(Qz1,Qz2), 0.4×F + 0.25×Qz1 + 0.25×Qz2) + Bonus',
    'operating_systems': 'T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2 + Bonus',
    'special_topics_ml': 'T = 0.1×GAA + 0.2×GPA + max(0.2×Qz1 + 0.2×Qz2, 0.3×max(Qz1,Qz2)) + 0.3×F + Bonus',
    'big_data_biological_networks': 'T = 0.15×GAA + max(0.2×Qz1 + 0.2×Qz2 + 0.45×F, 0.5×F + 0.25×max(Qz1,Qz2)) + Bonus',
    'large_language_models': 'T = 0.05×GAA + 0.35×F + 0.3×Qz1 + 0.3×Qz2 + Bonus'
  };
  return formulas[subject] || 'Standard formula';
}

/**
 * Calculate CGPA for degree level courses
 * CGPA = ∑(Grade Points × Credits) / ∑Credits
 */
export function calculateDegreeCGPA(courses: CourseGrade[]): number {
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
 * Degree level subjects with their credits
 */
export const degreeSubjects = [
  { value: 'software_testing', label: 'Software Testing', credits: 4 },
  { value: 'software_engineering', label: 'Software Engineering', credits: 4 },
  { value: 'deep_learning', label: 'Deep Learning', credits: 4 },
  { value: 'ai_search_methods', label: 'AI: Search Methods for Problem Solving', credits: 4 },
  { value: 'professional_growth', label: 'Strategies for Professional Growth', credits: 4 },
  { value: 'big_data', label: 'Introduction to Big Data', credits: 4 },
  { value: 'programming_in_c', label: 'Programming in C', credits: 4 },
  { value: 'financial_forensics', label: 'Financial Forensics', credits: 4 },
  { value: 'nlp', label: 'Introduction to Natural Language Processing (i-NLP)', credits: 4 },
  { value: 'corporate_finance', label: 'Corporate Finance', credits: 4 },
  // New courses
  { value: 'deep_learning_practice', label: 'Deep Learning Practice', credits: 4 },
  { value: 'deep_learning_cv', label: 'Deep Learning for CV', credits: 4 },
  { value: 'data_visualization', label: 'Data Visualization', credits: 4 },
  { value: 'managerial_economics', label: 'Managerial Economics', credits: 4 },
  // More new courses
  { value: 'algorithmic_thinking', label: 'Algorithmic Thinking in Bioinformatics', credits: 4 },
  { value: 'industry_4_0', label: 'Industry 4.0', credits: 4 },
  { value: 'mathematical_thinking', label: 'Mathematical Thinking', credits: 4 },
  { value: 'linear_statistical_models', label: 'Linear Statistical Models', credits: 4 },
  { value: 'operating_systems', label: 'Operating Systems', credits: 4 },
  // Third batch of courses
  { value: 'special_topics_ml', label: 'Special Topics in ML (Reinforcement Learning)', credits: 4 },
  { value: 'big_data_biological_networks', label: 'Big Data & Biological Networks', credits: 4 },
  { value: 'large_language_models', label: 'Large Language Models', credits: 4 },
  // Fourth batch - new courses
  { value: 'computer_networks', label: 'Computer Networks', credits: 4 },
  { value: 'data_science_ai_lab', label: 'Data Science and AI Lab', credits: 4 },
  { value: 'app_dev_lab', label: 'Application Development Lab', credits: 4 },
  { value: 'market_research', label: 'Market Research', credits: 4 },
];

/**
 * Get course details based on subject code
 */
export function getSubjectDetails(subject: string) {
  switch (subject) {
    case 'software_testing':
      return {
        code: 'DGST',
        name: 'Software Testing',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'software_engineering':
      return {
        code: 'DGSE',
        name: 'Software Engineering',
        requiredFields: ['gaa', 'quiz2', 'gp1', 'gp2', 'pp', 'cp', 'finalExam', 'normalBonus']
      };
    case 'deep_learning':
      return {
        code: 'DGDL',
        name: 'Deep Learning',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'programmingBonus', 'normalBonus']
      };
    case 'ai_search_methods':
      return {
        code: 'DGAI',
        name: 'AI: Search Methods for Problem Solving',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'programmingBonus', 'normalBonus']
      };
    case 'professional_growth':
      return {
        code: 'DGPG',
        name: 'Strategies for Professional Growth',
        requiredFields: ['gaa', 'gp', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'big_data':
      return {
        code: 'DGBD',
        name: 'Introduction to Big Data',
        requiredFields: ['gaa', 'oppe1', 'oppe2', 'finalExam', 'normalBonus']
      };
    case 'programming_in_c':
      return {
        code: 'DGPC',
        name: 'Programming in C',
        requiredFields: ['gaa', 'quiz1', 'oppe1', 'oppe2', 'finalExam', 'normalBonus']
      };
    case 'financial_forensics':
      return {
        code: 'DGFF',
        name: 'Financial Forensics',
        requiredFields: ['gaa', 'quiz1', 'gp1', 'finalExam', 'normalBonus']
      };
    case 'nlp':
      return {
        code: 'DGNLP',
        name: 'Introduction to Natural Language Processing (i-NLP)',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'corporate_finance':
      return {
        code: 'DGCF',
        name: 'Corporate Finance',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    // New courses
    case 'deep_learning_practice':
      return {
        code: 'DGDLP',
        name: 'Deep Learning Practice',
        requiredFields: ['ga', 'quiz1', 'quiz2', 'quiz3', 'nppe1', 'nppe2', 'nppe3', 'viva', 'normalBonus']
      };
    case 'deep_learning_cv':
      return {
        code: 'DGDLCV',
        name: 'Deep Learning for CV',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'data_visualization':
      return {
        code: 'DGDV',
        name: 'Data Visualization',
        requiredFields: ['ga', 'quiz1', 'quiz2', 'project', 'extraAssignmentBonus', 'normalBonus']
      };
    case 'managerial_economics':
      return {
        code: 'DGME',
        name: 'Managerial Economics',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    // New courses - 2nd batch
    case 'algorithmic_thinking':
      return {
        code: 'DGAT',
        name: 'Algorithmic Thinking in Bioinformatics',
        requiredFields: ['gaa', 'gaap', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'industry_4_0':
      return {
        code: 'DGI40',
        name: 'Industry 4.0',
        requiredFields: ['quizzes', 'game', 'assignment1', 'assignment2', 'assignment3', 'projectSubmission', 'projectPresentation', 'finalExam', 'gameBonus', 'normalBonus']
      };
    case 'mathematical_thinking':
      return {
        code: 'DGMT',
        name: 'Mathematical Thinking',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'linear_statistical_models':
      return {
        code: 'DGLSM',
        name: 'Linear Statistical Models',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'operating_systems':
      return {
        code: 'DGOS',
        name: 'Operating Systems',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    // Third batch of courses
    case 'special_topics_ml':
      return {
        code: 'DGRL',
        name: 'Special Topics in ML (Reinforcement Learning)',
        requiredFields: ['gaa', 'gpa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'big_data_biological_networks':
      return {
        code: 'DGBDBN',
        name: 'Big Data & Biological Networks',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'large_language_models':
      return {
        code: 'DGLLM',
        name: 'Large Language Models',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'finalExam', 'llmProgrammingBonus', 'normalBonus']
      };
    // Fourth batch - new courses
    case 'computer_networks':
      return {
        code: 'DGCN',
        name: 'Computer Networks',
        requiredFields: ['gaa', 'gaap', 'quiz1', 'quiz2', 'finalExam', 'normalBonus']
      };
    case 'data_science_ai_lab':
      return {
        code: 'DGDSAL',
        name: 'Data Science and AI Lab',
        requiredFields: ['gaa', 'quiz2', 'project', 'viva', 'normalBonus']
      };
    case 'app_dev_lab':
      return {
        code: 'DGADL',
        name: 'Application Development Lab',
        requiredFields: ['gaa', 'quiz2', 'viva', 'normalBonus']
      };
    case 'market_research':
      return {
        code: 'DGMR',
        name: 'Market Research',
        requiredFields: ['gaa', 'quiz1', 'quiz2', 'project', 'finalExam', 'normalBonus']
      };
    default:
      return {
        code: '',
        name: '',
        requiredFields: []
      };
  }
} 