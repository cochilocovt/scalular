import { Navbar } from '@/components/ui/Navbar';
import { ChaosToOrder } from '@/components/sections/ChaosToOrder';
import { ScrollStory } from '@/components/sections/ScrollStory';
import { ScalularServices } from '@/components/sections/ScalularServices';
import { CTASection } from '@/components/sections/CTASection';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { Globe } from 'lucide-react';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-primary/30 selection:text-white">
        <Navbar />
        {/* 1. Scroll-linked globe storytelling through regions — Now Hero Section */}
        <ScrollStory />
        {/* 2. Chaos → Order animation — secondary section */}
        <ChaosToOrder />
        {/* 3. Detailed Services Portfolio */}
        <ScalularServices />
        {/* 4. Final conversion CTA */}
        <CTASection />
        
        <footer className="bg-[#07111F] py-12 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-white tracking-tight">Scalular</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-secondary font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm text-text-secondary">
              © 2026 Scalular. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
