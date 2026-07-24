"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Server, Globe, Box, Cpu } from 'lucide-react';
import { triggerHaptic } from '../../lib/utils';

export default function NextJsOptimization({ onBack }: { onBack: () => void }) {
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
                    <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-700 dark:text-blue-300 text-xs font-mono font-bold uppercase tracking-wider">
                        Architecture
                    </span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={14} /> 5 min read
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 dark:text-white mb-6 leading-tight">
                    Next.js for the Performance Obsessed
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-serif italic">
                    Mastering the transition from Client-Side Rendering to Server-First architecture.
                </p>
            </header>

            <div className="prose prose-lg dark:prose-invert prose-gray max-w-none">
                <p>
                    With the introduction of the App Router, Next.js redefined what it means to build a modern web application. We've moved away from the "Ship everything, then hydrate" approach to a more surgical, <strong>Server-First</strong> mentality.
                </p>

                <h2 className="flex items-center gap-3">
                    <Server className="text-blue-600" size={24} />
                    The Power of Server Components
                </h2>
                <p>
                    React Server Components (RSCs) are the biggest shift in the React ecosystem since Hooks. By moving the logic to the server, we effectively reduce the amount of JavaScript sent to the client to nearly zero for static parts of our application.
                </p>

                <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <Globe className="text-emerald-500 mb-4" size={24} />
                        <h4 className="text-lg font-serif mb-2">Streaming</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Breaking down page renders into chunks so users see content as it becomes available.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <Cpu className="text-purple-500 mb-4" size={24} />
                        <h4 className="text-lg font-serif mb-2">Selective Hydration</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Interactivity is applied only where it's needed, keeping the main thread clear for immediate response.</p>
                    </div>
                </div>

                <h2 className="flex items-center gap-3">
                    <Box className="text-yellow-600" size={24} />
                    Data Fetching Evolution
                </h2>
                <p>
                    Forget <code>useEffect</code> for data. In Next.js, we fetch directly in our components. This eliminates waterfall requests and simplifies our state management drastically. Combined with <strong>Static Site Generation (SSG)</strong> and <strong>Incremental Static Regeneration (ISR)</strong>, we get the best of both worlds: dynamic content and extreme speed.
                </p>

                <h3>Advanced Caching Patterns</h3>
                <p>
                    Next.js provides a sophisticated caching layer that operates at the request, data, and full-route levels. Understanding how to use <code>revalidatePath</code> and <code>revalidateTag</code> allows us to keep our applications in sync with the database with minimal overhead.
                </p>

                <blockquote className="border-l-4 border-blue-600 pl-6 my-10 italic text-xl text-gray-700 dark:text-gray-300">
                    "Web development is increasingly becoming an exercise in choosing what NOT to send to the browser."
                </blockquote>

                <h3>Optimization Checklist</h3>
                <ul>
                    <li>Use <strong>next/image</strong> for priority loading and automatic layout shift prevention.</li>
                    <li>Leverage <strong>next/font</strong> to eliminate cumulative layout shift for typography.</li>
                    <li>Move third-party scripts to <strong>next/script</strong> with low priority to free up initial loading.</li>
                </ul>

                <p>
                    The future of the web is server-driven. By mastering these architectural patterns, we build applications that are not just fast on a fiber connection, but usable on a spotty mobile network in the middle of a commute.
                </p>
            </div>
        </motion.div>
    );
}
