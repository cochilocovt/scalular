'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, ShieldCheck, Zap, Award, Globe, Users, Package, ArrowRight, CheckCircle, Factory, Network, Sparkles, Building2, UserCircle, MapPin, CreditCard, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

const VALUES = [
  {
    icon: MapPin,
    color: '#043377',
    title: 'On-Ground Support and Traceability',
    description: 'Our on-ground team actively manages production, resolving issues in real time while ensuring complete traceability from raw material sourcing to packaging.',
  },
  {
    icon: CreditCard,
    color: '#727cb1',
    title: 'Factoring & Payment Solutions',
    description: 'Flexible payment support backed by factoring services, helping buyers manage cash flow while ensuring factories are paid smoothly and on time.',
  },
  {
    icon: Award,
    color: '#94A3B8',
    title: 'Compliance-Certified Factories',
    description: 'We work with 30+ factories across 10 countries that meet global compliance standards including WRAP, SLCP, SEDEX, BSCI, GOTS, OEKO-TEX, and more.',
  },
  {
    icon: Zap,
    color: '#171B2E',
    title: 'Streamlined Product Lifecycle',
    description: 'Get AI-powered pricing in seconds and track production end-to-end from sampling to final delivery with complete visibility.',
  },
];

const SUSTAINABILITY = [
  {
    icon: Leaf,
    color: '#043377',
    title: 'Sustainable Sourcing Practices',
    description: 'Scalular partners with factories that prioritize eco-friendly and sustainable manufacturing. Our apparel sourcing approach reduces environmental impact by supporting facilities that use energy-efficient processes and sustainable materials.',
  },
  {
    icon: ShieldCheck,
    color: '#727cb1',
    title: 'Ethical Standards in Apparel',
    description: 'We ensure all our partner factories follow labor-friendly practices, promoting fair wages, safe working conditions, and ethical garment sourcing. Our commitment helps brands align with global ethical standards.',
  },
  {
    icon: Sparkles,
    color: '#171B2E',
    title: 'Digital Transformation & Transparency',
    description: 'Scalular empowers factories with digital tools to enhance operational efficiency, transparency, and innovation. Our instant quotation system streamlines garment sourcing, making it easier for buyers to connect with verified manufacturers.',
  },
];

