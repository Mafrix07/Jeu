import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { PLAYERS } from '../lib/constants';
import { supabase } from '../lib/supabase';

export const Login = () => {
  const navigate = useNavigate();
  const { startSession, loading } = useSession();
  const [takenNames, setTakenNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchTakenNames = async () => {
      const { data: session } = await supabase
        .from('sessions')
        .select('id')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (session) {
        const { data: progress } = await supabase
          .from('progress')
          .select('player_name')
          .eq('session_id', session.id);
        
        if (progress) {
          setTakenNames(progress.map(p => p.player_name));
        }

        const channel = supabase
          .channel('public:progress')
          .on('postgres_changes', { 
            event: '*', 
            schema: 'public', 
            table: 'progress',
            filter: `session_id=eq.${session.id}` 
          }, (payload: any) => {
            if (payload.eventType === 'INSERT') {
              setTakenNames(prev => [...prev, payload.new.player_name]);
            }
          })
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }
    };

    fetchTakenNames();
  }, []);

  const handlePick = async (name: string) => {
    const success = await startSession(name);
    if (success) {
      navigate('/vote');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="font-mono text-[10px] text-[var(--accent)] tracking-[4px] uppercase mb-4 text-center"
        >
          // IDENTIFICATION_REQUIRED
        </motion.p>
        <h2 className="text-3xl font-black text-white mb-10 text-center uppercase italic tracking-tight">
          SÉLECTION DU PROFIL
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {PLAYERS.map((name, i) => {
            const isTaken = takenNames.includes(name);
            return (
              <motion.button
                key={name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={!isTaken && !loading ? { x: 8, borderColor: 'var(--accent)' } : {}}
                onClick={() => !isTaken && handlePick(name)}
                disabled={loading || isTaken}
                className={`group p-6 rounded-2xl text-2xl font-black text-left border-2 flex justify-between items-center transition-all ${
                  isTaken 
                    ? 'bg-[var(--card)]/40 border-[var(--border)] text-[var(--muted)] cursor-not-allowed opacity-50' 
                    : 'bg-[var(--card)] border-[var(--border)] text-white hover:text-[var(--accent)]'
                }`}
              >
                <div className="flex flex-col">
                  <span className="leading-none">{name}</span>
                  {isTaken && <span className="text-[10px] font-mono mt-1 text-[var(--red)] uppercase tracking-wider">OFFLINE</span>}
                  {!isTaken && <span className="text-[10px] font-mono mt-1 text-[var(--green)] uppercase tracking-wider">READY</span>}
                </div>
                {!isTaken && <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>}
              </motion.button>
            );
          })}
        </div>
        
        {loading && (
          <p className="mt-8 text-[var(--accent)] text-center font-mono text-sm font-bold animate-pulse uppercase tracking-[2px]">
            SYNCHRONISATION...
          </p>
        )}
      </div>
    </div>
  );
};
