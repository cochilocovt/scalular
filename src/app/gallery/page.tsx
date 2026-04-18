'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { X, Play } from 'lucide-react';
import { GALLERY_DATA, GALLERY_CATEGORIES, GalleryItem } from '@/data/galleryData';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);

  // Filter data based on category
  const filteredData = GALLERY_DATA.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  // Handle keydown for modal (escape key)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedMedia(null);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary pt-20 pb-20">
      
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24 px-6 md:px-12 bg-mesh-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_80%,var(--primary-muted),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-8"
          >
            Inside Our Network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-text-primary leading-[1.05] tracking-tighter mb-6"
          >
            Real Factories. <span className="text-gradient">Real Impact.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-medium"
          >
            Every image and video here is captured directly from our audited partner compliance facilities. No stock photos. Complete transparency.
          </motion.p>
        </div>
      </section>

      {/* ── Filter Categories ─────────────────────────────────── */}
      <section className="px-6 md:px-12 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 md:gap-4"
        >
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat 
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-surface/50 text-text-secondary border-border hover:bg-surface hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── Asymmetric Masonry Grid ───────────────────────────── */}
      <section className="px-4 md:px-8 lg:px-12 w-full">
        <motion.div 
          layout
          className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, i) => {
              // Determine grid spans based on predefined tags
              let gridClassName = "col-span-1 row-span-1";
              if (item.span === 'large') gridClassName = "col-span-2 row-span-2";
              else if (item.span === 'wide') gridClassName = "col-span-2 row-span-1";
              else if (item.span === 'tall') gridClassName = "col-span-1 row-span-2";

              // Make spans more rigid on smaller screens to prevent breaks
              const finalClassName = `relative rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer ${gridClassName} md:col-span-auto`;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  key={item.id}
                  className={finalClassName}
                  onClick={() => setSelectedMedia(item)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  ) : (
                    <>
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md rounded-full p-2">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </>
                  )}
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Label / Caption */}
                  <div className="absolute bottom-4 left-5 z-10 pr-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block mb-1 text-[10px] font-bold tracking-widest uppercase text-white/70 bg-white/20 px-2 py-0.5 rounded-sm backdrop-blur-md">
                      {item.category}
                    </span>
                    <h3 className="text-sm md:text-base font-bold text-white tracking-tight leading-tight">
                      {item.label}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Modal / Lightbox ──────────────────────────────────── */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedMedia(null)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-[110] text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Media Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
              className="relative w-full max-w-6xl max-h-[85vh] rounded-xl overflow-hidden shadow-2xl flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
               {selectedMedia.type === 'image' ? (
                 <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    className="max-h-[85vh] w-auto object-contain rounded-lg shadow-2xl"
                 />
               ) : (
                 <video
                    src={selectedMedia.src}
                    autoPlay
                    controls
                    className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
                 />
               )}
               
               {/* Caption in Modal */}
               <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md rounded-full px-6 py-3 text-center pointer-events-none">
                 <h2 className="text-white font-bold text-lg tracking-tight leading-none mb-1">
                   {selectedMedia.label}
                 </h2>
                 <p className="text-white/70 text-xs uppercase tracking-widest font-semibold">
                   {selectedMedia.category} • {selectedMedia.alt}
                 </p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
