// Diploma level courses for CGPA calculation
// Based on official IITM BS Data Science Program structure
// Total Diploma Credits: 54 (Programming: 27 + Data Science: 27)
import { CourseData } from './foundation';

export const diplomaCourses: CourseData[] = [
  // ========================================
  // DIPLOMA IN PROGRAMMING (6 courses + 2 projects = 27 Credits)
  // ========================================
  { code: 'BSCS2001', name: 'Database Management Systems', credits: 4, level: 'diploma' },
  { code: 'BSCS2002', name: 'Programming, Data Structures and Algorithms using Python', credits: 4, level: 'diploma' },
  { code: 'BSCS2003', name: 'Modern Application Development I', credits: 4, level: 'diploma' },
  { code: 'BSCS2003P', name: 'Modern Application Development I - Project', credits: 2, level: 'diploma' },
  { code: 'BSCS2005', name: 'Programming Concepts using Java', credits: 4, level: 'diploma' },
  { code: 'BSCS2006', name: 'Modern Application Development II', credits: 4, level: 'diploma' },
  { code: 'BSCS2006P', name: 'Modern Application Development II - Project', credits: 2, level: 'diploma' },
  { code: 'BSSE2001', name: 'System Commands', credits: 3, level: 'diploma' },

  // ========================================
  // DIPLOMA IN DATA SCIENCE - MANDATORY (5 courses + 1 project + 1 skill enhancement = 21 Credits)
  // ========================================
  { code: 'BSCS2004', name: 'Machine Learning Foundations', credits: 4, level: 'diploma' },
  { code: 'BSMS2001', name: 'Business Data Management', credits: 4, level: 'diploma' },
  { code: 'BSCS2007', name: 'Machine Learning Techniques', credits: 4, level: 'diploma' },
  { code: 'BSCS2008', name: 'Machine Learning Practice', credits: 4, level: 'diploma' },
  { code: 'BSCS2008P', name: 'Machine Learning Practice - Project', credits: 2, level: 'diploma' },
  { code: 'BSSE2002', name: 'Tools in Data Science (Skill Enhancement)', credits: 3, level: 'diploma' },

  // ========================================
  // DIPLOMA IN DATA SCIENCE - ELECTIVE TRACKS (Choose 1 track = 6 Credits)
  // ========================================

  // Option 1: Business Analytics Track
  { code: 'BSMS2002', name: 'Business Analytics', credits: 4, level: 'diploma' },
  { code: 'BSMS2001P', name: 'Business Data Management - Project', credits: 2, level: 'diploma' },

  // Option 2: Introduction to Deep Learning and Generative AI Track
  { code: 'BSDA2001', name: 'Introduction to Deep Learning and Generative AI', credits: 4, level: 'diploma' },
  { code: 'BSDA2001P', name: 'Deep Learning and Generative AI - Project', credits: 2, level: 'diploma' },
];

// Total Diploma Credits: 54 (27 + 27)
// 
// Diploma in Programming (27 credits):
//   BSCS2001 (4) + BSCS2002 (4) + BSCS2003 (4) + BSCS2003P (2) + 
//   BSCS2005 (4) + BSCS2006 (4) + BSCS2006P (2) + BSSE2001 (3) = 27
//
// Diploma in Data Science (27 credits):
//   Mandatory (21): BSCS2004 (4) + BSMS2001 (4) + BSCS2007 (4) + 
//                   BSCS2008 (4) + BSCS2008P (2) + BSSE2002 (3) = 21
//   Elective Track (6): Choose Option 1 OR Option 2
//     Option 1: BSMS2002 (4) + BSMS2001P (2) = 6
//     Option 2: BSDA2001 (4) + BSDA2001P (2) = 6
