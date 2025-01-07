import { useEffect } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import supabase from '../utils/supabase';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session && session.user.email) {
        setUser({ id: session.user.id, email: session.user.email, nickname: session.user.user_metadata.nickName });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return <>{children}</>;
};
