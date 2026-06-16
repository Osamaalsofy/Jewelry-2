import { motion } from 'motion/react';

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      id="about-section" 
      className="relative max-w-[1600px] mx-auto px-6 py-20 md:py-32 overflow-hidden bg-alabaster select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LEFT COLUMN: Large Title */}
        <div className="lg:col-span-4 text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.0 }}
          >
            <h3 
              style={{ paddingLeft: '0px', paddingRight: '0px', marginLeft: '0px' }}
              className="font-serif text-5xl xs:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[0.9] tracking-[0.05em] lg:tracking-[0.02em] xl:tracking-[0.05em] text-charcoal font-normal pl-0 pr-0 ml-0"
            >
              ABOUT <br />
              <span className="text-gold italic font-light">US</span>
            </h3>
            <div className="h-[1px] w-24 bg-gold/40 mt-6" />
          </motion.div>
        </div>

        {/* CENTER COLUMN: Sophisticated Paragraph Blocks (staggered) */}
        <div className="lg:col-span-4 text-left lg:pt-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="space-y-6 md:space-y-8 text-charcoal/80"
          >
            <motion.p variants={textVariants} className="font-serif text-xl md:text-2xl leading-relaxed italic text-charcoal font-light">
              &ldquo;At Celestique, we believe that jewelry is more than just an accessory; it's a timeless expression of elegance and a celebration of life's most precious moments. With a legacy spanning over decades, our brand has become synonymous with exceptional craftsmanship and sophistication.&rdquo;
            </motion.p>
            
            <div className="h-[1px] w-full bg-charcoal/5" />

            <motion.p variants={textVariants} className="font-sans text-sm md:text-base leading-relaxed font-light">
              We carefully select the finest materials&mdash;precious metals, sparkling gemstones, and luxurious pearls&mdash;to create each piece. Every design is meticulously crafted by skilled artisans, ensuring that each item is not only beautiful but built to last.
            </motion.p>

            <motion.p variants={textVariants} className="font-sans text-sm md:text-base leading-relaxed font-light">
              Our commitment to excellence is reflected in every detail, from the intricate designs to the flawless finish. At Celestique, we are dedicated to creating jewelry that transcends trends, offering pieces that will remain cherished for generations.
            </motion.p>

            <motion.p variants={textVariants} className="font-sans text-sm md:text-base leading-relaxed font-light">
              Whether you're celebrating love, marking a special occasion, or simply treating yourself, we invite you to explore our collection and experience the celestial elegance that defines us.
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Architectural Image Portrait with curved-top mask and 3D hover scale */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end" style={{ perspective: '1000px' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ 
              rotateY: 6,
              rotateX: -4,
              scale: 1.02,
              shadow: "0 25px 50px -12px rgba(183, 154, 107, 0.2)"
            }}
            className="relative w-full max-w-[360px] aspect-[3/4] overflow-hidden rounded-t-[140px] border border-charcoal/5 shadow-md bg-greige/20 transition-all duration-500 transform-gpu"
          >
            {/* Model image with hover magnification effect */}
            <motion.img
              src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1200"
              alt="Breathtaking Model with Celestique Jewelry"
              className="w-full h-full object-cover shadow-inner pointer-events-none select-none"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8 }}
              referrerPolicy="no-referrer"
            />
            {/* Luxury visual sheen gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gold/5 mix-blend-color-burn opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        </div>

      </div>

      {/* Decorative luxury hairline separators */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-charcoal/5" />
    </section>
  );
}
