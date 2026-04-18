import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface PeerRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRating: (rating: number, feedback: string) => void;
  peerName: string;
  loading?: boolean;
}

const PeerRatingModal: React.FC<PeerRatingModalProps> = ({
  isOpen,
  onClose,
  onSubmitRating,
  peerName,
  loading = false
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmitRating(rating, feedback);
      // Reset form
      setRating(0);
      setHoveredRating(0);
      setFeedback('');
    }
  };

  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setFeedback('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="ios-card border-0 shadow-soft max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Rate Your Study Partner</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            How was your study session with <span className="font-medium text-foreground">{peerName}</span>?
          </p>

          {/* Star Rating */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= (hoveredRating || rating);
                return (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                    className={`p-1 transition-colors ${
                      isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  >
                    <Star 
                      className="h-8 w-8" 
                      fill={isActive ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                );
              })}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                {rating === 1 && "Poor experience"}
                {rating === 2 && "Below average"}
                {rating === 3 && "Average experience"}
                {rating === 4 && "Good experience"}
                {rating === 5 && "Excellent experience"}
              </p>
            )}
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback (optional)</Label>
            <Textarea
              id="feedback"
              placeholder="Share your experience with this study partner..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="ios-input min-h-[80px]"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">
              {feedback.length}/200 characters
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 ios-button"
              disabled={loading}
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || loading}
              className="flex-1 ios-button bg-gradient-primary hover:opacity-90 text-primary-foreground"
            >
              {loading ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PeerRatingModal;