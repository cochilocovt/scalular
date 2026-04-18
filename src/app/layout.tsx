import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, Urbanist } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { SharedFooter } from '@/components/ui/SharedFooter';
import { SmoothScroll } from '@/components/ui/SmoothScroll';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const urbanist = Urbanist({
  variable: '--font-brand',
  subsets: ['latin'],
  weight: ['300', '400'],
});

export const metadata: Metadata = {
  title: 'Scalular | Global Apparel Sourcing, Simplified',
  description: 'Scalular helps brands discover, compare, and work with vetted apparel manufacturers faster, with more transparency and less sourcing chaos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable} ${urbanist.variable} antialiased light`} suppressHydrationWarning>
      <body className="relative min-h-full flex flex-col bg-background text-text-primary font-sans" suppressHydrationWarning>
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-surface focus:text-primary focus:border focus:border-border focus:top-4 focus:left-4 focus:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <SharedFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
