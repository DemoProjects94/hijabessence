"use client";

import { motion } from "framer-motion";
import {
  ArrowRight, Star, Heart, Users, MessageSquareHeart, PackageOpen,
  ShoppingBag, MapPin, Phone, CreditCard, Wallet,
  Ribbon, Wind, Snowflake, Shirt, Building2, Gem,
  Sparkles, Flower2, Droplets, Crown, Zap, Flame,
  ChevronRight, Mail, Bell
} from "lucide-react";
import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import Link from "next/link";
import Image from "next/image";
import { useCart, useAuth } from "@/app/providers";
import { useTranslation } from "@/hooks/useTranslation";

// Categories — all brown palette matching the logo
const CATEGORIES = [
  { name: "Scarves",     Icon: Ribbon,    href: "/collections?category=Scarves" },
  { name: "Shawls",      Icon: Wind,      href: "/collections?category=Shawls" },
  { name: "Mufflers",    Icon: Snowflake, href: "/collections?category=Mufflers" },
  { name: "Dresses",     Icon: Shirt,     href: "/collections?category=Dresses" },
  { name: "Abayas",      Icon: Building2, href: "/collections?category=Abayas" },
  { name: "Accessories", Icon: Gem,       href: "/collections?category=Accessories" },
  { name: "Silk",        Icon: Sparkles,  href: "/collections?type=Silk" },
  { name: "Chiffon",     Icon: Flower2,   href: "/collections?type=Chiffon" },
  { name: "Modal",       Icon: Droplets,  href: "/collections?type=Modal" },
  { name: "Premium",     Icon: Crown,     href: "/collections?category=Premium" },
  { name: "New In",      Icon: Zap,       href: "/collections?category=New" },
  { name: "Sale",        Icon: Flame,     href: "/collections?category=Sale" },
];

