"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "./GlassCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setTimeout(() => setQuery(""), 0);
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      // For now, redirect to collections
      // In a real app we would pass the query string parameter
      router.push(`/collections`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          
          <div className="fixed inset-x-0 top-0 pt-20 px-4 md:px-0 z-[101] pointer-events-none flex justify-center">
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl pointer-events-auto"
            >
              <GlassCard className="p-2 flex items-center gap-2 overflow-hidden shadow-2xl relative bg-[color:var(--background)]">
                <form onSubmit={handleSearch} className="flex-1 flex items-center gap-3 px-4 py-2">
                  <SearchIcon className="w-5 h-5 text-[color:var(--foreground)] opacity-50" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search collections, fabrics, or colors..."
                    className="flex-1 bg-transparent border-none outline-none text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)] placeholder:opacity-30 text-lg sm:text-xl"
                  />
                  <button
                    type="submit"
                    className="hidden sm:block px-4 py-2 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] text-sm font-medium transition-transform hover:scale-105"
                  >
                    Search
                  </button>
                </form>
                
                <div className="h-8 w-px bg-[color:var(--foreground)] opacity-10 mx-2" />
                
                <button
                  onClick={onClose}
                  className="p-3 mr-1 rounded-full hover:bg-[color:var(--foreground)] hover:bg-opacity-10 text-[color:var(--foreground)] opacity-70 hover:opacity-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </GlassCard>
              
              {query.trim() && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 text-center text-[color:var(--foreground)] opacity-70 font-sans"
                >
                  Press Enter to search for &quot;{query}&quot; in Collections
                </motion.div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
