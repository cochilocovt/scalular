'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, ShieldCheck, Zap, Award, Globe, Users, Package, ArrowRight, CheckCircle, Factory, Network, Sparkles, Building2, UserCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GetStartedButton } from '@/components/ui/get-started-button';

const VALUES = [
  {
    icon: Zap,
    color: '#0EA5E9',
    title: 'Instant Quotes',
    description: 'Our instant quotation system delivers pricing in seconds, not weeks — eliminating the back-and-forth that traditionally slowed apparel sourcing.',
  },
  {
    icon: Factory,
    color: '#38BDF8',
    title: 'Reliable Factoring',
    description: 'Every factory in our network is audited and verified, ensuring consistent quality, on-time delivery, and reliable production at scale.',
  },
  {
    icon: Award,
    color: '#94A3B8',
    title: 'Certified Factories',
    description: 'We partner with factories holding certifications from GOTS, OEKO-TEX, Sedex, WRAP, and more — meeting the highest global compliance standards.',
  },
  {
    icon: Network,
    color: '#4A6085',
    title: 'Large Supplier Network',
    description: 'Access 30+ verified suppliers across 10 countries, specializing in garment development across all categories from knitwear to denim.',
  },
];

const SUSTAINABILITY = [
  {
    icon: Leaf,
    color: '#0EA5E9',
    title: 'Sustainable Sourcing Practices',
    description: 'Scalular partners with factories that prioritize eco-friendly and sustainable manufacturing. Our apparel sourcing approach reduces environmental impact by supporting facilities that use energy-efficient processes and sustainable materials.',
  },
  {
    icon: ShieldCheck,
    color: '#38BDF8',
    title: 'Ethical Standards in Apparel',
    description: 'We ensure all our partner factories follow labor-friendly practices, promoting fair wages, safe working conditions, and ethical garment sourcing. Our commitment helps brands align with global ethical standards.',
  },
  {
    icon: Sparkles,
    color: '#4A6085',
    title: 'Digital Transformation & Transparency',
    description: 'Scalular empowers factories with digital tools to enhance operational efficiency, transparency, and innovation. Our instant quotation system streamlines garment sourcing, making it easier for buyers to connect with verified manufacturers.',
  },
];

