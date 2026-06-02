import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit, Geist } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { SharedFooter } from '@/components/ui/SharedFooter';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { SectionScrollbar } from '@/components/ui/SectionScrollbar';
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-display-custom',
  subsets: ['latin'],
  preload: false,
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: false,
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
    <html lang="en" className={cn("antialiased", "light", plusJakartaSans.variable, "font-sans", geist.variable)} suppressHydrationWarning>
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
          <SectionScrollbar />
          <SharedFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
