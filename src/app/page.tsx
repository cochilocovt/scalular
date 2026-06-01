import fs from 'fs';
import path from 'path';
import { ScrollStory } from '@/components/sections/ScrollStory';
import { TrustGallery } from '@/components/sections/TrustGallery';
import { ShowcaseSection } from '@/components/sections/ShowcaseSection';
import { ScalularServices } from '@/components/sections/ScalularServices';
import { CTASection } from '@/components/sections/CTASection';

interface LogoItem {
  id: string;
  category: string;
  src: string;
  alt: string;
}

function getTrustedByLogos(): LogoItem[] {
  const categories = ['collaborations', 'importers', 'certifications', 'stores'];
  const trustedByDir = path.join(process.cwd(), 'public/images/trusted_by');
  const logos: LogoItem[] = [];

  categories.forEach((category) => {
    const dirPath = path.join(trustedByDir, category);
    if (fs.existsSync(dirPath)) {
      try {
        const files = fs.readdirSync(dirPath);
        files.forEach((file, index) => {
          // Ignore hidden files like .DS_Store and ensure it is an image
          if (file && !file.startsWith('.') && /\.(png|jpe?g|gif|svg|webp)$/i.test(file)) {
            let alt = '';
            if (category === 'collaborations') alt = 'Brand Collaboration';
            else if (category === 'importers') alt = 'Major Importer';
            else if (category === 'certifications') alt = 'Certification';
            else if (category === 'stores') alt = 'Store Catered';

            logos.push({
              id: `${category}-${index}-${file}`,
              category,
              src: `/images/trusted_by/${category}/${file}`,
              alt,
            });
          }
        });
      } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err);
      }
    }
  });

  return logos;
}

export default function Home() {
  const trustedByLogos = getTrustedByLogos();

  return (
    <main id="main-content" className="flex flex-col min-h-screen bg-background text-text-primary selection:bg-primary/20 selection:text-primary">
      {/* 1. Hero — split layout with globe + immediate CTA */}
      <ScrollStory />
      {/* 2. Product catalogue, certifications, client logos */}
      <ShowcaseSection trustedByLogos={trustedByLogos} />
      {/* 3. Trust Gallery — real factory photography */}
      <TrustGallery />
      {/* 4. Services — radial orbital timeline */}
      <ScalularServices />
      {/* 5. Final conversion CTA */}
      <CTASection />
    </main>
  );
}
