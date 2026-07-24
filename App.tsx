import React, { useState, useEffect } from 'react';
import { PortfolioHome } from './components/PortfolioHome';
import { BlogPage } from './components/BlogPage';
import { BlogListPage } from './components/BlogListPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { KanbanBoard } from './components/KanbanBoard';
import { CommandPalette } from './components/CommandPalette';
import { ExperimentsPage } from './components/ExperimentsPage';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [activeArticle, setActiveArticle] = useState<string | undefined>(undefined);
  const [isDark, setIsDark] = useState(true);

  // -- Init isLoading based on session/daily persistence --
  const [isLoading, setIsLoading] = useState(() => {
    // Only show preloader on the MAIN page (no hash)
    // It will show EVERY time the page is reloaded on the main route
    const isMainPage = !window.location.hash || window.location.hash === '#';
    return isMainPage;
  });

  // --- Hash Handling for Persistence ---
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // remove '#'
      if (hash) {
        if (hash.startsWith('article/')) {
          setCurrentView('blogs');
          setActiveArticle(hash.split('/')[1]);
        } else if (hash.startsWith('blogs/article/')) {
          setCurrentView('blogs');
          setActiveArticle(hash.replace('blogs/article/', ''));
        } else {
          setCurrentView(hash);
          setActiveArticle(undefined);
        }
      } else {
        setCurrentView('home');
        setActiveArticle(undefined);
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Failsafe: auto-hide preloader after 5 seconds
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      if (isLoading) {
        console.log("Preloader failsafe triggered");
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(failsafeTimer);
  }, [isLoading]);

  // Debug: Log when app renders
  useEffect(() => {
    console.log("App rendered, isLoading:", isLoading);
  }, [isLoading]);

  // Toggle Theme
  const toggleTheme = () => {
    // Helper to switch theme state and DOM
    const switchTheme = () => {
      setIsDark((prev) => !prev);
      document.documentElement.classList.toggle('dark');
    };

    // Use View Transitions API if available
    if (document.startViewTransition) {
      document.startViewTransition(switchTheme);
    } else {
      switchTheme();
    }
  };

  const handleNavigate = (view: string, articleId?: string) => {
    // Artificial loading removed for internal navigation to keep preloader only for initial load

    // Special handling for Contact: Scroll to section instead of new page
    if (view === 'contact') {
      const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      };

      if (currentView !== 'home') {
        setCurrentView('home');
        // Allow time for Home component to mount
        setTimeout(scrollToContact, 100);
      } else {
        // If already on home, just scroll
        scrollToContact();
      }
      // Update hash to reflect contact? Maybe just keep it as home or #contact?
      // User just said "redirect to contact section".
      // If we change hash to #contact, logic might try to update view?
      // window.location.hash = 'contact'; -> this triggers hashchange listener -> logic in useEffect?
      // The useEffect at line 20 (not shown but implied) handles hash change.
      // If I manually handle it here, I should perhaps NOT change hash to avoid loop or just return.
      return;
    }

    // Update hash which triggers the effect
    const newHash = view === 'home' ? '' : (view + (articleId ? `/article/${articleId}` : ''));
    if (window.location.hash.slice(1) !== newHash) {
      window.location.hash = newHash;
    } else {
      // If hash is same, just ensure state is right
      setCurrentView(view);
      setActiveArticle(articleId || null);
    }

    // Scroll handling
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (

    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-blue-100 dark:selection:bg-white/20 transition-colors duration-300 font-sans">

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => {
            console.log("Preloader completed");
            setIsLoading(false);
          }} />
        )}
      </AnimatePresence>

      <div className="relative z-0">
        {currentView === 'home' && (
          <PortfolioHome
            onNavigate={handleNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
        )}

        {currentView === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
        )}

        {currentView === 'blogs' && (
          <BlogPage
            onNavigate={handleNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
            activeArticleId={activeArticle}
          />
        )}

        {currentView === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
        )}

        {currentView === 'kanban' && (
          <KanbanBoard onNavigate={handleNavigate} />
        )}

        {currentView === 'experiments' && (
          <ExperimentsPage onNavigate={handleNavigate} />
        )}
      </div>

      {currentView !== 'home' && <Footer />}

      <CommandPalette
        onNavigate={handleNavigate}
        toggleTheme={toggleTheme}
        isDark={isDark}
      />

    </div>

  );
}



export default App;