import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { NativeMagnetic } from './ui/NativeMagnetic';
import { cn, triggerHaptic } from '../lib/utils';
import { GSAPMenuLink } from './GSAPMenuLink';
import { ChevronDown, Check, Sun, Moon } from 'lucide-react';
import { NumberTicker } from './NumberTicker';
import { AppleDock } from './AppleDock';

interface DynamicNavigationProps {
    triggerRef: React.RefObject<HTMLElement>;
    toggleTheme: () => void;
    isDark: boolean;
    sections?: { id: string; title: string }[];
    activeSectionId?: string | null;
    onSectionClick?: (id: string) => void;
    onNavigate: (view: string) => void;
    currentView: string;
    enableIsland?: boolean;
    shouldHideDock?: boolean;
}

const NAV_ITEMS = [
    { name: 'HOME', view: 'home' },
    { name: 'PROJECTS', view: 'projects' },
    { name: 'BLOGS', view: 'blogs' },
    { name: 'CONTACT', view: 'contact' },
];

// High stiffness = fast. Low damping = bouncy. Low mass = lightweight/snappy.
const SPRING_TRANSITION = { type: "spring" as const, stiffness: 500, damping: 22, mass: 0.6 };

export const DynamicNavigation: React.FC<DynamicNavigationProps> = ({
    triggerRef,
    toggleTheme,
    isDark,
    sections = [],
    activeSectionId,
    onSectionClick,
    onNavigate,
    currentView,
    enableIsland = false,
    shouldHideDock = false
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Mobile Detection
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Island State
    const [isScrolled, setIsScrolled] = useState(false);
    const [isIslandExpanded, setIsIslandExpanded] = useState(false);
    const { scrollYProgress } = useScroll();
    const [progressValue, setProgressValue] = useState(0);
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        setProgressValue(Math.round(latest * 100));
    });

    useEffect(() => {
        const handleScroll = () => {
            if (!enableIsland) {
                if (isScrolled) setIsScrolled(false);
                return;
            }
            if (triggerRef.current) {
                // Use getBoundingClientRect for accurate position relative to viewport
                const rect = triggerRef.current.getBoundingClientRect();
                // Calculate the absolute bottom position of the trigger element in the document
                const triggerBottomAbsolute = rect.bottom + window.scrollY;

                // Trigger slightly before (100px) the user scrolls past the element
                const shouldBeScrolled = window.scrollY > (triggerBottomAbsolute - 100);

                if (shouldBeScrolled !== isScrolled) {
                    setIsScrolled(shouldBeScrolled);
                    triggerHaptic(5); // Subtle haptic on mode switch
                    // If we scroll back up, ensure island is closed so menu trigger looks right
                    if (!shouldBeScrolled) setIsIslandExpanded(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [triggerRef, isScrolled, enableIsland]);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                setIsIslandExpanded(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const handleNavClick = (view: string) => {
        triggerHaptic(15);
        onNavigate(view);
        setIsOpen(false);
    };

    const handleToggle = () => {
        triggerHaptic(10);
        if (isIslandMode) {
            setIsIslandExpanded(!isIslandExpanded);
        } else {
            setIsOpen(!isOpen);
        }
    };

    const handleThemeToggle = () => {
        triggerHaptic(10);
        toggleTheme();
    };

    // Logic to determine active mode
    // 1. Island Mode: Scrolled AND Island Enabled AND Menu is NOT open AND Not Hidden
    const isIslandMode = isScrolled && enableIsland && !isOpen && !shouldHideDock;

    // Responsive Widths
    const getOpenWidth = () => isMobile ? "90vw" : 540;
    const getClosedWidth = () => isMobile ? 200 : 290;
    const getIslandWidth = () => {
        if (isMobile) return isIslandExpanded ? 300 : 220;
        return isIslandExpanded ? 305 : 235;
    };
    const getTriggerHeight = () => {
        if (isIslandMode) return isIslandExpanded ? "auto" : 43;
        return isMobile ? 48 : 58;
    };

    return (
        <>
            {/* BACKGROUND BACKDROP */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* TOP RIGHT THEME TOGGLE BUTTON - Desktop Only */}
            {/* Hidden when Dock is visible (isIslandMode) or Menu is open or on Mobile */}
            <NativeMagnetic strength={0.2}>
                <motion.button
                    onClick={handleThemeToggle}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: (isOpen || isIslandMode) ? 0 : 1,
                        scale: (isOpen || isIslandMode) ? 0.9 : 1,
                        pointerEvents: (isOpen || isIslandMode) ? 'none' : 'auto'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={cn(
                        "fixed top-7 right-6 z-40 w-[44px] h-[44px] hidden md:flex items-center justify-center",
                        "bg-white/80 dark:bg-[#111]/80 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-sm",
                        "rounded-full text-gray-800 dark:text-white"
                    )}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isDark ? (
                            <motion.div
                                key="moon"
                                initial={{ rotate: -90, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 90, scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Moon size={20} className="fill-current" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sun"
                                initial={{ rotate: -90, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                exit={{ rotate: 90, scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Sun size={20} className="fill-current" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </NativeMagnetic>

            {/* FIXED CONTAINER - Top reduced from 8 to 7 */}
            <div className="fixed top-7 left-0 w-full z-50 flex flex-col items-center pointer-events-none">

                {/* 
            UNIFIED TRIGGER BUTTON 
        */}
                <div className="pointer-events-auto z-50">
                    <motion.button
                        layout
                        onClick={handleToggle}
                        transition={SPRING_TRANSITION}
                        className={cn(
                            "relative flex items-center overflow-hidden shadow-2xl border transition-colors duration-300",
                            // Invert Colors based on theme
                            "bg-[#111] dark:bg-white border-white/10 dark:border-black/5",
                            "hover:bg-[#1a1a1a] dark:hover:bg-[#f2f2f2]",
                            isIslandMode ? "rounded-[29px]" : "rounded-[14px]" // Reduced radii
                        )}
                        style={{
                            height: getTriggerHeight(),
                        }}
                        animate={{
                            width: isOpen
                                ? getOpenWidth()
                                : (isIslandMode ? getIslandWidth() : getClosedWidth())
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            {isIslandMode ? (
                                /* --- ISLAND CONTENT --- */
                                <motion.div
                                    key="island-content"
                                    initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col w-full px-1"
                                >
                                    {/* h-12 -> h-[43px] to match container */}
                                    <div className="flex items-center justify-between w-full pl-2 pr-2 h-[43px]">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <span className={cn(
                                                "text-[12px] font-medium truncate max-w-[100px] md:max-w-[130px]", // Reduced font size and max-width for mobile
                                                "text-white dark:text-black"
                                            )}>
                                                {sections.find(s => s.id === activeSectionId)?.title || "Contents"}
                                            </span>
                                            <ChevronDown size={13} className={cn("text-white/50 dark:text-black/50 transition-transform", isIslandExpanded && "rotate-180")} />
                                        </div>

                                        <div className="flex items-center gap-3 pl-2">
                                            <div className="text-[10px] font-medium text-white dark:text-black tabular-nums">
                                                <NumberTicker value={progressValue} />
                                            </div>
                                            <div className="relative w-3.5 h-3.5 flex items-center justify-center"> {/* w-4 h-4 -> w-3.5 h-3.5 */}
                                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="5" className="text-white/20 dark:text-black/10" />
                                                    <motion.path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="5" className="text-white dark:text-black" style={{ pathLength: smoothProgress }} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Island Dropdown (TOC) */}
                                    {isIslandExpanded && sections.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden w-full pb-2 px-1"
                                        >
                                            <div className="h-[1px] w-full bg-white/10 dark:bg-black/5 mb-2" />
                                            <div className="flex flex-col gap-0.5 max-h-[180px] overflow-y-auto custom-scrollbar"> {/* max-h-200 -> 180 */}
                                                {sections.map((section) => (
                                                    <button
                                                        key={section.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            triggerHaptic(10);
                                                            if (onSectionClick) onSectionClick(section.id);
                                                            setIsIslandExpanded(false);
                                                        }}
                                                        className={cn(
                                                            "flex items-center justify-between px-3 py-1.5 rounded-lg text-[12px] transition-colors text-left", // py-2 -> py-1.5, text-13 -> 12
                                                            activeSectionId === section.id
                                                                ? "bg-white/15 dark:bg-black/5 text-white dark:text-black font-medium"
                                                                : "text-white/60 dark:text-black/60 hover:bg-white/10 dark:hover:bg-black/5"
                                                        )}
                                                    >
                                                        <span className="truncate">{section.title}</span>
                                                        {activeSectionId === section.id && <Check size={11} className="opacity-60 shrink-0 ml-2" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                /* --- MENU TRIGGER CONTENT --- */
                                <motion.div
                                    key="menu-trigger"
                                    initial={{ opacity: 0, y: -20, filter: 'blur(5px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                        "flex items-center justify-between w-full h-full",
                                        isMobile ? "px-4" : "px-6"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <StellarBuddy className={isMobile ? "scale-75 origin-left" : "scale-100 md:scale-100"} />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Mobile Theme Toggle - Inline */}
                                        {isMobile && (
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleThemeToggle();
                                                }}
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 dark:bg-black/5 text-white/90 dark:text-black/80 hover:bg-white/20 dark:hover:bg-black/10 transition-colors cursor-pointer active:scale-95"
                                            >
                                                {isDark ? <Moon size={14} className="fill-current" /> : <Sun size={14} className="fill-current" />}
                                            </div>
                                        )}

                                        <div className="relative h-3.5 w-11 overflow-hidden flex flex-col items-end"> {/* h-4 -> 3.5, w-12 -> 11 */}
                                            <div className={cn(
                                                "flex flex-col items-end gap-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.725,0,1)]",
                                                isOpen ? "-translate-y-[18px]" : "translate-y-0" // 20px -> 18px
                                            )}>
                                                <span className="text-[10px] font-bold tracking-widest text-white/90 dark:text-black h-[14px] flex items-center">MENU</span> {/* text-11 -> 10, h-16 -> 14 */}
                                                <span className="text-[10px] font-bold tracking-widest text-white/90 dark:text-black h-[14px] flex items-center">CLOSE</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* 
            EXPANDED MENU CONTENT 
            (Only visible when Open)
        */}
                <div className="flex flex-col items-center gap-2 mt-2 w-full perspective-1000">

                    {/* MAIN CARD (NAVIGATION) */}
                    <motion.div
                        initial={false}
                        animate={isOpen ? {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: 360, // 400 -> 360
                            width: getOpenWidth(),
                            pointerEvents: "auto"
                        } : {
                            opacity: 0,
                            y: -20,
                            scale: 0.95,
                            height: 0,
                            width: isMobile ? 200 : 250, // 280 -> 250
                            pointerEvents: "none"
                        }}
                        transition={SPRING_TRANSITION}
                        className="relative bg-[#0a0a0a] dark:bg-white border border-white/10 dark:border-black/5 rounded-[18px] shadow-2xl overflow-hidden flex flex-col items-center origin-top" // rounded-20 -> 18
                    >
                        <div className="w-full h-full py-6 px-5 flex flex-col items-center justify-center"> {/* py-8->6, px-6->5 */}
                            {NAV_ITEMS.map((item, idx) => (
                                <div
                                    key={item.name}
                                    className="group relative flex items-center justify-center w-full py-1"
                                >
                                    <GSAPMenuLink
                                        text={item.name}
                                        onClick={() => handleNavClick(item.view)}
                                        className={cn(
                                            // Reduced font sizes for mobile
                                            "font-serif font-bold text-[2.2rem] md:text-[4rem] text-white dark:text-black tracking-tighter transition-colors duration-300",
                                            "hover:text-white/50 dark:hover:text-black/50"
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* APPLE STYLE DOCK - Appears only when scrolled (Island Mode) */}
            <AppleDock
                visible={Boolean(isIslandMode)}
                onNavigate={onNavigate}
                toggleTheme={handleThemeToggle}
                isDark={isDark}
            />
        </>
    );
};

// --- Stellar Buddy Component ---

const StellarBuddy = ({ className }: { className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftPupilRef = useRef<HTMLDivElement>(null);
    const rightPupilRef = useRef<HTMLDivElement>(null);
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const movePupils = (e: MouseEvent | TouchEvent) => {
            if (!containerRef.current || !leftPupilRef.current || !rightPupilRef.current) return;

            let clientX, clientY;
            if ('touches' in e) {
                // For touch events, we might not want to track as aggressively or at all,
                // but if we do, use the first touch.
                return; // Disable pupil tracking on touch to save perfs
            } else {
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }

            const rect = containerRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            // Limit movement range (approx 15% of size)
            const maxMove = rect.width * 0.15;

            let dx = clientX - cx;
            let dy = clientY - cy;

            const dist = Math.hypot(dx, dy);
            if (dist > maxMove) {
                dx = (dx / dist) * maxMove;
                dy = (dy / dist) * maxMove;
            }

            const transform = `translate(${dx}px, ${dy}px)`;
            leftPupilRef.current.style.transform = transform;
            rightPupilRef.current.style.transform = transform;
        };

        window.addEventListener('mousemove', movePupils);
        return () => window.removeEventListener('mousemove', movePupils);
    }, []);

    // Blinking Logic
    useEffect(() => {
        let blinkTimeout: ReturnType<typeof setTimeout>;

        const blink = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);

            // Random interval between 3s and 6s
            const nextBlink = Math.random() * 3000 + 3000;
            blinkTimeout = setTimeout(blink, nextBlink);
        };

        blinkTimeout = setTimeout(blink, 3000);
        return () => clearTimeout(blinkTimeout);
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-10 h-10 rounded-full flex items-center justify-center gap-[6px] shadow-sm overflow-hidden shrink-0",
                // Light Mode (White Theme): White Buddy
                "bg-[radial-gradient(circle_at_40%_40%,#fff,#f0f0f0_40%,#d4d4d4_70%)]",
                // Dark Mode (Black Theme): Black Buddy
                "dark:bg-[radial-gradient(circle_at_40%_40%,#333,#111_40%,#000_70%)]",
                "border border-black/5 dark:border-black/10", // Subtle definition
                className
            )}
        >
            <motion.div
                ref={leftPupilRef}
                animate={{ height: isBlinking ? 3 : 13 }}
                className="w-[5px] bg-[#050505] dark:bg-white rounded-full"
            />
            <motion.div
                ref={rightPupilRef}
                animate={{ height: isBlinking ? 3 : 13 }}
                className="w-[5px] bg-[#050505] dark:bg-white rounded-full"
            />
        </div>
    );
};