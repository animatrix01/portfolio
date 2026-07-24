import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

const texts = [
    "Full Stack Developer",
    "Data Scientist",
    "UI/UX Designer",
    "Creative Developer",
    "Problem Solver",
    "Entrepreneur"
];

// Controls the speed of morphing.
const morphTime = 1.5; // Increased from 1 to 1.5 for slower transition
const cooldownTime = 2; // Increased from 0.25 to 2.0 for readable delay

export const MorphingText: React.FC<{ className?: string }> = ({ className }) => {
    const text1Ref = useRef<HTMLSpanElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;
        let animationFrameId: number;

        const elts = {
            text1: text1Ref.current,
            text2: text2Ref.current
        };

        if (!elts.text1 || !elts.text2) return;

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];

        function doMorph() {
            morph -= cooldown;
            cooldown = 0;

            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        }

        function setMorph(fraction: number) {
            if (!elts.text1 || !elts.text2) return;

            // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

            elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            elts.text1.textContent = texts[textIndex % texts.length];
            elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        }

        function doCooldown() {
            morph = 0;

            if (!elts.text1 || !elts.text2) return;

            elts.text2.style.filter = "";
            elts.text2.style.opacity = "100%";

            elts.text1.style.filter = "";
            elts.text1.style.opacity = "0%";
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            let newTime = new Date();
            let shouldIncrementIndex = cooldown > 0;
            let dt = (newTime.getTime() - time.getTime()) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }

                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("relative w-full h-10", className)}>
            {/* The SVG filter used to create the merging effect */}
            <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140" />
                    </filter>
                </defs>
            </svg>

            <div className="absolute top-0 left-0 w-full h-full" style={{ filter: 'url(#threshold) blur(0.6px)' }}>
                <span ref={text1Ref} className="absolute top-0 left-0 inline-block w-full text-left text-lg md:text-2xl font-bold text-gray-400 dark:text-gray-500 select-none" />
                <span ref={text2Ref} className="absolute top-0 left-0 inline-block w-full text-left text-lg md:text-2xl font-bold text-gray-400 dark:text-gray-500 select-none" />
            </div>
        </div>
    );
};
