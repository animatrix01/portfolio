import React from 'react';
import { ArticleLayout } from '../ArticleLayout';

export const DistributedSystems: React.FC<{
    onNavigate: (view: string, id?: string) => void;
    toggleTheme: () => void;
    isDark: boolean
}> = ({ onNavigate, toggleTheme, isDark }) => {

    const SECTIONS = [
        { id: 'introduction', title: 'Introduction' },
        { id: 'cap-theorem', title: 'The CAP Theorem' },
        { id: 'event-sourcing', title: 'Event Sourcing' },
        { id: 'sharding', title: 'Database Sharding' },
        { id: 'conclusion', title: 'Conclusion' }
    ];

    return (
        <ArticleLayout
            onNavigate={onNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            sections={SECTIONS}
            title="Scaling Distributed Systems"
            date="Sep 05, 2024"
            category="Engineering"
            prevArticle={{ title: "Future of Interface", id: "interface-design" }}
        >
            <p className="lead text-xl text-gray-600 dark:text-gray-400 mb-8" id="introduction">
                When your application grows from a single server to a global fleet, the rules change. Latency isn't just a number; it's a geography problem. Consistency becomes a trade-off, not a guarantee.
            </p>

            <h2 id="cap-theorem" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">The CAP Theorem</h2>

            <p className="text-gray-800 dark:text-gray-300 mb-4">
                Consistency, Availability, Partition Tolerance. You can pick two. In a distributed system, network partitions are inevitable (P is mandatory), so the real choice is between C and A.
            </p>

            <div className="grid grid-cols-2 gap-4 my-8">
                <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h4 className="font-bold text-gray-900 dark:text-white">CP (Consistency)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bank ledgers. If the network breaks, stop accepting writes to ensure data assumes correctness.</p>
                </div>
                <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                    <h4 className="font-bold text-gray-900 dark:text-white">AP (Availability)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Social feeds. Show slightly stale data rather than showing an error page.</p>
                </div>
            </div>

            <h2 id="event-sourcing" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Event Sourcing</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Instead of storing the current state, store the sequence of events that led to it. This provides a perfect audit log and allows for time-travel debugging.
            </p>

            <h2 id="sharding" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Database Sharding</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Splitting your database horizontally across multiple machines. The key challenge is choosing a good shard key to prevent "hot spots" where one server takes all the load.
            </p>

            <h2 id="conclusion" className="text-3xl font-serif mt-16 mb-6 text-gray-900 dark:text-white scroll-mt-32">Conclusion</h2>

            <p className="text-gray-800 dark:text-gray-300">
                Scaling is as much about architecture as it is about discipline. Simple, stateless services are easier to scale than stateful monoliths.
            </p>

        </ArticleLayout>
    );
};
