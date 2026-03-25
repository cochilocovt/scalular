import Image from 'next/image';
import logo from '@/assets/logo-white-horizontal.png';

export function Footer() {
  return (
    <footer className="bg-[#07111F] py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Scalular Logo" width={120} height={32} className="h-6 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-6 text-sm text-text-secondary">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="text-sm text-text-secondary">
          © {new Date().getFullYear()} Scalular. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
