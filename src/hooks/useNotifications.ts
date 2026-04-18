import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useAuth } from '@/components/AuthProvider';
import { Notification } from '@/types/gamification';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'users', user.uid, 'notifications'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notificationsData: Notification[] = [];
        let unread = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const notification: Notification = {
            id: doc.id,
            userId: user.uid,
            type: data.type,
            title: data.title,
            message: data.message,
            data: data.data,
            read: data.read,
            createdAt: data.createdAt?.toDate() || new Date()
          };
          
          notificationsData.push(notification);
          if (!notification.read) unread++;
        });

        setNotifications(notificationsData);
        setUnreadCount(unread);
        setLoading(false);
      });

      return unsubscribe;
    }
  }, [user]);

  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      await updateDoc(doc(db, 'users', user.uid, 'notifications', notificationId), {
        read: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      
      await Promise.all(
        unreadNotifications.map(notification =>
          updateDoc(doc(db, 'users', user.uid, 'notifications', notification.id), {
            read: true
          })
        )
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead
  };
};