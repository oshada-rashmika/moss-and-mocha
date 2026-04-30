"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Forced minimum visibility of 3 seconds for the brand reveal
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
          className="fixed inset-0 z-[9999] bg-[#1A2421] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center gap-12">
            {/* The Asset: Leaf-masked GIF */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.2 
              }}
              className="relative w-48 h-48 md:w-64 md:h-64"
            >
              <div 
                className="w-full h-full overflow-hidden border-2 border-[#F2B8C6]/30 shadow-[0_0_40px_rgba(242,184,198,0.1)]"
                style={{ 
                  borderRadius: "60% 40% 70% 30% / 30% 60% 40% 70%", // Organic Leaf Shape
                }}
              >
                <Image
                  src="/stitch-sad.gif"
                  alt="Stitch Reveal"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Typography: Pulsing Sanctuary Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: [0.4, 1, 0.4],
                y: 0 
              }}
              transition={{ 
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                y: {
                  duration: 1,
                  ease: "easeOut"
                },
                delay: 0.5
              }}
              className="text-center space-y-2"
            >
              <p className="font-serif text-[#FDFCF0] text-sm md:text-base tracking-[0.3em] uppercase font-light">
                Preparing your sanctuary
              </p>
              <div className="w-12 h-px bg-[#FDFCF0]/20 mx-auto" />
            </motion.div>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-[#FDFCF0]/10" />
          <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-[#FDFCF0]/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
