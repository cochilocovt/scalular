'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Package, TrendingUp, Users, CheckCircle, ArrowRight, Building2, ClipboardCheck, Handshake, Truck, Factory, Award, ShieldCheck, Calculator } from 'lucide-react';
import Image from 'next/image';
import { PartnerForm } from '@/components/sections/PartnerForm';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const BENEFITS = [
  {
    icon: Globe,
    color: '#043377',
    title: 'Global Buyer Access',
    description: (
      <>
        <span className="block mb-4">Connect with verified and trusted fashion brands across the USA, UK, Germany, UAE, Australia, Canada, and other key sourcing markets actively manufacturing through Scalular.</span>
        <span className="block">Expand beyond local networks and gain direct access to buyers looking for reliable, compliance-certified production partners.</span>
      </>
    ),
  },
  {
    icon: Package,
    color: '#727cb1',
    title: 'Consistent Volume Based Orders',
    description: (
      <>
        <span className="block mb-4">Secure steady, high-volume purchase orders from trusted global brands—reducing dependency on small, inconsistent buyers.</span>
        <span className="block">Keep your production lines active with repeat business built for long-term manufacturing partnerships.</span>
      </>
    ),
  },
  {
    icon: TrendingUp,
    color: '#94A3B8',
    title: 'Factoring & Payment Support',
    description: (
      <>
        <span className="block mb-4">Access integrated factoring solutions that improve cash flow and reduce payment delays, helping factories get paid faster without waiting on extended buyer payment terms.</span>
        <span className="block">Built for smoother transactions, stronger liquidity, and uninterrupted production.</span>
      </>
    ),
  },
  {
    icon: Users,
    color: '#171B2E',
    title: 'Verified Buyer Network',
    description: (
      <>
        <span className="block mb-4">Work with trusted buyers who value quality, compliance, and long-term partnerships not just unrealistic prices.</span>
        <span className="block">Our platform matches your factory’s strengths, certifications, and production capacity with the right brands for sustainable growth.</span>
      </>
    ),
  },
];

const STEPS = [
  { icon: ClipboardCheck, step: '01', title: 'Apply', description: 'Fill out our partner application with your factory details, certifications, and product specialties.' },
  { icon: Calculator, step: '02', title: 'Costing Exercise', description: 'We evaluate pricing and production competitiveness to align costs with market and buyer expectations.' },
  { icon: Building2, step: '03', title: 'Audit', description: 'Our on-ground team conducts a factory audit covering quality, capacity, ethical standards, and compliance.' },
  { icon: Handshake, step: '04', title: 'Onboard', description: 'Once verified, you join the Scalular platform — your factory profile goes live to global brands.' },
  { icon: Truck, step: '05', title: 'Receive Orders', description: 'Start receiving matched purchase orders from brands that fit your specialties and minimum order quantities.' },
];

const CERTS = [
  'GOTS', 'OEKO-TEX', 'WRAP', 'Fairtrade', 'Higg Index', 'BCI',
  'Sedex', 'CTPAT', 'SA8000', 'ISO 9001', 'SGS', 'Amfori',
];

