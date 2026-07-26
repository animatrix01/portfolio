
import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn, triggerHaptic } from '../../lib/utils';
import { Calendar, Briefcase } from 'lucide-react';

export interface ExperienceItemProps {
    role: string;
    company: string;
    date: string;
    desc: string;
    details?: string[];
    logo?: string;
    index?: number;
}

const TimelineItem = ({ role, company, date, desc, details, logo, index }: ExperienceItemProps) => {
    return (
        <motion.div
            className="group relative flex gap-4 md:gap-6 pb-8 last:pb-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index ? index * 0.1 : 0 }}
        >
            {/* 1. Timeline Track Marker (Dot) */}
            <div className="shrink-0 w-12 flex justify-center pt-3 relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-zinc-800 border-2 border-white dark:border-black ring-1 ring-gray-100 dark:ring-white/10 group-hover:bg-blue-500 group-hover:ring-blue-500/30 transition-all duration-500" />
            </div>

            {/* 2. Content Column */}
            <div className="flex-1 pt-1">
                {/* Header Row */}
                <div className="flex flex-row items-center gap-3 mb-1">

                    {/* Logo - Beside line */}
                    <div className="shrink-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                            {logo ? (
                                <img src={logo} alt={company} className="w-full h-full object-contain p-1.5 opacity-90 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <span className="text-base font-bold text-gray-400 dark:text-gray-500">{company.charAt(0)}</span>
                            )}
                        </div>
                    </div>

                    {/* Text Header */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                {company}
                            </h3>
                            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-2 py-0.5 rounded-full w-fit transition-colors duration-300">
                                <Calendar size={10} />
                                {date}
                            </div>
                        </div>

                        <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2 transition-colors duration-300 mt-0.5">
                            <Briefcase size={12} />
                            {role}
                        </div>
                    </div>
                </div>

                {/* Expandable Content: Description + Details */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]">
                    <div className="overflow-hidden">
                        <div className="pt-3 pl-2">
                            {/* Description moved here */}
                            <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-3 text-pretty transition-colors duration-300 max-w-2xl">
                                {desc}
                            </p>

                            <div className="pl-3 border-l-[1.5px] border-blue-500/20 ml-1">
                                <ul className="space-y-2 pb-2">
                                    {details?.map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pl-2 relative flex items-start gap-2 transition-colors duration-300"
                                        >
                                            <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const WorkTimeline = ({ items }: { items: Omit<ExperienceItemProps, 'index'>[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative pl-0">
            {/* TRACK LINES - Centered in the 48px (w-12) column of the markers */}
            {/* Center of w-12 (48px) is 24px. */}

            {/* 1. Gray Background Line */}
            <div className="absolute left-[23px] top-4 bottom-0 w-[2px] bg-gray-100 dark:bg-white/5 z-0" />

            {/* 2. Blue Progress Line */}
            <div className="absolute left-[23px] top-4 bottom-0 w-[2px] bg-transparent z-0 overflow-hidden">
                <motion.div
                    className="w-full bg-blue-500 origin-top"
                    style={{ scaleY, height: '100%' }}
                />
            </div>

            <div className="relative z-10 space-y-0">
                {items.map((item, index) => (
                    <TimelineItem key={index} {...item} index={index} />
                ))}
            </div>
        </div>
    );
};
