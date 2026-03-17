"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Package, Settings, LogOut, ChevronRight } from "lucide-react";
import { useAuth } from "@/app/providers";
import { GlassCard } from "./GlassCard";
import { GlassButton } from "./GlassButton";

export function AccountPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm z-[110] glass-panel border-r-0 border-y-0 rounded-none rounded-l-3xl p-6 flex flex-col pt-12"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Account</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <GlassCard className="mb-6 bg-white/5 border border-white/10 text-center py-8 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center mb-4 text-white/50">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif mb-1">{user.name}</h3>
              <p className="text-white/50 text-sm font-sans mb-4">{user.email}</p>
              <div className="px-3 py-1 glass-panel rounded-full text-xs text-white/80 uppercase tracking-widest bg-white/5 inline-block">
                {user.role} Tier
              </div>
            </GlassCard>

            <div className="space-y-3 flex-1">
              {[
                { icon: Package, label: "Order History" },
                { icon: Settings, label: "Settings & Preferences" },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl glass-panel hover:bg-white/10 transition-colors bg-white/5">
                  <div className="flex items-center gap-3 text-white/80 text-sm font-sans">
                    <item.icon className="w-4 h-4 text-white/50" />
                    {item.label}
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <GlassButton 
                variant="ghost" 
                className="w-full text-red-400 hover:bg-red-500/10 border border-red-500/20 flex gap-2 justify-center py-4"
                onClick={() => {
                  logout();
                  onClose();
                }}
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </GlassButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
