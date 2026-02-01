"use client";

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { RetroButton } from './RetroButton';

interface RunawayButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const RunawayButton: React.FC<RunawayButtonProps> = ({ children, onClick, className }) => {
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);

    const runAway = () => {
        // Calculate random position within the window/viewport
        // Safe zone: -200px to 200px from current position to keep it reachable eventually? 
        // Or full screen absolute? Let's do relative offset chaos.
        const x = (Math.random() - 0.5) * 400; // -200 to 200
        const y = (Math.random() - 0.5) * 400; // -200 to 200

        controls.start({
            x: x,
            y: y,
            transition: { type: "spring", stiffness: 300, damping: 10 }
        });
    };

    return (
        <motion.div
            animate={controls}
            onMouseEnter={runAway}
            className="inline-block"
        >
            <RetroButton 
                onClick={onClick} 
                className={className}
                // Also trigger runAway on click as a fallback "annoyance" if they manage to click it
                onMouseDown={runAway} 
            >
                {children}
            </RetroButton>
        </motion.div>
    );
};
