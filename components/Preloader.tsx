import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "Guten tag",
  "Здравствуйте",
  "Hallå",
  "السَّلَامُ عَلَيْكُمْ",
  "नमस्ते",
  "నమస్కారం",
  "こんにちは"
];

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });

    // Prevent scrolling
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    console.log("Preloader index:", index);
    // Auto-complete after 3 seconds regardless of word cycle
    const autoCompleteTimer = setTimeout(() => {
      console.log("Preloader auto-complete triggered");
      onComplete();
    }, 3000);

    if (index === words.length - 1) {
      // End of words, trigger completion after a short delay
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => {
        clearTimeout(timeout);
        clearTimeout(autoCompleteTimer);
      };
    }

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
    return () => {
      clearTimeout(timeout);
      clearTimeout(autoCompleteTimer);
    };
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black text-black dark:text-white overflow-visible cursor-wait"
    >
      <div className="flex items-center gap-3 z-10">
        <span
          className={cn(
            "text-4xl md:text-6xl font-serif italic tracking-tight text-black dark:text-white",
            words[index] === "こんにちは" && "font-bold not-italic"
          )}
        >
          {words[index]}
        </span>
      </div>

      {/* Curve Tail */}
      <svg className="absolute top-full w-full h-[calc(100vh*0.2)] fill-white dark:fill-black pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0 0 Q50 100 100 0 L100 0 L0 0" vectorEffect="non-scaling-stroke" />
      </svg>
    </motion.div>
  );
};