
import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";
import { cn } from "../../lib/utils";
import { SkillIcon } from "./SkillIcon";

// Utility function to wrap a number between a min and max
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface SkillsMarqueeProps {
    skills: { name: string; icon: string }[];
    baseVelocity: number;
    direction?: "left" | "right";
}

function ParallaxText({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity: number }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const [isHovered, setIsHovered] = React.useState(false);

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`); // Adjust wrap values based on content width

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        if (isHovered) return;

        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on
     * the size of the text and viewport. Likewise, the x motion value is
     * currently wrapped between -20 and -45% - this 25% is derived from the fact
     * we have four children (100% / 4). This would also want deriving from the
     * dynamically generated number of children.
     */
    return (
        <div
            className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div className="flex flex-nowrap gap-10" style={{ x }}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

export const SkillsMarquee: React.FC<{ skills: any[] }> = ({ skills }) => {
    // Split skills into two rows
    const half = Math.ceil(skills.length / 2);
    const row1 = skills.slice(0, half);
    const row2 = skills.slice(half);

    return (
        <div
            className="w-full relative overflow-hidden py-10 flex flex-col gap-8"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
        >
            <ParallaxText baseVelocity={-1}>
                {row1.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-1.5 px-2 py-1 mx-2 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                        <SkillIcon src={skill.icon} alt={skill.name} className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">{skill.name}</span>
                    </div>
                ))}
            </ParallaxText>

            <ParallaxText baseVelocity={1}>
                {row2.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-1.5 px-2 py-1 mx-2 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
                        <SkillIcon src={skill.icon} alt={skill.name} className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">{skill.name}</span>
                    </div>
                ))}
            </ParallaxText>
        </div>
    );
};
