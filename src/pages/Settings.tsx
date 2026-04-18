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
import { LogOut, User, GraduationCap, Star, Settings as SettingsIcon, Shield, HelpCircle, ChevronDown, ChevronUp, AlertTriangle, LayoutDashboard } from 'lucide-react';
import { College } from '@/types/index';
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

const FAQ_ITEMS = [
  {
    q: 'What is StudyMatch?',
    a: 'StudyMatch is a study platform where you can create study sessions with students from your college, share educational shorts, and learn from each other.',
  },
  {
    q: 'What can I upload in Shorts?',
    a: 'Only study-related YouTube Shorts (max 1 minute). You must upload your own original content only. Copying and uploading someone else\'s content is not allowed.',
  },
  {
    q: 'How is ranking decided?',
    a: 'Ranking is based on the number of sessions you create/join and the shorts you upload. More sessions and shorts = higher rank.',
  },
  {
    q: 'What happens if someone breaks the rules?',
    a: 'First offense: Warning. Second offense: Temporary ban. Third offense: Permanent ban. Uploading inappropriate content or someone else\'s work can result in an immediate ban.',
  },
  {
    q: 'Can I study with students from other colleges?',
    a: 'Currently, the leaderboard and feed are limited to students within your college. Cross-college sessions may be available in the future.',
  },
  {
    q: 'How do I edit my profile?',
    a: 'Go to Settings > Profile section, click the Edit button, and update your details.',
  },
];

const RULES = [
  { icon: '📚', rule: 'Only upload study-related content. Entertainment, memes, or irrelevant content is not allowed.' },
  { icon: '🎥', rule: 'Only upload your own original content in Shorts. Copying and re-uploading someone else\'s video is strictly prohibited.' },
  { icon: '🚫', rule: 'Posting inappropriate, offensive, or hateful content is a direct reason for a ban.' },
  { icon: '🤝', rule: 'Be respectful in study sessions. Harassment or bullying falls under our zero tolerance policy.' },
  { icon: '⚠️', rule: 'Creating fake accounts or spamming is not allowed.' },
  { icon: '🔒', rule: 'Do not publicly share your personal information (phone number, address, etc.).' },
  { icon: '📋', rule: 'First rule break → Warning. Second → Temporary ban. Third → Permanent ban.' },
];

