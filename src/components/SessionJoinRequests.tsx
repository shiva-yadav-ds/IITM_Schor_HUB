import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface JoinRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

interface SessionJoinRequestsProps {
  requests: JoinRequest[];
  onAccept: (requestId: string, userId: string) => void;
  onReject: (requestId: string) => void;
  isHost: boolean;
}

const SessionJoinRequests: React.FC<SessionJoinRequestsProps> = ({
  requests,
  onAccept,
  onReject,
  isHost
}) => {
  const pendingRequests = requests.filter(r => r.status === 'pending');

  if (!isHost || pendingRequests.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="border-t border-border/50 pt-3 mt-3 space-y-2"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Join Requests ({pendingRequests.length})</span>
      </div>

      {pendingRequests.map((request) => (
        <motion.div
          key={request.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between bg-accent/30 rounded-lg px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
              {request.fromUserName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium">{request.fromUserName}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => onAccept(request.id, request.fromUserId)}
              className="ios-button h-8 px-3 bg-green-500 hover:bg-green-600 text-white"
            >
              <Check className="h-3 w-3 mr-1" />
              Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onReject(request.id)}
              className="ios-button h-8 px-3 border-red-300 text-red-600 hover:bg-red-50"
            >
              <X className="h-3 w-3 mr-1" />
              Reject
            </Button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SessionJoinRequests;
