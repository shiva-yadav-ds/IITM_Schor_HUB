export interface UserProfile {
  name: string;
  email: string;
  collegeId: string;
  programId: string;
  level: string;
  subjects: string[];
  profileComplete: boolean;
  createdAt: Date;
  // Gamification fields
  streakCount?: number;
  badges?: string[];
  totalPoints?: number;
  gamificationLevel?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  sessionsCreated?: number;
  sessionsJoined?: number;
  sessionsCompleted?: number;
  crossCollegeSessions?: number;
  totalRatingsGiven?: number;
  avgRating?: number;
  totalRatings?: number;
  friends?: string[];
}

export interface Program {
  id: string;
  name: string;
  levels: ProgramLevel[];
}

export interface ProgramLevel {
  id: string;
  name: string;
  subjects: string[];
}

export interface College {
  id: string;
  name: string;
  programs: Program[];
}

export interface Session {
  id: string;
  hostId: string;
  hostName?: string;
  collegeId: string;
  programId: string;
  level: string;
  subject: string;
  title: string;
  description?: string;
  meetLink: string;
  time: Date;
  expireAt: Date;
  createdAt: Date;
  maxParticipants: number; // 2, 3, or 4
  currentParticipants: string[]; // Array of user IDs
}

export interface JoinRequest {
  id: string;
  sessionId: string;
  fromUserId: string;
  fromUserName?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

// Backward compatibility - will be removed gradually
export const LEGACY_LEVELS = ['Foundation', 'Diploma', 'Degree', 'Masters'] as const;
export const LEGACY_SUBJECTS = [
  'Maths-2', 
  'Stats-1', 
  'Python-1', 
  'AI-Basics',
  'Physics-1',
  'Chemistry-1', 
  'Biology-1', 
  'Economics-1'
] as const;

export type LegacyLevel = typeof LEGACY_LEVELS[number];
export type LegacySubject = typeof LEGACY_SUBJECTS[number];