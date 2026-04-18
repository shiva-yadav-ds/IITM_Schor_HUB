import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useGamification } from '@/hooks/useGamification';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Award, Target } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  sessionId: string;
  uid: string;
  joinedAt: Date;
  status: 'present' | 'missed';
}

const ConsistencyTracker = () => {
  const { user } = useAuth();
  const { updateStreak } = useGamification();
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSessions: 0,
    currentStreak: 0,
    attendanceRate: 0,
    weeklyAttendance: Array(7).fill(false)
  });

  useEffect(() => {
    if (user) {
      loadAttendanceData();
    }
  }, [user]);

  const loadAttendanceData = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'attendance'),
        where('uid', '==', user.uid),
        orderBy('joinedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const records: AttendanceRecord[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        records.push({
          id: doc.id,
          sessionId: data.sessionId,
          uid: data.uid,
          joinedAt: data.joinedAt.toDate(),
          status: data.status
        });
      });

      setAttendanceData(records);
      calculateStats(records);
    } catch (error) {
      console.error('Error loading attendance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (records: AttendanceRecord[]) => {
    const totalSessions = records.length;
    const presentSessions = records.filter(r => r.status === 'present').length;
    const attendanceRate = totalSessions > 0 ? (presentSessions / totalSessions) * 100 : 0;

    // Calculate current streak
    let currentStreak = 0;
    for (const record of records) {
      if (record.status === 'present') {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate weekly attendance (last 7 days)
    const weeklyAttendance = Array(7).fill(false);
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const hasAttendance = records.some(record => {
        const recordDate = new Date(record.joinedAt);
        recordDate.setHours(0, 0, 0, 0);
        return recordDate.getTime() === date.getTime() && record.status === 'present';
      });
      
      weeklyAttendance[6 - i] = hasAttendance;
    }

    setStats({
      totalSessions,
      currentStreak,
      attendanceRate,
      weeklyAttendance
    });

    // Update gamification streak
    if (currentStreak !== stats.currentStreak) {
      updateStreak(currentStreak);
    }
  };

  const getDayLabel = (index: number) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return days[index];
  };

  if (loading) {
    return (
      <Card className="ios-card border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading stats...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="ios-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Consistency Tracker
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-4 bg-primary-light/30 rounded-2xl"
            >
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{stats.totalSessions}</p>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-4 bg-primary-light/30 rounded-2xl"
            >
              <Award className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{stats.currentStreak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-center p-4 bg-primary-light/30 rounded-2xl col-span-2 md:col-span-1"
            >
              <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{Math.round(stats.attendanceRate)}%</p>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </motion.div>
          </div>

          {/* Weekly Calendar */}
          <div>
            <h4 className="font-medium mb-3 text-sm">Last 7 Days</h4>
            <div className="flex justify-between items-center space-x-2">
              {stats.weeklyAttendance.map((attended, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                      attended
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground border border-border'
                    }`}
                  >
                    {attended ? '✓' : '○'}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {getDayLabel(index)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Streak Badge */}
          {stats.currentStreak > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-3 bg-gradient-to-r from-primary-light/50 to-primary-light/30 rounded-2xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <Award className="h-4 w-4 text-primary" />
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {stats.currentStreak === 1 
                    ? '1 day streak!' 
                    : `${stats.currentStreak} day streak! 🔥`
                  }
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep it up! Consistency builds success.
              </p>
            </motion.div>
          )}

          {stats.totalSessions === 0 && (
            <div className="text-center py-4">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">
                Join your first study session to start tracking your consistency!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConsistencyTracker;