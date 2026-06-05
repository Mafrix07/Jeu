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
      className="bg-[#1a1a2e] border-2 border-[#ffd700] rounded-3xl p-8 shadow-2xl"
    >
      <h3 className="text-[#ffd700] text-2xl font-black mb-4 uppercase tracking-tighter">
        {title}
      </h3>
      <p className="text-white text-lg leading-relaxed italic">
        "{description}"
      </p>
    </motion.div>
  );
};
