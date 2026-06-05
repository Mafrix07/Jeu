import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSession } from '../hooks/useSession';
import { supabase } from '../lib/supabase';
import { CategoryBar } from '../components/CategoryBar';
import { CATEGORIES, PLAYERS } from '../lib/constants';
import { Category } from '../lib/portraits';

interface GroupResult {
  category: Category;
  rankings: { name: string; votes: number }[];
}

export const ResultsAll = () => {
  const navigate = useNavigate();
  const { sessionId } = useSession();
  const [results, setResults] = useState<GroupResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      navigate('/login');
      return;
    }

    const fetchAllResults = async () => {
      const { data, error } = await supabase
        .from('votes')
        .select('category, voted_for')
        .eq('session_id', sessionId);

      if (error) {
        console.error("Error fetching group results:", error);
      } else {
        const aggregated = CATEGORIES.map(cat => {
          const rankings = PLAYERS.map(player => ({
            name: player,
            votes: data?.filter(v => v.category === cat && v.voted_for === player).length || 0
          })).sort((a, b) => b.votes - a.votes);

          return { category: cat as Category, rankings };
        });
        setResults(aggregated);
      }
      setLoading(false);
    };

    fetchAllResults();
  }, [sessionId, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-12 pb-20">
      <div className="w-full max-w-[600px] flex flex-col gap-12">
        <header className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="font-mono text-[10px] text-[var(--accent)] tracking-[6px] uppercase mb-4"
          >
            // GLOBAL_ANALYTICS
          </motion.div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
            RÉSULTATS DU GROUPE
          </h1>
          <p className="text-[var(--muted)] font-mono text-xs uppercase tracking-widest">
            SESSION DATA STREAM — {new Date().toLocaleDateString()}
          </p>
        </header>

        <div className="space-y-8">
          {results.map((res, i) => (
            <motion.section
              key={res.category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--card)]/50 p-6 rounded-3xl border border-[var(--border)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 font-mono text-[40px] font-black group-hover:opacity-20 transition-opacity select-none pointer-events-none">
                {(i + 1).toString().padStart(2, '0')}
              </div>
              <h2 className="text-[var(--accent)] text-lg font-black uppercase mb-8 tracking-[4px] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[var(--accent2)]" />
                {res.category}
              </h2>
              <div className="space-y-6">
                {res.rankings.map((rank, j) => (
                  <CategoryBar
                    key={rank.name}
                    label={rank.name}
                    value={rank.votes}
                    max={res.rankings[0].votes}
                    isWinner={j === 0 && rank.votes > 0}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 mt-10">
          <button
            onClick={() => navigate('/')}
            className="text-[var(--accent)] font-mono text-sm font-black uppercase tracking-widest hover:text-white transition-colors"
          >
            {'>>>'} RETOUR_ACCUEIL
          </button>
        </div>
      </div>
    </div>
  );
};
