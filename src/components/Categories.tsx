import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../types';

interface CategoriesProps {
  onCategorySelect: (categoryName: string) => void;
  onSeeCollection: () => void;
}

export default function Categories({ onCategorySelect, onSeeCollection }: CategoriesProps) {
  return (
    <section 
      id="categories-section" 
      className="max-w-[1600px] mx-auto px-6 py-20 md:py-32 bg-alabaster relative select-none"
    >
      {/* Editorial Title Header */}
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-4 mb-12 md:mb-16 border-b border-charcoal/5 pb-6">
        <h3 className="font-serif text-5xl md:text-7xl font-normal tracking-[0.12em] text-charcoal">
          OUR <span className="text-gold italic font-light">PRODUCTS</span>
        </h3>
        <span className="font-sans text-xs tracking-[0.2em] text-charcoal/40 uppercase font-medium">
          STYLING GROUPS / ARCHIVAL SERIES
        </span>
      </div>

      {/* 2x2 Luxury Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {CATEGORIES_DATA.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.0, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onCategorySelect(cat.name)}
            className="group relative aspect-[4/3] sm:aspect-[1.4] md:aspect-[1.3] overflow-hidden rounded-[40px] border border-charcoal/10 cursor-pointer shadow-sm bg-greige/10"
          >
            {/* Background Image with hover zoom */}
            <motion.img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover origin-center"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              referrerPolicy="no-referrer"
            />

            {/* Dark/Warm gradient glass cover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 via-charcoal/5 to-transparent opacity-90 transition-opacity duration-500 group-hover:from-charcoal/60" />

            {/* Inner Content - Category Name & Arrow */}
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between items-start z-10">
              {/* Optional tiny count */}
              <span className="font-mono text-xs text-alabaster/60 tracking-wider">
                CEL - 0{idx + 1}
              </span>

              {/* Title & Floating Reveal */}
              <div className="w-full flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="space-y-2">
                  <h4 className="font-serif text-3xl md:text-4.5xl text-alabaster tracking-widest font-normal uppercase">
                    {cat.name}
                  </h4>
                  <p className="font-sans text-xs text-alabaster/70 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs leading-relaxed">
                    {cat.description}
                  </p>
                  
                  {/* Explicit See More Options label */}
                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 flex items-center gap-1">
                    <span className="text-[10px] font-sans font-medium tracking-[0.25em] text-gold uppercase border-b border-gold/40 pb-0.5 hover:border-gold">
                      SEE MORE OPTIONS
                    </span>
                    <ArrowUpRight size={13} className="text-gold" />
                  </div>
                </div>
                
                <div className="p-3 bg-alabaster text-charcoal rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gold hover:text-alabaster shadow-md">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Custom Luxury Cursor Hover Indicator Badge */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
              <span className="bg-charcoal/90 text-alabaster text-[10px] tracking-[0.25em] font-medium font-sans px-5 py-2.5 rounded-full backdrop-blur-sm border border-alabaster/10 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-500">
                DISCOVER {cat.name} OPTIONS
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Elegant, centered premium See the Collection button */}
      <div className="mt-16 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onClick={onSeeCollection}
          className="group relative inline-flex items-center gap-3.5 bg-charcoal hover:bg-gold text-alabaster py-4 px-9 rounded-full text-xs tracking-[0.25em] font-sans font-medium transition-all duration-300 shadow-[0_15px_30px_rgba(26,26,26,0.1)] hover:shadow-[0_20px_40px_rgba(183,154,107,0.25)] hover:scale-102 cursor-pointer focus:outline-none"
        >
          <span>SEE THE COLLECTION</span>
          <motion.span 
            className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
          >
            ➔
          </motion.span>
        </motion.button>
      </div>

      {/* Luxury separating line */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-charcoal/5" />
    </section>
  );
}
