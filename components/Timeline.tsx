import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineProps {
  sections: { id: string; title: string }[];
  activeId: string | null;
  onSectionClick: (id: string) => void;
}

export default function Timeline({ sections, activeId, onSectionClick }: TimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const calculateScale = (index: number) => {
    if (hoveredIndex === null) return 0.4;
    const distance = Math.abs(index - hoveredIndex);
    return Math.max(1 - distance * 0.2, 0.4);
  };

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center w-24">
      <div className="flex flex-col gap-0.5">
        {sections.map((section, i) => {
          const isSelected = activeId === section.id;

          return (
            <button
              key={section.id}
              className="relative inline-flex items-center justify-start py-1"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onSectionClick(section.id)}
            >
              <div className="w-8 flex justify-center">
                 <motion.div
                    className={`h-1.5 w-8 rounded-full origin-center transition-colors duration-300 ${
                      isSelected
                        ? 'bg-blue-600 dark:bg-white'
                        : 'bg-gray-300 dark:bg-white/20'
                    }`}
                    animate={{
                      scale: calculateScale(i),
                      width: isSelected ? 32 : 16, // Width expands for active
                    }}
                    initial={{ scale: 0.4, width: 16 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
              </div>
              
              {/* Tooltip on Hover */}
              {(hoveredIndex === i || isSelected) && (
                <motion.span
                    className={`absolute left-10 text-[11px] font-medium whitespace-nowrap bg-white dark:bg-[#222] px-2 py-1 rounded-md shadow-lg border border-gray-100 dark:border-white/10 z-50 ${
                      isSelected
                        ? 'text-blue-600 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                    initial={{ opacity: 0, x: -5, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -5, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                >
                    {section.title}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}