const FAQ_ITEMS = [
  {
    question: 'What types of factories can apply?',
    answer: 'We work with audited factories across various apparel categories. Preference is given to vertically integrated or technically strong facilities with proven export experience and consistent quality standards.',
  },
  {
    question: 'Is there a cost to join the partner network?',
    answer: 'No. There is no fee to apply or join the Scalular partner network. Factories are evaluated based on capability, compliance, pricing, and execution.',
  },
  {
    question: 'What certifications are preferred?',
    answer: 'We typically prefer factories with certifications such as WRAP, SMETA, BSCI, GOTS, OEKO-TEX, SLCP, SEDEX, or equivalent social and technical compliance standards.',
  },
  {
    question: 'How are orders matched to factories?',
    answer: 'Orders are allocated based on category expertise, pricing competitiveness, compliance level, production capacity, lead times, and historical performance.',
  },
  {
    question: 'Can I set minimum order quantities?',
    answer: 'Yes. Factories maintain full control over their MOQ requirements, production timelines, and category focus areas.',
  },
  {
    question: 'What happens after I submit the application?',
    answer: 'Our sourcing team reviews your submission, evaluates your capabilities and certifications, and reaches out if your factory aligns with current or upcoming production requirements followed by a costing exercise to benchmark competitiveness.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const PROOF_STATS = [
  { target: 6, suffix: '', label: 'Countries' },
  { target: 25, suffix: '+', label: 'Factories' },
  { target: 3000, suffix: '+', label: 'Orders Completed' },
  { target: 20, suffix: '+', label: 'Years of Experience' },
];

/* ── Custom Animated Icons for 5-Step Progress ── */

function AnimatedApplyIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#043377"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="#fff" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <motion.path
        d="M9 2h6v2H9z"
        animate={{ y: isHovered ? [0, -2, 0] : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
      <motion.path
        d="m9 14 2 2 4-4"
        animate={isHovered ? { pathLength: [0, 1] } : { pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.line x1="8" y1="10" x2="16" y2="10" strokeOpacity="0.4" />
    </svg>
  );
}

function AnimatedCalculatorIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#043377"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <motion.path
        d="M16 6h-2"
        stroke="#043377"
        animate={{ strokeOpacity: isHovered ? [1, 0.2, 1] : 1 }}
        transition={{ repeat: isHovered ? Infinity : 0, duration: 0.8, ease: "easeInOut" }}
      />
      {/* Row 1 */}
      <motion.circle cx="8" cy="11" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0, duration: 0.4 }} />
      <motion.circle cx="12" cy="11" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.1, duration: 0.4 }} />
      <motion.circle cx="16" cy="11" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.2, duration: 0.4 }} />
      {/* Row 2 */}
      <motion.circle cx="8" cy="15" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.05, duration: 0.4 }} />
      <motion.circle cx="12" cy="15" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.15, duration: 0.4 }} />
      <motion.circle cx="16" cy="15" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.25, duration: 0.4 }} />
      {/* Row 3 */}
      <motion.circle cx="8" cy="19" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.1, duration: 0.4 }} />
      <motion.circle cx="12" cy="19" r="1" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.2, duration: 0.4 }} />
      <motion.rect x="15" y="18" width="2" height="2" rx="0.5" fill="#043377" animate={{ scale: isHovered ? [1, 0.7, 1] : 1 }} style={{ transformOrigin: "center" }} transition={{ delay: 0.3, duration: 0.4 }} />
    </svg>
  );
}

function AnimatedAuditIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#043377"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <path d="M20 20V10a2 2 0 0 0-2-2h-2" />
      <path d="M4 20V14a2 2 0 0 1 2-2h2" />
      <rect x="10" y="14" width="4" height="6" />
      <motion.line
        x1="3"
        y1="3"
        x2="21"
        y2="3"
        stroke="#727cb1"
        strokeWidth="1.5"
        initial={{ y: 0, opacity: 0 }}
        animate={isHovered ? { y: [2, 16, 2], opacity: [0, 1, 1, 0] } : { y: 0, opacity: 0 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

function AnimatedOnboardIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#043377"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      <motion.path
        d="M18 8h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2"
        animate={isHovered ? { x: [0, 1, -1, 0], y: [0, -1, 1, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.path
        d="M6 16H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2"
        animate={isHovered ? { x: [0, -1, 1, 0], y: [0, 1, -1, 0] } : { x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      <motion.g
        animate={isHovered ? { y: [0, -2, 2, -1, 0] } : { y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.6 1.6" />
        <path d="m13 11-2-2a1 1 0 0 0-1.4 0l-4 4a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l1.6-1.6" />
      </motion.g>
    </svg>
  );
}

function AnimatedTruckIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#043377"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
    >
      <motion.line
        x1="2"
        y1="8"
        x2="5"
        y2="8"
        stroke="#727cb1"
        strokeWidth="1.5"
        animate={isHovered ? { x: [-3, 5], strokeOpacity: [0, 1, 0] } : { strokeOpacity: 0 }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
      />
      <motion.line
        x1="1"
        y1="13"
        x2="4"
        y2="13"
        stroke="#727cb1"
        strokeWidth="1.5"
        animate={isHovered ? { x: [-4, 4], strokeOpacity: [0, 1, 0] } : { strokeOpacity: 0 }}
        transition={{ repeat: Infinity, duration: 0.6, ease: "linear", delay: 0.2 }}
      />
      <motion.g
        animate={isHovered ? {
          y: [0, -1, 0, -0.5, 0],
          rotate: [0, 1, -1, 0]
        } : { y: 0, rotate: 0 }}
        style={{ transformOrigin: "bottom right" }}
        transition={{ repeat: isHovered ? Infinity : 0, duration: 0.4, ease: "easeInOut" }}
      >
        <polygon points="14 2 18 6 18 12 14 12" />
        <rect x="3" y="6" width="11" height="6" />
        <polygon points="18 8 21 8 23 11 23 12 18 12" />
      </motion.g>
      <motion.circle
        cx="7.5"
        cy="16.5"
        r="2.5"
        animate={isHovered ? { rotate: 360 } : {}}
        style={{ transformOrigin: "center" }}
        transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
      />
      <motion.circle
        cx="18.5"
        cy="16.5"
        r="2.5"
        animate={isHovered ? { rotate: 360 } : {}}
        style={{ transformOrigin: "center" }}
        transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
      />
    </svg>
  );
}

function renderStepIcon(step: string, isHovered: boolean) {
  switch (step) {
    case '01':
      return <AnimatedApplyIcon isHovered={isHovered} />;
    case '02':
      return <AnimatedCalculatorIcon isHovered={isHovered} />;
    case '03':
      return <AnimatedAuditIcon isHovered={isHovered} />;
    case '04':
      return <AnimatedOnboardIcon isHovered={isHovered} />;
    case '05':
      return <AnimatedTruckIcon isHovered={isHovered} />;
    default:
      return null;
  }
}

export default function PartnerPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ offset: ["start start", "end end"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.92]);
  const imageY = useTransform(scrollYProgress, [0, 0.2], [0, -80]);

  // Sticky timeline: track which step is active
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  return (
    <main id="main-content" className="flex flex-col min-h-screen relative selection:bg-[#043377]/30 selection:text-[#043377]">

      {/* ── Fixed Background Layer (matching homepage bg-background) ── */}
      <div className="fixed inset-0 bg-background z-[-2] pointer-events-none" />

      {/* ═══ HERO (Light Mode) ═══ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-24 pb-12 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center justify-center min-h-[85vh] z-10 overflow-hidden"
      >
        {/* Parallax factory image behind hero */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/trust/production/garment-sewing-floor-wide-view.jpg"
            alt="Apparel production floor"
            fill
            className="object-cover opacity-[0.07]"
            priority
          />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">


          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-8xl lg:text-[7rem] font-black text-[#0F172A] leading-[0.95] tracking-tighter mb-8"
          >
            Grow Your Factory<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171B2E] to-[#043377]">With Global Brands.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium mb-12"
          >
            Join Scalular's verified factory network and connect directly with 200+ global fashion brands actively sourcing ethical, quality apparel manufacturing.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <GetStartedButton label="Apply Now" size="lg" href="#apply" />
            <a href="#how-it-works" className="inline-flex items-center gap-2 text-[#171B2E] font-bold text-sm hover:text-[#043377] hover:gap-3 transition-all">
              See How It Works <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>



      {/* ═══ DARK MODE SECTIONS ═══ */}
      <div className="relative z-20 text-slate-900 pb-32">

        {/* ── Benefits ── */}
        <section className="py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#043377]" /> Why Partner With Scalular
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
              >
                Built for <span className="text-[#043377]">Factory Growth.</span>
              </motion.h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.8)' }}
                    className="bg-white/40 border border-slate-200/50 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/80 border border-slate-200/60 shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out">
                      <Icon className="w-7 h-7" style={{ color: b.color }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">{b.title}</h3>
                    <div className="text-slate-600 leading-relaxed text-base md:text-lg font-light">{b.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Social Proof Counter Strip ── */}
        <section className="py-16 px-6 md:px-12 border-t border-b border-slate-200/50 bg-white/20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {PROOF_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── How It Works (Sticky Timeline) ── */}
        <section id="how-it-works" ref={timelineRef} className="py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#043377]" /> Process
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
              >
                From Application to <span className="text-[#043377]">First Order.</span>
              </motion.h2>
            </div>

            {/* Timeline grid */}
            <div className="grid md:grid-cols-5 gap-4 lg:gap-6">
              {STEPS.map((s, i) => {
                const isHovered = hoveredIndex === i;
                const isAdjacentLeft = hoveredIndex !== null && hoveredIndex === i + 1;
                const isAdjacentRight = hoveredIndex !== null && hoveredIndex === i - 1;

                let rotateZ = 0;
                let y = 0;
                let scale = 1;
                let zIndex = 10;
                let backgroundColor = "rgba(255, 255, 255, 0.4)";
                let borderColor = "rgba(226, 232, 240, 0.5)"; // border-slate-200/50
                let shadow = "none";

                if (isHovered) {
                  scale = 1.05;
                  y = -12;
                  rotateZ = 0;
                  zIndex = 20;
                  backgroundColor = "rgba(255, 255, 255, 0.85)";
                  borderColor = "rgba(4, 51, 119, 0.25)";
                  shadow = "0 20px 40px -15px rgba(4, 51, 119, 0.15)";
                } else if (isAdjacentLeft) {
                  rotateZ = -2;
                  y = -3;
                  scale = 0.98;
                } else if (isAdjacentRight) {
                  rotateZ = 2;
                  y = -3;
                  scale = 0.98;
                } else if (hoveredIndex !== null) {
                  scale = 0.96;
                  y = 0;
                }

                return (
                  <motion.div
                    key={s.step}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Connection Line */}
                    {i < 4 && (
                      <div className="hidden md:block absolute left-1/2 top-[78px] md:top-[82px] lg:top-[90px] w-[calc(100%+16px)] lg:w-[calc(100%+24px)] h-[2px] z-0 pointer-events-none">
                        <svg className="w-full h-full" overflow="visible">
                          <line
                            x1="0"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke="rgba(226, 232, 240, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="6,6"
                          />
                          <motion.line
                            x1="0"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke="#043377"
                            strokeWidth="2"
                            strokeDasharray="6,6"
                            initial={{ pathLength: 0, strokeDashoffset: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            animate={{ strokeDashoffset: [-12, 0] }}
                            transition={{
                              pathLength: { duration: 0.6, delay: i * 0.15 + 0.3, ease: "easeOut" },
                              strokeDashoffset: { repeat: Infinity, ease: "linear", duration: 1 }
                            }}
                          />
                        </svg>
                      </div>
                    )}

                    {/* Interactive Card */}
                    <motion.div
                      animate={{
                        scale,
                        y,
                        rotateZ,
                        zIndex,
                        backgroundColor,
                        borderColor,
                        boxShadow: shadow,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 22,
                        mass: 0.8,
                      }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="border rounded-[2rem] px-4 py-5 md:px-3 md:py-6 lg:px-4 lg:py-8 text-center relative z-10 h-full cursor-pointer"
                    >
                      <div className="text-[10px] font-black tracking-[0.3em] text-[#043377]/60 mb-4">{s.step}</div>
                      <div className="w-14 h-14 rounded-2xl bg-white/80 border border-slate-200/60 flex items-center justify-center mx-auto mb-5 relative z-10">
                        {renderStepIcon(s.step, isHovered)}
                      </div>
                      <h3 className="text-xl md:text-xs lg:text-sm xl:text-base 2xl:text-xl font-black text-slate-900 mb-3 tracking-tight whitespace-nowrap">{s.title}</h3>
                      <div className="text-slate-600 text-sm leading-relaxed font-light">{s.description}</div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Certifications Marquee ── */}
        <section className="py-16 px-6 md:px-12 border-t border-slate-200/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 inline-flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#043377]" /> Standards We Recognize <span className="w-8 h-[2px] bg-[#043377]" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4"
              >
                Accepted <span className="text-[#043377]">Certifications</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-slate-600 max-w-xl mx-auto font-light"
              >
                Holding at least one major certification accelerates your audit and increases match rates with premium buyers.
              </motion.div>
            </div>

            {/* Scrolling cert ticker */}
            <div className="overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              <div className="animate-marquee whitespace-nowrap">
                {[...CERTS, ...CERTS].map((cert, i) => (
                  <span
                    key={`${cert}-${i}`}
                    className="inline-flex items-center gap-2 mx-4 px-5 py-3 rounded-full bg-white/40 border border-slate-200/50 text-slate-900 text-sm font-bold"
                  >
                    <CheckCircle className="w-4 h-4 text-[#043377]" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Factory Showcase Strip ── */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['production/garment-sewing-hall-wide.jpg', 'production/stitching-floor-workers-aisle.jpg', 'raw-materials/raw-cotton-bales-with-visitors.jpg', 'production/ironing-station-workers-pressing.jpg'].map((img, i) => (
                <motion.div
                  key={img}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="relative h-48 md:h-64 rounded-2xl overflow-hidden group"
                >
                  <Image
                    src={`/images/trust/${img}`}
                    alt="Factory production"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section id="apply" className="py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 inline-flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#043377]" /> Apply Now
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4"
              >
                Start Your <span className="text-[#043377]">Application.</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-slate-600 font-light"
              >
                Takes less than 5 minutes. Our team will review and respond within 2 business days.
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <PartnerForm />
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-12 md:py-24 px-6 md:px-12 border-t border-slate-200/50">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 inline-flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#043377]" /> FAQ
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter"
              >
                Common <span className="text-[#043377]">Questions</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FAQAccordion items={FAQ_ITEMS} />
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}
