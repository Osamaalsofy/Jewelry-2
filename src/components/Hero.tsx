import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onCategoryClick: (categoryName: string) => void;
  onDiscoverClick: () => void;
}

export default function Hero({ onCategoryClick, onDiscoverClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax values for the center image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth springs for high-end luxury lag effect
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: 60, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate normalized mouse positions (-1 to 1) relative to container center
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Map to 3-6px maximum subtle parallax movement
      mouseX.set(x * 12);
      mouseY.set(y * 12);

      // Map to 3D tilt rotation
      rotateX.set(-y * 10);
      rotateY.set(x * 10);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      rotateX.set(0);
      rotateY.set(0);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseX, mouseY, rotateX, rotateY]);

  return (
    <section 
      ref={containerRef} 
      className="relative max-w-[1600px] mx-auto px-6 pt-10 pb-20 md:pb-28 overflow-hidden select-none"
    >
      {/* Massive Brand Showcase Header - Replicating "CELESTIQUE" */}
      <div className="w-full text-center mb-6 md:mb-10 relative overflow-hidden">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
          className="relative inline-block w-full"
        >
          <h2 
            style={{ paddingLeft: '0px', paddingTop: '30px', paddingBottom: '20px' }}
            className="font-serif text-[8.5vw] xs:text-[9vw] sm:text-[9.5vw] md:text-[10vw] lg:text-[10vw] xl:text-[132px] leading-[0.8] tracking-[0.05em] sm:tracking-[0.11em] text-charcoal font-normal flex items-center select-none justify-center translate-x-[0.04em] whitespace-nowrap"
          >
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
        </motion.div>
      </div>

      {/* Hero 3-Column Campaign Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Year, Description & Pill Action */}
        <div className="lg:col-span-3 flex flex-col items-start text-left space-y-6 lg:space-y-8 order-2 lg:order-1 lg:pr-4">
          {/* Interactive Lottie Campaign Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-[140px] h-[140px] relative -ml-4 flex items-center justify-center select-none pointer-events-none filter drop-shadow-sm"
            dangerouslySetInnerHTML={{
              __html: `<dotlottie-wc src="https://lottie.host/7b635083-8f74-4b0c-b70f-e53f49006e44/e428rRGYAz.lottie" style="width: 140px; height: 140px" autoplay loop></dotlottie-wc>`
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1.0 }}
            className="space-y-2.5"
          >
            <span className="font-serif text-3xl md:text-4xl text-charcoal tracking-wide font-light border-b border-charcoal/10 pb-2 block">
              COLLECTION <br />
              <span className="font-semibold text-gold">2025</span>
            </span>
            <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xs mt-4">
              Discover exquisite jewelry inspired by the beauty of the heavens. Each piece is crafted to bring elegance and grace to your most cherished occasions.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            onClick={onDiscoverClick}
            className="group relative inline-flex items-center gap-3.5 bg-charcoal hover:bg-gold py-3.5 px-7 rounded-full text-alabaster text-xs tracking-[0.2em] font-sans font-medium transition-all duration-300 transform outline-none border border-transparent shadow-sm cursor-pointer"
          >
            DISCOVER
            <motion.span 
              className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
            >
              ➔
            </motion.span>
          </motion.button>
        </div>

        {/* CENTER COLUMN: Central Large Campaign Image with smooth parallax and 3D tilts */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2 my-4 md:my-0" style={{ perspective: '1200px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} 
            style={{ 
              x: springX, 
              y: springY, 
              rotateX: springRotateX, 
              rotateY: springRotateY,
              transformStyle: 'preserve-3d'
            }}
            whileHover={{ scale: 1.03 }}
            className="relative w-full max-w-[420px] aspect-[3/4] overflow-hidden rounded-[130px] border border-charcoal/10 shadow-[0_35px_70px_-15px_rgba(26,26,26,0.15)] bg-greige/20 transition-shadow duration-500 hover:shadow-[0_50px_90px_-20px_rgba(183,154,107,0.3)]"
          >
            {/* The model hand image */}
            <img
              src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200"
              alt="Celestique Editorial Hand Holding Gold Jewelry"
              className="w-full h-full object-cover select-none pointer-events-none scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Subtle luxury ambient shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gold/5 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-color-burn" />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Editorial subtitle and Category Quick Navigation */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-12 lg:space-y-16 order-3 lg:order-3 lg:pl-4">
          
          {/* Celestial Touch Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1.0 }}
            className="text-right"
          >
            <p className="font-serif text-lg md:text-2xl italic tracking-wide text-charcoal/80 max-w-[280px] ml-auto leading-relaxed">
              &ldquo;A celestial touch for timeless moments&rdquo;
            </p>
          </motion.div>

          {/* Quick Categories Navigation */}
          <div className="space-y-1">
            <span className="block text-[10px] tracking-[0.25em] font-sans text-gold font-medium mb-3 border-b border-charcoal/5 pb-2 text-right">
              EXPLORE LUXURY CATEGORIES
            </span>
            <div className="flex flex-col border-t border-charcoal/5">
              {['RINGS', 'EARRINGS', 'NECKLACES', 'BRACELETS'].map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1), duration: 0.6 }}
                  onClick={() => onCategoryClick(cat)}
                  className="group flex items-center justify-between py-4 border-b border-charcoal/5 text-left text-xs md:text-sm font-sans tracking-[0.25em] text-charcoal hover:text-gold transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-charcoal/30 group-hover:text-gold transition-colors font-mono">0{idx+1}</span>
                    <span className="font-medium group-hover:translate-x-2 transition-transform duration-300">{cat}</span>
                  </div>
                  <motion.div 
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300"
                  >
                    <ArrowRight size={14} className="text-charcoal group-hover:text-gold" />
                  </motion.div>
                </motion.button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Decorative luxury hairline separators */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-charcoal/5" />
    </section>
  );
}
