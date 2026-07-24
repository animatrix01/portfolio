"use client";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Transition,
    type Variants,
} from "framer-motion";
import {
    FileText,
    Search,
    Settings,
    User,
    X,
    Home,
    Briefcase,
    FlaskConical,
    Mail,
    Moon,
    Sun,
    Copy,
    Github,
    Twitter,
    Linkedin,
    AtSign,
    LayoutTemplate,
    Beaker
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";

// --- Types ---

type Command = {
    id: string;
    icon: any;
    label: string;
    shortcut?: string;
    description: string;
    action: () => void;
};

// --- Props ---

interface CommandPaletteProps {
    onNavigate: (view: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

const overlayTransition: Transition = { duration: 0.24, ease: "easeOut" };

export function CommandPalette({ onNavigate, toggleTheme, isDark }: CommandPaletteProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [hoveredCommandId, setHoveredCommandId] = useState<string | null>(null);
    const shouldReduceMotion = useReducedMotion();

    // Handle Keyboard Shortcut (Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Define Commands with actions
    const commands: Command[] = useMemo(() => [
        {
            id: "home",
            icon: Home,
            label: "Go to Home",
            shortcut: "H",
            description: "Navigate to the landing page",
            action: () => onNavigate("home"),
        },
        {
            id: "projects",
            icon: Briefcase,
            label: "View Projects",
            shortcut: "P",
            description: "See my recent work",
            action: () => onNavigate("projects"),
        },
        {
            id: "experiments",
            icon: FlaskConical,
            label: "Open Kanban Board",
            shortcut: "K",
            description: "Check out the Kanban experiment",
            action: () => onNavigate("kanban"),
        },
        {
            id: "blogs",
            icon: FileText,
            label: "Read Blog",
            shortcut: "B",
            description: "Read my latest articles",
            action: () => onNavigate("blogs"),
        },
        {
            id: "contact",
            icon: Mail,
            label: "Contact Me",
            shortcut: "C",
            description: "Get in touch",
            action: () => onNavigate("contact"),
        },
        {
            id: "experiments-new", // Added new experiments item
            icon: Beaker,
            label: "Experiments",
            description: "Explore various experiments",
            action: () => onNavigate("experiments"),
        },
        {
            id: "theme",
            icon: isDark ? Sun : Moon,
            label: `Switch to ${isDark ? "Light" : "Dark"} Mode`,
            shortcut: "T",
            description: "Toggle the color theme",
            action: () => toggleTheme(),
        },
        {
            id: "copy-email",
            icon: Copy,
            label: "Copy Email",
            shortcut: "E",
            description: "Copy my email address to clipboard",
            action: () => {
                navigator.clipboard.writeText("hello.animeshh@gmail.com");
                alert("Email copied to clipboard!");
            },
        },
        // --- Socials ---
        {
            id: "social-github",
            icon: Github,
            label: "GitHub",
            description: "Check out my open source work",
            action: () => window.open("https://github.com/animatrix01", "_blank"),
        },
        {
            id: "social-twitter",
            icon: Twitter,
            label: "Twitter / X",
            description: "Follow me for updates",
            action: () => window.open("https://x.com/animatrix01", "_blank"),
        },
        {
            id: "social-linkedin",
            icon: Linkedin,
            label: "LinkedIn",
            description: "Connect with me professionally",
            action: () => window.open("https://www.linkedin.com/in/thakuranimesh/", "_blank"),
        },
        {
            id: "social-email",
            icon: AtSign,
            label: "Email",
            description: "Send me a message directly",
            action: () => window.open("mailto:hello.animeshh@gmail.com", "_blank"),
        },
    ], [onNavigate, toggleTheme, isDark]);

    const filteredCommands = useMemo(
        () =>
            commands.filter((cmd) =>
                cmd.label.toLowerCase().includes(query.toLowerCase())
            ),
        [query, commands]
    );

    const handleSelect = (cmd: Command) => {
        cmd.action();
        setIsOpen(false);
        setQuery("");
    };

    const panelVariants: Variants = shouldReduceMotion
        ? {
            initial: { opacity: 0, y: 0, scale: 1 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 0, scale: 1 },
        }
        : {
            initial: { opacity: 0, scale: 0.96, y: 20, filter: "blur(6px)" },
            animate: {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.28, ease: [0.18, 0.89, 0.32, 1.12] },
            },
            exit: {
                opacity: 0,
                scale: 0.97,
                y: 12,
                filter: "blur(8px)",
                transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
            },
        };

    return (
        <>
            {/* Floating Trigger Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <motion.button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/80 px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 shadow-lg backdrop-blur-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                >
                    <Search className="h-4 w-4 text-gray-800 dark:text-gray-200" aria-hidden />
                    <span className="font-medium hidden md:inline">Search</span>
                    <kbd className="hidden md:inline-flex ml-2 items-center rounded border border-gray-200 dark:border-white/20 px-1.5 font-mono text-[10px] font-medium text-gray-400 dark:text-gray-500">
                        ⌘K
                    </kbd>
                </motion.button>
            </div>


            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            aria-hidden
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={overlayTransition}
                            onClick={() => setIsOpen(false)}
                        />

                        <div className="fixed inset-0 z-[65] flex items-start justify-center px-4 pt-24 sm:px-6 pointer-events-none">
                            <motion.div
                                role="dialog"
                                aria-modal="true"
                                aria-label="Command palette"
                                {...panelVariants}
                                className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#111]/90 backdrop-blur-2xl shadow-2xl pointer-events-auto"
                                onClick={(event: React.MouseEvent) => event.stopPropagation()}
                            >
                                {/* Background Blobs */}
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute inset-0 overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[100px]"
                                        animate={
                                            shouldReduceMotion
                                                ? undefined
                                                : {
                                                    opacity: [0.3, 0.6, 0.3],
                                                    scale: [0.92, 1.08, 0.98],
                                                }
                                        }
                                        transition={
                                            shouldReduceMotion
                                                ? undefined
                                                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
                                        }
                                    />
                                </div>

                                {/* Search Input */}
                                <div className="relative flex items-center gap-3 border-b border-gray-200 dark:border-white/10 px-5 py-4">
                                    <Search className="h-5 w-5 text-gray-400" aria-hidden />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search commands..."
                                        className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                        autoFocus
                                    />
                                    <motion.button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                    >
                                        <X className="h-4 w-4" aria-hidden />
                                    </motion.button>
                                </div>

                                {/* Command List */}
                                <motion.div
                                    className="relative max-h-[60vh] overflow-y-auto px-2 py-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {filteredCommands.length === 0 ? (
                                        <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                                            No results found.
                                        </div>
                                    ) : (
                                        <ul className="space-y-1" role="list">
                                            {filteredCommands.map((cmd, index) => {
                                                const Icon = cmd.icon;
                                                return (
                                                    <motion.li
                                                        key={cmd.id}
                                                        initial={{
                                                            opacity: shouldReduceMotion ? 1 : 0,
                                                            y: shouldReduceMotion ? 0 : 10,
                                                        }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={
                                                            shouldReduceMotion
                                                                ? { duration: 0 }
                                                                : {
                                                                    delay: 0.03 * index,
                                                                    duration: 0.2,
                                                                    ease: "easeOut",
                                                                }
                                                        }
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSelect(cmd)}
                                                            onMouseEnter={() => setHoveredCommandId(cmd.id)}
                                                            onMouseLeave={() => setHoveredCommandId(null)}
                                                            className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-white/5 focus:bg-gray-100 dark:focus:bg-white/5 outline-none"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                                                    <Icon className="h-4 w-4" aria-hidden />
                                                                </span>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                        {cmd.id === 'social-email' && hoveredCommandId === 'social-email' ? "hello.animeshh@gmail.com" : cmd.label}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500 dark:text-gray-500">
                                                                        {cmd.description}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            {cmd.shortcut && (
                                                                <kbd className="hidden sm:inline-block rounded border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 px-2 py-0.5 text-[10px] font-mono text-gray-400">
                                                                    {cmd.shortcut}
                                                                </kbd>
                                                            )}
                                                        </button>
                                                    </motion.li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </motion.div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
