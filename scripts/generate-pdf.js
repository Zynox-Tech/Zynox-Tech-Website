// scripts/generate-pdf.js
// Run with: node scripts/generate-pdf.js
// Generates: public/zynox-company-profile.pdf

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT_PATH = path.join(__dirname, '../public/zynox-company-profile.pdf');

// ─── COLOR PALETTE ────────────────────────────────────────────────────────────
const C = {
  // Backgrounds
  dark:       '#0A0A0F',
  darkPanel:  '#12121A',
  card:       '#18181F',
  cardBorder: '#2A2A36',

  // Brand
  purple:     '#C961F2',
  purpleLight:'#E0A8FA',
  blue:       '#4F8CFF',
  blueLight:  '#9BB9FF',
  sand:       '#C4B5A5',
  sandLight:  '#DDD3C7',

  // Text
  white:      '#F5F5F7',
  muted:      '#9999AA',
  faint:      '#5A5A70',
  black:      '#0A0A0F',
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [255, 255, 255];
}

function setFill(doc, hex)   { doc.fillColor(hex); }
function setStroke(doc, hex) { doc.strokeColor(hex); }

function rect(doc, x, y, w, h, fillHex, radius = 0) {
  setFill(doc, fillHex);
  if (radius > 0) {
    doc.roundedRect(x, y, w, h, radius).fill();
  } else {
    doc.rect(x, y, w, h).fill();
  }
}

function line(doc, x1, y1, x2, y2, strokeHex, width = 0.5, opacity = 1) {
  doc.save()
     .opacity(opacity)
     .moveTo(x1, y1).lineTo(x2, y2)
     .strokeColor(strokeHex).lineWidth(width).stroke()
     .restore();
}

function dot(doc, x, y, r, fillHex) {
  setFill(doc, fillHex);
  doc.circle(x, y, r).fill();
}

function eyebrow(doc, x, y, text, color = C.purple) {
  doc.font('Helvetica-Bold')
     .fontSize(7)
     .fillColor(color)
     .text(text.toUpperCase(), x, y, { characterSpacing: 2.5 });
}

function heading1(doc, x, y, text, color = C.white, size = 28) {
  doc.font('Helvetica-Bold')
     .fontSize(size)
     .fillColor(color)
     .text(text, x, y, { lineGap: 4 });
}

function heading2(doc, x, y, text, color = C.white, size = 16) {
  doc.font('Helvetica-Bold')
     .fontSize(size)
     .fillColor(color)
     .text(text, x, y, { lineGap: 3 });
}

function body(doc, x, y, text, opts = {}) {
  doc.font('Helvetica')
     .fontSize(opts.size || 9)
     .fillColor(opts.color || C.muted)
     .text(text, x, y, {
       width: opts.width || 460,
       lineGap: opts.lineGap || 3,
       align: opts.align || 'left',
     });
}

function badge(doc, x, y, text, bg, textColor) {
  const padding = 6;
  const th = 14;
  const tw = doc.widthOfString(text, { font: 'Helvetica-Bold', size: 7 }) + padding * 2;
  rect(doc, x, y, tw, th, bg, 4);
  doc.font('Helvetica-Bold').fontSize(7).fillColor(textColor)
     .text(text, x + padding, y + 3.5, { characterSpacing: 0.5 });
  return tw;
}

