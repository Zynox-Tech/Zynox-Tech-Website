'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/nav/Navbar';
import { WEB_PROJECTS, WebProject } from '@/data/projects';
import { 
  ArrowLeft, 
  ArrowRight, 
  Globe, 
  Code2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Flame 
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

function GithubIcon({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function WebDevPage() {
  const [selectedProject, setSelectedProject] = useState<WebProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Compile project images: main image + gallery images
  const getProjectImages = (project: WebProject) => {
    const images = [project.image || '/images/projects/generic-project.png'];
    if (project.gallery) {
      images.push(...project.gallery);
    }
    return images;
  };

  const currentProjectImages = selectedProject ? getProjectImages(selectedProject) : [];

  const handleNextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % currentProjectImages.length);
  };

  const handlePrevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev - 1 + currentProjectImages.length) % currentProjectImages.length);
  };

  return (
    <div className="bg-bg text-ink min-h-screen font-sans flex flex-col selection:bg-accent-web-soft selection:text-accent-web transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-12 md:pt-28 md:pb-20">

        {/* ── 1. INTRO & USMAN BIO (LEFT & RIGHT CARDS) ── */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 mb-16">
          <Link
            href="/#web"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors mb-8 cursor-pointer min-h-[48px] py-3"
          >
            <ArrowLeft size={12} />
            <span>Back to Studio</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Card: Web Intro */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 bg-bg-elevated border border-border/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-web/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-web">01 — Web Development</span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink mt-3 leading-tight">
                  Built to work everywhere<br /> it&apos;s opened.
                </h1>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mt-4">
                  We build fast, responsive web applications — from pixel-perfect landing pages to full-stack platforms. Every site ships with Core Web Vitals optimization, SEO metadata, and edge-ready deployments on global CDN networks.
                </p>
              </div>
              <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mt-4 border-l-2 border-accent-web pl-4">
                Our primary stack is <strong className="text-ink font-semibold">Next.js + MERN</strong> — fast to build, fast to load, and easy for clients to scale. We also work with plain HTML/CSS when the project calls for simplicity.
              </p>
            </motion.div>

            {/* Right Card: Web Team Bio */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:col-span-5 bg-bg-elevated border border-border/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-web/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                {/* Stacked avatar group header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                  {/* Overlapping Avatars */}
                  <div className="flex -space-x-3 shrink-0">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-bg-elevated shadow-sm bg-surface relative z-10">
                      <Image
                        src="/images/team/usman.jpeg"
                        alt="Sardar Usman"
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-bg-elevated shadow-sm bg-surface relative z-0">
                      <Image
                        src="/images/team/hashim.jpg"
                        alt="Hashim Khan"
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-ink">Web Engineering Team</h2>
                      <span className="text-[9px] font-mono px-2.5 py-0.5 bg-accent-web-soft border border-accent-web/30 text-accent-web rounded-full uppercase tracking-wider font-semibold">2 Developers</span>
                    </div>
                    <p className="text-[10px] font-mono text-ink-faint mt-0.5">Sardar Usman & Hashim Khan</p>
                  </div>
                </div>

                {/* Individual name badges */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center justify-between bg-surface border border-border/50 rounded-xl px-3 py-2">
                    <div>
                      <span className="text-xs font-bold text-ink block">Sardar Usman</span>
                      <span className="text-[10px] text-ink-muted">MERN & Next.js Developer</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-accent-web-soft border border-accent-web/20 text-accent-web rounded-full">Web Dev</span>
                  </div>
                  <div className="flex items-center justify-between bg-surface border border-border/50 rounded-xl px-3 py-2">
                    <div>
                      <span className="text-xs font-bold text-ink block">Hashim Khan</span>
                      <span className="text-[10px] text-ink-muted">Team Lead & Full-Stack Web</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-accent-web-soft border border-accent-web/20 text-accent-web rounded-full">Lead</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Our web team builds full-stack applications with <strong className="text-ink font-medium">Next.js, MERN stack, and TypeScript</strong>. From pixel-perfect landing pages to complex SaaS platforms — fast, scalable, and production-ready.
                </p>
              </div>

              <div className="border-t border-border/40 pt-4 mt-5">
                <span className="font-mono text-[9px] text-ink-faint uppercase tracking-wider block mb-2">Core Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Next.js', 'React 19', 'Node.js', 'Express', 'MongoDB'].map(t => (
                    <span key={t} className="inline-flex items-center gap-1 text-[9px] font-mono px-2.5 py-0.5 bg-surface border border-border/60 text-ink-muted rounded-full">
                      <span className="w-1 h-1 rounded-full bg-accent-web" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 2. PROJECTS GRID (3 Columns) ── */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
            <div>
              <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-ink">Selected Projects</h2>
              <p className="text-[10px] text-ink-muted mt-0.5">Production builds deployed on global CDN edges</p>
            </div>
            <span className="text-[10px] font-mono text-ink-muted bg-bg-elevated border border-border px-2.5 py-1 rounded">
              {WEB_PROJECTS.length} projects
            </span>
          </div>

          {/* 3-column grid for desktop (lg:grid-cols-3), 2-column for tablet (sm:grid-cols-2), 1-column for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {WEB_PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col justify-between bg-bg-elevated border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-accent-web/40 transition-all duration-300"
              >
                {/* Cover Photo with Browser Frame */}
                <div className="relative aspect-[16/10] flex flex-col border-b border-border bg-surface overflow-hidden">
                  {/* Browser top bar */}
                  <div className="h-6 bg-bg-elevated border-b border-border px-3 flex items-center gap-1.5 shrink-0 select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] inline-block" />
                    <div className="mx-auto max-w-[120px] w-full bg-surface text-ink-faint text-[8px] px-2 py-0.5 rounded text-center border border-border truncate font-mono">
                      {project.domain}
                    </div>
                  </div>
                  
                  {/* Viewport */}
                  <div className="relative flex-grow overflow-hidden bg-bg-elevated">
                    <Image 
                      src={project.image || '/images/projects/generic-project.png'}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Performance Metric Badge */}
                    <div className="absolute top-2 right-2 bg-bg/85 backdrop-blur-md px-2.5 py-0.5 rounded border border-border text-[9px] font-mono text-accent-web font-bold uppercase tracking-wider shadow-sm z-10">
                      {project.metrics}
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-ink group-hover:text-accent-web transition-colors duration-200 truncate">
                        {project.title}
                      </h4>
                      <span className="text-[9px] sm:text-[10px] font-mono text-ink-faint truncate max-w-[110px]">
                        {project.domain}
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/40">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-surface border border-border/60 text-ink-muted rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Full Project Action Button */}
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setCurrentImageIndex(0);
                      }}
                      className="w-full group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-web/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_20px_rgba(79,140,255,0.3)] hover:text-accent-web min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-web/10 to-[#7B5FFF]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-web to-[#7B5FFF] opacity-40 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span>View Full Project</span>
                        <ArrowRight size={12} className="transform group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Many More Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="relative group bg-bg-elevated/40 border border-dashed border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-sm hover:border-accent-web/40 hover:shadow-md transition-all duration-300 min-h-[350px]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent-web/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="my-auto flex flex-col items-center max-w-[280px]">
                <div className="w-12 h-12 rounded-xl bg-accent-web/10 border border-accent-web/20 flex items-center justify-center text-accent-web mb-5">
                  <Code2 size={20} className="animate-pulse" />
                </div>
                <h4 className="text-lg font-bold text-ink mb-2">And Many More...</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Several of our largest enterprise applications, custom web platforms, and e-commerce solutions are protected by strict Non-Disclosure Agreements (NDAs) to safeguard client intellectual property.
                </p>
              </div>
              <div className="w-full mt-6 pt-4 border-t border-border/40 font-mono text-[10px] text-ink-faint uppercase tracking-wider">
                In Active Development & NDA Protected
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 3. BOTTOM CTAs ── */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-center gap-3 pt-8 border-t border-border/30">
          <Link
            href="/#web"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-bg-elevated text-ink-muted font-mono text-xs font-semibold hover:text-ink hover:border-border/80 transition-all duration-200 active:scale-[0.98] min-h-[48px] w-full sm:w-auto text-center"
          >
            <ArrowLeft size={12} />
            Back to Main Page
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-accent-web/40 bg-accent-web-soft text-accent-web font-mono text-xs font-bold hover:bg-accent-web hover:text-white hover:border-accent-web transition-all duration-200 active:scale-[0.98] hover:shadow-[0_0_18px_rgba(79,140,255,0.3)] min-h-[48px] w-full sm:w-auto text-center"
          >
            Contact Us
            <ArrowRight size={12} />
          </Link>
        </div>

      </main>

      {/* ── GALLERY MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setSelectedProject(null); setIsLightboxOpen(false); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-[1000px] bg-bg border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[95vh] md:max-h-[640px] shadow-2xl z-10"
            >
              {/* Left Column: Image Viewer Carousel */}
              <div className="w-full md:w-[55%] bg-bg-elevated border-b md:border-b-0 md:border-r border-border flex flex-col justify-center items-center p-3 md:p-6 gap-3 md:gap-4 overflow-hidden">
                <div className="relative flex flex-col bg-zinc-950 rounded-xl overflow-hidden border border-border/60 w-full aspect-[16/10] shrink-0">
                  {/* Browser top bar */}
                  <div className="h-8 bg-bg-elevated border-b border-border px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56] inline-block" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E] inline-block" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F] inline-block" />
                    </div>
                    <div className="bg-surface text-ink-muted text-[10px] px-4 py-0.5 rounded border border-border select-all font-mono truncate max-w-[200px]">
                      https://{selectedProject.domain}
                    </div>
                    <div className="w-8 shrink-0" />
                  </div>
                  
                  {/* Viewport */}
                  <div 
                    className="relative flex-grow bg-zinc-900/50 flex items-center justify-center cursor-zoom-in group/viewport"
                    onClick={() => setIsLightboxOpen(true)}
                    title="Click to view full image"
                  >
                    <Image
                      src={currentProjectImages[currentImageIndex] || '/images/projects/generic-project.png'}
                      alt={`${selectedProject.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover object-top transition-all duration-300 group-hover/viewport:scale-[1.01]"
                    />

                    {/* Nav Arrow Left */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                      className="absolute left-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors z-10"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Nav Arrow Right */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                      className="absolute right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors z-10"
                    >
                      <ChevronRight size={16} />
                    </button>

                    {/* Zoom indicator icon */}
                    <div className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm p-1.5 rounded-lg border border-white/10 text-white/70 group-hover/viewport:text-white transition-colors z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                    </div>

                    {/* Indicator Index */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white select-none z-10">
                      {currentImageIndex + 1} / {currentProjectImages.length}
                    </div>
                  </div>
                </div>
                
                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-thin select-none">
                  {currentProjectImages.map((img, idx) => {
                    const isSelected = currentImageIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={clsx(
                          "relative w-14 h-10 rounded border overflow-hidden shrink-0 transition-all cursor-pointer",
                          isSelected ? "border-accent-web scale-102 shadow-sm" : "border-border opacity-60 hover:opacity-100"
                        )}
                      >
                        <Image 
                          src={img || '/images/projects/generic-project.png'} 
                          alt="thumbnail" 
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Details & GitHub Link */}
              <div className="w-full md:w-[45%] p-6 flex flex-col justify-between overflow-y-auto select-text">
                <div className="space-y-6">
                  {/* Title & Close */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] text-accent-web font-bold uppercase tracking-wider block">
                        {selectedProject.domain}
                      </span>
                      <h3 className="text-xl font-bold text-ink mt-0.5">{selectedProject.title}</h3>
                    </div>
                    <button
                      onClick={() => { setSelectedProject(null); setIsLightboxOpen(false); }}
                      className="p-1 rounded-lg border border-border bg-bg-elevated hover:bg-surface text-ink-muted hover:text-ink cursor-pointer transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint block">Project Brief</span>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Tech Specs */}
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint block">Technology Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-2.5 py-0.5 bg-bg-elevated border border-border text-ink-muted rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-bg-elevated border border-border rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-ink-faint block">Key Benchmark</span>
                      <span className="text-xs font-mono font-bold text-accent-web">{selectedProject.metrics}</span>
                    </div>
                    <Flame size={18} className="text-accent-web animate-pulse" />
                  </div>

                  {/* Developer Badge */}
                  <div className="flex items-center gap-3 bg-accent-web-soft/40 border border-accent-web/10 rounded-xl p-3 select-none">
                    <div className="w-8 h-8 rounded-full bg-accent-web-soft flex items-center justify-center text-accent-web font-bold font-mono text-sm relative overflow-hidden shrink-0">
                      <Image 
                        src="/images/team/usman.jpeg" 
                        alt="Usman" 
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-accent-web font-bold uppercase tracking-wider block">Lead Developer</span>
                      <span className="text-xs font-bold text-ink">Usman</span>
                    </div>
                  </div>
                </div>

                {/* External Actions Redirect */}
                <div className="mt-8 pt-4 border-t border-border flex flex-col gap-2 select-none">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-web/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(79,140,255,0.3)] hover:text-accent-web min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-web/10 to-[#7B5FFF]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-web to-[#7B5FFF] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Launch Live Website</span>
                        <ExternalLink size={12} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-border bg-bg-elevated hover:bg-surface text-ink-muted hover:text-ink font-mono text-xs font-bold transition-all duration-300 cursor-pointer min-h-[48px]"
                    >
                      <GithubIcon size={14} />
                      <span>View GitHub Codebase</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedProject && isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer transition-all shadow-lg"
              aria-label="Close full view"
            >
              <X size={20} />
            </button>

            {/* Lightbox Content Container */}
            <div 
              className="relative w-full h-full max-w-[90vw] max-h-[85vh] flex items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentProjectImages[currentImageIndex] || '/images/projects/generic-project.png'}
                alt="Fullscreen view"
                className="max-w-full max-h-full object-contain rounded-lg select-none shadow-2xl"
              />
            </div>

            {/* Fullscreen Navigation (only if multiple images) */}
            {currentProjectImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer transition-all shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Fullscreen Page Indicator */}
            {currentProjectImages.length > 1 && (
              <div className="absolute bottom-6 bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-mono text-zinc-400 select-none">
                {currentImageIndex + 1} / {currentProjectImages.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
