"use client";

import { motion } from "framer-motion";
import { Home, Grid, User, ShoppingBag, Sun, Moon, Palette, ArrowLeft, Search, Mail, MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme, useSearch, useChat } from "@/app/providers";

export function FloatingDock() {
  const pathname = usePathname();
  const { setIsSearchOpen } = useSearch();
  const { setIsChatOpen } = useChat();
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("brown");
    else setTheme("dark");
  };

  const router = useRouter();

  const NAV_ITEMS = [
    { type: "button", icon: ArrowLeft, label: "Back", onClick: () => router.back() },
    { type: "link", icon: Home, label: "Home", href: "/" },
    { type: "link", icon: Grid, label: "Collections", href: "/collections" },
    { type: "button", icon: Search, label: "Search", onClick: () => setIsSearchOpen(true) },
    { type: "link", icon: Mail, label: "Contact", href: "/contact" },
    { type: "button", icon: MessageCircle, label: "Chat", onClick: () => setIsChatOpen(true) },
    { type: "link", icon: HelpCircle, label: "FAQ", href: "/faq" },
    // Theme switcher integrated inside the dock
    {
      type: "button",
      icon: theme === "dark" ? Sun : theme === "light" ? Palette : Moon,
      label: theme === "dark" ? "Light Mode" : theme === "light" ? "Brown Mode" : "Dark Mode",
      onClick: cycleTheme,
      themeBtn: true,
    },
  ];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="bg-[color:var(--background)]/80 backdrop-blur-xl flex items-center gap-1 p-2 rounded-[32px] overflow-x-auto shadow-2xl border-2 border-[color:var(--foreground)]/15 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {NAV_ITEMS.map((item, i) => {
          const isActive = item.type === "link" ? pathname === item.href : false;
          const Icon = item.icon;

          const content = (
            <motion.div
              whileHover={{ scale: 1.1, translateY: -3 }}
              whileTap={{ scale: 0.92 }}
              title={item.label}
              className={cn(
                "relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-200 flex-shrink-0 group/item",
                isActive
                  ? "text-[#C4956A] bg-[#5D4037]/20"
                  : (item as any).themeBtn
                  ? "text-amber-400 opacity-80 hover:opacity-100 hover:bg-amber-500/10"
                  : "text-[color:var(--foreground)] opacity-70 hover:opacity-100 hover:bg-[color:var(--foreground)]/10"
              )}
            >
              <Icon className="w-5 h-5 relative z-10" strokeWidth={isActive ? 2 : 1.5} />
              {/* Tooltip */}
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 text-[10px] font-sans bg-[color:var(--background)]/90 text-[color:var(--foreground)] border border-[color:var(--foreground)]/10 px-2 py-1 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-sm">
                {item.label}
              </span>
            </motion.div>
          );

          return item.type === "link" ? (
            <Link key={i} href={(item as any).href || "#"}>{content}</Link>
          ) : (
            <button key={i} onClick={(item as any).onClick}>{content}</button>
          );
        })}
      </div>
    </motion.div>
  );
}
