"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface NativeMagneticProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // 0 to 1 (or higher, but 0.5 is usually good)
}

export function NativeMagnetic({
    children,
    className,
    strength = 0.5,
}: NativeMagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for the magnetic effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();

        const center = { x: left + width / 2, y: top + height / 2 };

        // Calculate distance from center
        const distance = { x: clientX - center.x, y: clientY - center.y };

        // Limit the movement range (e.g., max 25% of the element's size in any direction)
        const maxMove = Math.max(width, height) * 0.35; // Increased range allowed, but we clamp

        let moveX = distance.x * strength;
        let moveY = distance.y * strength;

        // Clamp the movement so it doesn't fly too far
        if (Math.abs(moveX) > maxMove) moveX = Math.sign(moveX) * maxMove;
        if (Math.abs(moveY) > maxMove) moveY = Math.sign(moveY) * maxMove;

        x.set(moveX);
        y.set(moveY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={cn("inline-block", className)}
        >
            {children}
        </motion.div>
    );
}
