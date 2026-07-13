'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SectionEyebrow } from '../shared/SectionEyebrow';
import { DeviceFrame } from '../shared/DeviceFrame';
import { WEB_PROJECTS, WebProject } from '@/data/projects';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import { 
  Monitor, 
  Phone, 
  ArrowRight, 
  ExternalLink, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  ArrowLeft,
  Cpu
} from 'lucide-react';

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

export function WebSection() {
  const [showProjects, setShowProjects] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Project Details Modal State
  const [activeProject, setActiveProject] = useState<WebProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Helper to compile gallery images (Main image + 5 Gallery images)
  const getProjectImages = (project: WebProject) => {
    const images = [project.image || '/images/projects/generic-project.png'];
    if (project.gallery) {
      images.push(...project.gallery);
    }
    return images;
  };

  const currentProjectImages = activeProject ? getProjectImages(activeProject) : [];

  const handleNextImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev + 1) % currentProjectImages.length);
  };

  const handlePrevImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev - 1 + currentProjectImages.length) % currentProjectImages.length);
  };

  return (
    <section 
      id="web" 
      className="py-10 md:py-16 lg:py-28 border-b border-border/50 relative scroll-mt-12 bg-bg select-none transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-accent-web/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        
        {/* Dynamic Display Area (Switching between Usman Pitch/Simulator and Projects Grid) */}
        <AnimatePresence mode="wait">
          {!showProjects ? (
            <motion.div
              key="intro-screen"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Extremely clean, minimal text, visible CTA button below it */}
              <div className="lg:col-span-5 flex flex-col items-start justify-center pr-4">
                <SectionEyebrow number="01" label="Web Development" accent="web" className="mb-6" />
                
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-ink leading-tight mb-4">
                  Engineering premium web experiences.
                </h3>
                
                <p className="text-ink-muted text-sm leading-relaxed mb-8 max-w-sm">
                  We design and develop production-grade web applications utilizing Next.js, MERN stack, and modern styling architectures.
                </p>

                {/* Primary Action to view projects (Placed here under text, slightly larger size) */}
                <Link
                  href="/web-development"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:border-accent-web/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(79,140,255,0.3)] hover:text-accent-web w-full sm:w-auto text-center min-h-[48px]"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-web/10 to-[#7B5FFF]/10" />
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-web to-[#7B5FFF] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
                  
                  <span className="relative z-10 flex items-center gap-2.5 text-xs">
                    <span>See Web Projects</span>
                    <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>

              {/* Right Column: Simulated Live Site inside DeviceFrame with Usman info inside screen */}
              <div className="lg:col-span-7 flex flex-col items-center w-full">
                {/* Viewmode Toggle */}
                <div className="flex items-center gap-1.5 bg-bg-elevated border border-border p-1 rounded-full mb-6">
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={clsx(
                      "flex items-center justify-center gap-1.5 px-5 py-2.5 md:px-4 md:py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer min-h-[48px] md:min-h-0",
                      viewMode === 'desktop'
                        ? "bg-accent-web text-white font-bold"
                        : "text-ink-muted hover:text-ink"
                    )}
                  >
                    <Monitor size={12} />
                    <span>Desktop</span>
                  </button>
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={clsx(
                      "flex items-center justify-center gap-1.5 px-5 py-2.5 md:px-4 md:py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer min-h-[48px] md:min-h-0",
                      viewMode === 'mobile'
                        ? "bg-accent-web text-white font-bold"
                        : "text-ink-muted hover:text-ink"
                    )}
                  >
                    <Phone size={12} />
                    <span>Mobile</span>
                  </button>
                </div>

                {/* Simulated Web Application Screen - displaying Web Team */}
                <div className="w-full max-w-lg flex justify-center">
                  <DeviceFrame mode={viewMode} domain="zynox.com/web-team" size="sm">
                    <div className="p-5 h-full flex flex-col justify-between font-sans text-left overflow-y-auto bg-bg select-text selection:bg-accent-web-soft selection:text-accent-web">
                      {/* Simulated Website Navbar */}
                      <div className="flex justify-between items-center border-b border-border/60 pb-2 mb-3 select-none">
                        <span className="font-mono text-[10px] font-bold text-ink tracking-widest flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          WEB TEAM
                        </span>
                        <div className="flex gap-2.5 font-mono text-[8px] text-ink-muted">
                          <span>Active Node</span>
                        </div>
                      </div>

                      {/* Dual developer team cards */}
                      <div className="space-y-3.5 py-1 flex-grow flex flex-col justify-center">
                        {/* Sardar Usman */}
                        <div className="bg-bg-elevated border border-border/60 rounded-xl p-2.5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full border border-accent-web/30 flex items-center justify-center text-accent-web text-xs font-bold relative overflow-hidden shrink-0">
                            <Image 
                              src="/images/team/usman.jpeg" 
                              alt="Sardar Usman" 
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-[10px] font-bold tracking-tight text-ink leading-tight">Sardar Usman</h4>
                            <p className="text-[8px] text-ink-muted">MERN & Next.js Developer</p>
                          </div>
                          <span className="text-[7px] font-mono text-accent-web px-1.5 py-0.5 rounded bg-accent-web-soft border border-accent-web/20 shrink-0">
                            WEB DEV
                          </span>
                        </div>

                        {/* Hashim Khan */}
                        <div className="bg-bg-elevated border border-border/60 rounded-xl p-2.5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full border border-accent-web/30 flex items-center justify-center text-accent-web text-xs font-bold relative overflow-hidden shrink-0">
                            <Image 
                              src="/images/team/hashim.jpg" 
                              alt="Hashim Khan" 
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-[10px] font-bold tracking-tight text-ink leading-tight">Hashim Khan</h4>
                            <p className="text-[8px] text-ink-muted">Team Lead & Full-Stack Web</p>
                          </div>
                          <span className="text-[7px] font-mono text-accent-web px-1.5 py-0.5 rounded bg-accent-web-soft border border-accent-web/20 shrink-0">
                            LEAD
                          </span>
                        </div>

                        {/* Visual Metrics Panel */}
                        <div className={clsx(
                          "grid gap-3.5 my-1",
                          viewMode === 'mobile' ? "grid-cols-1" : "grid-cols-2"
                        )}>
                          {/* Radial Progress Graphic */}
                          <div className="bg-bg-elevated border border-border p-2.5 rounded-lg flex items-center gap-3">
                            <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="18" cy="18" r="15" stroke="var(--border)" strokeWidth="3" fill="transparent" />
                                <motion.circle 
                                  cx="18" 
                                  cy="18" 
                                  r="15" 
                                  stroke="var(--accent-web)" 
                                  strokeWidth="3" 
                                  fill="transparent" 
                                  strokeDasharray={94.2}
                                  initial={{ strokeDashoffset: 94.2 }}
                                  animate={{ strokeDashoffset: 0 }}
                                  transition={{ duration: 1.2, ease: "easeOut" }}
                                />
                              </svg>
                              <span className="absolute font-mono text-[9px] font-bold text-ink">100</span>
                            </div>
                            <div>
                              <span className="block font-mono text-[8px] text-ink-faint uppercase leading-none">Speed</span>
                              <span className="text-[10px] font-bold text-ink">Lighthouse</span>
                            </div>
                          </div>

                          {/* Equalizer Telemetry Graphic */}
                          <div className="bg-bg-elevated border border-border p-2.5 rounded-lg flex flex-col justify-between h-[46px]">
                            <div className="flex items-end justify-between w-full h-3 gap-0.5">
                              {[35, 65, 45, 80, 50, 95, 60, 75].map((h, i) => (
                                <motion.div
                                  key={i}
                                  className="bg-accent-web w-full rounded-t-sm"
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
                              <span className="font-mono text-[7px] text-ink-faint uppercase">Load Time</span>
                              <span className="font-mono text-[9px] font-bold text-accent-web">0.4s</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive pills stack */}
                        <div className="flex flex-wrap gap-1 pt-1.5 select-none">
                          {(viewMode === 'mobile' ? ['React 19', 'Next.js', 'MERN Stack'] : ['React 19', 'Next.js', 'MERN Stack', 'TypeScript', 'Node.js']).map(tech => (
                            <span key={tech} className="text-[8px] font-mono px-2 py-0.5 bg-surface border border-border text-ink-muted rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Simulated Footer */}
                      <div className="border-t border-border/50 pt-2.5 mt-3 flex justify-between items-center text-[8px] text-ink-faint font-mono select-none">
                        <span>Terminal Online</span>
                        <span>Engine v19</span>
                      </div>
                    </div>
                  </DeviceFrame>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="projects-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-10 animate-fade-in"
            >
              {/* Back Navigation Bar */}
              <div className="flex justify-between items-center border-b border-border/50 pb-6">
                <button
                  onClick={() => setShowProjects(false)}
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors cursor-pointer"
                >
                  <ArrowLeft size={12} className="transform group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Profile</span>
                </button>

                <span className="text-xs text-ink-muted font-mono bg-bg-elevated border border-border px-3 py-1 rounded">
                  Showing {WEB_PROJECTS.length} Projects
                </span>
              </div>

              {/* Grid of Web Projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {WEB_PROJECTS.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -6 }}
                    className="group flex flex-col justify-between h-full bg-bg-elevated border border-border/80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:border-accent-web/40 transition-all duration-300"
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

                    {/* Meta Info */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-base font-bold text-ink group-hover:text-accent-web transition-colors">
                            {project.title}
                          </h4>
                          <span className="text-[10px] font-mono text-ink-faint truncate max-w-[120px]">
                            {project.domain}
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/50">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[9px] font-mono px-2 py-0.5 bg-surface border border-border text-ink-muted rounded">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-[9px] font-mono px-2 py-0.5 bg-surface border border-border text-ink-faint rounded">
                              +{project.tags.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* View Action */}
                        <button
                          onClick={() => {
                            setActiveProject(project);
                            setActiveImageIndex(0);
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* FULL PROJECT GALLERY MODAL DRAWER */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-4xl bg-bg border border-border rounded-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[640px] shadow-2xl z-10"
            >
              
              {/* Left Column: Image Viewer Carousel */}
              <div className="w-full md:w-[55%] bg-bg-elevated border-b md:border-b-0 md:border-r border-border flex flex-col justify-between p-4 overflow-hidden">
                <div className="relative flex-grow flex flex-col bg-zinc-950 rounded-xl overflow-hidden border border-border/60 aspect-video md:aspect-auto md:h-[420px]">
                  {/* Browser top bar */}
                  <div className="h-8 bg-bg-elevated border-b border-border px-4 flex items-center justify-between shrink-0 select-none">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56] inline-block" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E] inline-block" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F] inline-block" />
                    </div>
                    <div className="bg-surface text-ink-muted text-[10px] px-4 py-0.5 rounded border border-border select-all font-mono truncate max-w-[200px]">
                      https://{activeProject.domain}
                    </div>
                    <div className="w-8 shrink-0" />
                  </div>
                  
                  {/* Viewport */}
                  <div className="relative flex-grow bg-zinc-900/50 flex items-center justify-center">
                    <Image
                      src={currentProjectImages[activeImageIndex] || '/images/projects/generic-project.png'}
                      alt={`${activeProject.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-contain object-top transition-all duration-300"
                    />

                    {/* Nav Arrow Left */}
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors z-10"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Nav Arrow Right */}
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors z-10"
                    >
                      <ChevronRight size={16} />
                    </button>

                    {/* Indicator Index */}
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-white select-none z-10">
                      {activeImageIndex + 1} / {currentProjectImages.length}
                    </div>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-thin select-none">
                  {currentProjectImages.map((img, index) => {
                    const isSelected = activeImageIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
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

              {/* Right Column: Project Details Info & Links */}
              <div className="w-full md:w-[45%] p-6 flex flex-col justify-between overflow-y-auto select-text">
                <div className="space-y-6">
                  {/* Title & Close */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-[10px] text-accent-web font-bold uppercase tracking-wider block">
                        {activeProject.domain}
                      </span>
                      <h3 className="text-xl font-bold text-ink mt-0.5">{activeProject.title}</h3>
                    </div>
                    <button
                      onClick={() => setActiveProject(null)}
                      className="p-1 rounded-lg border border-border bg-bg-elevated hover:bg-surface text-ink-muted hover:text-ink cursor-pointer transition-colors shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint block">Project Brief</span>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Tech Specs info */}
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faint block">Technology Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-2.5 py-0.5 bg-bg-elevated border border-border text-ink-muted rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics details */}
                  <div className="bg-bg-elevated border border-border rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-ink-faint block">Key Benchmark</span>
                      <span className="text-xs font-mono font-bold text-accent-web">{activeProject.metrics}</span>
                    </div>
                    <Flame size={18} className="text-accent-web animate-pulse" />
                  </div>

                  {/* Author / Usman validation badge */}
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
                      <span className="text-[9px] font-mono text-accent-web font-bold uppercase tracking-wider block">Developer in Charge</span>
                      <span className="text-xs font-bold text-ink">Usman</span>
                    </div>
                  </div>
                </div>

                {/* External Actions Redirect */}
                <div className="mt-8 pt-4 border-t border-border flex flex-col gap-2 select-none">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs font-bold transition-all duration-300 hover:border-accent-web/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(79,140,255,0.3)] hover:text-accent-web"
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-web/10 to-[#7B5FFF]/10" />
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-accent-web to-[#7B5FFF] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />
                      
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Launch Live Website</span>
                        <ExternalLink size={12} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  )}

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-border bg-bg-elevated hover:bg-surface text-ink-muted hover:text-ink font-mono text-xs font-bold transition-all duration-300 cursor-pointer"
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
    </section>
  );
}
