import React, { useState } from 'react';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import CopyIcon from '@/components/icons/CopyIcon'; // Import the animated icon we made

export interface CopyButtonProps extends HTMLMotionProps<"button"> {
    content: string;
    delay?: number;
    variant?: "default" | "accent" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    hoverScale?: number;
    tapScale?: number;
    onCopiedChange?: (copied: boolean, content?: string) => void;
}

const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
    accent: "bg-blue-500 text-white hover:bg-blue-600"
};

const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10"
};

const customEase = [0.4, 0, 0.2, 1]; // Asymmetrical ease as requested

export const CopyButton: React.FC<CopyButtonProps> = ({
    content,
    delay = 3000,
    variant = "default",
    size = "default",
    hoverScale = 1.05,
    tapScale = 0.95,
    className,
    onCopiedChange,
    ...props
}) => {
    const [copied, setCopied] = useState(false);
    const copyIconRef = React.useRef<{ startAnimation: () => void; stopAnimation: () => void }>(null);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            copyIconRef.current?.startAnimation(); // Trigger the particle animation
            onCopiedChange?.(true, content);

            setTimeout(() => {
                setCopied(false);
                onCopiedChange?.(false, content);
            }, delay);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <motion.button
            whileHover={{ scale: hoverScale, backgroundColor: "rgba(0,0,0,0.05)" }}
            whileTap={{ scale: tapScale }}
            onClick={handleCopy}
            className={cn(
                "inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
                variants[variant],
                sizes[size],
                className
            )}
            transition={{ ease: customEase, duration: 0.3 }}
            {...props}
        >
            {/* Render text/children if provided */}
            {props.children}

            <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2, ease: customEase }}
                    >
                        {/* Success Tick - White */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12" /></svg>
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2, ease: customEase }}
                    >
                        <CopyIcon ref={copyIconRef} size={20} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};
