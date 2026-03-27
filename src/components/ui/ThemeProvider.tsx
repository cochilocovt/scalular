'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light';
type ThemeName = 'oceanic' | 'obsidian' | 'terra';

interface ThemeContextValue {
  theme: ThemeMode;
  themeName: ThemeName;
  toggle: () => void;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  themeName: 'oceanic',
  toggle: () => {},
  setThemeName: () => {},
});

const THEME_COLORS: Record<string, Record<string, string>> = {
  oceanic: {
    '--font-family': "'Inter', sans-serif",
    '--background': '#0A0E1A',
    '--background-secondary': '#0F1424',
    '--background-tertiary': '#141930',
    '--background-elevated': '#1A2038',
    '--surface': '#0F1424',
    '--surface-raised': '#141930',
    '--surface-hover': '#1E2642',
    '--surface-active': '#252E50',
    '--foreground': '#F0F4FF',
    '--foreground-muted': '#A0AAC0',
    '--foreground-subtle': '#6B7690',
    '--text-primary': '#F0F4FF',
    '--text-primary-hover': '#FFFFFF',
    '--text-secondary': '#A0AAC0',
    '--text-secondary-hover': '#C0D0E0',
    '--primary': '#3B82F6',
    '--primary-hover': '#60A5FA',
    '--primary-active': '#2563EB',
    '--primary-muted': 'rgba(59, 130, 246, 0.12)',
    '--primary-foreground': '#FFFFFF',
    '--primary-border': 'rgba(59, 130, 246, 0.3)',
    '--secondary': '#1E40AF',
    '--secondary-hover': '#3B82F6',
    '--secondary-muted': 'rgba(30, 64, 175, 0.15)',
    '--secondary-foreground': '#F0F4FF',
    '--secondary-border': 'rgba(30, 64, 175, 0.3)',
    '--accent': '#9E6F43',
    '--accent-hover': '#B8884F',
    '--accent-muted': 'rgba(158, 111, 67, 0.15)',
    '--accent-foreground': '#FFFFFF',
    '--accent-border': 'rgba(158, 111, 67, 0.3)',
    '--destructive': '#EF4444',
    '--success': '#10B981',
    '--warning': '#F59E0B',
    '--info': '#3B82F6',
    '--border': 'rgba(255, 255, 255, 0.08)',
    '--border-hover': 'rgba(255, 255, 255, 0.15)',
    '--divider': 'rgba(255, 255, 255, 0.06)',
    '--input': 'rgba(255, 255, 255, 0.08)',
    '--glass-bg': 'rgba(15, 20, 36, 0.75)',
    '--glass-border': 'rgba(255, 255, 255, 0.1)',
    '--glass-bg-strong': 'rgba(10, 14, 26, 0.9)',
    '--neu-shadow-dark': 'rgba(0, 0, 0, 0.6)',
    '--neu-shadow-light': 'rgba(255, 255, 255, 0.03)',
    '--glow-primary': 'rgba(59, 130, 246, 0.4)',
    '--glow-accent': 'rgba(158, 111, 67, 0.4)',
    '--globe-primary': '#3B82F6',
    '--globe-secondary': '#1E40AF',
    '--globe-arc': 'rgba(59, 130, 246, 0.85)',
    '--globe-atmosphere': '#3B82F6',
    '--globe-ring': '#9E6F43',
    '--gradient-hero-start': '#0A0E1A',
    '--gradient-hero-end': '#0F1424',
    '--gradient-radial-primary': 'rgba(59, 130, 246, 0.06)',
    '--selection-bg': 'rgba(158, 111, 67, 0.3)',
    '--ring': '#9E6F43',
    '--ring-offset': '#0A0E1A',
    '--placeholder': '#6B7690',
  },
  obsidian: {
    '--font-family': "'Outfit', sans-serif",
    '--background': '#050505',
    '--background-secondary': '#0A0A0A',
    '--background-tertiary': '#0F0F0F',
    '--background-elevated': '#141414',
    '--surface': '#0A0A0A',
    '--surface-raised': '#111111',
    '--surface-hover': '#1A1A1A',
    '--surface-active': '#222222',
    '--foreground': '#FFFFFF',
    '--foreground-muted': '#D4D4D4',
    '--foreground-subtle': '#808080',
    '--text-primary': '#FFFFFF',
    '--text-primary-hover': '#F5F5F5',
    '--text-secondary': '#D4D4D4',
    '--text-secondary-hover': '#E5E5E5',
    '--primary': '#E23636',
    '--primary-hover': '#FF4D4D',
    '--primary-active': '#CC2020',
    '--primary-muted': 'rgba(226, 54, 54, 0.12)',
    '--primary-foreground': '#FFFFFF',
    '--primary-border': 'rgba(226, 54, 54, 0.4)',
    '--secondary': '#1A1A1A',
    '--secondary-hover': '#2A2A2A',
    '--secondary-muted': 'rgba(255, 255, 255, 0.05)',
    '--secondary-foreground': '#FFFFFF',
    '--secondary-border': 'rgba(255, 255, 255, 0.1)',
    '--accent': '#E23636',
    '--accent-hover': '#FF4D4D',
    '--accent-muted': 'rgba(226, 54, 54, 0.15)',
    '--accent-foreground': '#FFFFFF',
    '--destructive': '#FF4444',
    '--success': '#00D68F',
    '--warning': '#FFB800',
    '--info': '#00B4D8',
    '--border': 'rgba(255, 255, 255, 0.12)',
    '--border-hover': 'rgba(255, 255, 255, 0.2)',
    '--divider': 'rgba(255, 255, 255, 0.08)',
    '--input': 'rgba(255, 255, 255, 0.08)',
    '--glass-bg': 'rgba(10, 10, 10, 0.6)',
    '--glass-border': 'rgba(255, 255, 255, 0.15)',
    '--glass-bg-strong': 'rgba(5, 5, 5, 0.85)',
    '--neu-shadow-dark': 'rgba(0, 0, 0, 0.8)',
    '--neu-shadow-light': 'rgba(255, 255, 255, 0.02)',
    '--glow-primary': 'rgba(226, 54, 54, 0.5)',
    '--glow-accent': 'rgba(226, 54, 54, 0.4)',
    '--globe-primary': '#E23636',
    '--globe-secondary': '#CC2020',
    '--globe-arc': 'rgba(226, 54, 54, 0.7)',
    '--globe-atmosphere': '#E23636',
    '--globe-ring': '#E23636',
    '--gradient-hero-start': '#050505',
    '--gradient-hero-end': '#0A0A0A',
    '--gradient-radial-primary': 'rgba(226, 54, 54, 0.05)',
    '--selection-bg': 'rgba(226, 54, 54, 0.3)',
    '--ring': '#E23636',
    '--ring-offset': '#050505',
    '--placeholder': '#666666',
  },
  terra: {
    '--font-family': "'Playfair Display', serif",
    '--background': '#1A1412',
    '--background-secondary': '#211916',
    '--background-tertiary': '#2A211D',
    '--background-elevated': '#332822',
    '--surface': '#211916',
    '--surface-raised': '#2A211D',
    '--surface-hover': '#3D322A',
    '--surface-active': '#4A3D34',
    '--foreground': '#F5EDE6',
    '--foreground-muted': '#C4B5A8',
    '--foreground-subtle': '#8A7B6E',
    '--text-primary': '#F5EDE6',
    '--text-primary-hover': '#FFFAF5',
    '--text-secondary': '#C4B5A8',
    '--text-secondary-hover': '#D9CFC4',
    '--primary': '#B87E4A',
    '--primary-hover': '#D4955A',
    '--primary-active': '#9E6F43',
    '--primary-muted': 'rgba(184, 126, 74, 0.12)',
    '--primary-foreground': '#FFFFFF',
    '--primary-border': 'rgba(184, 126, 74, 0.3)',
    '--secondary': '#8B4513',
    '--secondary-hover': '#A0522D',
    '--secondary-muted': 'rgba(139, 69, 19, 0.15)',
    '--secondary-foreground': '#F5EDE6',
    '--secondary-border': 'rgba(139, 69, 19, 0.3)',
    '--accent': '#2DD4BF',
    '--accent-hover': '#5EEAD4',
    '--accent-muted': 'rgba(45, 212, 191, 0.12)',
    '--accent-foreground': '#1A1412',
    '--accent-border': 'rgba(45, 212, 191, 0.3)',
    '--destructive': '#FF6B6B',
    '--success': '#6BBF8A',
    '--warning': '#FFB347',
    '--info': '#74B9FF',
    '--border': 'rgba(245, 237, 230, 0.1)',
    '--border-hover': 'rgba(245, 237, 230, 0.18)',
    '--divider': 'rgba(245, 237, 230, 0.08)',
    '--input': 'rgba(245, 237, 230, 0.08)',
    '--glass-bg': 'rgba(33, 25, 22, 0.7)',
    '--glass-border': 'rgba(245, 237, 230, 0.12)',
    '--glass-bg-strong': 'rgba(26, 20, 18, 0.88)',
    '--neu-shadow-dark': 'rgba(0, 0, 0, 0.6)',
    '--neu-shadow-light': 'rgba(245, 237, 230, 0.03)',
    '--glow-primary': 'rgba(184, 126, 74, 0.4)',
    '--glow-accent': 'rgba(45, 212, 191, 0.4)',
    '--globe-primary': '#B87E4A',
    '--globe-secondary': '#8B4513',
    '--globe-arc': 'rgba(184, 126, 74, 0.7)',
    '--globe-atmosphere': '#B87E4A',
    '--globe-ring': '#2DD4BF',
    '--gradient-hero-start': '#1A1412',
    '--gradient-hero-end': '#211916',
    '--gradient-radial-primary': 'rgba(184, 126, 74, 0.06)',
    '--selection-bg': 'rgba(45, 212, 191, 0.25)',
    '--ring': '#2DD4BF',
    '--ring-offset': '#1A1412',
    '--placeholder': '#8A7B6E',
  },
};

