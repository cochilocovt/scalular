'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  children?: React.ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  magnetic = true,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_var(--glow-primary)] hover:shadow-[0_0_25px_var(--glow-primary)] font-semibold border-none',
    secondary: 'bg-foreground text-background hover:bg-foreground/90 font-semibold border-none',
    outline: 'bg-transparent border border-border text-text-primary hover:bg-surface-hover',
    ghost: 'bg-transparent text-text-primary hover:text-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full transition-colors duration-300 gap-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
