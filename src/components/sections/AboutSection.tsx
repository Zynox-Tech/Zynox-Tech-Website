'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SectionEyebrow } from '../shared/SectionEyebrow';
import { ArrowRight, User, Terminal, Sparkles, Workflow, Server, Shield } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CORE_TEAM = [
  {
    id: 'hashim',
    name: 'Hashim Khan',
    role: 'Team Lead & Web Developer',
    summary: 'Leads the team with high-fidelity UI/UX design in Figma, system architecture planning, and full-stack web development using Next.js.',
    accent: '#4F8CFF',
    initials: 'HK',
    image: '/images/team/hashim.jpg',
    icon: Terminal
  },
  {
    id: 'raza',
    name: 'Umer Raza',
    role: 'Software Developer',
    summary: 'Focuses on Python system logic, database index configurations, and backend pipeline scheduling.',
    accent: '#34D399',
    initials: 'UR',
    image: '/images/team/raza.jpeg',
    icon: Sparkles
  },
  {
    id: 'usman',
    name: 'Sardar Usman',
    role: 'Web Developer',
    summary: 'Specializes in full-stack responsive web applications using the MERN stack and Next.js platforms.',
    accent: '#F5A623',
    initials: 'SU',
    image: '/images/team/usman.jpeg',
    icon: Workflow
  },
  {
    id: 'shaheer',
    name: 'Shaheer Ahmed',
    role: 'Mobile Developer',
    summary: 'Engineers responsive native and cross-platform mobile apps for iOS and Android using Flutter and Dart.',
    accent: '#FF6B6B',
    initials: 'SA',
    image: '/images/team/shaheer.jpeg',
    icon: Shield
  },
  {
    id: 'ubaid',
    name: 'Ubaidullah',
    role: 'Mobile Developer',
    summary: 'Builds high-performance mobile applications for iOS and Android, specializing in React Native and Flutter ecosystems.',
    accent: '#C961F2',
    initials: 'Ub',
    image: '/images/team/ubaid.jpeg',
    icon: Server
  }
];

export function AboutSection() {
  const [activeId, setActiveId] = useState(CORE_TEAM[0].id);
  const activeMember = CORE_TEAM.find(m => m.id === activeId) || CORE_TEAM[0];

  return (
    <section
      id="about"
      className="py-12 md:py-20 lg:py-32 border-b border-border/50 relative scroll-mt-12 bg-bg select-none transition-colors duration-300"
    >
      <div className="w-full max-w-full lg:max-w-[1200px] xl:max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <SectionEyebrow number="04" label="About Zynox" accent="custom" className="mb-6" />

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-ink mt-2 mb-6 leading-tight"
            >
              Five people who studied this, <br className="hidden sm:inline" />then decided to build it.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-ink-muted text-sm md:text-base space-y-4 mb-8 leading-relaxed max-w-xl"
            >
              <p>
                Zynox is a small independent software studio of five engineers based in Abbottabad, Pakistan. We work directly with our clients to design, build, and ship high-performance products.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/about"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl border border-border bg-bg-elevated text-ink font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:border-[#FF6B6B]/60 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_24px_rgba(255,107,107,0.3)] hover:text-[#FF6B6B] w-full sm:w-auto text-center min-h-[48px]"
              >
                {/* Glowing background gradient on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10" />

                {/* Neon accent bar inside button bottom */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] opacity-40 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Sweeping shimmer */}
                <div className="absolute inset-0 w-[200%] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-ink/5 to-transparent" />

                <span className="relative z-10 flex items-center gap-2.5">
                  <span>Read our full story &amp; meet the team</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Interactive Showcase */}
          <div className="lg:col-span-6 flex flex-col gap-5">

            {/* Interactive Portrait Selector Grid */}
            <div className="grid grid-cols-5 gap-3 max-w-[500px]">
              {CORE_TEAM.map((member) => {
                const isActive = activeId === member.id;
                return (
                  <button
                    key={member.id}
                    onMouseEnter={() => setActiveId(member.id)}
                    onClick={() => setActiveId(member.id)}
                    className="group/btn relative aspect-square rounded-xl border bg-bg-elevated flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer shrink-0"
                    style={{
                      borderColor: isActive ? member.accent : 'var(--border)',
                      boxShadow: isActive ? `0 0 15px -3px ${member.accent}30` : 'none'
                    }}
                  >
                    {/* Fallback initials */}
                    <span
                      className="font-mono text-sm font-bold transition-transform duration-300 group-hover/btn:scale-110"
                      style={{ color: isActive ? member.accent : 'var(--ink-muted)' }}
                    >
                      {member.initials}
                    </span>

                    {/* Actual photo */}
                    <Image
                      src={member.image || '/images/team/placeholder.jpg'}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center transition-all duration-300"
                    />

                    {/* Hover state outline overlays */}
                    <div
                      className={`absolute inset-0 border-2 transition-opacity duration-300 pointer-events-none rounded-xl ${isActive ? 'opacity-100' : 'opacity-0 group-hover/btn:opacity-40'}`}
                      style={{ borderColor: member.accent }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Displaying Current Active Member Story info */}
            <div
              className="bg-bg-elevated border rounded-xl p-5 min-h-[140px] flex flex-col justify-between relative overflow-hidden transition-all duration-300"
              style={{ borderColor: activeMember.accent }}
            >
              {/* Dynamic decorative backdrop glow */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-all duration-300"
                style={{ backgroundColor: `${activeMember.accent}08` }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider" style={{ color: activeMember.accent }}>
                        {activeMember.role}
                      </span>
                      <h4 className="text-base font-bold text-ink mt-0.5">{activeMember.name}</h4>
                    </div>
                    <activeMember.icon size={14} style={{ color: activeMember.accent }} />
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {activeMember.summary}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[9px] text-ink-faint font-mono">
                <span>Direct Collaboration Matrix</span>
                <span className="animate-pulse" style={{ color: activeMember.accent }}>Online</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
