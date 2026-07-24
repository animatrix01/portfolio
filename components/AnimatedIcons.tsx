import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { motion, useAnimation, useAnimate, type Transition, type Variants } from "framer-motion";
import { cn } from "../lib/utils";

// Types
export interface AnimatedIconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

// --- Home Icon ---
const HOME_TRANSITION: Transition = {
  duration: 0.6,
  opacity: { duration: 0.2 },
};

const HOME_PATH_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1 },
  animate: { opacity: [0, 1], pathLength: [0, 1] },
};

export const HomeIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <motion.path
            animate={controls}
            d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
            transition={HOME_TRANSITION}
            variants={HOME_PATH_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);
HomeIcon.displayName = "HomeIcon";

// --- GitHub Icon ---
const GITHUB_BODY_VARIANTS: Variants = {
  normal: { opacity: 1, pathLength: 1, scale: 1, transition: { duration: 0.3 } },
  animate: { opacity: [0, 1], pathLength: [0, 1], scale: [0.9, 1], transition: { duration: 0.4 } },
};

const GITHUB_TAIL_VARIANTS: Variants = {
  normal: { pathLength: 1, rotate: 0, transition: { duration: 0.3 } },
  draw: { pathLength: [0, 1], rotate: 0, transition: { duration: 0.5 } },
  wag: { pathLength: 1, rotate: [0, -15, 15, -10, 10, -5, 5], transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity } },
};

export const GithubIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const bodyControls = useAnimation();
    const tailControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: async () => {
          bodyControls.start("animate");
          await tailControls.start("draw");
          tailControls.start("wag");
        },
        stopAnimation: () => {
          bodyControls.start("normal");
          tailControls.start("normal");
        },
      };
    });

    const handleMouseEnter = useCallback(
      async (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          bodyControls.start("animate");
          await tailControls.start("draw");
          tailControls.start("wag");
        }
      },
      [bodyControls, onMouseEnter, tailControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          bodyControls.start("normal");
          tailControls.start("normal");
        }
      },
      [bodyControls, tailControls, onMouseLeave]
    );

    return (
      <div
        className={cn("select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={bodyControls}
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
            initial="normal"
            variants={GITHUB_BODY_VARIANTS}
          />
          <motion.path
            animate={tailControls}
            d="M9 18c-4.51 2-5-2-7-2"
            initial="normal"
            variants={GITHUB_TAIL_VARIANTS}
          />
        </svg>
      </div>
    );
  }
);
GithubIcon.displayName = "GithubIcon";

// --- Twitter X Icon ---
export const TwitterXIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "", ...props }, ref) => {
    const [scope, animate] = useAnimate();

    const start = useCallback(async () => {
      await animate(
        ".x-icon",
        { scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] },
        { duration: 0.5, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".x-icon",
        { scale: 1, rotate: 0 },
        { duration: 0.2, ease: "easeOut" }
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    // Trigger on mouse enter if no ref control (default behavior simulation)
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        props.onMouseEnter?.(e);
        start();
    }
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        props.onMouseLeave?.(e);
        stop();
    }

    return (
      <motion.div
         ref={scope}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         className={cn("inline-flex items-center justify-center select-none", className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.g className="x-icon" style={{ transformOrigin: "center" }}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </motion.g>
        </svg>
      </motion.div>
    );
  }
);
TwitterXIcon.displayName = "TwitterXIcon";

// --- Brightness (Sun) Icon ---
export const BrightnessDownIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ size = 24, color = "currentColor", strokeWidth = 2, className = "", ...props }, ref) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      animate(
        ".sun-center",
        { scale: [1, 0.8, 1] },
        { duration: 0.4, ease: "easeInOut" }
      );
      animate(
        ".sun-rays",
        { opacity: [1, 0.4, 1] },
        { duration: 0.5, ease: "easeInOut" }
      );
    };

    const stop = () => {
      animate(".sun-center", { scale: 1 }, { duration: 0.2, ease: "easeOut" });
      animate(".sun-rays", { opacity: 1 }, { duration: 0.2, ease: "easeOut" });
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

     const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        props.onMouseEnter?.(e);
        start();
    }
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        props.onMouseLeave?.(e);
        stop();
    }

    return (
      <motion.div
        ref={scope}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn("inline-flex items-center justify-center select-none", className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            className="sun-center"
            d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
            style={{ transformOrigin: "center" }}
          />
          <motion.g className="sun-rays">
            <path d="M12 5l0 .01" />
            <path d="M17 7l0 .01" />
            <path d="M19 12l0 .01" />
            <path d="M17 17l0 .01" />
            <path d="M12 19l0 .01" />
            <path d="M7 17l0 .01" />
            <path d="M5 12l0 .01" />
            <path d="M7 7l0 .01" />
          </motion.g>
        </svg>
      </motion.div>
    );
  }
);
BrightnessDownIcon.displayName = "BrightnessDownIcon";

// --- Moon Icon ---
const MOON_SVG_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: { rotate: [0, -10, 10, -5, 5, 0] },
};

const MOON_SVG_TRANSITION: Transition = {
  duration: 1.2,
  ease: "easeInOut",
};

export const MoonIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          animate={controls}
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          transition={MOON_SVG_TRANSITION}
          variants={MOON_SVG_VARIANTS}
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </motion.svg>
      </div>
    );
  }
);
MoonIcon.displayName = "MoonIcon";

// --- Article (File) Icon ---
const ARTICLE_VARIANTS: Variants = {
  normal: { pathLength: 1, opacity: 1, x: 0 },
  animate: { 
    pathLength: [0, 1], 
    opacity: [0, 1],
    transition: { 
        duration: 0.5, 
        ease: "easeInOut",
        staggerChildren: 0.1
    } 
  }
};

const ARTICLE_LINES_VARIANTS: Variants = {
    normal: { pathLength: 1, opacity: 1 },
    animate: { pathLength: [0, 1], opacity: [0, 1] }
}

export const ArticleIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Document Outline */}
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          
          {/* Animated Lines */}
          <motion.g animate={controls} initial="normal" variants={ARTICLE_VARIANTS}>
             <motion.line x1="16" x2="8" y1="13" y2="13" variants={ARTICLE_LINES_VARIANTS} />
             <motion.line x1="16" x2="8" y1="17" y2="17" variants={ARTICLE_LINES_VARIANTS} />
             <motion.line x1="10" x2="8" y1="9" y2="9" variants={ARTICLE_LINES_VARIANTS} />
          </motion.g>
        </svg>
      </div>
    );
  }
);
ArticleIcon.displayName = "ArticleIcon";
