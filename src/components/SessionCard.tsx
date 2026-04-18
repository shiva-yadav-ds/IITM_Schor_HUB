import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Users, Lock, Clock, Trash2 } from 'lucide-react';
import SessionJoinRequests from '@/components/SessionJoinRequests';
import SessionExpiryTimer from '@/components/SessionExpiryTimer';

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

interface ButtonState {
  label: string;
  disabled: boolean;
  tooltip: string;
}

interface SessionCardProps {
  session: Session;
  buttonState: ButtonState;
  onButtonClick: () => void;
  requests: JoinRequest[];
  onAcceptRequest: (requestId: string, userId: string) => void;
  onRejectRequest: (requestId: string) => void;
  isHost: boolean;
  canJoin: boolean;
  participantCount?: number;
  onDelete?: (sessionId: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  buttonState,
  onButtonClick,
  requests,
  onAcceptRequest,
  onRejectRequest,
  isHost,
  canJoin,
  participantCount,
  onDelete
}) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="ios-card border-0 shadow-soft hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="secondary">
                  {session.subject}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {session.currentParticipants.length} / {session.maxParticipants}
                </Badge>
                <SessionExpiryTimer expireAt={session.expireAt} sessionTime={session.time} />
              </div>
              <CardTitle className="text-lg">{session.title}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {isHost && onDelete && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDelete(session.id)}
                  className="text-destructive hover:bg-destructive/10 border-destructive/30"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      size="sm"
                      onClick={onButtonClick}
                      disabled={buttonState.disabled}
                      className={`ios-button ${
                        buttonState.label === 'Interested'
                          ? 'bg-blue-500 hover:bg-blue-600 text-white'
                          : buttonState.disabled
                          ? 'bg-muted text-muted-foreground'
                          : 'bg-gradient-primary hover:opacity-90 text-primary-foreground'
                      }`}
                    >
                      {buttonState.label === 'Full' && (
                        <Lock className="h-4 w-4 mr-1" />
                      )}
                      {(buttonState.label === 'Join' || 
                        buttonState.label === 'Join (Host)') && (
                        <ExternalLink className="h-4 w-4 mr-1" />
                      )}
                      {buttonState.label === 'Request Pending' && (
                        <Clock className="h-4 w-4 mr-1" />
                      )}
                      {buttonState.label}
                    </Button>
                  </div>
                </TooltipTrigger>
                {buttonState.tooltip && (
                  <TooltipContent>
                    <p>{buttonState.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {session.description && (
            <p className="text-muted-foreground mb-3 text-sm">{session.description}</p>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              {!isHost && <span>Host: {session.hostName}</span>}
              {!isHost && <span>•</span>}
              <span>{session.level}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDateTime(session.time)}
            </div>
          </div>

          {/* Show participants for approved users */}
          {canJoin && session.currentParticipants.length > 1 && (
            <div className="flex items-center gap-2 pt-2 mt-2 border-t border-border/50">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {session.currentParticipants.length} participants joined
              </span>
            </div>
          )}

          {/* Show join requests for host */}
          <SessionJoinRequests
            requests={requests}
            onAccept={onAcceptRequest}
            onReject={onRejectRequest}
            isHost={isHost}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SessionCard;
