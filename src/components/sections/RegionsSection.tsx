'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { MapPin } from 'lucide-react';

const regions = [
  {
    country: "India",
    specialty: "Cotton, Knitwear, Embroidery",
    description: "Deep expertise in intricate embellishments and sustainable cotton fabrics.",
    activeFactories: 24
  },
  {
    country: "Bangladesh",
    specialty: "Basics, Volume Production",
    description: "Unmatched scale and efficiency for high-volume jersey and woven basics.",
    activeFactories: 42
  },
  {
    country: "Turkey",
    specialty: "Premium Fashion & Speed",
    description: "Fast-fashion turnaround times with premium cut-and-sew capabilities.",
    activeFactories: 18
  },
  {
    country: "Vietnam",
    specialty: "Technical & Performance",
    description: "Advanced machinery and skillsets for outerwear and performance activewear.",
    activeFactories: 31
  }
];

export function RegionsSection() {
  return (
    <section id="regions" className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto relative z-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Global Reach. Local Expertise.</h2>
          <p className="text-lg text-text-secondary">Source from specialized regions matched perfectly to your product construction and volume requirements.</p>
        </div>
        <div className="text-sm border border-white/10 px-4 py-2 rounded-full text-text-secondary bg-[#0D1830] backdrop-blur flex items-center gap-2 w-max">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> 115+ Active Network Facilities
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {regions.map((region, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full border-t border-t-white/10 bg-gradient-to-b from-white/5 to-transparent">
               <div className="flex items-start justify-between mb-6">
                 <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-semibold text-white/80 flex items-center gap-1.5 border border-white/10">
                   <MapPin className="w-3 h-3 text-primary" /> {region.country}
                 </div>
                 <div className="text-xs text-text-secondary font-mono">
                   {region.activeFactories} partners
                 </div>
               </div>
               <h3 className="text-lg font-bold text-white mb-2">{region.specialty}</h3>
               <p className="text-sm text-text-secondary leading-relaxed">{region.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
