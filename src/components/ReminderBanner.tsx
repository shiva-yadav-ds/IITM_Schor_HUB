import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, X, ExternalLink } from 'lucide-react';

interface UpcomingSession {
  id: string;
  subject: string;
  title: string;
  time: Date;
  meetLink: string;
}

interface ReminderBannerProps {
  upcomingSessions: UpcomingSession[];
  onDismiss: (sessionId: string) => void;
  dismissedSessions: Set<string>;
}

const ReminderBanner: React.FC<ReminderBannerProps> = ({
  upcomingSessions,
  onDismiss,
  dismissedSessions
}) => {
  const getTimeUntil = (sessionTime: Date) => {
    const now = new Date();
    const diff = sessionTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 60) {
      return `${minutes} minutes`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
  };

  const visibleSessions = upcomingSessions.filter(
    session => !dismissedSessions.has(session.id)
  );

  if (visibleSessions.length === 0) return null;

  return (
    <AnimatePresence>
      {visibleSessions.map((session) => (
        <motion.div
          key={session.id}
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Card className="ios-card border-0 shadow-soft bg-gradient-to-r from-primary-light/40 to-primary-light/20 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {session.subject}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        starts in {getTimeUntil(session.time)}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm truncate">
                      {session.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    onClick={() => window.open(session.meetLink, '_blank')}
                    className="ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground text-xs px-3"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Join Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismiss(session.id)}
                    className="ios-button h-8 w-8 p-0 hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default ReminderBanner;