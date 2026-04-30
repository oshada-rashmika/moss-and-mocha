"use client";

import React from "react";
import { motion } from "framer-motion";

const row1 = [
  "Pacific Cold Brews",
  "Island Espresso Creations",
  "Hibiscus Infused Lattes",
  "Artisanal Ohana Blends",
];

const row2 = [
  "Monstera Mists",
  "Lava-Soil Succulents",
  "Rainforest Ferns",
  "Botanical Bites",
];

const Sparkle = () => (
  <span className="text-terracotta mx-4 md:mx-12 select-none">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  </span>
);

export const CategoryRibbon = () => {
  return (
    <section className="relative h-64 md:h-[50vh] bg-forest-green flex flex-col justify-center overflow-hidden border-y border-white/5">
      {/* Background Subtle Grain */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

      <div className="relative z-10 space-y-4 md:space-y-8">
        {/* Row 1: Leftward Marquee */}
        <div className="flex overflow-hidden select-none group">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
            style={{ animationDuration: '60s' }} // Further slowdown on hover logic via CSS or motion props
          >
            {[...row1, ...row1, ...row1, ...row1].map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="font-sans text-4xl md:text-7xl font-bold uppercase tracking-tighter text-cream hover:text-terracotta transition-colors duration-500 cursor-default px-4">
                  {item}
                </span>
                <Sparkle />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="flex overflow-hidden select-none group">
          <motion.div
            initial={{ x: "-50%" }}
            animate={{ x: 0 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
          >
            {[...row2, ...row2, ...row2, ...row2].map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="font-sans text-4xl md:text-7xl font-bold uppercase tracking-tighter text-cream hover:text-terracotta transition-colors duration-500 cursor-default px-4">
                  {item}
                </span>
                <Sparkle />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Edge Fades for Luxury Depth */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-forest-green to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-forest-green to-transparent z-20 pointer-events-none" />
    </section>
  );
};
