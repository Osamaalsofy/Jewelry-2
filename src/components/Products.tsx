import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Plus, ShoppingBag } from 'lucide-react';
import { Product, PRODUCTS } from '../types';

interface ProductsProps {
  onQuickViewSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  filteredCategory: string;
  setFilteredCategory: (category: string) => void;
}

export default function Products({
  onQuickViewSelect,
  onAddToCart,
  filteredCategory,
  setFilteredCategory
}: ProductsProps) {
  // Derive list based on standard filter selection
  const filteredProducts = filteredCategory === 'ALL'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category.toUpperCase() === filteredCategory.toUpperCase());

  return (
    <section 
      id="products-section" 
      className="max-w-[1600px] mx-auto px-6 py-20 md:py-32 bg-alabaster relative select-none"
    >
      {/* Editorial Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {/* Replicating the distinct editorial headline stack */}
          <h3 className="font-serif text-5xl sm:text-7xl md:text-8.5xl font-normal leading-none tracking-[0.14em] text-charcoal uppercase">
            OUR MOST <br />
            <span className="text-gold font-light italic tracking-[0.08em] normal-case">Loved</span> <br />
            CREATIONS
          </h3>
          <p className="font-sans text-xs tracking-[0.3em] text-charcoal/40 uppercase font-medium mt-6 block">
            SELECTED BY OUR CREATIVE DIRECTORS
          </p>
        </motion.div>
      </div>

      {/* Minimalism Filter Bar */}
      <div className="flex justify-center border-b border-charcoal/5 pb-6 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 scrollbar-none">
          {['ALL', 'RINGS', 'EARRINGS', 'NECKLACES', 'BRACELETS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilteredCategory(cat)}
              className={`px-5 py-2 text-[10px] sm:text-xs tracking-[0.25em] font-sans font-medium rounded-full cursor-pointer transition-all duration-300 relative focus:outline-none ${
                filteredCategory.toUpperCase() === cat.toUpperCase()
                  ? 'text-charcoal'
                  : 'text-charcoal/40 hover:text-charcoal'
              }`}
            >
              <span>{cat}</span>
              {filteredCategory.toUpperCase() === cat.toUpperCase() && (
                <motion.span
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-charcoal/[0.04] border border-charcoal/10 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 4-Column Luxury Grid with Framer Motion Layout preservation */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group flex flex-col justify-between items-stretch outline-none"
            >
              {/* Product Visual Area */}
              <div 
                className="relative aspect-[3/4] overflow-hidden rounded-[30px] border border-charcoal/10 bg-greige/15 group cursor-pointer"
                onClick={() => onQuickViewSelect(product)}
              >
                {/* The Jewelry Image */}
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.5 }}
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark backdrop on hover */}
                <div className="absolute inset-0 bg-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Micro Quick View Trigger Fading Inside */}
                <div className="absolute inset-x-4 bottom-4 flex justify-between items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickViewSelect(product);
                    }}
                    className="flex-1 bg-alabaster/95 hover:bg-gold hover:text-alabaster py-2 px-3 rounded-full text-[10px] tracking-widest font-sans font-medium flex items-center justify-center gap-1.5 shadow-md border border-charcoal/5 transition-all cursor-pointer"
                  >
                    <Eye size={12} strokeWidth={1.5} /> QUICK VIEW
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="aspect-square bg-charcoal p-2.5 rounded-full text-alabaster hover:bg-gold transition-all shadow-md cursor-pointer"
                    title="Add to Casket"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Material Tag Accent */}
                <span className="absolute top-4 left-4 bg-charcoal/80 text-alabaster text-[9px] tracking-widest px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                  {product.category}
                </span>
              </div>

              {/* Product Metadata Details */}
              <div className="mt-5 space-y-1.5 text-center group-hover:translate-y-[-4px] transition-transform duration-300">
                <h4 
                  onClick={() => onQuickViewSelect(product)}
                  className="font-serif text-sm tracking-widest text-charcoal hover:text-gold cursor-pointer transition-colors uppercase font-normal text-center"
                >
                  {product.name}
                </h4>
                
                <p className="font-sans text-[11px] text-charcoal/50 capitalize font-light select-none">
                  {product.material}
                </p>

                <div className="h-[1px] w-8 bg-gold/30 mx-auto" />

                <p className="font-sans text-xs font-semibold text-charcoal select-none">
                  ${product.price.toLocaleString()}
                </p>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Luxury separating line */}
      <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-charcoal/5" />
    </section>
  );
}
