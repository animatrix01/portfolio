import React, { useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { ExternalLink, Clock, Calendar, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PreviewLinkCardProps {
    href: string;
    title: string;
    children: React.ReactNode;
    previewImage?: string;
    className?: string;
    subtitle?: string;
    date?: string;
    readTime?: string;
    description?: string;
}

export const PreviewLinkCard: React.FC<PreviewLinkCardProps> = ({
    href,
    title,
    children,
    previewImage,
    className,
    subtitle,
    date,
    readTime,
    description
}) => {
    const [isOpen, setIsOpen] = useState(false);
    // Default preview fallback if none provided
    const imgUrl = previewImage || `https://picsum.photos/seed/${encodeURIComponent(title)}/600/400`;

    // Random tilt for sticker effect
    const [tilt] = useState(() => Math.random() * 8 - 4);

    // Spring physics for smooth cursor following
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        x.set(e.clientX);
        y.set(e.clientY);
    };

    // Use subtitle as fallback for description if description is missing
    const displayDesc = description || subtitle || "Click to read this article.";

    return (
        <div
            className={cn("relative inline-block", className)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onMouseMove={handleMouseMove}
        >
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 block"
            >
                {children}
            </a>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: tilt,
                        }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{
                            position: 'fixed',
                            left: x,
                            top: y,
                            translateX: 20,
                            translateY: 20,
                            zIndex: 9999,
                            pointerEvents: 'none'
                        }}
                        // Sticker Container: Pitch Black/White Background, Curvier (rounded-3xl), Thick White Border
                        className="w-[240px] p-2 bg-white dark:bg-black rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-[4px] border-white dark:border-zinc-800 overflow-hidden"
                    >
                        {/* Inner Content Container - Rounded to curve inside */}
                        <div className="flex flex-col gap-2 rounded-2xl overflow-hidden bg-gray-50 dark:bg-zinc-900/50">

                            {/* Sticker Image - Rounded Corners Inside */}
                            <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                                <img
                                    src={imgUrl}
                                    alt={`${title} Preview`}
                                    className="w-full h-full object-cover transform scale-105"
                                />
                                {/* "Article" Badge */}
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black text-[8px] font-bold uppercase tracking-wider rounded-full shadow-sm border border-white/20 dark:border-black/10">
                                    Article
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="px-2 pt-1 pb-3 relative">
                                {/* Metadata Row */}
                                <div className="flex items-center gap-2 mb-1.5 text-[8px] font-semibold text-gray-400 uppercase tracking-wider">
                                    {date && (
                                        <div className="flex items-center gap-1">
                                            <Calendar size={9} />
                                            <span>{date}</span>
                                        </div>
                                    )}
                                    {readTime && (
                                        <div className="flex items-center gap-1 ml-auto">
                                            <Clock size={9} />
                                            <span>{readTime}</span>
                                        </div>
                                    )}
                                </div>

                                <h4 className="text-xs font-black text-black dark:text-white leading-tight line-clamp-2 mb-1.5 tracking-tight">
                                    {title}
                                </h4>

                                <p className="text-[9px] font-medium text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                                    {displayDesc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
