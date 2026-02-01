"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Upload, AlertCircle } from "lucide-react";

export default function BureaucracyStage({ onSubmit }: { onSubmit: () => void }) {
  const [subStage, setSubStage] = useState<"queue" | "form" | "upload_error">("queue");
  const [queuePos, setQueuePos] = useState(452);
  const [isStuck, setIsStuck] = useState(false);
  
  // Fake Queue Logic
  useEffect(() => {
    if (subStage !== "queue") return;
    
    const interval = setInterval(() => {
      setQueuePos(prev => {
        if (prev <= 1) {
            setIsStuck(true);
            return 1;
        }
        // Random drops
        const drop = Math.floor(Math.random() * 50) + 1;
        return Math.max(1, prev - drop);
      });
    }, 800);
    
    return () => clearInterval(interval);
  }, [subStage]);

  useEffect(() => {
      if (isStuck) {
          // After being stuck at 1 for a bit, show "Connection Error" or just let them through?
          // Let's make them click a "Refresh" button that actually lets them through
      }
  }, [isStuck]);

  const handleManualRefresh = () => {
      setSubStage("form");
  };

  return (
    <div className="w-full max-w-lg font-mono">
      <AnimatePresence mode="wait">
        {subStage === "queue" && (
          <motion.div
            key="queue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
             <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
                <Card className="relative border-4 border-black rounded-none p-6 text-center space-y-6">
                    <h2 className="text-2xl font-bold uppercase bg-yellow-300 inline-block px-2">Cancellation Queue</h2>
                    
                    <div className="py-8">
                        <div className="text-6xl font-black mb-2 animate-pulse">{queuePos}</div>
                        <p className="text-sm font-bold uppercase text-gray-500">People ahead of you</p>
                    </div>
                    
                    <div className="space-y-2 text-xs text-left bg-gray-100 p-4 border border-black">
                        <div className="flex justify-between text-green-600">
                            <span>Server Status:</span>
                            <span>ONLINE</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                            <span>Your Priority:</span>
                            <span>LOWEST</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Est. Wait Time:</span>
                            <span>{queuePos * 12} mins</span>
                        </div>
                    </div>

                    {isStuck && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: "auto", opacity: 1 }}
                            className="bg-red-100 p-2 border-2 border-red-500 text-red-600 font-bold text-sm"
                        >
                            <AlertCircle className="inline w-4 h-4 mr-2" />
                            System Halted due to excessive coolness.
                            <Button 
                                onClick={handleManualRefresh}
                                size="sm" 
                                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_#000]"
                            >
                                FORCE REFRESH
                            </Button>
                        </motion.div>
                    )}
                </Card>
             </div>
          </motion.div>
        )}

        {subStage === "form" && (
            <ComplaintFormEnhanced onSubmit={onSubmit} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ComplaintFormEnhanced({ onSubmit }: { onSubmit: () => void }) {
    const [scrolledToBottom, setScrolledToBottom] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const [date, setDate] = useState("");
    
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight < 20) {
            setScrolledToBottom(true);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Reject everything
        alert("Error: File too large. Maximum size: 1 byte.");
        e.target.value = ""; // clear
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const d = new Date(e.target.value);
        const day = d.getDay();
        if (day === 0 || day === 6) {
           alert("Error: Admin is busy having a life on weekends.");
           e.target.value = "";
        } else {
            // maybe block weekdays too?
            const random = Math.random();
            if (random > 0.5) {
                alert("Error: That day is reserved for 'Me Time'. Pick another.");
                e.target.value = "";
            } else {
                setDate(e.target.value);
            }
        }
    };
    
    return (
        <motion.div
            key="form"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >
            <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
                <Card className="relative border-4 border-black rounded-none p-0 overflow-hidden">
                    <CardHeader className="bg-black text-white p-4">
                        <CardTitle className="font-mono text-xl uppercase">Official Exit Survey</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6 bg-white">
                        
                        {/* 1. Date Selector Trap */}
                        <div className="space-y-2">
                            <Label className="font-bold uppercase">Requested Departure Date</Label>
                            <Input 
                                type="date" 
                                className="border-2 border-black rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-gray-50" 
                                onChange={handleDateChange}
                                value={date}
                            />
                            <p className="text-[10px] text-gray-500">*Availability subject to Admin's mood</p>
                        </div>

                        {/* 2. Impossible Upload */}
                        <div className="space-y-2">
                             <Label className="font-bold uppercase">Upload Signed Apology (PDF)</Label>
                             <div className="border-2 border-dashed border-black p-4 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition-colors relative">
                                <Input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer z-50 h-full w-full" 
                                    onChange={handleFileChange}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        alert("Just kidding! I am not that cruel. No apology needed.");
                                    }}
                                />
                                <Upload className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-xs font-bold">CLICK TO UPLOAD</span>
                                <p className="text-[10px] mt-1">Max size: 1 byte</p>
                             </div>
                        </div>

                        {/* 3. T&C Scroll */}
                        <div className="space-y-2">
                             <Label className="font-bold uppercase">Terms & Conditions</Label>
                             <div 
                                className="h-24 border-2 border-black p-2 overflow-y-scroll text-[10px] space-y-2 font-mono bg-yellow-50"
                                onScroll={handleScroll}
                             >
                                <p>1. YOU ACKNOWLEDGE THAT LEAVING IS A BAD IDEA.</p>
                                <p>2. YOU AGREE TO PAY A FINE OF ONE (1) COFFEE.</p>
                                <p>3. ADMIN RETAINS CUSTODY OF ALL SHARED MEMORIES.</p>
                                <p>4. NO REFUNDS ON TIME SPENT LISTENING TO MY RANTS.</p>
                                <p>5. SCROLL FASTER.</p>
                                <p>6. ALMOST THERE.</p>
                                <p>7. JUST KIDDING, KEEP GOING.</p>
                                <p>8. OKAY SERIOUSLY NOW.</p>
                                <p>9. BY CLICKING SUBMIT YOU AGREE TO MEET IN PERSON.</p>
                                <div className="h-10"></div>
                                <p className="font-bold">END OF TERMS.</p>
                             </div>
                        </div>

                        <Button 
                            className="w-full bg-black text-white hover:bg-gray-800 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
                            disabled={!scrolledToBottom || !date}
                            onClick={onSubmit}
                        >
                            SUBMIT APPLICATION
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
