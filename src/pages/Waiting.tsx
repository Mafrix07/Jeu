import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../hooks/useSession';
import { useProgress } from '../hooks/useProgress';

export const Waiting = () => {
  const navigate = useNavigate();
  const { sessionId } = useSession();
  const { players, allDone, doneCount, loading } = useProgress(sessionId);

  useEffect(() => {
    if (allDone) {
      const timer = setTimeout(() => {
        navigate('/results/me');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [allDone, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-12"
      >
        <div className="font-mono text-[10px] text-[var(--accent)] tracking-[6px] uppercase mb-4 opacity-70">
          // SYNCHRONIZATION_PHASE
        </div>
        <div className="text-[var(--accent)] text-8xl font-black mb-2 font-mono tabular-nums leading-none">
          {doneCount}<span className="text-[var(--border)]">/</span>4
        </div>
        <div className="text-[var(--muted)] text-sm font-bold uppercase tracking-[4px]">
          Membres Connectés
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 w-full max-w-[340px]">
        {players.map((p) => (
          <div
            key={p.player_name}
            className="flex justify-between items-center bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)]"
          >
            <span className="text-white font-black uppercase text-sm tracking-widest">{p.player_name}</span>
            {p.is_done ? (
              <div className="flex items-center gap-2">
                <span className="text-[var(--green)] font-mono text-[10px] font-bold">STABLE</span>
                <div className="w-2 h-2 rounded-full bg-[var(--green)] shadow-[0_0_10px_var(--green)]" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent)] font-mono text-[10px] font-bold">UPLOADING</span>
                <motion.div
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 rounded-full bg-[var(--accent)]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {allDone && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-12 text-[var(--accent)] font-black text-xl font-mono uppercase tracking-[2px]"
        >
          {'>>>'} ACCÈS AUX RÉSULTATS AUTORISÉ
        </motion.div>
      )}
    </div>
  );
};
