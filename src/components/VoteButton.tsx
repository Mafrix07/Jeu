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
  letter: string;
}

export const VoteButton = ({ name, onClick, disabled, letter }: VoteButtonProps) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, borderColor: 'var(--accent)', backgroundColor: 'rgba(0,229,255,0.06)' } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group flex items-center gap-4 w-full p-4 rounded-xl border-2 transition-all text-left",
        "bg-[var(--surface)] border-[var(--border)] text-[var(--text)]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        !disabled && "hover:text-white"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm transition-all",
        "bg-[var(--border)] text-[var(--muted)]",
        !disabled && "group-hover:bg-[var(--accent)] group-hover:text-black"
      )}>
        {letter}
      </div>
      <span className="text-lg font-bold">{name}</span>
    </motion.button>
  );
};
