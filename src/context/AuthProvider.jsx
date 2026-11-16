import {useCallback, useEffect, useState} from 'react';
import { supabase } from '../lib/supabase';
import AuthContext from './AuthContext';


async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, name')
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (mounted) {
          setUser(data.session?.user ?? null);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        if (mounted) {
          setLoadingAuth(false);
        }
      }
    }

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoadingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);


  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoadingProfile(false);
      return;
    }

    let cancelled = false;

    async function fetchProfile() {
      setLoadingProfile(true);

      try {
        const data = await loadProfile(user.id);

        if (!cancelled) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Profile loading error:', error);

        if (!cancelled) {
          setProfile(null);
        }
      } finally {
        if (!cancelled) {
          setLoadingProfile(false);
        }
      }
    }

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const refreshProfile = useCallback(async () => {
    if (!user) return null;

    const data = await loadProfile(user.id);

    setProfile(data);

    return data;
  }, [user]);

  const value = {
    user,
    profile,
    refreshProfile,
    loadingAuth,
    loadingProfile,

    isAuthenticated: user !== null,
  };

  return (
    <AuthContext value={value}>
      {children}
    </AuthContext>
  );
}

export default AuthProvider;