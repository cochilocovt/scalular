export function SocialProof() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0D1830]/30 backdrop-blur-sm relative z-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <p className="text-sm font-medium text-text-secondary uppercase tracking-widest mb-8">
          Trusted by Forward-Thinking Brands & Manufacturers
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholders for logos representing fashion brands or generic shapes */}
           <div className="text-2xl font-bold font-serif text-white">VOGUE</div>
           <div className="text-2xl font-bold tracking-tighter text-white">H&M Group</div>
           <div className="text-2xl font-bold uppercase tracking-widest text-white">Zara</div>
           <div className="text-2xl font-bold font-mono text-white">Levi's</div>
           <div className="text-2xl font-bold italic text-white">ASOS</div>
        </div>
      </div>
    </section>
  );
}
