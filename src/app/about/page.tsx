'use client';

import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Zap, Award, Globe, Users, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GetStartedButton } from '@/components/ui/get-started-button';

const VALUES = [
  {
    icon: Leaf,
    color: 'var(--color-blue-700)',
    title: 'Sustainability',
    description: 'We partner exclusively with factories committed to eco-friendly manufacturing, energy efficiency, and reduced environmental impact across every production stage.',
  },
  {
    icon: ShieldCheck,
    color: 'var(--color-blue-400)',
    title: 'Ethical Standards',
    description: 'Fair wages, safe working conditions, and ethical sourcing practices are non-negotiable requirements for every factory in our network.',
  },
  {
    icon: Zap,
    color: 'var(--color-neutral-700)',
    title: 'Digital Innovation',
    description: 'Our instant quotation system and transparent sourcing platform eliminate the weeks of back-and-forth that traditionally defined apparel sourcing.',
  },
  {
    icon: Award,
    color: 'var(--color-primary)',
    title: 'Quality Assurance',
    description: 'Rigorous factory audits, certification verification, and on-the-ground teams ensure every order meets the quality standards your customers expect.',
  },
];

const STATS = [
  { target: 20, suffix: '+', label: 'Years Experience', icon: Globe },
  { target: 3000, suffix: '+', label: 'Orders Completed', icon: Package },
  { target: 30, suffix: '+', label: 'Factory Partners', icon: Users },
  { target: 9, suffix: '', label: 'Countries', icon: Globe },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function AboutPage() {
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
            Our Story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-text-primary leading-[1.05] tracking-tighter mb-6"
          >
            Bridging Buyers &<br />
            <span className="text-gradient">Factories Worldwide</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-medium"
          >
            For over two decades, Scalular has been connecting fashion brands with the world's
            best apparel manufacturers — making global sourcing transparent, ethical, and effortless.
          </motion.p>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-background border-t border-divider">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-4">Our Mission</div>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter leading-tight mb-6">
              Making Global Trade <span className="text-gradient">Seamless</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Scalular was founded in Tiruppur, India — the world's knitwear capital — with a single
              mission: eliminate the inefficiency and opacity that has plagued apparel sourcing for generations.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Today, we operate a digital platform connecting 200+ global brands to 30+ verified
              factory partners across 9 countries, with an instant AI-powered quotation system that
              delivers pricing in seconds, not weeks.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map(({ target, suffix, label, icon: Icon }) => (
              <div key={label} className="glass-card rounded-2xl p-6 text-center">
                <Icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-3xl font-black text-text-primary tracking-tighter">
                  <AnimatedCounter target={target} suffix={suffix} />
                </div>
                <div className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-mesh-gradient border-t border-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              What We Stand For
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter"
            >
              Our Core <span className="text-gradient">Values</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
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
                    style={{ background: `color-mix(in srgb, ${v.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${v.color} 18%, transparent)` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: v.color }} />
                  </div>
                  <h3 className="text-xl font-black text-text-primary mb-2 tracking-tight">{v.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Location ─────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-background border-t border-divider">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black tracking-[0.4em] uppercase text-primary mb-4"
          >
            Headquarters
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-2xl md:text-3xl font-black text-text-primary mb-3 tracking-tighter"
          >
            Tiruppur, Tamil Nadu, India
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-text-secondary mb-2"
          >
            1/422 Green Avenue, Kozhippannai, Mangalam Road, Tiruppur – 641687
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-sm"
          >
            contactus@scalular.com · +91 8920029744
          </motion.p>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-mesh-gradient border-t border-divider">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter mb-4"
          >
            Ready to <span className="text-gradient">Partner With Us?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-lg mb-8 font-medium"
          >
            Whether you're a brand looking to source smarter, or a factory wanting to reach more buyers —
            Scalular opens the door.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GetStartedButton
              label="Get a Free Quote"
              size="lg"
              href="https://app.scalular.com/quote"
              target="_blank"
            />
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
            >
              Become a Factory Partner
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
