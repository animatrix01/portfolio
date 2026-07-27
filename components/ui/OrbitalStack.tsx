/**
 * OrbitalStack — premium compact orbital tech-stack display.
 *
 * Animation pattern (reliable, upright icons):
 *   1. Ring div spins clockwise (or CCW) around its own centre.
 *   2. Each icon slot is positioned absolutely on the ring circumference.
 *   3. The icon's inner wrapper counter-spins at the exact same duration.
 *      Net rotation on the icon = 0 → always perfectly upright.
 *
 * Label placement:
 *   Labels are `position:absolute; bottom:-26px` inside a `position:relative`
 *   icon slot. They sit OUTSIDE the icon bubble without affecting layout or
 *   getting clipped by overflow-hidden (the container has no overflow:hidden).
 *
 * Theme awareness:
 *   - Ring borders: Tailwind `border-dashed border-gray-300 dark:border-white/20`
 *   - Icon bubbles: `bg-white dark:bg-[#0a0a0a]` — matches page bg, hides ring line
 *   - Next.js / Vercel / Prisma / AWS logos: `dark:invert` so black SVGs flip white
 *   - Labels: `bg-white/95 dark:bg-black/95`
 */

import React from 'react';
import { Database, Brain, Network, Zap } from 'lucide-react';

// ─── Keyframes ────────────────────────────────────────────────────────────────

const KEYFRAMES = `
  @keyframes spin-orbit {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes reverse-spin-orbit {
    from { transform: rotate(0deg);    }
    to   { transform: rotate(-360deg); }
  }
  @keyframes spin-orbit-ccw {
    from { transform: rotate(0deg);    }
    to   { transform: rotate(-360deg); }
  }
  @keyframes reverse-spin-orbit-ccw {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes core-pulse {
    0%, 100% { opacity: 0.5;  transform: scale(1);   }
    50%       { opacity: 0.08; transform: scale(2); }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────

type IconNode = string | React.ReactNode;

interface Tech {
    name     : string;
    icon     : IconNode;
    /** Apply dark:invert for black-on-transparent SVGs (Next.js, Vercel, etc.) */
    invert?  : boolean;
}

/** SimpleIcons CDN — brand colour hex without '#' */
const si = (slug: string, hex: string): string =>
    `https://cdn.simpleicons.org/${slug}/${hex}`;

// ── Inner ring (5 items) — core stack ─────────────────────────────────────────
const INNER: Tech[] = [
    { name: 'Node.js',    icon: si('nodedotjs',   '5fa04e') },
    { name: 'React',      icon: si('react',       '61dafb') },
    { name: 'Next.js',    icon: si('nextdotjs',   '000000'), invert: true },
    { name: 'Tailwind',   icon: si('tailwindcss', '06b6d4') },
    { name: 'TypeScript', icon: si('typescript',  '3178c6') },
];

// ── Middle ring (6 items) — databases & infra ─────────────────────────────────
const MIDDLE: Tech[] = [
    { name: 'AWS',        icon: si('amazonwebservices', 'ff9900') },
    { name: 'Prisma',     icon: si('prisma',            '000000'), invert: true },
    { name: 'PostgreSQL', icon: si('postgresql',        '4169e1') },
    { name: 'MongoDB',    icon: si('mongodb',           '47a248') },
    { name: 'Redis',      icon: si('redis',             'ff4438') },
    { name: 'Vercel',     icon: si('vercel',            '000000'), invert: true },
];

// ── Outer ring (8 items) — AI & pipelines ────────────────────────────────────
const OUTER: Tech[] = [
    { name: 'Pinecone',  icon: <Database className="w-5 h-5 text-emerald-400" /> },
    { name: 'Vector DB', icon: <Database className="w-5 h-5 text-indigo-400"  /> },
    { name: 'LangChain', icon: <Network  className="w-5 h-5 text-blue-400"    /> },
    { name: 'LangGraph', icon: <Network  className="w-5 h-5 text-violet-400"  /> },
    { name: 'n8n',       icon: <Zap      className="w-5 h-5 text-red-400"     /> },
    { name: 'RAG',       icon: <Brain    className="w-5 h-5 text-purple-400"  /> },
    { name: 'FastAPI',   icon: si('fastapi', '009688') },
    { name: 'Chroma DB', icon: <Database className="w-5 h-5 text-orange-400"  /> },
];

// ─── Ring config ──────────────────────────────────────────────────────────────

interface RingDef {
    items    : Tech[];
    diameter : number;  // px — equal w/h = perfect circle
    duration : number;  // spin seconds
    cw       : boolean; // clockwise?
}

// Icon bubble size fixed at 40px (w-10 h-10) for all rings.
const BUBBLE = 40;

