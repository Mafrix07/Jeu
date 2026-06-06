import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../hooks/useSession';
import { useProgress } from '../hooks/useProgress';

export const Waiting = () => {
  const navigate = useNavigate();
  const { sessionId, currentRound, getRound } = useSession();
  const { players, isRoundFinished, getFinishedCount, loading } = useProgress(sessionId);
  const [localRound, setLocalRound] = useState(currentRound);

  useEffect(() => {
    if (sessionId) {
      getRound(sessionId).then(setLocalRound);
    }
  }, [sessionId]);

  const allReady = isRoundFinished(localRound);
  const doneCount = getFinishedCount(localRound);

  const handleShowResults = () => {
    navigate('/results/me');
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-12"
      >
        <div className="font-mono text-[10px] text-[var(--accent)] tracking-[6px] uppercase mb-4 opacity-70">
          // ROUND_{localRound.toString().padStart(2, '0')}_SYNC
        </div>
        <div className="text-[var(--accent)] text-8xl font-black mb-2 font-mono tabular-nums leading-none">
          {doneCount}<span className="text-[var(--border)]">/</span>4
        </div>
        <div className="text-[var(--muted)] text-sm font-bold uppercase tracking-[4px]">
          Synchronisés
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 w-full max-w-[340px] mb-12">
        {players.map((p) => (
          <div
            key={p.player_name}
            className="flex justify-between items-center bg-[var(--card)] p-5 rounded-2xl border border-[var(--border)]"
          >
            <span className="text-white font-black uppercase text-sm tracking-widest">{p.player_name}</span>
            {p.round_completed >= localRound ? (
              <div className="flex items-center gap-2">
                <span className="text-[var(--green)] font-mono text-[10px] font-bold">READY</span>
                <div className="w-2 h-2 rounded-full bg-[var(--green)] shadow-[0_0_10px_var(--green)]" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent2)] font-mono text-[10px] font-bold">VOTING...</span>
                <motion.div
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-2 h-2 rounded-full bg-[var(--accent2)]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {allReady ? (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,229,255,0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShowResults}
          className="bg-gradient-to-br from-[var(--accent)] to-[#0080a0] text-black px-10 py-5 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl"
        >
          >>> VOIR RÉSULTATS R{localRound}
        </motion.button>
      ) : (
        <div className="text-[var(--muted)] font-mono text-[10px] uppercase tracking-[2px] animate-pulse">
          En attente des autres membres de l'escouade...
        </div>
      )}
    </div>
  );
};
