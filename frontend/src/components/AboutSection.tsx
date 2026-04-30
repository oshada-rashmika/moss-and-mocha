"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const AboutSection = () => {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6 md:px-12">
      {/* Decorative Botanical Accent with Seamless Blending */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        whileInView={{ opacity: 0.25, scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-24 -right-24 md:-top-32 md:-right-32 w-64 h-64 md:w-[700px] md:h-[700px] pointer-events-none select-none z-0"
        style={{
          maskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 80%)",
        }}
      >
        <Image
          src="/botanical-accent.png"
          alt="Botanical Accent"
          fill
          className="object-contain mix-blend-multiply"
        />
      </motion.div>

      {/* Main Content Stack */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-12">
        
        {/* Pre-Heading */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.5, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[#1A1A1A] text-[10px] md:text-xs font-semibold tracking-[0.6em] uppercase"
        >
          Our Story
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif text-4xl md:text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] text-[#1A1A1A] tracking-tight"
        >
          Where <span className="text-sage-green italic">Nature</span> Meets the <br className="hidden md:block" />
          Artisanal Soul
        </motion.h2>

        {/* Narrative Text - Sri Lankan Soul */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-6 max-w-2xl"
        >
          <p className="font-sans font-light text-base md:text-lg leading-relaxed text-[#1A1A1A]">
            Rooted in the lush highlands of Sri Lanka and inspired by the rhythmic spirit of Hawaii, Moss & Mocha is a biophilic sanctuary. We believe that true luxury lies in the balance between the wild and the refined.
          </p>
          <p className="font-sans font-light text-base md:text-lg leading-relaxed text-[#1A1A1A]">
            Every blend is ethically sourced, and every space is designed to breathe, inviting you to reconnect with the silence of the earth while savoring the craft of the artisanal hand.
          </p>
        </motion.div>

        {/* Learn More Button with Full Continuous 'Stitch-trace' */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/about">
            <motion.button
              whileHover="hover"
              initial="initial"
              className="group relative px-12 py-5 text-[#1A1A1A] font-bold tracking-[0.2em] uppercase text-[10px] transition-all duration-300"
            >
              <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.3em]">Learn More</span>
              
              {/* Soft Terracotta Bottom Border */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-terracotta transition-all duration-500 group-hover:h-full group-hover:bg-terracotta/5" />

              {/* 'Stitch-trace' Hover Animation - Continuous Loop */}
              <svg className="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-visible">
                <motion.rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="var(--color-sage-green)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  variants={{
                    hover: { 
                      pathLength: 1,
                      transition: { duration: 1, ease: "easeInOut" }
                    }
                  }}
                />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Decorative Bottom Detail */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-[1px] h-12 bg-black/10" />
      </div>
    </section>
  );
};
