'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUp } from 'lucide-react';

// ── Social icon SVGs ──────────────────────────────────────────────────────────

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

interface NavColumn {
  heading: string;
  links: NavLink[];
}

const navColumns: NavColumn[] = [
  {
    heading: 'Services',
    links: [
      { label: 'Web Development', href: '/web-development' },
      { label: 'Mobile Apps', href: '/mobile-development' },
      { label: 'Custom Software', href: '/custom-software' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/carrier' },
      { label: 'Our Work', href: '/#projects' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/zynox-solutions/', external: true },
      { label: 'GitHub', href: 'https://github.com/Zynox-Tech', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/zynoxtech_1?igsh=MW8xYWNrOWk0cHM5eA==', external: true },
      { label: 'WhatsApp', href: 'https://wa.me/923170593433', external: true },
    ],
  },
];

const socialLinks = [
  { 
    icon: <LinkedInIcon />, 
    href: 'https://www.linkedin.com/company/zynox-solutions/', 
    label: 'LinkedIn',
    hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:shadow-[0_0_15px_rgba(10,102,194,0.35)] hover:bg-[#0A66C2]/5' 
  },
  { 
    icon: <InstagramIcon />, 
    href: 'https://www.instagram.com/zynoxtech_1?igsh=MW8xYWNrOWk0cHM5eA==', 
    label: 'Instagram',
    hoverClass: 'hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:shadow-[0_0_15px_rgba(225,48,108,0.35)] hover:bg-[#E1306C]/5' 
  },
  { 
    icon: <FacebookIcon />, 
    href: 'https://www.facebook.com/share/1CZM6StG9U/', 
    label: 'Facebook',
    hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:shadow-[0_0_15px_rgba(24,119,242,0.35)] hover:bg-[#1877F2]/5' 
  },
  { 
    icon: <GithubIcon />, 
    href: 'https://github.com/Zynox-Tech', 
    label: 'GitHub',
    hoverClass: 'hover:text-ink hover:border-ink/50 hover:shadow-[0_0_15px_rgba(150,150,150,0.25)] hover:bg-ink/5' 
  },
  { 
    icon: <WhatsAppIcon />, 
    href: 'https://wa.me/923170593433', 
    label: 'WhatsApp',
    hoverClass: 'hover:text-[#25D366] hover:border-[#25D366]/50 hover:shadow-[0_0_15px_rgba(37,211,102,0.35)] hover:bg-[#25D366]/5' 
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elevated/20 select-none">

      {/* ── Main content ── */}
      <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-14 flex flex-col lg:flex-row justify-between gap-12">

        {/* Left: logo + tagline + socials */}
        <div className="flex flex-col gap-6 max-w-xs">

          {/* Logo */}
          <div>
            <div className="flex flex-col gap-1.5">
              <span
                style={{
                  fontFamily: '"Inter", "Arial Black", sans-serif',
                  fontWeight: 900,
                  fontSize: '32px',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                  color: 'var(--ink)',
                }}
                className="flex items-center"
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
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 600,
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  color: '#C4B5A5',
                  textTransform: 'uppercase',
                }}
              >
                Software Solutions That Fits Best
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-sm text-ink-muted leading-relaxed">
            Zynox Software Solutions — engineering robust digital infrastructure and innovative software experiences for modern businesses.
          </p>

          {/* Social row */}
          <div className="flex items-center flex-wrap gap-3">
            {socialLinks.map(({ icon, href, label, hoverClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`
                  w-12 h-12 md:w-9 md:h-9 rounded-lg border border-border flex items-center justify-center
                  text-ink-muted transition-all duration-300 hover:scale-110
                  ${hoverClass}
                `}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right: nav columns — hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 gap-10 lg:gap-16">
          {navColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4 min-w-[120px]">
              <span className="text-sm font-semibold text-ink">{col.heading}</span>
              <ul className="flex flex-col gap-3">
                {col.links.map(({ label, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border">
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} Zynox Software Solutions. All rights reserved.
          </p>

          {/* Back to top — mobile only */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="md:hidden inline-flex items-center gap-2 min-h-[48px] px-5 py-2 rounded-xl border border-border bg-bg-elevated text-ink-muted text-xs font-mono uppercase tracking-widest hover:text-ink hover:border-border/80 active:scale-[0.97] transition-all cursor-pointer"
          >
            <ArrowUp size={12} />
            Back to top
          </button>
        </div>
      </div>

    </footer>
  );
}
