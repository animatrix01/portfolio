import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../lib/utils';

export function ScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [githubFollower, setGithubFollower] = useState<
    {
      id: number;
      name: string;
      avatar: string;
      randomStar: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchLast20GithubFollowers = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/ibelick/followers'
        );
        
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        const newGithubFollowers = data
          .map((follower: any) => {
            return {
              id: follower.id,
              name: follower.login,
              avatar: follower.avatar_url,
              randomStar: Math.floor(Math.random() * 90) + 10,
            };
          })
          .slice(0, 20);

        setGithubFollower(newGithubFollowers);
      } catch (error) {
        // Fallback mock data if API fails (rate limits etc)
        const mockData = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            name: `user_${i + 1}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
            randomStar: Math.floor(Math.random() * 100)
        }));
        setGithubFollower(mockData);
      }
    };

    fetchLast20GithubFollowers();
  }, []);

  return (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#0a0a0a] shadow-sm group">
      
      {/* Fake Browser Header */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-white/80 dark:bg-[#111]/80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-white/5 flex justify-between items-center">
          <div className="flex gap-1.5 ml-1">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
          </div>
          <span className="text-[10px] font-mono font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">animation-timeline: view()</span>
       </div>

      <div
        className="h-full w-full overflow-y-scroll p-4 pt-14 scrollbar-hide"
        ref={containerRef}
      >
        <ul className="flex w-full flex-col space-y-3 pb-[10%]">
          {githubFollower.map((item, index) => {
            return (
              <li
                key={item.id}
                className="reveal-item flex items-center justify-between rounded-xl bg-white/60 dark:bg-white/5 px-3 py-3 backdrop-blur-sm border border-gray-100 dark:border-white/5 shadow-sm"
                style={{ '--item-index': index } as React.CSSProperties}
              >
                <div className="flex items-center">
                  <img
                    src={item.avatar}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center text-amber-400">
                  <Star size={12} fill="currentColor" />
                  <span className="ml-1 text-xs font-mono text-gray-500 dark:text-gray-400">
                    {item.randomStar}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <style>{`
        @keyframes appear {
          from {
            filter: blur(4px);
            opacity: 0;
            transform: scale(0.85) translateY(20px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: scale(1) translateY(0);
          }
        }

        .reveal-item {
          animation: appear linear both;
          /* Experimental view timeline, with fallback */
          animation-timeline: view();
          animation-range: entry 20% cover 30%;
        }
        
        /* Fallback for browsers that don't support animation-timeline */
        @supports not (animation-timeline: view()) {
          .reveal-item {
            animation-name: appear;
            animation-duration: 0.8s;
            animation-fill-mode: both;
            animation-delay: calc(var(--item-index) * 0.1s);
          }
        }
      `}</style>
    </div>
  );
}