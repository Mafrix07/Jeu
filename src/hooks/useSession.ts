import { useState } from 'react';
import { supabase } from '../lib/supabase';

const SESSION_KEY = 'vibe_session_id';
const PLAYER_KEY = 'vibe_player_name';

export const useSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(localStorage.getItem(SESSION_KEY));
  const [playerName, setPlayerName] = useState<string | null>(localStorage.getItem(PLAYER_KEY));
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const startSession = async (name: string) => {
    setLoading(true);
    try {
      let currentSessionId: string;
      let round = 1;
      
      const { data: sessions, error: sessionError } = await supabase
        .from('sessions')
        .select('id, current_round')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (sessionError) throw sessionError;

      if (!sessions || sessions.length === 0) {
        const { data: newSession, error: createError } = await supabase
          .from('sessions')
          .insert({ is_active: true, current_round: 1 })
          .select()
          .single();

        if (createError) throw createError;
        currentSessionId = newSession.id;
        round = newSession.current_round;
      } else {
        currentSessionId = sessions[0].id;
        round = sessions[0].current_round;
      }

      const { data: progress, error: progressError } = await supabase
        .from('progress')
        .select('*')
        .eq('session_id', currentSessionId)
        .eq('player_name', name)
        .maybeSingle();

      if (progressError) throw progressError;

      if (!progress) {
        const { error: insertError } = await supabase.from('progress').insert({
          session_id: currentSessionId,
          player_name: name,
          questions_answered: 0,
          is_done: false,
          round_completed: 0
        });
        
        if (insertError) throw new Error("Ce nom est déjà pris ou une erreur est survenue.");
      }

      localStorage.setItem(SESSION_KEY, currentSessionId);
      localStorage.setItem(PLAYER_KEY, name);
      setSessionId(currentSessionId);
      setPlayerName(name);
      setCurrentRound(round);
      return true;
    } catch (err: any) {
      console.error("Error starting session:", err);
      alert(err.message || "Erreur de connexion");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getRound = async (id: string) => {
    const { data } = await supabase
      .from('sessions')
      .select('current_round')
      .eq('id', id)
      .single();
    if (data) setCurrentRound(data.current_round);
    return data?.current_round || 1;
  };

  const nextRound = async () => {
    if (!sessionId) return;
    const { data } = await supabase
      .from('sessions')
      .select('current_round')
      .eq('id', sessionId)
      .single();
    
    if (data) {
      const nextR = data.current_round + 1;
      await supabase
        .from('sessions')
        .update({ current_round: nextR })
        .eq('id', sessionId);
      setCurrentRound(nextR);
    }
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(PLAYER_KEY);
    setSessionId(null);
    setPlayerName(null);
  };

  return { sessionId, playerName, currentRound, startSession, getRound, nextRound, clearSession, loading };
};
