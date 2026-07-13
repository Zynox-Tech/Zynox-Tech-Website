'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initial = stored ?? 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  if (!mounted) {
    return <div className="w-9 h-9" />; // layout placeholder
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-12 h-12 md:w-9 md:h-9 flex items-center justify-center rounded-lg border border-border bg-bg-elevated hover:bg-surface text-ink transition-all cursor-pointer"
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: theme === 'dark' ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <motion.path
          d={
            theme === 'dark'
              ? "M12 3c.132 0 .263 0 .393.007a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.999Z"
              : "M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"
          }
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />
        {theme === 'light' && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </motion.g>
        )}
      </motion.svg>
    </button>
  );
}
