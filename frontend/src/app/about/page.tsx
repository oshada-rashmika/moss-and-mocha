"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TimelineEvent = ({ 
  title, 
  description, 
  imageUrl, 
  side, 
  index 
}: { 
  title: string; 
  description: string; 
  imageUrl: string; 
  side: "left" | "right";
  index: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative flex items-center justify-between w-full mb-32 ${side === "right" ? "flex-row-reverse" : "flex-row"}`}>
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-5/12 ${side === "left" ? "text-right pr-12" : "text-left pl-12"} space-y-4`}
      >
        <h3 className="text-3xl font-serif text-[#1A1A1A]">{title}</h3>
        <p className="text-[#1A1A1A]/70 leading-relaxed font-sans text-lg">
          {description}
        </p>
      </motion.div>

      {/* Timeline Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-3 h-3 rounded-full bg-[#F2B8C6] shadow-[0_0_10px_#F2B8C6]" />
      </div>

      {/* Image Block */}
      <motion.div 
        style={{ y }}
        className="w-5/12 relative aspect-[4/5] overflow-hidden group cursor-crosshair"
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/5 group-hover:bg-transparent transition-colors duration-700" />
      </motion.div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden pb-32">
      {/* Opaque Stitch Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.04] grayscale mix-blend-multiply">
        <div className="relative w-[80vw] h-[80vh]">
          <Image
            src="/about.png"
            alt="Stitch Background"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-48 pb-32 px-6 md:px-12 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-serif text-[#1A1A1A] tracking-tight leading-tight mb-8"
        >
          The Roots of <br /> the Sanctuary
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="max-w-2xl text-xl text-[#1A1A1A]/60 font-sans leading-relaxed tracking-wide"
        >
          Moss & Mocha was born from a singular vision: to create a breathing space where artisanal craftsmanship meets the restorative power of biophilic design.
        </motion.p>
      </section>

      {/* Interactive Timeline */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sage-green/20 -translate-x-1/2" />
        
        <div className="space-y-48">
          <TimelineEvent 
            side="left"
            index={0}
            title="The Spark"
            description="It began with a simple sketch in a rain-drenched garden—a dream to merge the earthy stillness of forest moss with the rich complexity of a perfect mocha."
            imageUrl="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop"
          />
          <TimelineEvent 
            side="right"
            index={1}
            title="The Botanical Blueprint"
            description="We spent months sourcing rare beans and collaborating with landscape architects to ensure every inch of our space breathed in harmony with nature."
            imageUrl="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
          />
          <TimelineEvent 
            side="left"
            index={2}
            title="The First Brew"
            description="The sanctuary opened its doors, welcoming a community that sought more than just caffeine—they sought a return to the organic roots of luxury."
            imageUrl="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* Founders Showcase */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-48">
        <div className="text-center mb-32">
          <span className="text-xs font-bold uppercase tracking-[0.5em] text-sage-green mb-4 block">The Visionaries</span>
          <h2 className="text-5xl font-serif text-[#1A1A1A]">Guardians of the Moss</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          {/* Founder 1 */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative aspect-[3/4] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
                alt="Senuri Rukshani"
                fill
                className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-3xl font-serif text-[#1A1A1A]">Senuri Rukshani</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F2B8C6]">Founder & Creative Director</p>
              </div>
              <p className="max-w-md text-[#1A1A1A]/70 leading-relaxed font-sans italic">
                "For me, Moss & Mocha is an extension of the soul. It's about finding that delicate balance between the industrial world and the quiet, persistent growth of the forest floor."
              </p>
            </div>
          </motion.div>

          {/* Founder 2 */}
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8 md:pt-32"
          >
            <div className="relative aspect-[3/4] overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                alt="Oshada Rashmika"
                fill
                className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-3xl font-serif text-[#1A1A1A]">Oshada Rashmika</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F2B8C6]">Co-Founder & Lead Strategist</p>
              </div>
              <p className="max-w-md text-[#1A1A1A]/70 leading-relaxed font-sans italic">
                "Our goal was never just to sell coffee. We wanted to engineer an experience that forces you to slow down, to breathe, and to appreciate the artisanal details in every cup."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Sanctuary CTA */}
      <section className="relative z-10 text-center pt-48">
        <Link 
          href="/" 
          className="group inline-flex flex-col items-center gap-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-sage-green group-hover:text-terracotta transition-colors">Return to Home</span>
          <div className="w-12 h-px bg-sage-green group-hover:w-24 transition-all duration-500" />
        </Link>
      </section>
    </main>
  );
}