const RINGS: RingDef[] = [
    { items: INNER,  diameter: 160, duration: 28, cw: true  },
    { items: MIDDLE, diameter: 280, duration: 44, cw: false },
    { items: OUTER,  diameter: 400, duration: 62, cw: true  },
];

// ─── Single ring ──────────────────────────────────────────────────────────────

function Ring({ items, diameter, duration, cw }: RingDef) {
    const r        = diameter / 2;
    const ringAnim = cw ? 'spin-orbit'         : 'spin-orbit-ccw';
    const iconAnim = cw ? 'reverse-spin-orbit' : 'reverse-spin-orbit-ccw';

    return (
        /* Ring div: centred via inset-0 + m-auto; spins around its own centre */
        <div
            className="absolute rounded-full border border-dashed border-gray-300 dark:border-white/20"
            style={{
                width:    diameter,
                height:   diameter,
                top: 0, left: 0, right: 0, bottom: 0,
                margin:   'auto',
                animationName:           ringAnim,
                animationDuration:       `${duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
            }}
        >
            {items.map((tech, i) => {
                // Evenly spaced, starting at 12-o'clock (−π/2)
                const deg = (360 / items.length) * i - 90;
                const rad = (deg * Math.PI) / 180;

                // Top-left corner of the icon slot on the ring circumference
                const x = r + r * Math.cos(rad) - BUBBLE / 2;
                const y = r + r * Math.sin(rad) - BUBBLE / 2;

                const isUrl = typeof tech.icon === 'string';

                return (
                    <div
                        key={tech.name}
                        /* Slot: exactly BUBBLE×BUBBLE, positioned on the ring */
                        style={{
                            position: 'absolute',
                            left:     x,
                            top:      y,
                            width:    BUBBLE,
                            height:   BUBBLE,
                        }}
                    >
                        {/*
                          Counter-spin wrapper.
                          transformOrigin:'center center' cancels the ring's rotation
                          so the bubble + label always face the viewer.
                        */}
                        <div
                            style={{
                                position:                'relative',
                                width:                   BUBBLE,
                                height:                  BUBBLE,
                                animationName:           iconAnim,
                                animationDuration:       `${duration}s`,
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                                transformOrigin:         'center center',
                            }}
                        >
                            {/* Icon bubble */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-[#0a0a0a] shadow-sm border border-gray-200 dark:border-white/10 z-10">
                                {isUrl ? (
                                    <img
                                        src={tech.icon as string}
                                        alt={tech.name}
                                        width={20}
                                        height={20}
                                        className={`w-5 h-5 object-contain${tech.invert ? ' dark:invert' : ''}`}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center">
                                        {tech.icon as React.ReactNode}
                                    </div>
                                )}
                            </div>

                            {/*
                              Label — absolutely positioned below the bubble.
                              left:50% + translateX(-50%) centres it regardless of text length.
                              bottom:-26px clears the bubble without affecting layout.
                            */}
                            <span
                                className="
                                    absolute left-1/2 -translate-x-1/2 -bottom-6
                                    w-max text-[9px] font-medium tracking-wide
                                    text-gray-600 dark:text-gray-400
                                    bg-white/95 dark:bg-black/95
                                    backdrop-blur-sm
                                    px-1.5 py-0.5 rounded
                                    border border-gray-200 dark:border-white/10
                                    pointer-events-none
                                    whitespace-nowrap
                                "
                            >
                                {tech.name}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Core ─────────────────────────────────────────────────────────────────────

function Core() {
    return (
        /* Centred via inset-0 + m-auto inside the flex container */
        <div
            className="absolute z-20 flex items-center justify-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', width: 48, height: 48 }}
        >
            {/* Outer pulse */}
            <div
                className="absolute rounded-full bg-blue-500/20"
                style={{ width: 80, height: 80, animation: 'core-pulse 3.5s ease-in-out infinite' }}
            />
            {/* Blue glow circle */}
            <div className="w-12 h-12 bg-blue-500 rounded-full shadow-[0_0_30px_10px_rgba(59,130,246,0.3)] flex items-center justify-center z-20">
                <div className="w-3 h-3 rounded-full bg-white/90" />
            </div>
        </div>
    );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function OrbitalStack() {
    return (
        <>
            <style>{KEYFRAMES}</style>
            {/*
              No overflow-hidden — labels sit below bubbles via absolute positioning
              and must not be clipped. The fixed h-[450px] md:h-[500px] reserves
              enough document-flow height so nothing below overlaps.
            */}
            <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center">
                {RINGS.map((ring, i) => (
                    <Ring key={i} {...ring} />
                ))}
                <Core />
            </div>
        </>
    );
}
