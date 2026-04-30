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
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-12 max-w-sm w-full px-6">
            {/* The Asset: Clean, unobstructed GIF */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 80, 
                damping: 20,
                delay: 0.2 
              }}
              className="relative w-64 h-64 md:w-80 md:h-80"
            >
              <Image
                src="/stitch-sad.gif"
                alt="Stitch Reveal"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Typography: High-Contrast Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: [0.5, 1, 0.5],
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
              className="text-center space-y-4"
            >
              <p className="font-serif text-[#1A1A1A] text-sm md:text-base tracking-[0.4em] uppercase">
                Preparing your sanctuary
              </p>
              <div className="w-16 h-px bg-sage-green/20 mx-auto" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
