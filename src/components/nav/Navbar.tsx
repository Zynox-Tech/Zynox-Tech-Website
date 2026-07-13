'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'web',      label: 'Web',      dot: '#4F8CFF', route: '/web-development'   },
  { id: 'mobile',   label: 'Mobile',   dot: '#34D399', route: '/mobile-development' },
  { id: 'custom',   label: 'Software', dot: '#F5A623', route: '/custom-software'    },
  { id: 'about',    label: 'About Us', dot: '#FF6B6B', route: '/about'              },
  { id: 'careers',  label: 'Careers',  dot: '#C961F2', route: '/carrier'            },
];

const SERVICE_LINKS: Record<string, { label: string; desc: string; route: string; accent: string }[]> = {
  web: [
    { label: 'Web Applications', desc: 'Custom React & Next.js platforms', route: '/web-development', accent: '#4F8CFF' },
    { label: 'E-Commerce Solutions', desc: 'High-converting online storefronts', route: '/web-development', accent: '#4F8CFF' },
    { label: 'Core Web Vitals Optimization', desc: 'Performance, speed, and SEO', route: '/web-development', accent: '#4F8CFF' },
  ],
  mobile: [
    { label: 'iOS Apps', desc: 'Native Apple ecosystem builds', route: '/mobile-development', accent: '#34D399' },
    { label: 'Android Apps', desc: 'High-performance Android client systems', route: '/mobile-development', accent: '#34D399' },
    { label: 'Flutter Cross-Platform', desc: 'Fast, single-codebase deploys', route: '/mobile-development', accent: '#34D399' },
  ],
  custom: [
    { label: 'Database Schema Design', desc: 'Robust PostgreSQL and indexing', route: '/custom-software', accent: '#F5A623' },
    { label: 'API Microservices', desc: 'Decoupled service network layouts', route: '/custom-software', accent: '#F5A623' },
    { label: 'Logistics Control Panels', desc: 'Custom internal SaaS platforms', route: '/custom-software', accent: '#F5A623' },
  ],
};

// ── Hex icon ──────────────────────────────────────────────────────────────────
function HexIcon({ color = '#4F8CFF' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1.5L13.5 4.75V11.25L8 14.5L2.5 11.25V4.75L8 1.5Z"
        fill={color}
        fillOpacity="0.18"
        stroke={color}
        strokeWidth="1.2"
      />
    </svg>
  );
}

