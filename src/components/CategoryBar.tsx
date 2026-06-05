import { motion } from 'framer-motion';

interface CategoryBarProps {
  label: string;
  value: number;
  max: number;
  isWinner?: boolean;
}

export const CategoryBar = ({ label, value, max, isWinner }: CategoryBarProps) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="flex flex-col gap-1.5 w-full group">
      <div className="flex justify-between items-end px-1">
        <span className="text-white font-black uppercase text-sm tracking-wider flex items-center gap-2">
          {label} {isWinner && <span className="text-[var(--accent)] font-mono text-xs">👑 [WINNER]</span>}
        </span>
        <span className="text-[var(--accent)] font-mono text-xs font-bold">{value} VDT</span>
      </div>
      <div className="h-3 bg-[var(--surface)] rounded-md overflow-hidden border border-[var(--border)] relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className={`h-full relative z-10 ${isWinner ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]' : 'bg-[var(--border)] group-hover:bg-[var(--muted)]'}`}
        />
        {/* Sub grid line inside bar */}
        <div className="absolute inset-0 z-0 flex justify-between opacity-10 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-px h-full bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
};
