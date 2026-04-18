import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, Award, Calendar, GraduationCap, BarChart3, Flag, Trash2, CheckCircle, Video } from 'lucide-react';
import { collection, getDocs, query, where, orderBy, limit, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
import { db, rtdb } from '@/firebaseConfig';
import { AnalyticsData } from '@/types/gamification';
import { useToast } from '@/hooks/use-toast';

interface Report {
  id: string;
  video_id: string;
  reported_by: string;
  reason: string;
  status: string;
  created_at: any;
  videoTitle?: string;
  videoUploader?: string;
  reporterName?: string;
}

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalytics();
    loadReports();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      // Get total users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const totalUsers = usersSnapshot.size;

      // Get active users (last 7 days) - try/catch separately since attendance rules may block
      let activeUsers = 0;
      try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const activeUsersQuery = query(
          collection(db, 'attendance'),
          where('joinedAt', '>=', sevenDaysAgo)
        );
        const activeUsersSnapshot = await getDocs(activeUsersQuery);
        const uniqueActiveUsers = new Set(activeUsersSnapshot.docs.map(doc => doc.data().uid));
        activeUsers = uniqueActiveUsers.size;
      } catch (e) {
        console.warn('Could not load attendance data:', e);
      }

      // Get total sessions from RTDB
      const sessionsRef = ref(rtdb, 'sessions');
      const sessionsSnapshot = await get(sessionsRef);
      const sessionsData = sessionsSnapshot.val() || {};
      const totalSessions = Object.keys(sessionsData).length;

      // Analyze subjects from sessions
      const subjectCounts: { [key: string]: number } = {};
      Object.values(sessionsData).forEach((session: any) => {
        if (session.subject) {
          subjectCounts[session.subject] = (subjectCounts[session.subject] || 0) + 1;
        }
      });

      const topSubjects = Object.entries(subjectCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      // Analyze colleges from sessions
      const collegeCounts: { [key: string]: number } = {};
      const collegesSnapshot = await getDocs(collection(db, 'colleges'));
      const collegesData: { [key: string]: string } = {};
      collegesSnapshot.forEach(doc => {
        collegesData[doc.id] = doc.data().name;
      });

      Object.values(sessionsData).forEach((session: any) => {
        if (session.collegeId) {
          const collegeName = collegesData[session.collegeId] || session.collegeId;
          collegeCounts[collegeName] = (collegeCounts[collegeName] || 0) + 1;
        }
      });

      const mostActiveColleges = Object.entries(collegeCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }));

      // Generate daily activity for last 7 days
      const dailyActivity = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);

        let dayUsers = 0;
        try {
          const dayAttendanceQuery = query(
            collection(db, 'attendance'),
            where('joinedAt', '>=', date),
            where('joinedAt', '<', nextDate)
          );
          const dayAttendanceSnapshot = await getDocs(dayAttendanceQuery);
          dayUsers = new Set(dayAttendanceSnapshot.docs.map(doc => doc.data().uid)).size;
        } catch {}
        
        const daySessions = Object.values(sessionsData).filter((session: any) => {
          if (!session.time) return false;
          const sessionDate = new Date(session.time);
          return sessionDate >= date && sessionDate < nextDate;
        }).length;

        dailyActivity.push({
          date: date.toISOString().split('T')[0],
          users: dayUsers,
          sessions: daySessions
        });
      }

      setAnalytics({
        totalUsers,
        totalSessions,
        activeUsers,
        topSubjects,
        mostActiveColleges,
        dailyActivity
      });

    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReports = async () => {
    try {
      const snap = await getDocs(collection(db, 'reports'));
      const reportsData: Report[] = [];

      for (const d of snap.docs) {
        const data = d.data();
        let videoTitle = 'Unknown';
        let videoUploader = 'Unknown';
        let reporterName = 'Unknown';

        try {
          const videoDoc = await getDoc(doc(db, 'study_reels', data.video_id));
          if (videoDoc.exists()) {
            const vd = videoDoc.data();
            videoTitle = vd.topic || 'Untitled';
            videoUploader = vd.uploader_name || 'Unknown';
          }
        } catch {}

        try {
          const userDoc = await getDoc(doc(db, 'users', data.reported_by));
          if (userDoc.exists()) {
            reporterName = userDoc.data().name || 'Unknown';
          }
        } catch {}

        reportsData.push({
          id: d.id,
          video_id: data.video_id,
          reported_by: data.reported_by,
          reason: data.reason || 'inappropriate_content',
          status: data.status || 'pending',
          created_at: data.created_at,
          videoTitle,
          videoUploader,
          reporterName,
        });
      }

      reportsData.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (b.status === 'pending' && a.status !== 'pending') return 1;
        return 0;
      });

      setReports(reportsData);
    } catch (err) {
      console.error('Error loading reports:', err);
    }
  };

  const handleRemoveVideo = async (report: Report) => {
    if (!window.confirm(`Remove the short "${report.videoTitle}" and mark report as resolved?`)) return;
    try {
      await updateDoc(doc(db, 'study_reels', report.video_id), { status: 'removed' });
      await updateDoc(doc(db, 'reports', report.id), { status: 'resolved_removed' });
      setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'resolved_removed' } : r));
      toast({ title: 'Short removed', description: `"${report.videoTitle}" has been removed.` });
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to remove the short.' });
    }
  };

  const handleDismissReport = async (report: Report) => {
    if (!window.confirm('Dismiss this report? The short will remain visible.')) return;
    try {
      await updateDoc(doc(db, 'reports', report.id), { status: 'dismissed' });
      setReports(prev => prev.map(r => r.id === report.id ? { ...r, status: 'dismissed' } : r));
      toast({ title: 'Report dismissed' });
    } catch (err) {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to dismiss report.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gradient-soft p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load analytics data.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">StudyMatch Analytics & Insights</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <Card className="ios-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-primary">{analytics.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sessions</p>
                  <p className="text-3xl font-bold text-primary">{analytics.totalSessions}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-primary">{analytics.activeUsers}</p>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="ios-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                  <p className="text-3xl font-bold text-primary">
                    {analytics.totalUsers > 0 ? Math.round((analytics.activeUsers / analytics.totalUsers) * 100) : 0}%
                  </p>
                </div>
                <Award className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Subjects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="ios-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                  Top Subjects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.topSubjects.length > 0 ? (
                  analytics.topSubjects.map((subject, index) => (
                    <div key={subject.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{subject.name}</span>
                      </div>
                      <Badge variant="secondary">{subject.count} sessions</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No session data available</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Most Active Colleges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="ios-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                  Most Active Colleges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.mostActiveColleges.length > 0 ? (
                  analytics.mostActiveColleges.map((college, index) => (
                    <div key={college.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{college.name}</span>
                      </div>
                      <Badge variant="secondary">{college.count} sessions</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No college data available</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Daily Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="ios-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Daily Activity (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.dailyActivity.map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                    <div>
                      <p className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
                    </div>
                    <div className="flex space-x-4">
                      <Badge variant="outline">{day.users} users</Badge>
                      <Badge variant="outline">{day.sessions} sessions</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Reported Shorts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="ios-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Flag className="h-5 w-5 mr-2 text-destructive" />
                Reported Shorts
                {reports.filter(r => r.status === 'pending').length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {reports.filter(r => r.status === 'pending').length} pending
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reports.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No reports yet</p>
              ) : (
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div key={report.id} className={`p-3 rounded-lg border ${report.status === 'pending' ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-muted/30'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Video className="h-4 w-4 text-muted-foreground shrink-0" />
                            <p className="font-medium text-sm truncate">{report.videoTitle}</p>
                            <Badge variant={report.status === 'pending' ? 'destructive' : 'secondary'} className="text-[10px] shrink-0">
                              {report.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">Uploaded by: {report.videoUploader}</p>
                          <p className="text-xs text-muted-foreground">Reported by: {report.reporterName}</p>
                          <p className="text-xs text-muted-foreground">Reason: {report.reason.replace(/_/g, ' ')}</p>
                        </div>
                        {report.status === 'pending' && (
                          <div className="flex gap-1 shrink-0">
                            <Button size="sm" variant="destructive" onClick={() => handleRemoveVideo(report)} className="h-8 text-xs">
                              <Trash2 className="h-3 w-3 mr-1" /> Remove
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDismissReport(report)} className="h-8 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" /> Dismiss
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;