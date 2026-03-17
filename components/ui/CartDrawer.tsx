"use client";

import { useCart } from "@/app/providers";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { CheckoutModal } from "./CheckoutModal";
import { useState } from "react";
import { GlassButton } from "./GlassButton";

export function CartDrawer() {
  const { cart, removeFromCart, addToCart, cartTotal, cartCount, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[110] glass-panel bg-[color:var(--background)]/95 backdrop-blur-3xl border-r-0 border-y-0 rounded-none rounded-l-3xl p-6 flex flex-col pt-12"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-white/70" /> 
                  Your Bag ({cartCount})
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                    <ShoppingBag className="w-12 h-12 opacity-20" />
                    <p className="font-sans">Your bag is elegantly empty.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 rounded-2xl glass-panel bg-white/5 relative group">
                      <div className="w-20 h-24 rounded-xl overflow-hidden relative flex-shrink-0">
                        <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-serif text-lg leading-tight mb-1">{item.name}</h3>
                        <p className="font-sans text-xs text-white/50 mb-3">Qty: {item.quantity}</p>
                        <p className="font-sans text-sm">IQD {(item.price_iqd * item.quantity).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, true)}
                        className="absolute top-4 right-4 text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center font-serif text-lg">
                    <span className="text-white/70">Subtotal</span>
                    <span>IQD {cartTotal.toLocaleString()}</span>
                  </div>
                  <p className="text-xs font-sans text-white/40 text-center">Shipping & taxes calculated at checkout.</p>
                  <GlassButton 
                    variant="primary" 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-4 text-base flex justify-center items-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </GlassButton>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
