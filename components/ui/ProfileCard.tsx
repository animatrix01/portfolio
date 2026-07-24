
import React from 'react';
import { motion } from 'framer-motion';
import { cn, triggerHaptic } from '../../lib/utils';
import { BoxSelect, Code2, ExternalLink } from 'lucide-react';

interface ProfileCardProps {
    name: string;
    title: string;
    portfolioText?: string;
    portfolioLink?: string;
    imageUrl?: string;
    statusText?: string;
    Icon1?: React.ElementType;
    Icon2?: React.ElementType;
    PrimaryBtnText?: string;
    SecondaryBtnText?: string;
    subText?: string;
    onClick?: () => void;
    Icon3?: React.ElementType;
    index?: number;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    title,
    portfolioText,
    portfolioLink,
    imageUrl,
    statusText,
    Icon1,
    Icon2,
    PrimaryBtnText,
    SecondaryBtnText,
    subText,
    onClick,
    Icon3,
    index = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative w-full p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            onClick={onClick}
        >
            {/* Gloss Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex flex-col h-full justify-between gap-4 relative z-10">
                {/* Header: Image & Info */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-md">
                            <img
                                src={imageUrl || `https://picsum.photos/seed/${name}/200`}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                {name}
                            </h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                {title}
                            </p>
                            {statusText && (
                                <div className="inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/10 text-[10px] font-semibold text-green-700 dark:text-green-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    {statusText}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                {subText && (
                    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                        {subText}
                    </div>
                )}
                {/* Icons Row */}
                <div className="flex items-center gap-2 mt-auto">
                    {Icon3 && (
                        <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 dark:text-gray-400">
                            <Icon3 size={16} />
                        </div>
                    )}
                </div>

                {/* Actions Footer */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {SecondaryBtnText && (
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-colors">
                            {Icon2 && <Icon2 size={14} />}
                            {SecondaryBtnText}
                        </button>
                    )}
                    {PrimaryBtnText && (
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-xl transition-colors shadow-lg shadow-blue-500/0 hover:shadow-blue-500/20">
                            {Icon1 && <Icon1 size={14} />}
                            {PrimaryBtnText}
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProfileCard;
