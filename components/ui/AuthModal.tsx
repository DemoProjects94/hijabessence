"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "./GlassCard";
import { GlassButton } from "./GlassButton";
import { GlassInput } from "./GlassInput";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <GlassCard variant="luminous" className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl mb-2">
                  {mode === "signin" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-white/60 font-sans">
                  {mode === "signin" 
                    ? "Enter your details to access your profile." 
                    : "Join Hijab Essence for an exclusive experience."}
                </p>
              </div>

              <div className="space-y-4 font-sans">
                {mode === "signup" && (
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                    <GlassInput placeholder="Full Name" className="pl-10" />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                  <GlassInput type="email" placeholder="Email Address" className="pl-10" />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-white/40" />
                  <GlassInput type="password" placeholder="Password" className="pl-10" />
                </div>

                <GlassButton variant="primary" className="w-full mt-6">
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                </GlassButton>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-transparent px-2 text-white/50 bg-[#0f1115]">
                      Demo Accounts
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <GlassButton variant="ghost" className="w-full border border-white/10 text-xs text-white/70" onClick={() => {
                    onClose();
                  }}>
                    Demo User
                  </GlassButton>
                  <GlassButton variant="ghost" className="w-full border-indigo-500/30 text-indigo-200 bg-indigo-500/10 text-xs" onClick={() => {
                    onClose();
                    router.push("/admin");
                  }}>
                    Admin Login
                  </GlassButton>
                </div>

                <p className="text-center text-sm text-white/50 mt-6">
                  {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                    className="text-white hover:underline transition-all"
                  >
                    {mode === "signin" ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
