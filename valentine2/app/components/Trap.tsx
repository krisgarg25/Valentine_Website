"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export default function Trap({ onGiveUp, onPersist }: { onGiveUp: () => void; onPersist: () => void }) {
  const [stage, setStage] = useState(0);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    // Only move a few times, then give up
    if (stage > 5) return;
    
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setBtnPos({ x, y });
    setStage(s => s + 1);
  };

  const handleAttempt = () => {
    if (stage <= 5) {
      moveButton();
    } else {
        // Let them click it after enough tries
      setStage(6);
      setTimeout(() => {
          onPersist(); // Move to next main stage
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" ref={containerRef}>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-zinc-950 rounded-xl shadow-2xl max-w-sm w-full p-6 border border-zinc-200 dark:border-zinc-800"
      >
        <div className="space-y-4">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold text-red-600">⚠️ Wait! Are you sure?</h2>
            <p className="text-muted-foreground">
                {stage < 3 ? "You'll miss out on my award-winning personality." : 
                 stage < 5 ? "Okay, seriously, stop trying to leave." :
                 "Fine. You are persistent."}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 pt-4 relative min-h-[100px] justify-center">
             {/* The "Safe" button */}
            <Button onClick={onGiveUp} className="w-full bg-green-600 hover:bg-green-700 text-white">
              Keep Subscription (Free Hugs Included)
            </Button>
            
            {/* The "Danger" button */}
            <motion.div
              animate={stage <= 5 && stage > 0 ? { x: btnPos.x, y: btnPos.y } : { x: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full"
            >
                <Button 
                    variant="destructive" 
                    className="w-full" 
                    onMouseEnter={moveButton}
                    onClick={handleAttempt}
                >
                    {stage < 5 ? "Delete Me Forever" : "Fine, proceed..."}
                </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
