"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Package, Users, Plus, Image as ImageIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassInput } from "@/components/ui/GlassInput";
import { useState } from "react";

const mockSalesData = [40, 60, 45, 80, 55, 90, 110];
const mockDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview"|"add_product">("overview");
  const [newProduct, setNewProduct] = useState({
    name: "", fabric: "", category: "Basics", type: "", color: "",
    price_iqd: "", stock_level: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });
      setNewProduct({ name: "", fabric: "", category: "Basics", type: "", color: "", price_iqd: "", stock_level: "" });
      alert("Product added successfully!");
      setActiveTab("overview");
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 pb-32">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Workspace</h1>
          <p className="text-white/50 font-sans text-sm">Store Management</p>
        </div>
        <div className="flex bg-white/5 rounded-3xl p-1 border border-white/10">
           <button 
             onClick={() => setActiveTab("overview")}
             className={`px-4 py-2 rounded-2xl text-sm transition-all ${activeTab === "overview" ? "bg-white/10 shadow-sm text-white" : "text-white/50 hover:text-white"}`}
           >
             Overview
           </button>
           <button 
             onClick={() => setActiveTab("add_product")}
             className={`px-4 py-2 rounded-2xl text-sm transition-all flex items-center gap-1 ${activeTab === "add_product" ? "bg-white/10 shadow-sm text-white" : "text-white/50 hover:text-white"}`}
           >
             <Plus className="w-4 h-4" /> Add Product
           </button>
        </div>
      </header>

      {activeTab === "overview" ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Sales", value: "IQD 1.2M", icon: TrendingUp, color: "text-emerald-400" },
              { label: "Active Orders", value: "24", icon: Package, color: "text-indigo-400" },
              { label: "Customers", value: "1,142", icon: Users, color: "text-purple-400" },
              { label: "Conversion Rate", value: "3.2%", icon: BarChart3, color: "text-blue-400" },
            ].map((stat, i) => (
              <GlassCard key={i} className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className="text-white/60 font-sans text-sm">{stat.label}</span>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-3xl font-serif">{stat.value}</span>
              </GlassCard>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="lg:col-span-2 h-[400px] flex flex-col">
              <h2 className="text-xl mb-6">Revenue</h2>
              <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 relative pt-10">
                <div className="absolute left-0 top-0 bottom-6 w-full border-b border-white/10" />
                <div className="absolute left-0 top-1/2 bottom-6 w-full border-b border-white/5 border-dashed" />
                
                {mockSalesData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 z-10 group">
                    <div className="w-full flex-1 flex items-end justify-center">
                      <motion.div 
                        initial={{ height: 0 }} animate={{ height: `${(val / 110) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                        className="w-full max-w-[40px] bg-gradient-to-t from-white/5 to-white/30 rounded-t-xl group-hover:from-white/10 group-hover:to-white/50 transition-colors relative"
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                          {val}k
                        </div>
                      </motion.div>
                    </div>
                    <span className="text-white/40 text-xs font-sans">{mockDays[i]}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="h-[400px] flex flex-col">
              <h2 className="text-xl mb-6">Low Stock Alerts</h2>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {[
                  { item: "Premium Silk Latte", stock: 2, status: "Critical" },
                  { item: "Chiffon Nude", stock: 5, status: "Warning" },
                  { item: "Modal Basics Black", stock: 8, status: "Warning" },
                ].map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="text-sm">{p.item}</p>
                      <p className="text-xs text-white/40">{p.stock} remaining</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      p.status === "Critical" ? "bg-red-500/20 text-red-300" : "bg-amber-500/20 text-amber-300"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <form onSubmit={handleAddProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 space-y-6">
                  <GlassCard>
                     <h2 className="text-xl mb-6">Product Information</h2>
                     <div className="space-y-4">
                        <div>
                           <label className="text-sm text-white/60 mb-2 block">Title</label>
                           <GlassInput required placeholder="Short sleeve abaya..." value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-sm text-white/60 mb-2 block">Fabric</label>
                              <GlassInput required placeholder="e.g. Silk" value={newProduct.fabric} onChange={e => setNewProduct({...newProduct, fabric: e.target.value})} />
                           </div>
                           <div>
                              <label className="text-sm text-white/60 mb-2 block">Color</label>
                              <GlassInput required placeholder="e.g. Navy" value={newProduct.color} onChange={e => setNewProduct({...newProduct, color: e.target.value})} />
                           </div>
                        </div>
                     </div>
                  </GlassCard>
                  
                  <GlassCard>
                     <h2 className="text-xl mb-6">Pricing & Inventory</h2>
                     <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="text-sm text-white/60 mb-2 block">Price (IQD)</label>
                              <GlassInput required type="number" placeholder="45000" value={newProduct.price_iqd} onChange={e => setNewProduct({...newProduct, price_iqd: e.target.value})} />
                           </div>
                           <div>
                              <label className="text-sm text-white/60 mb-2 block">Stock Level</label>
                              <GlassInput required type="number" placeholder="50" value={newProduct.stock_level} onChange={e => setNewProduct({...newProduct, stock_level: e.target.value})} />
                           </div>
                     </div>
                  </GlassCard>
               </div>
               
               <div className="space-y-6">
                  <GlassCard>
                     <h2 className="text-xl mb-6">Media</h2>
                     <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-white/40 hover:bg-white/10 transition-colors cursor-pointer">
                        <ImageIcon className="w-8 h-8 mb-2" />
                        <span className="text-sm font-sans">Upload Image</span>
                     </div>
                  </GlassCard>
                  
                  <div className="flex justify-end gap-3 mt-8">
                     <GlassButton type="button" variant="ghost" className="border border-white/20" onClick={() => setActiveTab("overview")}>Cancel</GlassButton>
                     <GlassButton type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Product"}</GlassButton>
                  </div>
               </div>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
