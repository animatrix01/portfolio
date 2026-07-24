import React from 'react';

export const Footer = () => {
    return (
        <footer className="w-full py-6 bg-white dark:bg-black border-t border-gray-100 dark:border-white/5 mt-auto relative z-10 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 flex flex-row items-center justify-between gap-4">

                {/* Copyright - Left */}
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                    © 2026 All rights reserved.
                </p>

                {/* Credits - Right */}
                <div className="flex items-center gap-4 text-[10px] md:text-xs uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">
                    <a href="#experiments" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        Experiments
                    </a>
                    <div className="flex items-center gap-1">
                        <span>Designed & Developed by</span>
                        <span className="text-gray-900 dark:text-white font-bold ml-1">Animesh</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};
