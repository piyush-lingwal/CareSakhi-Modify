import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<'success' | 'exists' | 'error'>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<{ full_name: string; phone: string; avatar_url: string }>) => Promise<boolean>;
  verifyOtp: (email: string, token: string) => Promise<boolean>;
  resendOtp: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function mapSupabaseUser(su: SupabaseUser, profile?: { full_name?: string; phone?: string; avatar_url?: string }): User {
  return {
    id: su.id,
    name: profile?.full_name || su.user_metadata?.full_name || su.user_metadata?.name || '',
    email: su.email || '',
    avatar: profile?.avatar_url || su.user_metadata?.avatar_url || '',
    phone: profile?.phone || '',
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data from profiles table
  const fetchProfile = async (supabaseUser: SupabaseUser) => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, phone, avatar_url')
      .eq('id', supabaseUser.id)
      .single();
    return data;
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user);
        setUser(mapSupabaseUser(session.user, profile || undefined));
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const profile = await fetchProfile(session.user);
          setUser(mapSupabaseUser(session.user, profile || undefined));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    return !error;
  };

  const register = async (name: string, email: string, password: string): Promise<'success' | 'exists' | 'error'> => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
    setIsLoading(false);
    if (error) return 'error';
    // Supabase returns a fake user with empty identities for already-registered unconfirmed emails
    if (data.user && data.user.identities && data.user.identities.length === 0) return 'exists';
    return 'success';
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const updateProfile = async (data: Partial<{ full_name: string; phone: string; avatar_url: string }>): Promise<boolean> => {
    if (!user) return false;
    const { error } = await supabase
      .from('profiles')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    if (!error) {
      // Refresh user state
      const { data: { user: su } } = await supabase.auth.getUser();
      if (su) {
        const profile = await fetchProfile(su);
        setUser(mapSupabaseUser(su, profile || undefined));
      }
    }
    return !error;
  };

  const verifyOtp = async (email: string, token: string): Promise<boolean> => {
    setIsLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    });
    setIsLoading(false);
    return !error;
  };

  const resendOtp = async (email: string): Promise<boolean> => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    return !error;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile, verifyOtp, resendOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}