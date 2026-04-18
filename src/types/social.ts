export interface FriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  fromUserName?: string;
  fromUserCollege?: string;
  fromUserSubjects?: string[];
}

export interface Friend {
  id: string;
  name: string;
  email: string;
  collegeId: string;
  level?: string;
  subjects?: string[];
  avgRating?: number;
  totalRatings?: number;
  streakCount?: number;
  gamificationLevel?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface StudyGroup {
  id: string;
  groupName: string;
  createdBy: string;
  members: string[];
  subject: string;
  collegeMode: 'same' | 'cross';
  maxMembers: number;
  description?: string;
  createdAt: Date;
  isPrivate: boolean;
}

export interface GroupJoinRequest {
  id: string;
  groupId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  userName?: string;
  userCollege?: string;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system';
}