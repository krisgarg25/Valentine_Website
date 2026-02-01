"use client";

import React, { useState } from 'react';
import { RetroWindow } from './RetroWindow';
import { RetroButton } from './RetroButton';
import { RefreshCw } from 'lucide-react';

interface CaptchaWindowProps {
  onSuccess: () => void;
}

const ITEMS = [
    { id: 1, image: '/4.webp', isTarget: false },
    { id: 2, image: '/1.jpeg', isTarget: true }, 
    { id: 3, image: '/5.webp', isTarget: false },
    { id: 4, image: '/6.webp', isTarget: false },
    { id: 5, image: '/2.jpeg', isTarget: true },
    { id: 6, image: '/7.webp', isTarget: false },
    { id: 7, image: '/3.jpeg', isTarget: true }, 
    { id: 8, image: '/8.webp', isTarget: false },
    { id: 9, image: '/9.webp', isTarget: false },
];

export const CaptchaWindow: React.FC<CaptchaWindowProps> = ({ onSuccess }) => {
  const [selected, setSelected] = useState<number[]>([]);

  // attempts state removed as it is no longer used
  const [error, setError] = useState("");

  const toggleSelect = (id: number) => {
    setSelected(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    setError(""); // Clear error on interaction
  };

  const handleVerify = () => {
    // Correct Logic: Check if selected items match exactly with target items
    const targetIds = ITEMS.filter(i => i.isTarget).map(i => i.id);
    const isCorrect = selected.length === targetIds.length && selected.every(id => targetIds.includes(id));

    if (isCorrect) {
        onSuccess();
    } else {
        setError("Verification Failed. Please select ALL correct items.");
        // Optional: clear selection or shake, but let's keep selection for easier correction
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-[320px]">
      <RetroWindow title="Security Check" className="bg-gray-200 w-full">
        <div className="p-4 bg-white border border-gray-400 w-full">
            <div className="bg-[#000080] text-white p-4 mb-2">
                <p className="text-xs">Select all squares with</p>
                <p className="text-xl font-bold font-retro tracking-wider">HUSBAND MATERIAL</p>
            </div>
            
            <div className="grid grid-cols-3 gap-1 mb-2">
                {ITEMS.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => toggleSelect(item.id)}
                        className={`
                            relative w-full aspect-square flex items-center justify-center text-4xl cursor-pointer border-2 transition-all overflow-hidden
                            ${selected.includes(item.id) 
                                ? 'border-blue-600 bg-blue-100 scale-95' 
                                : 'border-transparent hover:bg-gray-100'}
                        `}
                    >
                        {/* Image is always present now */}
                        <img src={item.image} alt="Captcha item" className="w-full h-full object-cover pointer-events-none" />

                        
                        {/* Checkmark overlay for selection */}
                        {selected.includes(item.id) && (
                            <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center text-xs shadow-md z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>

             {error && (
                <div className="text-red-600 text-xs mb-2 font-bold text-center animate-pulse">
                    {error}
                </div>
            )}
            
            <div className="flex justify-between items-center sm:gap-4 gap-2">
                <RefreshCw size={16} className="text-gray-500 cursor-pointer hover:rotate-180 transition-transform shrink-0" />
                <RetroButton onClick={handleVerify} className="px-6 flex-1">VERIFY</RetroButton>
            </div>
        </div>
      </RetroWindow>
    </div>
  );
};
