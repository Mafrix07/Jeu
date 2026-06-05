import { useState } from 'react';
import { supabase } from '../lib/supabase';

const SESSION_KEY = 'vibe_session_id';
const PLAYER_KEY = 'vibe_player_name';

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem(SESSION_KEY));
  const [playerName, setPlayerName] = useState<string | null>(localStorage.getItem(PLAYER_KEY));
  const [loading, setLoading] = useState(false);

  const startSession = async (name: string) => {
    setLoading(true);
    try {
      // 1. Get or Create Session
      let currentSessionId: string;
      
      const { data: sessions, error: sessionError } = await supabase
        .from('sessions')
        .select('id')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (sessionError) throw sessionError;

      if (!sessions || sessions.length === 0) {
        const { data: newSession, error: createError } = await supabase
          .from('sessions')
          .insert({ is_active: true })
          .select()
          .single();

        if (createError) throw createError;
        currentSessionId = newSession.id;
      } else {
        currentSessionId = sessions[0].id;
      }

      // 2. Register Player in Progress
      // Check if already registered
      const { data: progress, error: progressError } = await supabase
        .from('progress')
        .select('*')
        .eq('session_id', currentSessionId)
        .eq('player_name', name)
        .maybeSingle(); // maybeSingle avoids error if not found

      if (progressError) throw progressError;

      if (!progress) {
        const { error: insertError } = await supabase.from('progress').insert({
          session_id: currentSessionId,
          player_name: name,
          questions_answered: 0,
          is_done: false
        });
        
        if (insertError) {
          // If insert fails (race condition where name was just taken), we throw
          throw new Error("Ce nom est déjà pris ou une erreur est survenue.");
        }
      }

      localStorage.setItem(SESSION_KEY, currentSessionId);
      localStorage.setItem(PLAYER_KEY, name);
      setSessionId(currentSessionId);
      setPlayerName(name);
      return true;
    } catch (err: any) {
      console.error("Error starting session:", err);
      alert(err.message || "Erreur de connexion");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PLAYER_KEY);
    setSessionId(null);
    setPlayerName(null);
  };

  return { sessionId, playerName, startSession, clearSession, loading };
};
