import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-[780px] w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 0.7, y: 0 }}
          className="font-mono text-[11px] text-[var(--accent)] tracking-[6px] uppercase mb-6"
        >
          // VIBE CHECK SYSTEM v2.0
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-black mb-6 leading-[0.9] uppercase italic"
          style={{
            background: 'linear-gradient(135deg, #fff 30%, var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          VIBE<br />CHECK
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--muted)] font-mono text-sm md:text-base mb-12 max-w-[500px] mx-auto"
        >
          Analyse comportementale et cartographie de groupe en temps réel.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-[600px] mx-auto">
          {[
            { n: '45', l: 'Questions' },
            { n: '4', l: 'Joueurs' },
            { n: '7', l: 'Modules' },
            { n: '100%', l: 'Anonyme' }
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4"
            >
              <div className="text-2xl font-black text-[var(--accent)] font-mono leading-none">{s.n}</div>
              <div className="text-[9px] text-[var(--muted)] uppercase tracking-wider mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0,229,255,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="bg-gradient-to-br from-[var(--accent)] to-[#0080a0] text-black px-12 py-5 rounded-2xl text-xl font-black uppercase tracking-widest transition-shadow"
        >
          ▶ Initialiser
        </motion.button>
      </div>
    </div>
  );
};
