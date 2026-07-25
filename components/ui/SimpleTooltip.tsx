import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SimpleTooltipProps {
    children: React.ReactNode;
    content: string | React.ReactNode;
}

export const SimpleTooltip: React.FC<SimpleTooltipProps> = ({ children, content }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
                    >
                        {content}
                        {/* Down Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
