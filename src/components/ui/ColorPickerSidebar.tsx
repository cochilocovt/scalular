'use client';

import React, { useState, useCallback } from 'react';
import { 
  Palette, X, Sun, Moon, RotateCcw, Check, ChevronDown, ChevronRight,
  Droplet, Type, Layout, Menu, Search, Sparkles, Layers, Zap, Save,
  Star, Upload, FolderOpen, Link as LinkIcon
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ColorVariable {
  key: string;
  name: string;
  category: string;
}

const COLOR_VARIABLES: ColorVariable[] = [
  { key: '--background', name: 'Background', category: 'Background' },
  { key: '--background-secondary', name: 'Secondary BG', category: 'Background' },
  { key: '--background-tertiary', name: 'Tertiary BG', category: 'Background' },
  { key: '--foreground', name: 'Main Text', category: 'Text' },
  { key: '--text-primary', name: 'Primary Text', category: 'Text' },
  { key: '--text-secondary', name: 'Secondary Text', category: 'Text' },
  { key: '--foreground-muted', name: 'Muted Text', category: 'Text' },
  { key: '--primary', name: 'Primary', category: 'Brand' },
  { key: '--primary-hover', name: 'Primary Hover', category: 'Brand' },
  { key: '--secondary', name: 'Secondary', category: 'Brand' },
  { key: '--accent', name: 'Accent', category: 'Brand' },
  { key: '--destructive', name: 'Error', category: 'Status' },
  { key: '--success', name: 'Success', category: 'Status' },
  { key: '--warning', name: 'Warning', category: 'Status' },
  { key: '--border', name: 'Border', category: 'Borders' },
  { key: '--divider', name: 'Divider', category: 'Borders' },
  { key: '--glass-bg', name: 'Glass BG', category: 'Effects' },
  { key: '--glass-border', name: 'Glass Border', category: 'Effects' },
  { key: '--glow-primary', name: 'Primary Glow', category: 'Effects' },
  { key: '--glow-accent', name: 'Accent Glow', category: 'Effects' },
  { key: '--globe-primary', name: 'Globe Main', category: 'Globe' },
  { key: '--globe-atmosphere', name: 'Globe Atmo', category: 'Globe' },
];

const SECTION_COLOR_KEYS: Record<string, string[]> = {
  header: ['--background', '--text-primary', '--text-secondary', '--primary', '--border', '--glass-bg'],
  footer: ['--background', '--text-primary', '--text-secondary', '--primary', '--divider'],
  hero: ['--background', '--text-primary', '--text-secondary', '--primary', '--accent', '--globe-primary'],
  chaosToOrder: ['--background', '--text-primary', '--primary'],
  whatYouGet: ['--background', '--text-primary', '--primary', '--accent'],
  startForFree: ['--background', '--text-primary', '--primary', '--glow-primary'],
};

const THEME_INFO = [
  { 
    id: 'oceanic', 
    name: 'Oceanic Elite', 
    desc: 'Blue with Bronze highlights',
    colors: ['#3B82F6', '#9E6F43', '#0A0E1A'],
    font: 'Inter'
  },
  { 
    id: 'obsidian', 
    name: 'Obsidian Glass', 
    desc: 'Black glassmorphism with Vermillion',
    colors: ['#E23636', '#FFFFFF', '#050505'],
    font: 'Outfit'
  },
  { 
    id: 'terra', 
    name: 'Terra Luxe', 
    desc: 'Warm browns with Teal accents',
    colors: ['#B87E4A', '#2DD4BF', '#1A1412'],
    font: 'Playfair Display'
  },
];

interface ColorPickerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ColorPickerSidebar({ isOpen, onClose }: ColorPickerSidebarProps) {
  const { theme, themeName, toggle, setThemeName } = useTheme();
  const [currentColors, setCurrentColors] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState<string>('global');
  const [activeTab, setActiveTab] = useState<'theme' | 'customize' | 'sections' | 'fonts'>('theme');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Brand']));
  const [fontLink, setFontLink] = useState('');
  const [customFontName, setCustomFontName] = useState('');

  const applyColor = useCallback((key: string, value: string) => {
    document.documentElement.style.setProperty(key, value);
    setCurrentColors(prev => ({ ...prev, [key]: value }));
    localStorage.setItem('scalular-custom-colors', JSON.stringify({ ...currentColors, [key]: value }));
  }, [currentColors]);

  const resetCustomColors = useCallback(() => {
    setCurrentColors({});
    Object.keys(currentColors).forEach(key => {
      document.documentElement.style.removeProperty(key);
    });
    localStorage.removeItem('scalular-custom-colors');
  }, [currentColors]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const categories = [...new Set(COLOR_VARIABLES.map(v => v.category))];

  const getColorsForSection = (section: string) => {
    const keys = SECTION_COLOR_KEYS[section] || [];
    return COLOR_VARIABLES.filter(v => keys.includes(v.key));
  };

  const SECTIONS = [
    { id: 'header', name: 'Header / Navbar', icon: Menu },
    { id: 'footer', name: 'Footer', icon: Layout },
    { id: 'hero', name: 'Hero Section', icon: Zap },
    { id: 'chaosToOrder', name: 'Chaos to Order', icon: Layers },
    { id: 'whatYouGet', name: 'What You Get', icon: Search },
    { id: 'startForFree', name: 'Start for Free', icon: Star },
  ];

  const handleFontLinkSubmit = () => {
    if (fontLink && customFontName) {
      const existingLink = document.getElementById('custom-font-link');
      if (existingLink) existingLink.remove();
      const linkEl = document.createElement('link');
      linkEl.id = 'custom-font-link';
      linkEl.rel = 'stylesheet';
      linkEl.href = fontLink;
      document.head.appendChild(linkEl);
      document.documentElement.style.setProperty('--font-family', `"${customFontName}", sans-serif`);
      localStorage.setItem('scalular-custom-font', JSON.stringify({ link: fontLink, name: customFontName }));
      setFontLink('');
      setCustomFontName('');
    }
  };

  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fontName = file.name.replace(/\.[^/.]+$/, '');
        const fontUrl = event.target?.result as string;
        const style = document.createElement('style');
        style.textContent = `@font-face { font-family: '${fontName}'; src: url('${fontUrl}'); }`;
        document.head.appendChild(style);
        document.documentElement.style.setProperty('--font-family', `"${fontName}", sans-serif`);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-[380px] bg-surface border-l border-divider z-[200] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-divider bg-surface-raised">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Palette className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-bold text-text-primary">Theme Designer</h2>
            <p className="text-[10px] text-text-secondary">{THEME_INFO.find(t => t.id === themeName)?.name}</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-surface-hover">
          <X className="w-4 h-4 text-text-secondary" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-divider">
        {[
          { id: 'theme', label: 'Themes', icon: Sparkles },
          { id: 'customize', label: 'Customize', icon: Droplet },
          { id: 'sections', label: 'Sections', icon: Layout },
          { id: 'fonts', label: 'Fonts', icon: Type },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
              activeTab === tab.id ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <tab.icon className="w-3 h-3" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'theme' && (
          <div className="p-3 space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary">Select Theme</h3>
            {THEME_INFO.map(t => (
              <button
                key={t.id}
                onClick={() => setThemeName(t.id as typeof themeName)}
                className={`w-full p-3 rounded-xl border transition-all text-left ${
                  themeName === t.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-text-primary">{t.name}</span>
                  {themeName === t.id && <Check className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-[10px] text-text-secondary mb-2">{t.desc}</p>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {t.colors.map((c, i) => (
                      <div key={i} className="w-5 h-5 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="text-[9px] text-text-secondary">Font: {t.font}</span>
                </div>
              </button>
            ))}

            <div className="pt-2 border-t border-divider">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">Light / Dark Mode</h3>
              <button
                onClick={toggle}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-text-primary border border-divider rounded-lg hover:border-primary/30 hover:bg-surface-hover"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>

            <div className="pt-2 border-t border-divider">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">Reset Custom Colors</h3>
              <button
                onClick={resetCustomColors}
                className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary border border-divider rounded-lg hover:border-primary/30"
              >
                <RotateCcw className="w-3 h-3" />
                Reset to Theme Defaults
              </button>
            </div>
          </div>
        )}

        {activeTab === 'customize' && (
          <div className="p-3 space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">
              Override Theme Colors
            </h3>
            {categories.map(category => {
              const colors = COLOR_VARIABLES.filter(v => v.category === category);
              if (colors.length === 0) return null;
              return (
                <div key={category} className="mb-1">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded hover:bg-surface-hover text-left"
                  >
                    <span className="text-xs font-semibold text-text-primary">{category}</span>
                    {expandedCategories.has(category) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                  </button>
                  {expandedCategories.has(category) && (
                    <div className="mt-1 ml-1 space-y-1">
                      {colors.map(variable => (
                        <div key={variable.key} className="flex items-center gap-2 px-2 py-1 rounded bg-background/50">
                          <input
                            type="color"
                            value={currentColors[variable.key] || document.documentElement.style.getPropertyValue(variable.key) || '#3B82F6'}
                            onChange={(e) => applyColor(variable.key, e.target.value)}
                            className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                          />
                          <span className="text-[10px] text-text-secondary flex-1 truncate">{variable.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'sections' && (
          <div className="p-3">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">Select Section</h3>
            <div className="space-y-1 mb-4">
              {SECTIONS.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeSection === section.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-surface-hover border border-transparent'
                  }`}
                >
                  <section.icon className={`w-4 h-4 ${activeSection === section.id ? 'text-primary' : 'text-text-secondary'}`} />
                  <span className={`text-xs ${activeSection === section.id ? 'text-primary font-semibold' : 'text-text-secondary'}`}>{section.name}</span>
                </button>
              ))}
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">
              {SECTIONS.find(s => s.id === activeSection)?.name} Colors
            </h3>
            <div className="space-y-1">
              {getColorsForSection(activeSection).map(variable => (
                <div key={variable.key} className="flex items-center gap-2 px-2 py-1.5 rounded bg-background/50">
                  <input
                    type="color"
                    value={currentColors[variable.key] || document.documentElement.style.getPropertyValue(variable.key) || '#3B82F6'}
                    onChange={(e) => applyColor(variable.key, e.target.value)}
                    className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 p-0"
                  />
                  <span className="text-[10px] text-text-secondary flex-1 truncate">{variable.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fonts' && (
          <div className="p-3 space-y-4">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">Import Font from Link</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Font name (e.g., Roboto)"
                  value={customFontName}
                  onChange={(e) => setCustomFontName(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-background border border-divider rounded-lg text-text-primary focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Google Fonts URL"
                  value={fontLink}
                  onChange={(e) => setFontLink(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-background border border-divider rounded-lg text-text-primary focus:border-primary"
                />
                <button onClick={handleFontLinkSubmit} disabled={!fontLink || !customFontName}
                  className="w-full py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50">
                  Load Font
                </button>
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">Upload Font File</h3>
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-divider rounded-lg cursor-pointer hover:border-primary/50">
                <FolderOpen className="w-5 h-5 text-text-secondary mb-1" />
                <p className="text-[10px] text-text-secondary">Click to upload .ttf / .otf / .woff</p>
                <input type="file" accept=".ttf,.otf,.woff,.woff2" onChange={handleFontUpload} className="hidden" />
              </label>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-text-secondary mb-2">Current Font Preview</h3>
              <div className="p-3 bg-background/50 rounded-lg border border-divider">
                <p className="text-xs text-text-primary" style={{ fontFamily: 'var(--font-family)' }}>
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-[9px] text-text-secondary mt-1">
                  Current: {THEME_INFO.find(t => t.id === themeName)?.font || 'Default'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}