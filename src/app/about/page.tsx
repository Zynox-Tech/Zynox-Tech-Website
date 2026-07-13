'use client';

import Image from 'next/image';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ArrowLeft, User, Sparkles, Server, Terminal, Shield, Workflow } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TEAM = [
  {
    id: 'hashim',
    name: 'Hashim Khan',
    role: 'Team Lead & Web Developer',
    description: 'Leads the team. Figma UI/UX layouts, backend system architecture scoping, and Next.js web development.',
    accent: '#4F8CFF',
    initials: 'HK',
    image: '/images/team/hashim.jpg',
    stack: ['Figma', 'Next.js', 'System Architecture', 'UI/UX Design', 'TypeScript'],
    philosophy: 'Design is not just what it looks like; design is how it works.',
    icon: Terminal
  },
  {
    id: 'raza',
    name: 'Umer Raza',
    role: 'Systems Engineer',
    description: 'Custom backend architecture, automation scripts, and database logic.',
    accent: '#34D399',
    initials: 'UR',
    image: '/images/team/raza.jpeg',
    stack: ['Python', 'Django', 'PostgreSQL', 'FastAPI', 'Docker'],
    philosophy: 'Make the logic clean, testable, and robust against edge cases.',
    icon: Sparkles
  },
  {
    id: 'usman',
    name: 'Sardar Usman',
    role: 'Web Developer',
    description: 'Full-stack web engineering, Next.js, MERN stack, and edge CDN deployments.',
    accent: '#F5A623',
    initials: 'SU',
    image: '/images/team/usman.jpeg',
    stack: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB'],
    philosophy: 'Great web interfaces should load instantly and respond to input without lag.',
    icon: Workflow
  },
  {
    id: 'shaheer',
    name: 'Shaheer Ahmed',
    role: 'Mobile Developer',
    description: 'Native cross-platform mobile apps for iOS and Android using Flutter and React Native.',
    accent: '#FF6B6B',
    initials: 'SA',
    image: '/images/team/shaheer.jpeg',
    stack: ['Flutter', 'Dart', 'React Native', 'iOS/Android SDKs', 'Firebase'],
    philosophy: 'Mobile apps should respond instantly to user touch and handle offline states.',
    icon: Shield
  },
  {
    id: 'ubaid',
    name: 'Ubaidullah',
    role: 'Mobile Developer',
    description: 'High-performance mobile applications for iOS and Android across React Native and Flutter.',
    accent: '#C961F2',
    initials: 'Ub',
    image: '/images/team/ubaid.jpeg',
    stack: ['Flutter', 'React Native', 'Dart', 'Firebase', 'REST APIs'],
    philosophy: 'Performance is a feature — every millisecond matters on mobile.',
    icon: Server
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
} as const;

export default function AboutPage() {
  return (
    <div className="bg-bg text-ink min-h-screen font-sans flex flex-col justify-between selection:bg-accent-web-soft selection:text-[#FF6B6B] pb-12 transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 md:pt-28">

        {/* Breadcrumb / Title */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors mb-6 cursor-pointer min-h-[48px] py-3"
          >
            <ArrowLeft size={12} />
            <span>Back to Studio</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6B6B]">05 - About the Studio</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-ink mt-2 leading-[1.1]">
              Five people who studied this, <br className="hidden sm:inline" />then decided to build it.
            </h1>
          </motion.div>
        </div>

        {/* Narrative / Metrics Section */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-6 text-base md:text-lg text-ink-muted leading-relaxed"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-ink">
              We are an independent software studio.
            </h2>
            <p>
              Zynox was founded by five software engineering graduates in Abbottabad, Pakistan. We design, build, and ship high-performance products directly to our clients.
            </p>
            <p>
              No account managers or complex agency overhead—just direct collaboration with the engineers writing your code.
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <div className="p-5 bg-bg-elevated border border-border rounded-xl">
              <span className="text-2xl md:text-3xl font-bold text-ink block">5</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">Engineers</span>
            </div>
            <div className="p-5 bg-bg-elevated border border-border rounded-xl">
              <span className="text-2xl md:text-3xl font-bold text-ink block">100%</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">In-House</span>
            </div>
            <div className="p-5 bg-bg-elevated border border-border rounded-xl">
              <span className="text-2xl md:text-3xl font-bold text-ink block">Direct</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">Communication</span>
            </div>
            <div className="p-5 bg-bg-elevated border border-border rounded-xl">
              <span className="text-2xl md:text-3xl font-bold text-ink block">Abbottabad</span>
              <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">Location</span>
            </div>
          </motion.div>
        </div>

        {/* Company Story Section */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 mb-24 py-16 border-t border-b border-border/40 bg-bg-elevated/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Inspiring Subtitle */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-[#FF6B6B]">Our Journey</span>
              <h2 className="text-3xl font-bold tracking-tight text-ink mt-2 leading-[1.2]">
                From a shared computer lab to client-driven software.
              </h2>
            </motion.div>

            {/* Right Column: The Inspiring Story */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-8 text-ink-muted text-sm md:text-base leading-relaxed space-y-6"
            >
              <p>
                We started in a shared university computer lab in Abbottabad, working on side projects late into the night. We saw how businesses struggled with buggy off-the-shelf templates, while traditional agencies charged fortunes for simple platforms. We wanted to build something different.
              </p>
              <p>
                What began as five classmates solving school projects has evolved into a unified team engineering custom web frameworks, cross-platform mobile apps, and automated data pipelines.
              </p>
              <p className="font-mono text-xs text-[#FF6B6B] italic font-semibold">
                No middle management. No telephone game. Just raw, reliable, high-performance code shipped directly to you.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Team Grid Area */}
        <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12 mb-28">
          <div className="border-b border-border/40 pb-6 mb-12">
            <h2 className="text-xl font-bold tracking-tight text-ink font-mono uppercase">
              Meet the Builders
            </h2>
            <p className="text-xs text-ink-muted mt-1">
              The core engineering team behind every build we ship.
            </p>
          </div>

          <div className="flex flex-col gap-6 items-center">
            {/* First Row: 3 Builders */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 w-full"
            >
              {TEAM.slice(0, 3).map((member) => {
                const IconComponent = member.icon;
                return (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    className="w-full sm:w-[270px] max-w-[270px] bg-bg-elevated border border-border hover:border-border/80 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.15)] group relative overflow-hidden h-[400px] shrink-0"
                  >
                    {/* Subtle top glow overlay matching member accent */}
                    <div 
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: `${member.accent}15` }}
                    />

                    <div>
                      {/* Image Area */}
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-3.5 bg-surface border border-border group-hover:border-border-hover transition-colors duration-300">
                        <Image 
                          src={member.image || '/images/team/placeholder.jpg'} 
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 270px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          style={{ backgroundColor: member.accent }}
                        />
                      </div>

                      {/* Role & Icon Header */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold" style={{ color: member.accent }}>
                          {member.role}
                        </span>
                        <IconComponent size={12} style={{ color: member.accent }} />
                      </div>

                      {/* Name */}
                      <h3 className="text-base font-bold text-ink mb-2 group-hover:text-ink transition-colors duration-200">
                        {member.name}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] text-ink-muted leading-relaxed mb-3 min-h-[50px]">
                        {member.description}
                      </p>

                      {/* Philosophy */}
                      <p className="text-[10px] font-mono italic text-ink-muted/80 border-l border-border pl-2 mb-4 leading-normal">
                        &ldquo;{member.philosophy}&rdquo;
                      </p>
                    </div>

                    <div>
                      {/* Stack / Skills Badges */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {member.stack.slice(0, 4).map((tag) => (
                          <span 
                            key={tag} 
                            className="text-[8px] font-mono px-1.5 py-0.5 bg-surface border border-border text-ink-muted rounded-md transition-colors duration-200 group-hover:border-border/80 group-hover:text-ink"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Direct Consult Button */}
                      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-1.5 h-1.5 rounded-full animate-pulse" 
                            style={{ backgroundColor: member.accent, boxShadow: `0 0 6px ${member.accent}` }}
                          />
                          <span className="text-[9px] font-mono text-ink-faint uppercase">Direct Consult</span>
                        </div>
                        <Link
                          href="/#contact"
                          className="text-[10px] font-mono uppercase text-ink-muted hover:text-ink flex items-center gap-1 group/btn hover:underline underline-offset-4"
                        >
                          <span>Work Together</span>
                          <ArrowLeft size={8} className="transform rotate-180 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Second Row: 2 Builders */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 w-full"
            >
              {TEAM.slice(3, 5).map((member) => {
                const IconComponent = member.icon;
                return (
                  <motion.div
                    key={member.id}
                    variants={itemVariants}
                    className="w-full sm:w-[270px] max-w-[270px] bg-bg-elevated border border-border hover:border-border/80 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_30px_rgba(0,0,0,0.15)] group relative overflow-hidden h-[400px] shrink-0"
                  >
                    {/* Subtle top glow overlay matching member accent */}
                    <div 
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ backgroundColor: `${member.accent}15` }}
                    />

                    <div>
                      {/* Image Area */}
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-3.5 bg-surface border border-border group-hover:border-border-hover transition-colors duration-300">
                        <Image 
                          src={member.image || '/images/team/placeholder.jpg'} 
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 270px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                          style={{ backgroundColor: member.accent }}
                        />
                      </div>

                      {/* Role & Icon Header */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest font-bold" style={{ color: member.accent }}>
                          {member.role}
                        </span>
                        <IconComponent size={12} style={{ color: member.accent }} />
                      </div>

                      {/* Name */}
                      <h3 className="text-base font-bold text-ink mb-2 group-hover:text-ink transition-colors duration-200">
                        {member.name}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] text-ink-muted leading-relaxed mb-3 min-h-[50px]">
                        {member.description}
                      </p>

                      {/* Philosophy */}
                      <p className="text-[10px] font-mono italic text-ink-muted/80 border-l border-border pl-2 mb-4 leading-normal">
                        &ldquo;{member.philosophy}&rdquo;
                      </p>
                    </div>

                    <div>
                      {/* Stack / Skills Badges */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {member.stack.slice(0, 4).map((tag) => (
                          <span 
                            key={tag} 
                            className="text-[8px] font-mono px-1.5 py-0.5 bg-surface border border-border text-ink-muted rounded-md transition-colors duration-200 group-hover:border-border/80 group-hover:text-ink"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Direct Consult Button */}
                      <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-1.5 h-1.5 rounded-full animate-pulse" 
                            style={{ backgroundColor: member.accent, boxShadow: `0 0 6px ${member.accent}` }}
                          />
                          <span className="text-[9px] font-mono text-ink-faint uppercase">Direct Consult</span>
                        </div>
                        <Link
                          href="/#contact"
                          className="text-[10px] font-mono uppercase text-ink-muted hover:text-ink flex items-center gap-1 group/btn hover:underline underline-offset-4"
                        >
                          <span>Work Together</span>
                          <ArrowLeft size={8} className="transform rotate-180 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Back Link / Call to Action */}
        <div className="w-full max-w-[700px] mx-auto px-4 md:px-6 text-center mt-20">
          <p className="text-xs font-mono uppercase tracking-widest text-[#FF6B6B]">Ready to begin?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink mt-2">Let us build your next project together.</h2>
          <p className="text-xs text-ink-muted mt-2 max-w-md mx-auto">
            Get in touch with us directly to discuss your project guidelines, target platforms, and custom feature sets.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:border-[#FF6B6B]/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(255,107,107,0.3)] hover:text-[#FF6B6B] text-center min-h-[48px]"
            >
              {/* Glowing background gradient on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10" />

              {/* Neon accent bar inside button bottom */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Sweeping shimmer */}
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />

              <span className="relative z-10">Start a Conversation</span>
            </Link>
            <Link
              href="/#projects"
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-border bg-surface text-ink-muted font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:border-[#FF6B6B]/40 hover:text-ink active:scale-[0.98] cursor-pointer hover:shadow-[0_0_16px_rgba(255,107,107,0.15)] text-center min-h-[48px]"
            >
              {/* Sweeping shimmer */}
              <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />

              <span className="relative z-10">See What We Have Shipped</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
