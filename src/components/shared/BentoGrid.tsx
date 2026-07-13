'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={clsx("grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] md:auto-rows-[280px]", className)}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  tiltEffect?: boolean;
}

export function BentoCard({ children, className, tiltEffect = true }: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { damping: 20, stiffness: 150 });
  const springY = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    if (!tiltEffect) return;
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tiltEffect ? rotateX : 0,
        rotateY: tiltEffect ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "relative rounded-2xl border border-border bg-bg-elevated overflow-hidden p-6 flex flex-col justify-between transition-all duration-300 group hover:border-ink/20 cursor-pointer shadow-sm",
        className
      )}
    >
      <div style={{ transform: 'translateZ(10px)' }} className="h-full flex flex-col justify-between z-10">
        {children}
      </div>
    </motion.div>
  );
}
