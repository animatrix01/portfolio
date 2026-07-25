
import React from 'react';
import { cn } from '@/lib/utils'; // Assuming alias exists, otherwise ../../lib/utils. Given the portfolio structure, it likely uses @ or relative.
// I will use relative path to be safe if I am not sure about aliases, but 'cn' import in PortfolioHome was '../lib/utils'.
// So from 'components/ui/SkillIcon.tsx', it involves going up two levels: '../../lib/utils'.

interface SkillIconProps {
    src: string;
    alt: string;
    className?: string; // Container class
    imgClassName?: string; // Class for the "real" image (top one)
}

export const SkillIcon: React.FC<SkillIconProps> = ({ src, alt, className, imgClassName }) => {
    return (
        <div className={cn("grid place-items-center group relative overflow-hidden", className)}>
            {/* 1st Image: Filtered (Ghost) */}
            <img
                src={src}
                alt={alt}
                className={cn(
                    "col-start-1 row-start-1 w-full h-full object-contain transition-all duration-500",
                    "filter grayscale invert"
                )}
            />
            {/* 2nd Image: Real (Revealed on Hover) */}
            <img
                src={src}
                alt={alt}
                className={cn(
                    "col-start-1 row-start-1 w-full h-full object-contain transition-all duration-200 ease-out",
                    "[clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]",
                    imgClassName
                )}
            />
        </div>
    );
};
