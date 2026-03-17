"use client";

import { useAuth, useCart, useLanguage, Language } from "@/app/providers";
import { UserCircle, ShoppingBag, Globe, Bell, Package, Truck, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ORDER_NOTIFICATIONS = [
  {
    id: 1,
    title: "Order #HE-2847 Shipped",
    desc: "Your Silk Premium Latte is on its way!",
    time: "2 hours ago",
    icon: Truck,
    unread: true,
  },
  {
    id: 2,
    title: "Order #HE-2831 Delivered",
    desc: "Chiffon Basics Black has been delivered",
    time: "Yesterday",
    icon: CheckCircle,
    unread: false,
  },
  {
    id: 3,
    title: "Order #HE-2820 Processing",
    desc: "Modal Prints Olive is being prepared",
    time: "2 days ago",
    icon: Clock,
    unread: false,
  },
  {
    id: 4,
    title: "Order #HE-2815 Delivered",
    desc: "Jersey Occasion Navy has been delivered",
    time: "5 days ago",
    icon: Package,
    unread: false,
  },
];

export function TopBar() {
  const { setIsAuthOpen } = useAuth();
  const { setIsCartOpen, cartCount } = useCart();
  const { language, setLanguage } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = ORDER_NOTIFICATIONS.filter(n => n.unread).length;

  // Close notification dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const languages = [
    { code: "EN", name: "English" },
    { code: "AR", name: "Arabic" },
    { code: "KU", name: "Kurdish" }
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 md:px-6 py-3 flex justify-between items-center bg-[color:var(--background)]/80 backdrop-blur-xl border-b border-[color:var(--foreground)]/[0.07] shadow-sm pointer-events-auto">
      {/* Left section: Animated Language picker */}
      <div className="flex-1 flex justify-start">
        <div className="relative">
          <motion.button
            onClick={() => setLangOpen(!langOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 text-[color:var(--foreground)] opacity-70 hover:opacity-100 transition-opacity px-3 py-2 rounded-xl hover:bg-[color:var(--foreground)]/10 border border-transparent hover:border-[color:var(--foreground)]/10"
          >
            <motion.div
              animate={langOpen ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Globe className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            </motion.div>
            <span className="text-xs md:text-sm font-medium font-sans">{language}</span>
            <motion.span
              animate={{ rotate: langOpen ? 180 : 0 }}
              className="text-[10px] opacity-50"
            >
              ▼
            </motion.span>
          </motion.button>
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-full left-0 mt-2 w-40 glass-panel p-2 shadow-2xl flex flex-col gap-1 z-50 rounded-xl bg-[color:var(--background)]/90"
              >
                {languages.map((l, i) => (
                  <motion.button
                    key={l.code}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { setLanguage(l.code as Language); setLangOpen(false); }}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm transition-all font-sans flex items-center gap-2 ${language === l.code
                        ? "bg-[color:var(--foreground)] text-[color:var(--background)] font-medium shadow-sm"
                        : "text-[color:var(--foreground)] hover:bg-[color:var(--foreground)]/10"
                      }`}
                  >
                    <span className="text-base">{l.code === 'EN' ? '🇬🇧' : l.code === 'AR' ? '🇮🇶' : '🏔️'}</span>
                    {l.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Center: Logo + Brand Name */}
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
        <Image src="/logo_original.jpg" alt="Hijab Essence" width={140} height={40} className="h-8 md:h-9 w-auto object-contain rounded-md" priority />
        <span
          className="hidden md:block text-lg tracking-wide text-[color:var(--foreground)] opacity-90"
          style={{ fontFamily: "'Abraham', serif" }}
        >
          Hijab Essence
        </span>
      </Link>

      {/* Right section: Notifications → Cart → Account */}
      <div className="flex-1 flex justify-end items-center gap-1 md:gap-2">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex items-center gap-1.5 text-[color:var(--foreground)] opacity-70 hover:opacity-100 transition-all px-2.5 py-1.5 rounded-xl hover:bg-[color:var(--foreground)]/10"
          >
            <Bell className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans leading-none z-10 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-full right-0 mt-2 w-80 glass-panel p-0 shadow-2xl z-50 rounded-2xl bg-[color:var(--background)]/95 border border-[color:var(--foreground)]/10 overflow-hidden"
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-[color:var(--foreground)]/10 flex items-center justify-between">
                  <h4 className="text-sm font-serif text-[color:var(--foreground)]">Order Updates</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-sans bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  )}
                </div>

                {/* Notification List */}
                <div className="max-h-72 overflow-y-auto">
                  {ORDER_NOTIFICATIONS.map((notif, i) => {
                    const NotifIcon = notif.icon;
                    return (
                      <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-3 px-4 py-3 hover:bg-[color:var(--foreground)]/5 transition-colors cursor-pointer border-b border-[color:var(--foreground)]/5 last:border-0 ${notif.unread ? 'bg-[#5D4037]/[0.06]' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          notif.unread ? 'bg-[#8B6914]/20 text-[#C4956A]' : 'bg-[color:var(--foreground)]/5 text-[color:var(--foreground)] opacity-40'
                        }`}>
                          <NotifIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-sans leading-tight ${notif.unread ? 'text-[color:var(--foreground)] font-medium' : 'text-[color:var(--foreground)] opacity-70'}`}>
                            {notif.title}
                          </p>
                          <p className="text-[11px] font-sans text-[color:var(--foreground)] opacity-50 mt-0.5 truncate">{notif.desc}</p>
                          <p className="text-[10px] font-sans text-[#C4956A] mt-1">{notif.time}</p>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 rounded-full bg-[#8B6914] shrink-0 mt-1.5" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 border-t border-[color:var(--foreground)]/10 text-center">
                  <button className="text-[11px] font-sans text-[#C4956A] hover:text-[#8B6914] transition-colors">
                    View All Orders →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-1.5 text-[color:var(--foreground)] opacity-70 hover:opacity-100 transition-all px-2.5 py-1.5 rounded-xl hover:bg-[color:var(--foreground)]/10"
        >
          <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
          <span className="hidden md:block text-sm font-medium font-sans">
            {language === 'AR' ? 'عربة التسوق' : language === 'KU' ? 'سەبەتە' : 'Cart'}
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#8B6914] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-sans leading-none z-10">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="hidden md:block h-5 w-px bg-[color:var(--foreground)]/20" />

        {/* Account Button — rightmost */}
        <button
          onClick={() => setIsAuthOpen(true)}
          className="flex items-center gap-1.5 text-[color:var(--foreground)] opacity-70 hover:opacity-100 transition-all px-2.5 py-1.5 rounded-xl hover:bg-[color:var(--foreground)]/10"
        >
          <UserCircle className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
          <span className="hidden md:block text-sm font-medium font-sans">
            {language === 'AR' ? 'الحساب' : language === 'KU' ? 'هەژمار' : 'Account'}
          </span>
        </button>
      </div>
    </header>
  );
}
