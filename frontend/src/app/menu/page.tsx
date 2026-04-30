"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getAllProducts, Product } from "@/app/actions";
import { useStitchCart } from "@/context/stitch-cart-context";

// Custom SVGs for Visual Category Selector
const CategoryIcons = {
  ALL: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  BREWS: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
      <line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>
    </svg>
  ),
  BOTANICALS: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 19c-3.3 0-6-2.7-6-6 0-3.3 2.7-6 6-6s6 2.7 6 6c0 3.3-2.7 6-6 6Z"/>
      <path d="M12 13V2"/><path d="m12 13-4-4"/><path d="m12 13 4-4"/>
    </svg>
  ),
  BOBA: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 2H7l-1 18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2Z"/>
      <path d="M14 2v4"/><circle cx="9" cy="18" r="1"/><circle cx="12" cy="16" r="1"/><circle cx="15" cy="18" r="1"/>
    </svg>
  ),
  AESTHETIC_LABELS: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l5.58-5.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
      <path d="M7 7h.01"/>
    </svg>
  ),
  BARISTA_CLASSICS: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v11"/><path d="M8 8V7h1"/>
      <rect x="13" y="2" width="8" height="10" rx="2"/>
    </svg>
  )
};

const categories = [
  { id: "ALL", label: "Discovery" },
  { id: "BREWS", label: "Brews" },
  { id: "BOTANICALS", label: "Botanicals" },
  { id: "BOBA", label: "Boba" },
  { id: "AESTHETIC_LABELS", label: "Labels" },
  { id: "BARISTA_CLASSICS", label: "Classics" }
];

const priceTiers = [
  { id: "ALL", label: "All Tiers" },
  { id: "UNDER_1000", label: "Under 1,000" },
  { id: "1000_2000", label: "1,000 - 2,000" },
  { id: "PREMIUM", label: "Premium" }
];

const sortOptions = [
  { id: "CURATED", label: "Curated" },
  { id: "PRICE_LOW", label: "Price: Low to High" },
  { id: "NAME_AZ", label: "Botanical Name (A-Z)" }
];

const SortSelector = ({ value, onChange, options }: { value: string; onChange: (val: string) => void; options: typeof sortOptions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-transparent font-serif text-sm text-[#1A1A1A] border-b border-black/10 pb-1 outline-none min-w-[140px] justify-between group"
      >
        <span>{selectedOption?.label}</span>
        <svg 
          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-full right-0 mt-2 z-40 bg-[#1A1A1A] rounded-xl shadow-2xl overflow-hidden min-w-[220px] border border-white/10"
            >
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    onChange(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-6 py-4 text-[13px] font-serif transition-all duration-300 flex items-center justify-between group ${
                    value === opt.id ? "text-[#FDFCF0]" : "text-[#FDFCF0]/40 hover:text-[#FDFCF0] hover:bg-white/5"
                  }`}
                >
                  <span className={value === opt.id ? "font-medium" : ""}>{opt.label}</span>
                  {value === opt.id && (
                    <motion.div 
                      layoutId="active-sort-dot"
                      className="w-1.5 h-1.5 rounded-full bg-[#F2B8C6] shadow-[0_0_8px_rgba(242,184,198,0.4)]"
                    />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPriceTier, setSelectedPriceTier] = useState("ALL");
  const [sortBy, setSortBy] = useState("CURATED");
  const { addToCart } = useStitchCart();

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== "ALL") {
      result = result.filter(p => p.mainCategory === selectedCategory);
    }

    // Filter by Price Tier
    if (selectedPriceTier === "UNDER_1000") {
      result = result.filter(p => p.price < 1000);
    } else if (selectedPriceTier === "1000_2000") {
      result = result.filter(p => p.price >= 1000 && p.price <= 2000);
    } else if (selectedPriceTier === "PREMIUM") {
      result = result.filter(p => p.price > 2000);
    }

    // Sort
    if (sortBy === "PRICE_LOW") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "NAME_AZ") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "CURATED") {
      // Special products first
      result.sort((a, b) => (b.isSpecial ? 1 : 0) - (a.isSpecial ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedPriceTier, sortBy]);

  return (
    <main className="min-h-screen bg-[#FDFCF0] pt-32 pb-24 px-6 md:px-12">
      {/* Boutique Control Bar */}
      <section className="max-w-7xl mx-auto space-y-12 mb-16">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-sage-green">The Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1A1A1A]">Curated Offerings</h1>
        </div>

        {/* Visual Category Carousel */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-8 border-y border-black/5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center gap-3 transition-all duration-500 group ${
                selectedCategory === cat.id ? "text-sage-green" : "text-black/30 hover:text-black/60"
              }`}
            >
              <div className={`p-4 rounded-full transition-all duration-700 ${
                selectedCategory === cat.id ? "bg-sage-green/10 scale-110" : "bg-transparent"
              }`}>
                {CategoryIcons[cat.id as keyof typeof CategoryIcons]}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-serif">
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* Secondary Filters: Price & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
          {/* Price Tiers */}
          <div className="flex items-center gap-6">
            <span className="text-[9px] uppercase tracking-widest text-black/40 font-bold">Investment</span>
            <div className="flex gap-4">
              {priceTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedPriceTier(tier.id)}
                  className={`text-[11px] font-medium tracking-wide px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedPriceTier === tier.id 
                      ? "bg-[#1A1A1A] text-[#FDFCF0] border-[#1A1A1A]" 
                      : "bg-transparent text-black/50 border-black/10 hover:border-black/30"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-widest text-black/40 font-bold">Sort By</span>
            <SortSelector 
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
            />
          </div>
        </div>
      </section>

      {/* Creative Asymmetric Grid */}
      <section className="max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.05,
                  ease: [0.23, 1, 0.32, 1] 
                }}
                className={`group relative flex flex-col space-y-6 ${
                  index % 4 === 1 ? "md:mt-24" : "" // Visual offset for asymmetry
                }`}
              >
                {/* Product Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-sm cursor-pointer group-hover:shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
                  <Image
                    src={product.image || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    priority={index < 6}
                  />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#1A1A1A] text-[#FDFCF0] py-5 text-[10px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                      <span>Quick Add</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      {/* Stitch-trace border animation on button */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-active:opacity-100">
                        <motion.rect
                          x="0" y="0" width="100%" height="100%"
                          fill="none" stroke="#F2B8C6" strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          whileTap={{ pathLength: 1 }}
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Special Badge */}
                  {product.isSpecial && (
                    <div className="absolute top-6 right-6">
                      <span className="bg-[#FFB7C5] text-[#1A1A1A] text-[8px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded-full">
                        Curated
                      </span>
                    </div>
                  )}
                </div>

                {/* Meta Data */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-sage-green">{product.subCategory}</p>
                    <h3 className="text-2xl font-serif text-[#1A1A1A]">{product.name}</h3>
                  </div>
                  <p className="text-sm font-medium text-[#1A1A1A]/60">LKR {product.price.toLocaleString()}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-48 text-center space-y-6">
            <p className="font-serif text-2xl text-black/20 italic">No products matched your selection.</p>
            <button 
              onClick={() => { setSelectedCategory("ALL"); setSelectedPriceTier("ALL"); }}
              className="text-xs font-bold uppercase tracking-widest text-terracotta border-b border-terracotta/30 pb-1"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
