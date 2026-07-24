import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const ScrollAnimations: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'timeline-api', title: 'Scroll-Timeline API' },
        { id: 'parallax', title: 'Parallax Effects' },
        { id: 'performance', title: 'Performance' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="Mastering Scroll-Driven Animations"
            date="Mar 10, 2024"
            category="Development"
            nextArticle={{ title: "The Future of Interface Design", id: "interface-design" }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="introduction">
                Scroll-driven animations have the power to transform a static page into an immersive storytelling experience. With the new CSS Scroll-Timeline API, we can achieve native performance without heavy JavaScript libraries.
            </p>

            <h2 id="timeline-api" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">The Scroll-Timeline API</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Traditionally, binding animations to scroll position required listening to scroll events in JavaScript, calculating offsets, and updating styles requestAnimationFrame-style. This was performance-intensive. The new CSS Scroll-Timeline API allows us to map animation progress directly to the scroll position of a container, completely off the main thread.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-mono text-sm text-gray-700 dark:text-gray-300">
                <p>@scroll-timeline my-timeline {'{'}</p>
                <p className="pl-4">source: auto;</p>
                <p className="pl-4">orientation: block;</p>
                <p>{'}'}</p>
                <br />
                <p>.element {'{'}</p>
                <p className="pl-4">animation-timeline: my-timeline;</p>
                <p>{'}'}</p>
            </div>

            <h2 id="parallax" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Parallax Effects</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Parallax—where background layers move slower than foreground layers—creates a sense of depth. While overused in the past, subtle parallax adds a premium feel to modern landing pages. By combining 3D transforms with scroll timelines, we can create performant, butter-smooth parallax effects.
            </p>

            <h2 id="performance" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Performance First</h2>

            <p className="text-gray-800 dark:text-gray-300">
                The golden rule of scroll animations: do not jank the scroll. Animations must run at 60fps (or higher) to feel responsive. Using CSS-based approaches ensures the browser compositor handles the heavy lifting, leaving the main thread free for interaction logic.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                As browser support improves, CSS-native scroll animations will become the standard. They offer a perfect blend of creativity and performance, enabling developers to build rich, narrative-driven experiences accessible to everyone.
            </p>

        </ArticleLayout>
    );
};
