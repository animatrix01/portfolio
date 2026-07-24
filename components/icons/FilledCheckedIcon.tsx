import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

const FilledCheckedIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, className = "", color = "currentColor", strokeWidth = "1" },
        ref,
    ) => {
        const [scope, animate] = useAnimate();

        const start = useCallback(async () => {
            await animate(
                "svg",
                {
                    scale: 1.1,
                },
                {
                    duration: 0.1,
                    ease: "easeInOut",
                },
            );
            animate(
                ".filled-square",
                {
                    scale: 1.15,
                    opacity: 0.8,
                },
                {
                    duration: 0.15,
                    ease: "easeOut",
                },
            );
            await animate(
                ".check-icon",
                {
                    pathLength: 0,
                },
                {
                    duration: 0.1,
                    ease: "easeInOut",
                },
            );
            animate(
                ".filled-square",
                {
                    scale: 1,
                    opacity: 1,
                },
                {
                    duration: 0.3,
                    ease: "easeInOut",
                },
            );
            await animate(
                ".check-icon",
                {
                    pathLength: 1,
                },
                {
                    duration: 0.4,
                    ease: "easeInOut",
                },
            );
            await animate(
                "svg",
                {
                    scale: 1,
                },
                {
                    duration: 0.2,
                    ease: "easeInOut",
                },
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(
                "svg, .filled-square, .check-icon",
                { scale: 1, opacity: 1, pathLength: 1 },
                { duration: 0.2, ease: "easeInOut" },
            );
        }, [animate]);

        useImperativeHandle(ref, () => ({
            startAnimation: start,
            stopAnimation: stop,
        }));

        // Auto-play on mount for notification usage
        useEffect(() => {
            start();
        }, [start]);

        return (
            <motion.div ref={scope} onHoverStart={start} onHoverEnd={stop}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke={color || "currentColor"}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={className}
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />

                    {/* Square Shape (Rounded) */}
                    <motion.rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="5"
                        className={`filled-square ${className}`}
                        style={{ transformOrigin: "center" }}
                        fill="currentColor"
                        stroke="none"
                    />

                    <motion.path
                        d="M15.707 9.293a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        className="check-icon text-white"
                        fill="white"
                        stroke="none"
                    />
                </svg>
            </motion.div>
        );
    },
);

FilledCheckedIcon.displayName = "FilledCheckedIcon";
export default FilledCheckedIcon;
