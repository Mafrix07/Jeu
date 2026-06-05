import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../hooks/useSession';
import { supabase } from '../lib/supabase';
import { getPortrait } from '../lib/portraits';
import type { Category } from '../lib/portraits';
import { PortraitCard } from '../components/PortraitCard';
import { CATEGORIES } from '../lib/constants';

export const ResultsMe = () => {
  const navigate = useNavigate();
  const { sessionId, playerName } = useSession();
  const [portrait, setPortrait] = useState<{ title: string; description: string } | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !playerName) { navigate('/login'); return; }

    const fetchResults = async () => {
      const { data, error } = await supabase
        .from('votes')
        .select('category, comment')
        .eq('session_id', sessionId)
        .eq('voted_for', playerName);

      if (!error && data) {
        const counts: Record<Category, number> = {} as any;
        CATEGORIES.forEach(c => counts[c] = 0);
        data.forEach(v => { if (v.category) counts[v.category as Category]++; });
        setPortrait(getPortrait(counts));

        const received = data
          .map(v => v.comment as string | null)
          .filter((c): c is string => !!c && c.trim().length > 0);
        setComments(received);
      }
      setLoading(false);
    };

    fetchResults();
  }, [sessionId, playerName, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-12 pb-20">
      <div className="w-full max-w-[600px] flex flex-col gap-10">
        <header className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="font-mono text-[10px] text-[var(--accent)] tracking-[6px] uppercase mb-4"
          >
            // PERSONAL_DOSSIER
          </motion.div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
            TON PROFIL
          </h1>
          <p className="text-[var(--muted)] font-mono text-xs uppercase tracking-widest">
            {playerName} — basé sur les votes anonymes
          </p>
        </header>

        {portrait && (
          <PortraitCard title={portrait.title} description={portrait.description} />
        )}

        {/* Anonymous comments */}
        {comments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-3"
          >
            <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-[4px]">
              // CE QUE LE GROUPE A DIT DE TOI
            </div>
            {comments.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="bg-[var(--card)] border-l-2 border-[var(--accent2)] rounded-xl px-5 py-4 text-[var(--text)] text-sm italic"
              >
                "{c}"
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0,229,255,0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/results/all')}
          className="bg-transparent border-2 border-[var(--accent)] text-[var(--accent)] py-5 rounded-2xl font-black uppercase tracking-[3px] text-lg"
        >
          Voir les résultats du groupe
        </motion.button>

        <button
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          className="text-[var(--muted)] font-mono text-[10px] uppercase tracking-widest hover:text-[var(--red)] transition-colors"
        >
          // TERMINER_LA_SESSION
        </button>
      </div>
    </div>
  );
};
