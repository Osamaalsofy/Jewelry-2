import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingBag, User, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  cart: CartItem[];
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  onQuickView: (product: Product) => void;
  scrollToSection: (id: string) => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({
  cart,
  updateCartQuantity,
  removeFromCart,
  onQuickView,
  scrollToSection,
  currentView,
  onNavigate
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'shipping' | 'complete'>('idle');
  const [shippingForm, setShippingForm] = useState({ name: '', email: '', address: '' });

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('complete');
    setTimeout(() => {
      // Clear or process takes place
    }, 2000);
  };

  return (
    <>
      {/* Top Banner with High-fashion Atelier Locations */}
      <div className="bg-alabaster text-center py-2 text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-charcoal/60 border-b border-charcoal/5 select-none">
        Paris &bull; Milan &bull; London &bull; Antwerp
      </div>

      {/* Top Banner & Header Navigation */}
      <header className="sticky top-0 z-40 bg-alabaster/80 backdrop-blur-md border-b border-charcoal/10 transition-all">
        <div className="max-w-[1600px] mx-auto px-6 py-5 md:py-6 flex items-center justify-between">
          
          {/* Left: MENU Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-2.5 font-sans text-xs tracking-[0.2em] font-medium text-charcoal hover:text-gold transition-colors cursor-pointer"
            id="menu-trigger-btn"
          >
            <div className="flex flex-col gap-1 w-5">
              <span className="h-[1px] w-5 bg-charcoal group-hover:bg-gold transition-all duration-300"></span>
              <span className="h-[1px] w-3.5 bg-charcoal group-hover:bg-gold group-hover:w-5 transition-all duration-300"></span>
            </div>
            <span className="hidden sm:inline">MENU</span>
          </button>

          {/* Center: CELESTIQUE Brand Logo */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 focus:outline-none cursor-pointer group"
          >
            <h1 className="font-serif text-2xl md:text-3.5xl font-normal tracking-[0.18em] text-charcoal translate-x-[0.09em] flex items-center select-none">
              CEL
              <span className="relative inline-flex items-center">
                E
                <svg className="absolute -top-1 left-1.5 w-2 h-2 text-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </span>
              STI
              <span className="relative inline-flex items-center">
                Q
                <svg className="absolute -top-1.5 left-2 w-2 h-2 text-gold animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </span>
              UE
            </h1>
          </button>

          {/* Right: User icon & Cart Bag Icon */}
          <div className="flex items-center gap-5 md:gap-7">
            <button className="text-charcoal hover:text-gold transition-colors cursor-pointer hidden sm:block" title="Profile Account">
              <User size={18} strokeWidth={1.5} />
            </button>
            
            <button
              onClick={() => setIsBagOpen(true)}
              className="relative p-1 text-charcoal hover:text-gold transition-colors cursor-pointer"
              title="Shopping Bag"
              id="cart-trigger-btn"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold text-alabaster text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* Full-Screen Editorial Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-alabaster flex flex-col justify-between p-8 md:p-16"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg tracking-[0.15em] text-gold font-light italic">Celestique Space</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-2 text-xs tracking-widest font-sans text-charcoal hover:text-gold transition-all cursor-pointer"
              >
                CLOSE
                <div className="relative w-6 h-6 flex items-center justify-center border border-charcoal/10 rounded-full group-hover:border-gold transition-colors">
                  <X size={12} strokeWidth={1.5} />
                </div>
              </button>
            </div>

            {/* Menu Links */}
            <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center my-auto">
              <nav className="flex flex-col gap-3 md:gap-4">
                {[
                  { label: 'HOME', view: 'home' },
                  { label: 'OUR PRODUCTS', view: 'products' },
                  { label: 'RINGS COLLECTION', view: 'rings' },
                  { label: 'EARRINGS COLLECTION', view: 'earrings' },
                  { label: 'NECKLACES COLLECTION', view: 'necklaces' },
                  { label: 'BRACELETS COLLECTION', view: 'bracelets' },
                  { label: 'PRODUCT CATEGORIES', view: 'categories' },
                  { label: 'ABOUT THE BRAND', view: 'about' }
                ].map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                  >
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onNavigate(link.view);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="font-serif text-2xl sm:text-3.5xl md:text-4.5xl text-left font-normal text-charcoal hover:text-gold transition-all tracking-wider uppercase group relative focus:outline-none cursor-pointer"
                    >
                      <span className="relative z-10">{link.label}</span>
                      <span className="absolute left-0 bottom-1 w-0 h-[1.5px] bg-gold/40 group-hover:w-full transition-all duration-500"></span>
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Editorial Block Inside Menu */}
              <div className="hidden md:block p-10 border border-charcoal/5 rounded-[60px] bg-charcoal/[0.01] max-w-sm ml-auto">
                <span className="text-[10px] tracking-widest font-sans text-gold block mb-3">COLLECTION STYLING</span>
                <p className="font-serif text-xl italic text-charcoal/80 leading-relaxed mb-4">
                  "At Celestique, we believe that jewelry is more than just an accessory; it is a timeless expression of elegance."
                </p>
                <div className="h-[1px] w-20 bg-gold/40 mb-4"></div>
                <p className="font-sans text-xs text-charcoal/50 leading-loose">
                  Explore custom cuts of high-fashion and minimalist pieces made to layer together.
                </p>
              </div>
            </div>

            {/* Menu Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-charcoal/5 pt-6 text-[11px] tracking-widest text-charcoal/50">
              <span>© 2026 CELESTIQUE JEWELRY</span>
              <div className="flex gap-6">
                <span className="hover:text-gold cursor-pointer">INSTAGRAM</span>
                <span className="hover:text-gold cursor-pointer">PINTEREST</span>
                <span className="hover:text-gold cursor-pointer">CAMPAIGN JOURNAL</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Shopping Bag Drawer */}
      <AnimatePresence>
        {isBagOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsBagOpen(false);
                setCheckoutStep('idle');
              }}
              className="fixed inset-0 z-50 bg-charcoal"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-alabaster shadow-2xl flex flex-col justify-between border-l border-charcoal/10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-charcoal/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} strokeWidth={1.5} className="text-gold" />
                  <span className="font-serif text-lg tracking-widest text-charcoal font-medium uppercase">YOUR CHERISHED SELECTIONS</span>
                </div>
                <button
                  onClick={() => {
                    setIsBagOpen(false);
                    setCheckoutStep('idle');
                  }}
                  className="p-1 hover:text-gold transition-colors cursor-pointer"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {checkoutStep === 'idle' && (
                  <>
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                        <div className="w-12 h-12 bg-charcoal/[0.03] border border-charcoal/5 rounded-full flex items-center justify-center text-charcoal/40">
                          <ShoppingBag size={20} strokeWidth={1.5} />
                        </div>
                        <p className="font-serif text-lg text-charcoal/60 italic">Your collection casket is currently empty.</p>
                        <p className="font-sans text-xs text-charcoal/40 max-w-xs leading-relaxed">
                          Discover our timeless designs and craft memory markers that resonate with sophisticated beauty.
                        </p>
                        <button
                          onClick={() => {
                            setIsBagOpen(false);
                            scrollToSection('products-section');
                          }}
                          className="mt-2 text-xs tracking-widest font-sans font-medium text-gold hover:text-charcoal transition-colors border-b border-gold cursor-pointer"
                        >
                          EXPLORE CREATIONS
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex gap-4 border-b border-charcoal/5 pb-5">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-20 h-24 object-cover border border-charcoal/5 bg-charcoal/5 rounded-t-[20px]"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h4 className="font-serif text-xs font-normal tracking-widest text-charcoal">{item.product.name}</h4>
                                <p className="font-sans text-[11px] text-charcoal/50 mt-1 italic">{item.product.material}</p>
                                <p className="font-sans text-xs font-medium text-gold mt-2">${item.product.price.toLocaleString()}</p>
                              </div>

                              <div className="flex items-center justify-between mt-3">
                                {/* Quantity Toggler */}
                                <div className="flex items-center border border-charcoal/10 rounded-full py-1 px-2.5 bg-charcoal/[0.01]">
                                  <button
                                    onClick={() => updateCartQuantity(item.product.id, -1)}
                                    className="p-0.5 hover:text-gold transition-colors cursor-pointer text-charcoal/60"
                                  >
                                    <Minus size={11} strokeWidth={2} />
                                  </button>
                                  <span className="mx-2.5 font-sans text-xs text-charcoal font-medium select-none">{item.quantity}</span>
                                  <button
                                    onClick={() => updateCartQuantity(item.product.id, 1)}
                                    className="p-0.5 hover:text-gold transition-colors cursor-pointer text-charcoal/60"
                                  >
                                    <Plus size={11} strokeWidth={2} />
                                  </button>
                                </div>
                                {/* Remove button */}
                                <button
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-charcoal/40 hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1 text-[10px] tracking-widest"
                                  title="Remove Item"
                                >
                                  <Trash2 size={12} strokeWidth={1.5} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {checkoutStep === 'shipping' && (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-5 py-2">
                    <h3 className="font-serif text-xl font-normal text-charcoal tracking-wide mb-2">Checkout Delivery Details</h3>
                    <p className="font-sans text-[11px] text-charcoal/50 leading-relaxed mb-4">
                      Please specify secure shipping metadata for your high-fashion jewelry campaign delivery.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block font-sans text-[10px] tracking-widest text-charcoal/60 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={shippingForm.name}
                          onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                          className="w-full bg-charcoal/[0.02] border border-charcoal/10 rounded-lg p-3 text-xs focus:border-gold focus:outline-none transition-colors"
                          placeholder="Lady Isabella Vance"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[10px] tracking-widest text-charcoal/60 uppercase mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={shippingForm.email}
                          onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                          className="w-full bg-charcoal/[0.02] border border-charcoal/10 rounded-lg p-3 text-xs focus:border-gold focus:outline-none transition-colors"
                          placeholder="isabella@parisianeditorial.com"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[10px] tracking-widest text-charcoal/60 uppercase mb-1">Delivery Address</label>
                        <textarea
                          required
                          rows={3}
                          value={shippingForm.address}
                          onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                          className="w-full bg-charcoal/[0.02] border border-charcoal/10 rounded-lg p-3 text-xs focus:border-gold focus:outline-none transition-colors resize-none"
                          placeholder="Avenue des Champs-Élysées, Penthouse 43, Paris, France"
                        />
                      </div>
                    </div>

                    <div className="border-t border-charcoal/5 pt-4 mt-6">
                      <div className="flex justify-between text-xs font-medium text-charcoal mb-2">
                        <span>Items Subtotal:</span>
                        <span>${totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs font-medium text-charcoal mb-4">
                        <span>Luxury Express Courier:</span>
                        <span className="text-gold uppercase tracking-wider font-bold">COMPLIMENTARY</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('idle')}
                        className="flex-1 py-3 text-xs tracking-widest font-sans font-medium text-charcoal border border-charcoal/10 rounded-full hover:bg-charcoal/5 transition-colors cursor-pointer"
                      >
                        BACK TO BAG
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 text-xs tracking-widest font-sans font-semibold text-alabaster bg-charcoal rounded-full hover:bg-gold transition-colors cursor-pointer"
                      >
                        CONFIRM & BRING
                      </button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'complete' && (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-5 py-20 px-4">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full text-gold/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <svg className="w-8 h-8 text-gold animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <h4 className="font-serif text-2xl font-light tracking-wide text-charcoal">COMMISSION ENVELOPE SEALED</h4>
                      <p className="font-sans text-[11px] text-charcoal/50 leading-relaxed max-w-sm mt-2">
                        Thank you, <span className="font-medium text-charcoal">{shippingForm.name}</span>. Your luxury bespoke jewelry order has been securely registered in the Celestique Celestial ledger.
                      </p>
                      <p className="font-sans text-[11px] text-gold italic font-medium mt-1">
                        A verification receipt acts on: {shippingForm.email}
                      </p>
                    </motion.div>
                    <button
                      onClick={() => {
                        updateCartQuantity('all', -999); // We trigger a custom clear in App
                        setIsBagOpen(false);
                        setCheckoutStep('idle');
                      }}
                      className="mt-6 py-2.5 px-6 text-xs tracking-widest font-sans font-medium text-alabaster bg-charcoal rounded-full hover:bg-gold transition-colors cursor-pointer"
                    >
                      CONTINUE BRROWSING
                    </button>
                  </div>
                )}
              </div>

              {/* Drawer Footer (Subtotal and Checkout CTA) */}
              {cart.length > 0 && checkoutStep === 'idle' && (
                <div className="p-6 border-t border-charcoal/10 bg-charcoal/[0.01]">
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-serif text-sm tracking-widest text-charcoal">Subtotal Estimation</span>
                    <span className="font-sans text-lg font-semibold text-charcoal">${totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full py-3.5 text-xs font-sans font-semibold tracking-[0.15em] text-alabaster bg-charcoal hover:bg-gold rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      PROCEED TO DELIVERY <X size={12} className="rotate-45" />
                    </button>
                    <p className="font-sans text-[10px] text-charcoal/40 text-center leading-relaxed">
                      Complimentary tracked express shipping & bespoke luxury packaging included.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
