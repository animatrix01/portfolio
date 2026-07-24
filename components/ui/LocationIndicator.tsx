"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LocationIndicator = () => {
    const [time, setTime] = useState<string>("");
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Update time every second
        const updateTime = () => {
            const now = new Date();
            // Get IST time
            const istTime = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
            setTime(istTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className="relative inline-block ml-1 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="cursor-help decoration-dashed underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-blue-500 dark:hover:decoration-blue-400 transition-colors">
                from India
            </span>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 p-3 bg-white dark:bg-[#111] rounded-xl shadow-xl border border-gray-200 dark:border-white/10 min-w-[160px] z-50"
                    >
                        {/* Connecting Arrow */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-8 border-transparent border-b-white dark:border-b-[#111]" />

                        <div className="flex flex-col items-center gap-2">
                            {/* Flag and Label */}
                            <div className="flex items-center gap-2">
                                <span className="text-xl">🇮🇳</span>
                                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Based in India</span>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 dark:bg-white/5 rounded-md w-full justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-mono font-medium text-gray-600 dark:text-gray-400">
                                    {time} IST
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};
