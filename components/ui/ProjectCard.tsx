import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Github, Play, Pause } from 'lucide-react';
import { cn, triggerHaptic } from '../../lib/utils';

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    githubUrl?: string;
    stars?: number;
    videoUrl?: string;
    imageUrl?: string;
    index: number;
    isDimmed?: boolean;
    onHover?: () => void;
    onLeave?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tags,
    link,
    githubUrl,
    stars = 0,
    videoUrl,
    imageUrl,
    index,
    isDimmed,
    onHover,
    onLeave
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // Spring animation for hover effect (Apple-style bounciness)
    const scale = useSpring(1, { stiffness: 300, damping: 20 });
    const y = useSpring(0, { stiffness: 300, damping: 20 });

    const handleMouseEnter = () => {
        setIsHovered(true);
        scale.set(1.02);
        y.set(-5);
        triggerHaptic(5);
        onHover?.();
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        scale.set(1);
        y.set(0);
        onLeave?.();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            style={{ scale, y }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative flex flex-col w-full bg-white dark:bg-black rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500 will-change-transform h-auto md:h-[420px]",
                isDimmed ? "grayscale opacity-40 blur-[1px] scale-95" : "grayscale-0 opacity-100 blur-0"
            )}
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(59,130,246,0.1)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(59,130,246,0.15)_0%,transparent_50%)]" />
            </div>

            {/* Visual Media Section (Video or Image) */}
            <div className="relative w-full h-[200px] md:h-[55%] overflow-hidden bg-gray-100 dark:bg-[#050505]">
                {videoUrl ? (
                    <video
                        src={videoUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                )}

                {/* Visual Polish Filter */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Content Section - Takes up bottom 45% */}
            <div className="flex flex-col flex-1 p-5 md:p-6 relative">

                {/* Header: Title & Links */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight">
                        {title}
                    </h3>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 hover:scale-110 active:scale-95"
                                title="View Code"
                                onClick={(e) => { e.stopPropagation(); triggerHaptic(5); }}
                            >
                                <Github size={16} />
                            </a>
                        )}
                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110 active:scale-95"
                                title="Visit Live Site"
                                onClick={(e) => { e.stopPropagation(); triggerHaptic(10); }}
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {description}
                </p>

                {/* Footer: Tech Stack (Horizontal Scrollable if needed, or flex wrap) */}
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[10px] font-semibold text-gray-600 dark:text-gray-300 tracking-wide"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
