"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, FeaturedProduct } from "@/app/actions";
import { useStitchCart } from "@/context/stitch-cart-context";

const CardSkeleton = () => (
  <div className="flex flex-col gap-6 animate-pulse">
    <div className="aspect-[4/5] bg-gray-100 rounded-none w-full" />
    <div className="h-6 bg-gray-100 w-3/4" />
    <div className="h-4 bg-gray-100 w-1/4" />
  </div>
);

const ProductCard = ({ product, index }: { product: FeaturedProduct; index: number }) => {
  const { addToCart } = useStitchCart();
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Keep subtle parallax while overscanning so no edge strip appears.
  const yImage = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: index * 0.1,
          },
        },
        hover: {
          y: -10,
          transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
        }
      }}
      className={`flex-shrink-0 w-[85vw] md:w-auto snap-center flex flex-col gap-6 group cursor-pointer will-change-transform transform-gpu ${
        index === 1 ? "md:mt-24" : ""
      }`}
    >
      {/* Visual Container (Image + Border) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5DC]/30 block">
        <motion.div
          style={{ y: yImage }}
          variants={{
            hover: { scale: 1.05 }
          }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-x-0 -top-[12%] h-[124%] block"
        >
          <Image
            src={product.image || "/hero.png"}
            alt={product.name}
            fill
            className="object-cover block"
          />
        </motion.div>

        {/* Stitch Border Animation - Explicitly hidden in idle state */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="var(--color-sage-green)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 0, opacity: 0 }}
            variants={{
              hover: { pathLength: 1, opacity: 1 },
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ strokeDasharray: "4 6" }}
          />
        </svg>
      </div>

      {/* Description Content - Stable within the flex column */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs text-black/40 uppercase tracking-[0.2em] font-sans">
            {product.subCategory}
          </p>
          <h3 className="text-xl font-serif text-[#1A1A1A]">
            {product.name}
          </h3>
        </div>
        <motion.div
          whileHover={{ opacity: 0.7, scale: 0.98 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
            });
          }}
          className="flex items-center gap-2 text-terracotta cursor-pointer select-none transition-all duration-300"
        >
          <span className="font-bold tracking-wider text-sm md:text-base">
            LKR {product.price.toLocaleString()}
          </span>
          <div className="w-6 h-6 rounded-full border border-terracotta/30 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getFeaturedProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Editorial Header */}
      <div className="text-center mb-20 space-y-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-sage-green italic font-serif text-lg tracking-wide"
        >
          Hand-picked for the refined palate.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-[#1A1A1A] font-serif text-4xl md:text-6xl tracking-tight"
        >
          The Artisanal Selection
        </motion.h2>
      </div>

      {/* Grid / Carousel */}
      <div className="w-full max-w-7xl">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex md:grid md:grid-cols-3 gap-12 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-24 md:mt-32">
        <Link href="/menu" className="group relative inline-block py-2 text-sm font-bold tracking-[0.3em] uppercase text-[#1A1A1A]">
          Explore Full Menu
          <span className="absolute bottom-0 left-0 w-0 h-px bg-[#1A1A1A] transition-all duration-500 group-hover:w-full" />
          <span className="absolute bottom-0 right-0 w-0 h-px bg-[#1A1A1A] transition-all duration-500 group-hover:w-full" />
        </Link>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};
