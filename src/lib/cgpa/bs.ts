// BS Degree level courses for CGPA calculation
// Based on official IITM BS Data Science Program structure
// Prerequisite: BSc Degree (114 credits)
// Total BS Level Credits: 28
// Cumulative Credits for BS Degree: 142
import { CourseData } from './foundation';

export const bsCourses: CourseData[] = [
  // ========================================
  // CORE COURSES (Same 4 as BSc, 16 credits if not already counted)
  // These are shared/overlapping with BSc level
  // ========================================
  // Already included in BSc: Software Engineering, Software Testing, 
  // AI: Search Methods, Deep Learning

  // ========================================
  // MANDATORY COURSE (4 Credits)
  // ========================================
  { code: 'BSGN4001', name: 'Strategies for Professional Growth', credits: 4, level: 'bs' },

  // ========================================
  // ELECTIVES FROM NPTEL (Up to 8 Credits)
  // ========================================
  { code: 'NPTEL4001', name: 'NPTEL Elective 1', credits: 4, level: 'bs' },
  { code: 'NPTEL4002', name: 'NPTEL Elective 2', credits: 4, level: 'bs' },

  // ========================================
  // APPRENTICESHIP (Up to 12 Credits)
  // ========================================
  { code: 'BSIN4001', name: 'Apprenticeship (4 months)', credits: 4, level: 'bs' },
  { code: 'BSIN4002', name: 'Apprenticeship Extended (5-8 months)', credits: 8, level: 'bs' },
  { code: 'BSIN4003', name: 'Apprenticeship Full (8 months)', credits: 12, level: 'bs' },

  // ========================================
  // ADDITIONAL ELECTIVES (Various)
  // ========================================
  { code: 'BSCS4001', name: 'Algorithmic Thinking in Bioinformatics', credits: 4, level: 'bs' },
  { code: 'BSCS4002', name: 'Big Data and Biological Networks', credits: 4, level: 'bs' },
  { code: 'BSCS4003', name: 'Programming in C', credits: 4, level: 'bs' },
  { code: 'BSMS4001', name: 'Reinforcement Learning', credits: 4, level: 'bs' },
  { code: 'BSMS4002', name: 'Large Language Models (LLM)', credits: 4, level: 'bs' },
  { code: 'BSMS4003', name: 'Deep Learning for Computer Vision', credits: 4, level: 'bs' },
];

// BS Degree Requirements:
// - Core Courses: 16 credits (shared/overlapping with BSc)
// - Mandatory: 4 credits
// - Electives from NPTEL: Up to 8 credits
// - Apprenticeship: Up to 12 credits
// - Additional Electives: Variable (to complete 28 credits)
// - Total BS Level: 28 credits
//
// Cumulative for BS Degree: 114 (BSc) + 28 (BS) = 142 credits
