import { motion } from 'framer-motion';

interface PortraitCardProps {
  title: string;
  description: string;
  delay?: number;
}

export const PortraitCard = ({ title, description, delay = 0 }: PortraitCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-[var(--card)] border-2 border-[var(--accent)] rounded-3xl p-8 shadow-[0_0_30px_rgba(0,229,255,0.1)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]" />
      <div className="font-mono text-[10px] text-[var(--accent)] tracking-[4px] uppercase mb-4 opacity-70">
        // PROFILE_ANALYSIS_COMPLETE
      </div>
      <h3 className="text-[var(--accent)] text-2xl font-black mb-4 uppercase tracking-tighter italic">
        {title}
      </h3>
      <p className="text-white text-lg leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
};
