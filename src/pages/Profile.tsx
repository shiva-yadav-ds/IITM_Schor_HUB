import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User, GraduationCap, Star } from 'lucide-react';
import { College, Program, ProgramLevel } from '@/types/index';
import ConsistencyTracker from '@/components/ConsistencyTracker';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import BadgesSection from '@/components/BadgesSection';
import NotificationBell from '@/components/NotificationBell';

interface UserProfile {
  name: string;
  email: string;
  collegeId?: string;
  level?: string;
  subjects?: string[];
  profileComplete: boolean;
  avgRating?: number;
  totalRatings?: number;
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
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    collegeId: '',
    level: '',
    subjects: [] as string[]
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get available levels based on selected college
  const getAvailableLevels = () => {
    if (!formData.collegeId || !colleges.length) return ['Foundation', 'Intermediate', 'Advanced', 'Graduate'];
    
    const selectedCollege = colleges.find(c => c.id === formData.collegeId);
    if (!selectedCollege || !selectedCollege.programs) return ['Foundation', 'Intermediate', 'Advanced', 'Graduate'];
    
    const levels = new Set<string>();
    selectedCollege.programs.forEach(program => {
      program.levels.forEach(level => {
        levels.add(level.name);
      });
    });
    
    return Array.from(levels);
  };

  // Get available subjects based on selected college and level
  const getAvailableSubjects = () => {
    if (!formData.collegeId || !colleges.length) return ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'Economics'];
    
    const selectedCollege = colleges.find(c => c.id === formData.collegeId);
    if (!selectedCollege || !selectedCollege.programs) return ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'Economics'];
    
    // If no level is selected, return all subjects from all levels
    if (!formData.level) {
      const allSubjects = new Set<string>();
      selectedCollege.programs.forEach(program => {
        program.levels.forEach(level => {
          level.subjects.forEach(subject => allSubjects.add(subject));
        });
      });
      return Array.from(allSubjects);
    }
    
    // Return subjects for the selected level
    const subjects = new Set<string>();
    selectedCollege.programs.forEach(program => {
      const level = program.levels.find(l => l.name === formData.level);
      if (level) {
        level.subjects.forEach(subject => subjects.add(subject));
      }
    });
    
    return Array.from(subjects);
  };

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

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setProfile(data);
        setFormData({
          name: data.name,
          collegeId: data.collegeId || '',
          level: data.level || '',
          subjects: data.subjects || []
        });
        
        if (!data.profileComplete) {
          setEditing(true);
        }
      }
    } catch (error) {
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
        ...doc.data()
      })) as College[];
      setColleges(collegesData);
    } catch (error) {
      console.error('Error loading colleges:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...profile,
        ...formData,
        profileComplete: true,
      });
      
      setProfile(prev => prev ? { ...prev, ...formData, profileComplete: true } : null);
      setEditing(false);
      
      toast({
        title: "Profile updated!",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving profile",
        description: "Failed to save your profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
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

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleCollegeChange = (collegeId: string) => {
    setFormData(prev => ({
      ...prev,
      collegeId,
      level: '', // Reset level when college changes
      subjects: [] // Reset subjects when college changes
    }));
  };

  const handleLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      level,
      subjects: [] // Reset subjects when level changes
    }));
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl font-bold">StudyMatch</h1>
            <p className="text-muted-foreground">Your Profile</p>
          </div>
          <div className="flex items-center space-x-2">
            <NotificationBell />
            <Button
              variant="outline"
              onClick={handleLogout}
              className="ios-button"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="ios-card border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Personal Information</CardTitle>
              </div>
              {profile?.profileComplete && !editing && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="ml-auto ios-button"
                >
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="ios-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>College</Label>
                    <Select value={formData.collegeId} onValueChange={handleCollegeChange}>
                      <SelectTrigger className="ios-input">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map((college) => (
                          <SelectItem key={college.id} value={college.id}>
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Academic Level</Label>
                    <Select value={formData.level} onValueChange={handleLevelChange}>
                      <SelectTrigger className="ios-input">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableLevels().map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Subjects of Interest</Label>
                    <div className="flex flex-wrap gap-2">
                      {getAvailableSubjects().map((subject) => (
                        <Badge
                          key={subject}
                          variant={formData.subjects.includes(subject) ? "default" : "outline"}
                          className="cursor-pointer ios-button"
                          onClick={() => toggleSubject(subject)}
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button 
                      onClick={handleSave} 
                      disabled={loading}
                      className="flex-1 ios-button bg-gradient-primary hover:opacity-90"
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </Button>
                    {profile?.profileComplete && (
                      <Button 
                        variant="outline" 
                        onClick={() => setEditing(false)}
                        className="ios-button"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <div className="flex items-center gap-3">
                      <p className="text-lg">{profile?.name}</p>
                      {profile?.avgRating && profile?.totalRatings && (
                        <div className="flex items-center gap-2">
                          {renderStars(Math.round(profile.avgRating))}
                          <span className="text-sm text-muted-foreground">
                            {profile.avgRating.toFixed(1)} ({profile.totalRatings} rating{profile.totalRatings !== 1 ? 's' : ''})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-muted-foreground">{profile?.email}</p>
                  </div>
                  {profile?.collegeId && (
                    <div>
                      <Label className="text-sm font-medium">College</Label>
                      <p>{colleges.find(c => c.id === profile.collegeId)?.name || profile.collegeId}</p>
                    </div>
                  )}
                  {profile?.level && (
                    <div>
                      <Label className="text-sm font-medium">Level</Label>
                      <p>{profile.level}</p>
                    </div>
                  )}
                  {profile?.subjects && profile.subjects.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Subjects</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {profile.subjects.map((subject) => (
                          <Badge key={subject} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {profile?.profileComplete && !editing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Card className="ios-card border-0 shadow-soft bg-primary-light/30 max-w-md mx-auto">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Ready to study?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find study sessions and connect with your peers in the main feed.
                </p>
                <Link to="/feed">
                  <Button className="w-full ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground">
                    Go to Study Feed
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {!profile?.profileComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="ios-card border-0 shadow-soft border-primary/20 bg-primary-light/50">
              <CardContent className="flex items-center space-x-3 pt-6">
                <GraduationCap className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg">Complete Your Profile</CardTitle>
                  <CardDescription>
                    Add your college and subjects to start finding study partners!
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <ConsistencyTracker />

        <BadgesSection />

      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default Profile;