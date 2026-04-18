import { useState } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useToast } from '@/hooks/use-toast';
import { useGamification } from '@/hooks/useGamification';

export const usePeerRating = () => {
  const [loading, setLoading] = useState(false);
  const { onRatingGiven, onSessionCompleted } = useGamification();
  const { toast } = useToast();

  const submitRating = async (
    sessionId: string,
    raterId: string,
    ratedId: string,
    rating: number,
    feedback: string
  ) => {
    setLoading(true);
    try {
      // Add rating to ratings collection
      await addDoc(collection(db, 'sessions', sessionId, 'ratings'), {
        raterId,
        ratedId,
        sessionId,
        rating,
        feedback: feedback.trim(),
        createdAt: new Date()
      });

      // Update user's average rating
      await updateUserRating(ratedId, rating);

      // Award points for giving rating and mark session as completed
      await onRatingGiven();
      await onSessionCompleted();

      toast({
        title: "Rating submitted!",
        description: "Thank you for your feedback. You earned points!",
      });

      return true;
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast({
        variant: "destructive",
        title: "Error submitting rating",
        description: "Failed to submit your rating. Please try again.",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUserRating = async (userId: string, newRating: number) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentAvg = userData.avgRating || 0;
        const currentTotal = userData.totalRatings || 0;
        
        // Calculate new average
        const newTotal = currentTotal + 1;
        const newAvg = ((currentAvg * currentTotal) + newRating) / newTotal;
        
        // Update user document
        await updateDoc(userDocRef, {
          avgRating: newAvg,
          totalRatings: newTotal
        });
      } else {
        // First rating for this user
        await updateDoc(userDocRef, {
          avgRating: newRating,
          totalRatings: 1
        });
      }
    } catch (error) {
      console.error('Error updating user rating:', error);
    }
  };

  return {
    submitRating,
    loading
  };
};