import { motion, AnimatePresence } from 'framer-motion';
import { VoteButton } from './VoteButton';
import { PLAYERS } from '../lib/constants';

interface QuestionCardProps {
  question: { id: number; text: string };
  currentPlayer: string;
  onVote: (votedFor: string) => void;
}

export const QuestionCard = ({ question, currentPlayer, onVote }: QuestionCardProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[480px] flex flex-col gap-8"
      >
        <h2 className="text-3xl font-bold text-[#ffd700] text-center min-h-[80px] flex items-center justify-center px-4">
          {question.text}
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {PLAYERS.map((name) => (
            <VoteButton
              key={name}
              name={name}
              onClick={() => onVote(name)}
              disabled={name === currentPlayer}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
