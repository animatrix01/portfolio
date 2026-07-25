"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFillTextProps {
    className?: string;
}

export const ScrollFillText: React.FC<ScrollFillTextProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const target = textRef.current;

            if (target) {
                gsap.to(target, {
                    backgroundSize: "200% 200%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        end: "bottom 35%",
                        scrub: true,
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className={cn("py-0 flex justify-center w-full", className)}>
            <div className="w-full px-4 md:px-6 relative">
                <p className="text-[clamp(16px,3vw,32px)] font-medium leading-[1.3] tracking-wide text-justify md:text-center text-balance font-serif w-full mx-auto scroll-fill-container">
                    <span
                        ref={textRef}
                        className="scroll-fill-span bg-clip-text text-transparent inline will-change-[background-size]"
                    >
                        I believe that code is the closest thing we have to magic. It bridges the gap between the abstract and the tangible, turning raw logic into living, breathing experiences. My mission is to craft software that doesn't just work—it inspires. Where precision engineering meets fluid design, that is where I build.
                    </span>
                </p>
            </div>
        </section>
    );
};
