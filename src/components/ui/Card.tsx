'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <motion.div
      className={cn(
        // Glassmorphism: frosted backdrop + semi-transparent fill
        'glass-card rounded-[2rem] p-6 relative overflow-hidden',
        // Neumorphic dual shadow over the glass layer
        'shadow-[8px_8px_20px_var(--color-neu-shadow-dark),_-8px_-8px_20px_var(--color-neu-shadow-light)]',
        className
      )}
      {...props}
    >
      {/* Top-left edge highlight */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.07] to-transparent pointer-events-none" />
      {/* Bottom-right depth layer */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tl from-black/[0.05] to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
