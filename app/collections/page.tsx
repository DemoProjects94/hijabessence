"use client";

import { motion } from "framer-motion";
import { Filter, Heart, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/providers";

interface Product {
  id: string;
  name: string;
  fabric: string;
  category: string;
  type: string;
  color: string;
  hex_color: string;
  price_iqd: number;
  image_url: string;
}

export default function CollectionsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart, setIsCartOpen, cartCount } = useCart();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Filter States
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  // Derived filter options
  const categories = Array.from(new Set(products.map(p => p.category)));
  const types = Array.from(new Set(products.map(p => p.type)));
  const colors = Array.from(new Set(products.map(p => p.color)));

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false;
    if (activeType && p.type !== activeType) return false;
    if (activeColor && p.color !== activeColor) return false;
    if (p.price_iqd < priceRange[0] || p.price_iqd > priceRange[1]) return false;
    return true;
  });

  const ITEMS_PER_PAGE = 30;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);


  return (
    <main className="min-h-screen pb-36">
      <div className="pt-24 px-4 md:px-8 max-w-[1600px] mx-auto mb-8">
        <h1 className="text-4xl tracking-wide font-serif text-[color:var(--foreground)]">Collections</h1>
      </div>

      <div className="px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 text-[color:var(--foreground)]">
          <GlassCard className="sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-lg font-serif">
              <Filter className="w-5 h-5" />
              <h2>Filters</h2>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-sans opacity-50 uppercase tracking-wider mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveCategory(null)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${!activeCategory ? "bg-[color:var(--foreground)] text-[color:var(--background)]" : "glass-panel hover:opacity-100 opacity-60"}`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${activeCategory === cat ? "bg-[color:var(--foreground)] text-[color:var(--background)]" : "glass-panel hover:opacity-100 opacity-60"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-sans opacity-50 uppercase tracking-wider mb-3">Fabric Type</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setActiveType(null)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${!activeType ? "bg-[color:var(--foreground)] text-[color:var(--background)]" : "glass-panel hover:opacity-100 opacity-60"}`}
                >
                  All
                </button>
                {types.map(type => (
                  <button 
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-3 py-1 rounded-full text-xs transition-colors ${activeType === type ? "bg-[color:var(--foreground)] text-[color:var(--background)]" : "glass-panel hover:opacity-100 opacity-60"}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-sans opacity-50 uppercase tracking-wider mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                 <button 
                  onClick={() => setActiveColor(null)}
                  className={`w-8 h-8 rounded-full border border-current flex items-center justify-center text-[10px] ${!activeColor ? "ring-2 ring-current" : ""}`}
                >
                  All
                </button>
                {colors.map(color => {
                  const productWithColor = products.find(p => p.color === color);
                  return (
                    <button 
                      key={color}
                      onClick={() => setActiveColor(color)}
                      style={{ backgroundColor: productWithColor?.hex_color || '#000' }}
                      className={`w-8 h-8 rounded-full border border-current ${activeColor === color ? "ring-2 ring-current translate-y-[-2px] shadow-lg" : ""}`}
                      title={color}
                    />
                  )
                })}
              </div>
            </div>

            {/* Price Filter Mock */}
            <div>
              <h3 className="text-sm font-sans opacity-50 uppercase tracking-wider mb-3">Max Price</h3>
              <input 
                type="range" 
                min="0" 
                max="50000" 
                step="5000"
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-[#8B6914]"
              />
              <div className="mt-2 text-right text-xs opacity-60">
                Up to IQD {priceRange[1].toLocaleString()}
              </div>
            </div>
            
          </GlassCard>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64 text-white/50">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <RefreshCw className="w-6 h-6" />
              </motion.div>
            </div>
          ) : (
             <div className="flex justify-between items-center mb-6">
               <span className="opacity-50 text-sm text-[color:var(--foreground)]">Showing {paginatedProducts.length} of {filteredProducts.length} Results</span>
             </div>
          )}
          
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {paginatedProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/product/${product.id}`}>
                  <GlassCard className="p-0 overflow-hidden group h-full flex flex-col cursor-pointer hover:bg-[color:var(--foreground)]/5 transition-colors border-[color:var(--foreground)]/5 hover:border-[color:var(--foreground)]/20">
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
                      <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        fill 
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Favorite heart */}
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => toggleFav(e, product.id)}
                        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                          favorites.has(product.id)
                            ? "bg-red-500/90 text-white shadow-lg shadow-red-500/30"
                            : "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white"
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={favorites.has(product.id) ? "currentColor" : "none"} />
                      </motion.button>
                    </div>
                    <div className="p-4 relative z-10 flex flex-col flex-1 text-[color:var(--foreground)]">
                      <h3 className="text-lg font-serif leading-tight">{product.name}</h3>
                      <p className="text-xs opacity-60 font-sans mt-1 capitalize mb-4">{product.color} • {product.type}</p>
                      
                      <div className="mt-auto">
                        <span className="font-sans font-medium text-sm text-[#C4956A]">IQD {product.price_iqd.toLocaleString()}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2 flex-wrap">
              {/* Numbered page buttons */}
              {(() => {
                const pages: (number | 'ellipsis')[] = [];
                const maxVisible = 9;
                
                if (totalPages <= maxVisible + 1) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  // Smart pagination: show pages around current, with ellipsis
                  const half = Math.floor(maxVisible / 2);
                  let start = Math.max(1, currentPage - half);
                  let end = Math.min(totalPages - 1, start + maxVisible - 1);
                  
                  if (end - start < maxVisible - 1) {
                    start = Math.max(1, end - maxVisible + 1);
                  }
                  
                  for (let i = start; i <= end; i++) pages.push(i);
                  
                  if (end < totalPages - 1) pages.push('ellipsis');
                  if (end < totalPages) pages.push(totalPages);
                }
                
                return pages.map((page, idx) => {
                  if (page === 'ellipsis') {
                    return (
                      <span key={`ellipsis-${idx}`} className="w-8 h-10 flex items-center justify-center text-[color:var(--foreground)] opacity-40 text-sm select-none">
                        ···
                      </span>
                    );
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-sans font-medium transition-all ${
                        currentPage === page
                          ? "bg-[#5D4037] text-[#F5E6D3] shadow-lg shadow-[#5D4037]/30 scale-110"
                          : "glass-panel text-[color:var(--foreground)] opacity-60 hover:opacity-100 hover:bg-[#5D4037]/15 border border-[#8B6914]/10"
                      }`}
                    >
                      {page}
                    </button>
                  );
                });
              })()}

              {/* Next button */}
              <button
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className={`ml-2 px-5 h-10 rounded-xl flex items-center justify-center text-sm font-sans font-medium transition-all ${
                  currentPage === totalPages
                    ? "glass-panel text-[color:var(--foreground)] opacity-20 cursor-not-allowed"
                    : "glass-panel text-[#C4956A] hover:bg-[#5D4037]/15 border border-[#8B6914]/20 hover:border-[#8B6914]/40"
                }`}
              >
                Next →
              </button>
            </div>
          )}
          
          {!loading && filteredProducts.length === 0 && (
            <div className="w-full p-12 flex flex-col items-center justify-center glass-panel text-center text-[color:var(--foreground)]">
               <Filter className="w-8 h-8 opacity-30 mb-4" />
               <h3 className="text-xl mb-2">No matching pieces found</h3>
               <p className="opacity-50 font-sans text-sm">Try adjusting your filters to see more results.</p>
               <GlassButton size="sm" variant="ghost" className="mt-6 border border-current" onClick={() => {
                 setActiveCategory(null);
                 setActiveType(null);
                 setActiveColor(null);
                 setPriceRange([0, 100000]);
               }}>
                 Reset Filters
               </GlassButton>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
