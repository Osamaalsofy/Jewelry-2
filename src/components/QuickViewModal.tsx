import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ChevronRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedOptions: { size?: string; length?: string }) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState('7'); // Default ring size
  const [selectedLength, setSelectedLength] = useState('18 inch'); // Default necklace length
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'tryon'>('details');
  const [tryOnModel, setTryOnModel] = useState<'A' | 'B'>('A'); // Try on assets selector
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, {
      size: product.category === 'Rings' ? selectedSize : undefined,
      length: product.category === 'Necklaces' ? selectedLength : undefined,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Virtual model coordinates for rendering jewelry overlays gracefully
  const tryOnBackdrops = {
    Rings: {
      A: {
        url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600',
        name: 'Classic Hand',
        offset: 'top-[42%] left-[46%] scale-[0.35]'
      },
      B: {
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600',
        name: 'Sculptural Stone',
        offset: 'top-[16%] left-[45%] scale-[0.45]'
      }
    },
    Earrings: {
      A: {
        url: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=600',
        name: 'Isabella Hand',
        offset: 'top-[42%] left-[30%] scale-[0.4]'
      },
      B: {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600',
        name: 'Parisienne',
        offset: 'top-[52%] left-[33%] scale-[0.45]'
      }
    },
    Necklaces: {
      A: {
        url: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=600',
        name: 'Studio Profile',
        offset: 'top-[56%] left-[47%] scale-[0.65]'
      },
      B: {
        url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600',
        name: 'Fashion Campaign',
        offset: 'top-[60%] left-[49%] scale-[0.6]'
      }
    },
    Bracelets: {
      A: {
        url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600',
        name: 'Gold Campaign',
        offset: 'top-[36%] left-[40%] scale-[0.5]'
      },
      B: {
        url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600',
        name: 'Minimal Wrist',
        offset: 'top-[52%] left-[32%] scale-[0.35]'
      }
    }
  };

  const currentTryOn = tryOnBackdrops[product.category] || tryOnBackdrops['Rings'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
        
        {/* Backdrop filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-alabaster w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden border border-charcoal/10 z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-alabaster/90 hover:bg-gold text-charcoal hover:text-alabaster flex items-center justify-center transition-colors cursor-pointer border border-charcoal/5 shadow"
            title="Close details"
          >
            <X size={16} />
          </button>

          {/* LEFT: Dynamic visual side (Standard Image or Interactive Try-On simulation) */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-[600px] bg-greige/10 border-r border-charcoal/5 overflow-hidden">
            {activeTab !== 'tryon' ? (
              <motion.img
                key="prod-img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              // Immersive Luxury Try On Slider Visual!
              <motion.div 
                key="tryon-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full flex flex-col justify-between bg-charcoal"
              >
                {/* Background image of chosen layout */}
                <img
                  src={tryOnModel === 'A' ? currentTryOn.A.url : currentTryOn.B.url}
                  alt="Try On Model"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Sparkling floating icon element simulating actual try on position */}
                <motion.div
                  animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute ${tryOnModel === 'A' ? currentTryOn.A.offset : currentTryOn.B.offset} pointer-events-none pointer-events-none drop-shadow-lg`}
                >
                  <img
                    src={product.image}
                    alt="Jewelry Layer"
                    className="w-24 h-24 object-contain rounded-full border border-gold/40 bg-alabaster/35 p-1 backdrop-blur-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 right-0 w-4.5 h-4.5 bg-gold text-alabaster rounded-full flex items-center justify-center text-[8px] font-bold shadow animate-pulse">
                    ✦
                  </div>
                </motion.div>

                {/* Try On Instructions Header */}
                <div className="relative bg-gradient-to-b from-charcoal/80 via-charcoal/30 to-transparent p-5 text-left text-alabaster z-10 pointer-events-none">
                  <span className="text-[10px] tracking-widest text-gold font-sans block mb-1">CELESTIQUE LABS</span>
                  <h5 className="font-serif text-lg tracking-wider font-light uppercase">VIRTUAL CAMPAIGN TRIAL</h5>
                  <p className="font-sans text-[10px] text-alabaster/60 leading-relaxed mt-1">
                    Visualize the scale and setting of this artifact in high fashion environments.
                  </p>
                </div>

                {/* Model Selector Bar */}
                <div className="relative bg-gradient-to-t from-charcoal to-charcoal/20 p-5 z-10">
                  <div className="flex justify-between items-center bg-charcoal/50 border border-alabaster/10 rounded-full py-1.5 px-3 backdrop-blur-md">
                    <span className="font-sans text-[10px] tracking-wider text-alabaster/50">CAMPAIGN ENVIRONMENT:</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => setTryOnModel('A')}
                        className={`px-3 py-1 rounded-full font-sans text-[10px] tracking-widest font-medium transition-colors cursor-pointer ${
                          tryOnModel === 'A'
                            ? 'bg-gold text-alabaster'
                            : 'text-alabaster hover:bg-alabaster/10'
                        }`}
                      >
                        {currentTryOn.A.name}
                      </button>
                      <button
                        onClick={() => setTryOnModel('B')}
                        className={`px-3 py-1 rounded-full font-sans text-[10px] tracking-widest font-medium transition-colors cursor-pointer ${
                          tryOnModel === 'B'
                            ? 'bg-gold text-alabaster'
                            : 'text-alabaster hover:bg-alabaster/10'
                        }`}
                      >
                        {currentTryOn.B.name}
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* Micro Sparkle Tag */}
            <div className="absolute top-5 left-5 bg-charcoal/70 text-gold text-[9px] tracking-[0.2em] font-sans px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1.5">
              <Sparkles size={10} className="text-gold" /> HANDCRAFTED IN ANTWERP
            </div>
          </div>

          {/* RIGHT: Detailed Specifications & Add flow */}
          <div className="p-8 md:p-10 flex flex-col justify-between text-left relative bg-alabaster">
            <div className="space-y-6">
              
              {/* Material Subtitle & Title */}
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.3em] text-gold font-sans font-medium uppercase">
                  {product.material}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl tracking-widest text-charcoal font-normal uppercase leading-tight">
                  {product.name}
                </h3>
                <p className="font-sans text-lg font-semibold text-charcoal/90">
                  ${product.price.toLocaleString()}
                </p>
              </div>

              {/* Informative Tab controller */}
              <div className="flex border-b border-charcoal/5">
                {[
                  { id: 'details', label: 'THE STORY' },
                  { id: 'specs', label: 'SPECIFICATIONS' },
                  { id: 'tryon', label: 'VIRTUAL FIT' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-2.5 px-4 text-[10px] tracking-widest font-sans font-semibold transition-all duration-300 border-b-2 cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-gold text-charcoal'
                        : 'border-transparent text-charcoal/40 hover:text-charcoal'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Display Area */}
              <div className="h-44 overflow-y-auto pr-2">
                <AnimatePresence mode="wait">
                  {activeTab === 'details' && (
                    <motion.div
                      key="details-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <p className="font-sans text-xs md:text-sm text-charcoal/70 leading-relaxed font-light">
                        {product.description}
                      </p>
                      <div className="bg-charcoal/[0.02] border border-charcoal/5 p-4 rounded-2xl flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                        <p className="font-sans text-[11px] text-charcoal/50 leading-relaxed italic">
                          This creation includes standard appraisal authentication and Celestique premium preservation cases.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'specs' && (
                    <motion.ul
                      key="specs-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2.5 font-sans text-xs text-charcoal/75 font-light"
                    >
                      {product.specifications.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-gold font-bold">•</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}

                  {activeTab === 'tryon' && (
                    <motion.div
                      key="tryon-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 text-left"
                    >
                      <p className="font-sans text-xs text-charcoal/70 leading-relaxed font-light">
                        Our interactive virtual fit suite uses structural spatial metrics to scale details of {product.name} seamlessly onto designated models.
                      </p>
                      <div className="p-4 rounded-2xl bg-gold/[0.04] border border-gold/15 flex items-start gap-3">
                        <Sparkles size={16} className="text-gold mt-0.5 shrink-0" />
                        <div>
                          <span className="font-sans text-[11px] font-semibold tracking-wider text-charcoal uppercase block">VIRTUAL PREVIEW ACTIVE</span>
                          <span className="font-sans text-[11px] text-charcoal/60 leading-normal block mt-0.5">
                            Toggle model frames using the options under the left canvas simulator to evaluate spacing details.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selection Options: Sizes or Chain Lengths */}
              {product.category === 'Rings' && (
                <div className="space-y-2">
                  <span className="block font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">SELECT RING SIZE (US)</span>
                  <div className="flex gap-2.5">
                    {['6', '7', '8', '9'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-10 h-10 rounded-full border text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-charcoal text-alabaster border-charcoal shadow-sm'
                            : 'border-charcoal/10 text-charcoal/60 hover:border-gold hover:text-gold'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                    <span className="self-center font-sans text-[10px] text-gold/80 italic cursor-pointer ml-2 hover:underline">Unsure of size?</span>
                  </div>
                </div>
              )}

              {product.category === 'Necklaces' && (
                <div className="space-y-2">
                  <span className="block font-sans text-[10px] tracking-widest text-charcoal/50 uppercase">CHOSEN DROP WIRE LENGTH</span>
                  <div className="flex gap-2.5">
                    {['16 inch', '18 inch', '20 inch'].map((ln) => (
                      <button
                        key={ln}
                        onClick={() => setSelectedLength(ln)}
                        className={`px-4 py-2 rounded-full border text-xs font-sans font-medium transition-all duration-300 cursor-pointer ${
                          selectedLength === ln
                            ? 'bg-charcoal text-alabaster border-charcoal shadow-sm'
                            : 'border-charcoal/10 text-charcoal/60 hover:border-gold hover:text-gold'
                        }`}
                      >
                        {ln}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Action CTA Buttons */}
            <div className="border-t border-charcoal/10 pt-6 mt-6 space-y-3">
              <button
                onClick={handleAdd}
                disabled={isAdded}
                className={`w-full py-4 rounded-full text-xs font-sans font-semibold tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer uppercase ${
                  isAdded
                    ? 'bg-gold text-alabaster shadow-none'
                    : 'bg-charcoal text-alabaster hover:bg-gold'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={14} strokeWidth={2.5} /> RESERVED IN CASKET
                  </>
                ) : (
                  <>
                    <ShoppingBag size={14} strokeWidth={2.5} /> ADD TO MY SELECTIONS
                  </>
                )}
              </button>
              
              <p className="font-sans text-[10px] text-charcoal/40 text-center leading-normal">
                Includes complimentary custom appraisal registries & Celestique insurance coverage.
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
