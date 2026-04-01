import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Become a Factory Partner | Scalular',
  description:
    'Join Scalular\'s verified factory network and connect with 200+ global fashion brands actively sourcing ethical, quality apparel manufacturing.',
  openGraph: {
    title: 'Become a Factory Partner | Scalular',
    description:
      'Join Scalular\'s verified factory network and connect with 200+ global fashion brands actively sourcing ethical, quality apparel manufacturing.',
    url: 'https://scalular.com/partner',
    siteName: 'Scalular',
    type: 'website',
  },
};

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
