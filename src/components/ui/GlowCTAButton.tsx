'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface GlowCTAButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  target?: '_blank' | '_self';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function GlowCTAButton({
  label = 'Get Started',
  onClick,
  href,
  target,
  size = 'md',
  className = '',
}: GlowCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const rippleId = useRef(0);

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleId.current++;
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    }
    onClick?.();
  };

  const commonProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick: handleClick,
    className: `relative inline-flex items-center gap-2 font-black text-white rounded-full overflow-hidden cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${sizeClasses[size]} ${className}`,
  };

  const inner = (
    <>
      {/* Animated gradient border via conic pseudo-element */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from var(--glow-angle, 0deg), #3B82F6, #60A5FA, #9E6F43, #3B82F6)',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          animation: 'spin-border 3s linear infinite',
        }}
      />

      {/* Solid fill background */}
      <span className="absolute inset-[2px] rounded-full bg-primary" />

      {/* Pulsing glow behind */}
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? ['0 0 20px rgba(59,130,246,0.5)', '0 0 40px rgba(59,130,246,0.8)', '0 0 20px rgba(59,130,246,0.5)']
            : ['0 0 10px rgba(59,130,246,0.3)', '0 0 20px rgba(59,130,246,0.4)', '0 0 10px rgba(59,130,246,0.3)'],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Label + arrow */}
      <span className="relative z-10 flex items-center gap-2">
        {label}
        <motion.span
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </span>

      {/* Ripple effects */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: r.x,
            top: r.y,
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            background: 'rgba(255,255,255,0.4)',
            animation: 'cta-ripple 0.7s ease-out forwards',
          }}
        />
      ))}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.04 }}
        {...(commonProps as any)}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={label}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.04 }}
      {...commonProps}
    >
      {inner}
    </motion.button>
  );
}
