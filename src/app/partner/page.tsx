'use client';

import { motion } from 'framer-motion';
import { Globe, Package, TrendingUp, Users, CheckCircle, ArrowRight, Building2, ClipboardCheck, Handshake, Truck } from 'lucide-react';
import { PartnerForm } from '@/components/sections/PartnerForm';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { GetStartedButton } from '@/components/ui/get-started-button';

const BENEFITS = [
  {
    icon: Globe,
    color: 'var(--color-blue-400)',
    title: 'Global Market Access',
    description: 'Reach 200+ fashion brands across the USA, UK, Germany, UAE, Australia, and Canada — all actively sourcing through Scalular.',
  },
  {
    icon: Package,
    color: 'var(--color-blue-700)',
    title: 'Volume Orders',
    description: 'Consistent, high-volume purchase orders from verified brands. No more chasing small buyers — get orders that fill your production capacity.',
  },
  {
    icon: TrendingUp,
    color: 'var(--color-neutral-700)',
    title: 'Factoring Solutions',
    description: 'Access working capital through our integrated factoring partners. Get paid faster without waiting on buyer payment terms.',
  },
  {
    icon: Users,
    color: 'var(--color-primary)',
    title: 'Brand Connections',
    description: 'Join a curated network. Our platform directly matches your specialties, capacities, and certifications with the right buyers.',
  },
];

const STEPS = [
  {
    icon: ClipboardCheck,
    step: '01',
    title: 'Apply',
    description: 'Fill out our partner application with your factory details, certifications, and product specialties.',
  },
  {
    icon: Building2,
    step: '02',
    title: 'Audit',
    description: 'Our on-ground team conducts a factory audit covering quality, capacity, ethical standards, and compliance.',
  },
  {
    icon: Handshake,
    step: '03',
    title: 'Onboard',
    description: 'Once verified, you join the Scalular platform — your factory profile goes live to 200+ global brands.',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Receive Orders',
    description: 'Start receiving matched purchase orders from brands that fit your specialties and minimum order quantities.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'What types of factories can apply?',
    answer: 'We partner with apparel manufacturers producing any of our 17 product categories — from T-shirts and hoodies to dresses and denim. Your factory must have a minimum capacity of 5,000 units/month and meet our baseline ethical standards audit.',
  },
  {
    question: 'Is there a cost to join the partner network?',
    answer: 'There is no upfront fee to apply or join. Scalular earns a platform fee on orders fulfilled through our system. This keeps our interests aligned — we only succeed when you succeed.',
  },
  {
    question: 'How long does the audit process take?',
    answer: 'The audit process typically takes 2–4 weeks from application approval. This includes document review, a scheduled on-site visit, and compliance verification. Factories with existing certifications (GOTS, OEKO-TEX, WRAP, etc.) move through faster.',
  },
  {
    question: 'What certifications are preferred?',
    answer: 'We prefer factories with at least one major certification: GOTS, OEKO-TEX, WRAP, Fairtrade, or equivalent. Factories without certifications can still apply — we work with you to establish a compliance roadmap.',
  },
  {
    question: 'How are orders matched to factories?',
    answer: 'Our AI-powered matching system pairs buyer requests with factories based on product type, capacity, certifications, MOQ, lead time, and geographic proximity. You\'ll only receive inquiries you\'re actually equipped to fulfill.',
  },
  {
    question: 'Can I set minimum order quantities?',
    answer: 'Yes. Your factory profile includes your MOQ, lead times, and capacity windows. Brands can only request quotes within your stated parameters.',
  },
  {
    question: 'What happens after I submit the application?',
    answer: 'Our team reviews every application within 2 business days. If your factory meets our initial criteria, we schedule a call to discuss the audit process and answer any questions.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function PartnerPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary pt-20">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-36 px-6 md:px-12 bg-mesh-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_80%,var(--primary-muted),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-8"
          >
            Factory Partner Program
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-text-primary leading-[1.05] tracking-tighter mb-6"
          >
            Grow Your Factory<br />
            <span className="text-gradient">With Global Brands</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-medium mb-10"
          >
            Join Scalular's verified factory network and connect directly with 200+ global fashion brands
            actively sourcing ethical, quality apparel manufacturing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GetStartedButton
              label="Apply Now"
              size="lg"
              href="#apply"
            />
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
            >
              See How It Works
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-background border-t border-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              Why Partner With Scalular
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter"
            >
              Built for <span className="text-gradient">Factory Growth</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
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
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-3xl p-7"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `color-mix(in srgb, ${b.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${b.color} 18%, transparent)` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: b.color }} />
                  </div>
                  <h3 className="text-xl font-black text-text-primary mb-2 tracking-tight">{b.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 bg-mesh-gradient border-t border-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              Process
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter"
            >
              From Application to <span className="text-gradient">First Order</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
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
                  className="glass-card rounded-3xl p-6 text-center relative"
                >
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-3 z-10">
                      <ArrowRight className="w-5 h-5 text-primary/40" />
                    </div>
                  )}
                  <div className="text-[10px] font-black tracking-[0.3em] text-primary/60 mb-3">{s.step}</div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-black text-text-primary mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{s.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Certifications ───────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-background border-t border-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              Standards We Recognize
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter mb-4"
            >
              Accepted <span className="text-gradient">Certifications</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-text-secondary max-w-xl mx-auto"
            >
              Holding at least one major certification significantly accelerates your audit process and increases match rates with premium buyers.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'GOTS', desc: 'Global Organic Textile Standard' },
              { name: 'OEKO-TEX', desc: 'Harmful substances testing' },
              { name: 'WRAP', desc: 'Worldwide Responsible Accredited Production' },
              { name: 'Fairtrade', desc: 'Fair trade certified production' },
              { name: 'Higg Index', desc: 'Sustainable Apparel Coalition' },
              { name: 'BCI', desc: 'Better Cotton Initiative' },
              { name: 'Sedex', desc: 'Supply chain ethical data exchange' },
              { name: 'CTPAT', desc: 'Customs-Trade Partnership Against Terrorism' },
              { name: 'SA8000', desc: 'Social accountability standard' },
              { name: 'ISO 9001', desc: 'Quality management systems' },
              { name: 'SGS', desc: 'Inspection & testing certification' },
              { name: 'Amfori', desc: 'Business social compliance initiative' },
            ].map((cert, i) => (
              <motion.div
                key={cert.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="glass-card rounded-2xl p-4 flex flex-col items-center text-center"
              >
                <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <div className="text-sm font-black text-text-primary">{cert.name}</div>
                <div className="text-[10px] text-text-secondary mt-0.5 leading-tight">{cert.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Form ─────────────────────────────────── */}
      <section id="apply" className="py-20 px-6 md:px-12 bg-mesh-gradient border-t border-divider">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              Apply Now
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter mb-4"
            >
              Start Your <span className="text-gradient">Application</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-text-secondary"
            >
              Takes less than 5 minutes. Our team will review and respond within 2 business days.
            </motion.p>
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

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-background border-t border-divider">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              FAQ
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter"
            >
              Common <span className="text-gradient">Questions</span>
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
    </main>
  );
}
