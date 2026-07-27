import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Eye, ArrowRight, FileText, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

import { cn, triggerHaptic } from '../lib/utils';
import { ScrollReveal } from './ScrollReveal';
import { DynamicNavigation } from './DynamicNavigation';
import Timeline from './Timeline';
import RunStatsStacks from './RunStatsStacks';
import LabelIndicatorCarousel from './LabelIndicatorCarousel';
import { ToolsDock } from './ui/ToolsDock';

import { RainbowButton } from './RainbowButton';
import { NativeTypewriter } from './ui/NativeTypewriter';


import { NativeMagnetic } from './ui/NativeMagnetic';
import { SKILLS } from './ArraySkills';
import { ProjectCard } from './ui/ProjectCard'; // Import new ProjectCard
import { PreviewLinkCard } from './ui/PreviewLinkCard';
import { SkillsMarquee } from './ui/SkillsMarquee';
import { OrbitalStack } from './ui/OrbitalStack';
import { GitHubStarsButton } from './ui/GitHubStarsButton';
import { SkillIcon } from './ui/SkillIcon';
import { WorkTimeline } from './ui/WorkTimeline';
import { LocationIndicator } from './ui/LocationIndicator';
import { ScrollFillText } from './ui/ScrollFillText';

interface PortfolioHomeProps {
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const SECTIONS = [
    { id: 'about', title: 'About' },
    { id: 'work', title: 'Engineering Journey' },
    { id: 'skills', title: 'Tech Stack' },
    { id: 'articles', title: 'Articles' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
];

const EXPERIENCE_DATA = [
    {
        company: "AI Engineer & Full-Stack Developer",
        role: "Independent Builder",
        date: "2026 - Present",
        desc: "A continuous journey of mastering modern web architecture and generative AI, moving from foundational full-stack development to architecting intelligent, scalable systems.",
        details: [
            "The Foundation (Locking In): Dedicated a focused two-month lock-in period to master the modern web ecosystem, building robust backends with Node.js, Express, and PostgreSQL, while architecting clean UIs with React and Tailwind CSS.",
            "Architecting the Stack: Scaled up to production-grade tools, utilizing Next.js 15, Drizzle ORM, and Clerk for authentication to build highly optimized, full-stack dashboards and applications.",
            "AI Internals & Automation: Deep diving into the core architecture of Large Language Models (studying model building from scratch) and exploring intelligent workflow orchestration using AI agents and n8n.",
            "Shipping Real-World Systems: Bridging full-stack and AI by building platforms like NextCareer AI, FraudLens, and  Actively collaborating to integrate polished, high-performance frontends with complex Python-based AI backends."
        ]
    }
];


export const PortfolioHome: React.FC<PortfolioHomeProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLHeadingElement>(null);
    const [activeSection, setActiveSection] = useState<string | null>('about');
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

        SECTIONS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        triggerHaptic(5);
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    const handleNavWithHaptic = (view: string) => {
        triggerHaptic(10);
        onNavigate(view);
    };

    // Safe safe skills to prevent crash if import fails or undefined
    const safeSkills = Array.isArray(SKILLS) ? SKILLS : [];

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                sections={SECTIONS}
                activeSectionId={activeSection}
                onSectionClick={scrollToSection}
                onNavigate={onNavigate}
                currentView="home"
                enableIsland={true}
                shouldHideDock={activeSection === 'contact'}
            />

            {/* Timeline Sidebar (Desktop Only) */}
            <Timeline
                sections={SECTIONS}
                activeId={activeSection}
                onSectionClick={scrollToSection}
            />

            {/* --- BACKGROUND EFFECTS: Blue God Rays & Lighting (Extremely Subtle) --- */}
            <div className="absolute top-0 left-0 w-full h-[400px] z-0 overflow-hidden pointer-events-none select-none">
                {/* Main Blue Glow at Top Center - Reduced intensity significantly */}
                <div className="absolute -top-[350px] left-1/2 -translate-x-1/2 w-[80vw] md:w-[600px] h-[400px] bg-blue-500/5 dark:bg-blue-600/5 blur-[60px] rounded-[100%] mix-blend-screen opacity-20" />

                {/* God Rays / Conic Light Effect - Barely visible hint */}
                <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[100vw] h-[500px] bg-[conic-gradient(from_0deg_at_50%_-10%,transparent_45%,rgba(59,130,246,0.02)_49%,rgba(59,130,246,0.02)_51%,transparent_55%)] opacity-10 blur-3xl dark:opacity-5" />

                {/* Subtle Highlight Beam - Top line only */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] bg-gradient-to-b from-blue-50/10 to-transparent dark:from-blue-500/5 dark:to-transparent blur-[40px] opacity-20 pointer-events-none" />
            </div>

            <main className="max-w-4xl mx-auto px-6 pt-12 md:pt-40 pb-6 relative z-10">

                {/* --- HERO / ABOUT SECTION --- */}
                <section id="about" className="mb-16 scroll-mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">

                        {/* Profile Picture - Top on mobile, Right on desktop */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.2}
                            whileHover={{ scale: 1.05, cursor: "grab" }}
                            whileDrag={{ cursor: "grabbing", scale: 1.1 }}
                            className="relative shrink-0 w-24 md:w-[180px] md:order-last z-20 touch-none"
                        >
                            <div className="aspect-square w-full rounded-2xl border border-gray-200 dark:border-white/10 p-1 bg-white dark:bg-[#111] shadow-xl overflow-hidden pointer-events-none select-none">
                                <img
                                    src="/profile.jpg"
                                    alt="Animesh profile"
                                    className="w-full h-full rounded-xl object-cover pointer-events-none"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-serif text-[10px] border-2 border-white dark:border-black shadow-lg">
                                    A
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1 flex flex-col justify-between self-stretch">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col h-full"
                            >
                                <div>
                                    <div className="mb-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm transition-all hover:bg-emerald-500/10">
                                            <div className="relative flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10" />
                                                <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 duration-1000" />
                                            </div>
                                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 tracking-wide">Available for new projects</span>
                                        </div>
                                    </div>
                                    <h1 ref={triggerRef} className="text-3xl md:text-4xl font-serif font-medium text-gray-900 dark:text-white mb-2 leading-tight text-balance">
                                        Hi, I'm Animesh
                                    </h1>

                                    {/* Typewriter Role Text */}
                                    <div className="mb-2 h-10 md:h-12 flex items-center">
                                        <NativeTypewriter
                                            content={[
                                                "Full Stack Developer",
                                                "Data Scientist",
                                                "UI/UX Designer",
                                                "Creative Developer",
                                                "Problem Solver",
                                                "Entrepreneur"
                                            ]}
                                            speed="medium"
                                            loop={true}
                                            className="text-lg md:text-2xl font-bold text-gray-400 dark:text-gray-500"
                                        />
                                    </div>

                                    <div className="prose dark:prose-invert prose-gray max-w-lg mb-6">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base text-pretty">
                                            Building polished digital experiences <LocationIndicator />. Currently a developer combining engineering rigor with creative design.
                                        </p>
                                    </div>
                                </div>


                            </motion.div>
                        </div>
                    </div>
                </section>



                {/* --- WORK EXPERIENCE --- */}
                <section id="work" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        Engineering Journey
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>
                    <div className="flex flex-col">
                        <WorkTimeline items={EXPERIENCE_DATA} />
                    </div>
                </section>

                {/* --- PHILOSOPHY REVEAL --- */}
                {/* --- PHILOSOPHY REVEAL --- */}
                {/* Moved to bottom */}


                {/* --- SKILLS --- */}
                <section id="skills" className="mb-16 scroll-mt-32">
                    <div className="mb-6">
                        <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                            Tech Stack
                            <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono tracking-wide">
                            The arsenal for building digital experiences.
                        </p>
                    </div>

                    {/* Orbital layout — fixed h-[450px] prevents overlap with sections below */}
                    <div className="relative w-full max-w-3xl mx-auto h-[450px] md:h-[500px] flex items-center justify-center my-12">
                        <OrbitalStack />
                    </div>

                    {/* Integrated Tools Section */}
                    <div className="mt-16">
                        <ToolsDock />
                    </div>
                </section>

                {/* --- ARTICLES --- */}
                <section id="articles" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        Articles
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>
                    <div className="space-y-6">
                        {/* Wrapped in PreviewLinkCard for hover effect */}
                        <div className='flex flex-col gap-4'>
                            <PreviewLinkCard
                                href="/blogs"
                                title="The Future of Interface Design"
                                subtitle="Exploring spatial computing and glassmorphism"
                                date="Aug 12, 2024"
                                readTime="4 min read"
                                description="Deep dive into the next generation of user interfaces, focusing on spatial computing paradigms and the evolution of glassmorphism in modern web apps."
                                className="block w-full"
                                previewImage="https://i.pinimg.com/originals/62/6e/db/626edb1f706ad87f7ec2716e32132f68.gif"
                            >
                                <ArticleItem
                                    title="The Future of Interface Design"
                                    date="Aug 12, 2024"
                                    readTime="4 min read"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerHaptic(10); onNavigate('blogs', 'interface-design'); }}
                                />
                            </PreviewLinkCard>

                            <PreviewLinkCard
                                href="/blogs"
                                title="Scaling Distributed Systems"
                                subtitle="Lessons learned from high-traffic architecture"
                                date="Sep 05, 2024"
                                readTime="7 min read"
                                description="Practical strategies for scaling node.js microservices under high load, managing database consistency, and implementing effective caching layers."
                                className="block w-full"
                                previewImage="https://i.pinimg.com/originals/aa/dc/d3/aadcd3904af2dcaeb268101456bf2216.gif"
                            >
                                <ArticleItem
                                    title="Scaling Distributed Systems"
                                    date="Sep 05, 2024"
                                    readTime="7 min read"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerHaptic(10); onNavigate('blogs', 'distributed-systems'); }}
                                />
                            </PreviewLinkCard>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <NativeMagnetic>
                            <button onClick={() => handleNavWithHaptic('blogs')} className="group flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors active:scale-95">
                                See more articles
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </NativeMagnetic>
                    </div>
                </section>

                {/* --- PROJECTS --- */}
                <section id="projects" className="mb-16 scroll-mt-32">
                    <h2 className="text-2xl font-serif text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                        Selected Projects
                        <div className="h-[1px] flex-1 bg-gray-200 dark:bg-white/10" />
                    </h2>

                    {/* Grid of 2 Projects - Professional Apple Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ProjectCard
                            index={0}
                            title="NextCareer AI"
                            description="An AI-powered career platform that lets users build professional resumes and generate personalized career roadmaps."
                            tags={["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Neon Postgres", "Clerk", "Upstash"]}
                            link="https://nextcareer-ai-one.vercel.app"
                            imageUrl="https://i.pinimg.com/originals/99/ca/28/99ca287813fd0e1f689489fa9550dbcd.gif"
                            githubUrl="https://github.com/animatrix01"
                            isDimmed={hoveredProject !== null && hoveredProject !== 0}
                            onHover={() => setHoveredProject(0)}
                            onLeave={() => setHoveredProject(null)}
                        />
                        <ProjectCard
                            index={1}
                            title="FraudLens"
                            description="A real-time AI-powered fraud detection platform that analyzes messages, UPI IDs, QR codes, screenshots, and live phone calls to protect Indian users from scams — delivering instant verdicts with plain-language explanations and SMS alerts."
                            tags={["Next.js 16", "TypeScript", "Tailwind CSS", "Supabase pgvector", "Gemini 2.5 Flash", "Groq Llama 3", "Deepgram", "Twilio"]}
                            link="https://fraudlens-seven.vercel.app"
                            imageUrl="https://i.pinimg.com/originals/0a/d7/35/0ad735f722522d9a424b2a018ff63319.gif"
                            githubUrl="https://github.com/animatrix01"
                            isDimmed={hoveredProject !== null && hoveredProject !== 1}
                            onHover={() => setHoveredProject(1)}
                            onLeave={() => setHoveredProject(null)}
                        />
                    </div>

                    <div className="mt-12 flex justify-center">
                        <p className="text-sm font-mono font-medium animate-shimmer bg-[linear-gradient(110deg,#939393,45%,#1e1e1e,55%,#939393)] dark:bg-[linear-gradient(110deg,#939393,45%,#e5e5e5,55%,#939393)] bg-[length:200%_100%] bg-clip-text text-transparent">
                            Cooking more...
                        </p>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <NativeMagnetic>
                            <button onClick={() => handleNavWithHaptic('projects')} className="group flex items-center gap-2 px-6 py-2 rounded-full border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors active:scale-95">
                                View all projects
                                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </NativeMagnetic>
                    </div>
                </section>

                {/* --- PHILOSOPHY REVEAL (Moved here) --- */}
                <div className="mb-16">
                    <ScrollFillText />
                </div>


                {/* --- CONTACT --- */}
                <section id="contact" className="mb-0 scroll-mt-32 pb-0">
                    <div className="flex flex-col items-center text-center">

                        {/* Socials Label - Moved above */}
                        <div className="mb-6">
                            <span className="px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                                Socials
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-6">
                            Let's build something extraordinary
                        </h2>

                        {/* Single Line Handwritten Text */}
                        <p className="font-handwriting text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12  origin-center">
                            DM me on X or Drop a Mail
                        </p>

                        {/* Social Dock */}
                        <div className="relative z-10 mb-8">
                            <SocialDock />
                        </div>

                        {/* Footer Credit */}
                        <div className="mt-0 mb-0 w-full">
                            {/* Quote */}
                            <div className="mb-8 text-center">
                                <p className="font-serif italic text-sm md:text-base text-gray-400 dark:text-gray-500">
                                    "The details are not the details. They make the design."
                                </p>
                            </div>

                            {/* Split Layout */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full border-t border-gray-100 dark:border-white/5 pt-6">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5 opacity-90 order-2 md:order-1">
                                    Built with love by
                                    <span
                                        className="relative font-semibold text-gray-900 dark:text-white group cursor-pointer inline-block"
                                        onClick={() => triggerHaptic(10)}
                                    >
                                        Animesh
                                    </span>
                                    <span className="hover:animate-pulse transition-transform cursor-default">🫶</span>
                                </p>
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide order-1 md:order-2">
                                    © {new Date().getFullYear()}. Engineered with Soul.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};

