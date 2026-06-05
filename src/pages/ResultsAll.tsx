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
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center p-6 pt-12">
      <div className="w-full max-w-[480px] flex flex-col gap-12">
        <header className="text-center">
          <h1 className="text-4xl font-black text-[#ffd700] uppercase italic tracking-tighter mb-2">
            Verdict Global
          </h1>
          <p className="text-white/60 font-mono text-sm uppercase">
            Classement par catégorie
          </p>
        </header>

        <div className="space-y-12">
          {results.map((res, i) => (
            <motion.section
              key={res.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1a1a2e]/50 p-6 rounded-3xl border border-[#2a2a4e]"
            >
              <h2 className="text-[#5c6bc0] text-xl font-black uppercase mb-6 tracking-widest border-b border-[#2a2a4e] pb-2">
                {res.category}
              </h2>
              <div className="space-y-4">
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

        <button
          onClick={() => navigate('/')}
          className="text-[#5c6bc0] font-bold uppercase tracking-widest hover:text-white transition-colors mb-12"
        >
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
};
