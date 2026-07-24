"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Activity, Settings2, Wind, Layers } from 'lucide-react';
import { triggerHaptic } from '../../lib/utils';

export default function SpringPhysics({ onBack }: { onBack: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto px-6 py-12"
        >
            <button
                onClick={() => { triggerHaptic(5); onBack(); }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-12 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to home
            </button>

            <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                        Design Engineering
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={14} /> 7 min read
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-6 leading-tight">
                    Motion with Intent: The Art of Spring Physics
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-serif italic">
                    How natural physics can transform digital interfaces from static pages into living, breathing experiences.
                </p>
            </header>

            <div className="prose prose-lg dark:prose-invert prose-gray max-w-none">
                <p>
                    Duration-based animations are a lie. In the real world, things don't just "take 300ms" to happen. They have mass, they encounter friction, and they dissipate energy. To build truly immersive interfaces, we must look to the laws of motion—specifically, <strong>Hooke's Law</strong>.
                </p>

                <h2 className="flex items-center gap-3">
                    <Activity className="text-emerald-500" size={24} />
                    The Mathematics of Snappiness
                </h2>
                <p>
                    A spring animation is defined by two primary variables: <strong>Stiffness</strong> and <strong>Damping</strong>. Finding the balance between these two is where the magic happens. Stiffness controls the "pull" towards the target, while damping controls how quickly the oscillation settles.
                </p>

                <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <Settings2 className="text-blue-500 mb-4" size={24} />
                        <h4 className="text-lg font-serif mb-2">High Stiffness</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Creates "snappy" interactions perfect for buttons and small UI feedback.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <Wind className="text-purple-500 mb-4" size={24} />
                        <h4 className="text-lg font-serif mb-2">Low Damping</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Allows for "bouncy" or playful motion, ideal for notifications and reveals.</p>
                    </div>
                </div>

                <h2 className="flex items-center gap-3">
                    <Layers className="text-blue-500" size={24} />
                    Gestural Harmony
                </h2>
                <p>
                    The real power of spring physics shines in gestural interactions. Because springs can preserve velocity, an element can transition smoothly from a "drag" to a "fling" without any awkward jumps in motion. This creates a psychological link between the user's hand and the digital object.
                </p>

                <h3>Implementing with Framer Motion</h3>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-xl font-mono text-sm leading-relaxed">
                    {`const transition = {
  type: "spring",
  stiffness: 700,
  damping: 30,
  restDelta: 0.001
};

<motion.div 
  animate={{ scale: 1.1 }} 
  transition={transition} 
/>`}
                </pre>

                <blockquote className="border-l-4 border-emerald-500 pl-6 my-10 italic text-xl text-gray-700 dark:text-gray-300">
                    "Natural motion isn't a luxury; it's a navigational cue that tells the user's brain what just happened."
                </blockquote>

                <h3>Conclusion</h3>
                <p>
                    By moving away from linear time and embracing the complexity of physics, we create interfaces that feel lighter, faster, and more intuitive. It’s not just about looking good—it’s about matching the user’s mental model of how the physical world works.
                </p>
            </div>
        </motion.div>
    );
}
