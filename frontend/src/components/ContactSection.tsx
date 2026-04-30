"use client";

import { submitContactInquiry, type ContactActionState } from "@/app/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useActionState, useMemo, useState } from "react";

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

const inputBase =
  "peer w-full bg-transparent border-0 border-b border-[#1A1A1A]/25 px-0 pt-6 pb-2 text-[#1A1A1A] placeholder:text-transparent outline-none transition-all duration-300 focus:border-sage-green focus:[box-shadow:0_2px_0_0_var(--color-sage-green)]";

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const hasSuccess = state.status === "success";
  const hasError = state.status === "error";

  const mapSrc = useMemo(
    () =>
      "https://maps.google.com/maps?q=NSBM%20Green%20University&t=&z=14&ie=UTF8&iwloc=&output=embed",
    []
  );

  return (
    <section className="w-full bg-[#fffdf8] py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-12 md:gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sage-green italic font-serif text-lg">
              Inquiries, collaborations, or a seat at our table.
            </p>
            <h2 className="text-[#1A1A1A] font-serif text-4xl md:text-6xl tracking-tight">
              Connect with the Sanctuary
            </h2>
          </div>

          <div className="space-y-5 text-[#1A1A1A]">
            <p className="font-serif text-xl">contact@mossnmocha.com</p>
            <p className="font-serif text-xl">+94 74 030 4576</p>
          </div>

          <div className="flex items-center gap-5 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-terracotta/30 text-terracotta hover:bg-terracotta hover:text-white transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M13.2 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.4 0-4 1.5-4 4.2V10H7.3v3h2.6v8h3.3z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-terracotta/30 text-terracotta hover:bg-terracotta hover:text-white transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm0 1.9A3.9 3.9 0 0 0 3.9 7.8v8.4a3.9 3.9 0 0 0 3.9 3.9h8.4a3.9 3.9 0 0 0 3.9-3.9V7.8a3.9 3.9 0 0 0-3.9-3.9H7.8zm8.9 1.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2z" />
              </svg>
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden border border-sage-green/15 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] bg-white/70">
            <div className="grayscale-[45%] saturate-[65%] contrast-[96%]">
              <iframe
                title="NSBM Green University Map"
                src={mapSrc}
                className="w-full h-[320px] md:h-[380px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-sage-green/15 bg-white p-6 md:p-10 shadow-[0_20px_80px_rgba(26,26,26,0.06)]">
          <AnimatePresence mode="wait">
            {hasSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[360px] flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 14 }}
                  className="h-14 w-14 rounded-full bg-sage-green/10 text-sage-green flex items-center justify-center mb-5"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4.2 4.2L19 6.5" />
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-serif text-[#1A1A1A]">Message Sent</h3>
                <p className="mt-3 text-[#1A1A1A]/70">{state.message}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={formAction}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-7"
              >
                <label className="relative block">
                  <input
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={inputBase}
                    placeholder="Name"
                    required
                  />
                  <span
                    className={`absolute left-0 text-sm text-[#1A1A1A]/60 transition-all duration-300 ${
                      name ? "top-1 text-xs text-sage-green" : "top-6"
                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-sage-green`}
                  >
                    Name
                  </span>
                </label>

                <label className="relative block">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputBase}
                    placeholder="Email"
                    required
                  />
                  <span
                    className={`absolute left-0 text-sm text-[#1A1A1A]/60 transition-all duration-300 ${
                      email ? "top-1 text-xs text-sage-green" : "top-6"
                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-sage-green`}
                  >
                    Email
                  </span>
                </label>

                <label className="relative block">
                  <textarea
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className={`${inputBase} min-h-[140px] resize-y`}
                    placeholder="Message"
                    required
                  />
                  <span
                    className={`absolute left-0 text-sm text-[#1A1A1A]/60 transition-all duration-300 ${
                      message ? "top-1 text-xs text-sage-green" : "top-6"
                    } peer-focus:top-1 peer-focus:text-xs peer-focus:text-sage-green`}
                  >
                    Message
                  </span>
                </label>

                {hasError && (
                  <p className="text-sm text-terracotta font-medium">{state.message}</p>
                )}

                <motion.button
                  whileHover="hover"
                  whileTap={{ scale: 0.99 }}
                  disabled={isPending}
                  className="group relative w-full py-4 text-sm font-bold tracking-[0.22em] uppercase text-[#1A1A1A] border border-[#1A1A1A]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{isPending ? "Sending..." : "Send Message"}</span>
                  <motion.span
                    className="pointer-events-none absolute inset-0 border border-sage-green"
                    variants={{ hover: { scale: 1.015 } }}
                    transition={{ duration: 0.35 }}
                  />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
