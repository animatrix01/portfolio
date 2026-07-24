import React from 'react';
import { motion } from 'framer-motion';

interface Experiment {
    id: string;
    title: string;
    description: string;
    link: string; // Internal route view name
    color: string;
}

const experiments: Experiment[] = [
    {
        id: 'kanban',
        title: 'Kanban Board',
        description: 'A fully functional Kanban board with drag-and-drop support, task management, and persistent storage.',
        link: 'kanban',
        color: 'bg-blue-500'
    },
    // Add more experiments here as they are built
];

export const ExperimentsPage = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Experiments & Mini-Apps
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A collection of interactive components, mini-applications, and UI experiments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiments.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => onNavigate(exp.link)}
                            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`h-32 ${exp.color} opacity-20 group-hover:opacity-30 transition-opacity`} />

                            <div className="p-6 relative">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {exp.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                    {exp.description}
                                </p>

                                <span className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                                    Launch Experiment <span>→</span>
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
