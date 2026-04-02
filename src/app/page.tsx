import { ScrollStory } from '@/components/sections/ScrollStory';
import { ShowcaseSection } from '@/components/sections/ShowcaseSection';
import { ScalularServices } from '@/components/sections/ScalularServices';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-primary/20 selection:text-primary">
      {/* 1. Scroll-linked globe storytelling through regions */}
      <ScrollStory />
      {/* 2. Product catalogue, certifications, client logos */}
      <ShowcaseSection />
      {/* 3. Detailed Services Portfolio */}
      <ScalularServices />
      {/* 4. Final conversion CTA */}
      <CTASection />
    </main>
  );
}
