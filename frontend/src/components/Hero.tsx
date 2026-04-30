"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax Logic
  // Background text: speed 0.2
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  // Foreground asset: speed 0.5
  const yAsset = useTransform(scrollYProgress, [0, 1], [0, 500]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white flex flex-col items-center justify-center"
    >
      {/* Layer 1: Background Heading (Deepest) */}
      <motion.div 
        style={{ y: yText }}
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
      >
        <h2 
          className="font-serif text-sage-green opacity-[0.15] text-center whitespace-nowrap select-none leading-none tracking-tighter"
          style={{
            fontSize: "clamp(10rem, 18vw, 25vw)",
          }}
        >
          Moss & Mocha
        </h2>
      </motion.div>

      {/* Layer 2: Foreground Asset & Content (Middle) */}
      <motion.div 
        style={{ y: yAsset }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center px-6"
      >
        {/* Main Asset */}
        <div className="relative w-[80vw] h-[40vh] md:w-[600px] md:h-[600px] flex items-center justify-center transition-all duration-700">
          <Image
            src="/hero.png"
            alt="Hero Moss & Mocha"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* Content & CTA */}
        <div className="text-center mt-8 flex flex-col items-center gap-6">
          <motion.p 
            className="text-black text-sm md:text-base font-medium tracking-[0.3em] uppercase"
          >
            Where every leaf tells a story and every cup holds a secret.
          </motion.p>

          <motion.button
            whileHover="hover"
            initial="initial"
            className="group relative px-12 py-5 bg-terracotta text-white font-bold tracking-widest uppercase text-xs rounded-none transition-all duration-500 overflow-visible"
          >
            <span className="relative z-10">Explore the Menu</span>
            
            {/* Stitch-trace Effect: 1px Sage Green border drawing itself */}
            <svg className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none">
              <motion.rect
                x="0.5"
                y="0.5"
                width="calc(100% - 1px)"
                height="calc(100% - 1px)"
                fill="none"
                stroke="var(--color-sage-green)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                variants={{
                  hover: { 
                    pathLength: 1, 
                    opacity: 1,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }
                }}
              />
            </svg>
            
            {/* Background Shift */}
            <div className="absolute inset-0 bg-[#c65e4a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </div>
      </motion.div>

      {/* Viewport Fix: Ensuring visibility on mobile */}
      <style jsx>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 25vw !important;
          }
        }
      `}</style>
    </section>
  );
};
