// BSc Degree level courses for CGPA calculation
// Based on official IITM BS Data Science Program structure
// Prerequisite: Foundation (32) + Both Diplomas (54) = 86 credits
// Total BSc Level Credits: 28
// Cumulative Credits for BSc Degree: 114
import { CourseData } from './foundation';

export const bscCourses: CourseData[] = [
  // ========================================
  // CORE COURSES (16 Credits)
  // ========================================
  { code: 'BSCS3001', name: 'Software Engineering', credits: 4, level: 'bsc' },
  { code: 'BSCS3002', name: 'Software Testing', credits: 4, level: 'bsc' },
  { code: 'BSCS3003', name: 'AI: Search Methods for Problem Solving', credits: 4, level: 'bsc' },
  { code: 'BSCS3004', name: 'Deep Learning', credits: 4, level: 'bsc' },

  // ========================================
  // MANDATORY COURSE (4 Credits)
  // ========================================
  { code: 'BSGN3001', name: 'Strategies for Professional Growth', credits: 4, level: 'bsc' },

  // ========================================
  // ELECTIVES FROM NPTEL (Up to 8 Credits)
  // ========================================
  { code: 'NPTEL3001', name: 'NPTEL Elective 1', credits: 4, level: 'bsc' },
  { code: 'NPTEL3002', name: 'NPTEL Elective 2', credits: 4, level: 'bsc' },
];

// BSc Degree Requirements:
// - Core Courses: 16 credits (4 courses × 4 credits)
// - Mandatory: Strategies for Professional Growth (4 credits)
// - Electives from NPTEL: Up to 8 credits
// - Total BSc Level: 28 credits
//
// Cumulative for BSc Degree: 32 (Foundation) + 54 (Diplomas) + 28 (BSc) = 114 credits
