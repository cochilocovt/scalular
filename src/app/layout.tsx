import type { Metadata } from 'next';
import { M_PLUS_Code_Latin } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const mPlusCodeLatin = M_PLUS_Code_Latin({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Scalular | Global Apparel Sourcing Infrastructure',
  description: 'Scalular helps brands discover, compare, and work with vetted apparel manufacturers faster, with more transparency and less sourcing chaos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mPlusCodeLatin.variable} antialiased dark`} suppressHydrationWarning>
      <body className="relative min-h-full flex flex-col bg-background text-text-primary font-sans" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
