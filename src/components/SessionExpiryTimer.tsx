import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface SessionExpiryTimerProps {
  expireAt: Date;
  sessionTime: Date;
}

const SessionExpiryTimer: React.FC<SessionExpiryTimerProps> = ({ expireAt, sessionTime }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [status, setStatus] = useState<'upcoming' | 'live' | 'expiring'>('upcoming');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const msUntilStart = sessionTime.getTime() - now.getTime();
      const msUntilExpiry = expireAt.getTime() - now.getTime();

      if (msUntilExpiry <= 0) {
        setTimeLeft('Expired');
        setStatus('expiring');
        return;
      }

      if (msUntilStart > 0) {
        // Session hasn't started yet
        setStatus('upcoming');
        setTimeLeft(formatDuration(msUntilStart));
      } else if (msUntilExpiry <= 5 * 60 * 1000) {
        // Less than 5 min until expiry
        setStatus('expiring');
        setTimeLeft(formatDuration(msUntilExpiry));
      } else {
        // Session is live
        setStatus('live');
        setTimeLeft(formatDuration(msUntilExpiry));
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [expireAt, sessionTime]);

  const formatDuration = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const styles = {
    upcoming: 'bg-primary/10 text-primary',
    live: 'bg-green-500/10 text-green-600 dark:text-green-400',
    expiring: 'bg-destructive/10 text-destructive animate-pulse',
  };

  const labels = {
    upcoming: 'Starts in',
    live: 'Expires in',
    expiring: 'Expiring in',
  };

  const Icon = status === 'expiring' ? AlertTriangle : Clock;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      <Icon className="h-3 w-3" />
      <span>{timeLeft === 'Expired' ? 'Expired' : `${labels[status]} ${timeLeft}`}</span>
    </div>
  );
};

export default SessionExpiryTimer;