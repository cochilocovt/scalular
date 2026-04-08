"use client";

import { 
  Zap, 
  DollarSign, 
  ShieldCheck, 
  Globe, 
  FileCheck, 
  Search, 
  Users, 
  Activity,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: 1,
    title: "Instant Quote",
    content: "Get a price in seconds. No waiting, no back-and-forth emails with factories you've never met.",
    category: "Core",
    icon: Zap,
    relatedIds: [2, 8],
  },
  {
    id: 2,
    title: "Factory-Direct Pricing",
    content: "Pay what the factory charges — no broker fees, no markups. Our volume gets you the best rates.",
    category: "Financial",
    icon: DollarSign,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Flexible Payments",
    content: "Don't pay everything upfront. Spread your production costs with terms that keep your cash free.",
    category: "Financial",
    icon: ShieldCheck,
    relatedIds: [2, 5],
  },
  {
    id: 4,
    title: "115+ Verified Factories",
    content: "Browse 115+ factories across 9 countries — each pre-vetted and matched to your product type.",
    category: "Network",
    icon: Globe,
    relatedIds: [5, 7],
  },
  {
    id: 5,
    title: "Certified Quality",
    content: "Every factory is audited and certified — GOTS, OEKO-TEX, and more. Quality you can show your customers.",
    category: "Compliance",
    icon: FileCheck,
    relatedIds: [4, 6],
  },
  {
    id: 6,
    title: "Full Transparency",
    content: "See where your order is at every stage — from cutting room to shipping container. No surprises.",
    category: "Visibility",
    icon: Search,
    relatedIds: [5, 8],
  },
  {
    id: 7,
    title: "On-The-Ground Team",
    content: "Our people are in the factory with yours. Issues caught and fixed before they ever reach you.",
    category: "Support",
    icon: Users,
    relatedIds: [4, 8],
  },
  {
    id: 8,
    title: "Live Order Updates",
    content: "Real-time status on sampling, production, and shipping. Always know exactly where your order stands.",
    category: "Tracking",
    icon: Activity,
    relatedIds: [1, 6, 7],
  },
];

export function ScalularServices() {
  return (
    <section id="services" className="relative bg-transparent py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-background -z-20" />
      
      {/* Subtle background — toned down from the original */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header — left-aligned for Linear feel */}
        <div className="max-w-2xl mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3"
          >
            What You Get
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl md:text-5xl font-bold text-text-primary leading-tight mb-5 tracking-tighter"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Everything you need to{' '}
            <span className="text-primary">ship smarter</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-text-secondary leading-relaxed max-w-xl"
          >
            Source, quote, and deliver apparel — without the chaos. Click a service to learn more.
          </motion.p>
        </div>

        {/* Orbital timeline */}
        <div className="w-full">
          <RadialOrbitalTimeline timelineData={servicesData} />
        </div>
      </div>
    </section>
  );
}
