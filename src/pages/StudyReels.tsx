import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Video, Plus, Search, Calendar, Bookmark, BookmarkCheck, Trash2, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import BottomTabNavigation from '@/components/BottomTabNavigation';
import PullToRefresh from '@/components/PullToRefresh';

const SUBJECTS = [
  'All',
  'Mathematics for Data Science I',
  'Mathematics for Data Science II',
  'Statistics for Data Science I',
  'Statistics for Data Science II',
  'Computational Thinking',
  'Programming in Python',
  'English I',
  'English II',
];

interface StudyVideo {
  id: string;
  uploader_id: string;
  uploader_name: string;
  subject: string;
  topic: string;
  video_link: string;
  description: string;
  created_at: any;
  status: string;
}

interface BookmarkDoc {
  id: string;
  video_id: string;
}

const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtube\.com\/shorts\/([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const VideoCard = ({ video, isBookmarked, onToggleBookmark, currentUserId, onDelete, onReport, isActive }: {
  video: StudyVideo;
  isBookmarked: boolean;
  onToggleBookmark: (videoId: string) => void;
  currentUserId?: string;
  onDelete: (videoId: string) => void;
  onReport: (videoId: string) => void;
  isActive: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const createdDate = video.created_at?.toDate?.()
    ? format(video.created_at.toDate(), 'MMM d, yyyy')
    : '';

  const videoId = extractYouTubeId(video.video_link);
  const isShort = video.video_link.includes('/shorts/');

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Badge variant="secondary" className="shrink-0 bg-primary/10 text-primary border-0 text-xs">
                {video.subject}
              </Badge>
              <p className="font-semibold text-sm truncate text-foreground">{video.topic}</p>
            </div>
            <div className="flex items-center gap-1">
              {currentUserId !== video.uploader_id && (
                <button
                  onClick={() => onReport(video.id)}
                  className="shrink-0 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                  title="Report this short"
                >
                  <Flag className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                </button>
              )}
              {currentUserId === video.uploader_id && (
                <button
                  onClick={() => onDelete(video.id)}
                  className="shrink-0 p-1.5 rounded-full hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              )}
              <button
                onClick={() => onToggleBookmark(video.id)}
                className="shrink-0 p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                ) : (
                  <Bookmark className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {video.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
          )}

          {videoId && (
            <div className={`rounded-xl overflow-hidden bg-muted/30 ${isShort ? 'max-w-[320px] mx-auto' : ''}`}>
              {isActive ? (
                <iframe
                  width="100%"
                  height={isShort ? 560 : 315}
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&loop=1&playlist=${videoId}&fs=0&autoplay=1&mute=0`}
                  title={video.topic}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-xl"
                />
              ) : (
                <img
                  src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                  alt={video.topic}
                  className="w-full object-cover rounded-xl"
                  style={{ height: isShort ? 560 : 315 }}
                  loading="lazy"
                />
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span className="truncate">by {video.uploader_name}</span>
            {createdDate && (
              <span className="flex items-center gap-1 shrink-0">
                <Calendar className="h-3 w-3" /> {createdDate}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StudyReels = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [videos, setVideos] = useState<StudyVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubject, setActiveSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<BookmarkDoc[]>([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Fetch bookmarks
  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
      try {
        const q = query(
          collection(db, 'video_bookmarks'),
          where('user_id', '==', user.uid)
        );
        const snap = await getDocs(q);
        setBookmarks(snap.docs.map(d => ({ id: d.id, video_id: (d.data() as Record<string, any>).video_id })));
      } catch (err) {
        console.error('Fetch bookmarks error:', err);
      }
    };
    fetchBookmarks();
  }, [user]);

  const toggleBookmark = async (videoId: string) => {
    if (!user) return;
    const existing = bookmarks.find(b => b.video_id === videoId);
    try {
      if (existing) {
        await deleteDoc(doc(db, 'video_bookmarks', existing.id));
        setBookmarks(prev => prev.filter(b => b.id !== existing.id));
        toast({ title: 'Bookmark removed' });
      } else {
        const docRef = await addDoc(collection(db, 'video_bookmarks'), {
          user_id: user.uid,
          video_id: videoId,
          created_at: Timestamp.now(),
        });
        setBookmarks(prev => [...prev, { id: docRef.id, video_id: videoId }]);
        toast({ title: '🔖 Video bookmarked!' });
      }
    } catch (err) {
      console.error('Bookmark error:', err);
      toast({ title: 'Failed to update bookmark', variant: 'destructive' });
    }
  };

  const handleReport = async (videoId: string) => {
    if (!user) return;
    if (!window.confirm('Report this short as inappropriate? Our team will review it.')) return;
    try {
      await addDoc(collection(db, 'reports'), {
        video_id: videoId,
        reported_by: user.uid,
        reason: 'inappropriate_content',
        created_at: Timestamp.now(),
        status: 'pending',
      });
      toast({ title: '🚩 Report submitted', description: 'Thank you. Our team will review this content.' });
    } catch (err) {
      console.error('Report error:', err);
      toast({ title: 'Failed to submit report', variant: 'destructive' });
    }
  };

  const handleDelete = async (videoId: string) => {
    if (!user) return;
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await updateDoc(doc(db, 'study_reels', videoId), { status: 'removed' });
      setVideos(prev => prev.filter(v => v.id !== videoId));
      toast({ title: 'Video deleted' });
    } catch (err) {
      console.error('Delete video error:', err);
      toast({ title: 'Failed to delete video', variant: 'destructive' });
    }
  };

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      // Simple query without orderBy to avoid composite index requirement
      const q = query(
        collection(db, 'study_reels'),
        where('status', '==', 'active')
      );

      const snap = await getDocs(q);
      let data: StudyVideo[] = snap.docs.map(d => {
        const docData = d.data() as Record<string, any>;
        return {
          id: d.id,
          uploader_id: docData.uploader_id || '',
          uploader_name: docData.uploader_name || 'Anonymous',
          subject: docData.subject || '',
          topic: docData.topic || '',
          video_link: docData.video_link || docData.reel_link || '',
          description: docData.description || '',
          created_at: docData.created_at,
          status: docData.status || 'active',
        };
      });

      // Sort client-side by created_at descending
      data.sort((a, b) => {
        const aTime = a.created_at?.toDate?.()?.getTime() || 0;
        const bTime = b.created_at?.toDate?.()?.getTime() || 0;
        return bTime - aTime;
      });

      setVideos(data);
    } catch (err) {
      console.error('Fetch videos error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const bookmarkedIds = useMemo(() => new Set(bookmarks.map(b => b.video_id)), [bookmarks]);

  const filteredVideos = useMemo(() => {
    let result = activeSubject !== 'All'
      ? videos.filter(v => v.subject === activeSubject)
      : videos;

    if (searchQuery.trim()) {
      result = result.filter(v =>
        v.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showBookmarked) {
      result = result.filter(v => bookmarkedIds.has(v.id));
    }

    return result;
  }, [videos, activeSubject, searchQuery, showBookmarked, bookmarkedIds]);

  // Track which video is most visible using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible: { id: string; ratio: number } | null = null;
        entries.forEach((entry) => {
          const videoId = entry.target.getAttribute('data-video-id');
          if (videoId && entry.isIntersecting && entry.intersectionRatio > (mostVisible?.ratio || 0)) {
            mostVisible = { id: videoId, ratio: entry.intersectionRatio };
          }
        });
        if (mostVisible) {
          setActiveVideoId(mostVisible.id);
        }
      },
      { threshold: [0.3, 0.5, 0.7, 1.0] }
    );

    const timeout = setTimeout(() => {
      videoRefs.current.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [filteredVideos]);

  const setVideoRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) {
      videoRefs.current.set(id, el);
    } else {
      videoRefs.current.delete(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <PullToRefresh onRefresh={fetchVideos}>
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Study Shorts</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showBookmarked ? 'default' : 'outline'}
              size="icon"
              className="h-9 w-9"
              onClick={() => setShowBookmarked(!showBookmarked)}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            {user && (
              <Button size="sm" onClick={() => navigate('/submit-reel')}>
                <Plus className="h-4 w-4 mr-1" /> Submit
              </Button>
            )}
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search topics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Subject filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {SUBJECTS.map(s => (
            <Button
              key={s}
              variant={activeSubject === s ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSubject(s)}
              className="shrink-0 text-xs"
            >
              {s}
            </Button>
          ))}
        </div>

        {/* Video feed */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredVideos.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Video className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">
                {showBookmarked ? 'No bookmarked shorts' : 'No shorts found'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {showBookmarked ? 'Bookmark shorts to see them here' : 'Be the first to share an educational short!'}
              </p>
              {!showBookmarked && user && (
                <Button size="sm" className="mt-4" onClick={() => navigate('/submit-reel')}>
                  <Plus className="h-4 w-4 mr-1" /> Submit Short
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 snap-y snap-mandatory">
            {filteredVideos.map(video => (
              <div
                key={video.id}
                ref={(el) => setVideoRef(video.id, el)}
                data-video-id={video.id}
                className="snap-start"
              >
                <VideoCard
                  video={video}
                  isBookmarked={bookmarkedIds.has(video.id)}
                  onToggleBookmark={toggleBookmark}
                  currentUserId={user?.uid}
                  onDelete={handleDelete}
                  onReport={handleReport}
                  isActive={activeVideoId === video.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      </PullToRefresh>
      <BottomTabNavigation />
    </div>
  );
};

export default StudyReels;
