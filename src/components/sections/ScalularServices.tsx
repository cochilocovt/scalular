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
    title: "Instant Quotation",
    date: "VELOCITY",
    content: "Get pricing in seconds with AI-powered accuracy. Eliminate the weeks of back-and-forth typical of traditional sourcing.",
    category: "Core",
    icon: Zap,
    relatedIds: [2, 8],
    status: "completed" as const,
    energy: 98,
  },
  {
    id: 2,
    title: "Competitive Pricing",
    date: "EFFICIENCY",
    content: "Direct-from-factory rates with zero hidden broker margins. Our scale unlocks tier-1 pricing for brands of all sizes.",
    category: "Financial",
    icon: DollarSign,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 94,
  },
  {
    id: 3,
    title: "Reliable Factoring",
    date: "SECURITY",
    content: "Secure your production without risking your own capital. flexible payment terms that keep your cash flow healthy.",
    category: "Financial",
    icon: ShieldCheck,
    relatedIds: [2, 5],
    status: "in-progress" as const,
    energy: 85,
  },
  {
    id: 4,
    title: "Large Supplier Network",
    date: "NETWORK",
    content: "Access 115+ pre-audited factories across 9 countries. Instantly find the perfect match for any product category.",
    category: "Infrastructure",
    icon: Globe,
    relatedIds: [5, 7],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 5,
    title: "Certified Factories",
    date: "QUALITY",
    content: "GOTS, OEKO-TEX, and social compliance built-in. Every partner in our network meets the highest global standards.",
    category: "Compliance",
    icon: FileCheck,
    relatedIds: [4, 6],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 6,
    title: "Traceability",
    date: "INTEGRITY",
    content: "Full visibility from fiber to finished garment. Digital trail for every SKU to meet modern consumer transparency demands.",
    category: "Data",
    icon: Search,
    relatedIds: [5, 8],
    status: "in-progress" as const,
    energy: 78,
  },
  {
    id: 7,
    title: "On-Site Support",
    date: "LOCAL",
    content: "Local merchandising and QC teams in every sourcing region. We are your eyes and ears on the factory floor.",
    category: "Support",
    icon: Users,
    relatedIds: [4, 8],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 8,
    title: "Order Tracking",
    date: "VISIBILITY",
    content: "Real-time updates on sampling, production, and shipping. No more black holes in your supply chain.",
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
      <div className="absolute inset-0 bg-[#020617] -z-20" />
      
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
            Capabilities Portfolio
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter"
          >
            The Scalular <br/><span className="text-gradient">Ecosystem</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary leading-relaxed max-w-xl font-medium"
          >
            A fully integrated manufacturing operating system designed to turn sourcing chaos into a streamlined, high-velocity advantage.
          </motion.p>
        </div>

        <div className="flex-grow min-h-[700px]">
          <RadialOrbitalTimeline timelineData={servicesData} />
        </div>
      </div>
    </section>
  );
}
