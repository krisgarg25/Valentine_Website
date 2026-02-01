"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";

export default function Invoice({ onCancel, onKeep }: { onCancel: () => void; onKeep: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-lg"
    >
      <div className="relative">
         {/* Brutalist Shadow Effect */}
        <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 rounded-none" />
        
        <Card className="relative border-4 border-black rounded-none bg-white p-2">
          <CardHeader className="space-y-1 border-b-4 border-black pb-4 mb-4 bg-yellow-100">
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-black uppercase tracking-widest font-mono">
                NOTICE
              </CardTitle>
              <div className="flex flex-col items-end">
                <span className="bg-black text-white px-2 py-1 text-xs font-bold font-mono">
                  AUTO-RENEWAL ON
                </span>
                <span className="text-xs font-mono mt-1">Ref: BFF-4EVR</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="grid gap-6 font-mono">
            <div className="flex justify-between items-end border-b-2 border-dashed border-gray-400 pb-2">
                <span className="text-sm font-bold uppercase text-gray-500">Billed To</span>
                <span className="text-xl font-bold">The Bestie (You)</span>
            </div>
            
            <div className="flex justify-between items-end border-b-2 border-dashed border-gray-400 pb-2">
                <span className="text-sm font-bold uppercase text-gray-500">Service</span>
                <span className="text-xl font-bold">Being My Friend</span>
            </div>
            
            <div className="flex justify-between items-end border-b-2 border-dashed border-gray-400 pb-2">
                <span className="text-sm font-bold uppercase text-gray-500">Cost</span>
                <span className="text-xl font-bold text-red-600">100% Patience</span>
            </div>
            
            <div className="bg-pink-50 border-2 border-black p-4 text-xs font-bold leading-relaxed">
              <p className="uppercase mb-2 text-pink-600">/// WARNING ///</p>
              <p>Cancellation of this plan is strictly prohibited by the laws of friendship. Attempts to leave may result in emotional blackmail and/or sad playlists.</p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-4 mt-4">
            <Button 
                className="w-full bg-pink-500 hover:bg-pink-400 text-black border-2 border-black rounded-none h-14 text-lg font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                onClick={onKeep}
            >
              <Heart className="mr-2 h-6 w-6 fill-black" />
              Keep Subscription
            </Button>
            
            <Button 
                variant="ghost" 
                className="w-full text-gray-400 hover:text-red-600 hover:bg-transparent uppercase text-xs tracking-widest font-bold"
                onClick={onCancel}
            >
              I hate fun (Cancel)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </motion.div>
  );
}