// ─── PAGE 1: COVER ─────────────────────────────────────────────────────────
function drawCover(doc) {
  const W = 595, H = 842;
  
  // Full dark background
  rect(doc, 0, 0, W, H, C.dark);
  
  // Decorative gradient circles (simulated with layered semi-transparent circles)
  doc.save().opacity(0.07);
  setFill(doc, C.purple);
  doc.circle(W * 0.75, -60, 260).fill();
  doc.restore();

  doc.save().opacity(0.05);
  setFill(doc, C.blue);
  doc.circle(-40, H * 0.6, 200).fill();
  doc.restore();

  // Top accent bar
  rect(doc, 0, 0, W, 3, C.purple);
  
  // Top-right corner grid dots
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      doc.save().opacity(0.15);
      dot(doc, W - 60 + col * 14, 30 + row * 14, 1.2, C.purple);
      doc.restore();
    }
  }

  // Brand mark area — top-left
  doc.font('Helvetica-Bold').fontSize(13).fillColor(C.white)
     .text('ZYN', 50, 44, { continued: true, characterSpacing: 3 });
  // Custom 'O' — circle
  const ox = 50 + doc.widthOfString('ZYN', { font: 'Helvetica-Bold', size: 13, characterSpacing: 3 });
  doc.fillColor(C.white).text('', 0, 0); // reset
  doc.font('Helvetica-Bold').fontSize(13).fillColor(C.white)
     .text('ZYNOX', 50, 44, { characterSpacing: 3 });

  doc.font('Helvetica').fontSize(7.5).fillColor(C.faint)
     .text('Software Studio', 50, 60, { characterSpacing: 1.5 });

  // Horizontal rule below header
  line(doc, 50, 80, W - 50, 80, C.cardBorder, 0.5, 0.6);

  // ── MAIN COVER CONTENT ──
  const startY = 200;

  // Tag
  eyebrow(doc, 50, startY, '— Company Profile 2025', C.purple);
  
  // Main title
  doc.font('Helvetica-Bold').fontSize(42).fillColor(C.white)
     .text('Building digital', 50, startY + 22, { lineGap: 5 });
  doc.font('Helvetica-Bold').fontSize(42).fillColor(C.purple)
     .text('products that', 50, startY + 22 + 50, { lineGap: 5 });
  doc.font('Helvetica-Bold').fontSize(42).fillColor(C.white)
     .text('matter.', 50, startY + 22 + 100, { lineGap: 5 });

  // Tagline
  doc.font('Helvetica').fontSize(11).fillColor(C.muted)
     .text(
       'Zynox is an independent software studio of five engineers\ndesigning, building, and shipping high-performance digital products.',
       50, startY + 22 + 160,
       { width: 380, lineGap: 5 }
     );

  // Vertical accent line + stat strip
  const statY = startY + 340;
  line(doc, 50, statY, 50, statY + 60, C.purple, 2);

  const stats = [
    { num: '5+',  label: 'Engineers' },
    { num: '20+', label: 'Projects Delivered' },
    { num: '4',   label: 'Core Verticals' },
    { num: '3+',  label: 'Years Active' },
  ];
  let sx = 66;
  stats.forEach((s, i) => {
    doc.font('Helvetica-Bold').fontSize(18).fillColor(C.white).text(s.num, sx, statY + 4);
    doc.font('Helvetica').fontSize(7).fillColor(C.muted).text(s.label, sx, statY + 26, { characterSpacing: 0.5 });
    sx += 100;
  });

  // Cover image / decorative card
  rect(doc, W - 210, startY - 10, 160, 200, C.card, 12);
  line(doc, W - 210, startY - 10, W - 50, startY - 10, C.purple, 2);
  
  const services = ['Web Development', 'Mobile Apps', 'Custom Software', 'Game Development'];
  services.forEach((svc, i) => {
    const sy = startY + 16 + i * 40;
    dot(doc, W - 193, sy + 5, 3, C.purple);
    doc.font('Helvetica').fontSize(8.5).fillColor(C.muted).text(svc, W - 184, sy);
    doc.font('Helvetica').fontSize(7).fillColor(C.faint).text('Full-Stack · Client-Ready', W - 184, sy + 12);
  });

  // Footer area
  line(doc, 50, H - 80, W - 50, H - 80, C.cardBorder, 0.5, 0.5);

  doc.font('Helvetica').fontSize(8).fillColor(C.faint)
     .text('hello@zynoxtech.site', 50, H - 65);
  doc.font('Helvetica').fontSize(8).fillColor(C.faint)
     .text('www.zynoxtech.site', 50, H - 52);

  doc.font('Helvetica').fontSize(8).fillColor(C.faint)
     .text('Abbottabad, Pakistan', W - 160, H - 65, { width: 110, align: 'right' });
  doc.font('Helvetica').fontSize(8).fillColor(C.faint)
     .text('© 2025 Zynox Tech. All rights reserved.', W - 300, H - 52, { width: 250, align: 'right' });

  // Page number
  dot(doc, W / 2, H - 20, 2, C.faint);
}

