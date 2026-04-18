import React, { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Video, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '@/components/BottomTabNavigation';

const SUBJECTS = [
  'Mathematics for Data Science I',
  'Mathematics for Data Science II',
  'Statistics for Data Science I',
  'Statistics for Data Science II',
  'Computational Thinking',
  'Programming in Python',
  'English I',
  'English II',
  'Other',
];
const LEVELS = ['Foundation', 'Diploma', 'BSc', 'BS'];

const YOUTUBE_URL_REGEX = /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]+/;

const SubmitReel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [level, setLevel] = useState('');
  const [topic, setTopic] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const finalSubject = subject === 'Other' ? customSubject.trim() : subject;

    if (!finalSubject) {
      toast({ title: 'Select or enter a subject', variant: 'destructive' });
      return;
    }
    if (!level) {
      toast({ title: 'Select a level', variant: 'destructive' });
      return;
    }
    if (!topic.trim()) {
      toast({ title: 'Enter a topic', variant: 'destructive' });
      return;
    }
    if (!YOUTUBE_URL_REGEX.test(videoLink.trim())) {
      toast({ title: 'Invalid YouTube URL', description: 'Use youtube.com/watch, youtube.com/shorts, or youtu.be links', variant: 'destructive' });
      return;
    }

    try {
      setSubmitting(true);

      const dupQuery = query(
        collection(db, 'study_reels'),
        where('video_link', '==', videoLink.trim())
      );
      const dupSnap = await getDocs(dupQuery);
      if (!dupSnap.empty) {
        toast({ title: 'This video has already been submitted', variant: 'destructive' });
        setSubmitting(false);
        return;
      }

      await addDoc(collection(db, 'study_reels'), {
        uploader_id: user.uid,
        uploader_name: user.displayName || user.email || 'Anonymous',
        subject: finalSubject,
        level,
        topic: topic.trim(),
        video_link: videoLink.trim(),
        description: description.trim(),
        created_at: Timestamp.now(),
        status: 'active',
      });

      toast({ title: '🎬 Video submitted successfully!' });
      navigate('/reels');
    } catch (err) {
      console.error('Submit video error:', err);
      toast({ title: 'Failed to submit video', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/reels')} className="mb-3">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Shorts
          </Button>

          {/* How-to guide */}
          <Card className="mb-4 bg-primary/5 border-primary/20">
            <CardContent className="p-3">
              <p className="text-xs font-semibold text-primary mb-1">📹 How to submit a study video?</p>
              <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside">
                <li>Record a short educational video (max 1 min)</li>
                <li>Upload it as a YouTube Short on your channel</li>
                <li>Copy the YouTube Shorts link and paste it below</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Video className="h-5 w-5 text-primary" />
                Submit Study Short
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject *</Label>
                  <Select value={subject} onValueChange={(v) => { setSubject(v); if (v !== 'Other') setCustomSubject(''); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {subject === 'Other' && (
                    <Input
                      placeholder="Enter subject name"
                      value={customSubject}
                      onChange={e => setCustomSubject(e.target.value)}
                      maxLength={50}
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Level *</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map(l => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Topic *</Label>
                  <Input
                    placeholder="e.g. Eigenvalues intuition"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    maxLength={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label>YouTube Video Link *</Label>
                  <Input
                    placeholder="https://www.youtube.com/shorts/ABC123"
                    value={videoLink}
                    onChange={e => setVideoLink(e.target.value)}
                    type="url"
                  />
                  <p className="text-xs text-muted-foreground">Supports youtube.com/watch, youtube.com/shorts, and youtu.be links</p>
                </div>

                <div className="space-y-2">
                  <Label>Description (optional)</Label>
                  <Textarea
                    placeholder="Brief description of the video content..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    maxLength={500}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Short'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default SubmitReel;
