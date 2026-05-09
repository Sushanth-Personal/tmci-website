import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAdminStore = create((set) => ({
  session: null,
  loading: true,

  init: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session, loading: false })
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session })
    })
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    set({ session: data.session })
    return data
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ session: null })
  }
}))
