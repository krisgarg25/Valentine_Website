import React from 'react';
import { X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  isActive?: boolean;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, onClose, className, isActive = true }) => {
  return (
    <div className={twMerge('retro-border p-1 inline-block min-w-[300px]', isActive ? 'z-50' : 'z-10', className)}>
      <div className={twMerge('window-header', !isActive && 'bg-gray-500 bg-none')}>
        <span className="truncate">{title}</span>
        <button 
            onClick={onClose} 
            className="retro-button p-0 h-5 w-5 !min-w-0 !min-h-0 flex items-center justify-center ml-2 bg-gray-300"
            aria-label="Close"
        >
          <X size={12} strokeWidth={3} className="text-black" />
        </button>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};
