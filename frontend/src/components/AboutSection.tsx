"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const AboutSection = () => {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center px-6 md:px-12">
      {/* Decorative Botanical Accent */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute -top-24 -right-24 md:-top-48 md:-right-48 w-64 h-64 md:w-[600px] md:h-[600px] pointer-events-none select-none z-0"
      >
        <Image
          src="/botanical-accent.png"
          alt="Botanical Accent"
          fill
          className="object-contain filter drop-shadow-[0_20px_40px_rgba(120,134,107,0.4)]"
        />
      </motion.div>

      {/* Main Content Stack */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-12">
        
        {/* Pre-Heading */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.4, y: 0 }}
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

        {/* Narrative Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-6 max-w-2xl"
        >
          <p className="font-sans font-light text-base md:text-lg leading-relaxed text-[#1A1A1A]">
            Born from the misty ridges of Hawaii and the grounding scent of fresh espresso, Moss & Mocha is more than a cafe—it's a biophilic sanctuary. We believe that true luxury lies in the balance between the wild and the refined.
          </p>
          <p className="font-sans font-light text-base md:text-lg leading-relaxed text-[#1A1A1A]">
            Every blend is ethically sourced, and every space is designed to breathe, inviting you to reconnect with the silence of the earth while savoring the craft of the artisanal hand.
          </p>
        </motion.div>

        {/* Learn More Button */}
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

              {/* 'Stitch-trace' Hover Animation */}
              <svg className="absolute -inset-[2px] w-[calc(100%+4px)] h-[calc(100%+4px)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  fill="none"
                  stroke="var(--color-sage-green)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  initial={{ pathLength: 0 }}
                  variants={{
                    hover: { 
                      pathLength: 1,
                      transition: { duration: 1.2, ease: "easeInOut" }
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
