// Foundation level courses for CGPA calculation
// Based on official IITM BS Data Science Program structure
// Total Foundation Credits: 32 (8 courses × 4 credits)

export interface CourseData {
  code: string;
  name: string;
  credits: number;
  level: 'foundation' | 'diploma' | 'bsc' | 'bs';
}

export const foundationCourses: CourseData[] = [
  { code: 'BSMA1001', name: 'Mathematics for Data Science I', credits: 4, level: 'foundation' },
  { code: 'BSMA1002', name: 'Statistics for Data Science I', credits: 4, level: 'foundation' },
  { code: 'BSCS1001', name: 'Computational Thinking', credits: 4, level: 'foundation' },
  { code: 'BSHS1001', name: 'English I', credits: 4, level: 'foundation' },
  { code: 'BSMA1003', name: 'Mathematics for Data Science II', credits: 4, level: 'foundation' },
  { code: 'BSMA1004', name: 'Statistics for Data Science II', credits: 4, level: 'foundation' },
  { code: 'BSCS1002', name: 'Programming in Python', credits: 4, level: 'foundation' },
  { code: 'BSHS1002', name: 'English II', credits: 4, level: 'foundation' },
];

// Total Foundation credits: 32
