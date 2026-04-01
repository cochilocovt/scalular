import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Scalular | Global Apparel Sourcing',
  description:
    'Scalular bridges fashion brands and verified factories worldwide. 20+ years of expertise, 30+ factory partners across 9 countries, 3000+ orders completed.',
  openGraph: {
    title: 'About Scalular | Global Apparel Sourcing',
    description:
      'Scalular bridges fashion brands and verified factories worldwide. 20+ years of expertise, 30+ factory partners across 9 countries.',
    url: 'https://scalular.com/about',
    siteName: 'Scalular',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
