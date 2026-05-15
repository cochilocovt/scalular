"use client";

import { useState } from "react";
import {
  Zap,
  DollarSign,
  ShieldCheck,
  Globe,
  FileCheck,
  Search,
  Users,
  Activity,
  MessageSquare,
  Truck,
  Award,
  TrendingUp
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: 1,
    title: "Instant Quote",
    content: "AI-powered pricing in seconds, calculated using real manufacturing inputs, not assumptions.",
    category: "Core",
    icon: Zap,
    relatedIds: [2, 8],
  },
  {
    id: 2,
    title: "Factory-Direct Pricing",
    content: "Factory-level pricing with a minimal, transparent markup for sourcing, execution, and on-ground support. No surprises, just better pricing, better control, and reliable delivery.",
    category: "Financial",
    icon: DollarSign,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Flexible Payments",
    content: "Multiple payment options backed by factoring, helping buyers manage credit flow while ensuring factories get paid efficiently and on time.  Built for smoother transactions, stronger trust, and uninterrupted production flows.",
    category: "Financial",
    icon: ShieldCheck,
    relatedIds: [2, 5],
  },
  {
    id: 4,
    title: "25+ Verified Factories",
    content: "Browse 25+ factories across 4 countries each pre-audited and matched to your product type.",
    category: "Network",
    icon: Globe,
    relatedIds: [5, 7],
  },
  {
    id: 5,
    title: "Certified Quality",
    content: "We work exclusively with factories that are at least SEDEX 4-Pillar certified, along with additional compliance standards such as SLCP, WRAP, BSCI, GOTS, OEKO-TEX, and more. This ensures ethical production, verified quality standards, and the confidence to deliver products your customers can trust.",
    category: "Compliance",
    icon: FileCheck,
    relatedIds: [4, 6],
  },
  {
    id: 6,
    title: "Full Transparency",
    content: "Complete lifecycle of a product from raw materials to packaging ensuring sustainability at every key stage.",
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
    content: "Track every stage of production in real time from sampling and approvals to manufacturing, dispatch, and delivery. Complete visibility across your order lifecycle, so you always know exactly where production stands and what comes next.",
    category: "Tracking",
    icon: Activity,
    relatedIds: [1, 6, 7],
  },
];

const factoryServicesData = [
  {
    id: 11,
    title: "Global Brands",
    content: "Get matched with verified global brands that fit your production capabilities and MOQ.",
    category: "Network",
    icon: Globe,
    relatedIds: [12, 18],
  },
  {
    id: 12,
    title: "Guaranteed Payments",
    content: "Multiple payment options backed by factoring, helping factories manage credit flow while ensuring they get paid efficiently and on time. Built for smoother transactions, stronger trust, and uninterrupted production flows.",
    category: "Financial",
    icon: ShieldCheck,
    relatedIds: [11, 13],
  },
  {
    id: 13,
    title: "Clear Tech Packs",
    content: "Receive standardized, complete tech packs that eliminate guesswork and sample iterations.",
    category: "Production",
    icon: FileCheck,
    relatedIds: [12, 14],
  },
  {
    id: 14,
    title: "Direct Communication",
    content: "Centralized messaging with brands. No scattered WhatsApp chats or lost emails.",
    category: "Operations",
    icon: MessageSquare,
    relatedIds: [13, 15],
  },
  {
    id: 15,
    title: "Streamlined Logistics",
    content: "Manage your pricing, production, payments, shipping & communication all in one platform",
    category: "Shipping",
    icon: Truck,
    relatedIds: [14, 16],
  },
  {
    id: 16,
    title: "Production Tools",
    content: "Free software to manage your production line, update milestones, and track progress.",
    category: "Software",
    icon: Activity,
    relatedIds: [15, 17],
  },
  {
    id: 17,
    title: "Showcase Certifications",
    content: "Highlight your compliance, sustainability, and quality certifications to premium brands.",
    category: "Trust",
    icon: Award,
    relatedIds: [16, 18],
  },
  {
    id: 18,
    title: "Consistent Orders",
    content: "Build long-term relationships with brands for recurring orders and steady growth.",
    category: "Growth",
    icon: TrendingUp,
    relatedIds: [11, 17],
  },
];

export function ScalularServices() {
  const [activeTab, setActiveTab] = useState<"brands" | "factories">("brands");

  return (
    <section id="services" className="relative bg-transparent py-10 md:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-background -z-20" />

      {/* Subtle background — toned down from the original */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2 p-1.5 bg-surface border border-border/50 rounded-full w-fit mb-6 md:mb-8 relative z-20 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab("brands")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "brands"
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100"
              : "text-text-secondary hover:text-text-primary hover:bg-surface-hover scale-95"
              }`}
          >
            For Brands
          </button>
          <button
            onClick={() => setActiveTab("factories")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "factories"
              ? "bg-primary text-white shadow-lg shadow-primary/20 scale-100"
              : "text-text-secondary hover:text-text-primary hover:bg-surface-hover scale-95"
              }`}
          >
            For Factories
          </button>
        </div>

        {/* Header — left-aligned for Linear feel */}
        <div className="max-w-2xl mb-4 md:mb-6 h-auto">
          <motion.p
            key={`subtitle-${activeTab}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2"
          >
            {activeTab === "brands" ? "What You Get" : "Partner With Us"}
          </motion.p>

          <motion.h2
            key={`title-${activeTab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-2xl md:text-3xl font-bold text-text-primary leading-tight mb-2 tracking-tighter"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {activeTab === "brands" ? (
              <>Everything you need to source, manage, and <span className="text-primary">deliver seamlessly</span></>
            ) : (
              <>Everything you need to <span className="text-primary">grow your factory</span></>
            )}
          </motion.h2>
        </div>

        {/* Orbital timeline */}
        <div className="w-full">
          <RadialOrbitalTimeline
            key={activeTab}
            timelineData={activeTab === "brands" ? servicesData : factoryServicesData}
          />
        </div>
      </div>
    </section>
  );
}
