import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { ref, onValue, off, set, get, update as rtdbUpdate } from 'firebase/database';
import { db, rtdb } from '@/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Calendar, ExternalLink, Globe, Filter, Star, Lock, Clock, Users } from 'lucide-react';
import { LEGACY_LEVELS, LEGACY_SUBJECTS, College } from '@/types/index';
import BottomTabNavigation from '@/components/BottomTabNavigation';

import { useSessionRequests, createJoinRequest, acceptJoinRequest, rejectJoinRequest } from '@/hooks/useSessionRequests';
import SessionJoinRequests from '@/components/SessionJoinRequests';
import SessionExpiryTimer from '@/components/SessionExpiryTimer';

interface UserProfile {
  name: string;
  email: string;
  collegeId: string;
  programId?: string;
  level: string;
  subjects: string[];
  profileComplete: boolean;
  avgRating?: number;
  totalRatings?: number;
}

interface Session {
  id: string;
  hostId: string;
  hostName: string;
  hostRating?: number;
  collegeId: string;
  programId?: string;
  collegeName?: string;
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

const Explore = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [crossCollegeMode, setCrossCollegeMode] = useState(false);
  const [filters, setFilters] = useState({
    collegeId: 'all-colleges',
    level: 'all-levels',
    subject: 'all-subjects'
  });
  const [sortBy, setSortBy] = useState<'time' | 'participants' | 'created'>('time');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadColleges();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      loadSessions();
    }
  }, [profile, crossCollegeMode, filters, sortBy]);

  const loadProfile = async () => {
    if (!user) return;
    
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
      } else {
        navigate('/profile-setup');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: "Failed to load your profile information.",
      });
    }
  };

  const loadColleges = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'colleges'));
      const collegesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        programs: doc.data().programs || []
      }));
      setColleges(collegesData);
    } catch (error) {
      console.error('Error loading colleges:', error);
    }
  };

  const loadSessions = () => {
    if (!profile) return;

    const now = new Date();
    const sessionsRef = ref(rtdb, 'sessions');

    const unsubscribe = onValue(sessionsRef, async (snapshot) => {
      const sessionsList: Session[] = [];
      
      if (snapshot.exists()) {
        const sessionsData = snapshot.val();
        
        for (const [id, data] of Object.entries(sessionsData) as [string, any][]) {
          const sessionTime = new Date(data.time);
          
          // Only show future sessions
          if (sessionTime > now) {
            // Apply cross-college mode filter
            if (!crossCollegeMode && data.collegeId !== profile.collegeId) {
              continue;
            }
            
            // Apply additional filters
            if (filters.collegeId && filters.collegeId !== 'all-colleges' && data.collegeId !== filters.collegeId) continue;
            if (filters.level && filters.level !== 'all-levels' && data.level !== filters.level) continue;
            if (filters.subject && filters.subject !== 'all-subjects' && data.subject !== filters.subject) continue;
            
            try {
              // Get host info
              const hostDoc = await getDoc(doc(db, 'users', data.hostId));
              const hostData = hostDoc.exists() ? hostDoc.data() : null;
              const hostName = hostData?.name || 'Unknown User';
              const hostRating = hostData?.avgRating || undefined;

              // Get college name
              const collegeDoc = await getDoc(doc(db, 'colleges', data.collegeId));
              const collegeName = collegeDoc.exists() ? collegeDoc.data().name : 'Unknown College';
              
              const sessionTime = new Date(data.time);
              const expireAt = data.expireAt ? new Date(data.expireAt) : new Date(sessionTime.getTime() + 15 * 60 * 1000);
              
              const session: Session = {
                id,
                hostId: data.hostId,
                hostName,
                hostRating,
                collegeId: data.collegeId,
                collegeName,
                level: data.level,
                subject: data.subject,
                title: data.title,
                description: data.description,
                meetLink: data.meetLink,
                time: sessionTime,
                expireAt,
                createdAt: new Date(data.createdAt),
                maxParticipants: data.maxParticipants || 4,
                currentParticipants: data.currentParticipants || []
              };

              sessionsList.push(session);
            } catch (error) {
              console.error('Error fetching session details:', error);
            }
          }
        }
      }
      
      // Sort sessions
      sessionsList.sort((a, b) => {
        switch (sortBy) {
          case 'time':
            return a.time.getTime() - b.time.getTime();
          case 'created':
            return b.createdAt.getTime() - a.createdAt.getTime();
          default:
            return a.time.getTime() - b.time.getTime();
        }
      });

      setSessions(sessionsList);
      setLoading(false);
    }, (error) => {
      console.error('Error loading sessions:', error);
      setLoading(false);
    });

    return () => off(sessionsRef, 'value', unsubscribe);
  };

  const sessionIds = useMemo(() => sessions.map(s => s.id), [sessions]);
  const { requests, userRequests } = useSessionRequests(sessionIds);

  const handleInterested = async (session: Session) => {
    if (!user || !profile) return;
    try {
      await createJoinRequest(session.id, user.uid, profile.name);
      toast({ title: "Request sent!", description: "Waiting for the host to accept your request." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to send request." });
    }
  };

  const handleAcceptRequest = async (requestId: string, userId: string, session: Session) => {
    try {
      await acceptJoinRequest(requestId);
      const sessionRef = ref(rtdb, `sessions/${session.id}/currentParticipants`);
      const snapshot = await get(sessionRef);
      const participants = snapshot.val() || [];
      if (!participants.includes(userId)) {
        participants.push(userId);
        await rtdbUpdate(ref(rtdb, `sessions/${session.id}`), { currentParticipants: participants });
      }
      toast({ title: "Request accepted!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to accept request." });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await rejectJoinRequest(requestId);
      toast({ title: "Request rejected." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to reject request." });
    }
  };

  const handleJoinSession = async (session: Session) => {
    if (!user) return;
    try {
      const attendanceRef = ref(rtdb, `attendance/${session.id}/${user.uid}`);
      await set(attendanceRef, {
        sessionId: session.id,
        uid: user.uid,
        joinedAt: new Date().toISOString(),
        status: 'present'
      });
      window.open(session.meetLink, '_blank');
      toast({ title: "Joined session!", description: "Your attendance has been recorded." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error joining session", description: "Failed to record attendance." });
    }
  };

  const getButtonState = (session: Session) => {
    if (session.hostId === user?.uid) return 'host';
    const userStatus = userRequests.get(session.id);
    if (userStatus === 'accepted' || session.currentParticipants.includes(user?.uid || '')) return 'approved';
    if (userStatus === 'pending') return 'pending';
    if (userStatus === 'rejected') return 'rejected';
    if (session.currentParticipants.length >= session.maxParticipants) return 'full';
    return 'interested';
  };

  const clearFilters = () => {
    setFilters({ collegeId: 'all-colleges', level: 'all-levels', subject: 'all-subjects' });
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xs ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  // Get available subjects based on user's college and selected level
  const getAvailableSubjects = () => {
    if (!profile || !colleges.length) return LEGACY_SUBJECTS;
    
    const userCollege = colleges.find(c => c.id === profile.collegeId);
    if (!userCollege) return LEGACY_SUBJECTS;
    
    // If no level filter is selected, return all subjects from all levels
    if (!filters.level || filters.level === 'all-levels') {
      const allSubjects = new Set<string>();
      userCollege.programs.forEach(program => {
        program.levels.forEach(level => {
          level.subjects.forEach(subject => allSubjects.add(subject));
        });
      });
      return Array.from(allSubjects);
    }
    
    // Return subjects for the selected level
    const selectedLevel = filters.level;
    const subjects = new Set<string>();
    
    userCollege.programs.forEach(program => {
      const level = program.levels.find(l => l.name === selectedLevel);
      if (level) {
        level.subjects.forEach(subject => subjects.add(subject));
      }
    });
    
    return Array.from(subjects);
  };

  // Get available levels based on user's college
  const getAvailableLevels = () => {
    if (!profile || !colleges.length) return LEGACY_LEVELS;
    
    const userCollege = colleges.find(c => c.id === profile.collegeId);
    if (!userCollege) return LEGACY_LEVELS;
    
    const levels = new Set<string>();
    userCollege.programs.forEach(program => {
      program.levels.forEach(level => {
        levels.add(level.name);
      });
    });
    
    return Array.from(levels);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center pb-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading explore page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div>
            <h1 className="text-3xl font-bold">Explore Sessions</h1>
            <p className="text-muted-foreground">
              Discover study sessions {crossCollegeMode ? 'across all colleges' : 'from your college'}
            </p>
          </div>

          {/* Cross-College Toggle */}
          <Card className="ios-card border-0 shadow-soft">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <Label className="font-medium">Cross-College Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    {crossCollegeMode ? 'Showing sessions from all colleges' : 'Showing only your college sessions'}
                  </p>
                </div>
              </div>
              <Switch
                checked={crossCollegeMode}
                onCheckedChange={setCrossCollegeMode}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Sort */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="ios-card border-0 shadow-soft">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Filters & Sort</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* College Filter */}
                {crossCollegeMode && (
                  <div className="space-y-2">
                    <Label>College</Label>
                    <Select value={filters.collegeId} onValueChange={(value) => setFilters(prev => ({ ...prev, collegeId: value }))}>
                      <SelectTrigger className="ios-input">
                        <SelectValue placeholder="All colleges" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-colleges">All colleges</SelectItem>
                        {colleges.map((college) => (
                          <SelectItem key={college.id} value={college.id}>
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Level Filter */}
                <div className="space-y-2">
                  <Label>Level</Label>
                  <Select value={filters.level} onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger className="ios-input">
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-levels">All levels</SelectItem>
                      {getAvailableLevels().map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject Filter */}
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={filters.subject} onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}>
                    <SelectTrigger className="ios-input">
                      <SelectValue placeholder="All subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-subjects">All subjects</SelectItem>
                      {getAvailableSubjects().map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <Label>Sort by</Label>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'time' | 'participants' | 'created')}>
                    <SelectTrigger className="ios-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time">Upcoming soonest</SelectItem>
                      <SelectItem value="created">Recently created</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Clear Filters */}
              {(filters.collegeId && filters.collegeId !== 'all-colleges' || 
                filters.level && filters.level !== 'all-levels' || 
                filters.subject && filters.subject !== 'all-subjects') && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="ios-button"
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>


        {/* Sessions Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold">Study Sessions</h2>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="ios-card border-0 shadow-soft hover:shadow-lg transition-shadow">
                  {crossCollegeMode && (
                    <div className="bg-primary-light/50 px-4 py-2 border-b border-border">
                      <Badge variant="secondary" className="text-xs">
                        {session.collegeName}
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{session.subject}</Badge>
                          <SessionExpiryTimer sessionTime={session.time} expireAt={session.expireAt} />
                        </div>
                        <CardTitle className="text-xl">{session.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-2">
                        {(() => {
                          const state = getButtonState(session);
                          switch (state) {
                            case 'host':
                              return (
                                <Button size="sm" onClick={() => handleJoinSession(session)}
                                  className="ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground">
                                  <ExternalLink className="h-4 w-4 mr-1" /> Open Meet
                                </Button>
                              );
                            case 'approved':
                              return (
                                <Button size="sm" onClick={() => handleJoinSession(session)}
                                  className="ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground">
                                  <ExternalLink className="h-4 w-4 mr-1" /> Join
                                </Button>
                              );
                            case 'pending':
                              return (
                                <Button size="sm" disabled className="ios-button">
                                  <Clock className="h-4 w-4 mr-1" /> Request Pending
                                </Button>
                              );
                            case 'rejected':
                              return (
                                <Button size="sm" disabled variant="outline" className="ios-button text-destructive">
                                  <Lock className="h-4 w-4 mr-1" /> Request Rejected
                                </Button>
                              );
                            case 'full':
                              return (
                                <Button size="sm" disabled className="ios-button">
                                  <Users className="h-4 w-4 mr-1" /> Full
                                </Button>
                              );
                            default:
                              return (
                                <Button size="sm" onClick={() => handleInterested(session)}
                                  className="ios-button bg-primary hover:bg-primary/90 text-primary-foreground">
                                  Interested
                                </Button>
                              );
                          }
                        })()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {session.description && (
                      <p className="text-muted-foreground mb-3">{session.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span>Host: {session.hostName}</span>
                          {session.hostRating && (
                            <div className="flex items-center gap-1">
                              {renderStars(Math.round(session.hostRating))}
                              <span className="text-xs">({session.hostRating.toFixed(1)})</span>
                            </div>
                          )}
                        </div>
                        <span>•</span>
                        <span>{session.level}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {session.currentParticipants.length}/{session.maxParticipants}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDateTime(session.time)}
                      </div>
                    </div>

                    {/* Host: show join requests */}
                    {session.hostId === user?.uid && (
                      <SessionJoinRequests
                        requests={requests.get(session.id) || []}
                        onAccept={(reqId, userId) => handleAcceptRequest(reqId, userId, session)}
                        onReject={handleRejectRequest}
                        isHost={true}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Card className="ios-card border-0 shadow-soft max-w-md mx-auto">
                <CardContent className="pt-8 pb-6">
                  <div className="text-center space-y-4">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">No sessions found</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Try adjusting your filters or enable cross-college mode to see more sessions.
                      </p>
                      {!crossCollegeMode && (
                        <Button
                          onClick={() => setCrossCollegeMode(true)}
                          className="ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Enable Cross-College
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default Explore;