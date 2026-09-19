import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) { setLoading(false); return undefined; }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) loadProfile(data.session.user.id);
      else setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      if (next?.user) loadProfile(next.user.id);
      else { setProfile(null); setLoading(false); }
    });
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  async function loadProfile(id) {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    setProfile(data);
    setLoading(false);
  }
  async function signIn(email, password) {
    if (!supabase) throw new Error('Configure admin Supabase environment variables first.');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }
  async function signOut() { await supabase?.auth.signOut(); }

  return <AuthContext.Provider value={{ session, profile, loading, isAdmin: profile?.role === 'admin' || profile?.role === 'editor', signIn, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
