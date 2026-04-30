"use client";

import { submitContactInquiry, type ContactActionState } from "@/app/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useActionState, useMemo, useState } from "react";

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

const inputBase =
  "peer w-full bg-transparent border-0 border-b border-[#FDFCF0]/35 px-0 pt-5 pb-3 text-[#FDFCF0] placeholder:text-transparent outline-none transition-all duration-300 focus:border-[#FFB7C5] focus:[box-shadow:0_2px_0_0_#FFB7C5]";

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const hasSuccess = state.status === "success";
  const hasError = state.status === "error";

  const mapSrc = useMemo(
    () =>
      "https://maps.google.com/maps?q=NSBM%20Green%20University&t=&z=15&ie=UTF8&iwloc=&output=embed",
    []
  );

  return (
    <section className="w-full bg-[#1B2E1E] py-24 md:py-32 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_1.1fr] gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-9"
        >
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="text-sage-green italic font-serif text-lg"
            >
              Inquiries, collaborations, or a seat at our table.
            </motion.p>
            <h2 className="text-[#FDFCF0] font-serif text-4xl md:text-6xl tracking-tight">
              Connect with the Sanctuary
            </h2>
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "8.5rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="block h-px bg-[#78866B]"
            />
          </div>

          <div className="space-y-4 text-[#FDFCF0]">
            <p className="font-serif text-xl">contact@mossnmocha.com</p>
            <p className="font-serif text-xl">+94 74 030 4576</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#FDFCF0]/35 text-[#FDFCF0] transition-all duration-300 hover:bg-[#E2725B] hover:border-[#E2725B] hover:text-[#1B2E1E]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M13.2 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4c-.3 0-1.3-.1-2.5-.1-2.4 0-4 1.5-4 4.2V10H7.3v3h2.6v8h3.3z" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#FDFCF0]/35 text-[#FDFCF0] transition-all duration-300 hover:bg-[#E2725B] hover:border-[#E2725B] hover:text-[#1B2E1E]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2z" />
                <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
                <circle cx="16.7" cy="5.9" r="1.2" />
              </svg>
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[#FDFCF0]/15 shadow-[inset_0_0_40px_rgba(0,0,0,0.35)] bg-[#1F3322]">
            <div className="relative">
              <iframe
                title="NSBM Green University Map"
                src={mapSrc}
                className="w-full h-[320px] md:h-[380px] border-0 grayscale brightness-[0.5] contrast-125 saturate-[0.6] hue-rotate-[8deg]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1B2E1E]/45 via-transparent to-[#102016]/55" />
            </div>
          </div>
        </motion.div>

        <div className="pt-2 md:pt-6">
          <AnimatePresence mode="wait">
            {hasSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-[360px] flex flex-col items-start justify-center text-left"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 180, damping: 14 }}
                  className="h-14 w-14 rounded-full bg-[#FFB7C5]/15 text-[#FFB7C5] flex items-center justify-center mb-5"
                >
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4.2 4.2L19 6.5" />
                  </svg>
                </motion.div>
                <h3 className="text-4xl font-serif text-[#FDFCF0]">Message Sent</h3>
                <p className="mt-3 text-[#FDFCF0]/75">{state.message}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={formAction}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <label className="relative block">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="absolute bottom-0 left-0 h-px bg-[#FDFCF0]/30"
                  />
                  <input
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={inputBase}
                    placeholder="Name"
                    required
                  />
                  <span
                    className={`absolute left-0 text-[11px] tracking-[0.24em] uppercase font-medium text-[#78866B] transition-all duration-300 ${
                      name ? "top-0" : "top-5"
                    } peer-focus:top-0 peer-focus:text-[#FFB7C5]`}
                  >
                    Name
                  </span>
                </label>

                <label className="relative block">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="absolute bottom-0 left-0 h-px bg-[#FDFCF0]/30"
                  />
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
                    className={`absolute left-0 text-[11px] tracking-[0.24em] uppercase font-medium text-[#78866B] transition-all duration-300 ${
                      email ? "top-0" : "top-5"
                    } peer-focus:top-0 peer-focus:text-[#FFB7C5]`}
                  >
                    Email
                  </span>
                </label>

                <label className="relative block">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="absolute bottom-0 left-0 h-px bg-[#FDFCF0]/30"
                  />
                  <textarea
                    name="message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className={`${inputBase} min-h-[140px] resize-y`}
                    placeholder="Message"
                    required
                  />
                  <span
                    className={`absolute left-0 text-[11px] tracking-[0.24em] uppercase font-medium text-[#78866B] transition-all duration-300 ${
                      message ? "top-0" : "top-5"
                    } peer-focus:top-0 peer-focus:text-[#FFB7C5]`}
                  >
                    Message
                  </span>
                </label>

                {hasError && (
                  <p className="text-sm text-[#FFB7C5] font-medium">{state.message}</p>
                )}

                <motion.button
                  whileHover="hover"
                  whileTap={{ scale: 0.99 }}
                  disabled={isPending}
                  className="group relative w-full py-4 text-sm font-bold tracking-[0.22em] uppercase text-[#FDFCF0] border border-[#FDFCF0]/35 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-[#E2725B]"
                    variants={{ hover: { width: "100%" } }}
                    initial={{ width: 0 }}
                    transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                  <span className="relative z-10">{isPending ? "Sending..." : "Send Message"}</span>
                  <motion.span
                    className="pointer-events-none absolute inset-0 border border-[#FFB7C5]"
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