const STATS = [
  { target: 15, suffix: '+', label: 'Years of Experience', icon: Clock },
  { target: 6, suffix: '', label: 'Countries', icon: Globe },
  { target: 3000, suffix: '+', label: 'Orders Completed', icon: Package },
  { target: 50, suffix: '+', label: 'Clients', icon: Users },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const FAQ_ITEMS = [
  {
    question: 'What is Scalular?',
    answer: 'Scalular is a global sourcing and manufacturing platform connecting brands, retailers, and factories through a vetted production network across multiple countries and categories.',
  },
  {
    question: 'Is there a subscription or joining fee?',
    answer: 'No. There are no subscription fees or upfront charges to join or work with Scalular.',
  },
  {
    question: 'How does Scalular ensure transparency?',
    answer: 'We maintain clear visibility across pricing, production status, compliance, timelines, and factory capabilities to ensure aligned expectations throughout the process.',
  },
  {
    question: 'Is my data and product information confidential?',
    answer: 'Yes. All tech packs, pricing, product details, and business information shared with Scalular are handled confidentially and only shared with relevant production partners when required.',
  },
  {
    question: 'Are all factories audited and verified?',
    answer: 'We work with factories that meet defined compliance, capability, and quality standards. Many facilities within the network hold certifications such as WRAP, SMETA, BSCI, SLCP, GOTS, and OEKO-TEX.',
  },
  {
    question: 'How are production partners selected?',
    answer: 'Factories are matched based on category expertise, manufacturing intent, pricing competitiveness, compliance requirements, capacity, lead times, and technical capabilities.',
  },
  {
    question: 'Can Scalular support both low and high MOQs?',
    answer: 'Yes. We support a wide range of production scales depending on the category, complexity, and factory capability.',
  },
  {
    question: 'Which countries does Scalular operate in?',
    answer: 'Our production network spans India, Bangladesh, Vietnam, China, Sri Lanka, Kenya, and other strategic sourcing regions.',
  },
  {
    question: 'What categories does Scalular support?',
    answer: 'We support apparel, innerwear, knitwear, denim, childrenswear, outerwear, accessories, home textiles, and lifestyle products.',
  },
  {
    question: 'Does Scalular support FOB programs?',
    answer: 'Yes. We support FOB production models depending on the sourcing structure and destination market.',
  },
];

export default function AboutPage() {
  // Track window scroll directly to avoid position:static warnings on container ref
  const { scrollYProgress } = useScroll({ offset: ["start start", "end end"] });

  // Cinematic scroll transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);



  // Image scales from a constrained card to full-bleed cinematic width
  const imageScale = useTransform(scrollYProgress, [0.05, 0.2], [0.9, 1.1]);
  const imageRadius = useTransform(scrollYProgress, [0.05, 0.2], ['24px', '0px']);

  return (
    <main id="main-content" className="flex flex-col min-h-screen relative selection:bg-[#043377]/30 selection:text-[#043377]">

      {/* ── Fixed Background Layer (matching homepage bg-background) ── */}
      <div className="fixed inset-0 bg-background z-[-2] pointer-events-none" />

      {/* ── Hero (Light Mode) ─────────────────────────────────────────────── */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative pt-24 pb-12 md:pt-48 md:pb-36 px-6 md:px-12 flex flex-col items-center justify-center min-h-[80vh] z-10"
      >

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-8xl lg:text-[7rem] font-black text-[#0F172A] leading-[0.95] tracking-tighter mb-8"
          >
            Where Global Apparel<br />
            Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#171B2E] to-[#043377]">Agile Execution.</span>
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
      <div className="relative z-20 text-slate-900 pb-32 pt-20">

        {/* ── Mission & Stats ──────────────────────────────────────────── */}
        <section className="py-12 md:py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#043377]"></span> Our Mission & Vision
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
                Making Global Manufacturing <span className="text-[#043377]">Seamless.</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                <div>
                  Scalular is built to bridge the gap between buyers and factories through faster sourcing, transparent pricing, and agile execution.
                </div>
                <div>
                  With decades of experience in apparel manufacturing and global sourcing, we are in the process of reinventing the entire production lifecycle from instant quotations and factory matching to live order tracking and final delivery making the whole manufacturing lifecyle certain.
                </div>
                <div>
                  Our network of pre-vetted manufacturing partners, on-ground teams, and compliance-driven processes ensures quality, speed, and confidence at every stage.
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
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.8)' }}
                  className="bg-white/40 border border-slate-200/50 backdrop-blur-md rounded-3xl p-6 md:p-8 text-center transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-[#043377] mx-auto mb-4 opacity-80" />
                  <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                    <AnimatedCounter target={target} suffix={suffix} />
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ─────────────────────────────────────── */}
        <section className="py-12 md:py-24 px-6 md:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-[#043377]"></span> What Sets Us Apart
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tighter"
              >
                Why <span className="text-[#043377]">Choose Us?</span>
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
                    whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.8)' }}
                    className="bg-white/40 border border-slate-200/50 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/80 border border-slate-200/60 shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out">
                      <Icon className="w-7 h-7" style={{ color: v.color }} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">{v.title}</h3>
                    <div className="text-slate-600 leading-relaxed text-base md:text-lg font-light">{v.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Sustainability ────────────────────────────────────── */}
        <section className="py-12 md:py-24 px-6 md:px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 md:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6"
              >
                <span className="w-8 h-[2px] bg-[#043377]"></span>
                Sustainability
                <span className="w-8 h-[2px] bg-[#043377]"></span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter max-w-4xl mx-auto leading-[1.05]"
              >
                The Next Step in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#043377] to-[#727cb1]">Sustainable Manufacturing</span>
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
                    whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.8)' }}
                    className="bg-white/40 border border-slate-200/50 backdrop-blur-sm rounded-[2rem] p-8 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/80 border border-slate-200/60 shadow-sm group-hover:rotate-12 transition-transform duration-500 ease-out">
                      <Icon className="w-7 h-7" style={{ color: s.color }} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{s.title}</h3>
                    <div className="text-slate-600 leading-relaxed text-base font-light">{s.description}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Supplier Network ──────────────────────────────────── */}
        <section className="py-12 md:py-24 px-6 md:px-12 bg-white/20 border-t border-b border-slate-200/50">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-6 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#043377]"></span> Robust Supplier Network
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.05] mb-8">
                Powered by <br className="hidden md:block" /><span className="text-[#043377]">25+ Audited Manufacturing Partners.</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed font-light">
                <p>
                  Our network of trusted factories spans global sourcing hubs, specializing in apparel production across categories from knitwear to denim and beyond.
                </p>
                <p>
                  Every factory we work with is at least SEDEX 4-Pillar certified, along with additional compliance standards such as SLCP, WRAP, BSCI, GOTS, OEKO-TEX, and more, ensuring ethical production, verified quality, and global compliance.
                </p>
                <p>
                  From sourcing and sampling to cutting, stitching, finishing, packaging, factoring, and final delivery, our end-to-end production ecosystem is built for speed, scale, and agile execution.
                </p>
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
                  className="bg-white/40 border border-slate-200/50 rounded-3xl p-6 text-center hover:bg-white/60 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-[#043377] mx-auto mb-4" />
                  <div className="text-lg font-black text-slate-900 tracking-tight mb-1">{item.label}</div>
                  <div className="text-sm text-slate-500 font-light">{item.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Location ─────────────────────────────────────────── */}
        <section className="py-12 md:py-24 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 text-[11px] font-black tracking-[0.4em] uppercase text-[#043377] mb-8"
            >
              <span className="w-8 h-[2px] bg-[#043377]"></span> Global Offices <span className="w-8 h-[2px] bg-[#043377]"></span>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/40 border border-slate-200/50 p-10 rounded-[2rem]"
              >
                <Building2 className="w-8 h-8 text-[#043377] mb-6" />
                <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Sourcing Headquarters</h3>
                <div className="text-xl text-slate-700 mb-6 font-light">Tiruppur, India</div>
                <div className="text-slate-600 font-light mb-1">1/422 Green Avenue, Kozhippannai,</div>
                <div className="text-slate-600 font-light">Mangalam Road, Tiruppur – 641687</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/40 border border-slate-200/50 p-10 rounded-[2rem]"
              >
                <Globe className="w-8 h-8 text-[#727cb1] mb-6" />
                <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Corporate LLC</h3>
                <div className="text-xl text-slate-700 mb-6 font-light">Dubai, UAE</div>
                <div className="text-slate-600 font-light mb-1">Central Business District,</div>
                <div className="text-slate-600 font-light">contactus@scalular.com · +91 8920029744</div>
              </motion.div>
            </div>
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

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="py-16 md:py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-[0.95]"
            >
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#043377] to-[#727cb1]">Partner?</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="text-slate-700 text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto"
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
                href="https://erp.scalular.shop/instant-quote"
                target="_blank"
              />
              <Link
                href="/partner"
                className="inline-flex items-center gap-3 text-slate-900 font-bold text-lg hover:text-[#043377] transition-colors group"
              >
                Become a Factory Partner
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#043377]/20 group-hover:translate-x-1 transition-all">
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
