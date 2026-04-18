export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: number;
  type: 'streak' | 'sessions' | 'cross_college' | 'rating' | 'special';
}

export interface UserGamification {
  streakCount: number;
  badges: string[];
  totalPoints: number;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  sessionsCreated: number;
  sessionsJoined: number;
  sessionsCompleted: number;
  crossCollegeSessions: number;
  totalRatingsGiven: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'badge_earned' | 'level_up' | 'streak_milestone';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export interface AnalyticsData {
  totalUsers: number;
  totalSessions: number;
  activeUsers: number;
  topSubjects: { name: string; count: number }[];
  mostActiveColleges: { name: string; count: number }[];
  dailyActivity: { date: string; users: number; sessions: number }[];
}

export const BADGES: Badge[] = [
  {
    id: 'first_session',
    name: 'Getting Started',
    description: 'Created your first study session',
    icon: '🚀',
    color: 'bg-blue-500',
    requirement: 1,
    type: 'sessions'
  },
  {
    id: 'session_creator',
    name: 'Session Creator',
    description: 'Created 5 study sessions',
    icon: '📚',
    color: 'bg-green-500',
    requirement: 5,
    type: 'sessions'
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Joined 10 study sessions',
    icon: '🦋',
    color: 'bg-purple-500',
    requirement: 10,
    type: 'sessions'
  },
  {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: '7-day study streak',
    icon: '🔥',
    color: 'bg-orange-500',
    requirement: 7,
    type: 'streak'
  },
  {
    id: 'consistency_king',
    name: 'Consistency King',
    description: '30-day study streak',
    icon: '👑',
    color: 'bg-yellow-500',
    requirement: 30,
    type: 'streak'
  },
  {
    id: 'cross_college',
    name: 'Bridge Builder',
    description: 'Joined a session from another college',
    icon: '🌉',
    color: 'bg-indigo-500',
    requirement: 1,
    type: 'cross_college'
  },
  {
    id: 'helpful_peer',
    name: 'Helpful Peer',
    description: 'Gave 10 peer ratings',
    icon: '⭐',
    color: 'bg-pink-500',
    requirement: 10,
    type: 'rating'
  }
];

export const LEVELS = {
  Bronze: { min: 0, max: 49, color: 'bg-amber-600' },
  Silver: { min: 50, max: 149, color: 'bg-gray-400' },
  Gold: { min: 150, max: 299, color: 'bg-yellow-500' },
  Platinum: { min: 300, max: Infinity, color: 'bg-purple-600' }
};

export const POINTS = {
  CREATE_SESSION: 5,
  JOIN_SESSION: 3,
  COMPLETE_SESSION: 2,
  GIVE_RATING: 1
};