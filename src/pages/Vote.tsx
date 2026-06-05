import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { useVotes } from '../hooks/useVotes';
import { questions } from '../lib/questions';
import { QuestionCard } from '../components/QuestionCard';
import { ProgressDots } from '../components/ProgressDots';
import { supabase } from '../lib/supabase';

export const Vote = () => {
  const navigate = useNavigate();
  const { sessionId, playerName } = useSession();
  const { submitVote } = useVotes(sessionId, playerName);
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId || !playerName) {
      navigate('/login');
      return;
    }

    const loadProgress = async () => {
      const { data } = await supabase
        .from('progress')
        .select('questions_answered')
        .eq('session_id', sessionId)
        .eq('player_name', playerName)
        .single();

      if (data) {
        if (data.questions_answered >= questions.length) {
          navigate('/waiting');
          return; // Stop execution here
        }
        setCurrentIndex(data.questions_answered);
      }
      setLoading(false);
    };

    loadProgress();

    if (sessionId) {
      const seed = sessionId.split('-')[0];
      const seeded = [...questions].sort((a, b) => {
        const hashA = (a.id + seed).length % 7;
        const hashB = (b.id + seed).length % 7;
        return hashA - hashB;
      });
      setShuffledQuestions(seeded);
    }
  }, [sessionId, playerName, navigate]);

  const handleVote = async (votedFor: string) => {
    // Safety check for index
    if (currentIndex >= shuffledQuestions.length) return;

    const isDone = await submitVote(shuffledQuestions[currentIndex].id, votedFor);
    if (isDone) {
      navigate('/waiting');
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Prevent crash if index out of bounds before redirection
  if (loading || currentIndex >= shuffledQuestions.length) {
    return (
      <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center">
        <div className="text-[#5c6bc0] animate-pulse font-bold">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex flex-col items-center p-6 pt-12">
      <div className="w-full max-w-[480px] flex flex-col gap-12 items-center">
        <ProgressDots current={currentIndex} total={questions.length} />

        <QuestionCard
          question={shuffledQuestions[currentIndex]}
          currentPlayer={playerName!}
          onVote={handleVote}
        />

        <div className="mt-auto pt-8 text-[#5c6bc0]/40 font-mono text-xs text-center uppercase tracking-widest">
          Ton vote est anonyme
        </div>
      </div>
    </div>
  );
};
