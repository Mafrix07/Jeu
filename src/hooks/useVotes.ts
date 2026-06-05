import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { generateVoterHash } from '../lib/hash';
import { questions } from '../lib/questions';

export const useVotes = (sessionId: string | null, playerName: string | null) => {
  const [loading, setLoading] = useState(false);

  const submitVote = async (questionId: number, votedFor: string) => {
    if (!sessionId || !playerName) return;

    setLoading(true);
    try {
      const voterHash = generateVoterHash(sessionId, playerName);
      const question = questions.find(q => q.id === questionId);

      if (!question) throw new Error("Question not found");

      // Save vote
      const { error: voteError } = await supabase.from('votes').insert({
        session_id: sessionId,
        voter_hash: voterHash,
        question_id: questionId,
        voted_for: votedFor,
        category: question.category
      });

      if (voteError) throw voteError;

      // Update progress
      const { data: progress } = await supabase
        .from('progress')
        .select('questions_answered')
        .eq('session_id', sessionId)
        .eq('player_name', playerName)
        .single();

      const newCount = (progress?.questions_answered || 0) + 1;
      const isDone = newCount >= questions.length;

      await supabase
        .from('progress')
        .update({
          questions_answered: newCount,
          is_done: isDone
        })
        .eq('session_id', sessionId)
        .eq('player_name', playerName);

      return isDone;
    } catch (err) {
      console.error("Error submitting vote:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitVote, loading };
};