export default function Home() {
  const { addToCart } = useCart();
  const { setIsAuthOpen } = useAuth();

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const t = useTranslation({
    greeting: getGreeting(),
    newArrival: "New Arrival",
    heroTitle1: "The",
    heroTitle2: "Liquid Silk",
    heroTitle3: "Collection",
    heroDesc: "Experience weightless elegance with our highly refractive, breathable silk blends.",
    shopCollection: "Shop Collection",
    myProfile: "My Profile",
    edit: "Edit",
    iqdBal: "IQD Bal.",
    orders: "Orders",
    wishlist: "Wishlist",
    rating: "Rating",
    recentPurchases: "Recent Purchases",
    viewFullProfile: "View Full Profile",
    shopByCategory: "Shop by Category",
    viewAll: "View All",
    ourImpact: "Our Impact",
    trustedAcrossIraq: "Trusted across Iraq",
    customers: "Customers",
    feedback: "Feedback",
    items: "Items",
    theEssences: "The Essences",
    latestArrivals: "Latest Arrivals",
    latestArrivalsDesc: "Discover our newest collection of meticulously crafted hijabs, designed for the modern woman who refuses to compromise on elegance or comfort.",
    viewAllCollections: "View All Collections",
    viewDetails: "View Details",
    orderUpdatesOn: "Order updates: ON",
  });

  return (
    <main className="min-h-screen bg-[color:var(--background)] relative overflow-hidden transition-colors">

      {/* Greeting */}
      <div className="pt-20 pb-2 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[color:var(--foreground)] opacity-50 font-sans text-sm md:text-base"
        >
          {t.greeting}, <span className="opacity-100 font-medium">Lizan</span> ✨
        </motion.p>
      </div>

      {/* Main Bento Grid */}
      <div className="pt-2 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-auto md:auto-rows-[270px]">

          {/* ═══════════════════════════════════════ */}
          {/* Hero — Animated brown gradient, NO background image */}
          {/* ═══════════════════════════════════════ */}
          <GlassCard
            variant="luminous"
            className="md:col-span-2 md:row-span-2 flex flex-col justify-end p-8 relative overflow-hidden group min-h-[340px]"
          >
            {/* Sharp animated brown ambient glow — reduced blur for clarity */}
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.08, 1] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
              className="absolute -right-16 -top-16 w-[400px] h-[400px] bg-[#8B6914]/30 rounded-full blur-[40px]"
            />
            <motion.div
              animate={{ y: [0, 25, 0], x: [0, -25, 0] }}
              transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 2 }}
              className="absolute -left-12 bottom-4 w-72 h-72 bg-[#5D4037]/35 rounded-full blur-[30px]"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
              className="absolute right-1/3 top-1/3 w-48 h-48 bg-[#C4956A]/25 rounded-full blur-[25px]"
            />
            {/* Subtle mesh gradient overlay — not blurry */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3E2723]/50 via-[#5D4037]/20 to-[#8B6914]/15 z-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)]/90 via-[color:var(--background)]/30 to-transparent z-0" />

            <div className="relative z-10 w-full md:w-2/3">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <span className="inline-block px-3 py-1 mb-4 text-xs font-sans tracking-widest text-[#C4956A] uppercase border border-[#8B6914]/30 rounded-full bg-[#5D4037]/10 backdrop-blur-md">
                  {t.newArrival}
                </span>
                <h2 className="text-4xl md:text-6xl mb-4 leading-tight text-[color:var(--foreground)]">
                  {t.heroTitle1} <span className="font-serif italic text-[#C4956A]">{t.heroTitle2}</span> {t.heroTitle3}
                </h2>
                <p className="text-[color:var(--foreground)] opacity-60 font-sans mb-6 text-base md:text-lg max-w-md">
                  {t.heroDesc}
                </p>
                <Link href="/collections">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#5D4037] text-[#F5E6D3] rounded-full font-medium text-base md:text-lg shadow-[0_0_40px_rgba(93,64,55,0.4)] hover:shadow-[0_0_60px_rgba(93,64,55,0.6)] hover:bg-[#6D4C41] transition-all"
                  >
                    {t.shopCollection}
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </GlassCard>

          {/* ═══════════════════════════════════════ */}
          {/* My Profile — Lizan Abbas */}
          {/* ═══════════════════════════════════════ */}
          <GlassCard className="flex flex-col relative overflow-hidden md:row-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-serif text-[color:var(--foreground)] leading-tight">{t.myProfile}</h3>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="text-[10px] font-sans text-[#C4956A] hover:text-[#8B6914] transition-colors uppercase tracking-wider"
              >
                {t.edit}
              </button>
            </div>

            {/* Avatar + Name row */}
            <div className="flex items-center gap-3 mb-3 p-2.5 rounded-xl bg-gradient-to-r from-[#5D4037]/10 via-transparent to-[#8B6914]/10 border border-[#8B6914]/15">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B6914] to-[#5D4037] flex items-center justify-center text-[#F5E6D3] font-serif text-sm font-bold shrink-0 shadow-lg ring-2 ring-[#8B6914]/30">
                L
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[color:var(--foreground)] text-sm leading-tight">Lizan Abbas</p>
                <p className="text-[color:var(--foreground)] opacity-50 text-[10px] font-sans mt-0.5 truncate">lizan.abbas@email.com</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-serif text-sm text-[#C4956A] leading-none">85K</p>
                <p className="text-[8px] font-sans text-[color:var(--foreground)] opacity-40 uppercase mt-0.5">{t.iqdBal}</p>
              </div>
            </div>

            {/* Quick Stats row */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#5D4037]/[0.06] border border-[#8B6914]/10">
                <span className="font-serif text-base text-[color:var(--foreground)] leading-none">7</span>
                <span className="text-[7px] font-sans text-[color:var(--foreground)] opacity-40 uppercase tracking-wider mt-0.5">{t.orders}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#5D4037]/[0.06] border border-[#8B6914]/10">
                <span className="font-serif text-base text-[color:var(--foreground)] leading-none">12</span>
                <span className="text-[7px] font-sans text-[color:var(--foreground)] opacity-40 uppercase tracking-wider mt-0.5">{t.wishlist}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#5D4037]/[0.06] border border-[#8B6914]/10">
                <span className="font-serif text-base text-[color:var(--foreground)] leading-none">4.9</span>
                <span className="text-[7px] font-sans text-[color:var(--foreground)] opacity-40 uppercase tracking-wider mt-0.5">{t.rating}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-1.5 mb-3">
              {[
                { icon: Phone, label: "+964 770 123 4567" },
                { icon: Mail, label: "lizan.abbas@email.com" },
                { icon: MapPin, label: "Al-Mansour, Baghdad" },
                { icon: Bell, label: t.orderUpdatesOn, accent: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-[#5D4037]/[0.06] transition-colors cursor-default">
                  <item.icon className={`w-3.5 h-3.5 shrink-0 ${item.accent ? 'text-green-400' : 'text-[#C4956A]'}`} strokeWidth={1.8} />
                  <span className={`text-[11px] font-sans leading-tight ${item.accent ? 'text-green-400/80' : 'text-[color:var(--foreground)] opacity-60'}`}>{item.label}</span>
                </div>
              ))}
            </div>
            {/* Recent Purchases — Thumbnail Grid */}
            <div className="flex-1 min-h-0">
              <p className="text-[10px] font-sans text-[color:var(--foreground)] opacity-40 uppercase tracking-wider mb-2">{t.recentPurchases}</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Silk Premium Latte", img: "/images/Scarf/photo_3_2026-03-16_23-04-28.jpg", id: "product-3" },
                  { name: "Modal Prints Olive", img: "/images/Scarf/photo_5_2026-03-16_23-04-28.jpg", id: "product-5" },
                  { name: "Chiffon Basics Black", img: "/images/Scarf/photo_20_2026-03-16_23-04-28.jpg", id: "product-20" },
                ].map((item, i) => (
                  <Link key={i} href={`/product/${item.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#8B6914]/15 bg-black/10 cursor-pointer group/thumb"
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                      <p className="absolute bottom-1 left-1 right-1 text-[8px] font-sans text-white truncate opacity-0 group-hover/thumb:opacity-100 transition-opacity z-10">{item.name}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* View Full Profile */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAuthOpen(true)}
              className="mt-2 w-full py-2 rounded-xl glass-panel flex items-center justify-center gap-2 text-[color:var(--foreground)] hover:bg-[#5D4037]/15 transition-all text-xs font-medium font-sans border border-[#8B6914]/15"
            >
              {t.viewFullProfile}
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </motion.button>
          </GlassCard>

          {/* ═══════════════════════════════════════ */}
          {/* Categories — all brown icons */}
          {/* ═══════════════════════════════════════ */}
          <GlassCard className="md:col-span-2 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif text-[color:var(--foreground)]">{t.shopByCategory}</h3>
              <Link href="/collections" className="text-[10px] font-sans text-[#C4956A] hover:text-[#8B6914] uppercase tracking-wider transition-colors flex items-center gap-1">
                {t.viewAll} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2 flex-1 content-start">
              {CATEGORIES.map((cat, i) => {
                const CatIcon = cat.Icon;
                return (
                  <Link key={cat.name} href={cat.href}>
                    <motion.div
                      whileHover={{ scale: 1.06, y: -3 }}
                      whileTap={{ scale: 0.94 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.35, type: "spring", stiffness: 300 }}
                      className="flex flex-col items-center justify-center p-2 md:p-3 rounded-xl bg-[#5D4037]/[0.07] border border-[#8B6914]/[0.12] hover:bg-[#5D4037]/15 hover:border-[#8B6914]/25 transition-all cursor-pointer group/cat"
                    >
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5D4037]/10 flex items-center justify-center mb-1.5 group-hover/cat:scale-110 group-hover/cat:bg-[#5D4037]/20 transition-all">
                        <CatIcon className="w-4 h-4 md:w-[18px] md:h-[18px] text-[#C4956A]" strokeWidth={1.8} />
                      </div>
                      <span className="text-[10px] md:text-[11px] font-sans text-[color:var(--foreground)] opacity-60 group-hover/cat:opacity-100 transition-opacity text-center leading-tight">{cat.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </GlassCard>

          {/* ═══════════════════════════════════════ */}
          {/* Stats — brown themed */}
          {/* ═══════════════════════════════════════ */}
          <GlassCard className="flex flex-col justify-between group hover:border-[#8B6914]/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#5D4037]/10 flex items-center justify-center text-[#C4956A] relative">
                <div className="absolute inset-0 bg-[#8B6914]/15 rounded-full animate-ping opacity-20" />
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[color:var(--foreground)]">{t.ourImpact}</h3>
                <p className="font-sans text-xs text-[color:var(--foreground)] opacity-50">{t.trustedAcrossIraq}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#5D4037]/[0.07] border border-[#8B6914]/15 text-center group/stat">
                <Users className="w-5 h-5 text-[#C4956A] mb-2 group-hover/stat:scale-110 transition-transform" />
                <h4 className="font-serif text-lg text-[color:var(--foreground)]">12K+</h4>
                <span className="text-[10px] font-sans text-[color:var(--foreground)] opacity-50 uppercase tracking-widest">{t.customers}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#5D4037]/[0.07] border border-[#8B6914]/15 text-center group/stat">
                <MessageSquareHeart className="w-5 h-5 text-[#C4956A] mb-2 group-hover/stat:scale-110 transition-transform" />
                <h4 className="font-serif text-lg text-[color:var(--foreground)]">4.9/5</h4>
                <span className="text-[10px] font-sans text-[color:var(--foreground)] opacity-50 uppercase tracking-widest">{t.feedback}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#5D4037]/[0.07] border border-[#8B6914]/15 text-center group/stat">
                <PackageOpen className="w-5 h-5 text-[#C4956A] mb-2 group-hover/stat:scale-110 transition-transform" />
                <h4 className="font-serif text-lg text-[color:var(--foreground)]">840+</h4>
                <span className="text-[10px] font-sans text-[color:var(--foreground)] opacity-50 uppercase tracking-widest">{t.items}</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Marquee Gallery */}
      <div className="py-12 bg-[color:var(--foreground)]/[0.02] border-y border-[color:var(--foreground)]/5 overflow-hidden">
        <h2 className="text-center font-sans tracking-widest uppercase text-[color:var(--foreground)] opacity-40 text-xs mb-8">
          {t.theEssences}
        </h2>
        <div className="relative w-full flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex gap-4 px-2 whitespace-nowrap min-w-max"
          >
            {[1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 20, 21, 22, 23, 24].map((num, idx) => (
              <Link key={idx} href={`/product/product-${num}`} className="block">
                <div className="w-48 h-64 md:w-64 md:h-80 relative rounded-2xl overflow-hidden flex-shrink-0 glass-panel border border-[color:var(--foreground)]/10 hover:border-[#8B6914]/30 transition-colors group/m">
                  <Image src={`/images/Scarf/photo_${num}_2026-03-16_23-04-28.jpg`} alt={`Product ${idx + 1}`} fill sizes="(max-width: 768px) 192px, 256px" className="object-cover group-hover/m:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/m:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Latest Arrivals */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-20 pb-36 relative z-10">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-serif text-[color:var(--foreground)] mb-3"
            >
              {t.latestArrivals}
            </motion.h2>
            <p className="text-[color:var(--foreground)] opacity-60 font-sans max-w-xl text-sm md:text-base">
              {t.latestArrivalsDesc}
            </p>
          </div>
          <Link href="/collections" className="hidden md:flex items-center gap-2 text-sm text-[#C4956A] hover:text-[#8B6914] transition-colors pb-1">
            {t.viewAllCollections} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          <ProductsGrid />
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/collections">
            <GlassButton variant="ghost" className="border border-[#8B6914]/20 text-[#C4956A]">{t.viewAllCollections}</GlassButton>
          </Link>
        </div>
      </div>
    </main>
  );
}

// Product card — heart favorite, NO cart circle
import { Heart as HeartIcon } from "lucide-react";

function ProductsGrid() {
  const [products, setProducts] = useState<{ id: string; name: string; price_iqd: number; image_url: string; color: string; type: string }[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => { setProducts(data.data.slice(0, 10)); });
  }, []);

  const toggleFav = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
        >
          <Link href={`/product/${product.id}`}>
            <GlassCard className="p-0 overflow-hidden group h-full flex flex-col cursor-pointer hover:bg-[color:var(--foreground)]/5 transition-all border-[color:var(--foreground)]/5 hover:border-[#8B6914]/20 hover:shadow-xl">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/5">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Favorite heart — top right */}
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={(e) => toggleFav(e, product.id)}
                  className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
                    favorites.has(product.id)
                      ? "bg-red-500/90 text-white shadow-lg shadow-red-500/30"
                      : "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white"
                  }`}
                >
                  <HeartIcon className="w-4 h-4" fill={favorites.has(product.id) ? "currentColor" : "none"} />
                </motion.button>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="text-white text-xs font-sans font-medium bg-[#5D4037]/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#C4956A]/30">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-4 relative z-10 flex flex-col flex-1 text-[color:var(--foreground)]">
                <h3 className="text-sm md:text-base font-serif leading-tight">{product.name}</h3>
                <p className="text-[10px] md:text-xs opacity-60 font-sans mt-1 capitalize mb-3">{product.color} • {product.type}</p>
                <div className="mt-auto">
                  <span className="font-sans font-semibold text-sm text-[#C4956A]">IQD {product.price_iqd.toLocaleString()}</span>
                </div>
              </div>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </>
  );
}