// ── GitHub icon ───────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// ── LinkedIn icon ─────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Navbar() {
  const pathname = usePathname();
  const isHome   = pathname === '/';

  const [active,   setActive]   = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState<string | null>(null);
  const [open,     setOpen]     = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 32 });

  if (pathname.startsWith('/demo')) return null;

  // Scroll density
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Active section
  useEffect(() => {
    if (!isHome) {
      setActive(NAV.find(s => pathname === s.route)?.id ?? '');
      return;
    }
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    ['hero', ...NAV.map(s => s.id), 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const activeDot = NAV.find(s => s.id === active)?.dot ?? 'var(--ink-muted)';

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      {/* ── Scroll progress — very top of viewport ─────────────── */}
      <motion.div
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${activeDot}, #C961F2)`,
        }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] pointer-events-none"
      />

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 pointer-events-none select-none"
      >
        {/* Floating glass card */}
        <div
          className="pointer-events-auto w-full max-w-4xl rounded-2xl flex items-center justify-between px-4 h-[52px] md:h-[58px] transition-all duration-500 relative"
          style={{
            background: scrolled
              ? 'var(--bg-elevated)'
              : 'color-mix(in srgb, var(--bg-elevated) 70%, transparent)',
            border: '1px solid',
            borderColor: scrolled
              ? 'var(--border)'
              : 'color-mix(in srgb, var(--border) 50%, transparent)',
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
            boxShadow: scrolled
              ? '0 4px 32px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.05) inset'
              : '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >

          {/* ── Logo: ZYNOX wordmark ────────────────── */}
          <Link href="/" className="flex items-center shrink-0 group select-none z-50">
            <span className="flex items-center">
              <span
                style={{
                  fontFamily: '"Inter", "Arial Black", sans-serif',
                  fontWeight: 900,
                  fontSize: '22px',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                  color: 'var(--ink)',
                  transition: 'opacity 0.2s',
                }}
                className="group-hover:opacity-80 flex items-center"
              >
                ZYN
                <span
                  style={{
                    display: 'inline-block',
                    width: '0.74em',
                    height: '0.74em',
                    border: '0.17em solid currentColor',
                    borderRadius: '50%',
                    position: 'relative',
                    margin: '0 0.04em',
                    transform: 'translateY(-0.01em)',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '0.22em',
                      height: '0.22em',
                      backgroundColor: '#C4B5A5',
                      borderRadius: '50%',
                    }}
                  />
                </span>
                X
              </span>
            </span>
          </Link>

          {/* ── Nav links (Desktop) ──────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-0.5 h-full"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV.map((item) => {
              const isActive  = active  === item.id;
              const isHovered = hovered === item.id;
              const href = isHome ? `#${item.id}` : `/#${item.id}`;
              const hasDropdown = !!SERVICE_LINKS[item.id];

              return (
                <div
                  key={item.id}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setHovered(item.id)}
                >
                  <Link
                    href={href}
                    className="relative px-3.5 py-2.5 rounded-lg"
                  >
                    {/* Hover/active bg pill */}
                    {(isHovered || isActive) && (
                      <motion.span
                        layoutId="nav-bg"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          backgroundColor: isActive
                            ? `${item.dot}15`
                            : 'color-mix(in srgb, var(--ink) 5%, transparent)',
                          border: isActive ? `1px solid ${item.dot}28` : '1px solid transparent',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                      />
                    )}

                    <span
                      className="relative z-10 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors duration-150 flex items-center gap-1.5"
                      style={{ color: isActive ? item.dot : 'var(--ink-muted)' }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.dot, boxShadow: `0 0 4px ${item.dot}` }}
                          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                        />
                      )}
                      {item.label}
                    </span>

                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] rounded-full"
                        style={{ backgroundColor: item.dot, opacity: 0.5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hasDropdown && isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[290px] bg-bg-elevated/95 backdrop-blur-2xl border border-border rounded-xl p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.3)] z-50 flex flex-col gap-0.5"
                      >
                        {SERVICE_LINKS[item.id].map(sub => (
                          <Link
                            key={sub.label}
                            href={sub.route}
                            className="p-2 rounded-lg hover:bg-surface block text-left group/sub select-none transition-colors"
                          >
                            <span 
                              className="block text-[10px] font-bold transition-colors"
                              style={{ color: 'var(--ink)' }}
                            >
                              <span 
                                className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 transition-all group-hover/sub:scale-125"
                                style={{ backgroundColor: sub.accent, boxShadow: `0 0 5px ${sub.accent}` }}
                              />
                              {sub.label}
                            </span>
                            <span className="block text-[9px] text-ink-muted leading-normal mt-0.5 pl-3">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* ── Right: social icons + theme + contact (Desktop/Hybrid) ── */}
          <div className="flex items-center gap-1.5 z-50">

            {/* GitHub */}
            <a
              href="https://github.com/Zynox-Tech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-ink-faint hover:text-ink hover:bg-surface transition-all duration-150"
            >
              <GithubIcon />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/zynox-solutions/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-ink-faint hover:text-ink hover:bg-surface transition-all duration-150"
            >
              <LinkedInIcon />
            </a>

            {/* Divider */}
            <div className="hidden sm:block w-px h-4 bg-border mx-1" />

            <ThemeToggle />

            {/* Divider */}
            <div className="hidden sm:block w-px h-4 bg-border mx-1" />

            {/* Contact button */}
            <a
              href={isHome ? '#contact' : '/#contact'}
              onClick={scrollTo('contact')}
              className="group relative hidden sm:flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl border border-border bg-bg-elevated backdrop-blur-md font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:border-accent-web/50 hover:shadow-[0_0_16px_rgba(79,140,255,0.25)] active:scale-[0.97] cursor-pointer overflow-hidden"
            >
              {/* Glowing background gradient on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#4F8CFF]/15 to-[#C961F2]/15"
              />
              {/* Sweeping shimmer effect */}
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <span className="relative z-10 text-ink-muted group-hover:text-ink transition-colors duration-200">
                Contact
              </span>
            </a>

            {/* Hamburger Button (Mobile Only) */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="w-12 h-12 flex items-center justify-center rounded-lg border border-border bg-bg-elevated hover:bg-surface text-ink cursor-pointer md:hidden transition-all duration-200 select-none z-50 pointer-events-auto"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={open ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Full-screen Drawer Overlay (Mobile Only) ─────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop — tap outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[39] md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="fixed inset-x-0 top-0 bg-bg/40 backdrop-blur-2xl z-[40] flex flex-col justify-between p-6 pt-28 pb-10 md:hidden pointer-events-auto select-none border-b border-border/30"
              onClick={() => setOpen(false)}
            >
              {/* Scrollable list content */}
              <div className="flex flex-col gap-2 items-center w-full">
                {NAV.map((item) => (
                  <Link
                    key={item.id}
                    href={isHome ? `#${item.id}` : `/#${item.id}`}
                    onClick={(e) => {
                      setOpen(false);
                      if (isHome) {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-base font-bold font-mono tracking-widest uppercase py-2.5 min-h-[48px] w-full flex items-center justify-center transition-colors active:opacity-75"
                    style={{ color: item.dot }}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={isHome ? '#contact' : '/#contact'}
                  onClick={(e) => {
                    setOpen(false);
                    scrollTo('contact')(e);
                  }}
                  className="w-full max-w-[240px] text-center py-3 rounded-xl border border-accent-web bg-accent-web-soft text-accent-web font-mono text-xs uppercase tracking-widest font-bold min-h-[48px] flex items-center justify-center mt-3 active:scale-[0.98] transition-transform"
                >
                  Contact
                </a>
              </div>

              {/* Social Icons row & copyright */}
              <div className="flex flex-col items-center gap-4 pt-6">
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/Zynox-Tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-12 h-12 flex items-center justify-center rounded-xl border border-border bg-bg-elevated/60 text-ink-muted hover:text-ink active:scale-95 transition-all"
                  >
                    <GithubIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/zynox-solutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-12 h-12 flex items-center justify-center rounded-xl border border-border bg-bg-elevated/60 text-ink-muted hover:text-ink active:scale-95 transition-all"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
                <p className="text-[10px] text-ink-faint font-mono uppercase tracking-[0.2em]">
                  Zynox © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
