/**
 * Formula weightage utility functions for marks prediction
 */

/**
 * Get component weights based on subject code
 * Updated formula weights - no GAA for foundation subjects (new rules)
 * 
 * Standard formula: T = max(0.6F + 0.3*max(Qz1, Qz2), 0.45F + 0.25*Qz1 + 0.3*Qz2)
 * Option 2 (45+25+30=100%) is used for display since it shows both quizzes
 * 
 * @param subjectCode - The subject code
 * @returns Record of component weights
 */
export function getFormulaWeightage(subjectCode: string): Record<string, number> {
  // Python Programming: T = 0.15*Qz1 + 0.4*F + 0.25*max(PE1, PE2) + 0.2*min(PE1, PE2)
  // Total: 15 + 40 + 25 + 20 = 100%
  if (subjectCode === 'BSCCS1001') {
    return {
      quiz1: 15, // Quiz 1 - 15%
      pe1: 25, // Best Programming Exam - 25%
      pe2: 20, // Min Programming Exam - 20%
      final: 40 // Final Exam - 40%
    };
  }

  // Statistics 1 & 2, Math 2 (with bonus): Same standard formula
  // T = max(0.6F + 0.3*max(Qz1, Qz2), 0.45F + 0.25*Qz1 + 0.3*Qz2)
  // Using Option 2 weights: 25+30+45 = 100%
  else if (subjectCode === 'BSCCS1002' || subjectCode === 'BSCCS1006' || subjectCode === 'BSCCS1007') {
    return {
      quiz1: 25, // Quiz 1 - 25%
      quiz2: 30, // Quiz 2 - 30%
      final: 45 // Final Exam - 45%
    };
  }

  // Standard courses: Math 1 (BSCCS1004), English 1 (BSCCS1005), 
  // Computational Thinking (BSCCS1003), English 2 (BSCCS1008)
  // T = max(0.6F + 0.3*max(Qz1, Qz2), 0.45F + 0.25*Qz1 + 0.3*Qz2)
  // Using Option 2 weights: 25+30+45 = 100%
  else {
    return {
      quiz1: 25, // Quiz 1 - 25%
      quiz2: 30, // Quiz 2 - 30%
      final: 45 // Final Exam - 45%
    };
  }
}

/**
 * Calculate the total achieved score based on formula weightage
 * @param components - Input components with values
 * @param weightage - Weightage of each component
 * @returns Total achieved score
 */
export function calculateAchievedScore(
  components: Record<string, number>,
  weightage: Record<string, number>
): number {
  let totalScore = 0;

  // Iterate through components and apply weightage
  Object.keys(components).forEach(key => {
    if (weightage[key]) {
      totalScore += (components[key] * weightage[key]) / 100;
    }
  });

  return totalScore;
}

/**
 * Get the description of formula for a particular subject
 * @param subjectCode - The subject code
 * @returns Formula description
 */
export function getFormulaDescription(subjectCode: string): string {
  // Python Programming
  if (subjectCode === 'BSCCS1001') {
    return 'T = 0.15×Qz1 + 0.4×F + 0.25×max(PE1, PE2) + 0.2×min(PE1, PE2)';
  }

  // Standard and Statistics courses (same formula)
  else {
    return 'T = max(0.6×F + 0.3×max(Qz1, Qz2), 0.45×F + 0.25×Qz1 + 0.3×Qz2)';
  }
} 