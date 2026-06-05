import { motion, AnimatePresence } from 'framer-motion';
import { VoteButton } from './VoteButton';
import { PLAYERS } from '../lib/constants';

interface QuestionCardProps {
  question: { id: number; text: string };
  currentPlayer: string;
  onVote: (votedFor: string) => void;
}

export const QuestionCard = ({ question, currentPlayer, onVote }: QuestionCardProps) => {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[600px] flex flex-col gap-6"
      >
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl">
          <div className="font-mono text-[10px] text-[var(--accent)] tracking-[4px] uppercase mb-4 opacity-70">
            // Question ID: {String(question.id).padStart(3, '0')}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            {question.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {PLAYERS.map((name, i) => (
            <VoteButton
              key={name}
              name={name}
              letter={letters[i]}
              onClick={() => onVote(name)}
              disabled={name === currentPlayer}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
