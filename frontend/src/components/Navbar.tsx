"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useStitchCart } from "@/context/stitch-cart-context";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Menu", href: "/menu" },
  { name: "Contact Us", href: "#contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { itemCount, items, subtotal, removeFromCart } = useStitchCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Intersection Observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6, rootMargin: "-10% 0px -10% 0px" }
    );

    const contactSection = document.getElementById("contact");
    if (contactSection) observer.observe(contactSection);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#contact") {
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setActiveSection("contact"); // Explicitly set active on click
      }
    }
    setIsOpen(false);
  };

  // Strict Pathname & Section Evaluation Matrix
  const getIsActive = (linkHref: string) => {
    // Contact Us logic: Only active if on home page AND in contact viewport
    if (linkHref === "#contact") {
      return pathname === "/" && activeSection === "contact";
    }

    // Home logic: Active only if on home page AND NOT in contact viewport
    if (linkHref === "/") {
      return pathname === "/" && activeSection !== "contact";
    }

    // Standard Page logic: Absolute pathname match
    return pathname === linkHref;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        scrolled
          ? "py-3 bg-white border-b border-black/5 shadow-sm"
          : "py-5 bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <motion.h1
            className="font-serif font-bold tracking-tight"
            style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)" }}
            animate={{ scale: scrolled ? 0.95 : 1 }}
          >
            <span className="text-sage-green">Moss</span>{" "}
            <span className="text-hibiscus-pink italic font-serif">&</span>{" "}
            <span className="text-sage-green">Mocha</span>
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative group py-2"
              >
                <span className={`transition-colors duration-500 font-serif font-medium tracking-wide text-sm ${
                  getIsActive(link.href)
                    ? "text-sage-green"
                    : "text-[#1A1A1A] group-hover:text-sage-green"
                }`}>
                  {link.name}
                </span>
                
                {/* Underline Reveal */}
                <motion.span 
                  initial={false}
                  animate={{ 
                    scaleX: getIsActive(link.href) ? 1 : 0 
                  }}
                  className="absolute bottom-1 left-0 right-0 h-[1px] bg-sage-green origin-left group-hover:scale-x-100 transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1)"
                />
              </Link>
            ))}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 group hover:scale-110 transition-transform duration-300"
            aria-label="View Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-4 h-4 bg-terracotta text-white text-[9px] font-bold flex items-center justify-center rounded-full"
              >
                {itemCount}
              </motion.span>
            )}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2"
            aria-label="View Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-terracotta text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <motion.span 
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
                className="w-full h-px bg-[#1A1A1A]" 
              />
              <motion.span 
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-full h-px bg-[#1A1A1A]" 
              />
              <motion.span 
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }}
                className="w-full h-px bg-[#1A1A1A]" 
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center gap-10">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-4xl font-serif transition-all duration-300 ${
                        getIsActive(link.href)
                          ? "text-sage-green"
                          : "text-[#1A1A1A] hover:text-sage-green"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 z-[110] bg-black/20 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-0 right-0 bottom-0 z-[120] w-full max-w-md bg-white shadow-2xl flex flex-col"
              >
                <div className="p-8 border-b border-black/5 flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[#1A1A1A]">Your Selection</h2>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:rotate-90 transition-transform duration-300"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                      <p className="font-serif text-lg text-black/40 italic">Your bag is empty.</p>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold uppercase tracking-widest text-terracotta border-b border-terracotta/30 pb-1"
                      >
                        Start Browsing
                      </button>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex items-start gap-4 group">
                        <div className="flex-1 space-y-1">
                          <h4 className="font-serif text-[#1A1A1A] group-hover:text-sage-green transition-colors">{item.name}</h4>
                          <p className="text-xs text-black/40 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-sm font-bold text-[#1A1A1A]">LKR {item.price.toLocaleString()}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[10px] uppercase tracking-widest text-terracotta/60 hover:text-terracotta transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {items.length > 0 && (
                  <div className="p-8 bg-gray-50 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg text-[#1A1A1A]">Subtotal</span>
                      <span className="font-bold text-lg text-[#1A1A1A]">LKR {subtotal.toLocaleString()}</span>
                    </div>
                    <button className="w-full bg-forest-green text-cream py-5 font-bold uppercase tracking-[0.3em] text-xs hover:bg-[#1A1A1A] transition-colors duration-500">
                      Checkout
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
