import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Sparkles, X, ChevronRight } from 'lucide-react';
import { Product, CartItem, PRODUCTS } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Categories from './components/Categories';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import { OurProductsPage, CategoriesPage, AboutBrandPage } from './components/Pages';

interface LuxuryToast {
  id: string;
  message: string;
  productName: string;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [filteredCategory, setFilteredCategory] = useState<string>('ALL');
  const [toasts, setToasts] = useState<LuxuryToast[]>([]);
  const [introAnimationComplete, setIntroAnimationComplete] = useState(false);
  const [currentView, setCurrentView] = useState<string>('home');

  // Load cart from localStorage or start empty
  useEffect(() => {
    const savedCart = localStorage.getItem('celestique_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error parsing cart state:', err);
      }
    }
    
    // Simulate initial editorial page fade-in
    const timer = setTimeout(() => {
      setIntroAnimationComplete(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Save cart modifications
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('celestique_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product, options?: { size?: string; length?: string }) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let updatedCart: CartItem[] = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { product, quantity: 1 }];
    }

    saveCart(updatedCart);

    // Trigger a pristine, elegant Luxury Toast
    const id = Date.now().toString();
    const message = `${product.name} has been added to your selections basket.`;
    setToasts((prev) => [...prev, { id, message, productName: product.name }]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    if (productId === 'all' && delta === -999) {
      // Clear entire basket (Checkout success)
      saveCart([]);
      return;
    }

    const updatedCart = cart
      .map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.product.id !== productId);
    saveCart(updatedCart);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setFilteredCategory(categoryName.toUpperCase());
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDiscoverClick = () => {
    setFilteredCategory('ALL');
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-alabaster flex flex-col justify-between relative text-charcoal selection:bg-gold selection:text-alabaster font-sans antialiased">
      
      {/* Intro Editorial Opening Transition */}
      <AnimatePresence>
        {!introAnimationComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 bg-alabaster z-50 flex flex-col items-center justify-center text-center p-6"
          >
            <div className="space-y-6 flex flex-col items-center">
              {/* Cinematic DotLottie Rings Animation as Preloader centerpiece */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="w-[200px] h-[200px] flex items-center justify-center relative translate-y-2 pointer-events-none select-none"
                dangerouslySetInnerHTML={{
                  __html: `<dotlottie-wc src="https://lottie.host/7b635083-8f74-4b0c-b70f-e53f49006e44/e428rRGYAz.lottie" style="width: 200px; height: 200px" autoplay loop></dotlottie-wc>`
                }}
              />

              <div className="space-y-4 text-center mt-2">
                <motion.span
                  initial={{ opacity: 0, tracking: '0.1em' }}
                  animate={{ opacity: 0.5, tracking: '0.4em' }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="block text-[10px] sm:text-xs text-charcoal tracking-[0.3em] font-sans font-semibold uppercase"
                >
                  ORBIS LUXE COUTURE
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 1.0 }}
                  className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.11em] sm:tracking-[0.2em] text-charcoal font-normal uppercase flex items-center justify-center translate-x-[0.05em] whitespace-nowrap"
                >
                  CEL
                  <span className="relative">
                    E
                    <svg className="absolute -top-1 sm:-top-1.5 left-1.5 sm:left-2 w-2.5 sm:w-3 h-2.5 sm:h-3 text-gold" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                  </span>
                  STI
                  <span className="relative">
                    Q
                    <svg className="absolute -top-1.5 sm:-top-2 left-2 sm:left-2.5 w-2.5 sm:w-3 h-2.5 sm:h-3 text-gold" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                    </svg>
                  </span>
                  UE
                </motion.h1>
                <div className="h-[1px] w-12 bg-gold/40 mx-auto mt-4" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="block font-serif text-xs md:text-sm tracking-widest text-charcoal italic"
                >
                  &ldquo;Timeless Jewelry Campaigns&rdquo;
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Campaign Framework */}
      <div className="flex-1 flex flex-col">
        {/* Navigation bar */}
        <Header 
          cart={cart}
          updateCartQuantity={updateCartQuantity}
          removeFromCart={removeFromCart}
          onQuickView={(p) => setQuickViewProduct(p)}
          scrollToSection={scrollToSection}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />

        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Segment */}
              <Hero 
                onCategoryClick={handleCategorySelect}
                onDiscoverClick={handleDiscoverClick}
              />

              {/* Editorial Value Statement Panel */}
              <div className="w-full bg-charcoal text-alabaster py-12 select-none overflow-hidden relative border-y border-gold/10">
                {/* Infinite sliding layout look, very editorial and high prestige */}
                <div className="max-w-[1600px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left text-xs tracking-[0.22em] font-sans font-normal">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-gold shrink-0 animate-pulse" size={15} />
                    <span>HANDMADE COMMISSIONS AT ANTWERP LABS</span>
                  </div>
                  <div className="h-[1px] w-12 bg-gold/30 hidden sm:block"></div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-gold shrink-0" size={15} />
                    <span>COMPLIMENTARY SECURE WORLDWIDE EXPRESS DELIVERY</span>
                  </div>
                  <div className="h-[1px] w-12 bg-gold/30 hidden sm:block"></div>
                  <div>
                    <span>ESTABLISHED MCMXCVI CELESTIAL STANDARD</span>
                  </div>
                </div>
              </div>

              {/* About segment */}
              <About />

              {/* Categories segment */}
              <Categories 
                onCategorySelect={handleCategorySelect} 
                onSeeCollection={handleDiscoverClick}
              />
            </motion.div>
          )}

          {currentView === 'products' && (
            <motion.div
              key="products-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OurProductsPage 
                onBack={() => setCurrentView('home')} 
                onQuickViewSelect={(p) => setQuickViewProduct(p)}
                onAddToCart={(p) => handleAddToCart(p)}
                activeCategory={filteredCategory}
                setActiveCategory={setFilteredCategory}
              />
            </motion.div>
          )}

          {currentView === 'categories' && (
            <motion.div
              key="categories-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <CategoriesPage 
                onBack={() => setCurrentView('home')} 
                onQuickViewSelect={(p) => setQuickViewProduct(p)}
                onAddToCart={(p) => handleAddToCart(p)}
                onCategoryClick={handleCategorySelect}
              />
            </motion.div>
          )}

          {currentView === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AboutBrandPage onBack={() => setCurrentView('home')} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer campaign segment */}
        <Footer 
          scrollToSection={scrollToSection}
          setFilteredCategory={setFilteredCategory}
          onNavigate={(view) => setCurrentView(view)}
        />
      </div>

      {/* IMMERSIVE QUICK VIEW DETAIL WINDOWS */}
      <QuickViewModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p) => {
          handleAddToCart(p);
          setQuickViewProduct(null);
        }}
      />

      {/* LUXURY TOAST POPULATIONS CONTAINER (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-auto bg-alabaster/95 backdrop-blur-md border border-charcoal/15 text-charcoal rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 border-l-4 border-l-gold"
            >
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <Sparkles size={11} className="text-gold" />
                  <span className="font-serif text-[10px] tracking-widest text-gold font-bold">CASKET RESERVATION</span>
                </div>
                <p className="font-sans text-[11.5px] font-medium text-charcoal/80 leading-snug">
                  {toast.productName}
                </p>
                <p className="font-sans text-[10.5px] text-charcoal/55 leading-tight font-light">
                  Secured into your collection ledger successfully.
                </p>
              </div>

              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="p-1 hover:text-gold text-charcoal/40 hover:bg-charcoal/[0.04] rounded-full transition-colors cursor-pointer shrink-0"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
