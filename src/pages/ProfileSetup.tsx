import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap } from 'lucide-react';
import { College, Program, ProgramLevel } from '@/types/index';

const ProfileSetup = () => {
  const { user } = useAuth();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    collegeId: '',
    programId: '',
    level: '',
    subjects: [] as string[]
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Derived data based on selections
  const selectedCollege = colleges.find(c => c.id === formData.collegeId);
  const selectedProgram = selectedCollege?.programs.find(p => p.id === formData.programId);
  const selectedLevel = selectedProgram?.levels.find(l => l.id === formData.level);
  const availableSubjects = selectedLevel?.subjects || [];


  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      // Wait a bit for seeding to complete before loading colleges
      setTimeout(() => {
        loadColleges();
      }, 1000);
    }
  }, [user, navigate]);

  const loadColleges = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'colleges'));
      
      const collegesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          programs: data.programs || []
        };
      }) as College[];
      
      setColleges(collegesData);
      
      // If no colleges were loaded, try again after a delay
      if (collegesData.length === 0) {
        setTimeout(() => {
          loadColleges();
        }, 2000);
      }
    } catch (error) {
      console.error('Error loading colleges:', error);
      toast({
        variant: "destructive",
        title: "Error loading colleges",
        description: "Failed to load college list. Please refresh the page.",
      });
    }
  };

  // Reset dependent fields when selections change
  const handleCollegeChange = (collegeId: string) => {
    setFormData(prev => ({
      ...prev,
      collegeId,
      programId: '',
      level: '',
      subjects: []
    }));
  };

  const handleProgramChange = (programId: string) => {
    setFormData(prev => ({
      ...prev,
      programId,
      level: '',
      subjects: []
    }));
  };

  const handleLevelChange = (levelId: string) => {
    setFormData(prev => ({
      ...prev,
      level: levelId,
      subjects: []
    }));
  };

  const toggleSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !formData.name || !formData.collegeId || !formData.programId || !formData.level || formData.subjects.length === 0) {
      toast({
        variant: "destructive",
        title: "Please fill all fields",
        description: "All fields are required to complete your profile.",
      });
      return;
    }

    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        email: user.email,
        collegeId: formData.collegeId,
        programId: formData.programId,
        level: formData.level,
        subjects: formData.subjects,
        profileComplete: true,
        createdAt: new Date()
      });

      toast({
        title: "Profile completed!",
        description: "Welcome to StudyMatch. Let's find your study partners!",
      });

      navigate('/feed');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        variant: "destructive",
        title: "Error saving profile",
        description: "Failed to save your profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <Card className="ios-card border-0 shadow-soft">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
            <p className="text-muted-foreground">
              Tell us about yourself to find the perfect study partners
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="ios-input h-12"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>College</Label>
                <Select 
                  value={formData.collegeId} 
                  onValueChange={handleCollegeChange}
                >
                  <SelectTrigger className="ios-input h-12">
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

              {selectedCollege && (
                <div className="space-y-2">
                  <Label>Program</Label>
                  <Select 
                    value={formData.programId} 
                    onValueChange={handleProgramChange}
                  >
                    <SelectTrigger className="ios-input h-12">
                      <SelectValue placeholder="Select your program" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCollege.programs.map((program) => (
                        <SelectItem key={program.id} value={program.id}>
                          {program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {selectedProgram && (
                <div className="space-y-2">
                  <Label>Academic Level</Label>
                  <Select 
                    value={formData.level} 
                    onValueChange={handleLevelChange}
                  >
                    <SelectTrigger className="ios-input h-12">
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProgram.levels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {availableSubjects.length > 0 && (
                <div className="space-y-3">
                  <Label>Subjects of Interest (Select at least one)</Label>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {availableSubjects.map((subject) => (
                      <motion.div
                        key={subject}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge
                          variant={formData.subjects.includes(subject) ? "default" : "outline"}
                          className="cursor-pointer ios-button text-sm px-3 py-2"
                          onClick={() => toggleSubject(subject)}
                        >
                          {subject}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Selected: {formData.subjects.length} subject{formData.subjects.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit"
                  disabled={loading || !formData.collegeId || !formData.programId || !formData.level || formData.subjects.length === 0}
                  className="w-full h-12 ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground"
                >
                  {loading ? 'Saving...' : 'Save & Continue'}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfileSetup;