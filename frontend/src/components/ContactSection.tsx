"use client";

import { submitContactInquiry, type ContactActionState } from "@/app/actions";
import { AnimatePresence, motion } from "framer-motion";
import { useActionState, useMemo, useState } from "react";

const initialState: ContactActionState = {
  status: "idle",
  message: "",
};

export function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactInquiry, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const hasSuccess = state.status === "success";

  const mapSrc = useMemo(
    () =>
      "https://maps.google.com/maps?q=NSBM%20Green%20University&t=&z=15&ie=UTF8&iwloc=&output=embed",
    []
  );

  return (
    <section id="contact" className="w-full bg-[#1B2E1E] py-32 md:py-48 px-6 md:px-12 overflow-hidden selection:bg-[#FFB7C5]/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
        
        {/* Left Column: Contact Info & Socials (5 Cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="md:col-span-5 space-y-16"
        >
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sage-green italic font-serif text-lg md:text-xl tracking-tight"
            >
              Inquiries, collaborations, or a seat at our table.
            </motion.p>
            <h2 className="text-[#FDFCF0] font-serif text-5xl md:text-7xl leading-[0.95] tracking-tighter">
              Connect with <br />
              the Sanctuary
            </h2>
          </div>

          <div className="space-y-12">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-sage-green font-bold">Email Us</p>
              <a href="mailto:contact@mossnmocha.com" className="block text-2xl md:text-3xl font-serif text-[#FDFCF0] hover:text-[#FFB7C5] transition-colors duration-500 underline decoration-[#FDFCF0]/10 underline-offset-8">
                contact@mossnmocha.com
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.4em] text-sage-green font-bold">Call Us</p>
              <p className="text-2xl md:text-3xl font-serif text-[#FDFCF0]">
                +94 74 030 4576
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <motion.a
              href="https://www.facebook.com/mossnmocha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              whileHover={{ y: -4 }}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[#FDFCF0]/25 text-[#FDFCF0] transition-colors duration-300 hover:border-[#FFB7C5]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://www.instagram.com/mossnmocha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{ y: -4 }}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-[#FDFCF0]/25 text-[#FDFCF0] transition-colors duration-300 hover:border-[#FFB7C5]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Form & Map (7 Cols) */}
        <div className="md:col-span-7 space-y-24">
          <AnimatePresence mode="wait">
            {hasSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#1F3322] p-12 rounded-[2rem] border border-[#FDFCF0]/10"
              >
                <h3 className="text-4xl font-serif text-[#FDFCF0] mb-4">Gratitude.</h3>
                <p className="text-sage-green leading-relaxed text-lg italic">{state.message}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                action={formAction}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-10">
                  {[
                    { name: "name", label: "Name", type: "text", value: name, setter: setName },
                    { name: "email", label: "Email Address", type: "email", value: email, setter: setEmail },
                    { name: "message", label: "Your Message", type: "textarea", value: message, setter: setMessage },
                  ].map((field, idx) => (
                    <div key={field.name} className="relative group">
                      <p className="text-[9px] uppercase tracking-[0.5em] text-sage-green mb-2 font-bold transition-colors group-focus-within:text-[#FFB7C5]">
                        {field.label}
                      </p>
                      {field.type === "textarea" ? (
                        <textarea
                          name={field.name}
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          className="w-full bg-transparent border-b border-[#FDFCF0]/10 py-4 text-[#FDFCF0] outline-none placeholder:text-[#FDFCF0]/5 min-h-[120px] resize-none"
                          required
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={field.value}
                          onChange={(e) => field.setter(e.target.value)}
                          className="w-full bg-transparent border-b border-[#FDFCF0]/10 py-4 text-[#FDFCF0] outline-none placeholder:text-[#FDFCF0]/5"
                          required
                        />
                      )}
                      {/* Underline Animation */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                        className="absolute bottom-0 left-0 right-0 h-px bg-[#FDFCF0]/20 origin-left"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FFB7C5] origin-center scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700 ease-[0.23,1,0.32,1]" />
                    </div>
                  ))}
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  disabled={isPending}
                  className="group relative w-full py-6 flex items-center justify-center overflow-hidden border border-[#FDFCF0]/20"
                >
                  {/* Stitch-trace Border */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <motion.rect
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      fill="none"
                      stroke="#FFB7C5"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileHover={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      style={{ strokeDasharray: "10 5" }}
                    />
                  </svg>
                  
                  <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.5em] text-[#FDFCF0] group-hover:text-[#FFB7C5] transition-colors duration-300">
                    {isPending ? "Sending Selection..." : "Send Message"}
                  </span>
                  <div className="absolute inset-0 bg-[#FDFCF0]/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Integrated Boutique Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-video rounded-tl-[10rem] rounded-br-[4rem] overflow-hidden border border-[#FDFCF0]/10 shadow-2xl"
          >
            <iframe
              title="NSBM Green University Map"
              src={mapSrc}
              className="w-full h-full grayscale invert contrast-[1.2] brightness-[0.7] saturate-0 opacity-40 hover:opacity-70 transition-opacity duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#1B2E1E] via-transparent to-[#1B2E1E]/50" />
            <div className="absolute bottom-8 left-8 p-6 bg-[#1F3322]/90 backdrop-blur-md border border-[#FDFCF0]/10 rounded-2xl max-w-xs">
              <p className="text-[10px] uppercase tracking-widest text-sage-green font-bold mb-2">Our Sanctuary</p>
              <p className="text-sm font-serif text-[#FDFCF0]">NSBM Green University, <br />Homagama, Sri Lanka</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
