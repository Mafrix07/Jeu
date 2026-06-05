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
      // Find active session
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

        // Subscribe to changes
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
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[400px]">
        <h2 className="text-3xl font-black text-white mb-8 text-center uppercase italic tracking-tight">
          C'est qui ?
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
                whileHover={!isTaken && !loading ? { x: 10, backgroundColor: '#5c6bc0' } : {}}
                onClick={() => !isTaken && handlePick(name)}
                disabled={loading || isTaken}
                className={`p-6 rounded-2xl text-2xl font-bold text-left border-l-8 flex justify-between items-center group transition-all ${
                  isTaken 
                    ? 'bg-[#1a1a2e]/40 text-white/20 border-gray-700 cursor-not-allowed' 
                    : 'bg-[#1a1a2e] text-white border-[#ffd700]'
                }`}
              >
                <span>
                  {name}
                  {isTaken && <span className="ml-4 text-xs font-normal opacity-50">(Déjà connecté)</span>}
                </span>
                {!isTaken && <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>}
              </motion.button>
            );
          })}
        </div>
        
        {loading && (
          <p className="mt-8 text-[#5c6bc0] text-center font-bold animate-pulse">
            Connexion en cours...
          </p>
        )}
      </div>
    </div>
  );
};
