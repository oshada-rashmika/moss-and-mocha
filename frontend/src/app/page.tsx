"use client";

import { Hero } from "@/components/Hero";
import { CategoryRibbon } from "@/components/CategoryRibbon";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { useStitchCart } from "@/context/stitch-cart-context";

export default function Home() {
  const { feedback, dismissFeedback } = useStitchCart();

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

      {/* About Section / Narrative Bridge */}
      <AboutSection />

      <FeaturedProducts />

      <ReviewsSection />

      <ContactSection />

      {/* Cart Feedback Notification */}
      {feedback && (
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
