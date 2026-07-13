'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TechOrbit from './TechOrbit';

// ── Scramble effect ───────────────────────────────────────────────────────────
const GLYPHS = '$_%&+*?#=@![]{}^~';

function ScrambleWord({ word }: { word: string }) {
  const [display, setDisplay] = useState(word);
  const [busy, setBusy] = useState(false);
  const ticker = useRef<number | null>(null);

  const scramble = useCallback(() => {
    if (busy) return;
    setBusy(true);
    let iter = 0;
    const max = 12;
    if (ticker.current) clearInterval(ticker.current);
    ticker.current = window.setInterval(() => {
      setDisplay(
        word.split('').map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < iter / (max / word.length)) return word[i];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }).join('')
      );
      iter++;
      if (iter >= max) {
        clearInterval(ticker.current!);
        setDisplay(word);
        setBusy(false);
      }
    }, 40);
  }, [word, busy]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    scramble();
    return () => { if (ticker.current) clearInterval(ticker.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  return (
    <span className="inline-block cursor-default select-none" onMouseEnter={scramble}>
      {display}
    </span>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const CYCLE = ['platforms', 'products', 'experiences', 'systems'] as const;

const SERVICES = [
  { label: 'Web', dot: '#4F8CFF', desc: 'Development', sectionId: 'web' },
  { label: 'Mobile', dot: '#34D399', desc: 'Apps', sectionId: 'mobile' },
  { label: 'Software', dot: '#F5A623', desc: 'Custom', sectionId: 'custom' },
];

const TICKER_ITEMS = [
  'Logistics', 'E-Commerce', 'Education', 'Mining', 'Gaming',
  'Healthcare', 'FinTech', 'Real Estate', 'SaaS', 'Defence',
  'Logistics', 'E-Commerce', 'Education', 'Mining', 'Gaming',
  'Healthcare', 'FinTech', 'Real Estate', 'SaaS', 'Defence',
];

// ── Component ─────────────────────────────────────────────────────────────────
export function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(p => (p + 1) % CYCLE.length), 2600);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen bg-bg overflow-hidden flex flex-col">

      {/* ── Background glows ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full opacity-[0.12] blur-[140px]"
          style={{
            width: '52vw', height: '52vw', top: '-12%', right: '-10%',
            background: 'radial-gradient(circle, #C961F2 0%, #4F8CFF 55%, transparent 100%)'
          }} />
        <div className="absolute rounded-full opacity-[0.07] blur-[100px]"
          style={{
            width: '28vw', height: '28vw', bottom: '15%', left: '3%',
            background: 'radial-gradient(circle, #34D399 0%, transparent 100%)'
          }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }} />
      </div>

      {/* ── Main two-column content ──────────────────────────────── */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-12 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_240px] lg:grid-cols-2 gap-8 md:gap-6 lg:gap-14 items-center pt-20 pb-8">

          {/* ═══════════════ LEFT ═══════════════════ */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint border border-border/50 bg-bg-elevated/40 px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-web" style={{ boxShadow: '0 0 6px #4F8CFF' }} />
                Software Studio
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="font-bold text-ink leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5.2rem)', letterSpacing: '-0.03em' }}
            >
              <ScrambleWord word="Software," /><br />
              <ScrambleWord word="done" />{' '}
              <span className="text-stroke"><ScrambleWord word="properly." /></span>
            </motion.h1>

            {/* Cycling sub-line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="text-ink-muted font-normal" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}>
                We build
              </span>
              <span className="relative overflow-hidden inline-block" style={{ height: '1.5em', minWidth: 170, fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-105%', opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center font-semibold"
                    style={{
                      background: 'linear-gradient(90deg, #4F8CFF, #C961F2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {CYCLE[wordIdx]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.68 }}
              className="text-ink-muted leading-[1.75] max-w-md"
              style={{ fontSize: 'clamp(0.87rem, 1.15vw, 1rem)' }}
            >
              For businesses who'd rather show a client something real than a slide deck.
              Web platforms, mobile apps, and custom software systems.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full"
            >
              <button
                onClick={scrollTo('web')}
                className="group relative overflow-hidden rounded-xl text-[11px] font-mono font-bold uppercase tracking-widest cursor-pointer active:scale-[0.97] transition-all duration-100 min-h-[48px] px-6 py-3 flex items-center justify-center w-full sm:w-auto"
              >
                <span className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(120deg, #4F8CFF 0%, #8B5CF6 50%, #C961F2 100%)',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }} />
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'linear-gradient(120deg, rgba(79,140,255,0.1), rgba(201,97,242,0.1))' }} />
                <span className="relative z-10 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(120deg, #4F8CFF, #8B5CF6, #C961F2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  See our work
                  <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" style={{ color: '#8B5CF6' }} />
                </span>
              </button>

              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className="group flex items-center justify-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-ink-muted hover:text-ink border border-border sm:border-transparent rounded-xl hover:border-border active:scale-[0.97] transition-all duration-200 cursor-pointer min-h-[48px] px-6 py-3 w-full sm:w-auto text-center"
              >
                <span className="border-b border-transparent group-hover:border-ink-muted transition-colors duration-200">
                  Get in touch
                </span>
                <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </motion.div>

            {/* Service indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="grid grid-cols-2 gap-y-4 gap-x-2 md:flex md:items-stretch md:gap-0 pt-4"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              {SERVICES.map(({ label, dot, desc, sectionId }, i) => (
                <motion.button
                  key={label}
                  onClick={scrollTo(sectionId)}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 1.15 + i * 0.07 }}
                  className={`flex flex-col gap-1 pr-4 cursor-pointer group text-left focus:outline-none pb-2 md:pb-0 w-full md:w-auto md:pr-5 md:mr-5 ${(i % 2 === 0 && i < 3) ? "border-r border-border/40" : (i < 3 ? "md:border-r md:border-border/40" : "")}`}
                >
                  <div className="flex items-center gap-1.5 pt-1 md:pt-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-[1.5]"
                      style={{ backgroundColor: dot, boxShadow: `0 0 5px ${dot}` }}
                    />
                    <span className="font-mono text-[10px] font-semibold text-ink-muted tracking-wider group-hover:text-ink transition-colors duration-200">
                      {label}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-ink-faint tracking-widest uppercase pl-3 group-hover:text-ink-muted transition-colors duration-200">
                    {desc}
                  </span>
                </motion.button>
              ))}
            </motion.div>

          </div>

          {/* ═══════════════ RIGHT ══════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="relative hidden md:flex items-center justify-center"
            style={{ height: 'clamp(220px, 30vw, 460px)' }}
          >
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: '0 0 100px 20px rgba(79,140,255,0.05), 0 0 180px 60px rgba(201,97,242,0.03)' }} />
            <div className="absolute inset-0">
              <TechOrbit />
            </div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/40 bg-bg-elevated/60 backdrop-blur-md text-[9px] font-mono text-ink-faint z-20"
            >
              <span className="w-1 h-1 rounded-full bg-accent-mobile animate-ping" />
              <span className="w-1 h-1 rounded-full bg-accent-mobile absolute" />
              9 active
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border/40 bg-bg-elevated/60 backdrop-blur-md text-[9px] font-mono z-20"
            >
              <span className="text-accent-web">Full-stack</span>
              <span className="text-border">·</span>
              <span className="text-ink-faint">end-to-end</span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Full-width industries ticker ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="relative z-10 w-full shrink-0"
        style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-elevated)' }}
      >
        {/* Row label */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-3.5 pb-2.5 flex items-center gap-5">
          <span className="font-mono text-[8px] uppercase tracking-[0.38em] text-ink-faint shrink-0 select-none">
            Industries
          </span>
          <div className="h-px flex-1 bg-border/20" />
        </div>

        {/* Marquee strip */}
        <div
          className="overflow-hidden pb-4"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, black 4%, black 96%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 4%, black 96%, transparent 100%)',
          }}
        >
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            className="flex whitespace-nowrap"
          >
            {TICKER_ITEMS.map((v, i) => (
              <span key={`tk-${i}`} className="inline-flex items-center">
                <span
                  className="font-mono font-semibold uppercase tracking-[0.15em] text-ink-muted hover:text-ink transition-colors duration-200 cursor-default"
                  style={{ fontSize: 'clamp(0.75rem, 1vw, 0.88rem)' }}
                >
                  {v}
                </span>
                <span
                  className="mx-6 text-accent-web/25 select-none"
                  style={{ fontSize: '0.45rem' }}
                >
                  ◆
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.45, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 2.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-ink-faint text-[8px] font-mono uppercase tracking-[0.28em] pointer-events-none z-20"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
