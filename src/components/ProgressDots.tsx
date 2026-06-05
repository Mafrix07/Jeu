import { motion } from 'framer-motion';

export const ProgressDots = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-[600px] mb-8">
      <div className="flex justify-between items-center mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
        <div>Progress</div>
        <div>
          <span className="text-[var(--accent)] font-bold">{current}</span> / {total}
        </div>
      </div>
      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]"
        />
      </div>
    </div>
  );
};
