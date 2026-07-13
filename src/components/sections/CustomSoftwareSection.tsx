'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SectionEyebrow } from '../shared/SectionEyebrow';
import { DeviceFrame } from '../shared/DeviceFrame';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import { ArrowRight, Terminal, Database, Shield } from 'lucide-react';

export function CustomSoftwareSection() {
  return (
    <section 
      id="custom" 
      className="py-10 md:py-16 lg:py-28 border-b border-border/50 relative scroll-mt-12 bg-bg select-none transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-accent-custom/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Extremely clean, minimal text, CTA button */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center pr-4">
            <SectionEyebrow number="03" label="Custom Software" accent="custom" className="mb-6" />
            
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight mb-4">
              We help build your custom systems.
            </h3>
            
            <p className="text-ink-muted text-sm leading-relaxed mb-8 max-w-sm">
              Decoupled service networks, database schema optimizations, custom logistics, and control panels.
            </p>

            {/* Primary Action to view projects */}
            <Link
              href="/custom-software"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:border-accent-custom/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(245,166,35,0.3)] hover:text-accent-custom w-full sm:w-auto text-center min-h-[48px]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-custom/10 to-[#FF7B00]/10" />
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-custom to-[#FF7B00] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
              
              <span className="relative z-10 flex items-center gap-2.5 text-xs">
                <span>See Custom Software</span>
                <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          {/* Right Column: Simulated Desktop frame with Raza info inside screen */}
          <div className="lg:col-span-7 flex flex-col items-center w-full">
            <div className="w-full max-w-lg flex justify-center">
              <DeviceFrame mode="desktop" domain="zynox.com/raza-developer" size="sm">
                <div className="p-5 h-full flex flex-col justify-between font-sans text-left bg-bg select-text selection:bg-accent-custom-soft selection:text-accent-custom overflow-y-auto">
                  {/* Simulated Desktop Navbar */}
                  <div className="flex justify-between items-center border-b border-border/60 pb-2 mb-3 select-none">
                    <span className="font-mono text-[10px] font-bold text-ink tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse" />
                      RAZA DEV
                    </span>
                    <div className="flex gap-2.5 font-mono text-[8px] text-ink-muted">
                      <span>Server Status: Online</span>
                    </div>
                  </div>

                  {/* Simulated Content */}
                  <div className="space-y-3.5 py-1 flex-grow flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-custom/20 to-indigo-500/20 border border-accent-custom/30 flex items-center justify-center text-accent-custom text-xs font-bold relative overflow-hidden shrink-0">
                          <Image 
                            src="/images/team/raza.jpeg" 
                            alt="Raza" 
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold tracking-tight text-ink leading-tight">
                            Raza
                          </h4>
                          <p className="text-[9px] text-ink-muted">Lead Systems Eng (1.5+ yrs exp)</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-mono text-accent-custom px-1.5 py-0.5 rounded bg-accent-custom-soft border border-accent-custom/20">
                        BACKEND SYS
                      </span>
                    </div>

                    <p className="text-xs text-ink-muted leading-relaxed">
                      Raza focuses on high-availability structures, cluster scheduling, and database pipelines using <strong className="text-ink font-medium font-mono">Python, Django, FastAPI, and PostgreSQL</strong>.
                    </p>

                    {/* Telemetry charts */}
                    <div className="grid grid-cols-2 gap-3.5 my-1">
                      {/* Uptime metric */}
                      <div className="bg-bg-elevated border border-border p-2.5 rounded-lg flex items-center gap-3">
                        <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="18" cy="18" r="15" stroke="var(--border)" strokeWidth="3" fill="transparent" />
                            <motion.circle 
                              cx="18" 
                              cy="18" 
                              r="15" 
                              stroke="var(--accent-custom)" 
                              strokeWidth="3" 
                              fill="transparent" 
                              strokeDasharray={94.2}
                              initial={{ strokeDashoffset: 94.2 }}
                              animate={{ strokeDashoffset: 0 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </svg>
                          <span className="absolute font-mono text-[8px] font-bold text-ink">99.9</span>
                        </div>
                        <div>
                          <span className="block font-mono text-[7px] text-ink-faint uppercase leading-none">Uptime</span>
                          <span className="text-[10px] font-bold text-ink">Service SLA</span>
                        </div>
                      </div>

                      {/* Equalizer Telemetry */}
                      <div className="bg-bg-elevated border border-border p-2.5 rounded-lg flex flex-col justify-between h-[46px]">
                        <div className="flex items-end justify-between w-full h-3 gap-0.5">
                          {[25, 45, 80, 40, 95, 60, 30, 75].map((h, i) => (
                            <motion.div
                              key={i}
                              className="bg-accent-custom w-full rounded-t-sm"
                              initial={{ height: "10%" }}
                              animate={{ height: `${h}%` }}
                              transition={{ 
                                duration: 0.6, 
                                delay: i * 0.04, 
                                repeat: Infinity, 
                                repeatType: "reverse"
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-1 leading-none">
                          <span className="font-mono text-[7px] text-ink-faint uppercase">Kafka Ingest</span>
                          <span className="font-mono text-[9px] font-bold text-accent-custom">2.1k/s</span>
                        </div>
                      </div>
                    </div>

                    {/* Tech stack pills */}
                    <div className="flex flex-wrap gap-1 pt-1.5 select-none">
                      {['Python', 'Django', 'FastAPI', 'PostgreSQL'].map(tech => (
                        <span key={tech} className="text-[8px] font-mono px-2 py-0.5 bg-surface border border-border text-ink-muted rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Footer */}
                  <div className="border-t border-border/50 pt-2.5 mt-3 flex justify-between items-center text-[8px] text-ink-faint font-mono select-none">
                    <span>Terminal Online</span>
                    <span>Postgres clusters</span>
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
