import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { DynamicNavigation } from './DynamicNavigation';
import { RainbowButton } from './RainbowButton';
interface ContactPageProps {
    onNavigate: (view: string) => void;
    toggleTheme: () => void;
    isDark: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, toggleTheme, isDark }) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <DynamicNavigation
                triggerRef={triggerRef}
                toggleTheme={toggleTheme}
                isDark={isDark}
                onNavigate={onNavigate}
                currentView="contact"
                enableIsland={false}
            />

            <main className="px-6 pt-32 md:pt-48 pb-4 relative z-10 max-w-4xl mx-auto min-h-screen flex flex-col justify-center">

                <div ref={triggerRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-8">

                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-serif text-gray-900 dark:text-white mb-8 leading-[0.9]">
                            Let's work <br /> <span className="text-gray-400 dark:text-gray-600">together.</span>
                        </h1>

                        <div className="space-y-8 text-lg text-gray-600 dark:text-gray-300">
                            <p>
                                I'm currently available for freelance projects and open to full-time opportunities.
                            </p>

                            <div>
                                <div className="text-sm font-mono text-gray-400 mb-1 uppercase tracking-wider">Email</div>
                                <a href="mailto:hello.animeshh@gmail.com" className="text-xl hover:text-blue-500 transition-colors">hello.animeshh@gmail.com</a>
                            </div>

                            <div>
                                <div className="text-sm font-mono text-gray-400 mb-1 uppercase tracking-wider">Socials</div>
                                <div className="flex gap-6">
                                    <a href="https://x.com/animatrix01" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">Twitter</a>
                                    <a href="https://www.linkedin.com/in/thakuranimesh/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
                                    <a href="https://github.com/animatrix01" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gray-50 dark:bg-[#111] p-8 rounded-3xl border border-gray-200 dark:border-white/5"
                    >
                        <form className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell me about your project..."
                                    className="bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>

                            <div className="mt-2">
                                <RainbowButton type="button" className="w-full">
                                    Send Message
                                </RainbowButton>
                            </div>
                        </form>
                    </motion.div>

                </div>

            </main>
        </>
    );
};