// --- Sub Components ---

const XIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" />
    </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.22 24 3.434 24 5.457z" />
    </svg>
);

const SocialDock = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const socialLinks = [
        { icon: XIcon, label: "Twitter", href: "https://x.com/animatrix01" },
        { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/thakuranimesh/" },
        { icon: GmailIcon, label: "Email", href: "mailto:hello.animeshh@gmail.com" },
        { icon: Github, label: "GitHub", href: "https://github.com/animatrix01" }
    ];

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText('hello.animeshh@gmail.com');
        setCopied(true);
        triggerHaptic(15);
        setTimeout(() => setCopied(false), 2000);
    };

    const getWidth = (index: number) => {
        const baseWidth = 56;
        if (hoveredIndex === null) return baseWidth;
        const distance = Math.abs(hoveredIndex - index);
        if (distance === 0) return 68;
        if (distance === 1) return 60;
        return baseWidth;
    };
    return (
        <div className="flex justify-center items-end h-[70px] pb-2">
            <ul className="flex items-end gap-2 list-none m-0 p-0">
                {socialLinks.map((link, index) => (
                    <li
                        key={link.label}
                        className="relative flex items-center justify-center transition-all duration-300"
                        style={{ width: `${getWidth(index)}px` }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => triggerHaptic(10)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === index && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                                    exit={{ opacity: 0, y: 5, scale: 0.9, x: "-50%" }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-medium rounded-md whitespace-nowrap z-20 shadow-lg hidden md:block cursor-pointer pointer-events-auto"
                                    onClick={(e) => {
                                        if (link.label === 'Email') {
                                            handleCopy(e);
                                        }
                                    }}
                                >
                                    {link.label === 'Email' ? (
                                        <div className="flex items-center gap-2 group/tooltip">
                                            <span>hello.animeshh@gmail.com</span>
                                            <div className="p-1 rounded-md bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
                                                {copied ? (
                                                    <Check className="w-3 h-3 text-green-400 dark:text-green-600" />
                                                ) : (
                                                    <Copy className="w-3 h-3 text-gray-400 group-hover/tooltip:text-white dark:group-hover/tooltip:text-black transition-colors" />
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        link.label
                                    )}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black dark:border-t-white" />
                                    {/* Invisible bridge to prevent mouseleave when moving to tooltip */}
                                    <div className="absolute top-full left-0 w-full h-4 bg-transparent" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <a
                            href={link.href}
                            target={link.label === 'Email' ? undefined : "_blank"}
                            rel={link.label === 'Email' ? undefined : "noopener noreferrer"}
                            className="w-full aspect-square p-1 flex items-center justify-center"
                        >
                            <div className="w-full h-full rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-sm hover:border-gray-300 dark:hover:border-white/20 transition-all active:scale-95">
                                <link.icon className="w-1/2 h-1/2 text-gray-700 dark:text-gray-200" />
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};



const ArticleItem = ({ title, date, readTime, onClick }: { title: string, date: string, readTime: string, onClick: (e: React.MouseEvent) => void }) => (
    <button onClick={onClick} className="w-full text-left group flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/5 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 px-4 rounded-lg transition-colors -mx-4 active:bg-gray-100 dark:active:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
        <div>
            <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
            <span className="text-xs text-gray-500 mt-1 inline-block">{date}</span>
        </div>

        {/* Animated Arrow + Read Time */}
        <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-400">{readTime}</span>
            <div className="w-4 h-4 overflow-hidden relative flex items-center justify-center">
                <ArrowRight
                    size={16}
                    className="absolute text-blue-500 transform transition-all duration-300 opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100"
                />
            </div>
        </div>
    </button>
);
