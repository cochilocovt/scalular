'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Package, TrendingUp, Users, CheckCircle, ArrowRight, Building2, ClipboardCheck, Handshake, Truck, Factory, Award, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { PartnerForm } from '@/components/sections/PartnerForm';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const BENEFITS = [
  {
    icon: Globe,
    color: '#0EA5E9',
    title: 'Global Market Access',
    description: 'Reach 200+ fashion brands across the USA, UK, Germany, UAE, Australia, and Canada — all actively sourcing through Scalular.',
  },
  {
    icon: Package,
    color: '#38BDF8',
    title: 'Volume Orders',
    description: 'Consistent, high-volume purchase orders from verified brands. No more chasing small buyers — get orders that fill your production capacity.',
  },
  {
    icon: TrendingUp,
    color: '#94A3B8',
    title: 'Factoring Solutions',
    description: 'Access working capital through our integrated factoring partners. Get paid faster without waiting on buyer payment terms.',
  },
  {
    icon: Users,
    color: '#4A6085',
    title: 'Brand Connections',
    description: 'Join a curated network. Our platform directly matches your specialties, capacities, and certifications with the right buyers.',
  },
];

const STEPS = [
  { icon: ClipboardCheck, step: '01', title: 'Apply', description: 'Fill out our partner application with your factory details, certifications, and product specialties.' },
  { icon: Building2, step: '02', title: 'Audit', description: 'Our on-ground team conducts a factory audit covering quality, capacity, ethical standards, and compliance.' },
  { icon: Handshake, step: '03', title: 'Onboard', description: 'Once verified, you join the Scalular platform — your factory profile goes live to 200+ global brands.' },
  { icon: Truck, step: '04', title: 'Receive Orders', description: 'Start receiving matched purchase orders from brands that fit your specialties and minimum order quantities.' },
];

const CERTS = [
  'GOTS', 'OEKO-TEX', 'WRAP', 'Fairtrade', 'Higg Index', 'BCI',
  'Sedex', 'CTPAT', 'SA8000', 'ISO 9001', 'SGS', 'Amfori',
];

