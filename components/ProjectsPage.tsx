import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { DynamicNavigation } from './DynamicNavigation';
import { PixelCard } from './PixelCard';

interface ProjectsPageProps {
    onNavigate: (view: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const PROJECTS = [
    {
        title: "NextCareer AI",
        desc: "An AI-powered career platform that lets users build professional resumes and generate personalized career roadmaps.",
        tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Neon Postgres", "Clerk", "Upstash"],
        image: "https://picsum.photos/seed/nextcareer/600/400",
        link: "https://nextcareer-ai-one.vercel.app"
    },
    {
        title: "FraudLens",
        desc: "A real-time AI-powered fraud detection platform that analyzes messages, UPI IDs, QR codes, screenshots, and live phone calls to protect Indian users from scams — delivering instant verdicts with plain-language explanations and SMS alerts.",
        tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase pgvector", "Gemini 2.5 Flash", "Groq Llama 3", "Deepgram", "Twilio"],
        image: "https://picsum.photos/seed/fraudlens/600/400",
        link: "https://fraudlens-seven.vercel.app"
    }
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                onNavigate={onNavigate}
                currentView="projects"
                enableIsland={false}
            />

            <main className="px-6 pt-32 md:pt-48 pb-4 relative z-10 max-w-5xl mx-auto min-h-screen">

                {/* Header */}
                <div ref={triggerRef} className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-8xl font-serif text-gray-900 dark:text-white mb-6"
                    >
                        Selected Work
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl font-light"
                    >
                        A collection of projects exploring the intersection of design, engineering, and data science.
                    </motion.p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 mb-8">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#111]">
                                <PixelCard
                                    image={project.image}
                                    title={project.title}
                                    desc={project.desc}
                                    tags={project.tags}
                                    className="w-full h-full"
                                />

                                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-30 pointer-events-none">
                                    <ArrowUpRight className="w-5 h-5 text-black dark:text-white" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-2xl font-serif font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-[10px] uppercase font-bold tracking-widest text-gray-400 border border-gray-200 dark:border-white/10 px-2 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {project.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </main>
        </>
    );
};