// ─── PAGE 2: ABOUT & SERVICES ──────────────────────────────────────────────
function drawAboutAndServices(doc) {
  const W = 595, H = 842;
  rect(doc, 0, 0, W, H, C.dark);

  // Decorative top glow
  doc.save().opacity(0.04);
  setFill(doc, C.blue);
  doc.circle(W / 2, 0, 300).fill();
  doc.restore();

  rect(doc, 0, 0, W, 3, C.blue);

  // Page header
  doc.font('Helvetica-Bold').fontSize(8).fillColor(C.faint)
     .text('ZYNOX — COMPANY PROFILE 2025', 50, 24, { characterSpacing: 1.5 });
  doc.font('Helvetica').fontSize(8).fillColor(C.faint)
     .text('02', W - 60, 24);
  line(doc, 50, 38, W - 50, 38, C.cardBorder, 0.5, 0.5);

  // ── ABOUT SECTION ──
  const ay = 60;
  eyebrow(doc, 50, ay, '01 — About Us', C.blue);
  doc.font('Helvetica-Bold').fontSize(22).fillColor(C.white)
     .text('Five people who studied this,', 50, ay + 18, { lineGap: 4 });
  doc.font('Helvetica-Bold').fontSize(22).fillColor(C.white)
     .text('then decided to build it.', 50, ay + 18 + 28, { lineGap: 4 });

  body(doc, 50, ay + 90,
    'Zynox is a small independent software studio of five engineers based in Abbottabad, Pakistan. We work directly with our clients to design, build, and ship high-performance products — from responsive web applications and cross-platform mobile apps to custom ERP/POS systems and immersive game experiences.',
    { width: 480, lineGap: 4, size: 9.5 }
  );
  body(doc, 50, ay + 160,
    'Our team is composed entirely of practitioners — no project managers, no middlemen. Every sprint is run directly by the engineers who write the code. We believe the best products are built by teams that own the entire stack, from database schema to deployment pipeline.',
    { width: 480, lineGap: 4, size: 9.5 }
  );

  // Core values row
  const cvY = ay + 240;
  line(doc, 50, cvY, W - 50, cvY, C.cardBorder, 0.5, 0.4);

  const values = [
    { icon: '◈', title: 'Outcome-First', desc: 'We measure success by what ships, not by hours tracked.' },
    { icon: '◉', title: 'Full Ownership', desc: 'Engineers own features end-to-end, schema to deployment.' },
    { icon: '◎', title: 'Transparent', desc: 'Clients have direct access to progress and decisions.' },
  ];
  const colW = (W - 100) / 3;
  values.forEach((v, i) => {
    const vx = 50 + i * colW;
    const vy = cvY + 18;
    doc.font('Helvetica-Bold').fontSize(14).fillColor(C.blue).text(v.icon, vx, vy);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(C.white).text(v.title, vx, vy + 20);
    body(doc, vx, vy + 34, v.desc, { width: colW - 15, size: 8, lineGap: 3 });
  });

  // ── SERVICES SECTION ──
  const svY = cvY + 120;
  line(doc, 50, svY, W - 50, svY, C.cardBorder, 0.5, 0.4);

  eyebrow(doc, 50, svY + 16, '02 — Our Services', C.purple);
  doc.font('Helvetica-Bold').fontSize(20).fillColor(C.white)
     .text('What we build.', 50, svY + 32, { lineGap: 3 });

  const services = [
    {
      color: C.blue,
      tag: 'WEB',
      title: 'Web Development',
      desc: 'React, Next.js, TypeScript and Framer Motion-powered web platforms — built for speed, SEO, and premium aesthetics.'
    },
    {
      color: '#34D399',
      tag: 'MOBILE',
      title: 'Mobile Applications',
      desc: 'Cross-platform iOS and Android apps with Flutter & Dart, including real-time sync, offline-first support, and BLE/OBD integrations.'
    },
    {
      color: '#F5A623',
      tag: 'CUSTOM',
      title: 'Custom Software',
      desc: 'Bespoke ERP, POS, and inventory management systems tailored to logistics, retail, and supply-chain clients.'
    },
    {
      color: C.purple,
      tag: 'GAMES',
      title: 'Game Development',
      desc: 'Immersive Unity-based 3D experiences and game prototypes built with modular architecture and high-performance rendering.'
    },
  ];

  const svcColW = (W - 100) / 2;
  services.forEach((s, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const sx = 50 + col * (svcColW + 10);
    const sy = svY + 65 + row * 100;

    rect(doc, sx, sy, svcColW - 10, 85, C.card, 8);
    line(doc, sx, sy, sx + svcColW - 10, sy, s.color, 1.5);

    badge(doc, sx + 10, sy + 12, s.tag, s.color + '33', s.color);

    doc.font('Helvetica-Bold').fontSize(10).fillColor(C.white)
       .text(s.title, sx + 10, sy + 30);
    body(doc, sx + 10, sy + 45, s.desc, { width: svcColW - 30, size: 8, lineGap: 3 });
  });

  // Footer
  line(doc, 50, H - 40, W - 50, H - 40, C.cardBorder, 0.5, 0.3);
  doc.font('Helvetica').fontSize(7).fillColor(C.faint)
     .text('Zynox Tech · hello@zynoxtech.site · www.zynoxtech.site', 50, H - 28, { characterSpacing: 0.5 });
  doc.font('Helvetica').fontSize(7).fillColor(C.faint)
     .text('02', W - 60, H - 28);
}