const THEME_LIGHT_COLORS: Record<string, Record<string, string>> = {
  oceanic: {
    '--background': '#F8FAFC',
    '--background-secondary': '#F1F5F9',
    '--background-tertiary': '#E2E8F0',
    '--background-elevated': '#FFFFFF',
    '--surface': '#FFFFFF',
    '--surface-raised': '#F8FAFC',
    '--surface-hover': '#F1F5F9',
    '--surface-active': '#E2E8F0',
    '--foreground': '#0F172A',
    '--foreground-muted': '#475569',
    '--foreground-subtle': '#94A3B8',
    '--text-primary': '#0F172A',
    '--text-primary-hover': '#1E293B',
    '--text-secondary': '#475569',
    '--text-secondary-hover': '#334155',
    '--primary': '#2563EB',
    '--primary-hover': '#3B82F6',
    '--primary-muted': 'rgba(37, 99, 235, 0.1)',
    '--accent': '#8B5E3C',
    '--accent-hover': '#9E6F43',
    '--accent-muted': 'rgba(158, 111, 67, 0.1)',
    '--border': 'rgba(0, 0, 0, 0.08)',
    '--border-hover': 'rgba(0, 0, 0, 0.15)',
    '--divider': 'rgba(0, 0, 0, 0.06)',
    '--input': 'rgba(0, 0, 0, 0.05)',
    '--glass-bg': 'rgba(255, 255, 255, 0.7)',
    '--glass-border': 'rgba(0, 0, 0, 0.08)',
    '--glass-bg-strong': 'rgba(255, 255, 255, 0.9)',
    '--neu-shadow-dark': 'rgba(0, 0, 0, 0.08)',
    '--neu-shadow-light': 'rgba(255, 255, 255, 0.8)',
    '--glow-primary': 'rgba(37, 99, 235, 0.2)',
    '--glow-accent': 'rgba(158, 111, 67, 0.2)',
    '--globe-primary': '#2563EB',
    '--globe-atmosphere': '#2563EB',
    '--gradient-hero-start': '#F8FAFC',
    '--gradient-hero-end': '#F1F5F9',
    '--gradient-radial-primary': 'rgba(37, 99, 235, 0.04)',
    '--selection-bg': 'rgba(158, 111, 67, 0.2)',
    '--ring': '#9E6F43',
    '--ring-offset': '#F8FAFC',
    '--placeholder': '#94A3B8',
  },
  obsidian: {
    '--background': '#FAFAFA',
    '--background-secondary': '#F5F5F5',
    '--background-tertiary': '#EBEBEB',
    '--background-elevated': '#FFFFFF',
    '--surface': '#FFFFFF',
    '--surface-raised': '#FAFAFA',
    '--surface-hover': '#F5F5F5',
    '--surface-active': '#EBEBEB',
    '--foreground': '#111111',
    '--foreground-muted': '#525252',
    '--foreground-subtle': '#A3A3A3',
    '--text-primary': '#111111',
    '--text-primary-hover': '#000000',
    '--text-secondary': '#525252',
    '--text-secondary-hover': '#404040',
    '--primary': '#CC2020',
    '--primary-hover': '#E23636',
    '--primary-muted': 'rgba(204, 32, 32, 0.08)',
    '--secondary': '#F5F5F5',
    '--secondary-hover': '#EBEBEB',
    '--secondary-foreground': '#111111',
    '--accent': '#CC2020',
    '--accent-hover': '#E23636',
    '--accent-muted': 'rgba(204, 32, 32, 0.08)',
    '--border': 'rgba(0, 0, 0, 0.1)',
    '--border-hover': 'rgba(0, 0, 0, 0.2)',
    '--divider': 'rgba(0, 0, 0, 0.06)',
    '--input': 'rgba(0, 0, 0, 0.06)',
    '--glass-bg': 'rgba(255, 255, 255, 0.75)',
    '--glass-border': 'rgba(0, 0, 0, 0.1)',
    '--glass-bg-strong': 'rgba(255, 255, 255, 0.9)',
    '--neu-shadow-dark': 'rgba(0, 0, 0, 0.1)',
    '--neu-shadow-light': 'rgba(255, 255, 255, 0.9)',
    '--glow-primary': 'rgba(204, 32, 32, 0.2)',
    '--glow-accent': 'rgba(204, 32, 32, 0.15)',
    '--globe-primary': '#CC2020',
    '--globe-secondary': '#E23636',
    '--globe-arc': 'rgba(204, 32, 32, 0.7)',
    '--globe-atmosphere': '#CC2020',
    '--gradient-hero-start': '#FAFAFA',
    '--gradient-hero-end': '#F5F5F5',
    '--gradient-radial-primary': 'rgba(204, 32, 32, 0.04)',
    '--selection-bg': 'rgba(204, 32, 32, 0.15)',
    '--ring': '#CC2020',
    '--ring-offset': '#FAFAFA',
    '--placeholder': '#A3A3A3',
  },
  terra: {
    '--background': '#FAF7F4',
    '--background-secondary': '#F5F0EB',
    '--background-tertiary': '#EDE6DF',
    '--background-elevated': '#FFFFFF',
    '--surface': '#FFFFFF',
    '--surface-raised': '#FAF7F4',
    '--surface-hover': '#F5F0EB',
    '--surface-active': '#EDE6DF',
    '--foreground': '#2C2420',
    '--foreground-muted': '#5C4F47',
    '--foreground-subtle': '#9A8B7E',
    '--text-primary': '#2C2420',
    '--text-primary-hover': '#1A1412',
    '--text-secondary': '#5C4F47',
    '--text-secondary-hover': '#4A3F38',
    '--primary': '#9E6F43',
    '--primary-hover': '#B87E4A',
    '--primary-muted': 'rgba(158, 111, 67, 0.1)',
    '--secondary': '#F5F0EB',
    '--secondary-hover': '#EDE6DF',
    '--secondary-foreground': '#2C2420',
    '--accent': '#0D9488',
    '--accent-hover': '#14B8A6',
    '--accent-muted': 'rgba(13, 148, 136, 0.1)',
    '--accent-foreground': '#FFFFFF',
    '--border': 'rgba(44, 36, 32, 0.1)',
    '--border-hover': 'rgba(44, 36, 32, 0.2)',
    '--divider': 'rgba(44, 36, 32, 0.06)',
    '--input': 'rgba(44, 36, 32, 0.06)',
    '--glass-bg': 'rgba(255, 255, 255, 0.75)',
    '--glass-border': 'rgba(44, 36, 32, 0.1)',
    '--glass-bg-strong': 'rgba(255, 255, 255, 0.9)',
    '--neu-shadow-dark': 'rgba(44, 36, 32, 0.08)',
    '--neu-shadow-light': 'rgba(255, 255, 255, 0.9)',
    '--glow-primary': 'rgba(158, 111, 67, 0.2)',
    '--glow-accent': 'rgba(13, 148, 136, 0.2)',
    '--globe-primary': '#9E6F43',
    '--globe-secondary': '#B87E4A',
    '--globe-arc': 'rgba(158, 111, 67, 0.7)',
    '--globe-atmosphere': '#9E6F43',
    '--gradient-hero-start': '#FAF7F4',
    '--gradient-hero-end': '#F5F0EB',
    '--gradient-radial-primary': 'rgba(158, 111, 67, 0.04)',
    '--selection-bg': 'rgba(13, 148, 136, 0.15)',
    '--ring': '#0D9488',
    '--ring-offset': '#FAF7F4',
    '--placeholder': '#9A8B7E',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [themeName, setThemeNameState] = useState<ThemeName>('oceanic');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('sg-theme') as ThemeMode | null;
    const storedName = localStorage.getItem('sg-theme-name') as ThemeName | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolvedMode = storedMode ?? preferred;
    const resolvedName = storedName ?? 'oceanic';
    setTheme(resolvedMode);
    setThemeNameState(resolvedName);
    applyTheme(resolvedMode, resolvedName);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('sg-theme', next);
    applyTheme(next, themeName);
  };

  const setThemeName = (name: ThemeName) => {
    setThemeNameState(name);
    localStorage.setItem('sg-theme-name', name);
    applyTheme(theme, name);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggle, setThemeName }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

function applyTheme(mode: ThemeMode, name: ThemeName) {
  const html = document.documentElement;
  
  // Apply base theme colors
  const baseColors = THEME_COLORS[name] || THEME_COLORS.oceanic;
  Object.entries(baseColors).forEach(([key, value]) => {
    html.style.setProperty(key, value);
  });

  // Apply light mode overrides if needed
  if (mode === 'light') {
    const lightColors = THEME_LIGHT_COLORS[name] || THEME_LIGHT_COLORS.oceanic;
    Object.entries(lightColors).forEach(([key, value]) => {
      html.style.setProperty(key, value);
    });
  }

  // Update classes
  html.classList.remove('dark', 'light');
  html.classList.add(mode);

  // Load font
  const fonts: Record<ThemeName, string> = {
    oceanic: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    obsidian: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap',
    terra: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
  };

  let fontLink = document.getElementById('theme-font') as HTMLLinkElement;
  if (!fontLink) {
    fontLink = document.createElement('link');
    fontLink.id = 'theme-font';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }
  fontLink.href = fonts[name];
}