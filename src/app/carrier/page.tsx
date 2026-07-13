'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  Upload,
  Check,
  Loader2,
  Briefcase,
  MapPin,
  Clock,
  ChevronDown,
  Building,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/sections/Footer';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  accentColor: string;
  summary: string;
  requirements: string[];
  responsibilities: string[];
}

const OPEN_POSITIONS: JobPosition[] = [
  {
    id: 'frontend-engineer',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Hybrid · Abbottabad',
    type: 'Full-time',
    experience: '2+ years',
    accentColor: '#4F8CFF',
    summary:
      'We are looking for a Senior Frontend Engineer passionate about creating high-fidelity user interfaces, micro-animations, and fluid interactive web applications using React, Next.js, and modern CSS systems.',
    requirements: [
      'Strong proficiency in React, Next.js, TypeScript, and Framer Motion.',
      'Experience optimizing Core Web Vitals, speed, and Lighthouse performance scores.',
      'High attention to detail, visual aesthetics, and component-driven architecture.',
      'Excellent communication skills and capability to collaborate in a hybrid environment.',
    ],
    responsibilities: [
      'Build and refine premium, responsive user interfaces for global clients.',
      'Optimize web platforms for maximum speed, accessibility, and scalability.',
      'Collaborate with designers to implement state-of-the-art interactive micro-interactions.',
      'Contribute to internal layout toolkits and frontend design tokens.',
    ],
  },
  {
    id: 'flutter-developer',
    title: 'Lead Flutter Developer',
    department: 'Mobile Engineering',
    location: 'Hybrid · Abbottabad',
    type: 'Full-time',
    experience: '1+ years',
    accentColor: '#34D399',
    summary:
      'Lead our cross-platform mobile initiatives — designing and building high-performance app architectures on Dart & Flutter for both iOS and Android platforms.',
    requirements: [
      'Strong expertise in Flutter, Dart, and state management (Bloc, Provider, or Riverpod).',
      'Solid experience with Firebase, sync protocols, and offline-first databases.',
      'Familiarity with publishing and managing apps on App Store & Google Play.',
      'Experience with push notifications and hardware integrations (OBD-II, BLE).',
    ],
    responsibilities: [
      'Architect and build rich gesture-driven cross-platform applications.',
      'Integrate third-party REST APIs, GraphQL, and live WebSocket sync engines.',
      'Ensure native-grade 60 FPS transition velocities across all mobile clients.',
      'Translate design mockups into clean, high-performance layouts.',
    ],
  },
  {
    id: 'fullstack-developer',
    title: 'Full-Stack Developer',
    department: 'Engineering',
    location: 'Hybrid · Abbottabad',
    type: 'Full-time',
    experience: '2+ years',
    accentColor: '#F5A623',
    summary:
      'Join our core systems team building custom software platforms, backend microservices, and databases for logistics, supply chain, and retail client platforms.',
    requirements: [
      'Proficiency in Node.js, Express/FastAPI, and PostgreSQL/MongoDB.',
      'Experience designing robust schema structures, caching systems, and REST/GraphQL APIs.',
      'Understanding of hosting environments, serverless endpoints, and Docker containers.',
      'Familiarity with event-driven brokers like Redis pub/sub is a plus.',
    ],
    responsibilities: [
      'Design, build, and support high-availability custom software endpoints.',
      'Optimize queries, database indexes, and cache layers for sub-15ms response times.',
      'Collaborate with mobile and frontend developers on client integrations.',
      'Maintain documentation for APIs and schema interfaces.',
    ],
  },
];

