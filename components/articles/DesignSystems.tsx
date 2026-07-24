import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const DesignSystems: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'foundations', title: 'Foundations' },
        { id: 'components', title: 'Component Libraries' },
        { id: 'documentation', title: 'Documentation & Governance' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="Understanding Design Systems"
            date="Apr 02, 2024"
            category="Design"
            nextArticle={{ title: "Mastering Scroll-Driven Animations", id: "scroll-animations" }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="introduction">
                A design system is more than just a UI kit—it's the shared language that bridges the gap between design and engineering, enabling teams to ship consistent products at scale.
            </p>

            <h2 id="foundations" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Foundations</h2>

            <p className="text-gray-800 dark:text-gray-300">
                At the core of every robust design system lies a strong set of foundations. Color palettes, typography scales, spacing units, and shadows form the atomic elements that every other component is built upon. Defining these tokens early ensures visual harmony across the entire application.
            </p>

            <h2 id="components" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Component Libraries</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Components are the building blocks of the interface. From simple buttons to complex data tables, each component must be designed for reusability, accessibility, and flexibility. A good component API is intuitive for developers and enforces design constraints automatically.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl">
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">The Atomic Design Principle</h3>
                <p className="text-gray-600 dark:text-gray-400">Start small (atoms), combine them into molecules, and eventually build entire organisms (templates/pages). This methodology keeps the system manageable.</p>
            </div>

            <h2 id="documentation" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Documentation & Governance</h2>

            <p className="text-gray-800 dark:text-gray-300">
                A design system without documentation is just a library of mystery code. Clear guidelines on *when* and *how* to use components are just as important as the code itself. Governance models ensure the system evolves with the product, preventing stagnation or fragmentation.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Investing in a design system pays dividends in velocity and consistency. It empowers designers to focus on user experience problems rather than pixel-pushing, and developers to build features faster without reinventing the wheel.
            </p>

        </ArticleLayout>
    );
};
