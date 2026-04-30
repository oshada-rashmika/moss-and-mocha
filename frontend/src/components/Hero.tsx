"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Magnetic Button Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull distance
    const threshold = 150;
    if (Math.abs(distanceX) < threshold && Math.abs(distanceY) < threshold) {
      x.set(distanceX * 0.4);
      y.set(distanceY * 0.4);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-white flex flex-col md:flex-row items-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Interlocking Layers: 'M&M' */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 className="font-serif text-[40vw] leading-none tracking-tighter opacity-[0.03] flex items-center">
          <span className="text-sage-green z-0">M</span>
          <span className="text-black z-20 mx-[-5vw]">&</span>
          <span className="text-sage-green z-0">M</span>
        </h2>
      </div>

      {/* Vertical Accent: EST. 2026 */}
      <div className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-30">
        <div className="w-px h-24 bg-black/10" />
        <span className="[writing-mode:vertical-lr] text-[10px] font-medium tracking-[0.5em] text-black/40 uppercase rotate-180">
          EST. 2026
        </span>
        <div className="w-px h-24 bg-black/10" />
      </div>

      {/* Left Column (60%): Typography Focus */}
      <div className="w-full md:w-[60%] h-full flex flex-col justify-center px-8 md:px-24 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-[7vw] leading-[1.1] text-[#1A1A1A] max-w-4xl">
            Artisanal Brews <br />
            <span className="text-sage-green">&</span> <span className="italic">Botanical</span> <br />
            Wonders
          </h1>
          
          <p className="mt-8 text-black/60 font-light text-sm md:text-base max-w-md leading-relaxed tracking-wide">
            A curated sanctuary where high-fashion aesthetics meet the grounding soul of organic coffee. Experience the silence of nature in every sip.
          </p>

          <div className="mt-12">
            <motion.button
              ref={buttonRef}
              style={{ x: springX, y: springY }}
              onMouseLeave={handleMouseLeave}
              className="group relative px-10 py-4 text-[#1A1A1A] font-semibold tracking-widest uppercase text-xs transition-all duration-300"
            >
              <span className="relative z-10">Explore the Menu</span>
              
              {/* Luxury Underline / Full Fill */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta transition-all duration-500 group-hover:h-full group-hover:bg-terracotta/10" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Right Column (40%): Visual Focus */}
      <div className="w-full md:w-[40%] h-[50vh] md:h-full relative flex items-center justify-center p-8 md:p-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full h-full max-h-[70vh] aspect-[4/5] z-10"
        >
          {/* Organic Leaf-Shape Mask for hero.png */}
          <div 
            className="relative w-full h-full overflow-hidden shadow-2xl transition-all duration-700"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)", // Hand-drawn/Organic leaf-ish shape
            }}
          >
            <Image
              src="/hero.png"
              alt="Artisanal Brews"
              fill
              className="object-cover scale-110 hover:scale-100 transition-transform duration-[2s] ease-out"
            />
          </div>

          {/* "Stitch" Detail: Motion-path SVG sewing the edge */}
          <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] pointer-events-none z-20">
             <motion.path
                d="M 50 10 Q 110 50 100 120 T 50 230" // Abstract stitch path
                fill="none"
                stroke="var(--color-sage-green)"
                strokeWidth="2"
                strokeDasharray="5 10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "linear" }
                }}
             />
          </svg>
        </motion.div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sage-green/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-12 left-24 right-24 h-px bg-black/5 hidden md:block" />
    </section>
  );
};
