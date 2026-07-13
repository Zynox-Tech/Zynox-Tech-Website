'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import clsx from 'clsx';

interface MagneticButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'style'> {
  children: React.ReactNode;
  accent?: 'web' | 'mobile' | 'custom' | 'game' | 'neutral';
  className?: string;
}

export function MagneticButton({
  children,
  accent = 'neutral',
  className,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the button translation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for smooth tracking
  const springConfig = { damping: 15, elasticity: 0.1, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Pull factor: max pull of 15px
    const pullX = (clientX - centerX) * 0.35;
    const pullY = (clientY - centerY) * 0.35;

    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const accentStyles = {
    neutral: 'bg-ink text-bg hover:bg-ink-muted border-border',
    web: 'bg-accent-web text-white border-accent-web shadow-[0_4px_14px_0_var(--accent-web-soft)]',
    mobile: 'bg-accent-mobile text-black border-accent-mobile shadow-[0_4px_14px_0_var(--accent-mobile-soft)]',
    custom: 'bg-accent-custom text-black border-accent-custom shadow-[0_4px_14px_0_var(--accent-custom-soft)]',
    game: 'bg-accent-game text-white border-accent-game shadow-[0_4px_14px_0_var(--accent-game-soft)]',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={clsx(
        "relative px-6 py-3 rounded-lg border font-medium text-sm transition-all duration-300 transition-colors select-none flex items-center justify-center gap-2 overflow-hidden cursor-pointer",
        accentStyles[accent],
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-white/15 opacity-0 pointer-events-none rounded-lg"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
