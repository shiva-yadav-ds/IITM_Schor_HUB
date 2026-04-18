import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { ref, push, set, onValue, off, get } from 'firebase/database';
import { db, rtdb } from '@/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Send, MessageCircle, Star } from 'lucide-react';
import PeerRatingModal from '@/components/PeerRatingModal';
import { usePeerRating } from '@/hooks/usePeerRating';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: Date;
}

interface Session {
  id: string;
  hostId: string;
  subject: string;
  title: string;
  time: Date;
}

interface PeerToRate {
  id: string;
  name: string;
}

const SessionChat = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [peersToRate, setPeersToRate] = useState<PeerToRate[]>([]);
  const [currentPeerToRate, setCurrentPeerToRate] = useState<PeerToRate | null>(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { submitRating, loading: ratingLoading } = usePeerRating();

  useEffect(() => {
    if (!user || !sessionId) {
      navigate('/feed');
      return;
    }

    loadSessionAndProfile();
    const cleanupMessages = loadMessages();
    
    return () => {
      cleanupMessages?.();
    };
  }, [user, sessionId, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check session status when session data is loaded
  useEffect(() => {
    if (!session) return;
    const sessionEnd = new Date(session.time.getTime() + 2 * 60 * 60 * 1000);
    if (new Date() > sessionEnd) {
      setSessionEnded(true);
    }
  }, [session]);

  useEffect(() => {
    if (sessionEnded && messages.length > 0) {
      // Find peers to rate (participants who sent messages, excluding current user)
      const uniqueParticipants = new Map<string, string>();
      messages.forEach(message => {
        if (message.senderId !== user?.uid) {
          uniqueParticipants.set(message.senderId, message.senderName);
        }
      });

      const peers: PeerToRate[] = Array.from(uniqueParticipants.entries()).map(([id, name]) => ({
        id,
        name
      }));

      setPeersToRate(peers);
      
      // Start rating process if there are peers to rate
      if (peers.length > 0 && !currentPeerToRate) {
        setCurrentPeerToRate(peers[0]);
        setShowRatingModal(true);
      }
    }
  }, [sessionEnded, messages, user?.uid, currentPeerToRate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Session status check is now handled by the useEffect above

  const loadSessionAndProfile = async () => {
    if (!user || !sessionId) return;

    try {
      // Load session details from Realtime Database
      const sessionRef = ref(rtdb, `sessions/${sessionId}`);
      const sessionSnapshot = await get(sessionRef);
      
      if (sessionSnapshot.exists()) {
        const sessionData = sessionSnapshot.val();
        setSession({
          id: sessionId,
          hostId: sessionData.hostId,
          subject: sessionData.subject,
          title: sessionData.title,
          time: new Date(sessionData.time)
        });
      }

      // Load user profile for name from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      }
    } catch (error) {
      console.error('Error loading session:', error);
      toast({
        variant: "destructive",
        title: "Error loading session",
        description: "Failed to load session details.",
      });
    }
  };

  const loadMessages = () => {
    if (!sessionId) return;

    const messagesRef = ref(rtdb, `chats/${sessionId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesList: Message[] = [];
      
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        Object.entries(messagesData).forEach(([id, data]: [string, any]) => {
          messagesList.push({
            id,
            senderId: data.senderId,
            senderName: data.senderName,
            text: data.text,
            createdAt: new Date(data.timestamp)
          });
        });
        
        // Sort by timestamp
        messagesList.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
      }
      
      setMessages(messagesList);
    });

    return () => off(messagesRef, 'value', unsubscribe);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !user || !sessionId || !userProfile) return;

    setLoading(true);
    try {
      const messagesRef = ref(rtdb, `chats/${sessionId}/messages`);
      const newMessageRef = push(messagesRef);
      
      await set(newMessageRef, {
        senderId: user.uid,
        senderName: userProfile.name,
        text: newMessage.trim(),
        timestamp: new Date().toISOString()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Failed to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const handleRatingSubmit = async (rating: number, feedback: string) => {
    if (!currentPeerToRate || !sessionId || !user) return;

    const success = await submitRating(
      sessionId,
      user.uid,
      currentPeerToRate.id,
      rating,
      feedback
    );

    if (success) {
      // Move to next peer or close modal
      const currentIndex = peersToRate.findIndex(peer => peer.id === currentPeerToRate.id);
      const nextPeer = peersToRate[currentIndex + 1];
      
      if (nextPeer) {
        setCurrentPeerToRate(nextPeer);
      } else {
        setShowRatingModal(false);
        setCurrentPeerToRate(null);
        toast({
          title: "All ratings submitted!",
          description: "Thank you for rating your study partners.",
        });
      }
    }
  };

  const handleRatingClose = () => {
    setShowRatingModal(false);
    setCurrentPeerToRate(null);
  };

  if (!user || !session) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border p-4"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/feed')}
              className="ios-button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                <Badge variant="secondary">{session.subject}</Badge>
              </div>
              <h1 className="font-semibold text-lg">{session.title}</h1>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 overflow-hidden flex flex-col">
        <Card className="ios-card border-0 shadow-soft flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Session Chat</CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col min-h-0">
            {/* Messages List */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${message.senderId === user.uid ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.senderId === user.uid
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div className={`text-xs text-muted-foreground mt-1 ${
                        message.senderId === user.uid ? 'text-right' : 'text-left'
                      }`}>
                        {message.senderId !== user.uid && (
                          <span className="font-medium">{message.senderName} • </span>
                        )}
                        {formatTime(message.createdAt)}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 ios-input"
                disabled={loading}
                maxLength={500}
              />
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  type="submit" 
                  disabled={loading || !newMessage.trim()}
                  className="ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground px-4"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Peer Rating Modal */}
      {currentPeerToRate && (
        <PeerRatingModal
          isOpen={showRatingModal}
          onClose={handleRatingClose}
          onSubmitRating={handleRatingSubmit}
          peerName={currentPeerToRate.name}
          loading={ratingLoading}
        />
      )}
    </div>
  );
};

export default SessionChat;