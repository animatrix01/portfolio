
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Timeline from './Timeline';
import { DynamicNavigation } from './DynamicNavigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CopyButton } from './ui/CopyButton';
import BackIcon from './icons/BackIcon';
import FilledCheckedIcon from './icons/FilledCheckedIcon';

export interface ArticleSection {
    id: string;
    title: string;
}

interface ArticleLayoutProps {
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
    sections: ArticleSection[];
    title: string;
    date: string;
    category?: string;
    children: React.ReactNode;
    prevArticle?: { title: string; id: string };
    nextArticle?: { title: string; id: string };
}

export const ArticleLayout: React.FC<ArticleLayoutProps> = ({
    onNavigate,
    toggleTheme,
    isDark,
    sections,
    title,
    date,
    category = "Development",
    children,
    prevArticle,
    nextArticle
}) => {
    const triggerRef = useRef<HTMLHeadingElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>(sections[0]?.id || null);

    // Scroll Spy Logic
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for the fixed header
            const y = element.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const [toasts, setToasts] = useState<{ id: number }[]>([]);

    const handleCopyStatus = (isCopied: boolean) => {
        if (isCopied) {
            const newId = Date.now();
            setToasts(prev => [...prev, { id: newId }]);

            // Remove individual toast after 3 seconds
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== newId));
            }, 3000);
        }
    };

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                sections={sections}
                activeSectionId={activeSection}
                onSectionClick={scrollToSection}
                onNavigate={onNavigate}
                currentView="blog-post"
                enableIsland={true}
            />

            <Timeline
                sections={sections}
                activeId={activeSection}
                onSectionClick={scrollToSection}
            />

            <main className="px-6 md:px-0 pt-12 md:pt-20 relative z-10 max-w-4xl mx-auto">
                {/* Top Navigation Bar */}
                <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between pointer-events-none mix-blend-difference filter invert dark:invert-0">
                    <button
                        onClick={() => onNavigate('blogs')}
                        className="pointer-events-auto flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
                        title="Go Back"
                    >
                        <div className="p-1">
                            <BackIcon size={20} />
                        </div>
                        <span className="text-xs font-medium">Back</span>
                    </button>

                    <CopyButton
                        content={typeof window !== 'undefined' ? window.location.href : ''}
                        onCopiedChange={handleCopyStatus}
                        variant="ghost"
                        className="pointer-events-auto rounded-full hover:bg-black/5 dark:hover:bg-white/10 h-8 px-3"
                    >
                        <span className="text-xs font-medium">Copy Link</span>
                    </CopyButton>
                </div>

                {/* Helper Header Component to keep code clean */}
                <header id={sections[0]?.id || 'top'} className="max-w-2xl mx-auto mb-20 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
                    >
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                            <span className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/80 px-3 py-1 rounded-full text-xs font-medium border border-gray-200 dark:border-white/5">
                                {category}
                            </span>
                            <span className="text-gray-500 text-xs font-mono uppercase">{date}</span>
                        </div>

                        <h1
                            ref={triggerRef}
                            className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-white/60"
                        >
                            {title}
                        </h1>
                    </motion.div>
                </header>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="prose prose-lg max-w-2xl mx-auto pb-8 dark:prose-invert"
                >
                    {children}
                </motion.div>

                {/* Article Navigation */}
                <div className="max-w-4xl mx-auto mt-0 border-t border-gray-200 dark:border-white/10 pt-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Previous Button (Left) */}
                    <div className="w-full md:w-auto flex justify-center md:justify-start">
                        {prevArticle ? (
                            <button
                                onClick={() => onNavigate('blog-post', prevArticle.id)}
                                className="group flex flex-col items-center md:items-start gap-1 text-center md:text-left"
                            >
                                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Previous</span>
                                <div className="flex items-center gap-2 text-base font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                                    {prevArticle.title}
                                </div>
                            </button>
                        ) : <div className="hidden md:block w-40" />}
                    </div>

                    {/* Next Button (Right) */}
                    <div className="w-full md:w-auto flex justify-center md:justify-end">
                        {nextArticle ? (
                            <button
                                onClick={() => onNavigate('blog-post', nextArticle.id)}
                                className="group flex flex-col items-center md:items-end gap-1 text-center md:text-right"
                            >
                                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Next</span>
                                <div className="flex items-center gap-2 text-base font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {nextArticle.title}
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </button>
                        ) : <div className="hidden md:block w-40" />}
                    </div>

                </div>



            </main>

            {/* Stacked Toast Notifications */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast, index) => {
                        // Reverse index to stack newest on top (visually front)
                        // Actually, we want newest at the bottom of the stack visually?
                        // IOS: List, but when collapsed they stack.
                        // Let's do a "Card Stack" where newest is front, older are behind and scaled down.

                        const offset = toasts.length - 1 - index; // 0 for newest
                        const scale = 1 - offset * 0.05;
                        const y = offset * 10; // Move older ones down/up? Usually up or behind.
                        // Let's stack them going UP
                        const yDisplay = -offset * 15;
                        const opacity = 1 - offset * 0.2;

                        if (offset > 2) return null; // Only show top 3

                        return (
                            <motion.div
                                key={toast.id}
                                layout
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{
                                    opacity: opacity,
                                    y: yDisplay,
                                    scale: scale,
                                    zIndex: 100 - offset
                                }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                className="absolute bottom-0 right-0 p-4 pr-12 w-80 pointer-events-auto
                                     bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl 
                                     border border-black/5 dark:border-white/10 
                                     rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                                     flex items-start gap-3"
                            >
                                <div className="mt-0.5 pointer-events-none">
                                    <FilledCheckedIcon
                                        size={28}
                                        className="text-black dark:text-white shadow-sm rounded-md"
                                        tickClassName="fill-white dark:fill-black"
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="font-semibold text-[13px] text-gray-900 dark:text-white leading-tight">Copied</span>
                                    <span className="text-[13px] text-gray-500 dark:text-gray-400 leading-tight">Link added to clipboard</span>
                                </div>
                                <button
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </>
    );
};
