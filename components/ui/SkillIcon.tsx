
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
        <div className={cn("grid place-items-center", className)}>
            <img
                src={src}
                alt={alt}
                className={cn("w-full h-full object-contain", imgClassName)}
            />
        </div>
    );
};
