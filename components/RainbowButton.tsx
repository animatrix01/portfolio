import React from "react";
import { cn, triggerHaptic } from "../lib/utils";

/**
 * RainbowButtonProps extends standard HTML button attributes to ensure
 * compatibility with all standard button props like 'type', 'className', and 'onClick'.
 */
export type RainbowButtonProps = React.ComponentProps<"button">;

/**
 * A custom button component with a rainbow gradient effect on hover.
 */
export function RainbowButton({ children, className, onClick, ...props }: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform active:scale-95", 
        className
      )}
      onClick={(e) => {
        triggerHaptic(10);
        if (onClick) onClick(e);
      }}
      {...props}
    >
      {/* The colorful background that shows on hover/active */}
      <div 
        className="absolute inset-0 rounded-xl opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 blur-[2px]" 
        style={{
            background: 'conic-gradient(from 180deg, #3b82f6, #8b5cf6, #ef4444, #8b5cf6, #3b82f6)'
        }}
      />
      
      {/* Inner content */}
      <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-[#0a0a0a] px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl border border-white/10">
        {children}
      </span>
    </button>
  );
}