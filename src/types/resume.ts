export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  school: string;
  degree: string;
  graduationYear: string;
  gpa?: string;
  relevantCourses: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  responsibilities: string[];
}

export interface Skill {
  id: string;
  name: string;
  type: 'technical' | 'soft';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface AdditionalInfo {
  summary: string;
  hobbies: string[];
  languages: string[];
  references?: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  additional: AdditionalInfo;
}

// Default values for new resume
export const defaultResumeData: ResumeData = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    github: '',
  },
  education: [{
    school: '',
    degree: '',
    graduationYear: '',
    gpa: '',
    relevantCourses: []
  }],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  additional: {
    summary: '',
    hobbies: [],
    languages: [],
    references: ''
  }
};

export type ResumeTemplate = 
  | 'professional'
  | 'minimalist'
  | 'creative' 
  | 'tech'
  | 'modern-compact'
  | 'elegant'
  | 'minimal-bar'
  | 'simple-elegant';

export const templates = [
  { id: 'professional', name: 'Professional', description: 'Formal business-oriented design' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean design with focus on content' },
  { id: 'creative', name: 'Creative', description: 'Colorful design with visual elements' },
  { id: 'tech', name: 'Tech', description: 'Dark mode coding-inspired design' },
  { id: 'modern-compact', name: 'Modern Compact', description: 'Modern design with efficient space usage' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined layout' },
  { id: 'minimal-bar', name: 'Minimal Bar', description: 'Clean design with side bar' },
  { id: 'simple-elegant', name: 'Simple Elegant', description: 'Simple yet elegant layout' }
];
