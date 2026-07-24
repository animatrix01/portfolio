import React from 'react';
import { motion } from 'framer-motion';
import { ArticleLayout } from '../ArticleLayout';

export const SpringAnimation: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'crafting-springs', title: 'Crafting Springs' },
        { id: 'perceptual-duration', title: 'Perceptual Duration' },
        { id: 'interruptibility', title: 'Interruptibility' },
        { id: 'bounce', title: 'Bounce' },
        { id: '12-principles', title: '12 Principles' },
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="The physics behind spring animations"
            date="Jun 23, 2024"
            category="Animation"
            nextArticle={{ title: "Next.js Optimization", id: "nextjs-optimisation" }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="introduction">
                We want to design motion that feels natural and familiar. While using the right type of easing already helps, these easings are made based on a curve and a duration. That means that we can’t create a perfectly natural motion, because the movement in the world around us doesn’t have a fixed duration.
            </p>

            <p className="text-gray-800 dark:text-gray-300">
                Notice how with CSS animations and transitions we always have to provide a duration.
            </p>

            <div className="my-8 bg-gray-100 dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-white/10 overflow-x-auto">
                <pre><code className="text-sm font-mono text-blue-600 dark:text-blue-200">.element {'{'}
                    animation: scaleUp 0.3s ease-out;
                    {'}'}

                    @keyframes scaleUp {'{'}
                    0% {'{'}
                    transform: scale(0);
                    {'}'}
                    100% {'{'}
                    transform: scale(1);
                    {'}'}
                    {'}'}</code></pre>
            </div>

            <p className="text-gray-800 dark:text-gray-300">
                Spring animations can help here as they are based on the behavior of an object attached to a spring in a physical world, so it feels more natural by definition. They also don’t have a duration, making them more fluid.
            </p>

            <div className="my-12 p-8 bg-gray-50 dark:bg-[#151515] rounded-2xl border border-gray-200 dark:border-white/5 flex flex-col items-center justify-center gap-8">
                <div className="w-full relative h-8 border-b border-gray-200 dark:border-white/10">
                    <motion.div
                        animate={{ x: ["0%", "90%", "0%"] }}
                        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                        className="absolute top-0 w-8 h-8 rounded-full bg-blue-500 shadow-lg"
                    />
                    <span className="absolute -top-6 left-0 text-xs text-gray-500">Ease</span>
                </div>
                <div className="w-full relative h-8 border-b border-gray-200 dark:border-white/10">
                    <motion.div
                        animate={{ x: ["0%", "90%", "0%"] }}
                        transition={{ type: "spring", stiffness: 100, damping: 10, repeat: Infinity }}
                        className="absolute top-0 w-8 h-8 rounded-full bg-purple-500 shadow-lg"
                    />
                    <span className="absolute -top-6 left-0 text-xs text-gray-500">Spring</span>
                </div>
            </div>

            <p className="text-gray-800 dark:text-gray-300">
                Spring animations are heavily used in iOS; they’re also the default animation in SwiftUI. When I tried recreating the Dynamic Island for the web, I said that it feels like a living organism. It’s mainly because of the spring animation being applied there.
            </p>

            <h2 id="crafting-springs" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">How to craft a spring animation?</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Like we said before, spring animations are created by describing the behavior of an object attached to a spring. This is done by providing values for mass, tension, and velocity.
            </p>

            <div className="my-10 grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-lg border border-gray-200 dark:border-white/10">
                    <div className="text-xs text-gray-500 mb-1">Stiffness</div>
                    <div className="text-2xl font-mono text-gray-900 dark:text-white">100</div>
                </div>
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-lg border border-gray-200 dark:border-white/10">
                    <div className="text-xs text-gray-500 mb-1">Damping</div>
                    <div className="text-2xl font-mono text-gray-900 dark:text-white">49</div>
                </div>
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-lg border border-gray-200 dark:border-white/10">
                    <div className="text-xs text-gray-500 mb-1">Mass</div>
                    <div className="text-2xl font-mono text-gray-900 dark:text-white">1</div>
                </div>
            </div>

            <h2 id="perceptual-duration" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Perceptual duration</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Apple has come up with an alternative method for configuring springs, based solely on duration and bounce. Framer Motion allows you to define a spring animation with the same approach.
            </p>

            <h2 id="interruptibility" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Interruptibility</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Sometimes, when an animation hasn’t yet finished, we need to redirect it. When that happens, a spring animation uses the velocity it had when it was re-targeted making the movement feel smooth and natural.
            </p>

            <h2 id="bounce" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Bounce</h2>

            <p className="text-gray-800 dark:text-gray-300">
                While spring animations can have a bouncy effect, there are only a few instances in product UI where a bounce is appropriate.
            </p>

            <hr className="border-gray-200 dark:border-white/10 my-16" />

            <h2 id="12-principles" className="text-4xl font-serif mb-8 text-gray-900 dark:text-white scroll-mt-32">12 Principles of Animation</h2>

            <p className="text-gray-800 dark:text-gray-300 mb-8">
                Disney animators codified these principles in the 1930s to make drawings feel real. We use them to make pixels feel human. The problems are surprisingly similar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                {[
                    { title: "Squash and Stretch", desc: "Convey weight and elasticity in morphing elements." },
                    { title: "Anticipation", desc: "Prepare users for what comes next (wind-up before action)." },
                    { title: "Staging", desc: "Direct attention through sequential animation." },
                    { title: "Straight Ahead & Pose to Pose", desc: "Define keyframes, let browser interpolate." },
                    { title: "Follow Through & Overlapping", desc: "Use springs for organic overshoot-and-settle." },
                    { title: "Slow In & Slow Out", desc: "Apply easing curves for natural acceleration." }
                ].map((principle, i) => (
                    <div key={i} className="bg-gray-50 dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20 transition-colors">
                        <div className="text-xs font-mono text-gray-500 mb-2">0{i + 1}</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{principle.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{principle.desc}</p>
                    </div>
                ))}
            </div>
        </ArticleLayout>
    );
};
