"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { GlassButton } from "@/components/ui/GlassButton";
import { useRef, useState } from "react";
import { useCart } from "@/app/providers";

export default function ProductPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const drapeOpacity1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const drapeOpacity2 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const drapeOpacity3 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-[color:var(--background)]">
      {/* Header — Back + Title + Heart (no cart circle) */}
      <header className="fixed top-0 inset-x-0 z-40 px-6 py-4 flex items-center justify-between glass-panel rounded-none border-t-0 border-x-0 bg-[color:var(--background)]/80 backdrop-blur-xl">
        <Link href="/">
          <GlassButton size="icon" variant="ghost">
            <ArrowLeft className="w-5 h-5" />
          </GlassButton>
        </Link>
        <h1 className="text-lg font-serif text-[color:var(--foreground)]">Liquid Silk Latte</h1>
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setLiked(!liked)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            liked
              ? "bg-red-500/90 text-white shadow-lg shadow-red-500/30"
              : "glass-panel text-[color:var(--foreground)] opacity-70 hover:opacity-100"
          }`}
        >
          <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
        </motion.button>
      </header>

      {/* Scrollytelling Visual Area */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-lg h-3/4 flex items-center justify-center">
          <motion.div 
            style={{ opacity: drapeOpacity1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-64 h-[400px] bg-gradient-to-tr from-[#d4b59e] to-[#f3e1d5] rounded-[100px] rounded-tl-full rounded-br-full shadow-2xl skew-y-6" />
            <p className="absolute bottom-10 font-sans text-sm text-white/50 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              Style 1: The Classic Wrap
            </p>
          </motion.div>

          <motion.div 
            style={{ opacity: drapeOpacity2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-56 h-[300px] bg-gradient-to-bl from-[#d4b59e] to-[#f3e1d5] rounded-t-full shadow-2xl -rotate-6" />
            <p className="absolute bottom-10 font-sans text-sm text-white/50 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              Style 2: The Turban Drape
            </p>
          </motion.div>

          <motion.div 
            style={{ opacity: drapeOpacity3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-72 h-[450px] bg-gradient-to-t from-[#c2a28b] to-[#f3e1d5] rounded-full shadow-2xl rotate-12 scale-110" />
            <p className="absolute bottom-10 font-sans text-sm text-white/50 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
              Style 3: The Flowing Back
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content per scroll section */}
      <div className="absolute top-[100vh] right-0 w-full md:w-1/3 px-8 text-right">
        <h2 className="text-4xl shadow-black drop-shadow-lg font-serif mb-4 text-[color:var(--foreground)]">Weightless Feel</h2>
        <p className="text-[color:var(--foreground)] opacity-70 font-sans drop-shadow-md">
          Engineered to feel like a second skin. Scroll to explore versatile styling options for the Liquid Silk fabric.
        </p>
      </div>

      <div className="absolute top-[200vh] left-0 w-full md:w-1/3 px-8">
        <h2 className="text-4xl shadow-black drop-shadow-lg font-serif mb-4 text-[color:var(--foreground)]">Breathable & Opaque</h2>
        <p className="text-[color:var(--foreground)] opacity-70 font-sans drop-shadow-md">
          Maximum opacity without compromising airflow. The perfect blend for all climates.
        </p>
      </div>

      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-20">
        <GlassButton
          variant="primary"
          size="lg"
          className="w-full text-lg bg-[#5D4037] hover:bg-[#6D4C41] text-[#F5E6D3] shadow-[0_0_30px_rgba(93,64,55,0.4)]"
          onClick={() => addToCart({ id: "premium-silk-latte", name: "Liquid Silk Latte", price_iqd: 55000, image_url: "/images/Scarf/photo_1_2026-03-16_23-04-28.jpg" })}
        >
          Add to Cart — IQD 55,000
        </GlassButton>
      </div>
    </div>
  );
}
