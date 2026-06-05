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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !playerName) {
      navigate('/login');
      return;
    }

    const fetchResults = async () => {
      // Get all votes received by this player in this session
      const { data, error } = await supabase
        .from('votes')
        .select('category')
        .eq('session_id', sessionId)
        .eq('voted_for', playerName);

      if (error) {
        console.error("Error fetching personal results:", error);
      } else {
        const counts: Record<Category, number> = {} as any;
        CATEGORIES.forEach(c => counts[c] = 0);
        data?.forEach(v => {
          if (v.category) counts[v.category as Category]++;
        });
        setPortrait(getPortrait(counts));
      }
      setLoading(false);
    };

    fetchResults();
  }, [sessionId, playerName, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center p-6 pt-12">
      <div className="w-full max-w-[480px] flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
            Ton Portrait
          </h1>
          <p className="text-[#5c6bc0] font-bold">
            Basé sur les votes anonymes du groupe
          </p>
        </header>

        {portrait && (
          <PortraitCard
            title={portrait.title}
            description={portrait.description}
          />
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/results/all')}
          className="mt-8 bg-[#ffd700] text-[#0a0a1a] py-4 rounded-2xl font-black uppercase tracking-widest text-xl shadow-[0_0_20px_rgba(255,215,0,0.3)]"
        >
          Voir tous les scores
        </motion.button>
      </div>
    </div>
  );
};
