"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Invoice from "./components/Invoice";
import Trap from "./components/Trap";
import BureaucracyStage from "./components/BureaucracyStage";
import MeetupRequest from "./components/MeetupRequest";
import ChatSupport from "./components/ChatSupport";

export default function Home() {
  const [stage, setStage] = useState<"invoice" | "trap" | "bureaucracy" | "meetup" | "success">("invoice");
  const [showTrap, setShowTrap] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Stage 1: Invoice -> User clicks "Cancel" -> Show Trap
  const handleCancelSubscription = () => {
    setShowTrap(true);
  };
  
  const handleKeepSubscription = () => {
      // Show fake error then force chat
      alert("Error: Payment failed. Your heart card was declined. Please contact support.");
      setIsChatOpen(true);
  };

  // Stage 2: Trap -> User persists -> Move to Bureaucracy
  const handlePersist = () => {
    setShowTrap(false);
    setStage("bureaucracy");
  };

  // Stage 2b: Trap -> User gives up -> Back to Invoice (technically stays on invoice, trap closes)
  const handleGiveUp = () => {
    setShowTrap(false);
  };

  // Stage 3: Bureaucracy -> User submits -> Move to Meetup
  const handleFormSubmit = () => {
      // Simulate processing
      setTimeout(() => {
        setStage("meetup");
      }, 500);
  };

  // Stage 4: Meetup -> User accepts -> Success
  const handleAccept = () => {
    setStage("success");
    import("canvas-confetti").then((confetti) => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
        
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
        
            const particleCount = 50 * (timeLeft / duration);
            confetti.default(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti.default(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FFF0F5] dark:bg-black overflow-hidden relative font-mono">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "20px 20px"
        }} />
        
        {stage !== "success" && <ChatSupport isOpen={isChatOpen} setIsOpen={setIsChatOpen} />}

      <AnimatePresence mode="wait">
        {stage === "invoice" && (
          <Invoice key="invoice" onCancel={handleCancelSubscription} onKeep={handleKeepSubscription} />
        )}
        
        {stage === "bureaucracy" && (
          <BureaucracyStage key="bureaucracy" onSubmit={handleFormSubmit} />
        )}

        {stage === "meetup" && (
          <MeetupRequest key="meetup" onAccept={handleAccept} />
        )}

        {stage === "success" && (
            <div className="text-center space-y-4 animate-bounce z-10">
                <h1 className="text-6xl font-black uppercase text-pink-500 drop-shadow-[4px_4px_0_#000]">IT'S FINAL!</h1>
                <div className="bg-white border-4 border-black p-4 inline-block transform rotate-2">
                    <p className="text-xl font-bold uppercase">Transaction Approved.</p>
                    <p className="text-sm">See you soon!</p>
                </div>
            </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTrap && (
          <Trap onGiveUp={handleGiveUp} onPersist={handlePersist} />
        )}
      </AnimatePresence>
    </main>
  );
}
