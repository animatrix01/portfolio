import React from "react";
import { motion } from "framer-motion";

const NumberColumn: React.FC<{ digit: number }> = ({ digit }) => {
  return (
    <div className="relative h-[1em] w-[0.6em] overflow-hidden inline-block -translate-y-[0.05em]">
      <motion.div
        animate={{ y: -digit * 100 + "%" }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
        className="absolute top-0 left-0 flex flex-col items-center w-full h-full"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span key={num} className="h-full flex items-center justify-center font-mono leading-none">
            {num}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export const NumberTicker = ({ value }: { value: number }) => {
  const clampedValue = Math.min(100, Math.max(0, Math.round(value)));
  const digits = clampedValue.toString().split('').map(Number);
  
  return (
    <div className="inline-flex items-center justify-end overflow-hidden leading-none select-none">
      {digits.map((d, i) => (
        <NumberColumn key={`digit-${i}-${d}`} digit={d} />
      ))}
      <span className="font-mono ml-[1px]">%</span>
    </div>
  );
};