// ─── PAGE 3: TEAM & CULTURE ────────────────────────────────────────────────
function drawTeamAndCulture(doc) {
  const W = 595, H = 842;
  rect(doc, 0, 0, W, H, C.dark);

  doc.save().opacity(0.04);
  setFill(doc, C.purple);
  doc.circle(0, 0, 220).fill();
  doc.restore();

  rect(doc, 0, 0, W, 3, C.purple);

  doc.font('Helvetica-Bold').fontSize(8).fillColor(C.faint)
     .text('ZYNOX — COMPANY PROFILE 2025', 50, 24, { characterSpacing: 1.5 });
  doc.font('Helvetica').fontSize(8).fillColor(C.faint)
     .text('03', W - 60, 24);
  line(doc, 50, 38, W - 50, 38, C.cardBorder, 0.5, 0.5);

  // ── TEAM SECTION ──
  const ty = 60;
  eyebrow(doc, 50, ty, '03 — Our Team', C.purple);
  doc.font('Helvetica-Bold').fontSize(22).fillColor(C.white)
     .text('Built by practitioners.', 50, ty + 18, { lineGap: 3 });

  body(doc, 50, ty + 52,
    'Our team of five is made up entirely of specialists. Each member owns a core domain, while contributing across the full stack. We do not have project managers or account handlers — when you work with Zynox, you work directly with the people who write the code.',
    { width: 480, lineGap: 4, size: 9.5 }
  );

  // Team grid
  const team = [
    { initials: 'HK', name: 'Hashim Khan', role: 'Lead · Frontend & Systems', skills: ['Next.js', 'TypeScript', 'Architecture'] },
    { initials: 'AA', name: 'Ali Ahmed',    role: 'Mobile Engineering Lead',    skills: ['Flutter', 'Dart', 'Firebase']        },
    { initials: 'MR', name: 'M. Raza',      role: 'Backend & API Systems',      skills: ['Node.js', 'PostgreSQL', 'Docker']    },
    { initials: 'FQ', name: 'Faisal Q.',    role: 'Game & 3D Development',      skills: ['Unity', 'C#', 'Blender']             },
    { initials: 'ZT', name: 'Zain T.',      role: 'UI Design & Frontend',       skills: ['Figma', 'CSS', 'Framer Motion']      },
  ];

  const tmColW = (W - 100) / 3;
  team.forEach((m, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const tx = 50 + col * (tmColW + 5);
    const tmY = ty + 135 + row * 120;

    rect(doc, tx, tmY, tmColW - 5, 105, C.card, 8);
    
    // Avatar circle
    setFill(doc, C.purple + '22');
    doc.circle(tx + 20, tmY + 22, 14).fill();
    doc.font('Helvetica-Bold').fontSize(8).fillColor(C.purpleLight)
       .text(m.initials, tx + 12.5, tmY + 17);

    doc.font('Helvetica-Bold').fontSize(9).fillColor(C.white)
       .text(m.name, tx + 42, tmY + 13);
    doc.font('Helvetica').fontSize(7.5).fillColor(C.muted)
       .text(m.role, tx + 42, tmY + 25, { width: tmColW - 55 });

    // Skill tags
    let bx = tx + 10;
    m.skills.forEach((skill) => {
      const bw = doc.widthOfString(skill, { font: 'Helvetica', size: 6.5 }) + 10;
      rect(doc, bx, tmY + 70, bw, 14, C.cardBorder, 3);
      doc.font('Helvetica').fontSize(6.5).fillColor(C.muted)
         .text(skill, bx + 5, tmY + 74);
      bx += bw + 5;
    });
  });

  // ── CULTURE SECTION ──
  const culY = ty + 385;
  line(doc, 50, culY, W - 50, culY, C.cardBorder, 0.5, 0.4);

  eyebrow(doc, 50, culY + 16, '04 — How We Work', C.sand);
  doc.font('Helvetica-Bold').fontSize(20).fillColor(C.white)
     .text('Hybrid. Flexible. Outcome-driven.', 50, culY + 32, { lineGap: 3 });

  // Culture statement block
  rect(doc, 50, culY + 62, W - 100, 100, C.card, 10);
  line(doc, 50, culY + 62, 50, culY + 162, C.purple, 3);
  
  doc.font('Helvetica-Oblique').fontSize(11).fillColor(C.sandLight)
     .text(
       '"We work in a flexible hybrid model, combining remote collaboration with\nin-person sessions for planning, innovation, and client meetings.\nOur focus is on outcomes, communication, and giving our team\nthe flexibility to do their best work."',
       68, culY + 78,
       { width: W - 140, lineGap: 5 }
     );

  // Culture pillars
  const pillars = [
    { icon: '⬡', title: 'No Micromanagement', desc: 'Define outcomes, set timelines, trust the team to execute.' },
    { icon: '⬡', title: 'Radical Transparency', desc: 'Every client has visibility on sprint progress and blockers.' },
    { icon: '⬡', title: 'Continuous Learning', desc: 'Engineers are given time to explore, prototype, and publish.' },
  ];

  pillars.forEach((p, i) => {
    const px = 50 + i * ((W - 100) / 3);
    const py = culY + 180;
    doc.font('Helvetica-Bold').fontSize(10).fillColor(C.purple).text(p.icon, px, py);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.white).text(p.title, px + 18, py + 1);
    body(doc, px, py + 16, p.desc, { width: (W - 120) / 3, size: 8, lineGap: 2.5 });
  });

  // Footer
  line(doc, 50, H - 40, W - 50, H - 40, C.cardBorder, 0.5, 0.3);
  doc.font('Helvetica').fontSize(7).fillColor(C.faint)
     .text('Zynox Tech · hello@zynoxtech.site · www.zynoxtech.site', 50, H - 28, { characterSpacing: 0.5 });
  doc.font('Helvetica').fontSize(7).fillColor(C.faint)
     .text('03', W - 60, H - 28);
}

