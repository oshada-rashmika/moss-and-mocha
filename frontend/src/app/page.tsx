 "use client";
import React from "react";
import { useStitchCart } from "@/context/stitch-cart-context";

export default function Home() {
  const { addToCart, clearCart, itemCount, subtotal, feedback, dismissFeedback } =
    useStitchCart();

  const feedbackToneClasses =
    feedback?.tone === "success"
      ? "bg-moss-green/15 text-moss-green border-moss-green/30"
      : feedback?.tone === "warning"
        ? "bg-hibiscus-pink/20 text-[#7c3345] border-hibiscus-pink/40"
        : "bg-stitch-blue/15 text-stitch-blue border-stitch-blue/30";

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-20 relative overflow-hidden bg-gradient-to-br from-background to-[#eaf5e1] dark:from-background dark:to-[#162911]">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-hibiscus-pink/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-stitch-blue/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 max-w-4xl w-full">
        <div className="mb-8 rounded-2xl border border-white/30 dark:border-white/15 bg-white/70 dark:bg-black/30 backdrop-blur-md p-4 sm:p-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
            <div>
              <p className="text-sm text-foreground/70">Stitch Cart</p>
              <p className="text-lg font-semibold">
                {itemCount} item{itemCount === 1 ? "" : "s"} · ${subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  addToCart({
                    id: "stitch-blue-pack",
                    name: "Stitch Blue Accent Pack",
                    price: 19.99,
                  })
                }
                className="px-4 py-2 rounded-full bg-stitch-blue text-white text-sm font-medium hover:bg-stitch-blue/90 transition-all active:scale-95"
              >
                Add Accent Pack
              </button>
              <button
                onClick={clearCart}
                className="px-4 py-2 rounded-full bg-white dark:bg-white/10 text-moss-green dark:text-white text-sm font-medium border border-moss-green/20 dark:border-white/10 hover:bg-moss-green/5 dark:hover:bg-white/20 transition-all active:scale-95"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        <header className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-moss-green/10 text-moss-green dark:bg-moss-green/20 dark:text-[#b4db9c] border border-moss-green/20 shadow-sm backdrop-blur-md mb-4 transition-transform hover:scale-105">
            <span className="text-sm font-medium tracking-wide uppercase">Nature Inspired Design</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-moss-green dark:text-[#b4db9c] drop-shadow-sm">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-stitch-blue to-hibiscus-pink">Stitch Nature</span>
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto font-sans leading-relaxed">
            Experience the harmony of Stitch Blue, Moss Green, and Hibiscus Pink. A premium interface designed with elegance and playful sophistication.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-2xl bg-stitch-blue/10 flex items-center justify-center mb-6 group-hover:bg-stitch-blue group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6 text-stitch-blue group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Stitch Blue</h3>
            <p className="text-foreground/70 text-sm">Dynamic and vibrant, bringing energy and focus to interactive elements across the platform.</p>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-2xl bg-moss-green/10 flex items-center justify-center mb-6 group-hover:bg-moss-green group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6 text-moss-green group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Moss Green</h3>
            <p className="text-foreground/70 text-sm">Grounded and organic. The perfect anchor for our typography and structured layouts.</p>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1">
            <div className="h-12 w-12 rounded-2xl bg-hibiscus-pink/10 flex items-center justify-center mb-6 group-hover:bg-hibiscus-pink group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6 text-hibiscus-pink group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">Hibiscus Pink</h3>
            <p className="text-foreground/70 text-sm">Playful and warm, adding subtle accents and a touch of joy to user interactions.</p>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-6">
          <button className="px-8 py-4 rounded-full bg-stitch-blue text-white font-medium hover:bg-stitch-blue/90 hover:shadow-lg hover:shadow-stitch-blue/30 transition-all duration-300 active:scale-95">
            Get Started
          </button>
          <button className="px-8 py-4 rounded-full bg-white dark:bg-white/10 text-moss-green dark:text-white font-medium border border-moss-green/20 dark:border-white/10 hover:bg-moss-green/5 dark:hover:bg-white/20 transition-all duration-300 active:scale-95">
            View Documentation
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={
            feedback.placement === "inline"
              ? "z-20 mt-4 w-full max-w-sm px-4"
              : "z-20 fixed bottom-6 right-6 max-w-md px-4"
          }
        >
          <div
            className={`rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${feedbackToneClasses}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm sm:text-base font-medium leading-snug">
                {feedback.message}
                <span className="ml-2 text-xs opacity-80">
                  ({feedback.viewport === "tiny" ? "tiny screen" : "wide display"} mode)
                </span>
              </p>
              <button
                onClick={dismissFeedback}
                className="text-xs font-semibold opacity-80 hover:opacity-100"
                aria-label="Dismiss cart feedback"
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
