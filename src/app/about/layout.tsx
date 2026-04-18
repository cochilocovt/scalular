import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Scalular | Where Global Apparel Meets Ethical Innovation',
  description:
    'Scalular revolutionizes apparel sourcing with an instant quotation system, ethical and sustainable manufacturing. 20+ years of experience, 3000+ orders completed, 30+ certified factories, 50+ satisfied clients.',
  openGraph: {
    title: 'About Us: Learn More About Scalular\'s Vision',
    description:
      'Scalular revolutionizes apparel sourcing with an instant quotation system, ethical and sustainable manufacturing. Connect with trusted factories today.',
    url: 'https://scalular.com/about',
    siteName: 'Scalular',
    type: 'website',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
