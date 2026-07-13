'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SectionEyebrow } from '../shared/SectionEyebrow';
import { DeviceFrame } from '../shared/DeviceFrame';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import { ArrowRight, Cpu, Smartphone, Flame } from 'lucide-react';

export function MobileSection() {
  return (
    <section 
      id="mobile" 
      className="py-10 md:py-16 lg:py-28 border-b border-border/50 relative scroll-mt-12 bg-bg select-none transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-accent-mobile/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Extremely clean, minimal text, CTA button */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pr-4">
            <SectionEyebrow number="02" label="Mobile Development" accent="mobile" className="mb-6" />
            
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight mb-4">
              We help build your mobile app.
            </h3>
            
            <p className="text-ink-muted text-sm leading-relaxed mb-8 max-w-sm">
              Beautiful layout, responsive design, and native mobile performance.
            </p>

            {/* Primary Action to view projects */}
            <Link
              href="/mobile-development"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:border-accent-mobile/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:text-accent-mobile w-full sm:w-auto text-center min-h-[48px]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-mobile/10 to-[#00F2FE]/10" />
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-mobile to-[#00F2FE] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
              
              <span className="relative z-10 flex items-center gap-2.5 text-xs">
                <span>See Mobile Projects</span>
                <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          {/* Right Column: Simulated Phone frame with Shaheer info inside screen */}
          <div className="lg:col-span-7 flex flex-col items-center w-full">
            <div className="w-full max-w-[210px] flex justify-center">
              <DeviceFrame mode="mobile" domain="zynox.com/mobile-team" size="sm">
                <div className="p-4 h-full flex flex-col justify-between font-sans text-left bg-bg select-text selection:bg-accent-mobile-soft selection:text-accent-mobile overflow-y-auto">
                  {/* Simulated Mobile Header */}
                  <div className="flex justify-between items-center border-b border-border/60 pb-2 mb-3 select-none">
                    <span className="font-mono text-[9px] font-bold text-ink tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      MOBILE TEAM
                    </span>
                    <span className="text-[7px] font-mono text-ink-muted">iOS / Android</span>
                  </div>

                  {/* Dual Developer Cards */}
                  <div className="space-y-3 py-1 flex-grow flex flex-col justify-center">
                    {/* Shaheer Ahmed */}
                    <div className="bg-bg-elevated border border-border/60 rounded-xl p-2 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full border border-accent-mobile/30 flex items-center justify-center text-accent-mobile text-xs font-bold relative overflow-hidden shrink-0">
                        <Image 
                          src="/images/team/shaheer.jpeg" 
                          alt="Shaheer Ahmed" 
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="text-[9px] font-bold tracking-tight text-ink leading-tight">Shaheer Ahmed</h4>
                        <p className="text-[7px] text-ink-muted">Flutter & React Native Dev</p>
                      </div>
                      <span className="text-[6px] font-mono text-accent-mobile px-1 py-0.5 rounded bg-accent-mobile-soft border border-accent-mobile/20 shrink-0">
                        MOBILE
                      </span>
                    </div>

                    {/* Ubaidullah */}
                    <div className="bg-bg-elevated border border-border/60 rounded-xl p-2 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full border border-accent-mobile/30 flex items-center justify-center text-accent-mobile text-xs font-bold relative overflow-hidden shrink-0">
                        <Image 
                          src="/images/team/ubaid.jpeg" 
                          alt="Ubaidullah" 
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="text-[9px] font-bold tracking-tight text-ink leading-tight">Ubaidullah</h4>
                        <p className="text-[7px] text-ink-muted">Flutter & Firebase Dev</p>
                      </div>
                      <span className="text-[6px] font-mono text-accent-mobile px-1 py-0.5 rounded bg-accent-mobile-soft border border-accent-mobile/20 shrink-0">
                        MOBILE
                      </span>
                    </div>

                    {/* Visual Progress telemetries */}
                    <div className="grid grid-cols-1 gap-2.5 my-1">
                      {/* Speed benchmark */}
                      <div className="bg-bg-elevated border border-border p-2 rounded-lg flex items-center gap-2.5">
                        <div className="w-7 h-7 shrink-0 flex items-center justify-center relative">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="14" cy="14" r="12" stroke="var(--border)" strokeWidth="2.5" fill="transparent" />
                            <motion.circle 
                              cx="14" 
                              cy="14" 
                              r="12" 
                              stroke="var(--accent-mobile)" 
                              strokeWidth="2.5" 
                              fill="transparent" 
                              strokeDasharray={75.4}
                              initial={{ strokeDashoffset: 75.4 }}
                              animate={{ strokeDashoffset: 0 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </svg>
                          <span className="absolute font-mono text-[7px] font-bold text-ink">60</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[7px] text-ink-faint uppercase leading-none">FPS Target</span>
                          <span className="text-[9px] font-bold text-ink">Native Sync Rate</span>
                        </div>
                      </div>

                      {/* Stream telemetry */}
                      <div className="bg-bg-elevated border border-border p-2 rounded-lg flex flex-col justify-between h-[40px]">
                        <div className="flex items-end justify-between w-full h-2 gap-0.5">
                          {[40, 70, 50, 90, 60, 80, 55, 65].map((h, i) => (
                            <motion.div
                              key={i}
                              className="bg-accent-mobile w-full rounded-t-sm"
                              initial={{ height: "10%" }}
                              animate={{ height: `${h}%` }}
                              transition={{ 
                                duration: 0.5, 
                                delay: i * 0.03, 
                                repeat: Infinity, 
                                repeatType: "reverse"
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-1 leading-none">
                          <span className="font-mono text-[6px] text-ink-faint uppercase">DB Sync Latency</span>
                          <span className="font-mono text-[8px] font-bold text-accent-mobile">4ms</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1 select-none">
                      {['Flutter', 'Dart', 'Firebase'].map(tech => (
                        <span key={tech} className="text-[7px] font-mono px-1.5 py-0.5 bg-surface border border-border text-ink-muted rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Mobile Footer */}
                  <div className="border-t border-border/50 pt-2 mt-3 flex justify-between items-center text-[7px] text-ink-faint font-mono select-none">
                    <span>Engine v1.2</span>
                    <span>Firebase Live</span>
                  </div>
                </div>
              </DeviceFrame>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
