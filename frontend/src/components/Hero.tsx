"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
  return (
    <section 
      className="relative w-full h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-white px-6 md:px-12"
    >
      {/* Layer 1: Background Interlocking Typography 'M&M' (Centered) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <h2 
          className="font-serif text-sage-green opacity-10 italic leading-none tracking-tighter"
          style={{
            fontSize: "clamp(12rem, 35vw, 45rem)",
          }}
        >
          M&M
        </h2>
      </div>

      {/* Vertical Accent: EST. 2026 (Centered with content) */}
      <div className="hidden md:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-6 z-20">
        <div className="w-px h-16 bg-black/10" />
        <span className="[writing-mode:vertical-lr] text-[11px] font-medium tracking-[0.6em] text-[#1A1A1A]/40 uppercase rotate-180">
          EST. 2026
        </span>
        <div className="w-px h-16 bg-black/10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-center h-full">
        
        {/* Left Column (60%): Typography Focus */}
        <div className="w-full md:w-[60%] flex flex-col justify-center text-center md:text-left h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-serif text-6xl md:text-[8vw] leading-[1.05] tracking-tighter text-[#1A1A1A]">
              Artisanal Brews <span className="text-sage-green">&</span> <br />
              <span className="text-sage-green italic">Botanical</span> Wonders
            </h1>
            
            <div className="w-12 h-[1px] bg-sage-green mx-auto md:mx-0 opacity-40 my-8" />
            
            <p className="text-[#1A1A1A] font-sans font-light text-xs md:text-sm max-w-md leading-relaxed tracking-[0.2em] uppercase opacity-70">
              Where every leaf tells a story and every cup holds a secret.
            </p>
          </motion.div>
        </div>

        {/* Right Column (40%): Visual Focus */}
        <div className="w-full md:w-[40%] flex items-center justify-center h-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full h-full max-h-[70vh] flex items-center justify-center"
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
