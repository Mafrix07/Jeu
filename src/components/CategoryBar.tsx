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
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-end px-1">
        <span className="text-white font-bold flex items-center gap-2">
          {label} {isWinner && <span className="text-[#ffd700]">👑</span>}
        </span>
        <span className="text-[#5c6bc0] font-mono">{value}</span>
      </div>
      <div className="h-4 bg-[#1a1a2e] rounded-full overflow-hidden border border-[#2a2a4e]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${isWinner ? 'bg-[#ffd700]' : 'bg-[#5c6bc0]'}`}
        />
      </div>
    </div>
  );
};