const PERKS = [
  {
    icon: Building,
    title: 'Hybrid Office',
    description: 'Collaborate remotely or visit our planning space in Abbottabad for sprints and reviews.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Shape your workday around deep focus. We care about output, not clock-in times.',
  },
  {
    icon: ShieldCheck,
    title: 'Full Ownership',
    description: 'Own features end-to-end — from database schema design to client-facing deployment.',
  },
  {
    icon: Zap,
    title: 'Fast-Paced Growth',
    description: 'Ship real products fast. No bureaucracy, no middlemen — just engineers and outcomes.',
  },
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (!accessKey) {
        await new Promise((r) => setTimeout(r, 1000));
        setStatus('ok');
        setName(''); setEmail(''); setPosition(''); setMessage(''); setCvFile(null);
        return;
      }
      const formData = new FormData();
      formData.append('access_key', accessKey);
      formData.append('subject', `Zynox Job Application: ${name} — ${position}`);
      formData.append('from_name', 'Zynox Careers Page');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('position', position);
      formData.append('message', message);
      if (cvFile) formData.append('attachment', cvFile);
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus('ok');
        setName(''); setEmail(''); setPosition(''); setMessage(''); setCvFile(null);
      } else {
        setStatus('err');
        setStatusMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('err');
      setStatusMsg('Unable to submit. Please check your connection or email us directly.');
    }
  };

  return (
    <div className="bg-bg text-ink min-h-screen font-sans flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-20 md:pt-28">
        <div className="w-full max-w-[1100px] mx-auto px-4 md:px-6 lg:px-8">

          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-ink-faint hover:text-ink transition-colors mb-10 cursor-pointer"
          >
            <ArrowLeft size={11} />
            <span>Back to Studio</span>
          </Link>

          {/* ── HERO ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-16">

            {/* Left: Main headline card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 relative bg-bg-elevated border border-border/70 rounded-2xl p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent-game/[0.06] rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent-game/30 via-transparent to-transparent" />

              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-game mb-4">
                  Zynox · Careers
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-ink leading-[1.15] mb-5">
                  Where outcomes matter<br className="hidden sm:block" /> more than hours.
                </h1>
                <p className="text-sm text-ink-muted leading-relaxed max-w-lg">
                  We build high-performance products for clients around the globe. Join a team of engineers committed to clean systems, premium aesthetics, and responsive digital frameworks.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-[10px] font-mono uppercase tracking-wider text-ink-faint mb-2">Our Work Culture</p>
                <p className="text-sm text-ink-muted leading-relaxed border-l-2 border-accent-game/60 pl-4">
                  We work in a flexible hybrid model, combining remote collaboration with in-person sessions for planning, innovation, and client meetings. Our focus is on outcomes, communication, and giving our team the flexibility to do their best work.
                </p>
              </div>
            </motion.div>

            {/* Right: Perks + Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 relative bg-bg-elevated border border-border/70 rounded-2xl p-7 sm:p-9 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-game/[0.05] rounded-full blur-3xl pointer-events-none" />

              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-ink-faint mb-5">Life at Zynox</p>
                <ul className="space-y-5">
                  {PERKS.map((perk) => (
                    <li key={perk.title} className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-xl border border-accent-game/20 bg-accent-game/[0.07] flex items-center justify-center text-accent-game shrink-0">
                        <perk.icon size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink leading-none mb-1">{perk.title}</p>
                        <p className="text-xs text-ink-muted leading-relaxed">{perk.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download Button */}
              <div className="mt-7 pt-6 border-t border-border/50">
                <a
                  href="/zynox-company-profile.pdf"
                  download="Zynox_Company_Profile.pdf"
                  className="group w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-surface border border-border/80 hover:border-accent-game/40 hover:bg-accent-game/[0.05] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-bg border border-border flex items-center justify-center text-ink-muted group-hover:text-accent-game group-hover:border-accent-game/30 transition-colors shrink-0">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-accent-game transition-colors leading-none mb-0.5">Company Profile</p>
                      <p className="text-[10px] text-ink-faint">PDF · Zynox Tech 2025</p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-bg border border-border flex items-center justify-center text-ink-muted group-hover:text-accent-game group-hover:border-accent-game/30 transition-all shrink-0 group-hover:-translate-y-0.5 duration-300">
                    <Download size={14} />
                  </div>
                </a>
              </div>
            </motion.div>

          </div>

          {/* ── OPEN ROLES ── */}
          <div className="mb-16">
            <div className="flex items-end justify-between mb-7">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-game mb-2">Now Hiring</p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">Open Positions</h2>
              </div>
              <span className="text-xs font-mono text-ink-faint bg-surface border border-border/80 px-3 py-1.5 rounded-lg">
                {OPEN_POSITIONS.length} open roles
              </span>
            </div>

            <div className="space-y-3">
              {OPEN_POSITIONS.map((job, idx) => {
                const isOpen = expandedJob === job.id;
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    className="bg-bg-elevated border border-border/70 rounded-2xl overflow-hidden transition-all duration-300 hover:border-border"
                    style={{ borderLeftColor: isOpen ? job.accentColor : undefined, borderLeftWidth: isOpen ? '3px' : undefined }}
                  >
                    {/* Row */}
                    <button
                      onClick={() => setExpandedJob(isOpen ? null : job.id)}
                      className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer group"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        {/* Color dot */}
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-offset-2 ring-offset-bg-elevated transition-all duration-300"
                          style={{ backgroundColor: job.accentColor, '--tw-ring-color': isOpen ? job.accentColor : 'transparent' } as React.CSSProperties}
                        />
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-ink group-hover:text-accent-game transition-colors leading-tight truncate">
                            {job.title}
                          </h3>
                          <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
                            <span className="flex items-center gap-1 text-[11px] text-ink-faint">
                              <MapPin size={10} className="shrink-0" />
                              {job.location}
                            </span>
                            <span className="text-border text-[10px]">·</span>
                            <span className="flex items-center gap-1 text-[11px] text-ink-faint">
                              <Clock size={10} className="shrink-0" />
                              {job.type}
                            </span>
                            <span className="text-border text-[10px]">·</span>
                            <span
                              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md"
                              style={{ color: job.accentColor, backgroundColor: `${job.accentColor}18` }}
                            >
                              {job.experience} exp
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center text-ink-muted transition-all duration-300 ${isOpen ? 'bg-surface border-border/80 rotate-180' : 'border-border/60 bg-transparent'}`}>
                        <ChevronDown size={15} />
                      </div>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 md:px-6 pb-6 pt-1 border-t border-border/50">
                            <p className="text-sm text-ink-muted leading-relaxed mt-4 mb-6">{job.summary}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                <p className="text-[10px] font-mono uppercase tracking-wider text-ink-faint mb-3">Responsibilities</p>
                                <ul className="space-y-2">
                                  {job.responsibilities.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
                                      <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: job.accentColor }} />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-[10px] font-mono uppercase tracking-wider text-ink-faint mb-3">Requirements</p>
                                <ul className="space-y-2">
                                  {job.requirements.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
                                      <CheckCircle2 size={13} className="shrink-0 mt-0.5" style={{ color: job.accentColor }} />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setPosition(job.title);
                                document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-[0.98]"
                              style={{
                                color: job.accentColor,
                                border: `1px solid ${job.accentColor}40`,
                                background: `${job.accentColor}12`,
                              }}
                              onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.background = `${job.accentColor}22`;
                                (e.currentTarget as HTMLElement).style.borderColor = `${job.accentColor}80`;
                              }}
                              onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.background = `${job.accentColor}12`;
                                (e.currentTarget as HTMLElement).style.borderColor = `${job.accentColor}40`;
                              }}
                            >
                              Apply for this Role
                              <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── APPLICATION FORM ── */}
          <div id="apply-form" className="scroll-mt-24 max-w-[720px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="relative bg-bg-elevated border border-border/70 rounded-2xl overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-accent-game via-[#8B5CF6] to-transparent" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-game/[0.05] rounded-full blur-3xl pointer-events-none" />

              <div className="p-7 sm:p-9">
                <div className="mb-8">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent-game mb-3">Join the Studio</p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink mb-2">Submit Your Application</h2>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Fill in your details and attach a CV. Our engineering team reviews all applications every week.
                  </p>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="apply-name" className="text-xs font-medium text-ink-muted">Full Name</label>
                      <input
                        id="apply-name" name="name" type="text" required
                        value={name} onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-surface border border-border/80 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-accent-game/60 focus:ring-2 focus:ring-accent-game/10 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="apply-email" className="text-xs font-medium text-ink-muted">Email Address</label>
                      <input
                        id="apply-email" name="email" type="email" required
                        value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full bg-surface border border-border/80 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-accent-game/60 focus:ring-2 focus:ring-accent-game/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="apply-position" className="text-xs font-medium text-ink-muted">Position</label>
                    <select
                      id="apply-position" name="position" required
                      value={position} onChange={e => setPosition(e.target.value)}
                      className="w-full bg-surface border border-border/80 rounded-xl px-4 py-3 text-sm text-ink outline-none focus:border-accent-game/60 focus:ring-2 focus:ring-accent-game/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a position…</option>
                      <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                      <option value="Lead Flutter Developer">Lead Flutter Developer</option>
                      <option value="Full-Stack Developer">Full-Stack Developer</option>
                      <option value="Other / General Application">Other / General Application</option>
                    </select>
                  </div>

                  {/* Cover Note */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <label htmlFor="apply-msg" className="text-xs font-medium text-ink-muted">Cover Note</label>
                      <span className="text-[10px] text-ink-faint tabular-nums">{message.length}/1000</span>
                    </div>
                    <textarea
                      id="apply-msg" name="message" required rows={4} maxLength={1000}
                      value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us about yourself and why you'd like to join Zynox…"
                      className="w-full bg-surface border border-border/80 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none focus:border-accent-game/60 focus:ring-2 focus:ring-accent-game/10 transition-all resize-none"
                    />
                  </div>

                  {/* CV Upload */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-ink-muted">Attach CV</span>
                    <label className="relative flex flex-col items-center justify-center gap-3 p-7 rounded-xl border border-dashed border-border/80 bg-surface/40 hover:border-accent-game/40 hover:bg-accent-game/[0.03] transition-all duration-300 cursor-pointer text-center group">
                      <input
                        type="file" required accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <AnimatePresence mode="wait">
                        {cvFile ? (
                          <motion.div
                            key="file"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center gap-2 pointer-events-none"
                          >
                            <div className="w-12 h-12 rounded-xl bg-accent-game/10 border border-accent-game/20 flex items-center justify-center text-accent-game">
                              <FileText size={22} />
                            </div>
                            <p className="text-sm font-semibold text-ink max-w-[260px] truncate">{cvFile.name}</p>
                            <p className="text-xs text-ink-faint">{(cvFile.size / (1024 * 1024)).toFixed(2)} MB · Click to change</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-2 pointer-events-none"
                          >
                            <div className="w-12 h-12 rounded-xl border border-border/80 bg-bg flex items-center justify-center text-ink-faint group-hover:text-accent-game group-hover:border-accent-game/30 transition-colors">
                              <Upload size={20} />
                            </div>
                            <p className="text-sm font-semibold text-ink">Drop your CV here, or click to browse</p>
                            <p className="text-xs text-ink-faint">PDF, DOC, DOCX — up to 10 MB</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </label>
                  </div>

                  {/* Error */}
                  {status === 'err' && (
                    <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl">
                      {statusMsg}
                    </div>
                  )}

                  {/* Submit */}
                  <AnimatePresence mode="wait">
                    {status === 'ok' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3.5 p-4 bg-accent-game/10 border border-accent-game/20 rounded-xl"
                      >
                        <div className="w-9 h-9 rounded-xl bg-accent-game flex items-center justify-center text-white shrink-0">
                          <Check size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink">Application submitted!</p>
                          <p className="text-xs text-ink-muted mt-0.5">We've received your CV and will be in touch soon.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit"
                        type="submit"
                        disabled={status === 'loading'}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-accent-game text-white text-sm font-semibold transition-all duration-300 hover:bg-[#b94de0] active:scale-[0.98] disabled:opacity-60 cursor-pointer shadow-[0_0_0_0_rgba(201,97,242,0)] hover:shadow-[0_0_28px_rgba(201,97,242,0.35)] min-h-[48px]"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Submitting…</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
