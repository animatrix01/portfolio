import React from 'react';
import { cn } from '../lib/utils';

interface GSAPMenuLinkProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export const GSAPMenuLink: React.FC<GSAPMenuLinkProps> = ({ text, onClick, className }) => {
  return (
    <div 
        onClick={onClick}
        className={cn(
            "relative cursor-pointer w-full h-[3.5rem] md:h-[5rem] flex items-center justify-center select-none transition-all duration-200 hover:scale-105 active:scale-95", 
            className
        )}
    >
        <span className="block w-full text-center leading-none">
            {text}
        </span>
    </div>
  );
};