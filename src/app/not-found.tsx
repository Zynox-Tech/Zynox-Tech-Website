'use client';

import Link from 'next/link';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-bg text-ink selection:bg-accent-web-soft selection:text-accent-web transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center pt-24 px-6 relative overflow-hidden select-none">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-game/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center max-w-md z-10 flex flex-col items-center">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs uppercase tracking-[0.25em] text-accent-game mb-4"
          >
            404 - NOT FOUND
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-ink mb-3"
          >
            This page doesn't exist.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-ink-muted leading-relaxed mb-8"
          >
            Check the link, or head back to the homepage.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/"
              className="group relative overflow-hidden inline-flex items-center justify-center text-xs font-mono uppercase tracking-widest px-6 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-bold transition-all duration-300 hover:border-accent-game/60 hover:shadow-[0_0_24px_rgba(201,97,242,0.3)] hover:text-accent-game cursor-pointer"
            >
              {/* Glowing background gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#C961F2]/20 to-[#FF5ACD]/20" />
              
              {/* Neon accent bar inside button bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#C961F2] to-[#FF5ACD] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Sweeping shimmer reflection */}
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <span className="relative z-10">Back to homepage</span>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
