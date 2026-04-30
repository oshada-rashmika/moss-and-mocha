"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Menu", href: "/menu" },
  { name: "Contact Us", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-300 ease-in-out ${
        scrolled
          ? "py-3 bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm"
          : "py-5 bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo Evolution */}
        <Link href="/" className="relative z-50">
          <motion.h1
            className="font-serif font-bold tracking-tight"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 2rem)",
            }}
            animate={{
              scale: scrolled ? 0.95 : 1,
            }}
          >
            <span className="text-moss-green">Moss</span> <span className="text-hibiscus-pink">&</span> <span className="text-moss-green">Mocha</span>
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative group py-2"
            >
              <span className="text-[#1A1A1A] group-hover:text-moss-green transition-colors duration-300 font-semibold tracking-wide uppercase text-sm">
                {link.name}
              </span>
              
              {/* Stitch Animation: Organic blooming line */}
              <motion.span 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-moss-green origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1)"
                style={{
                  boxShadow: "0 0 12px var(--color-moss-green)"
                }}
              />
              
              {/* Soft Glow Interaction */}
              <div className="absolute inset-0 -z-10 bg-moss-green opacity-0 group-hover:opacity-5 blur-2xl transition-all duration-700 rounded-full scale-50 group-hover:scale-150" />
            </Link>
          ))}
        </div>

        {/* Mobile Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative z-50 p-2 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="relative w-8 h-8">
             <Image 
                src="/menu.png" 
                alt="Menu" 
                fill 
                className={`object-contain transition-all duration-700 ${isOpen ? 'rotate-180 scale-90 invert' : 'rotate-0'}`}
             />
          </div>
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 z-40 md:hidden bg-white flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center gap-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 40, rotate: -15, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotate: 0,
                      scale: 1,
                      transition: { 
                        delay: 0.1 * index + 0.4,
                        duration: 0.8,
                        ease: [0.23, 1, 0.32, 1]
                      } 
                    }}
                    exit={{ opacity: 0, y: 20, rotate: 5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-serif text-[#1A1A1A] hover:text-moss-green transition-all duration-300 relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-2 left-0 w-0 h-px bg-moss-green group-hover:w-full transition-all duration-500" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 p-12 -z-10 opacity-5">
                 <div className="w-64 h-64 bg-moss-green rounded-full blur-3xl animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
