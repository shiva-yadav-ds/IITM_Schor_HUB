import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { UserGamification, BADGES, LEVELS, POINTS, Badge, Notification } from '@/types/gamification';

export const useGamification = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [gamificationData, setGamificationData] = useState<UserGamification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGamificationData();
    }
  }, [user]);

  const loadGamificationData = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const gamification: UserGamification = {
          streakCount: userData.streakCount || 0,
          badges: userData.badges || [],
          totalPoints: userData.totalPoints || 0,
          level: userData.gamificationLevel || userData.level || 'Bronze',
          sessionsCreated: userData.sessionsCreated || 0,
          sessionsJoined: userData.sessionsJoined || 0,
          sessionsCompleted: userData.sessionsCompleted || 0,
          crossCollegeSessions: userData.crossCollegeSessions || 0,
          totalRatingsGiven: userData.totalRatingsGiven || 0
        };
        setGamificationData(gamification);
      } else {
        // Initialize default gamification data
        const defaultData: UserGamification = {
          streakCount: 0,
          badges: [],
          totalPoints: 0,
          level: 'Bronze',
          sessionsCreated: 0,
          sessionsJoined: 0,
          sessionsCompleted: 0,
          crossCollegeSessions: 0,
          totalRatingsGiven: 0
        };
        setGamificationData(defaultData);
        await updateUserGamification(defaultData);
      }
    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserGamification = async (data: Partial<UserGamification>) => {
    if (!user) return;

    try {
      const docRef = doc(db, 'users', user.uid);
      // Map 'level' to 'gamificationLevel' to avoid overwriting academic level
      const firestoreData: Record<string, any> = { ...data };
      if ('level' in firestoreData) {
        firestoreData.gamificationLevel = firestoreData.level;
        delete firestoreData.level;
      }
      await updateDoc(docRef, firestoreData);
      
      setGamificationData(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      console.error('Error updating gamification data:', error);
    }
  };

  const awardPoints = async (points: number, action: string) => {
    if (!user || !gamificationData) return;

    const newTotalPoints = gamificationData.totalPoints + points;
    const currentLevel = gamificationData.level;
    const newLevel = calculateLevel(newTotalPoints);

    await updateUserGamification({
      totalPoints: newTotalPoints,
      level: newLevel
    });

    // Check for level up
    if (newLevel !== currentLevel) {
      await createNotification({
        type: 'level_up',
        title: `Level Up! 🎉`,
        message: `Congratulations! You've reached ${newLevel} level!`,
        data: { oldLevel: currentLevel, newLevel, points: newTotalPoints }
      });

      toast({
        title: "🎉 Level Up!",
        description: `You've reached ${newLevel} level!`,
      });
    }
  };

  const checkAndAwardBadges = async (updates: Partial<UserGamification>) => {
    if (!user || !gamificationData) return;

    const updatedData = { ...gamificationData, ...updates };
    const newBadges: string[] = [];

    BADGES.forEach(badge => {
      if (!updatedData.badges.includes(badge.id)) {
        let qualifies = false;

        switch (badge.type) {
          case 'sessions':
            qualifies = (updatedData.sessionsCreated + updatedData.sessionsJoined) >= badge.requirement;
            break;
          case 'streak':
            qualifies = updatedData.streakCount >= badge.requirement;
            break;
          case 'cross_college':
            qualifies = updatedData.crossCollegeSessions >= badge.requirement;
            break;
          case 'rating':
            qualifies = updatedData.totalRatingsGiven >= badge.requirement;
            break;
        }

        if (qualifies) {
          newBadges.push(badge.id);
        }
      }
    });

    if (newBadges.length > 0) {
      const updatedBadges = [...updatedData.badges, ...newBadges];
      await updateUserGamification({ badges: updatedBadges });

      // Create notifications for new badges
      for (const badgeId of newBadges) {
        const badge = BADGES.find(b => b.id === badgeId);
        if (badge) {
          await createNotification({
            type: 'badge_earned',
            title: `New Badge Earned! ${badge.icon}`,
            message: `${badge.name}: ${badge.description}`,
            data: { badgeId, badge }
          });

          toast({
            title: `🏆 New Badge!`,
            description: `${badge.name}: ${badge.description}`,
          });
        }
      }
    }
  };

  const onSessionCreated = async () => {
    if (!gamificationData) return;

    const updates = {
      sessionsCreated: gamificationData.sessionsCreated + 1
    };

    await updateUserGamification(updates);
    await awardPoints(POINTS.CREATE_SESSION, 'session_created');
    await checkAndAwardBadges(updates);
  };

  const onSessionJoined = async (isFromDifferentCollege = false) => {
    if (!gamificationData) return;

    const updates: Partial<UserGamification> = {
      sessionsJoined: gamificationData.sessionsJoined + 1
    };

    if (isFromDifferentCollege) {
      updates.crossCollegeSessions = gamificationData.crossCollegeSessions + 1;
    }

    await updateUserGamification(updates);
    await awardPoints(POINTS.JOIN_SESSION, 'session_joined');
    await checkAndAwardBadges(updates);
  };

  const onSessionCompleted = async () => {
    if (!gamificationData) return;

    const updates = {
      sessionsCompleted: gamificationData.sessionsCompleted + 1
    };

    await updateUserGamification(updates);
    await awardPoints(POINTS.COMPLETE_SESSION, 'session_completed');
    await checkAndAwardBadges(updates);
  };

  const onRatingGiven = async () => {
    if (!gamificationData) return;

    const updates = {
      totalRatingsGiven: gamificationData.totalRatingsGiven + 1
    };

    await updateUserGamification(updates);
    await awardPoints(POINTS.GIVE_RATING, 'rating_given');
    await checkAndAwardBadges(updates);
  };

  const updateStreak = async (newStreak: number) => {
    if (!gamificationData) return;

    const wasStreakMilestone = gamificationData.streakCount < 7 && newStreak >= 7;
    const updates = { streakCount: newStreak };

    await updateUserGamification(updates);
    await checkAndAwardBadges(updates);

    if (wasStreakMilestone) {
      await createNotification({
        type: 'streak_milestone',
        title: `🔥 Streak Milestone!`,
        message: `Amazing! You've reached a ${newStreak}-day study streak!`,
        data: { streak: newStreak }
      });
    }
  };

  const createNotification = async (notificationData: {
    type: 'badge_earned' | 'level_up' | 'streak_milestone';
    title: string;
    message: string;
    data?: any;
  }) => {
    if (!user) return;

    try {
      await addDoc(collection(db, 'users', user.uid, 'notifications'), {
        ...notificationData,
        read: false,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const calculateLevel = (points: number): UserGamification['level'] => {
    if (points >= LEVELS.Platinum.min) return 'Platinum';
    if (points >= LEVELS.Gold.min) return 'Gold';
    if (points >= LEVELS.Silver.min) return 'Silver';
    return 'Bronze';
  };

  const getProgressToNextLevel = () => {
    if (!gamificationData) return { progress: 0, nextLevel: 'Silver', pointsNeeded: 50 };

    const currentPoints = gamificationData.totalPoints;
    const currentLevel = gamificationData.level;

    switch (currentLevel) {
      case 'Bronze':
        return {
          progress: (currentPoints / LEVELS.Silver.min) * 100,
          nextLevel: 'Silver',
          pointsNeeded: LEVELS.Silver.min - currentPoints
        };
      case 'Silver':
        return {
          progress: ((currentPoints - LEVELS.Silver.min) / (LEVELS.Gold.min - LEVELS.Silver.min)) * 100,
          nextLevel: 'Gold',
          pointsNeeded: LEVELS.Gold.min - currentPoints
        };
      case 'Gold':
        return {
          progress: ((currentPoints - LEVELS.Gold.min) / (LEVELS.Platinum.min - LEVELS.Gold.min)) * 100,
          nextLevel: 'Platinum',
          pointsNeeded: LEVELS.Platinum.min - currentPoints
        };
      case 'Platinum':
        return {
          progress: 100,
          nextLevel: 'Max Level',
          pointsNeeded: 0
        };
    }
  };

  return {
    gamificationData,
    loading,
    onSessionCreated,
    onSessionJoined,
    onSessionCompleted,
    onRatingGiven,
    updateStreak,
    getProgressToNextLevel,
    calculateLevel
  };
};