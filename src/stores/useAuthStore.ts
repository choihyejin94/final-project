import { create } from 'zustand';
import { Tables } from '../types/supabase';

type User = Tables<'users'>

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}));
