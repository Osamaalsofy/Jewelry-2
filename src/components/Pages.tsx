import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Eye, Plus, ShoppingBag, ShieldCheck, ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { Product, PRODUCTS, CATEGORIES_DATA } from '../types';

interface PageProps {
  onBack: () => void;
  onQuickViewSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

interface OurProductsPageProps {
  onBack: () => void;
  onQuickViewSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

// ----------------------------------------------------------------------
// 1. ALL OUR PRODUCTS PAGE
// ----------------------------------------------------------------------
export function OurProductsPage({ 
  onBack, 
  onQuickViewSelect, 
  onAddToCart,
  activeCategory,
  setActiveCategory
}: OurProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filtered = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || p.category.toUpperCase() === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto px-6 py-12 md:py-20 select-none text-left"
    >
      {/* Return Navigation */}
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-2.5 text-xs font-sans font-medium tracking-[0.2em] text-charcoal/60 hover:text-gold transition-colors mb-12 cursor-pointer focus:outline-none"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO JOURNAL</span>
      </button>

      {/* Editorial Title Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-charcoal/10 pb-10 mb-12">
        <div className="lg:col-span-8">
          <span className="text-[10px] tracking-[0.35em] text-gold font-bold uppercase block mb-3">ARCHIVAL COLLECTIONS</span>
          <h2 className="font-serif text-5xl md:text-7.5xl leading-[0.9] tracking-[0.1em] text-charcoal uppercase">
            THE ARCHIVAL <br />
            <span className="text-gold italic font-light tracking-[0.05em] normal-case">Catalogue</span>
          </h2>
        </div>
        <div className="lg:col-span-4 lg:text-right self-end">
          <p className="font-serif text-lg italic text-charcoal/60 max-w-sm lg:ml-auto leading-relaxed">
            &ldquo;Symmetry, density, and precision handcrafted in limited editorial release quantities.&rdquo;
          </p>
        </div>
      </div>

      {/* Advanced Filter, Search and Sorting Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-charcoal/[0.02] border border-charcoal/5 p-6 rounded-[30px] mb-12">
        
        {/* Category Pill Switcher */}
        <div className="flex flex-wrap gap-2">
          {['ALL', 'RINGS', 'EARRINGS', 'NECKLACES', 'BRACELETS'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[10px] sm:text-xs tracking-widest font-sans font-medium rounded-full cursor-pointer transition-all ${
                activeCategory === cat
                  ? 'bg-charcoal text-alabaster shadow-sm'
                  : 'bg-white/80 text-charcoal/50 hover:text-charcoal border border-charcoal/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input & Sort list */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:w-auto">
          {/* Search field */}
          <div className="relative flex items-center bg-white border border-charcoal/10 rounded-full px-4 py-2 text-xs w-full sm:w-64">
            <Search size={14} className="text-charcoal/40 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search precious items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent focus:outline-none w-full text-charcoal placeholder:text-charcoal/30 font-sans"
            />
          </div>

          {/* Sort list */}
          <div className="flex items-center gap-2 bg-white border border-charcoal/10 rounded-full px-4 py-2 text-xs">
            <SlidersHorizontal size={13} className="text-charcoal/40" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none font-sans text-charcoal cursor-pointer text-xs"
            >
              <option value="default">Default Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Grid List */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-charcoal/10 rounded-[40px] bg-charcoal/[0.01]">
          <p className="font-serif text-2xl italic text-charcoal/40 mb-3">No creations found matching your query.</p>
          <p className="font-sans text-xs text-charcoal/40 max-w-xs mx-auto leading-relaxed">
            Try adjusting your categories or search spelling to locate alternative campaign artifacts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {filtered.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group flex flex-col justify-between items-stretch outline-none"
            >
              <div 
                className="relative aspect-[3/4] overflow-hidden rounded-[30px] border border-charcoal/10 bg-greige/15 cursor-pointer"
                onClick={() => onQuickViewSelect(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Triggers */}
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
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="absolute top-4 left-4 bg-charcoal/80 text-alabaster text-[9px] tracking-widest px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                  {product.category}
                </span>
              </div>

              <div className="mt-5 space-y-1.5 text-center group-hover:translate-y-[-4px] transition-transform duration-300">
                <h4 className="font-serif text-sm tracking-widest text-charcoal hover:text-gold cursor-pointer transition-colors uppercase font-normal text-center">
                  {product.name}
                </h4>
                <p className="font-sans text-[11px] text-charcoal/50 capitalize font-light">
                  {product.material}
                </p>
                <div className="h-[1px] w-8 bg-gold/30 mx-auto" />
                <p className="font-sans text-xs font-semibold text-charcoal">
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// 2. PRODUCT CATEGORIES PAGE
// ----------------------------------------------------------------------
interface CategoriesPageProps extends PageProps {
  onCategoryClick: (categoryName: string) => void;
}

export function CategoriesPage({ onBack, onQuickViewSelect, onAddToCart, onCategoryClick }: CategoriesPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto px-6 py-12 md:py-20 select-none text-left"
    >
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-2.5 text-xs font-sans font-medium tracking-[0.2em] text-charcoal/60 hover:text-gold transition-colors mb-12 cursor-pointer focus:outline-none"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO JOURNAL</span>
      </button>

      <div className="border-b border-charcoal/10 pb-10 mb-16">
        <span className="text-[10px] tracking-[0.35em] text-gold font-bold uppercase block mb-3">SERIES DIRECTIVES</span>
        <h2 className="font-serif text-5xl md:text-7.5xl leading-[0.9] tracking-[0.1em] text-charcoal uppercase">
          OUR CREATIVE <br />
          <span className="text-gold italic font-light tracking-[0.05em] normal-case">Divisions</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        {CATEGORIES_DATA.map((cat, idx) => {
          // Grab top product for visual quick view preview card
          const topProduct = PRODUCTS.find(p => p.category.toUpperCase() === cat.name.toUpperCase());

          return (
            <div key={cat.name} className="space-y-6">
              {/* Massive visual item */}
              <div
                onClick={() => onCategoryClick(cat.name)}
                className="group relative aspect-[1.3] overflow-hidden rounded-[40px] border border-charcoal/10 cursor-pointer shadow-sm bg-greige/10"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-between items-start z-10">
                  <span className="font-mono text-xs text-alabaster/60 tracking-wider">CEL - EX:0{idx+1}</span>
                  <div>
                    <h3 className="font-serif text-3xl md:text-5xl text-alabaster tracking-widest font-normal uppercase">{cat.name}</h3>
                    <p className="font-sans text-xs text-alabaster/70 max-w-xs font-light mt-1.5 opacity-90">{cat.description}</p>
                  </div>
                </div>
              </div>

              {/* Editorial styling list (See More Options Area) */}
              <div className="bg-white border border-charcoal/10 p-6 rounded-[30px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <span className="text-[9px] tracking-widest text-gold font-bold block mb-1">STYLING DIRECTIVE</span>
                  <p className="font-serif text-base italic text-charcoal/80">
                    &ldquo;Exquisite proportions crafted to capture luxury natural lighting.&rdquo;
                  </p>
                </div>
                <button
                  onClick={() => onCategoryClick(cat.name)}
                  className="text-xs font-sans tracking-[0.2em] font-medium text-gold hover:text-charcoal border-b border-gold pb-0.5 whitespace-nowrap cursor-pointer transition-colors"
                >
                  SEE MORE OPTIONS &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// 3. ABOUT THE BRAND PAGE
// ----------------------------------------------------------------------
export function AboutBrandPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto px-6 py-12 md:py-20 select-none text-left"
    >
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-2.5 text-xs font-sans font-medium tracking-[0.2em] text-charcoal/60 hover:text-gold transition-colors mb-12 cursor-pointer focus:outline-none"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO JOURNAL</span>
      </button>

      {/* Editorial Spread Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch mb-20">
        
        {/* Left Side: Brand Philosophy and Quotes */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.4em] text-gold font-bold uppercase block">EST. MCMXCVI CELESTIAL METRIC</span>
            <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] tracking-[0.1em] text-charcoal uppercase">
              THE AURA <br />
              <span className="text-gold italic font-light tracking-[0.05em] normal-case">Of Reticence</span>
            </h1>
            <div className="h-[1px] w-28 bg-gold/40 my-4" />
          </div>

          <p className="font-serif text-2xl md:text-3.5xl leading-relaxed italic text-charcoal/90 font-light max-w-2xl bg-charcoal/[0.01] border-l-2 border-gold pl-6 py-2">
            &ldquo;In a world of constant noise, we craft markers of continuous silence. Luxury is not a display of volume; it is the grace with which light passes through space.&rdquo;
          </p>

          <div className="space-y-4 font-sans text-sm md:text-base text-charcoal/70 leading-loose font-light max-w-xl">
            <p>
              Deep inside the master workshops of Antwerp and Paris, Celestique is curated. Originally launched under the blueprint of high-fashion and minimalist sculptors, each ring, drop wire, and link represents an artistic dedication.
            </p>
            <p>
              Our diamonds are ethically registered, our 18k and 14k gold materials certified under the strict Celestial metrics of continuous polished density.
            </p>
          </div>
        </div>

        {/* Right Side: Striking full height magazine portrait */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="relative w-full aspect-[3/4] rounded-t-[180px] rounded-b-[40px] overflow-hidden border border-charcoal/10 shadow-xl bg-greige/20">
            <img
              src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1200"
              alt="Breathtaking campaign alignment"
              className="w-full h-full object-cover scale-102 hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
            {/* Soft Warm filter */}
            <div className="absolute inset-0 bg-gold/5 mix-blend-color-burn" />
          </div>
        </div>

      </div>

      {/* Triple Value blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-charcoal/10 pt-16">
        {[
          {
            title: 'I. ETHICAL LAB ACQUISITIONS',
            text: 'Every single diamond and precious pearl sourced by the Celestique concierge is compliant with the Kimberley Process and certified by the Antwerp Board of Appraisals.'
          },
          {
            title: 'II. BESPOKE CUSTOM COMPOSITION',
            text: 'We formulate our own gold. From our iconic 18k Champagne Gold to our soft 14k Golden Dew wire links, each compound is meticulously verified for structural integrity.'
          },
          {
            title: 'III. COUTURE LIFETIME PRESERVATION',
            text: 'Your products arrive enclosed in a French-velvet lined casket cage, coupled with standard lifetime appraisal renewal and insurance coverage options.'
          }
        ].map((v, i) => (
          <div key={i} className="space-y-4 text-left p-6 rounded-3xl bg-charcoal/[0.01] border border-charcoal/5">
            <h4 className="font-sans text-xs tracking-[0.2em] font-bold text-gold">{v.title}</h4>
            <p className="font-sans text-xs md:text-sm text-charcoal/60 leading-relaxed font-light">{v.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// 4. CATEGORY DETAIL PAGE (Rings, Earrings, Necklaces, Bracelets)
// ----------------------------------------------------------------------
interface CategoryDetailPageProps extends PageProps {
  categoryName: string;
}

export function CategoryDetailPage({ categoryName, onBack, onQuickViewSelect, onAddToCart }: CategoryDetailPageProps) {
  const products = PRODUCTS.filter(p => p.category.toUpperCase() === categoryName.toUpperCase());

  // Category specific campaigns
  const categoryCampaigns = {
    Rings: {
      title: 'THE CORE OF UNION',
      quote: 'Faceted solid bands and celestial statements sculpted to represent paths diverging and converging.',
      narrative: 'Each design represents a structural statement of continuity and luxurious geometry.'
    },
    Earrings: {
      title: 'THE RADIANCE OF DEPTH',
      quote: 'Radial solar loops and delicate droplets formulated to catch radial lighting and outline profiles.',
      narrative: 'Curated hoops and French wire closures engineered with absolute weight balance in mind.'
    },
    Necklaces: {
      title: 'DRAUGHT OF STARLIGHT',
      quote: 'Diamond strand chokers and striking statement links draped to embody fluid light reflection.',
      narrative: 'A striking focal piece to crown the collarbone in gorgeous, heavy gold links.'
    },
    Bracelets: {
      title: 'METRIC COUTURE BANDS',
      quote: 'Delicate gold wires and heavy geometric bangles designed to layer together in seamless symmetry.',
      narrative: 'A constant, polished reminder of continuous luxury decorating the wrist.'
    }
  };

  const campaign = categoryCampaigns[categoryName as keyof typeof categoryCampaigns] || {
    title: 'THE ARCHIVAL SERIES',
    quote: 'Exquisite jewelry inspired by the beauty of the heavens.',
    narrative: 'Handcrafted items made to enrich your campaign collection.'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-[1600px] mx-auto px-6 py-12 md:py-20 select-none text-left"
    >
      {/* Return Navigation */}
      <button
        onClick={onBack}
        className="group inline-flex items-center gap-2.5 text-xs font-sans font-medium tracking-[0.2em] text-charcoal/60 hover:text-gold transition-colors mb-12 cursor-pointer focus:outline-none"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>BACK TO COLLECTIONS</span>
      </button>

      {/* Campaign Details Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-charcoal/10 pb-12 mb-16">
        <div className="lg:col-span-7">
          <span className="text-[10px] tracking-[0.35em] text-gold font-bold uppercase block mb-3">{campaign.title}</span>
          <h2 className="font-serif text-5xl md:text-7.5xl leading-[0.9] tracking-[0.1em] text-charcoal uppercase">
            {categoryName} <br />
            <span className="text-gold italic font-light tracking-[0.05em] normal-case">Collection</span>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:pl-6">
          <p className="font-serif text-xl italic text-charcoal/80 mb-4 leading-relaxed">
            &ldquo;{campaign.quote}&rdquo;
          </p>
          <p className="font-sans text-xs text-charcoal/50 leading-relaxed font-light">
            {campaign.narrative}
          </p>
        </div>
      </div>

      {/* Dynamic Products Grid of Category */}
      {products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-charcoal/10 rounded-[40px] bg-charcoal/[0.01]">
          <p className="font-serif text-xl italic text-charcoal/50 mb-2">Commissions are currently pending release.</p>
          <p className="font-sans text-xs text-charcoal/40 max-w-xs mx-auto leading-relaxed">
            Our master jewelers are currently fabricating these category pieces. Register to be updated on release dates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group flex flex-col justify-between items-stretch outline-none"
            >
              {/* Product Visual Area */}
              <div 
                className="relative aspect-[3/4] overflow-hidden rounded-[30px] border border-charcoal/10 bg-greige/15 cursor-pointer"
                onClick={() => onQuickViewSelect(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/10 tag-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating controls */}
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
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <span className="absolute top-4 left-4 bg-charcoal/80 text-alabaster text-[9px] tracking-widest px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                  {product.category}
                </span>
              </div>

              {/* Product Metadata Details */}
              <div className="mt-5 space-y-1.5 text-center group-hover:translate-y-[-4px] transition-transform duration-300">
                <h4 className="font-serif text-sm tracking-widest text-charcoal hover:text-gold cursor-pointer transition-colors uppercase font-normal text-center">
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
        </div>
      )}

      {/* Styled campaign banner for rings/jewels in category detail */}
      <div className="mt-20 bg-charcoal text-alabaster p-8 md:p-12 rounded-[50px] border border-gold/15 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] text-gold font-bold block">PREMIUM APRAISALS INDUCTED</span>
          <h4 className="font-serif text-2xl md:text-3.5xl font-light">Custom Engraving &amp; Bespoke Sizes Available</h4>
          <p className="font-sans text-xs text-alabaster/60 leading-relaxed font-light">
            We offer complimentary laser engraving and bespoke drop hook metrics. Simply indicate your requirements to the concierge team when finalizing the selection.
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-white text-charcoal hover:bg-gold hover:text-white rounded-full text-xs font-sans font-medium tracking-widest uppercase transition-all shrink-0 cursor-pointer"
        >
          EXPLORE COLLECTIONS &rarr;
        </button>
      </div>
    </motion.div>
  );
}
