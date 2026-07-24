import React, { memo, forwardRef } from "react";
import { LiquidMetal as LiquidMetalShader } from "@paper-design/shaders-react";
import { cn, triggerHaptic } from "../lib/utils";

export interface LiquidMetalProps {
  colorBack?: string;
  colorTint?: string;
  speed?: number;
  repetition?: number;
  distortion?: number;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LiquidMetal = memo(function LiquidMetal({
  colorBack = "#aaaaac",
  colorTint = "#ffffff",
  speed = 0.5,
  repetition = 4,
  distortion = 0.1,
  scale = 1,
  className,
  style,
}: LiquidMetalProps) {
  return (
    <div className={cn("absolute inset-0 z-0 overflow-hidden rounded-full", className)} style={style}>
      <LiquidMetalShader
        colorBack={colorBack}
        colorTint={colorTint}
        speed={speed}
        repetition={repetition}
        distortion={distortion}
        softness={0}
        shiftRed={0.3}
        shiftBlue={-0.3}
        angle={45}
        shape="none"
        scale={scale}
        fit="cover"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});
LiquidMetal.displayName = "LiquidMetal";

export interface LiquidMetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  borderWidth?: number;
  metalConfig?: Omit<LiquidMetalProps, "className" | "style">;
  size?: "sm" | "md" | "lg";
}

export const LiquidMetalButton = forwardRef<HTMLButtonElement, LiquidMetalButtonProps>(
  (
    {
      children,
      icon,
      borderWidth = 5,
      metalConfig,
      size = "md",
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "py-2 pl-3 pr-6 gap-2 text-sm",
      md: "py-3 pl-4 pr-8 gap-3 text-base",
      lg: "py-4 pl-5 pr-10 gap-4 text-lg",
    };

    const iconSizes = {
      sm: "w-7 h-7",
      md: "w-9 h-9",
      lg: "w-11 h-11",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={(e) => {
          triggerHaptic(10);
          if (onClick) onClick(e);
        }}
        className={cn(
          "group relative cursor-pointer border-none bg-transparent p-0 outline-none transition-transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <div
          className="relative rounded-full overflow-hidden shadow-xl shadow-black/20"
          style={{ padding: borderWidth }}
        >
          <LiquidMetal
            colorBack={metalConfig?.colorBack ?? "#888888"}
            colorTint={metalConfig?.colorTint ?? "#ffffff"}
            speed={metalConfig?.speed ?? 0.4}
            repetition={metalConfig?.repetition ?? 4}
            distortion={metalConfig?.distortion ?? 0.15}
            scale={metalConfig?.scale ?? 1}
            className="absolute inset-0 z-0 rounded-full"
          />

          <div
            className={cn(
              "relative z-10 rounded-full flex items-center justify-center bg-white dark:bg-neutral-950 transition-colors group-hover:bg-neutral-50 dark:group-hover:bg-neutral-900",
              sizeStyles[size]
            )}
          >
            {icon && (
              <div
                className={cn(
                  "mr-3 rounded-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 shadow-inner",
                  iconSizes[size]
                )}
              >
                {icon}
              </div>
            )}
            <span className="font-semibold tracking-tight text-neutral-900 dark:text-white">
              {children}
            </span>
          </div>
        </div>
      </button>
    );
  }
);
LiquidMetalButton.displayName = "LiquidMetalButton";