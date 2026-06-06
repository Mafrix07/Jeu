import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { useVotes } from '../hooks/useVotes';
import { getQuestionsForRound } from '../lib/questions';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressDots } from '../components/ProgressDots';
import { supabase } from '../lib/supabase';

export const Vote = () => {
  const navigate = useNavigate();
  const { sessionId, playerName, currentRound, getRound } = useSession();
  const { submitVote } = useVotes(sessionId, playerName);
  
  const [roundQuestions, setRoundQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !playerName) {
      navigate('/login');
      return;
    }

    const initVote = async () => {
      // 1. Get latest round from DB
      const latestRound = await getRound(sessionId);
      
      // 2. Load questions for this round
      const questions = getQuestionsForRound(latestRound);
      
      // Seeded shuffle based on sessionId + round
      const seed = sessionId.split('-')[0] + latestRound;
      const seeded = [...questions].sort((a, b) => {
        return (a.id + seed).length % 7 - (b.id + seed).length % 7;
      });
      setRoundQuestions(seeded);

      // 3. Check progress in this round
      const { data } = await supabase
        .from('progress')
        .select('questions_answered, round_completed')
        .eq('session_id', sessionId)
        .eq('player_name', playerName)
        .single();

      if (data) {
        // If already completed this round, go to waiting
        if (data.round_completed >= latestRound) {
          navigate('/waiting');
          return;
        }
        setCurrentIndex(data.questions_answered);
      }
      setLoading(false);
    };

    initVote();
  }, [sessionId, playerName, navigate]);

  const handleVote = async (votedFor: string) => {
    if (currentIndex >= roundQuestions.length) return;
    
    const isRoundDone = await submitVote(
      roundQuestions[currentIndex].id, 
      votedFor, 
      currentRound
    );

    if (isRoundDone) {
      navigate('/waiting');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (loading || currentIndex >= roundQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--accent)] font-mono text-sm animate-pulse uppercase tracking-widest">
          SYNCING ROUND {currentRound.toString().padStart(2, '0')}...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 pt-10">
      <div className="w-full max-w-[520px] flex flex-col gap-10 items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="font-mono text-[10px] text-[var(--accent2)] uppercase tracking-[4px]">
            // ACTIVE_SESSION: R{currentRound.toString().padStart(2, '0')}
          </div>
          <ProgressDots current={currentIndex} total={roundQuestions.length} />
        </div>

        <QuestionCard
          question={roundQuestions[currentIndex]}
          currentPlayer={playerName!}
          onVote={handleVote}
        />

        <div className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-[3px] opacity-60">
          // vote_anonymous — r{currentRound} — p{currentIndex + 1}/{roundQuestions.length}
        </div>
      </div>
    </div>
  );
};
