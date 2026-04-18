import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { ref, push, set } from 'firebase/database';
import { db, rtdb } from '@/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useGamification } from '@/hooks/useGamification';
import { ArrowLeft, Calendar, Video } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  collegeId: string;
  level: string;
  subjects: string[];
  profileComplete: boolean;
}

const CreateSession = () => {
  const { user } = useAuth();
  const { onSessionCreated } = useGamification();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    title: '',
    description: '',
    meetLink: '',
    dateTime: '',
    maxParticipants: 2
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      loadProfile();
    }
  }, [user, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !profile || !formData.subject || !formData.title || !formData.meetLink || !formData.dateTime) {
      toast({
        variant: "destructive",
        title: "Please fill all required fields",
        description: "All fields except description are required.",
      });
      return;
    }

    const sessionDateTime = new Date(formData.dateTime);
    if (sessionDateTime <= new Date()) {
      toast({
        variant: "destructive",
        title: "Invalid date and time",
        description: "Please select a future date and time for your session.",
      });
      return;
    }

    setLoading(true);
    try {
      const sessionsRef = ref(rtdb, 'sessions');
      const newSessionRef = push(sessionsRef);
      
      // Calculate expireAt = meetingTime + 15 minutes
      const expireAt = new Date(sessionDateTime.getTime() + 15 * 60 * 1000);
      
      await set(newSessionRef, {
        hostId: user.uid,
        collegeId: profile.collegeId,
        level: profile.level,
        subject: formData.subject,
        title: formData.title,
        description: formData.description,
        meetLink: formData.meetLink,
        time: sessionDateTime.toISOString(),
        expireAt: expireAt.toISOString(),
        createdAt: new Date().toISOString(),
        maxParticipants: formData.maxParticipants,
        currentParticipants: [user.uid] // Host is auto-added
      });

      // Award points and check for badges
      await onSessionCreated();

      toast({
        title: "Session created!",
        description: "Your study session has been created successfully. You earned 5 points!",
      });

      navigate('/feed');
    } catch (error) {
      console.error('Error creating session:', error);
      toast({
        variant: "destructive",
        title: "Error creating session",
        description: "Failed to create your study session. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateMeetLink = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    setFormData(prev => ({
      ...prev,
      meetLink: `https://meet.google.com/${randomId}`
    }));
  };

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/feed')}
              className="ios-button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feed
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Create Study Session</h1>
              <p className="text-muted-foreground">Set up a new study session for your peers</p>
            </div>
          </div>

          {/* Form */}
          <Card className="ios-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Session Details
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="ios-input h-12">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {profile.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Session Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="ios-input h-12"
                    placeholder="e.g., Linear Algebra Problem Solving"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="ios-input min-h-24 resize-none"
                    placeholder="Describe what you'll be studying or working on..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateTime">Date & Time *</Label>
                  <Input
                    id="dateTime"
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, dateTime: e.target.value }))}
                    className="ios-input h-12"
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maximum Participants *</Label>
                  <Select 
                    value={formData.maxParticipants.toString()} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(value) }))}
                  >
                    <SelectTrigger className="ios-input h-12">
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 participants (You + 1)</SelectItem>
                      <SelectItem value="3">3 participants (You + 2)</SelectItem>
                      <SelectItem value="4">4 participants (You + 3)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Choose how many people can join your session (including you)
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="meetLink">Google Meet Link *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="meetLink"
                      value={formData.meetLink}
                      onChange={(e) => setFormData(prev => ({ ...prev, meetLink: e.target.value }))}
                      className="ios-input h-12 flex-1"
                      placeholder="https://meet.google.com/..."
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateMeetLink}
                      className="ios-button h-12 px-4"
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click the video icon to generate a sample Google Meet link
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground"
                  >
                    {loading ? 'Creating Session...' : 'Create Session'}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateSession;