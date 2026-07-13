'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/nav/Navbar';
import { MOBILE_PROJECTS, MobileProject } from '@/data/projects';
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

function AppleIcon({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function PlayStoreIcon({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.18 23.76c.3.17.64.24.99.2l13.23-11.47L13.83 9 3.18 23.76zM.94 1.15C.36 1.67 0 2.49 0 3.54v16.92c0 1.05.36 1.87.94 2.39l.13.11 9.47-9.47v-.23L1.07 1.04.94 1.15zM20.23 9.75l-2.83-1.64-3.2 3.2 3.2 3.2 2.84-1.65c.81-.47.81-1.24-.01-1.71zM4.17.24l13.23 11.47-3.57 3.57L.99.04A1.22 1.22 0 014.17.24z"/>
    </svg>
  );
}

function TestFlightIcon({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
  );
}

export default function MobileDevPage() {
  const [selectedProject, setSelectedProject] = useState<MobileProject | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Compile project images (with fallbacks if gallery is not defined)
  const getProjectImages = (project: MobileProject) => {
    const mainImg = project.image || '/images/projects/generic-mobile.png';
    const screens = project.screens && project.screens.length > 0
      ? project.screens
      : [];
    
    return screens.length > 0 ? screens : [mainImg];
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
    <div className="bg-bg text-ink min-h-screen font-sans flex flex-col selection:bg-accent-mobile-soft selection:text-accent-mobile transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-12 md:pt-28 md:pb-20">

        {/* ── 1. INTRO & SHAHEER BIO (LEFT & RIGHT CARDS) ── */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 mb-16">
          <Link
            href="/#mobile"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors mb-8 cursor-pointer min-h-[48px] py-3"
          >
            <ArrowLeft size={12} />
            <span>Back to Studio</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Card: Mobile Intro */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 bg-bg-elevated border border-border/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-mobile/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-mobile">02 — Mobile Development</span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink mt-3 leading-tight">
                  Apps people actually open twice.
                </h1>
                <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mt-4">
                  Beautiful layouts, fluid navigation, and native mechanics built to respond instantly to the user&apos;s touch. We design interfaces that scale flawlessly.
                </p>
              </div>
              <p className="text-ink-muted text-xs sm:text-sm leading-relaxed mt-4 border-l-2 border-accent-mobile pl-4">
                We build primarily in <strong className="text-ink font-semibold">Flutter and React Native</strong>, letting one optimized codebase drive both iOS and Android app stores with native performance and lower development complexity.
              </p>
            </motion.div>

            {/* Right Card: Mobile Team Bio */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="lg:col-span-5 bg-bg-elevated border border-border/60 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-mobile/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                {/* Stacked avatar group header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                  {/* Overlapping Avatars */}
                  <div className="flex -space-x-3 shrink-0">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-bg-elevated shadow-sm bg-surface relative z-10">
                      <Image
                        src="/images/team/shaheer.jpeg"
                        alt="Shaheer Ahmed"
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-bg-elevated shadow-sm bg-surface relative z-0">
                      <Image
                        src="/images/team/ubaid.jpeg"
                        alt="Ubaidullah"
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg font-bold text-ink">Mobile Engineering Team</h2>
                      <span className="text-[9px] font-mono px-2.5 py-0.5 bg-accent-mobile-soft border border-accent-mobile/30 text-accent-mobile rounded-full uppercase tracking-wider font-semibold">2 Developers</span>
                    </div>
                    <p className="text-[10px] font-mono text-ink-faint mt-0.5">Shaheer Ahmed & Ubaidullah</p>
                  </div>
                </div>

                {/* Individual name badges */}
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center justify-between bg-surface border border-border/50 rounded-xl px-3 py-2">
                    <div>
                      <span className="text-xs font-bold text-ink block">Shaheer Ahmed</span>
                      <span className="text-[10px] text-ink-muted">Flutter & React Native Developer</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-accent-mobile-soft border border-accent-mobile/20 text-accent-mobile rounded-full">Mobile Dev</span>
                  </div>
                  <div className="flex items-center justify-between bg-surface border border-border/50 rounded-xl px-3 py-2">
                    <div>
                      <span className="text-xs font-bold text-ink block">Ubaidullah</span>
                      <span className="text-[10px] text-ink-muted">Flutter & Firebase Developer</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-accent-mobile-soft border border-accent-mobile/20 text-accent-mobile rounded-full">Mobile Dev</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Our mobile team builds cross-platform apps using <strong className="text-ink font-medium">Flutter, Dart, and Firebase</strong>. From reactive state loops to real-time data syncs — fast, native-quality apps for both iOS and Android.
                </p>
              </div>

              <div className="border-t border-border/40 pt-4 mt-5">
                <span className="font-mono text-[9px] text-ink-faint uppercase tracking-wider block mb-2">Core Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Flutter', 'Dart', 'Firebase', 'React Native', 'SQLite'].map(t => (
                    <span key={t} className="inline-flex items-center gap-1 text-[9px] font-mono px-2.5 py-0.5 bg-surface border border-border/60 text-ink-muted rounded-full">
                      <span className="w-1 h-1 rounded-full bg-accent-mobile" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 2. PROJECTS GRID ── */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/40">
            <div>
              <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-ink">Selected Projects</h2>
              <p className="text-[10px] text-ink-muted mt-0.5">Production builds deployed on global CDN edges</p>
            </div>
            <span className="text-[10px] font-mono text-ink-muted bg-bg-elevated border border-border px-2.5 py-1 rounded">
              {MOBILE_PROJECTS.length} projects
            </span>
          </div>

          {/* 3-column grid for desktop (lg:grid-cols-3), 2-column for mobile/tablet (grid-cols-2) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {MOBILE_PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col justify-between bg-bg-elevated border border-border/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-accent-mobile/40 transition-all duration-300"
              >
                {/* Image block */}
                <div className="relative aspect-[16/10] overflow-hidden bg-surface border-b border-border/50">
                  <Image 
                    src={project.image || '/images/projects/generic-mobile.png'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Metric badge */}
                  <div className="absolute top-3 right-3 bg-bg/85 backdrop-blur-md px-2 py-0.5 rounded border border-border text-[9px] font-mono text-accent-mobile font-bold uppercase tracking-wider shadow-sm">
                    {project.metrics}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-ink group-hover:text-accent-mobile transition-colors duration-200 truncate">
                        {project.title}
                      </h4>
                      <span className="text-[10px] font-mono text-ink-faint truncate max-w-[110px]">
                        mobile app
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
                      className="w-full group/btn relative overflow-hidden inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-mobile/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:text-accent-mobile min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-mobile/10 to-[#00F2FE]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-mobile to-[#00F2FE] opacity-40 group-hover/btn:opacity-100 transition-opacity duration-300" />
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
              className="relative group bg-bg-elevated/40 border border-dashed border-border/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center shadow-sm hover:border-accent-mobile/40 hover:shadow-md transition-all duration-300 min-h-[350px]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-accent-mobile/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="my-auto flex flex-col items-center max-w-[280px]">
                <div className="w-12 h-12 rounded-xl bg-accent-mobile/10 border border-accent-mobile/20 flex items-center justify-center text-accent-mobile mb-5">
                  <Code2 size={20} className="animate-pulse" />
                </div>
                <h4 className="text-lg font-bold text-ink mb-2">And Many More...</h4>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Several custom iOS/Android apps, private enterprise distribution builds, and localized client utility platforms are protected under strict Non-Disclosure Agreements (NDAs).
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
            href="/#mobile"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-bg-elevated text-ink-muted font-mono text-xs font-semibold hover:text-ink hover:border-border/80 transition-all duration-200 active:scale-[0.98] min-h-[48px] w-full sm:w-auto text-center"
          >
            <ArrowLeft size={12} />
            Back to Main Page
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-accent-mobile/40 bg-accent-mobile-soft text-accent-mobile font-mono text-xs font-bold hover:bg-accent-mobile hover:text-white hover:border-accent-mobile transition-all duration-200 active:scale-[0.98] hover:shadow-[0_0_18px_rgba(52,211,153,0.3)] min-h-[48px] w-full sm:w-auto text-center"
          >
            Contact Us
            <ArrowRight size={12} />
          </Link>
        </div>

      </main>

      {/* ── GALLERY MODAL ── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-4xl bg-bg border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[640px] shadow-2xl z-10"
            >
              {/* Left Column: Image Viewer Carousel */}
              <div className="w-full md:w-[55%] bg-bg-elevated border-b md:border-b-0 md:border-r border-border flex flex-col justify-between p-4 overflow-hidden">
                <div className="relative flex-grow flex items-center justify-center bg-surface rounded-xl overflow-hidden aspect-video md:aspect-auto md:h-[420px]">
                  <Image
                    src={currentProjectImages[currentImageIndex] || '/images/projects/generic-mobile.png'}
                    alt={`${selectedProject.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain transition-all duration-300"
                  />

                  {/* Nav Arrow Left */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Nav Arrow Right */}
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>

                  {/* Indicator Index */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white select-none">
                    {currentImageIndex + 1} / {currentProjectImages.length}
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
                          isSelected ? "border-accent-mobile scale-102 shadow-sm" : "border-border opacity-60 hover:opacity-100"
                        )}
                      >
                        <Image 
                          src={img || '/images/projects/generic-mobile.png'} 
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
                      <span className="font-mono text-[10px] text-accent-mobile font-bold uppercase tracking-wider block">
                        mobile app
                      </span>
                      <h3 className="text-xl font-bold text-ink mt-0.5">{selectedProject.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
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
                      <span className="text-xs font-mono font-bold text-accent-mobile">{selectedProject.metrics}</span>
                    </div>
                    <Flame size={18} className="text-accent-mobile animate-pulse" />
                  </div>

                  {/* Developer Badge */}
                  <div className="flex items-center gap-3 bg-accent-mobile-soft/40 border border-accent-mobile/10 rounded-xl p-3 select-none">
                    <div className="w-8 h-8 rounded-full bg-accent-mobile-soft flex items-center justify-center text-accent-mobile font-bold font-mono text-sm relative overflow-hidden shrink-0">
                      <Image 
                        src="/images/team/shaheer.jpeg" 
                        alt="Shaheer" 
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-accent-mobile font-bold uppercase tracking-wider block">Lead Developer</span>
                      <span className="text-xs font-bold text-ink">Shaheer</span>
                    </div>
                  </div>
                </div>

                {/* External Actions Redirect */}
                <div className="mt-6 pt-4 border-t border-border flex flex-col gap-2 select-none">

                  {/* App Store */}
                  {selectedProject.appStoreUrl && (
                    <a
                      href={selectedProject.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-mobile/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:text-accent-mobile min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-mobile/10 to-[#00F2FE]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-mobile to-[#00F2FE] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <AppleIcon size={14} />
                        <span>Download on App Store</span>
                        <ExternalLink size={11} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}

                  {/* Play Store */}
                  {selectedProject.playStoreUrl && (
                    <a
                      href={selectedProject.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-mobile/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:text-accent-mobile min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-mobile/10 to-[#00F2FE]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-mobile to-[#00F2FE] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <PlayStoreIcon size={14} />
                        <span>Get it on Play Store</span>
                        <ExternalLink size={11} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}

                  {/* TestFlight */}
                  {selectedProject.testFlightUrl && (
                    <a
                      href={selectedProject.testFlightUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-mobile/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:text-accent-mobile min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-mobile/10 to-[#00F2FE]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-mobile to-[#00F2FE] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <AppleIcon size={14} />
                        <span>Join Beta on TestFlight</span>
                        <ExternalLink size={11} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}

                  {/* Web URL */}
                  {selectedProject.webUrl && (
                    <a
                      href={selectedProject.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-mobile/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:text-accent-mobile min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-mobile/10 to-[#00F2FE]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-mobile to-[#00F2FE] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <Globe size={13} />
                        <span>Visit Website</span>
                        <ExternalLink size={11} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}

                  {/* Fallback liveUrl */}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-mobile/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(52,211,153,0.3)] hover:text-accent-mobile min-h-[48px]"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-mobile/10 to-[#00F2FE]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-mobile to-[#00F2FE] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Launch App Demo</span>
                        <ExternalLink size={12} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}

                  {/* GitHub */}
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
      </AnimatePresence>
    </div>
  );
}
