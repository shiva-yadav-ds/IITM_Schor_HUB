import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Flame, Star, Video, Users } from 'lucide-react';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import { LEVELS } from '@/types/gamification';
import { startOfWeek } from 'date-fns';

interface LeaderboardUser {
  id: string;
  name: string;
  streakCount: number;
  totalPoints: number;
  weeklyPoints: number;
  gamificationLevel: string;
  badgeCount: number;
  sessionsCount: number;
  shortsCount: number;
  weeklySessionsCount: number;
  weeklyShortsCount: number;
}

const Leaderboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'week' | 'all'>('week');

  useEffect(() => {
    if (!user) return;
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError('');

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const collegeId = userData?.collegeId;

        if (!collegeId) {
          setError('Complete your profile to see the leaderboard.');
          setLoading(false);
          return;
        }

        const collegeDoc = await getDoc(doc(db, 'colleges', collegeId));
        if (collegeDoc.exists()) {
          setCollegeName(collegeDoc.data()?.name || 'Your College');
        }

        const usersQuery = query(
          collection(db, 'users'),
          where('collegeId', '==', collegeId)
        );
        const snapshot = await getDocs(usersQuery);
        const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

        // Fetch all shorts for counting
        const shortsSnapshot = await getDocs(
          query(collection(db, 'study_reels'), where('status', '==', 'active'))
        );
        const shortsByUser: Record<string, { total: number; weekly: number }> = {};
        shortsSnapshot.docs.forEach(d => {
          const data = d.data();
          const uid = data.uploader_id;
          if (!shortsByUser[uid]) shortsByUser[uid] = { total: 0, weekly: 0 };
          shortsByUser[uid].total++;
          if (data.created_at?.toDate?.() >= weekStart) {
            shortsByUser[uid].weekly++;
          }
        });

        const leaderboardData: LeaderboardUser[] = snapshot.docs.map(d => {
          const data = d.data();
          const sessionsCreated = data.sessionsCreated || 0;
          const sessionsJoined = data.sessionsJoined || 0;
          const totalSessions = sessionsCreated + sessionsJoined;

          // Weekly sessions from pointsLog (session-related entries)
          const pointsLog: { points: number; timestamp: any; type?: string }[] = data.pointsLog || [];
          const weeklySessionEntries = pointsLog.filter(
            entry => entry.timestamp?.toDate?.() >= weekStart && (entry.type === 'session_created' || entry.type === 'session_joined' || entry.type === 'session_completed')
          ).length;

          const shorts = shortsByUser[d.id] || { total: 0, weekly: 0 };

          return {
            id: d.id,
            name: data.name || 'Anonymous',
            streakCount: data.streakCount || 0,
            totalPoints: data.totalPoints || 0,
            weeklyPoints: 0,
            gamificationLevel: data.gamificationLevel || 'Bronze',
            badgeCount: (data.badges || []).length,
            sessionsCount: totalSessions,
            shortsCount: shorts.total,
            weeklySessionsCount: weeklySessionEntries,
            weeklyShortsCount: shorts.weekly,
          };
        });

        setUsers(leaderboardData);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        setError('Failed to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [user]);

  const sortedUsers = useMemo(() => {
    const sorted = [...users].sort((a, b) => {
      if (tab === 'week') {
        const scoreA = a.weeklySessionsCount + a.weeklyShortsCount;
        const scoreB = b.weeklySessionsCount + b.weeklyShortsCount;
        return scoreB - scoreA || b.streakCount - a.streakCount;
      } else {
        const scoreA = a.sessionsCount + a.shortsCount;
        const scoreB = b.sessionsCount + b.shortsCount;
        return scoreB - scoreA || b.streakCount - a.streakCount;
      }
    });
    return sorted.slice(0, 20);
  }, [users, tab]);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{index + 1}</span>;
  };

  const getLevelColor = (level: string) => {
    const l = LEVELS[level as keyof typeof LEVELS];
    return l?.color || 'bg-muted';
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          </div>
          {collegeName && (
            <p className="text-sm text-muted-foreground">{collegeName}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">Ranked by Sessions + Shorts created</p>
        </motion.div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as 'week' | 'all')} className="mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="week" className="flex-1">This Week</TabsTrigger>
            <TabsTrigger value="all" className="flex-1">All Time</TabsTrigger>
          </TabsList>
        </Tabs>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              {error}
            </CardContent>
          </Card>
        ) : sortedUsers.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No users found in your college yet.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {sortedUsers.map((u, index) => {
              const isCurrentUser = u.id === user?.uid;
              const sessions = tab === 'week' ? u.weeklySessionsCount : u.sessionsCount;
              const shorts = tab === 'week' ? u.weeklyShortsCount : u.shortsCount;
              return (
                <motion.div
                  key={u.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`transition-all ${
                    isCurrentUser ? 'ring-2 ring-primary bg-primary/5' : ''
                  } ${index < 3 ? 'shadow-md' : ''}`}>
                    <CardContent className="flex items-center gap-3 p-3">
                      <div className="w-8 flex justify-center shrink-0">
                        {getRankIcon(index)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-semibold text-sm truncate ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                            {u.name} {isCurrentUser && '(You)'}
                          </p>
                          <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${getLevelColor(u.gamificationLevel)} text-white border-0`}>
                            {u.gamificationLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" /> {sessions} sessions
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="h-3 w-3" /> {shorts} shorts
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" /> {u.streakCount}d
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default Leaderboard;
