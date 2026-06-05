import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VoteButtonProps {
  name: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const VoteButton = ({ name, onClick, disabled, className }: VoteButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full py-4 px-6 rounded-2xl text-xl font-bold transition-colors",
        "bg-[#5c6bc0] text-white shadow-lg",
        "hover:bg-[#7986cb] active:bg-[#4caf50]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {name}
    </motion.button>
  );
};
