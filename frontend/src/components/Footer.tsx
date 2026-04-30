"use client";

import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#1B2E1E] py-12 px-6 border-t border-[#FDFCF0]/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-4">
        <p className="font-serif text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#FDFCF0]/60 text-center">
          © 2026 Moss & Mocha. All Rights Reserved.
        </p>
        
        <div className="flex items-center gap-2 font-serif text-sm md:text-base text-[#FDFCF0]/80 text-center">
          <span>Developed with</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="inline-block"
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="#FFB7C5" 
              className="drop-shadow-[0_0_8px_rgba(255,183,197,0.4)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.span>
          <span>by <span className="text-[#FDFCF0]">Oshada Rashmika</span> for <span className="text-hibiscus-pink italic">Senuri Rukshani.</span></span>
        </div>
      </div>
    </footer>
  );
};
