'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-10 h-10 rounded-full flex items-center justify-center',
        'neu-btn cursor-pointer',
        'hover:scale-105 active:scale-95',
        'text-text-secondary hover:text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        className
      )}
    >
      <span
        className="absolute inset-0 rounded-full transition-opacity duration-300"
        style={{
          opacity: isDark ? 0 : 1,
          background: 'radial-gradient(circle at 60% 40%, rgba(245,158,11,0.15), transparent 70%)',
        }}
      />
      {isDark ? (
        <Moon className="w-4 h-4 relative z-10 transition-transform duration-300" />
      ) : (
        <Sun className="w-4 h-4 relative z-10 transition-transform duration-300 text-amber-500" />
      )}
    </button>
  );
}
