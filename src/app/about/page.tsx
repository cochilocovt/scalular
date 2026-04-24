'use client';

import { motion } from 'framer-motion';
import { Leaf, ShieldCheck, Zap, Award, Globe, Users, Package, ArrowRight, CheckCircle, Factory, Network, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GetStartedButton } from '@/components/ui/get-started-button';

const VALUES = [
  {
    icon: Zap,
    color: 'var(--color-blue-700)',
    title: 'Instant Quotes',
    description: 'Our instant quotation system delivers pricing in seconds, not weeks — eliminating the back-and-forth that traditionally slowed apparel sourcing.',
  },
  {
    icon: Factory,
    color: 'var(--color-blue-400)',
    title: 'Reliable Factoring',
    description: 'Every factory in our network is audited and verified, ensuring consistent quality, on-time delivery, and reliable production at scale.',
  },
  {
    icon: Award,
    color: 'var(--color-neutral-700)',
    title: 'Certified Factories',
    description: 'We partner with factories holding certifications from GOTS, OEKO-TEX, Sedex, WRAP, and more — meeting the highest global compliance standards.',
  },
  {
    icon: Network,
    color: 'var(--color-primary)',
    title: 'Large Supplier Network',
    description: 'Access 30+ verified suppliers across 9 countries, specializing in garment development across all categories from knitwear to denim.',
  },
];

const SUSTAINABILITY = [
  {
    icon: Leaf,
    color: 'var(--color-blue-700)',
    title: 'Sustainable Sourcing Practices',
    description: 'Scalular partners with factories that prioritize eco-friendly and sustainable manufacturing. Our apparel sourcing approach reduces environmental impact by supporting facilities that use energy-efficient processes and sustainable materials.',
  },
  {
    icon: ShieldCheck,
    color: 'var(--color-blue-400)',
    title: 'Ethical Standards in Apparel',
    description: 'We ensure all our partner factories follow labor-friendly practices, promoting fair wages, safe working conditions, and ethical garment sourcing. Our commitment helps brands align with global ethical standards.',
  },
  {
    icon: Sparkles,
    color: 'var(--color-primary)',
    title: 'Digital Transformation & Transparency',
    description: 'Scalular empowers factories with digital tools to enhance operational efficiency, transparency, and innovation. Our instant quotation system streamlines garment sourcing, making it easier for buyers to connect with verified manufacturers.',
  },
];

const STATS = [
  { target: 20, suffix: '+', label: 'Years Experience', icon: Globe },
  { target: 1, suffix: 'M+', label: 'Pcs/Month Capacity', icon: Package },
  { target: 30, suffix: '+', label: 'Factory Partners', icon: Users },
  { target: 10, suffix: '', label: 'Countries', icon: Globe },
  { target: 30, suffix: '+', label: 'Global Merchandisers', icon: CheckCircle },
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
            About Us
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-text-primary leading-[1.05] tracking-tighter mb-6"
          >
            Where Global Apparel<br />
            Meets <span className="text-gradient">Ethical Innovation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-2xl mx-auto font-medium"
          >
            A B2B platform revolutionizing the global apparel industry — bridging
            buyers and factories worldwide, enabling seamless connections and fostering global trade.
          </motion.p>
        </div>
      </section>

      {/* ── Team Photo ────────────────────────────────────────── */}
      <section className="px-6 md:px-12 bg-background border-t border-divider">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto -mt-12 md:-mt-20 relative z-20"
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-divider">
            <Image
              src="/images/about_us/Uljah-Team-crop-2048x1158.png"
              alt="Scalular team group photo showcasing a diverse and dedicated workforce in the apparel sourcing and garment manufacturing industry. The team is committed to innovation, quality, and global trade solutions."
              width={2048}
              height={1158}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </motion.div>
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
            <div className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-4">Our Mission & Vision</div>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter leading-tight mb-6">
              Making Global Trade <span className="text-gradient">Seamless</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              Scalular is not just a sourcing agency — we're your reserved space inside the South Asian apparel supply chain.
              We bridge the gap between real-time production needs and long-term brand vision with factory-level access, speed, and trust.
              We act as a full-service private label apparel partner, functioning like your own office on-site.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              With 1 million pieces/month global manufacturing capacity, we offer flexible supply chain models: 
              from Basics (90 Days) and Read & React (65 Days), to Core Replenishment (30 Days) and Fashion (120 Days).
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Powered by Production 360, our live ERP system ensures complete transparency from raw material to finished goods. 
              Our in-house R&D and sampling units provide thread-level understanding to guarantee zero-error execution.
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

      {/* ── Why Choose Us ─────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-mesh-gradient border-t border-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              What Sets Us Apart
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter"
            >
              Why <span className="text-gradient">Choose Us?</span>
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
                  style={{ borderLeft: `4px solid ${v.color}` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `color-mix(in srgb, ${v.color} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${v.color} 28%, transparent)` }}
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

      {/* ── Sustainability ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-background border-t border-divider">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
            >
              Sustainability
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter"
            >
              The Next Step in <span className="text-gradient">Sustainable Manufacturing</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SUSTAINABILITY.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-3xl p-7"
                  style={{ borderLeft: `4px solid ${s.color}` }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${s.color} 28%, transparent)` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <h3 className="text-xl font-black text-text-primary mb-2 tracking-tight">{s.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{s.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Supplier Network ──────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-mesh-gradient border-t border-divider">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[10px] font-black tracking-[0.4em] uppercase text-primary mb-4">Robust Supplier Network</div>
            <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter leading-tight mb-6">
              Strengthened by <span className="text-gradient">20+ Suppliers</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-4">
              We pride ourselves on our constantly expanding list of trusted partners, each
              specializing in the development of garments across all categories.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              Our diverse network of suppliers offers services such as factoring, packaging,
              and printing. Together, we deliver high-quality products at scale, on time, while
              continuously adapting to the dynamic demands of the apparel industry.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Globe, label: 'Global Reach', desc: '9 countries across Asia' },
              { icon: Factory, label: 'All Categories', desc: 'Knitwear to denim' },
              { icon: Package, label: 'Full Service', desc: 'Factoring, packaging, printing' },
              { icon: Users, label: 'Trusted Partners', desc: '30+ verified factories' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-5 text-center"
              >
                <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-sm font-black text-text-primary tracking-tight">{item.label}</div>
                <div className="text-xs text-text-secondary mt-1">{item.desc}</div>
              </motion.div>
            ))}
          </motion.div>
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
