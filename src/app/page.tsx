import { ScrollStory } from '@/components/sections/ScrollStory';
import { TrustGallery } from '@/components/sections/TrustGallery';
import { ShowcaseSection } from '@/components/sections/ShowcaseSection';
import { ScalularServices } from '@/components/sections/ScalularServices';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-primary/20 selection:text-primary">
      {/* 1. Hero — split layout with globe + immediate CTA */}
      <ScrollStory />
      {/* 2. Product catalogue, certifications, client logos */}
      <ShowcaseSection />
      {/* 3. Trust Gallery — real factory photography */}
      <TrustGallery />
      {/* 4. Services — radial orbital timeline */}
      <ScalularServices />
      {/* 5. Final conversion CTA */}
      <CTASection />
    </main>
  );
}
