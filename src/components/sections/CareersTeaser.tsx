'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, Users } from 'lucide-react';
import { SectionEyebrow } from '../shared/SectionEyebrow';

export function CareersTeaser() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      id="careers"
      className="relative bg-bg py-14 md:py-24 border-b border-border/50 overflow-hidden scroll-mt-20"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[300px] bg-accent-game/[0.03] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Hybrid Model statement */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <SectionEyebrow number="05" label="Careers at Zynox" accent="game" className="mb-6" />
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-ink mt-2 mb-6 leading-tight"
            >
              Build real products.<br />Work from anywhere.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-ink-muted text-sm md:text-base leading-relaxed mb-8 max-w-xl"
            >
              We work in a flexible hybrid model, combining remote collaboration with in-person sessions for planning, innovation, and client meetings. Our focus is on outcomes, communication, and giving our team the flexibility to do their best work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/carrier"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:border-accent-game/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(201,97,242,0.3)] hover:text-accent-game w-full sm:w-auto text-center min-h-[48px]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-game/10 to-[#8B5CF6]/10" />
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-game to-[#8B5CF6] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className="relative z-10 flex items-center gap-2.5">
                  <span>Explore Open Positions</span>
                  <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Visual highlights card */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-bg-elevated border border-border/60 rounded-2xl p-6 relative overflow-hidden group/card hover:border-accent-game/30 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-game/10 flex items-center justify-center text-accent-game shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Outcome-Driven Culture</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    No time tracking or micromanagement. We define the goals, align on timelines, and execute.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-bg-elevated border border-border/60 rounded-2xl p-6 relative overflow-hidden group/card hover:border-accent-game/30 transition-all duration-300"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-game/10 flex items-center justify-center text-accent-game shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Collaboration & Mentorship</h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Work directly alongside senior engineers who have shipped products used by thousands globally.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
