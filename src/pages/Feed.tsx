import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc, addDoc, collection, query, where, getDocs, updateDoc, deleteDoc, Timestamp, onSnapshot as firestoreOnSnapshot } from 'firebase/firestore';
import { ref, onValue, off, set, update, remove } from 'firebase/database';
import { db, rtdb } from '@/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useGamification } from '@/hooks/useGamification';
import { Plus, Calendar, User, LogOut, BookOpen, Users } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import ReminderBanner from '@/components/ReminderBanner';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import SessionCard from '@/components/SessionCard';
import PullToRefresh from '@/components/PullToRefresh';

interface UserProfile {
  name: string;
  email: string;
  collegeId: string;
  level: string;
  subjects: string[];
  profileComplete: boolean;
}

interface Session {
  id: string;
  hostId: string;
  hostName: string;
  collegeId: string;
  level: string;
  subject: string;
  title: string;
  description?: string;
  meetLink: string;
  time: Date;
  expireAt: Date;
  createdAt: Date;
  maxParticipants: number;
  currentParticipants: string[];
}

interface JoinRequest {
  id: string;
  sessionId: string;
  fromUserId: string;
  fromUserName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const Feed = () => {
  const handlePullRefresh = useCallback(async () => {
    // Small delay to simulate refresh
    await new Promise(resolve => setTimeout(resolve, 800));
    window.location.reload();
  }, []);
  const { user, loading: authLoading } = useAuth();
  const { onSessionJoined } = useGamification();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<any[]>([]);
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [sessionRequests, setSessionRequests] = useState<Map<string, JoinRequest[]>>(new Map());
  const [userRequestStatus, setUserRequestStatus] = useState<Map<string, string>>(new Map());
  const navigate = useNavigate();
  const { toast } = useToast();

  // Separate sessions into "My Sessions" and "Available Sessions"
  const { mySessions, availableSessions } = useMemo(() => {
    if (!user) return { mySessions: [], availableSessions: [] };
    
    const my: Session[] = [];
    const available: Session[] = [];
    
    sessions.forEach(session => {
      if (session.hostId === user.uid) {
        my.push(session);
      } else {
        available.push(session);
      }
    });
    
    // Sort both by time ascending
    my.sort((a, b) => a.time.getTime() - b.time.getTime());
    available.sort((a, b) => a.time.getTime() - b.time.getTime());
    
    return { mySessions: my, availableSessions: available };
  }, [sessions, user]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    
    let cleanupSessions: (() => void) | undefined;
    let cleanupUpcoming: (() => void) | undefined;
    let cleanupRequests: (() => void) | undefined;

    const init = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const profileData = docSnap.data() as UserProfile;
          setProfile(profileData);
          
          if (!profileData.profileComplete) {
            navigate('/profile-setup');
            return;
          }
          
          cleanupSessions = loadSessions(profileData);
          cleanupUpcoming = checkUpcomingSessions(profileData);
          cleanupRequests = loadJoinRequests();
        } else {
          navigate('/profile-setup');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: "Failed to load your profile information.",
        });
      }
    };

    init();

    return () => {
      cleanupSessions?.();
      cleanupUpcoming?.();
      cleanupRequests?.();
    };
  }, [user]);

  // loadProfile is now inlined in the useEffect above

  const cleanupJoinRequests = async (sessionId: string) => {
    try {
      const q = query(collection(db, 'sessionJoinRequests'), where('sessionId', '==', sessionId));
      const snapshot = await getDocs(q);
      const deletePromises = snapshot.docs.map(docSnap => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
    } catch (err) {
      console.error('Error cleaning up join requests for session:', sessionId, err);
    }
  };

  const loadSessions = (userProfile: UserProfile) => {
    const sessionsRef = ref(rtdb, 'sessions');

    const unsubscribe = onValue(sessionsRef, async (snapshot) => {
      try {
        const hostIds = new Set<string>();
        const futureSessions: { id: string; data: any; sessionTime: Date }[] = [];
        const now = new Date();
        
        if (snapshot.exists()) {
          const sessionsData = snapshot.val();
          
          Object.entries(sessionsData).forEach(([id, data]: [string, any]) => {
            const expireAt = data.expireAt ? new Date(data.expireAt) : new Date(new Date(data.time).getTime() + 15 * 60 * 1000);
            
            // Auto-delete expired sessions (host only)
            if (expireAt <= now) {
              if (data.hostId === user?.uid) {
                remove(ref(rtdb, `sessions/${id}`)).catch(err => 
                  console.error('Error deleting expired session:', err)
                );
                cleanupJoinRequests(id);
              }
              return;
            }

            const sessionTime = new Date(data.time);
            const isMySession = data.hostId === user?.uid;
            
            // My own sessions always show; others must match college + level + subject
            if (isMySession) {
              futureSessions.push({ id, data, sessionTime });
              hostIds.add(data.hostId);
            } else {
              const matchesCollege = data.collegeId === userProfile.collegeId;
              const matchesLevel = data.level === userProfile.level;
              const matchesSubject = userProfile.subjects.includes(data.subject);
              
              if (matchesCollege && matchesLevel && matchesSubject) {
                futureSessions.push({ id, data, sessionTime });
                hostIds.add(data.hostId);
              }
            }
          });
        }

        const mapSessionData = (id: string, data: any, sessionTime: Date, hostName: string): Session => ({
          id,
          hostId: data.hostId,
          hostName,
          collegeId: data.collegeId,
          level: data.level,
          subject: data.subject,
          title: data.title,
          description: data.description,
          meetLink: data.meetLink,
          time: sessionTime,
          expireAt: data.expireAt ? new Date(data.expireAt) : new Date(sessionTime.getTime() + 15 * 60 * 1000),
          createdAt: new Date(data.createdAt),
          maxParticipants: data.maxParticipants || 4,
          currentParticipants: data.currentParticipants || [data.hostId]
        });

        // Show immediately with placeholder names
        const tempSessions = futureSessions.map(({ id, data, sessionTime }) => 
          mapSessionData(id, data, sessionTime, 'Loading...')
        );
        tempSessions.sort((a, b) => a.time.getTime() - b.time.getTime());
        setSessions(tempSessions);
        setLoading(false);

        // Resolve host names in background
        if (hostIds.size > 0) {
          const hostPromises = Array.from(hostIds).map(hostId => 
            getDoc(doc(db, 'users', hostId))
          );
          const hostDocs = await Promise.all(hostPromises);
          
          const hostNamesMap = new Map<string, string>();
          hostDocs.forEach((hostDoc, index) => {
            const hostId = Array.from(hostIds)[index];
            hostNamesMap.set(hostId, hostDoc.exists() ? hostDoc.data().name : 'Unknown User');
          });

          const finalSessions = futureSessions.map(({ id, data, sessionTime }) => 
            mapSessionData(id, data, sessionTime, hostNamesMap.get(data.hostId) || 'Unknown User')
          );
          finalSessions.sort((a, b) => a.time.getTime() - b.time.getTime());
          setSessions(finalSessions);
        }
      } catch (error) {
        console.error('Error loading sessions:', error);
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Error loading sessions",
          description: "Failed to load study sessions. Please try again.",
        });
      }
    }, (error) => {
      console.error('Sessions listener error:', error);
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Connection error",
        description: "Lost connection to sessions. Please refresh.",
      });
    });

    return () => off(sessionsRef, 'value', unsubscribe);
  };

  const loadJoinRequests = () => {
    if (!user) return;

    const requestsRef = collection(db, 'sessionJoinRequests');
    const q = query(requestsRef);
    
    const unsubscribe = firestoreOnSnapshot(q, async (querySnapshot) => {
      try {
        const requestsMap = new Map<string, JoinRequest[]>();
        const userStatusMap = new Map<string, string>();
        const userIds = new Set<string>();

        querySnapshot.forEach((docSnap) => {
          userIds.add(docSnap.data().fromUserId);
        });

        // Fetch all user names in parallel
        const userNames = new Map<string, string>();
        if (userIds.size > 0) {
          const userPromises = Array.from(userIds).map(async (userId) => {
            try {
              const userDoc = await getDoc(doc(db, 'users', userId));
              return { userId, name: userDoc.exists() ? userDoc.data().name : 'Unknown User' };
            } catch {
              return { userId, name: 'Unknown User' };
            }
          });
          const users = await Promise.all(userPromises);
          users.forEach(({ userId, name }) => userNames.set(userId, name));
        }

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const request: JoinRequest = {
            id: docSnap.id,
            sessionId: data.sessionId,
            fromUserId: data.fromUserId,
            fromUserName: data.fromUserName || userNames.get(data.fromUserId) || 'Unknown User',
            status: data.status,
            createdAt: data.createdAt?.toDate() || new Date()
          };

          const sessionRequests = requestsMap.get(data.sessionId) || [];
          sessionRequests.push(request);
          requestsMap.set(data.sessionId, sessionRequests);

          if (data.fromUserId === user.uid) {
            userStatusMap.set(data.sessionId, data.status);
          }
        });

        setSessionRequests(requestsMap);
        setUserRequestStatus(userStatusMap);
      } catch (error) {
        console.error('Error processing join requests:', error);
      }
    }, (error) => {
      console.error('Join requests listener error:', error);
    });

    return () => unsubscribe();
  };

  const checkUpcomingSessions = (userProfile: UserProfile) => {
    const sessionsRef = ref(rtdb, 'sessions');

    const unsubscribe = onValue(sessionsRef, (snapshot) => {
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
      const upcomingList: any[] = [];
      
      if (snapshot.exists()) {
        Object.entries(snapshot.val()).forEach(([id, data]: [string, any]) => {
          const sessionTime = new Date(data.time);
          const expireAt = data.expireAt ? new Date(data.expireAt) : new Date(sessionTime.getTime() + 15 * 60 * 1000);
          
          if (expireAt <= now) return;
          
          const matchesCollege = data.collegeId === userProfile.collegeId;
          const matchesLevel = data.level === userProfile.level;
          const matchesSubject = userProfile.subjects.includes(data.subject);
          
          if (sessionTime > now && sessionTime <= oneHourFromNow && 
              matchesCollege && matchesLevel && matchesSubject) {
            upcomingList.push({
              id,
              subject: data.subject,
              title: data.title,
              time: sessionTime,
              meetLink: data.meetLink
            });
          }
        });
      }
      
      setUpcomingSessions(upcomingList);
    });

    return () => off(sessionsRef, 'value', unsubscribe);
  };

  const handleSendJoinRequest = async (session: Session) => {
    if (!user || !profile) return;

    try {
      if (userRequestStatus.has(session.id)) {
        toast({
          title: "Request already sent",
          description: "You've already sent a join request for this session.",
        });
        return;
      }

      await addDoc(collection(db, 'sessionJoinRequests'), {
        sessionId: session.id,
        fromUserId: user.uid,
        fromUserName: profile.name,
        status: 'pending',
        createdAt: Timestamp.now()
      });

      toast({
        title: "Request sent!",
        description: "The host will review your join request.",
      });
    } catch (error) {
      console.error('Error sending join request:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send join request. Please try again.",
      });
    }
  };

  const handleAcceptRequest = async (requestId: string, userId: string, sessionId: string) => {
    try {
      const currentSession = sessions.find(s => s.id === sessionId);
      if (!currentSession) {
        toast({ variant: "destructive", title: "Error", description: "Session not found." });
        return;
      }

      if (currentSession.currentParticipants.length >= currentSession.maxParticipants) {
        toast({ variant: "destructive", title: "Session full", description: "Cannot accept — session is at capacity." });
        return;
      }

      if (currentSession.currentParticipants.includes(userId)) {
        toast({ title: "Already added", description: "This user is already a participant." });
        return;
      }

      await updateDoc(doc(db, 'sessionJoinRequests', requestId), {
        status: 'accepted',
        acceptedAt: Timestamp.now()
      });

      await update(ref(rtdb, `sessions/${sessionId}`), {
        currentParticipants: [...currentSession.currentParticipants, userId]
      });

      toast({
        title: "Request accepted!",
        description: "User has been added to the session.",
      });
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to accept request. Please try again.",
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await updateDoc(doc(db, 'sessionJoinRequests', requestId), {
        status: 'rejected',
        rejectedAt: Timestamp.now()
      });

      toast({
        title: "Request rejected",
        description: "The join request has been rejected.",
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reject request. Please try again.",
      });
    }
  };

  const handleJoinSession = async (session: Session) => {
    if (!user || !profile) return;

    try {
      const attendanceRef = ref(rtdb, `attendance/${session.id}/${user.uid}`);
      await set(attendanceRef, {
        sessionId: session.id,
        uid: user.uid,
        joinedAt: new Date().toISOString(),
        status: 'present'
      });

      await addDoc(collection(db, 'attendance'), {
        sessionId: session.id,
        uid: user.uid,
        joinedAt: Timestamp.now(),
        status: 'present'
      });

      const isFromDifferentCollege = session.collegeId !== profile.collegeId;
      await onSessionJoined(isFromDifferentCollege);

      window.open(session.meetLink, '_blank');

      toast({
        title: "Joined session!",
        description: `Attendance recorded. You earned 3 points!${isFromDifferentCollege ? ' Cross-college bonus!' : ''}`,
      });
    } catch (error) {
      console.error('Error recording attendance:', error);
      toast({
        variant: "destructive",
        title: "Error joining session",
        description: "Failed to record your attendance. Please try again.",
      });
    }
  };

  const canUserJoin = (session: Session): boolean => {
    if (!user) return false;
    if (session.hostId === user.uid) return true;
    return session.currentParticipants.includes(user.uid);
  };

  const getButtonState = (session: Session) => {
    if (!user) return { label: 'Login', disabled: true, tooltip: 'Please login' };

    const isHost = session.hostId === user.uid;
    const isFull = session.currentParticipants.length >= session.maxParticipants;
    const canJoin = canUserJoin(session);
    const requestStatus = userRequestStatus.get(session.id);

    if (isHost) return { label: 'Join (Host)', disabled: false, tooltip: '' };
    if (canJoin || requestStatus === 'accepted') return { label: 'Join', disabled: false, tooltip: '' };
    if (requestStatus === 'pending') return { label: 'Request Pending', disabled: true, tooltip: 'Waiting for host approval' };
    if (requestStatus === 'rejected') return { label: 'Request Rejected', disabled: true, tooltip: 'Your request was rejected' };
    if (isFull) return { label: 'Full', disabled: true, tooltip: 'This session is full' };
    return { label: 'Interested', disabled: false, tooltip: '' };
  };

  const handleButtonClick = (session: Session) => {
    const state = getButtonState(session);
    if (state.label === 'Interested') {
      handleSendJoinRequest(session);
    } else if (!state.disabled) {
      handleJoinSession(session);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (!user) return;
    if (!window.confirm('Are you sure you want to delete this session? This cannot be undone.')) return;
    try {
      await remove(ref(rtdb, `sessions/${sessionId}`));
      await cleanupJoinRequests(sessionId);
      toast({ title: 'Session deleted', description: 'Your session has been removed.' });
    } catch (error) {
      console.error('Error deleting session:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete session.' });
    }
  };

  const handleDismissReminder = (sessionId: string) => {
    setDismissedReminders(prev => new Set([...prev, sessionId]));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading your feed...</p>
        </div>
      </div>
    );
  }

  const pendingRequestCount = mySessions.reduce((count, session) => {
    const reqs = sessionRequests.get(session.id) || [];
    return count + reqs.filter(r => r.status === 'pending').length;
  }, 0);


  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <PullToRefresh onRefresh={handlePullRefresh}>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold">StudyMatch</h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.name}!
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/profile">
              <Button variant="outline" className="ios-button">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="ios-button">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Reminders */}
        <ReminderBanner 
          upcomingSessions={upcomingSessions}
          onDismiss={handleDismissReminder}
          dismissedSessions={dismissedReminders}
        />

        {/* Create Session Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/create-session">
            <Button className="w-full h-12 ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground">
              <Plus className="h-5 w-5 mr-2" />
              Create New Study Session
            </Button>
          </Link>
        </motion.div>

        {/* ===== MY SESSIONS SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">My Sessions</h2>
            {pendingRequestCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
                {pendingRequestCount}
              </span>
            )}
          </div>

          {mySessions.length > 0 ? (
            <div className="space-y-3">
              {mySessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  buttonState={getButtonState(session)}
                  onButtonClick={() => handleButtonClick(session)}
                  requests={sessionRequests.get(session.id) || []}
                  onAcceptRequest={(requestId, userId) => handleAcceptRequest(requestId, userId, session.id)}
                  onRejectRequest={handleRejectRequest}
                  isHost={true}
                  canJoin={true}
                  onDelete={handleDeleteSession}
                />
              ))}
            </div>
          ) : (
            <Card className="ios-card border-0 shadow-soft">
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground text-sm">
                  You haven't created any sessions yet.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* ===== AVAILABLE SESSIONS SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Available Sessions</h2>
            <span className="text-sm text-muted-foreground">
              (matching your subjects)
            </span>
          </div>

          {availableSessions.length > 0 ? (
            <div className="space-y-3">
              {availableSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  buttonState={getButtonState(session)}
                  onButtonClick={() => handleButtonClick(session)}
                  requests={sessionRequests.get(session.id) || []}
                  onAcceptRequest={(requestId, userId) => handleAcceptRequest(requestId, userId, session.id)}
                  onRejectRequest={handleRejectRequest}
                  isHost={false}
                  canJoin={canUserJoin(session)}
                />
              ))}
            </div>
          ) : (
            <Card className="ios-card border-0 shadow-soft">
              <CardContent className="py-8 text-center space-y-3">
                <Calendar className="h-10 w-10 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="font-semibold mb-1">No sessions available</h3>
                  <p className="text-muted-foreground text-sm">
                    No one has created a session for your subjects yet. Be the first!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
      </PullToRefresh>
      <BottomTabNavigation />
    </div>
  );
};

export default Feed;
