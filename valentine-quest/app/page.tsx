"use client";

"use client";

import { useState, useEffect } from 'react';
import { RetroWindow } from '../components/RetroWindow';
import { RetroButton } from '../components/RetroButton';
import { RunawayButton } from '../components/RunawayButton';
import { CaptchaWindow } from '../components/CaptchaWindow';
import { ProgressBar } from '../components/ProgressBar';
import { Heart, AlertTriangle, FileHeart, Trash2, Mail, Lock } from 'lucide-react';

interface Popup {
  id: number;
  x: number;
  y: number;
  title: string;
  content: React.ReactNode;
}

export default function Home() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [currentStep, setCurrentStep] = useState<'ask' | 'captcha' | 'loading' | 'success'>('ask');
  const [noCount, setNoCount] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing Love Protocol...");

  // Sound effects (simulated with standard browser beep if possible, or just visual for now)
  const playErrorSound = () => {
    // In a real browser env without user interaction first, audio is blocked.
    // relying on visual chaos.
  };

  const handleLoveLetter = () => {
    const id = Date.now();
    setPopups(prev => [...prev, {
        id,
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 100,
        title: "Access Denied",
        content: (
            <div className="flex flex-col gap-2 items-center p-2">
                <Lock className="w-8 h-8 text-red-600" />
                <p className="font-bold text-red-600">NICE TRY!</p>
                <p>You're not gonna get it this easily ;)</p>
                <RetroButton onClick={() => closePopup(id)}>Okay...</RetroButton>
            </div>
        )
    }]);
  };

  const spawnPopup = (type: 'spam' | 'error' | 'plea') => {
    const id = Date.now() + Math.random(); // Ensure unique ID
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    
    // Bounds: Keep away from edges
    const maxWidth = typeof window !== 'undefined' ? window.innerWidth : 500;
    const maxHeight = typeof window !== 'undefined' ? window.innerHeight : 500;
    
    // For mobile, try to center somewhat or ensure it's not offscreen
    const popupWidth = 300; 
    const popupHeight = 200;
    
    const x = Math.max(10, Math.random() * (maxWidth - popupWidth - 20));
    const y = Math.max(10, Math.random() * (maxHeight - popupHeight - 20));

    let title = "System Notification";
    let content = <div className="text-sm">Information</div>;

    if (type === 'spam') {
      // Logic removed as per user request to stop "Claim Prize" spam
      return; 
    } else if (type === 'error') {
      title = "Critical Error";
      content = (
        <div className="flex flex-col gap-2 items-center">
          <AlertTriangle className="text-yellow-600" size={32} />
          <p>The operation "No" is illegal.</p>
          <div className="flex gap-2">
            <RetroButton onClick={() => closePopup(id)}>Ok</RetroButton>
            <RunawayButton className="bg-red-200">Cancel</RunawayButton>
          </div>
        </div>
      );
    } else if (type === 'plea') {
      // ... existing plea logic if needed
    }

    setPopups(prev => [...prev, { id, x, y, title, content }]);
  };

  const handleNo = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    playErrorSound();
    
    // Logic: 
    // Always just spawn Error (Runaway button)
    spawnPopup('error');
  };

  const handleInitialYes = () => {
    setPopups([]); // Clear chaos
    setCurrentStep('captcha');
  };

  const handleCaptchaSuccess = () => {
    setCurrentStep('loading');
    startPhonyLoading();
  };

  const handleSecretClick = () => {
    // Hidden exit hatch
    setCurrentStep('success');
  };

  const startPhonyLoading = () => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 99) progress = 99; // Stall at 99
        
        setLoadingProgress(progress);

        // Flavour text updates
        if (progress < 30) setLoadingText("Analyzing Compatibility...");
        else if (progress < 60) setLoadingText("Calculating Future Happiness...");
        else if (progress < 90) setLoadingText("Negotiating with Fate...");
        else setLoadingText("Finalizing Soulmate Connection (This might take a while)...");

        if (progress >= 99) {
           clearInterval(interval);
           // After a painful delay at 99%, we finish
           setTimeout(() => {
             setCurrentStep('success');
           }, 5000); // 5 second stall at 99%
        }
    }, 200);
  };

  const closePopup = (id: number) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  return (
    <main className="h-screen w-screen relative overflow-hidden retro-bg" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'2\' height=\'2\' viewBox=\'0 0 2 2\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23008080\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M1 1h1v1H1zM0 0h1v1H0z\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '4px 4px'
    }}>
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-6 z-0">
        <div className="desktop-icon" onClick={handleLoveLetter}>
          <FileHeart size={32} />
          <span className="text-xs drop-shadow-md">Love_Letter.txt</span>
        </div>
        <div className="desktop-icon" onDoubleClick={() => spawnPopup('spam')}>
          <Mail size={32} />
          <span className="text-xs drop-shadow-md">Inbox (99+)</span>
        </div>
        <div className="desktop-icon">
          <Trash2 size={32} />
          <span className="text-xs drop-shadow-md">Recycle Bin</span>
        </div>
      </div>

      {/* Secret Button (Bottom Right Pixel) */}
      <div 
        className="absolute bottom-0 right-0 w-4 h-4 cursor-crosshair z-[200] opacity-0 hover:opacity-50 bg-red-500"
        onClick={handleSecretClick}
        title="Admin Bypass"
      ></div>

      {/* STEP 1: Main Window */}
      {currentStep === 'ask' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all w-[95%] max-w-[400px]">
          <RetroWindow title="Valentine.exe" className="w-full">
            <div className="flex flex-col gap-6 p-4">
              <Heart className="w-16 h-16 text-red-500 mx-auto animate-pulse" fill="currentColor" />
              <h1 className="text-xl font-bold font-retro leading-relaxed">Riddhi, Will you be my Valentine?</h1>
              <p className="text-sm">This is a mandatory system update. Please accept.</p>
              
              <div className="flex justify-center gap-4 sm:gap-8 mt-4">
                <RetroButton onClick={handleInitialYes} variant="success" className="px-6 sm:px-8 scale-100 uppercase flex-1 sm:flex-none">
                  Yes
                </RetroButton>
                
                <RetroButton onClick={handleNo} variant="danger" className="px-6 sm:px-8 uppercase flex-1 sm:flex-none">
                  No
                </RetroButton>
              </div>
            </div>
          </RetroWindow>
        </div>
      )}

      {/* STEP 2: Captcha Security Check */}
      {currentStep === 'captcha' && (
         <CaptchaWindow onSuccess={handleCaptchaSuccess} />
      )}

      {/* STEP 3: Fake Loading */}
      {currentStep === 'loading' && (
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[400px]">
             <RetroWindow title="Installing Feelings...">
                 <div className="w-full flex flex-col gap-4 p-4 text-center items-center">
                    <AlertTriangle className="w-16 h-16 text-blue-800 animate-pulse hidden" /> {/* Buffer import */}
                    <div className="w-16 h-16 bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-red-500 animate-ping" />
                    </div>
                    <p className="font-mono text-sm">{loadingText}</p>
                    <ProgressBar progress={loadingProgress} />
                    <p className="text-xs text-gray-500">{Math.floor(loadingProgress)}% Complete</p>
                 </div>
             </RetroWindow>
         </div>
      )}

      {/* STEP 4: Success Screen */}
      {currentStep === 'success' && (
        <div className="absolute inset-0 flex items-center justify-center bg-pink-200 z-[100]">
           <div className="text-center animate-bounce">
              <h1 className="text-5xl font-bold text-red-600 mb-4">Universe said YES! ❤️</h1>
              <p className="text-3xl text-pink-700 font-bold mb-4">Riddhi, you made me the happiest person!</p>
              <p className="text-xl text-red-800">Get ready for our date! 🥂</p>
              <div className="mt-8 text-6xl">🥰 💐 🍫</div>
           </div>
           {/* Simple confetti dots */}
           {popups.length === 0 && <ConfettiLayer />}
        </div>
      )}

      {/* Popups */}
      {popups.map(popup => (
        <div 
            key={popup.id} 
            className="absolute z-50" 
            style={{ left: popup.x, top: popup.y }}
        >
            <RetroWindow title={popup.title} onClose={() => closePopup(popup.id)}>
                {popup.content}
            </RetroWindow>
        </div>
      ))}
    </main>
  );
}

// Separate component to handle hydration-safe random generation
function ConfettiLayer() {
    const [pieces, setPieces] = useState<{left: string, animation: string, color: string}[]>([]);

    useEffect(() => {
        const newPieces = Array.from({ length: 50 }).map((_, i) => ({
            left: `${Math.random() * 100}vw`,
            animation: `fall ${2 + Math.random() * 3}s linear infinite`,
            color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'][i % 4]
        }));
        setPieces(newPieces);
    }, []);

    return (
        <>
            {pieces.map((p, i) => (
             <div key={i} className="absolute w-2 h-2 rounded-full" style={{
                backgroundColor: p.color,
                left: p.left,
                top: `-10px`,
                animation: p.animation
             }} />
           ))}
           <style jsx>{`
             @keyframes fall {
               to { transform: translateY(100vh) rotate(720deg); }
             }
           `}</style>
        </>
    );
}
