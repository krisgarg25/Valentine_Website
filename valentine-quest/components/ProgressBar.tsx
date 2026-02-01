import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="retro-border-inset p-1 w-full bg-white h-6 relative">
      <div 
        className="bg-[#000080] h-full" 
        style={{ width: `${Math.min(100, Math.max(0, progress))}%`, transition: 'width 0.2s' }}
      ></div>
      {/* Optional blocks style for pure 95 look */}
      <div className="absolute inset-0 flex gap-1 p-1">
         {/* This is a simplified fill, standard bar is safer for flexible widths */}
      </div>
    </div>
  );
};
