"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export default function ComplaintForm({ onSubmit }: { onSubmit: () => void }) {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50) {
      setScrolledToBottom(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isChecked) {
        // Simulate processing then fail
      onSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-lg"
    >
      <Card>
        <CardHeader>
          <CardTitle>Formal Complaint / Exit Survey</CardTitle>
          <CardDescription>Please complete this form in triplicate to process your request.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for leaving</Label>
              <select id="reason" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option>I hate fun</option>
                <option>I am allergic to awesomeness</option>
                <option>I clicked this by mistake</option>
                <option>I prefer being bored</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="complaint">Detailed Explanation (Minimum 500 words)</Label>
              <Textarea id="complaint" placeholder="Type here... (Just kidding, you can leave this blank)" />
            </div>

            <div className="space-y-2">
              <Label>Terms and Conditions</Label>
              <div 
                className="h-32 border rounded-md p-4 overflow-y-auto text-xs text-muted-foreground"
                onScroll={handleScroll}
              >
                <p className="mb-2">1. By submitting this form, you acknowledge that [Your Name] is actually pretty cool.</p>
                <p className="mb-2">2. You agree that any "annoyance" caused is purely for entertainment purposes.</p>
                <p className="mb-2">3. You forfeit all rights to complain about bad puns in the future.</p>
                <p className="mb-2">4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p className="mb-2">5. KEEP SCROLLING...</p>
                <p className="mb-2">6. Are we there yet? No.</p>
                <p className="mb-2">7. Almost there.</p>
                <p className="mb-2">8. Just a little more.</p>
                <p className="mb-2">9. Okay, fine.</p>
                <p className="mb-2">10. CLAUSE 10: To finalize this unsubscription, an in-person exit interview is mandatory.</p>
              </div>
              {!scrolledToBottom && <p className="text-xs text-red-500">Please read (scroll) to the bottom.</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={isChecked} onCheckedChange={(c) => setIsChecked(c === true)} disabled={!scrolledToBottom} />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the Terms & Conditions
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={!isChecked}>
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
