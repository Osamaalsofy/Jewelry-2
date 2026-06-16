import { Facebook, Instagram, Search } from 'lucide-react';

interface FooterProps {
  scrollToSection: (id: string) => void;
  setFilteredCategory: (cat: string) => void;
  onNavigate: (view: string) => void;
}

export default function Footer({ scrollToSection, setFilteredCategory, onNavigate }: FooterProps) {
  return (
    <footer className="bg-greige text-charcoal select-none relative pt-16 pb-8 border-t border-charcoal/10">
      <div className="max-w-[1600px] mx-auto px-6 space-y-16">
        
        {/* Top Segment: Navigation & socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-charcoal/10 pb-10">
          
          {/* Left: Category shortcuts */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-sans text-xs tracking-widest font-medium text-charcoal/60">
            {['RINGS', 'EARRINGS', 'NECKLACES', 'BRACELETS'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onNavigate(cat.toLowerCase());
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-charcoal hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right: Circular Social Media Accounts */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Instagram size={14} />, name: 'Instagram' },
              { icon: <Facebook size={14} />, name: 'Facebook' },
              { icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387-.1-.986-.19-2.502.04-3.58.206-.922 1.332-5.64 1.332-5.64s-.34-.68-.34-1.68c0-1.574.913-2.75 2.048-2.75.966 0 1.432.725 1.432 1.595 0 .972-.618 2.425-.938 3.772-.267 1.127.566 2.046 1.677 2.046 2.013 0 3.56-2.123 3.56-5.186 0-2.712-1.95-4.608-4.732-4.608-3.223 0-5.115 2.417-5.115 4.914 0 .973.375 2.017.844 2.586.092.112.106.21.078.322-.086.357-.277 1.13-.314 1.285-.05.203-.163.246-.376.147-1.402-.653-2.278-2.704-2.278-4.35 0-3.539 2.571-6.79 7.412-6.79 3.89 0 6.913 2.772 6.913 6.476 0 3.864-2.437 6.974-5.82 6.974-1.136 0-2.203-.59-2.569-1.29l-.697 2.653c-.252.973-.933 2.193-1.39 2.943 1.123.347 2.313.535 3.545.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/></svg>, name: 'Pinterest' }
            ].map((soc) => (
              <a
                key={soc.name}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full border border-charcoal/10 hover:border-gold hover:bg-charcoal hover:text-alabaster flex items-center justify-center transition-all cursor-pointer"
                title={soc.name}
              >
                {soc.icon}
              </a>
            ))}
          </div>

        </div>

        {/* Middle Segment: MASSIVE Brand Signature "CELESTIQUE" */}
        <div className="w-full text-center select-none overflow-hidden relative py-4">
          <h2 className="font-serif text-[8.5vw] xs:text-[9vw] sm:text-[9.5vw] md:text-[10vw] lg:text-[10vw] xl:text-[132px] leading-none tracking-[0.05em] sm:tracking-[0.11em] text-charcoal/90 translate-x-[0.04em] inline-flex items-center justify-center font-normal whitespace-nowrap">
            CEL
            <span className="relative inline-flex items-center">
              E
              <svg className="absolute -top-1.5 sm:-top-2 lg:-top-3.5 left-2 sm:left-4 lg:left-8 w-[2vw] h-[2vw] xl:w-7 xl:h-7 text-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </span>
            STI
            <span className="relative inline-flex items-center">
              Q
              <svg className="absolute -top-2.5 sm:-top-3 lg:-top-4.5 left-3 sm:left-5 lg:left-10 w-[2vw] h-[2vw] xl:w-7 xl:h-7 text-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </span>
            UE
          </h2>
        </div>

        {/* Bottom Segment: Corporate Links, Brand Info & Copyright */}
        <div className="border-t border-charcoal/10 pt-10 flex flex-col gap-8">
          
          {/* Main bottom list */}
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-4 text-xs font-sans tracking-wider text-charcoal/50">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <button 
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="hover:text-charcoal cursor-pointer"
              >
                Our Story
              </button>
              <span className="hover:text-charcoal cursor-pointer">Materials</span>
              <span className="hover:text-charcoal cursor-pointer">Sustainability</span>
              <span className="hover:text-charcoal cursor-pointer">Shipping &amp; Returns</span>
              <span className="hover:text-charcoal cursor-pointer">FAQs</span>
              <span className="hover:text-charcoal cursor-pointer">Contact Us</span>
            </div>

            <div className="flex gap-6">
              <span className="hover:text-charcoal cursor-pointer">Privacy Policy</span>
              <span className="hover:text-charcoal cursor-pointer">Terms of Service</span>
            </div>
          </div>

          {/* Genuine copyright line */}
          <div className="text-center font-sans text-[10px] tracking-[0.3em] text-charcoal/40 uppercase">
            © 2026 Celestique Jewelry. All rights reserved. Made in Europe.
          </div>

        </div>

      </div>
    </footer>
  );
}
