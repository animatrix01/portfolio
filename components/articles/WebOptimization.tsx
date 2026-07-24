"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Zap, Target, BarChart, ShieldCheck } from 'lucide-react';
import { triggerHaptic } from '../../lib/utils';

export default function WebOptimization({ onBack }: { onBack: () => void }) {
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
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
                        Engineering
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={14} /> 4 min read
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-6 leading-tight">
                    The Modern Alchemy of Web Performance
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-serif italic">
                    Why speed is no longer just a metric, but the foundation of digital trust and accessibility.
                </p>
            </header>

            <div className="prose prose-lg dark:prose-invert prose-gray max-w-none">
                <p>
                    In an era where attention is the most valuable currency, performance isn't just a technical requirement—it's a fundamental aspect of user experience. A delay of 100ms can feel like an eternity to a user, and studies consistently show that performance directly correlates with conversion and retention.
                </p>

                <h2 className="flex items-center gap-3">
                    <Zap className="text-yellow-500" size={24} />
                    Beyond the Baseline
                </h2>
                <p>
                    Traditional optimization often stopped at minifying CSS and compressing images. Today, we must look deeper into the critical rendering path. We're talking about <strong>Partial Hydration</strong>, <strong>Resumability</strong>, and <strong>Edge Computing</strong>.
                </p>

                <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <Target className="text-blue-500 mb-4" size={24} />
                        <h4 className="text-lg font-serif mb-2">Core Web Vitals</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Focusing on LCP, FID, and CLS provides a user-centric lens for performance auditing.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <ShieldCheck className="text-emerald-500 mb-4" size={24} />
                        <h4 className="text-lg font-serif mb-2">Payload Budgeting</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Setting strict limits on JavaScript execution time and bundle sizes to ensure low-end device parity.</p>
                    </div>
                </div>

                <h2 className="flex items-center gap-3">
                    <BarChart className="text-purple-500" size={24} />
                    Strategies for 2024
                </h2>
                <ol>
                    <li>
                        <strong>Adaptive Loading:</strong> Serving different assets based on the user's network conditions and device capabilities.
                    </li>
                    <li>
                        <strong>Predictive Prefetching:</strong> Using ML to predict the user's next move and fetching resources just-in-time.
                    </li>
                    <li>
                        <strong>Brotli over Gzip:</strong> Utilizing more efficient compression algorithms to squeeze every byte out of the wire.
                    </li>
                </ol>

                <blockquote className="border-l-4 border-blue-500 pl-6 my-10 italic text-xl text-gray-700 dark:text-gray-300">
                    "Performance is a feature. You have to build it in from day one, not salt it on at the end."
                </blockquote>

                <h3>Sustainable Performance</h3>
                <p>
                    Optimization is not a one-time task. It requires continuous monitoring and a culture of performance within the engineering team. By treating speed as a first-class citizen, we build applications that are not only fast but resilient and accessible to everyone, everywhere.
                </p>
            </div>
        </motion.div>
    );
}
