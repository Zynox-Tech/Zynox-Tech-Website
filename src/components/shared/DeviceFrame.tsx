'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState } from 'react';
import { Monitor, Phone, ExternalLink } from 'lucide-react';

interface DeviceFrameProps {
  mode: 'desktop' | 'mobile';
  src?: string; // iframe URL or image path
  domain: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function DeviceFrame({ mode, src, domain, children, size = 'lg' }: DeviceFrameProps) {
  const isDesktop = mode === 'desktop';
  const isImage = src ? src.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) !== null : false;

  const desktopSizes = {
    sm: "w-full max-w-xl aspect-[16/10] rounded-xl",
    md: "w-full max-w-2xl aspect-[16/10] rounded-xl",
    lg: "w-full max-w-4xl aspect-[16/10] rounded-xl"
  };

  const mobileSizes = {
    sm: "w-[220px] h-[440px] rounded-[28px]",
    md: "w-[260px] h-[520px] rounded-[32px]",
    lg: "w-[280px] h-[560px] rounded-[36px] md:w-[310px] md:h-[620px]"
  };

  return (
    <div className="w-full flex items-center justify-center py-6 px-2">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={clsx(
          "relative border-4 border-border bg-bg-elevated shadow-2xl overflow-hidden transition-colors duration-300",
          isDesktop ? desktopSizes[size] : mobileSizes[size]
        )}
      >
        {isDesktop ? (
          /* Browser Chrome */
          <div className="flex flex-col h-full w-full">
            {/* Header Address Bar */}
            <div className="h-10 border-b border-border bg-surface px-4 flex items-center justify-between select-none">
              {/* Traffic Lights */}
              <div className="flex gap-1.5 w-16">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
              </div>
              
              {/* URL */}
              <div className="flex-grow max-w-md bg-bg text-ink-muted text-[11px] px-3 py-1 rounded-md text-center border border-border select-all font-mono truncate">
                https://{domain}
              </div>
              
              {/* Actions placeholder */}
              <div className="w-16 flex justify-end">
                <ExternalLink size={12} className="text-ink-faint" />
              </div>
            </div>

            {/* Viewport */}
            <div className="flex-grow bg-surface relative overflow-hidden">
              {children ? (
                children
              ) : isImage && src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={src}
                  alt={domain}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <iframe
                  src={src}
                  title={domain}
                  className="w-full h-full border-none bg-bg"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
          </div>
        ) : (
          /* Phone Chrome (iPhone Bezel style) */
          <div className="flex flex-col h-full w-full relative">
            {/* Notch / Dynamic Island bezel */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-6 bg-black rounded-full z-30 flex items-center justify-center">
              <span className="w-2 h-2 bg-zinc-800 rounded-full absolute right-4" />
              <span className="w-10 h-1 bg-zinc-900 rounded-full absolute left-4" />
            </div>

            {/* Side hardware buttons (Visual guides) */}
            <div className="absolute top-20 -left-[5px] w-[2px] h-10 bg-border rounded-r" />
            <div className="absolute top-36 -left-[5px] w-[2px] h-10 bg-border rounded-r" />
            <div className="absolute top-28 -right-[5px] w-[2px] h-14 bg-border rounded-l" />

            {/* Viewport */}
            <div className="flex-grow bg-surface relative overflow-hidden rounded-[32px]">
              {children ? (
                <div className="pt-6 h-full">{children}</div>
              ) : isImage && src ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={src}
                  alt={domain}
                  className="w-full h-full object-cover object-top pt-6"
                />
              ) : (
                <iframe
                  src={src}
                  title={domain}
                  className="w-full h-full border-none bg-bg pt-6"
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>

            {/* Bottom Bar Indicator */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-ink/30 rounded-full z-20" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