const STATS = [
  { target: 20, suffix: '+', label: 'Dedicated Employees', icon: UserCircle },
  { target: 1, suffix: 'M+', label: 'Pcs/Month Capacity', icon: Package },
  { target: 30, suffix: '+', label: 'Global Factory Units', icon: Factory },
  { target: 10, suffix: '+', label: 'Certified Factories', icon: Award },
  { target: 30, suffix: '+', label: 'QA & QC Experts', icon: CheckCircle },
  { target: 10, suffix: '', label: 'Operating Countries', icon: Globe },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function AboutPage() {
  // Track window scroll directly to avoid position:static warnings on container ref
  const { scrollYProgress } = useScroll({ offset: ["start start", "end end"] });

  // Cinematic scroll transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  
  // The dark mode background fades in to completely consume the light theme
  const darkBgOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);

  // Image scales from a constrained card to full-bleed cinematic width
  const imageScale = useTransform(scrollYProgress, [0.05, 0.2], [0.9, 1.1]);
  const imageRadius = useTransform(scrollYProgress, [0.05, 0.2], ['24px', '0px']);

  return (
    <main className="flex flex-col min-h-screen relative selection:bg-[#0EA5E9]/30 selection:text-[#0EA5E9]">
      
      {/* ── Fixed Dark Background Layer (Fades in on scroll) ── */}
      <motion.div 
        className="fixed inset-0 bg-[#0A0F1C] z-[-1] pointer-events-none"
        style={{ opacity: darkBgOpacity }}
      >
        {/* Subtle Frosted Noise Texture (Option B) */}
        <div 
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj4KICA8ZmlsdGVyIGlkPSJuIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjgiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmIiBmaWx0ZXI9InVybCgjbikiLz4KPC9zdmc+')", backgroundRepeat: "repeat" }} 
        />
      </motion.div>
      {/* ── Fixed Light Background Layer ── */}
      <div className="fixed inset-0 bg-[#F4F7FC] z-[-2] pointer-events-none" />

      {/* ── Hero (Light Mode) ─────────────────────────────────────────────── */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-32 pb-24 md:pt-48 md:pb-36 px-6 md:px-12 flex flex-col items-center justify-center min-h-[80vh] z-10"
      >
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-slate-800 text-xs font-black tracking-[0.3em] uppercase mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
            About Scalular
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-black text-[#0F172A] leading-[0.95] tracking-tighter mb-8"
          >
            Where Global Apparel<br />
            Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A6085] to-[#0EA5E9]">Ethical Innovation.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            A B2B platform revolutionizing the global apparel industry — bridging
            buyers and factories worldwide, enabling seamless connections and fostering global trade.
          </motion.div>
        </div>
      </motion.section>

      {/* ── Cinematic Image Transition ────────────────────────────────────────── */}
      <section className="relative z-20 w-full flex items-center justify-center overflow-hidden py-12">
        <motion.div
          style={{ scale: imageScale, borderRadius: imageRadius }}
          className="w-full max-w-7xl h-[60vh] md:h-[80vh] mx-auto overflow-hidden shadow-2xl relative"
        >
          <div className="absolute inset-0 bg-black/20 z-10" />
          <Image
            src="/images/about_us/Uljah-Team-crop-2048x1158.png"
            alt="Scalular team showcasing a dedicated workforce in the apparel sourcing industry."
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* ── Dark Mode Sections ──────────────────────────────────────────── */}
      <div className="relative z-20 text-white pb-32 pt-20">
        
        {/* ── Mission & Stats ──────────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#0EA5E9]"></span> Our Mission & Vision
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-8">
                Making Global Trade <span className="text-[#0EA5E9]">Seamless.</span>
              </h2>
              <div className="space-y-6 text-white/70 text-lg md:text-xl leading-relaxed font-light">
                <div>
                  Scalular is not just a sourcing agency — we're your reserved space inside the South Asian apparel supply chain.
                  We bridge the gap between real-time production needs and long-term brand vision with factory-level access, speed, and trust.
                </div>
                <div>
                  We act as a full-service private label apparel partner, functioning like your own office on-site. Powered by our live ERP system, we ensure complete transparency from raw material to finished goods.
                </div>
                <div>
                  Our in-house R&D and sampling units provide thread-level understanding to guarantee zero-error execution, while our dedicated QC teams eliminate future correspondence over quality mismatches.
                </div>
              </div>
            </motion.div>

            {/* Cinematic Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {STATS.map(({ target, suffix, label, icon: Icon }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className="bg-white/[0.03] border border-white/[0.08] backdrop-blur-md rounded-3xl p-6 md:p-8 text-center transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-[#0EA5E9] mx-auto mb-4 opacity-80" />
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    <AnimatedCounter target={target} suffix={suffix} />
                  </div>
                  <div className="text-xs font-bold text-white/50 uppercase tracking-widest mt-2">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#0EA5E9]"></span> What Sets Us Apart
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter"
              >
                Why <span className="text-[#0EA5E9]">Choose Us?</span>
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
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
                    whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.06)' }}
                    className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm rounded-[2rem] p-8 md:p-10 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 ease-out">
                      <Icon className="w-7 h-7" style={{ color: v.color }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">{v.title}</h3>
                    <div className="text-white/60 leading-relaxed text-base md:text-lg font-light">{v.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Sustainability ────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6"
              >
                <span className="w-8 h-[2px] bg-[#0EA5E9]"></span>
                Sustainability
                <span className="w-8 h-[2px] bg-[#0EA5E9]"></span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter max-w-4xl mx-auto leading-[1.05]"
              >
                The Next Step in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">Sustainable Manufacturing</span>
              </motion.h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
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
                    whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.06)' }}
                    className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm rounded-[2rem] p-8 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:rotate-12 transition-transform duration-500 ease-out">
                      <Icon className="w-7 h-7" style={{ color: s.color }} />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{s.title}</h3>
                    <div className="text-white/60 leading-relaxed text-base font-light">{s.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Supplier Network ──────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 bg-white/[0.02] border-t border-b border-white/[0.05]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#0EA5E9]"></span> Robust Supplier Network
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-8">
                Strengthened by <span className="text-[#0EA5E9]">30+ Global Factories.</span>
              </h2>
              <div className="text-white/70 text-lg md:text-xl leading-relaxed font-light mb-6">
                We pride ourselves on our constantly expanding list of trusted partners, each specializing in the development of garments across all categories.
              </div>
              <div className="text-white/70 text-lg md:text-xl leading-relaxed font-light">
                Our diverse network offers vertically integrated solutions spanning 10 countries, delivering high-quality products at scale, on time, while continuously adapting to the dynamic demands of the apparel industry.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Globe, label: 'Global Reach', desc: '10 countries across Asia & Africa' },
                { icon: Factory, label: 'All Categories', desc: 'From knitwear to denim' },
                { icon: Package, label: 'Full Service', desc: 'Sampling, packaging, QA/QC' },
                { icon: Users, label: 'Trusted Partners', desc: '15 vertically oriented groups' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-[#0EA5E9] mx-auto mb-4" />
                  <div className="text-lg font-black text-white tracking-tight mb-1">{item.label}</div>
                  <div className="text-sm text-white/50 font-light">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Location ─────────────────────────────────────────── */}
        <section className="py-24 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 text-[11px] font-black tracking-[0.4em] uppercase text-[#0EA5E9] mb-8"
            >
              <span className="w-8 h-[2px] bg-[#0EA5E9]"></span> Global Offices <span className="w-8 h-[2px] bg-[#0EA5E9]"></span>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/[0.02] border border-white/[0.08] p-10 rounded-[2rem]"
              >
                <Building2 className="w-8 h-8 text-[#0EA5E9] mb-6" />
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Sourcing Headquarters</h3>
                <div className="text-xl text-white/80 mb-6 font-light">Tiruppur, India</div>
                <div className="text-white/60 font-light mb-1">1/422 Green Avenue, Kozhippannai,</div>
                <div className="text-white/60 font-light">Mangalam Road, Tiruppur – 641687</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/[0.02] border border-white/[0.08] p-10 rounded-[2rem]"
              >
                <Globe className="w-8 h-8 text-[#38BDF8] mb-6" />
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Corporate LLC</h3>
                <div className="text-xl text-white/80 mb-6 font-light">Dubai, UAE</div>
                <div className="text-white/60 font-light mb-1">Central Business District,</div>
                <div className="text-white/60 font-light">contactus@scalular.com · +91 8920029744</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-[0.95]"
            >
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">Partner?</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-white/80 text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto"
            >
              Whether you're a brand looking to source smarter, or a factory wanting to reach more buyers — Scalular opens the door.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <GetStartedButton
                label="Get a Free Quote"
                size="lg"
                href="https://app.scalular.com/quote"
                target="_blank"
              />
              <Link
                href="/partner"
                className="inline-flex items-center gap-3 text-white font-bold text-lg hover:text-[#0EA5E9] transition-colors group"
              >
                Become a Factory Partner
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0EA5E9]/20 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

      </div>
    </main>
  );
}
