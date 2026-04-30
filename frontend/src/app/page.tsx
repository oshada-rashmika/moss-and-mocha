"use client";

import { Hero } from "@/components/Hero";
import { CategoryRibbon } from "@/components/CategoryRibbon";
import { useStitchCart } from "@/context/stitch-cart-context";
import { useEffect, useState } from "react";

export default function Home() {
  const { addToCart, itemCount, subtotal, feedback, dismissFeedback } = useStitchCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const feedbackToneClasses =
    feedback?.tone === "success"
      ? "bg-moss-green/15 text-moss-green border-moss-green/30"
      : feedback?.tone === "warning"
        ? "bg-hibiscus-pink/20 text-[#7c3345] border-hibiscus-pink/40"
        : "bg-stitch-blue/15 text-stitch-blue border-stitch-blue/30";

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Category Ribbon / Visual Bridge */}
      <CategoryRibbon />

      {/* Feature Section / Menu Teaser */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 rounded-3xl bg-[#fdfbf7] border border-sage-green/10 hover:shadow-2xl transition-all duration-500">
            <h3 className="text-2xl font-serif text-moss-green">Organic Blends</h3>
            <p className="text-foreground/70 leading-relaxed">
              Ethically sourced beans met with hand-picked moss accents for a grounding coffee experience.
            </p>
          </div>
          <div className="space-y-4 p-8 rounded-3xl bg-[#fdfbf7] border border-sage-green/10 hover:shadow-2xl transition-all duration-500">
            <h3 className="text-2xl font-serif text-moss-green">Biophilic Space</h3>
            <p className="text-foreground/70 leading-relaxed">
              Designed to breathe. Our cafe environment uses living walls and natural light to restore your spirit.
            </p>
          </div>
          <div className="space-y-4 p-8 rounded-3xl bg-[#fdfbf7] border border-sage-green/10 hover:shadow-2xl transition-all duration-500">
            <h3 className="text-2xl font-serif text-moss-green">Artisanal Mocha</h3>
            <p className="text-foreground/70 leading-relaxed">
              Rich, dark chocolate infused with subtle forest notes, creating a unique signature flavor profile.
            </p>
          </div>
        </div>
      </section>

      {/* Cart Feedback Notification */}
      {mounted && feedback && (
        <div className="z-[110] fixed bottom-6 right-6 max-w-md px-4">
          <div className={`rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md ${feedbackToneClasses}`}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium leading-snug">
                {feedback.message}
              </p>
              <button
                onClick={dismissFeedback}
                className="text-xs font-semibold opacity-80 hover:opacity-100"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
