"use client";

import { SimpleTooltip } from "./SimpleTooltip";
import { cn } from "../../lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "blue" | "gold" | "green" | "black";
type BadgeSize = "sm" | "md" | "lg" | "xl" | "xxl";

interface VerifiedBadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
    showLabel?: boolean;
    label?: string;
    icon?: ReactNode;
    tooltip?: string;
}

const sizeClasses: Record<
    BadgeSize,
    { container: string; icon: string; text: string }
> = {
    sm: { container: "size-4", icon: "size-2", text: "text-xs" },
    md: { container: "size-5", icon: "size-2.5", text: "text-sm" },
    lg: { container: "size-6", icon: "size-3", text: "text-base" },
    xl: { container: "size-7", icon: "size-4", text: "text-lg" },
    xxl: { container: "size-8", icon: "size-5", text: "text-xl" },
};

const variantClasses: Record<
    BadgeVariant,
    { bg: string; icon: string; shine: string }
> = {
    default: {
        bg: "bg-foreground", // fallback color, usually black/white depending on theme
        icon: "text-background",
        shine: "from-transparent via-white/40 to-transparent",
    },
    blue: {
        bg: "bg-blue-500",
        icon: "text-white",
        shine: "from-transparent via-white/50 to-transparent",
    },
    gold: {
        bg: "bg-amber-500",
        icon: "text-white",
        shine: "from-transparent via-white/50 to-transparent",
    },
    green: {
        bg: "bg-emerald-500",
        icon: "text-white",
        shine: "from-transparent via-white/50 to-transparent",
    },
    black: {
        bg: "bg-black dark:bg-white",
        icon: "text-white dark:text-black",
        shine: "from-transparent via-white/50 to-transparent",
    },
};

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4" // Slightly thicker for small sizes
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function BadgeTooltip({
    children,
    content,
}: {
    children: ReactNode;
    content?: string;
}) {
    if (!content) return <>{children}</>;

    return (
        <SimpleTooltip content={content}>
            {children}
        </SimpleTooltip>
    );
}

export function VerifiedBadge({
    variant = "blue", // Default to Blue for Twitter style
    size = "md",
    className,
    showLabel = false,
    label = "Verified",
    icon,
    tooltip,
}: VerifiedBadgeProps) {
    const { bg, icon: iconColor, shine } = variantClasses[variant];
    const { container, icon: iconSize, text } = sizeClasses[size];

    return (
        <BadgeTooltip content={tooltip}>
            <span className={cn("inline-flex items-center gap-1.5", className)}>
                <span
                    className={cn(
                        "relative flex items-center justify-center rounded-full overflow-hidden shrink-0",
                        bg,
                        container
                    )}
                >
                    {/* Shine effect on hover */}
                    <span
                        className={cn(
                            "absolute inset-0 -translate-x-full",
                            "bg-gradient-to-r",
                            shine,
                            "group-hover:translate-x-full",
                            "transition-transform duration-500 ease-out"
                        )}
                    />

                    {icon ? (
                        <span
                            className={cn(
                                "relative z-10 flex items-center justify-center",
                                iconSize,
                                iconColor
                            )}
                        >
                            {icon}
                        </span>
                    ) : (
                        <CheckIcon className={cn("relative z-10", iconSize, iconColor)} />
                    )}
                </span>

                {showLabel && (
                    <span className={cn("font-medium text-foreground", text)}>
                        {label}
                    </span>
                )}
            </span>
        </BadgeTooltip>
    );
}
