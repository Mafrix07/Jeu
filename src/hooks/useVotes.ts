import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { generateVoterHash } from '../lib/hash';
import { ALL_QUESTIONS, getQuestionsForRound } from '../lib/questions';

export const useVotes = (sessionId: string | null, playerName: string | null) => {
  const [loading, setLoading] = useState(false);

  const submitVote = async (questionId: number, votedFor: string, round: number) => {
    if (!sessionId || !playerName) return;

    setLoading(true);
    try {
      const voterHash = generateVoterHash(sessionId, playerName);
      const question = ALL_QUESTIONS.find(q => q.id === questionId);

      if (!question) throw new Error("Question not found");

      // 1. Save vote with round
      const { error: voteError } = await supabase.from('votes').insert({
        session_id: sessionId,
        voter_hash: voterHash,
        question_id: questionId,
        voted_for: votedFor,
        category: question.category,
        round: round
      });

      if (voteError) throw voteError;

      // 2. Update progress
      const questionsInRound = getQuestionsForRound(round);
      
      // Get all votes for this player in this round to count
      const { data: roundVotes } = await supabase
        .from('votes')
        .select('id')
        .eq('session_id', sessionId)
        .eq('voter_hash', voterHash)
        .eq('round', round);

      const answeredInRound = roundVotes?.length || 0;
      const isRoundDone = answeredInRound >= questionsInRound.length;

      // Update progress table
      const updateData: any = {
        questions_answered: answeredInRound
      };
      
      if (isRoundDone) {
        updateData.round_completed = round;
        if (round === 3) updateData.is_done = true;
      }

      await supabase
        .from('progress')
        .update(updateData)
        .eq('session_id', sessionId)
        .eq('player_name', playerName);

      return isRoundDone;
    } catch (err) {
      console.error("Error submitting vote:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { submitVote, loading };
};
