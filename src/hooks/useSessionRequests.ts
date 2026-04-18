import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/components/AuthProvider';

export interface JoinRequest {
  id: string;
  sessionId: string;
  fromUserId: string;
  fromUserName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export const useSessionRequests = (sessionIds: string[]) => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Map<string, JoinRequest[]>>(new Map());
  const [userRequests, setUserRequests] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || sessionIds.length === 0) {
      setLoading(false);
      return;
    }

    // Listen to all requests for sessions
    const requestsQuery = query(
      collection(db, 'sessionJoinRequests'),
      where('sessionId', 'in', sessionIds.slice(0, 10)) // Firestore limit
    );

    const unsubscribe = onSnapshot(requestsQuery, (snapshot) => {
      const requestsMap = new Map<string, JoinRequest[]>();
      const userRequestsMap = new Map<string, string>();

      snapshot.forEach((doc) => {
        const data = doc.data();
        const request: JoinRequest = {
          id: doc.id,
          sessionId: data.sessionId,
          fromUserId: data.fromUserId,
          fromUserName: data.fromUserName || 'Unknown User',
          status: data.status,
          createdAt: data.createdAt?.toDate() || new Date()
        };

        // Group by session
        const sessionRequests = requestsMap.get(data.sessionId) || [];
        sessionRequests.push(request);
        requestsMap.set(data.sessionId, sessionRequests);

        // Track user's own requests
        if (data.fromUserId === user.uid) {
          userRequestsMap.set(data.sessionId, data.status);
        }
      });

      setRequests(requestsMap);
      setUserRequests(userRequestsMap);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, sessionIds.join(',')]);

  return { requests, userRequests, loading };
};

export const createJoinRequest = async (
  sessionId: string,
  fromUserId: string,
  fromUserName: string
) => {
  // Check if user already has a request for this session
  const existingQuery = query(
    collection(db, 'sessionJoinRequests'),
    where('sessionId', '==', sessionId),
    where('fromUserId', '==', fromUserId)
  );

  const existingDocs = await getDocs(existingQuery);
  if (!existingDocs.empty) {
    throw new Error('You already have a pending request for this session');
  }

  await addDoc(collection(db, 'sessionJoinRequests'), {
    sessionId,
    fromUserId,
    fromUserName,
    status: 'pending',
    createdAt: Timestamp.now()
  });
};

export const acceptJoinRequest = async (requestId: string) => {
  const requestRef = doc(db, 'sessionJoinRequests', requestId);
  await updateDoc(requestRef, {
    status: 'accepted',
    acceptedAt: Timestamp.now()
  });
};

export const rejectJoinRequest = async (requestId: string) => {
  const requestRef = doc(db, 'sessionJoinRequests', requestId);
  await updateDoc(requestRef, {
    status: 'rejected',
    rejectedAt: Timestamp.now()
  });
};