const Settings = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'rules' | 'faq'>('profile');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    collegeId: '',
    level: '',
    subjects: [] as string[]
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const getAvailableLevels = () => {
    if (!formData.collegeId || !colleges.length) return ['Foundation', 'Intermediate', 'Advanced', 'Graduate'];
    const selectedCollege = colleges.find(c => c.id === formData.collegeId);
    if (!selectedCollege || !selectedCollege.programs) return ['Foundation', 'Intermediate', 'Advanced', 'Graduate'];
    const levels = new Set<string>();
    selectedCollege.programs.forEach(program => {
      program.levels.forEach(level => levels.add(level.name));
    });
    return Array.from(levels);
  };

  const getAvailableSubjects = () => {
    if (!formData.collegeId || !colleges.length) return ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'Economics'];
    const selectedCollege = colleges.find(c => c.id === formData.collegeId);
    if (!selectedCollege || !selectedCollege.programs) return ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'Economics'];
    if (!formData.level) {
      const allSubjects = new Set<string>();
      selectedCollege.programs.forEach(program => {
        program.levels.forEach(level => {
          level.subjects.forEach(subject => allSubjects.add(subject));
        });
      });
      return Array.from(allSubjects);
    }
    const subjects = new Set<string>();
    selectedCollege.programs.forEach(program => {
      const level = program.levels.find(l => l.name === formData.level);
      if (level) level.subjects.forEach(subject => subjects.add(subject));
    });
    return Array.from(subjects);
  };

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) { loadProfile(); loadColleges(); }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    try {
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setProfile(data);
        setFormData({ name: data.name, collegeId: data.collegeId || '', level: data.level || '', subjects: data.subjects || [] });
        if (!data.profileComplete) setEditing(true);
      }
    } catch {
      toast({ variant: "destructive", title: "Error loading profile" });
    }
  };

  const loadColleges = async () => {
    try {
      const snap = await getDocs(collection(db, 'colleges'));
      setColleges(snap.docs.map(d => ({ id: d.id, ...d.data() })) as College[]);
    } catch (e) { console.error(e); }
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), { ...formData, profileComplete: true }, { merge: true });
      setProfile(prev => prev ? { ...prev, ...formData, profileComplete: true } : null);
      setEditing(false);
      toast({ title: "Profile updated!", description: "Your profile has been saved." });
    } catch {
      toast({ variant: "destructive", title: "Error saving profile" });
    } finally { setLoading(false); }
  };

  const handleLogout = async () => {
    try { await signOut(auth); navigate('/login'); }
    catch { toast({ variant: "destructive", title: "Error signing out" }); }
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject) ? prev.subjects.filter(s => s !== subject) : [...prev.subjects, subject]
    }));
  };

  const handleCollegeChange = (collegeId: string) => {
    setFormData(prev => ({ ...prev, collegeId, level: '', subjects: [] }));
  };

  const handleLevelChange = (level: string) => {
    setFormData(prev => ({ ...prev, level, subjects: [] }));
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`h-4 w-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground/30'}`} />
      ))}
    </div>
  );

  const sectionButtons = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'rules' as const, label: 'Rules & Guidelines', icon: Shield },
    { id: 'faq' as const, label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Section Tabs */}
        <div className="flex gap-2">
          {sectionButtons.map(s => (
            <Button
              key={s.id}
              variant={activeSection === s.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection(s.id)}
              className="flex-1 text-xs"
            >
              <s.icon className="h-3.5 w-3.5 mr-1" /> {s.label}
            </Button>
          ))}
        </div>

        {/* Profile Section */}
        {activeSection === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle>Personal Information</CardTitle>
                </div>
                {profile?.profileComplete && !editing && (
                  <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="ml-auto">Edit</Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {editing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                    </div>
                    <div className="space-y-2">
                      <Label>College</Label>
                      <Select value={formData.collegeId} onValueChange={handleCollegeChange}>
                        <SelectTrigger><SelectValue placeholder="Select your college" /></SelectTrigger>
                        <SelectContent>
                          {colleges.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Academic Level</Label>
                      <Select value={formData.level} onValueChange={handleLevelChange}>
                        <SelectTrigger><SelectValue placeholder="Select your level" /></SelectTrigger>
                        <SelectContent>
                          {getAvailableLevels().map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Subjects of Interest</Label>
                      <div className="flex flex-wrap gap-2">
                        {getAvailableSubjects().map((subject) => (
                          <Badge key={subject} variant={formData.subjects.includes(subject) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleSubject(subject)}>
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={handleSave} disabled={loading} className="flex-1">{loading ? 'Saving...' : 'Save Profile'}</Button>
                      {profile?.profileComplete && <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{profile?.name}</p>
                        {profile?.avgRating && profile?.totalRatings && (
                          <div className="flex items-center gap-1">
                            {renderStars(Math.round(profile.avgRating))}
                            <span className="text-xs text-muted-foreground">{profile.avgRating.toFixed(1)} ({profile.totalRatings})</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    </div>
                    {profile?.collegeId && (
                      <div>
                        <Label className="text-xs text-muted-foreground">College</Label>
                        <p className="text-sm">{colleges.find(c => c.id === profile.collegeId)?.name || profile.collegeId}</p>
                      </div>
                    )}
                    {profile?.level && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Level</Label>
                        <p className="text-sm">{profile.level}</p>
                      </div>
                    )}
                    {profile?.subjects && profile.subjects.length > 0 && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Subjects</Label>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {profile.subjects.map((s) => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {!profile?.profileComplete && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex items-center gap-3 pt-6">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Complete Your Profile</CardTitle>
                    <CardDescription>Add your college and subjects to start finding study partners!</CardDescription>
                  </div>
                </CardContent>
              </Card>
            )}

            <ConsistencyTracker />
            <BadgesSection />
          </motion.div>
        )}

        {/* Rules Section */}
        {activeSection === 'rules' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Community Rules & Guidelines</CardTitle>
                </div>
                <CardDescription>Please follow these rules to keep StudyMatch safe and productive for everyone.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {RULES.map((r, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-lg shrink-0">{r.icon}</span>
                    <p className="text-sm text-foreground">{r.rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="flex items-start gap-3 pt-6">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-destructive">Warning</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Violating rules will result in a warning first, then a temporary ban, and finally a permanent ban. Uploading inappropriate content or someone else's work is grounds for an immediate ban.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {FAQ_ITEMS.map((item, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-foreground">{item.q}</span>
                      {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                    </button>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-3 pb-3">
                        <p className="text-sm text-muted-foreground">{item.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Admin Link - only for admin */}
        {user?.email === 'yaduvanshishubha678@gmail.com' && (
          <div className="pt-2">
            <Link to="/admin">
              <Button variant="outline" className="w-full border-primary/30 text-primary">
                <LayoutDashboard className="h-4 w-4 mr-2" /> Admin Dashboard
              </Button>
            </Link>
          </div>
        )}

        {/* Support & Links */}
        <div className="text-center pt-4 pb-2 space-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Need help or want to report an issue?</p>
            <a href="mailto:studymatchsupport@gmail.com" className="text-sm font-medium text-primary hover:underline">
              studymatchsupport@gmail.com
            </a>
          </div>
          <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary underline block">
            Terms of Service & Privacy Policy
          </Link>
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default Settings;
