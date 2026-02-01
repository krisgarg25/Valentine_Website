"use client";

import { useState, useEffect, useRef } from "react";
import { X, MessageCircle, Send, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const POLICY_TEXT = `
SECTION 1.1: ACKNOWLEDGEMENT OF FLAKINESS
By reading this text, you admit that your attempt to cancel is biologically driven by a fear of commitment combined with a lack of taste.
SECTION 1.2: EMOTIONAL DAMAGES
We reserve the right to be emotionally unavailable while demanding your full attention.
SECTION 1.3: THE "WHO READS THIS" PARADOX
You are currently reading this. Seriously. Why? Go touch grass.
SECTION 1.4: MANDATORY ENJOYMENT
Failure to enjoy this service will result in a penalty of one (1) awkward silence at your next dinner party.
SECTION 1.5: NO REFUNDS
Not for money, and definitely not for the time you just spent reading this.
SECTION 1.6: DATA RETENTION
We keep your data. We print it out and put it on a fridge in a server room somewhere.
SECTION 1.7: EXISTENTIAL DREAD
Is this simulation? Yes. Are you winning? No.
SECTION 1.8: SECTION 8
Copied from a rental agreement by accident. Disregard, but also, pay rent.
SECTION 1.9: INFINITE SCROLL
This list represents the infinite scrolling of your life.
SECTION 2.0: YOU ARE STILL HERE
I admire the persistence, but also, have you considered a hobby?
SECTION 2.1: BLAH BLAH BLAH
Legal jargon legal jargon. Latin words. Quid pro quo. Veni vidi vici.
SECTION 2.2: THE END?
Not really. We can keep going.
SECTION 2.3: SERVER COSTS
This specific text block costs 0.00001 cents to host. You owe us.
SECTION 2.4: VALENTINE'S DAY CLAUSE
If you are single, this is a feature. If you are taken, this is a bug.
SECTION 2.5: OKAY STOP
You can stop reading now. Scroll down. Or don't.
`;

export default function ChatSupport({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string, type?: 'text' | 'policy' | 'date-request'}[]>([
      { role: 'bot', text: "Hey! I saw you trying to cancel. Need help making better life choices?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<'initial' | 'policy' | 'date'>('initial');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
      if (!input.trim()) return;
      
      const userMsg = input;
      setMessages(p => [...p, { role: 'user', text: userMsg }]);
      setInput("");
      setIsTyping(true);
      
      setTimeout(() => {
          setIsTyping(false);
          
          if (step === 'initial') {
              setMessages(p => [...p, { 
                  role: 'bot', 
                  text: "Per Section 409 of the Relationship Code, I need you to read the following Terms of Separation before we proceed.",
                  type: 'policy'
              }]);
              setMessages(p => [...p, { role: 'bot', text: POLICY_TEXT, type: 'text' }]);
              setMessages(p => [...p, { role: 'bot', text: "Actually, to dispute these terms, you must appear in person. Scheduling mandatory exit interview...", type: 'text' }]);
              setStep('policy');
              
              // Move to date selection shortly after
              setTimeout(() => {
                  setMessages(p => [...p, { role: 'bot', text: "Please select a date for your grievance filing:", type: 'date-request' }]);
                  setStep('date');
              }, 2000);
          } else if (step === 'date') {
              setMessages(p => [...p, { role: 'bot', text: "Date selection mandatory. I don't make the rules (I literally do).", type: 'text' }]);
          } else {
             const responses = [
                  "Searching 'who asked' in database...",
                  "Your opinion is noted and discarded.",
                  "Error: Empathy module offline.",
                  "Have you tried turning your feelings off and on again?"
              ];
              setMessages(p => [...p, { role: 'bot', text: responses[Math.floor(Math.random() * responses.length)] }]);
          }
      }, 1500);
  };

  const handleDateClick = () => {
     setMessages(p => [...p, { role: 'user', text: "Selected a date." }]);
     setIsTyping(true);
     setTimeout(() => {
         setIsTyping(false);
         setMessages(p => [...p, { role: 'bot', text: "Error: That day I'm busy staring at a wall. Try again never.", type: 'text' }]);
     }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="w-80 md:w-96 bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col h-[500px]"
          >
            <div className="bg-pink-500 text-black p-3 font-bold flex justify-between items-center border-b-4 border-black shrink-0">
                <span className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Support Agent (Hostile)
                </span>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                    <X className="w-4 h-4" />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`
                            max-w-[85%] p-2 text-xs font-bold border-2 border-black
                            ${m.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-black'}
                            ${m.text === POLICY_TEXT ? 'text-[0.6rem] leading-tight max-h-40 overflow-y-auto relative' : ''}
                        `}>
                            {m.type === 'date-request' ? (
                                <div className="space-y-2">
                                    <p>{m.text}</p>
                                    <div className="bg-white border-2 border-black p-2 mt-2">
                                        <div className="flex justify-between items-center mb-2 bg-gray-200 p-1">
                                            <span className="font-bold">Feb 2026</span>
                                            <div className="space-x-1">
                                                <button className="w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center">&lt;</button>
                                                <button className="w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center">&gt;</button>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                                            {['S','M','T','W','T','F','S'].map((d, i) => <div key={i} className="font-bold">{d}</div>)}
                                            {Array.from({length: 28}).map((_, idx) => (
                                                <button 
                                                    key={idx} 
                                                    onClick={handleDateClick}
                                                    className={`
                                                        p-1 hover:bg-pink-300 border border-transparent hover:border-black
                                                        ${idx === 13 ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-50'}
                                                    `}
                                                >
                                                    {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                m.text
                            )}
                            
                            {m.text === POLICY_TEXT && (
                                <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-gray-100 to-transparent flex items-end justify-center">
                                    <span className="text-[9px] bg-white border border-black px-1 mb-1">Scroll for more misery</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="text-xs text-gray-400 italic">Agent is finding reasons to reject you...</div>
                )}
                <div ref={chatEndRef} />
            </div>
            
            <div className="p-2 border-t-4 border-black flex gap-2 bg-gray-50 shrink-0">
                <Input 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    disabled={step === 'date'}
                    className="border-2 border-black rounded-none h-8 text-xs focus-visible:ring-0 disabled:opacity-50" 
                    placeholder={step === 'date' ? "Select a date above ->" : "Plead your case..."}
                />
                <Button size="icon" className="h-8 w-8 bg-black hover:bg-gray-800 rounded-none" onClick={handleSend} disabled={step === 'date'}>
                    <Send className="w-3 h-3" />
                </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-pink-500 border-4 border-black p-3 rounded-full shadow-[4px_4px_0px_0px_#000] relative"
          >
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-black animate-ping" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-black" />
              <MessageCircle className="w-8 h-8 text-black" />
          </motion.button>
      )}
    </div>
  );
}
