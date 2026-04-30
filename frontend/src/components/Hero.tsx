"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-white flex flex-col md:flex-row items-center justify-center px-6 md:px-12"
    >
      {/* Layer 1: Background Interlocking Typography 'M&M' */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 
          className="font-serif text-sage-green opacity-10 italic leading-none tracking-tighter"
          style={{
            fontSize: "clamp(12rem, 35vw, 45rem)",
          }}
        >
          M&M
        </h2>
      </div>

      {/* Vertical Accent: EST. 2026 (Grouped with content) */}
      <div className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
        <div className="w-px h-16 bg-black/10" />
        <span className="[writing-mode:vertical-lr] text-[11px] font-medium tracking-[0.6em] text-[#1A1A1A]/40 uppercase rotate-180">
          EST. 2026
        </span>
        <div className="w-px h-16 bg-black/10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between h-full py-12 md:py-0">
        
        {/* Left Column (60%): Typography Focus */}
        <div className="w-full md:w-[55%] flex flex-col justify-center text-center md:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            <h1 className="font-serif text-5xl md:text-[6.5vw] leading-[1.05] text-[#1A1A1A] tracking-tight">
              Artisanal Brews <br />
              <span className="text-sage-green italic"> & </span> <br />
              Botanical Wonders
            </h1>
            
            <div className="w-12 h-[1px] bg-sage-green mx-auto md:mx-0 opacity-40" />
            
            <p className="text-[#1A1A1A] font-sans font-light text-sm md:text-base max-w-md leading-relaxed tracking-[0.15em] uppercase opacity-70">
              Where every leaf tells a story and every cup holds a secret.
            </p>
          </motion.div>
        </div>

        {/* Right Column (40%): Visual Focus (Unclipped Asset) */}
        <div className="w-full md:w-[45%] h-full flex items-center justify-center mt-12 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-h-[60vh] md:max-h-[80vh] aspect-square md:aspect-auto h-full flex items-center justify-center"
          >
            <Image
              src="/hero.png"
              alt="Artisanal Brews and Botanical Wonders"
              width={800}
              height={1000}
              priority
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            />
          </motion.div>
        </div>
      </div>

      {/* Subtle Bottom Aesthetic Line */}
      <div className="absolute bottom-16 left-24 right-24 h-px bg-black/5 hidden md:block" />
    </section>
  );
};
