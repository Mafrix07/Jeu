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
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-8"
      >
        <div className="text-[#ffd700] text-6xl font-black mb-2">
          {doneCount} / 4
        </div>
        <div className="text-[#5c6bc0] text-xl font-bold uppercase tracking-widest">
          Joueurs prêts
        </div>
      </motion.div>

      <div className="space-y-4 w-full max-w-[300px]">
        {players.map((p) => (
          <div
            key={p.player_name}
            className="flex justify-between items-center bg-[#1a1a2e] p-4 rounded-xl border border-[#2a2a4e]"
          >
            <span className="text-white font-bold">{p.player_name}</span>
            {p.is_done ? (
              <span className="text-[#4caf50] font-black">PRÊT</span>
            ) : (
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[#5c6bc0] font-mono"
              >
                EN COURS...
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {allDone && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-12 text-[#ffd700] font-black text-2xl animate-bounce"
        >
          RÉSULTATS DISPONIBLES !
        </motion.div>
      )}
    </div>
  );
};
