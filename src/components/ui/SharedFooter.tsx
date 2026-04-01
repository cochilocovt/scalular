import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo-black-horizontal.png';

export function SharedFooter() {
  return (
    <footer className="bg-surface py-12 px-6 md:px-12 border-t border-divider">
      <div className="max-w-[1600px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-2">
            <Link href="/">
              <Image src={logo} alt="Scalular" width={130} height={36} className="h-9 w-auto" />
            </Link>
            <p className="text-xs text-text-secondary font-medium max-w-[220px]">
              Simplified. Streamlined. Sourced.
            </p>
          </div>

          {/* Nav columns */}
          <div className="flex flex-wrap gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-widest uppercase text-text-secondary/60 mb-1">Company</span>
              <Link href="/about" className="text-text-secondary hover:text-primary transition-colors">About Us</Link>
              <Link href="/partner" className="text-text-secondary hover:text-primary transition-colors">Become a Partner</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-widest uppercase text-text-secondary/60 mb-1">Product</span>
              <Link href="/#regions" className="text-text-secondary hover:text-primary transition-colors">Our Network</Link>
              <Link href="/#cta" className="text-text-secondary hover:text-primary transition-colors">Get a Quote</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black tracking-widest uppercase text-text-secondary/60 mb-1">Legal</span>
              <Link href="#" className="text-text-secondary hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-text-secondary hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="text-text-secondary hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 border-t border-divider flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary/60">© 2026 Scalular. All rights reserved.</p>
          <p className="text-xs text-text-secondary/40">Based in Tiruppur, India · contactus@scalular.com</p>
        </div>
      </div>
    </footer>
  );
}
