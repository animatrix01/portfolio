import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface LiquidMetalProps {
    className?: string;
}

export const LiquidMetal: React.FC<LiquidMetalProps> = ({ className }) => {
    return (
        <div className={cn("w-full h-full min-h-[300px] flex items-center justify-center bg-[#1d1d1d] relative rounded-2xl overflow-hidden border border-white/10 group", className)}>
             <div className="absolute top-4 left-4 z-10 font-mono text-xs text-gray-500 uppercase tracking-widest">Liquid Metal</div>
             
             {/* Main Liquid Metal Effect */}
             <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full flex items-center justify-center">
                {/* Animated Liquid Metal Background */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-red-500/30 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-purple-400/20 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/50 via-gray-900/20 to-black/80"></div>
                </div>
                
                {/* Metallic Reflective Elements */}
                <div className="absolute top-1/4 left-1/4 w-1/3 h-1/4 rounded-full bg-white/10 blur-sm transform -rotate-45"></div>
                <div className="absolute top-1/3 right-1/4 w-1/4 h-1/5 rounded-full bg-white/15 blur-sm transform rotate-12"></div>
                
                {/* Outline Ring */}
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                <div className="absolute inset-[-10px] rounded-full border border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500 [mask:radial-gradient(black,black,transparent_70%)]"></div>
                
                {/* Center Icon */}
                <div className="relative z-10 flex items-center justify-center">
                    <ArrowUpRight className="w-12 h-12 text-[#65615f] group-hover:text-white transition-colors duration-300" />
                </div>
             </div>
             
             <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow linear infinite;
                }
             `}</style>
        </div>
    );
};