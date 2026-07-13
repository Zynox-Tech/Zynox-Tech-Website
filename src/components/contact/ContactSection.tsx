'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2, Mail, MessageCircle, User, AtSign, FileText } from 'lucide-react';

// ─── Polished boxed field ────────────────────────────────────────────────────
function Field({
  id, label, type = 'text', value, onChange, rows, icon, maxChars,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void;
  rows?: number; icon?: React.ReactNode; maxChars?: number;
}) {
  const [focus, setFocus] = useState(false);

  const borderColor = focus ? 'var(--accent-web)' : 'var(--border)';
  const shadow      = focus ? '0 0 0 3px rgba(79,140,255,0.13)' : 'none';

  const inputClass = 'w-full bg-transparent text-ink text-[15px] outline-none placeholder:text-ink-faint/40 leading-relaxed';

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted tracking-wide">
          {icon && <span className="text-ink-faint" style={{ opacity: focus ? 1 : 0.5, transition: 'opacity 0.2s', color: focus ? 'var(--accent-web)' : undefined }}>{icon}</span>}
          {label}
        </label>
        {maxChars && (
          <span className="text-[10px] font-mono tabular-nums" style={{ color: value.length > maxChars * 0.85 ? 'var(--accent-web)' : 'var(--ink-faint)' }}>
            {value.length}/{maxChars}
          </span>
        )}
      </div>

      {/* Input box */}
      <div
        className="rounded-xl border px-4 bg-bg-elevated/60"
        style={{ borderColor, boxShadow: shadow, transition: 'border-color 0.2s, box-shadow 0.2s' }}
      >
        {rows ? (
          <textarea
            id={id} name={id} rows={rows} value={value} required
            maxLength={maxChars}
            className={`${inputClass} py-3.5 resize-none`}
            placeholder={`e.g. ${label.toLowerCase()}...`}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        ) : (
          <input
            id={id} name={id} type={type} value={value} required
            className={`${inputClass} py-3.5`}
            placeholder={`e.g. ${label.toLowerCase()}...`}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main section ────────────────────────────────────────────────────────────
export function ContactSection() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

      if (!accessKey) {
        console.log('[DEV] Form submission (no key set):', { name, email, message });
        await new Promise(r => setTimeout(r, 600));
        setStatus('ok');
        setName(''); setEmail(''); setMessage('');
        return;
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New project inquiry from ${name} — Zynox`,
          from_name: 'Zynox Contact Form',
          replyto: email,
          name,
          email,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('ok');
        setName(''); setEmail(''); setMessage('');
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
  }

  // stagger wrapper
  const wrap = {
    hidden:  {},
    show:    { transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 20 },
    show:    { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-bg py-14 md:py-24 lg:py-36 scroll-mt-20 overflow-hidden"
    >
      {/* subtle bg glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent-web/[0.04] rounded-full blur-[120px]" />
      </div>

      <motion.div
        className="relative max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
        variants={wrap}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >

        {/* ── Left: heading + channels ── */}
        <motion.div variants={item} className="flex flex-col gap-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-web mb-5">
              07 &mdash; Contact
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight">
              Got a project<br />in mind?
            </h2>
            <p className="mt-5 text-ink-muted text-sm leading-relaxed max-w-sm">
              Drop us a message and one of our engineers will get back to you within 24 hours — usually the same day.
            </p>
          </div>

          {/* Direct channels */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@zynoxtech.site"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-[#2A2D33] hover:border-accent-web/40 hover:bg-accent-web/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-web-soft flex items-center justify-center text-accent-web shrink-0">
                <Mail size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink">Email us</p>
                <p className="text-xs text-ink-faint truncate mt-0.5">hello@zynoxtech.site</p>
              </div>
              <ArrowRight size={14} className="text-ink-faint group-hover:text-accent-web group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            <a
              href="https://wa.me/923170593433?text=Hi! I'd like to discuss a project."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-2xl border border-[#2A2D33] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageCircle size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">WhatsApp</p>
                <p className="text-xs text-ink-faint mt-0.5">+92 317 059 3433</p>
              </div>
              <ArrowRight size={14} className="text-ink-faint group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>
          </div>
        </motion.div>

        {/* ── Right: form ── */}
        <motion.div variants={item} className="pt-10 lg:pt-14">
          <AnimatePresence mode="wait">
            {status === 'ok' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5 py-10"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent-web-soft flex items-center justify-center text-accent-web">
                  <Check size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">Message sent!</h3>
                  <p className="text-sm text-ink-muted mt-1.5 leading-relaxed">
                    We have received your message and will reply within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink underline underline-offset-4 transition-colors w-fit cursor-pointer"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field id="name"  label="Your Name"     value={name}  onChange={setName}  icon={<User size={12} />} />
                  <Field id="email" label="Email Address" type="email" value={email} onChange={setEmail} icon={<AtSign size={12} />} />
                </div>

                <Field id="message" label="Project Brief" value={message} onChange={setMessage} rows={5} icon={<FileText size={12} />} maxChars={500} />

                {status === 'err' && (
                  <p className="text-xs text-red-400">
                    Something went wrong — try WhatsApp or email directly.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2 border-t border-border w-full">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 md:py-3 rounded-xl bg-accent-web text-white text-sm font-semibold transition-all duration-300 hover:brightness-110 hover:shadow-[0_6px_24px_-4px_rgba(79,140,255,0.55)] active:scale-[0.98] disabled:opacity-50 cursor-pointer w-full md:w-auto min-h-[48px] md:min-h-0"
                  >
                    {status === 'loading' ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <>
                        <span>Send message</span>
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                  <div>
                    <p className="text-xs font-medium text-ink-muted">Reply within 24 hrs</p>
                    <p className="text-[10px] text-ink-faint mt-0.5">Usually same day</p>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </section>
  );
}
