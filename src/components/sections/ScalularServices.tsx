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
  ArrowRight
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: 1,
    title: "Instant Quote",
    date: "FAST",
    content: "Get a price in seconds. No waiting, no back-and-forth emails with factories you've never met.",
    category: "Core",
    icon: Zap,
    relatedIds: [2, 8],
    status: "completed" as const,
    energy: 98,
  },
  {
    id: 2,
    title: "Factory-Direct Pricing",
    date: "SAVINGS",
    content: "Pay what the factory charges — no broker fees, no markups. Our volume gets you the best rates.",
    category: "Financial",
    icon: DollarSign,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 94,
  },
  {
    id: 3,
    title: "Flexible Payments",
    date: "CASHFLOW",
    content: "Don't pay everything upfront. Spread your production costs with terms that keep your cash free.",
    category: "Financial",
    icon: ShieldCheck,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "115+ Verified Factories",
    date: "NETWORK",
    content: "Browse 115+ factories across 9 countries — each pre-vetted and matched to your product type.",
    category: "Infrastructure",
    icon: Globe,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 5,
    title: "Certified Quality",
    date: "TRUST",
    content: "Every factory is audited and certified — GOTS, OEKO-TEX, and more. Quality you can show your customers.",
    category: "Compliance",
    icon: FileCheck,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 6,
    title: "Full Transparency",
    date: "CLARITY",
    content: "See where your order is at every stage — from cutting room to shipping container. No surprises.",
    category: "Data",
    icon: Search,
    relatedIds: [5, 8],
    status: "in-progress" as const,
    energy: 78,
  },
  {
    id: 7,
    title: "On-The-Ground Team",
    date: "LOCAL",
    content: "Our people are in the factory with yours. Issues caught and fixed before they ever reach you.",
    category: "Support",
    icon: Users,
    relatedIds: [4, 8],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 8,
    title: "Live Order Updates",
    date: "TRACKING",
    content: "Real-time status on sampling, production, and shipping. Always know exactly where your order stands.",
    category: "Data",
    icon: Activity,
    relatedIds: [1, 6, 7],
    status: "completed" as const,
    energy: 88,
  },
];

export function ScalularServices() {
  return (
    <section className="relative min-h-screen bg-transparent py-24 overflow-hidden">
      <div className="absolute inset-0 bg-background -z-20" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col">
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-8"
          >
            What You Get
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-text-primary leading-tight mb-8 tracking-tighter"
          >
            Everything to <br/><span className="text-gradient">Source Smarter</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary leading-relaxed max-w-xl font-medium"
          >
            Find factories, get quotes, and track orders — all in one place. No middlemen, no surprises.
          </motion.p>
        </div>

        <div className="flex-grow min-h-[700px]">
          <RadialOrbitalTimeline timelineData={servicesData} />
        </div>
      </div>
    </section>
  );
}
