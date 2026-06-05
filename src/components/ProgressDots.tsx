interface ProgressDotsProps {
  current: number;
  total: number;
}

export const ProgressDots = ({ current, total }: ProgressDotsProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-[#5c6bc0] font-mono text-sm">
        {current} / {total}
      </div>
      <div className="w-full h-2 bg-[#1a1a2e] rounded-full overflow-hidden max-w-[200px]">
        <div
          className="h-full bg-[#ffd700] transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};
