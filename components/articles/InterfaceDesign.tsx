import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const InterfaceDesign: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'spatial', title: 'Spatial Computing' },
        { id: 'ai-interfaces', title: 'Generative UI' },
        { id: 'haptics', title: 'Tactile Feedback' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="The Future of Interface Design"
            date="Aug 12, 2024"
            category="Design"
            nextArticle={{ title: "Scaling Distributed Systems", id: "distributed-systems" }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="introduction">
                We are moving beyond the screen. As technology dissolves into our environment, interfaces are becoming less about pixels and more about intent, context, and physical interaction.
            </p>

            <h2 id="spatial" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Spatial Computing</h2>

            <p className="text-gray-800 dark:text-gray-300">
                With the rise of headsets like the Vision Pro, UI is no longer bounded by a rectangle. Windows cast shadows on your desk. Information floats in mid-air. The challenge for designers is to create depth and presence without overwhelming the user's cognitive load.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Key Shift</h3>
                <p className="text-gray-600 dark:text-gray-400">From 2D constraints to 3D affordances. Buttons shouldn't just look clickable; they should feel pressable in space.</p>
            </div>

            <h2 id="ai-interfaces" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Generative UI</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Why build static menus when an AI can generate the exact control you need, right when you need it? Generative UI creates ephemeral interfaces tailored to the user's immediate goal.
            </p>

            <h2 id="haptics" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Tactile Feedback</h2>

            <p className="text-gray-800 dark:text-gray-300">
                As glass screens disappear, haptics become the primary confirmation mechanism. Subtle vibrations, resistance, and texture simulation will define how quality software feels.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                The best interface is no interface. Our goal is to remove friction until only the intention remains.
            </p>

        </ArticleLayout>
    );
};
