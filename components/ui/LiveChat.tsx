"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/app/providers";
import { GlassCard } from "./GlassCard";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  time: string;
}

export function LiveChat() {
  const { isChatOpen, setIsChatOpen } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "agent",
      text: "Hello! Welcome to Hijab Essence. How can we help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate agent response
    setTimeout(() => {
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "agent",
        text: "Thank you for reaching out. An agent will be with you shortly. For immediate assistance regarding orders, please have your Order ID ready.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-24 right-4 md:right-8 z-[150] w-[90vw] md:w-[350px] shadow-2xl pointer-events-auto"
        >
          <GlassCard className="flex flex-col h-[450px] p-0 overflow-hidden border border-[color:var(--foreground)]/20 shadow-2xl shadow-black/50">
            {/* Header */}
            <div className="bg-[color:var(--foreground)]/10 border-b border-[color:var(--foreground)]/10 p-4 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center">
                   <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="font-serif text-[color:var(--foreground)]">Hijab Essence Support</h3>
                   <span className="text-xs font-sans text-emerald-500 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      We typically reply in 5 mins
                   </span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 text-[color:var(--foreground)] opacity-50 hover:opacity-100 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[color:var(--background)]/40">
               {messages.map(msg => (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   key={msg.id} 
                   className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2`}
                 >
                   {msg.sender === "agent" && (
                     <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-500 flex items-center justify-center flex-shrink-0 mt-auto">
                       <MessageCircle className="w-4 h-4" />
                     </div>
                   )}
                   <div className={`max-w-[75%] px-4 py-2 ${msg.sender === "user" ? "bg-[color:var(--foreground)] text-[color:var(--background)] rounded-2xl rounded-tr-sm" : "bg-[color:var(--foreground)]/10 text-[color:var(--foreground)] rounded-2xl rounded-tl-sm"}`}>
                      <p className="text-sm font-sans">{msg.text}</p>
                      <span className={`block text-[10px] mt-1 ${msg.sender === "user" ? "text-[color:var(--background)]/70 text-right" : "text-[color:var(--foreground)]/50"}`}>
                        {msg.time}
                      </span>
                   </div>
                   {msg.sender === "user" && (
                     <div className="w-8 h-8 rounded-full bg-[color:var(--foreground)]/10 text-[color:var(--foreground)] flex items-center justify-center flex-shrink-0 mt-auto">
                       <User className="w-4 h-4" />
                     </div>
                   )}
                 </motion.div>
               ))}
               <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[color:var(--foreground)]/10 bg-[color:var(--foreground)]/5 backdrop-blur-md flex gap-2">
               <input 
                 type="text"
                 placeholder="Type your message..."
                 value={input}
                 onChange={e => setInput(e.target.value)}
                 onKeyDown={e => e.key === "Enter" && handleSend()}
                 className="flex-1 bg-transparent border border-[color:var(--foreground)]/20 rounded-full px-4 text-sm text-[color:var(--foreground)] focus:outline-none focus:border-indigo-500"
               />
               <button 
                 onClick={handleSend}
                 disabled={!input.trim()}
                 className="w-10 h-10 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105"
               >
                 <Send className="w-4 h-4" />
               </button>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