// ─── PAGE 4: CONTACT & CTA ─────────────────────────────────────────────────
function drawContact(doc) {
  const W = 595, H = 842;
  rect(doc, 0, 0, W, H, C.dark);

  doc.save().opacity(0.06);
  setFill(doc, C.purple);
  doc.circle(W * 0.8, H * 0.3, 300).fill();
  doc.restore();

  doc.save().opacity(0.04);
  setFill(doc, C.blue);
  doc.circle(W * 0.1, H * 0.7, 220).fill();
  doc.restore();

  rect(doc, 0, 0, W, 3, C.purple);

  doc.font('Helvetica-Bold').fontSize(8).fillColor(C.faint)
     .text('ZYNOX — COMPANY PROFILE 2025', 50, 24, { characterSpacing: 1.5 });
  doc.font('Helvetica').fontSize(8).fillColor(C.faint)
     .text('04', W - 60, 24);
  line(doc, 50, 38, W - 50, 38, C.cardBorder, 0.5, 0.5);

  // ── PROCESS SECTION ──
  const py = 60;
  eyebrow(doc, 50, py, '05 — Our Process', C.blue);
  doc.font('Helvetica-Bold').fontSize(22).fillColor(C.white)
     .text('How we deliver projects.', 50, py + 18, { lineGap: 3 });

  const steps = [
    { n: '01', title: 'Discovery',    desc: 'We begin with a deep-dive brief to understand your goals, constraints, and tech stack.' },
    { n: '02', title: 'Architecture', desc: 'We design scalable schemas, component maps, and deployment blueprints before writing a single line of code.' },
    { n: '03', title: 'Sprints',      desc: 'Work is broken into focused 1–2 week sprints with continuous client review and feedback loops.' },
    { n: '04', title: 'Delivery',     desc: 'We ship with full documentation, staging environments, and hand-off sessions to ensure smooth adoption.' },
  ];

  const stepW = (W - 100) / 4;
  steps.forEach((step, i) => {
    const sx = 50 + i * stepW;
    const sy = py + 55;

    // Connector line between steps
    if (i < steps.length - 1) {
      line(doc, sx + stepW * 0.7, sy + 10, sx + stepW, sy + 10, C.cardBorder, 1, 0.6);
    }

    // Step circle
    setFill(doc, C.card);
    doc.circle(sx + 10, sy + 10, 10).fill();
    doc.font('Helvetica-Bold').fontSize(7).fillColor(C.blue)
       .text(step.n, sx + 5.5, sy + 6.5);

    doc.font('Helvetica-Bold').fontSize(9).fillColor(C.white)
       .text(step.title, sx, sy + 26);
    body(doc, sx, sy + 40, step.desc, { width: stepW - 15, size: 7.5, lineGap: 3 });
  });

  // ── TECHNOLOGIES STRIP ──
  const techY = py + 200;
  line(doc, 50, techY, W - 50, techY, C.cardBorder, 0.5, 0.4);

  eyebrow(doc, 50, techY + 16, '06 — Tech Stack', C.muted);
  doc.font('Helvetica-Bold').fontSize(16).fillColor(C.white)
     .text('Built with modern tools.', 50, techY + 32, { lineGap: 3 });

  const techs = [
    { label: 'Next.js',       color: C.white  },
    { label: 'Flutter',       color: '#54C5F8'},
    { label: 'TypeScript',    color: '#3178C6'},
    { label: 'Node.js',       color: '#68A063'},
    { label: 'Firebase',      color: '#FFCA28'},
    { label: 'PostgreSQL',    color: '#336791'},
    { label: 'Unity',         color: C.white  },
    { label: 'Framer Motion', color: C.purple },
    { label: 'Docker',        color: C.blue   },
    { label: 'Tailwind CSS',  color: '#38BDF8'},
  ];

  let bx = 50;
  let brow = 0;
  techs.forEach((t) => {
    const bw = doc.widthOfString(t.label, { font: 'Helvetica', size: 8 }) + 18;
    if (bx + bw > W - 50) {
      bx = 50;
      brow++;
    }
    const by = techY + 60 + brow * 30;
    rect(doc, bx, by, bw, 20, C.card, 5);
    doc.font('Helvetica').fontSize(8).fillColor(t.color)
       .text(t.label, bx + 9, by + 6);
    bx += bw + 8;
  });

  // ── CONTACT CTA ──
  const ctaY = techY + 200;
  rect(doc, 50, ctaY, W - 100, 160, C.card, 14);
  line(doc, 50, ctaY, W - 50, ctaY, C.purple, 2);

  doc.save().opacity(0.08);
  setFill(doc, C.purple);
  doc.circle(W - 80, ctaY + 80, 120).fill();
  doc.restore();

  doc.font('Helvetica-Bold').fontSize(7).fillColor(C.purple)
     .text('GET IN TOUCH', 72, ctaY + 22, { characterSpacing: 2.5 });
  doc.font('Helvetica-Bold').fontSize(20).fillColor(C.white)
     .text("Let's build something\nremarkable together.", 72, ctaY + 36, { lineGap: 5 });

  const contacts = [
    { label: 'Email',   value: 'hello@zynoxtech.site' },
    { label: 'Website', value: 'www.zynoxtech.site'   },
    { label: 'Phone',   value: '+92 317 059 3433'      },
    { label: 'Location','value': 'Abbottabad, KPK, Pakistan' },
  ];

  contacts.forEach((c, i) => {
    const cx = 72 + (i % 2) * 210;
    const cy = ctaY + 100 + Math.floor(i / 2) * 28;
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(C.faint).text(c.label.toUpperCase() + '  ', cx, cy, { continued: true, characterSpacing: 0.5 });
    doc.font('Helvetica').fontSize(7.5).fillColor(C.muted).text(c.value, { characterSpacing: 0 });
  });

  // Final footer
  line(doc, 50, H - 55, W - 50, H - 55, C.cardBorder, 0.5, 0.4);

  rect(doc, 50, H - 42, 120, 22, C.card, 5);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(C.white)
     .text('ZYNOX', 62, H - 35, { characterSpacing: 2 });

  doc.font('Helvetica').fontSize(7).fillColor(C.faint)
     .text('© 2025 Zynox Tech. All rights reserved.', W - 260, H - 35, { width: 210, align: 'right', characterSpacing: 0.3 });
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    autoFirstPage: false,
    info: {
      Title:    'Zynox Tech — Company Profile 2025',
      Author:   'Zynox Software Studio',
      Subject:  'Software Studio Company Profile',
      Keywords: 'Zynox, software, web development, mobile apps, Pakistan, tech studio',
      Creator:  'Zynox Internal Tools',
    }
  });

  const stream = fs.createWriteStream(OUT_PATH);
  doc.pipe(stream);

  doc.addPage(); drawCover(doc);
  doc.addPage(); drawAboutAndServices(doc);
  doc.addPage(); drawTeamAndCulture(doc);
  doc.addPage(); drawContact(doc);

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  const stats = fs.statSync(OUT_PATH);
  console.log(`\n✅ PDF generated successfully!`);
  console.log(`   Path: ${OUT_PATH}`);
  console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB\n`);
}

main().catch(err => {
  console.error('❌ PDF generation failed:', err);
  process.exit(1);
});
