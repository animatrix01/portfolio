import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "framer-motion";

const BackIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
        ref,
    ) => {
        const [scope, animate] = useAnimate();

        const start = async () => {
            await animate(
                ".arrow",
                { x: -3 },
                { duration: 0.2, ease: "easeOut" },
            );
        };

        const stop = () => {
            animate(
                ".arrow",
                { x: 0 },
                { duration: 0.2, ease: "easeOut" },
            );
        };

        useImperativeHandle(ref, () => {
            return {
                startAnimation: start,
                stopAnimation: stop,
            };
        });

        return (
            <motion.div
                ref={scope}
                onHoverStart={start}
                onHoverEnd={stop}
                className={`inline-flex cursor-pointer items-center justify-center ${className}`}
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
                    <motion.path
                        className="arrow"
                        d="M19 12H5"
                    />
                    <motion.path
                        className="arrow"
                        d="M12 19l-7-7 7-7"
                    />
                </svg>
            </motion.div>
        );
    },
);

BackIcon.displayName = "BackIcon";

export default BackIcon;
