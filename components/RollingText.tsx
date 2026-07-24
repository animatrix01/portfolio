import React from 'react';
import { motion } from 'framer-motion';

interface RollingTextProps {
  text: string;
  isOpen: boolean;
  delay: number;
  className?: string;
  height?: string;
}

export const RollingText: React.FC<RollingTextProps> = ({ text, isOpen, delay, className, height = "h-16" }) => {
  return (
    <div className={`overflow-hidden ${height} flex items-center`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.6, delay: delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
};