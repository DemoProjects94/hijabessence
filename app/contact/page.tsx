"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <main className="min-h-screen pb-36 pt-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="text-[#C4956A] font-sans text-sm uppercase tracking-widest font-bold">Get in Touch</span>
        <h1 className="text-4xl md:text-5xl tracking-wide font-serif text-[color:var(--foreground)] mt-2 mb-4">Contact Us</h1>
        <p className="text-[color:var(--foreground)] opacity-60 font-sans max-w-xl mx-auto">
          We are here to assist you with any questions about our collections, sizing, or orders. Reach out to our dedicated support team in Iraq.
        </p>
      </motion.div>

      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* Contact Information */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <GlassCard className="flex items-center gap-4 hover:border-[#8B6914]/30 transition-colors">
             <div className="w-12 h-12 rounded-full bg-[#5D4037]/10 text-[#C4956A] flex items-center justify-center flex-shrink-0">
               <Phone className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-serif text-lg text-[color:var(--foreground)]">Phone (Iraq)</h3>
               <p className="font-sans text-sm text-[color:var(--foreground)] opacity-60">+964 770 123 4567</p>
             </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4 hover:border-[#8B6914]/30 transition-colors">
             <div className="w-12 h-12 rounded-full bg-[#5D4037]/10 text-[#C4956A] flex items-center justify-center flex-shrink-0">
               <Mail className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-serif text-lg text-[color:var(--foreground)]">Email</h3>
               <p className="font-sans text-sm text-[color:var(--foreground)] opacity-60">support@hijab-essence.iq</p>
             </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4 hover:border-[#8B6914]/30 transition-colors">
             <div className="w-12 h-12 rounded-full bg-[#5D4037]/10 text-[#C4956A] flex items-center justify-center flex-shrink-0">
               <MapPin className="w-5 h-5" />
             </div>
             <div>
               <h3 className="font-serif text-lg text-[color:var(--foreground)]">Baghdad Office</h3>
               <p className="font-sans text-sm text-[color:var(--foreground)] opacity-60">Al-Mansour District, Street 14</p>
             </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard className="w-full md:w-2/3 md:p-8">
          {status === "sent" ? (
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="h-full flex flex-col items-center justify-center py-12 text-center"
             >
               <div className="w-20 h-20 rounded-full bg-[#5D4037]/10 text-[#C4956A] flex items-center justify-center mb-6">
                 <Send className="w-8 h-8" />
               </div>
               <h2 className="text-3xl font-serif text-[color:var(--foreground)] mb-2">Message Sent!</h2>
               <p className="text-[color:var(--foreground)] opacity-60 font-sans mb-8">
                 Thank you for reaching out. Our support team will respond to your email shortly.
               </p>
               <GlassButton onClick={() => setStatus("idle")}>Send Another Message</GlassButton>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-sans text-[color:var(--foreground)] opacity-80 pl-1">Name</label>
                  <GlassInput placeholder="Full Name" required />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-sans text-[color:var(--foreground)] opacity-80 pl-1">Email</label>
                  <GlassInput type="email" placeholder="you@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sans text-[color:var(--foreground)] opacity-80 pl-1">Subject</label>
                <GlassInput placeholder="Order Inquiry, Sizing, etc." required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sans text-[color:var(--foreground)] opacity-80 pl-1">Message</label>
                <textarea 
                  required
                  placeholder="How can we help you?"
                  className="w-full min-h-[150px] bg-white/5 border border-white/10 dark:bg-black/20 dark:border-black/30 rounded-2xl px-4 py-3 text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/30 focus:outline-none focus:ring-2 focus:ring-[#8B6914]/50 backdrop-blur-md transition-all resize-none custom-scrollbar"
                />
              </div>

              <div className="flex justify-end pt-2">
                <GlassButton 
                  type="submit" 
                  disabled={status === "sending"}
                  className="w-full md:w-auto px-8 flex items-center gap-2"
                >
                  {status === "sending" ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                       <RefreshCw className="w-4 h-4" />
                    </motion.div>
                  ) : <Send className="w-4 h-4" />}
                  {status === "sending" ? "Sending..." : "Send Message"}
                </GlassButton>
              </div>
            </form>
          )}
        </GlassCard>
      </div>
    </main>
  );
}
