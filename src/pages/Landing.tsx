import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-black text-[#ffd700] uppercase tracking-tighter italic">
          VIBE CHECK
        </h1>
        <p className="text-[#5c6bc0] text-xl md:text-2xl font-bold mt-2">
          Le portrait craché de ton groupe.
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/login')}
        className="bg-[#5c6bc0] text-white px-12 py-6 rounded-full text-2xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(92,107,192,0.4)] hover:bg-[#7986cb] transition-colors"
      >
        Commencer
      </motion.button>

      <div className="absolute bottom-8 text-[#5c6bc0]/40 font-mono text-sm">
        Anonymat garanti par SHA-256
      </div>
    </div>
  );
};
