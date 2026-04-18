import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProfileComplete?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireProfileComplete = false 
}) => {
  const { user, loading: authLoading } = useAuth();
  const [profileCheck, setProfileCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      if (!authLoading && !user) {
        navigate('/login');
        return;
      }

      if (user && requireProfileComplete) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const profileData = docSnap.data();
            if (!profileData.profileComplete) {
              navigate('/profile-setup');
              return;
            }
          } else {
            navigate('/profile-setup');
            return;
          }
        } catch (error) {
          console.error('Error checking profile:', error);
        }
      }
      
      setProfileCheck(true);
    };

    checkProfile();
  }, [user, authLoading, requireProfileComplete, navigate]);

  if (authLoading || !profileCheck) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;