import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface PlayerProgress {
  player_name: string;
  questions_answered: number;
  is_done: boolean;
}

export const useProgress = (sessionId: string | null) => {
  const [players, setPlayers] = useState<PlayerProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('progress')
        .select('player_name, questions_answered, is_done')
        .eq('session_id', sessionId);

      if (error) {
        console.error("Error fetching progress:", error);
      } else {
        setPlayers(data || []);
      }
      setLoading(false);
    };

    fetchProgress();

    const channel = supabase
      .channel(`progress:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'progress',
          filter: `session_id=eq.${sessionId}`
        },
        () => {
          fetchProgress();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const allDone = players.length === 4 && players.every(p => p.is_done);
  const doneCount = players.filter(p => p.is_done).length;

  return { players, allDone, doneCount, loading };
};
