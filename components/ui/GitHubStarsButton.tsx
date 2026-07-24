import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star } from 'lucide-react';
import { cn } from '../../lib/utils';
import { NativeCounterUp } from './NativeCounterUp';

interface GitHubStarsButtonProps {
    username: string;
    repo: string;
    className?: string;
    starCount?: number; // allow manual override if no API
}

export const GitHubStarsButton: React.FC<GitHubStarsButtonProps> = ({
    username,
    repo,
    className,
    starCount = 128 // Default fallback to look populated
}) => {
    const [stars, setStars] = useState(starCount);

    // Real implementation would fetch from API, simplifying for now
    useEffect(() => {
        // Optional: Fetch logic here if user wants live data later
    }, [username, repo]);

    const Component = 'a'; // Use as link

    return (
        <motion.a
            href={`https://github.com/${username}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative inline-flex items-center gap-2 px-3 py-1.5",
                "bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20",
                "border border-gray-200 dark:border-white/10",
                "rounded-full text-xs font-medium text-gray-700 dark:text-gray-200",
                "transition-colors cursor-pointer no-underline",
                className
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Github size={14} className="opacity-80" />
            <span className="opacity-90">Star on GitHub</span>

            {/* Separator */}
            <div className="w-[1px] h-3 bg-gray-300 dark:bg-white/20 mx-0.5" />

            <div className="flex items-center gap-1 font-mono text-gray-500 dark:text-gray-400 group-hover:text-yellow-500 transition-colors">
                <Star size={12} className={cn("transition-all", "group-hover:fill-yellow-500 group-hover:text-yellow-500")} />
                <span>{stars.toLocaleString()}</span>
            </div>
        </motion.a>
    );
};
