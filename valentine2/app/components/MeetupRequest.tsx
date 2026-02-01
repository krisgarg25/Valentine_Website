"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, MapPin, AlertTriangle, CheckCircle } from "lucide-react";

export default function MeetupRequest({ onAccept }: { onAccept: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-lg font-mono"
    >
        <div className="relative">
             <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
              <Card className="relative border-4 border-black rounded-none shadow-none overflow-hidden bg-white">
                
                <CardHeader className="text-center pb-2 bg-red-600 text-white border-b-4 border-black p-6">
                    <div className="flex justify-center mb-4">
                        <div className="bg-black p-3 animate-bounce">
                            <AlertTriangle className="h-10 w-10 text-yellow-400" />
                        </div>
                    </div>
                  <CardTitle className="text-3xl font-black uppercase tracking-widest">SYSTEM ERROR: 404</CardTitle>
                  <p className="text-xs font-bold font-mono mt-2 bg-black inline-block px-2 py-1">
                    REMOTE CANCELLATION FAILED
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-6">
                    <div className="bg-yellow-100 p-6 border-4 border-black border-dashed">
                        <p className="font-black text-center mb-4 text-xl uppercase">MANDATORY EXIT INTERVIEW</p>
                        
                        <div className="space-y-4 text-sm font-bold">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-6 w-6 text-black" />
                                <span>Date: <span className="text-pink-600 bg-black px-1">PENDING APPROVAL</span></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-6 w-6 text-black" />
                                <span>Loc: <span className="underline decoration-wavy decoration-pink-500">Your favorite java spot</span></span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-black" />
                                <span>Agenda: <span className="italic">Grievances & Gossip</span></span>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-center font-bold uppercase text-red-600 animate-pulse">
                        Failure to comply = Permanent Subscription Renewal
                    </p>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-black rounded-none h-14 text-lg font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all" 
                    size="lg" 
                    onClick={onAccept}
                  >
                    I Accept the Summons
                  </Button>
                </CardFooter>
              </Card>
        </div>
    </motion.div>
  );
}
