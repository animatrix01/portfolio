import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DynamicNavigation } from './DynamicNavigation';
import { ArrowRight } from 'lucide-react';
interface BlogListPageProps {
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const POSTS = [
    {
        id: "interface-design",
        title: "The Future of Interface Design",
        date: "Aug 12, 2024",
        excerpt: "Moving beyond screens: Spatial computing, generative UI, and the shift towards intent-based interaction.",
        readTime: "4 min read"
    },
    {
        id: "distributed-systems",
        title: "Scaling Distributed Systems",
        date: "Sep 05, 2024",
        excerpt: "Understanding the CAP theorem, event sourcing, and strategies for global scale architecture.",
        readTime: "7 min read"
    },
    {
        id: "design-systems",
        title: "Understanding Design Systems",
        date: "Apr 02, 2024",
        excerpt: "Building a coherent visual language that scales across engineering and design teams.",
        readTime: "6 min read"
    },
    {
        id: "scroll-animations",
        title: "Mastering Scroll-Driven Animations",
        date: "Mar 10, 2024",
        excerpt: "Using the new CSS Scroll-Timeline API to create immersive storytelling experiences without JS.",
        readTime: "4 min read"
    }
];

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    const handlePostClick = (id: string) => {
        onNavigate('blogs', id);
    };

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                onNavigate={onNavigate}
                currentView="blogs"
                enableIsland={false}
            />

            <main className="px-6 pt-32 md:pt-48 pb-4 relative z-10 max-w-3xl mx-auto min-h-screen">

                {/* Header */}
                <div ref={triggerRef} className="mb-20 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-7xl font-serif text-gray-900 dark:text-white mb-6"
                    >
                        Writing
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 font-light"
                    >
                        Thoughts on software engineering, design, and user experience.
                    </motion.p>
                </div>

                {/* Blog List */}
                <div className="flex flex-col gap-8 mb-8">
                    {POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => handlePostClick(post.id)}
                            className="group cursor-pointer py-8 border-b border-gray-200 dark:border-white/10 last:border-0"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 gap-2">
                                <h2 className="text-2xl font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>
                                <span className="text-sm font-mono text-gray-400 shrink-0">{post.date}</span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 max-w-xl">
                                {post.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                                Read Article <ArrowRight size={14} />
                            </div>
                        </motion.article>
                    ))}
                </div>

            </main>
        </>
    );
};