const FAQ_ITEMS = [
  { question: 'What types of factories can apply?', answer: 'We partner with apparel manufacturers producing any of our 17 product categories — from T-shirts and hoodies to dresses and denim. Your factory must have a minimum capacity of 5,000 units/month and meet our baseline ethical standards audit.' },
  { question: 'Is there a cost to join the partner network?', answer: 'There is no upfront fee to apply or join. Scalular earns a platform fee on orders fulfilled through our system. This keeps our interests aligned — we only succeed when you succeed.' },
  { question: 'How long does the audit process take?', answer: 'The audit process typically takes 2–4 weeks from application approval. This includes document review, a scheduled on-site visit, and compliance verification. Factories with existing certifications (GOTS, OEKO-TEX, WRAP, etc.) move through faster.' },
  { question: 'What certifications are preferred?', answer: 'We prefer factories with at least one major certification: GOTS, OEKO-TEX, WRAP, Fairtrade, or equivalent. Factories without certifications can still apply — we work with you to establish a compliance roadmap.' },
  { question: 'How are orders matched to factories?', answer: 'Our AI-powered matching system pairs buyer requests with factories based on product type, capacity, certifications, MOQ, lead time, and geographic proximity. You\'ll only receive inquiries you\'re actually equipped to fulfill.' },
  { question: 'Can I set minimum order quantities?', answer: 'Yes. Your factory profile includes your MOQ, lead times, and capacity windows. Brands can only request quotes within your stated parameters.' },
  { question: 'What happens after I submit the application?', answer: 'Our team reviews every application within 2 business days. If your factory meets our initial criteria, we schedule a call to discuss the audit process and answer any questions.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const PROOF_STATS = [
  { target: 200, suffix: '+', label: 'Brands Connected' },
  { target: 30, suffix: '+', label: 'Factory Partners' },
  { target: 10, suffix: '', label: 'Countries' },
  { target: 1, suffix: 'M+', label: 'Pcs/Month' },
];

export default function PartnerPage() {
  const { scrollYProgress } = useScroll({ offset: ["start start", "end end"] });
  const darkBgOpacity = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
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
    <main className="flex flex-col min-h-screen relative selection:bg-[#0EA5E9]/30 selection:text-[#0EA5E9]">

      {/* ── Fixed Background Layers ── */}
      <motion.div
        className="fixed inset-0 bg-[#0A0F1C] z-[-1] pointer-events-none"
        style={{ opacity: darkBgOpacity }}
      >
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj4KICA8ZmlsdGVyIGlkPSJuIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjgiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIiBmaWx0ZXI9InVybCgjbikiLz4KPC9zdmc+')", backgroundRepeat: "repeat" }}
        />
      </motion.div>
      <div className="fixed inset-0 bg-[#F4F7FC] z-[-2] pointer-events-none" />

      {/* ═══ HERO (Light Mode) ═══ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center justify-center min-h-[85vh] z-10 overflow-hidden"
      >
        {/* Parallax factory image behind hero */}
        <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/trust/production-floor-white.jpg"
            alt="Apparel production floor"
            fill
            className="object-cover opacity-[0.07]"
            priority
          />
        </motion.div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-slate-800 text-xs font-black tracking-[0.3em] uppercase mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            Factory Partner Program
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-black text-[#0F172A] leading-[0.95] tracking-tighter mb-8"
          >
            Grow Your Factory<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A6085] to-[#0EA5E9]">With Global Brands.</span>
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
            <a href="#how-it-works" className="inline-flex items-center gap-2 text-[#4A6085] font-bold text-sm hover:text-[#0EA5E9] hover:gap-3 transition-all">
              See How It Works <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* ═══ PROBLEM STATEMENT (The Pivot — Light → Dark) ═══ */}
      <section className="relative z-20 py-24 md:py-36 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#0EA5E9]" /> The Problem
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-8">
              Your Factory Deserves <span className="text-[#0EA5E9]">Better.</span>
            </h2>
            <div className="space-y-5 text-white/70 text-lg leading-relaxed font-light">
              <div>Cold emails go unanswered. Trade fairs cost thousands with no guarantee. Middlemen eat into your margins. The traditional way of finding international buyers is broken.</div>
              <div>You built a world-class production facility. You invested in certifications, training, and quality systems. But without the right connections, your capacity goes unfilled and your growth stalls.</div>
              <div className="text-[#0EA5E9] font-medium">There's a better way — and 30+ factories have already found it.</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent z-10" />
            <Image
              src="/images/trust/factory-struggle.png"
              alt="Factory owner waiting at empty loading dock"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══ DARK MODE SECTIONS ═══ */}
      <div className="relative z-20 text-white pb-32">

        {/* ── Benefits ── */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#0EA5E9]" /> Why Partner With Scalular
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter"
              >
                Built for <span className="text-[#0EA5E9]">Factory Growth.</span>
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
                    whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.06)' }}
                    className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm rounded-[2rem] p-8 md:p-10 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 ease-out">
                      <Icon className="w-7 h-7" style={{ color: b.color }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">{b.title}</h3>
                    <div className="text-white/60 leading-relaxed text-base md:text-lg font-light">{b.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Social Proof Counter Strip ── */}
        <section className="py-16 px-6 md:px-12 border-t border-b border-white/[0.05] bg-white/[0.02]">
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
                <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-xs font-bold text-white/50 uppercase tracking-widest mt-2">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── How It Works (Sticky Timeline) ── */}
        <section id="how-it-works" ref={timelineRef} className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#0EA5E9]" /> Process
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter"
              >
                From Application to <span className="text-[#0EA5E9]">First Order.</span>
              </motion.h2>
            </div>

            {/* Timeline grid */}
            <div className="grid md:grid-cols-4 gap-6">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
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
                    {/* Connector line */}
                    {i < STEPS.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-[2px] bg-gradient-to-r from-[#0EA5E9]/40 to-transparent z-0" />
                    )}
                    <div className="bg-white/[0.02] border border-white/[0.08] rounded-[2rem] p-8 text-center relative z-10">
                      <div className="text-[10px] font-black tracking-[0.3em] text-[#0EA5E9]/60 mb-4">{s.step}</div>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5">
                        <Icon className="w-7 h-7 text-[#0EA5E9]" />
                      </div>
                      <h3 className="text-xl font-black text-white mb-3 tracking-tight">{s.title}</h3>
                      <div className="text-white/60 text-sm leading-relaxed font-light">{s.description}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Certifications Marquee ── */}
        <section className="py-16 px-6 md:px-12 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 inline-flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#0EA5E9]" /> Standards We Recognize <span className="w-8 h-[2px] bg-[#0EA5E9]" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4"
              >
                Accepted <span className="text-[#0EA5E9]">Certifications</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-white/60 max-w-xl mx-auto font-light"
              >
                Holding at least one major certification accelerates your audit and increases match rates with premium buyers.
              </motion.div>
            </div>

            {/* Scrolling cert ticker */}
            <div className="overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0F1C] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0F1C] to-transparent z-10 pointer-events-none" />
              <div className="animate-marquee whitespace-nowrap">
                {[...CERTS, ...CERTS].map((cert, i) => (
                  <span
                    key={`${cert}-${i}`}
                    className="inline-flex items-center gap-2 mx-4 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 text-sm font-bold"
                  >
                    <CheckCircle className="w-4 h-4 text-[#0EA5E9]" />
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
              {['sewing-floor-blue.jpg', 'factory-walkway.jpg', 'cotton-processing.jpg', 'fabric-ironing.jpg'].map((img, i) => (
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
                  <div className="absolute inset-0 bg-[#0A0F1C]/30 group-hover:bg-[#0A0F1C]/10 transition-colors duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Application Form ── */}
        <section id="apply" className="py-24 px-6 md:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 inline-flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#0EA5E9]" /> Apply Now
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4"
              >
                Start Your <span className="text-[#0EA5E9]">Application.</span>
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-white/60 font-light"
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
              <PartnerForm darkMode />
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 px-6 md:px-12 border-t border-white/[0.05]">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 inline-flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#0EA5E9]" /> FAQ
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black text-white tracking-tighter"
              >
                Common <span className="text-[#0EA5E9]">Questions</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FAQAccordion items={FAQ_ITEMS} darkMode />
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}
