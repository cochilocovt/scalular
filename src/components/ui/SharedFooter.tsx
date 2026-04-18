import Link from 'next/link';
import Image from 'next/image';
import logoIcon from '@/assets/logo-icon.png';

export function SharedFooter() {
  return (
    <footer className="bg-primary py-12 px-6 md:px-12 border-t border-primary-foreground/10">
      <div className="max-w-[1600px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-3 group">
              <Image src={logoIcon} alt="Scalular Logo" width={44} height={44} className="h-10 w-10 object-contain transition-all duration-300 group-hover:scale-105" />
              <span className="text-primary-foreground text-xl font-light tracking-[0.25em] uppercase" style={{ fontFamily: 'var(--font-brand)' }}>
                Scalular
              </span>
            </Link>
            <p className="text-xs text-primary-foreground/70 font-medium max-w-[220px]">
              Simplified. Streamlined. Sourced.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/50 mb-1">Company</span>
              <Link href="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">About Us</Link>
              <Link href="/gallery" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Trust Gallery</Link>
              <Link href="/partner" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Become a Partner</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/50 mb-1">Product</span>
              <Link href="/#regions" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Our Network</Link>
              <Link href="/#cta" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Get a Quote</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-primary-foreground/50 mb-1">Legal</span>
              <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Terms of Service</Link>
              <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/50">© 2026 Scalular. All rights reserved.</p>
          <p className="text-xs text-primary-foreground/40">Built in Tiruppur — India&apos;s knitwear capital · contactus@scalular.com</p>
        </div>
      </div>
    </footer>
  );
}
