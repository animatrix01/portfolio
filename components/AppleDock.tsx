import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, triggerHaptic } from "../lib/utils";
import {
  HomeIcon,
  GithubIcon,
  ArticleIcon,
  TwitterXIcon,
  BrightnessDownIcon,
  MoonIcon
} from "./AnimatedIcons";

interface AppleDockProps {
  visible: boolean;
  onNavigate: (view: string) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

export const AppleDock: React.FC<AppleDockProps> = ({ visible, onNavigate, toggleTheme, isDark }) => {
  // Map icons to the new Animated Components
  const items = [
    { title: 'Home', icon: HomeIcon, onClick: () => { triggerHaptic(); onNavigate('home'); } },
    { title: 'GitHub', icon: GithubIcon, onClick: () => { triggerHaptic(); window.open('https://github.com', '_blank'); } },
    { title: 'Articles', icon: ArticleIcon, onClick: () => { triggerHaptic(); onNavigate('blogs'); } },
    { title: 'Twitter', icon: TwitterXIcon, onClick: () => { triggerHaptic(); window.open('https://twitter.com', '_blank'); } },
    {
      title: isDark ? 'Light Mode' : 'Dark Mode',
      icon: isDark ? BrightnessDownIcon : MoonIcon,
      onClick: () => { triggerHaptic(); toggleTheme(); }
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const handleMouseEnter = (index: number) => {
    // Disable hover effect logic on touch devices via simple check if needed, 
    // but framer motion usually handles it okay. 
    // We can just rely on CSS hover media queries for styling if strictly needed.
    if (hoveredIndex !== null && index !== hoveredIndex) {
      setDirection(index > hoveredIndex ? 1 : -1);
    }
    setHoveredIndex(index);
  };

  // Layout calculations:
  // Container Padding (16px) + Icon Half Width (20px) = 36px offset for first icon center
  // Icon Width (40px) + Gap (16px) = 56px stride
  // Tooltip Wrapper Width = 100px (Center at 50px)
  // X = (36 + index * 56) - 50 = (index * 56) - 14
  const getTooltipPosition = (index: number) => (index * 56) - 14;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 150, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 150, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="fixed bottom-6 left-1/2 z-50 w-max max-w-[90vw]" // Ensure it doesn't overflow horizontally on very small screens
        >
          <div
            className={cn(
              "relative flex gap-3 md:gap-4 items-center px-3 md:px-4 py-3 rounded-2xl",
              "border border-white/20 dark:border-white/10",
              "bg-white/70 dark:bg-black/40",
              "backdrop-blur-xl shadow-2xl",
              // Mobile specific adjustment: slightly tighter on small screens
            )}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setDirection(0);
            }}
          >
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: -50,
                    x: getTooltipPosition(hoveredIndex),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                  className="absolute top-0 left-0 pointer-events-none z-30 w-[100px] flex justify-center hidden md:flex" // Hide tooltip on mobile to prevent obstruction
                >
                  <div
                    className={cn(
                      'relative px-3 py-1.5 rounded-lg',
                      'bg-black/80 text-white dark:bg-white/90 dark:text-black',
                      'shadow-lg backdrop-blur-md flex items-center justify-center',
                      'border border-white/10 dark:border-black/5'
                    )}
                  >
                    <div className="relative h-5 flex items-center justify-center overflow-hidden w-full px-2">
                      <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.span
                          key={items[hoveredIndex].title}
                          custom={direction}
                          initial={{
                            x: direction > 0 ? 20 : -20,
                            opacity: 0,
                            filter: 'blur(4px)',
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                          }}
                          exit={{
                            x: direction > 0 ? -20 : 20,
                            opacity: 0,
                            filter: 'blur(4px)',
                          }}
                          transition={{
                            duration: 0.25,
                            ease: 'easeOut',
                          }}
                          className="text-[12px] font-medium whitespace-nowrap"
                        >
                          {items[hoveredIndex].title}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-black/80 dark:border-t-white/90" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {items.map((item, index) => {
              const Icon = item.icon;
              const isHovered = hoveredIndex === index;

              return (
                <div
                  key={item.title}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onClick={item.onClick}
                  className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center cursor-pointer"
                >
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      y: isHovered ? -3 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  >
                    <Icon
                      size={20}
                      className={cn(
                        'transition-colors duration-200 md:w-[22px] md:h-[22px]',
                        isHovered
                          ? 'text-black dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      )}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
