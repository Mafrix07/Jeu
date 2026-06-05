import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '../hooks/useSession';
import { useVotes } from '../hooks/useVotes';
import { questions } from '../lib/questions';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressDots } from '../components/ProgressDots';
import { supabase } from '../lib/supabase';

const COMMENT_DELAY = 5;

export const Vote = () => {
  const navigate = useNavigate();
  const { sessionId, playerName } = useSession();
  const { submitVote } = useVotes(sessionId, playerName);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Comment phase
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [timeLeft, setTimeLeft] = useState(COMMENT_DELAY);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sessionId || !playerName) { navigate('/login'); return; }

    const loadProgress = async () => {
      const { data } = await supabase
        .from('progress')
        .select('questions_answered')
        .eq('session_id', sessionId)
        .eq('player_name', playerName)
        .single();

      if (data) {
        if (data.questions_answered >= questions.length) { navigate('/waiting'); return; }
        setCurrentIndex(data.questions_answered);
      }
      setLoading(false);
    };

    loadProgress();

    const seed = sessionId.split('-')[0];
    const seeded = [...questions].sort((a, b) =>
      ((a.id + seed).length % 7) - ((b.id + seed).length % 7)
    );
    setShuffledQuestions(seeded);
  }, [sessionId, playerName, navigate]);

  // Start countdown when a name is selected
  useEffect(() => {
    if (!selectedName) return;
    setTimeLeft(COMMENT_DELAY);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [selectedName]);

  const handleNameClick = (name: string) => {
    setSelectedName(name);
    setComment('');
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const name = selectedName;
    const c = comment;
    setSelectedName(null);
    setComment('');

    submitVote(shuffledQuestions[currentIndex].id, name!, c || undefined).then(isDone => {
      if (isDone) navigate('/waiting');
      else setCurrentIndex(prev => prev + 1);
    });
  };

  if (loading || currentIndex >= shuffledQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--accent)] font-mono text-sm animate-pulse uppercase tracking-widest">CHARGEMENT...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-10">
      <div className="w-full max-w-[520px] flex flex-col gap-8 items-center">
        <ProgressDots current={currentIndex} total={questions.length} />

        <AnimatePresence mode="wait">
          {!selectedName ? (
            <motion.div key="question" className="w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <QuestionCard
                question={shuffledQuestions[currentIndex]}
                currentPlayer={playerName!}
                onVote={handleNameClick}
              />
            </motion.div>
          ) : (
            <motion.div
              key="comment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col gap-5"
            >
              {/* Selected answer recap */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
                <div className="font-mono text-[10px] text-[var(--green)] tracking-[3px] uppercase mb-2">
                  ✓ VOTE ENREGISTRÉ
                </div>
                <p className="text-white font-bold text-lg">{shuffledQuestions[currentIndex].text}</p>
                <p className="text-[var(--accent)] font-black text-xl mt-1">{selectedName}</p>
              </div>

              {/* Comment input */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5 flex flex-col gap-4">
                <label className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-[3px]">
                  // COMMENTAIRE OPTIONNEL
                </label>
                <textarea
                  autoFocus
                  maxLength={80}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  placeholder="Ajoute une vanne... (max 80 car.)"
                  className="bg-transparent text-white placeholder-[var(--muted)] text-sm resize-none outline-none font-sans w-full h-16"
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
                />
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[var(--muted)]">{comment.length}/80</span>
                  <span className="font-mono text-[10px] text-[var(--accent)]">auto dans {timeLeft}s</span>
                </div>
                {/* Countdown bar */}
                <div className="h-[2px] bg-[var(--border)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--accent)]"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: COMMENT_DELAY, ease: 'linear' }}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-black bg-gradient-to-r from-[var(--accent)] to-[#0080a0] text-lg"
              >
                Continuer →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-[3px] opacity-50">
          // vote_anonymous — SHA-256
        </div>
      </div>
    </div>
  );
};
