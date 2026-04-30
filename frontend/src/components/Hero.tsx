"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Background text moves slower (parallax)
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);
  // Foreground image moves slightly faster or at a different rate
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Texture: Subtle Organic Grain & Leaf Shadows */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-sage-green/10 via-transparent to-terracotta/5 blur-3xl" />
      </div>

      {/* Typography Layer (Background) */}
      <motion.div 
        style={{ y: yText }}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <h2 
          className="font-serif text-sage-green opacity-[0.15] text-center whitespace-nowrap select-none leading-none tracking-tighter"
          style={{
            fontSize: "clamp(4rem, 15vw, 18rem)",
          }}
        >
          Moss & Mocha
        </h2>
      </motion.div>

      {/* Asset Layer (Foreground) */}
      <motion.div 
        style={{ y: yImage }}
        className="relative z-20 w-full max-w-4xl px-6 flex flex-col items-center"
      >
        <div className="relative w-[80vw] h-[50vh] md:w-[600px] md:h-[600px] transition-all duration-700">
          <Image
            src="/stitch.png"
            alt="Stitch Moss & Mocha"
            fill
            priority
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          />
        </div>

        {/* Responsive UI & Content */}
        <div className="mt-8 text-center max-w-2xl px-4">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#1A1A1A] text-lg md:text-xl font-medium tracking-tight mb-8"
          >
            Where every leaf tells a story and every cup holds a secret.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.8 }}
            className="group relative px-10 py-4 bg-terracotta text-white font-semibold rounded-full overflow-hidden shadow-xl hover:shadow-terracotta/20 transition-all duration-300"
          >
            <span className="relative z-10">Explore the Menu</span>
            
            {/* Blooming Hover Effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-terracotta to-[#d15d48] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-30" />
    </section>
  );
};
