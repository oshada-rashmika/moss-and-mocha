"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getReviews, Review } from "@/app/actions";

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    getReviews().then((data) => {
      setReviews(data);
    });
  }, []);

  // Cycle reviews every 8 seconds
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [reviews]);

  if (!mounted || reviews.length === 0) {
    return <div className="h-[50vh] bg-white w-full" />;
  }

  const currentReview = reviews[index];

  return (
    <section className="relative w-full h-[50vh] bg-white overflow-hidden flex items-center justify-center py-20 px-6 select-none">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center text-center space-y-10 will-change-transform transform-gpu">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentReview.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.23, 1, 0.32, 1] 
            }}
            className="flex flex-col items-center gap-8"
            style={{ transform: "translateZ(0)" }}
          >
            {/* Minimalist Accent: 5 Stars */}
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F2B8C6">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>

            {/* The Quote: High-Fashion Focus */}
            <blockquote className="font-serif text-3xl md:text-5xl text-[#1A1A1A] leading-[1.2] italic tracking-tight">
              "{currentReview.comment}"
            </blockquote>

            {/* Meta Data: Verified & Name */}
            <div className="flex flex-col items-center gap-3">
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] text-[#78866B]">
                {currentReview.name}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-[#78866B]/20" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#78866B]/50 font-medium">
                  Verified Guest
                </span>
                <div className="w-6 h-px bg-[#78866B]/20" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Progress Indicator */}
        <div className="flex gap-3 pt-4">
          {reviews.map((_, i) => (
            <div 
              key={i}
              className={`h-1 transition-all duration-1000 ease-out rounded-full ${
                i === index ? "w-8 bg-[#FFB7C5]" : "w-2 bg-[#FDFCF0] border border-black/5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
