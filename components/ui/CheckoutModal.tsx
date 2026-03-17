"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, CreditCard, Smartphone, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "./GlassCard";
import { useCart } from "@/app/providers";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cartTotal, cart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [provider, setProvider] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const gateways = [
    { id: "fib", name: "First Iraqi Bank", icon: ShieldCheck, desc: "QR Code / Deep Link" },
    { id: "zaincash", name: "ZainCash", icon: Smartphone, desc: "OTP Wallet Deduction" },
    { id: "asiacell", name: "AsiaCell", icon: Smartphone, desc: "OTP Wallet Deduction" },
    { id: "fastpay", name: "FastPay", icon: CreditCard, desc: "Secure Gateway Redirect" },
  ];

  const handleSimulatePayment = async () => {
    if (!provider) return;
    setLoading(true);
    
    try {
      const res = await fetch(`/api/payments/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_iqd: cartTotal,
          phone_number: phoneNumber || "07500000000",
        }),
      });
      const data = await res.json();
      setPaymentResult(data);
      setStep(3);
    } catch (e) {
      console.error(e);
      alert("Simulation failed.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1);
    setProvider(null);
    setPaymentResult(null);
    setPhoneNumber("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
        >
          <GlassCard className="w-full max-w-lg relative p-6 max-h-[90vh] overflow-y-auto overflow-x-hidden bg-[color:var(--background)] shadow-2xl shadow-black">
            <button 
              onClick={reset}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[color:var(--foreground)]/10 text-[color:var(--foreground)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {step === 1 && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="pt-4">
                <h3 className="text-2xl font-serif mb-2 text-[color:var(--foreground)]">Select Payment Method</h3>
                <p className="text-sm font-sans mb-6 text-[color:var(--foreground)] opacity-60">
                  Total Amount: <strong className="opacity-100">IQD {cartTotal.toLocaleString()}</strong>
                </p>

                <div className="grid gap-3">
                  {gateways.map(gw => {
                    const Icon = gw.icon;
                    return (
                      <button
                        key={gw.id}
                        onClick={() => {
                          setProvider(gw.id);
                          setStep(2);
                        }}
                        className="flex items-center gap-4 w-full p-4 rounded-xl border border-[color:var(--foreground)]/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-left group"
                      >
                         <div className="w-10 h-10 rounded-full bg-[color:var(--foreground)]/5 flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:text-indigo-500 text-[color:var(--foreground)] transition-colors">
                           <Icon className="w-5 h-5" />
                         </div>
                         <div>
                            <div className="font-medium text-[color:var(--foreground)] text-base">{gw.name}</div>
                            <div className="text-xs text-[color:var(--foreground)] opacity-50">{gw.desc}</div>
                         </div>
                         <ArrowRight className="w-4 h-4 ml-auto text-[color:var(--foreground)] opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="pt-4 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-[color:var(--foreground)]/5 flex items-center justify-center mb-4 border border-[color:var(--foreground)]/10">
                    <CreditCard className="w-8 h-8 text-[color:var(--foreground)]" />
                 </div>
                 <h3 className="text-2xl font-serif mb-2 text-[color:var(--foreground)]">Connecting to Provider</h3>
                 <p className="text-sm font-sans mb-6 text-[color:var(--foreground)] opacity-60">
                   You selected <strong>{gateways.find(g => g.id === provider)?.name}</strong> for your payment.
                 </p>
                 
                 {(provider === "zaincash" || provider === "asiacell") && (
                   <input 
                     type="tel"
                     placeholder="Enter Phone Number"
                     value={phoneNumber}
                     onChange={e => setPhoneNumber(e.target.value)}
                     className="w-full p-3 mb-6 rounded-lg bg-[color:var(--foreground)]/5 border border-[color:var(--foreground)]/20 text-[color:var(--foreground)] outline-none focus:border-indigo-500 focus:bg-indigo-500/5 transition-all"
                   />
                 )}

                 <div className="flex gap-3 w-full">
                    <button onClick={() => setStep(1)} className="flex-1 py-3 text-sm font-medium rounded-lg border border-[color:var(--foreground)]/20 hover:bg-[color:var(--foreground)]/5 text-[color:var(--foreground)] transition-all">
                      Back
                    </button>
                    <button onClick={handleSimulatePayment} disabled={loading} className="flex-1 py-3 text-sm font-medium rounded-lg bg-[color:var(--foreground)] text-[color:var(--background)] hover:scale-105 transition-all flex items-center justify-center gap-2">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simulate Payment"}
                    </button>
                 </div>
              </motion.div>
            )}

            {step === 3 && paymentResult && (
               <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="pt-4 flex flex-col items-center text-center">
                  <h3 className="text-2xl font-serif mb-2 text-[color:var(--foreground)]">Complete Your Payment</h3>
                  
                  {provider === 'fib' ? (
                     <div className="w-full flex flex-col items-center bg-[color:var(--foreground)]/5 p-6 rounded-2xl border border-[color:var(--foreground)]/10 my-4">
                        <p className="text-sm font-sans mb-4 text-[color:var(--foreground)] opacity-70">
                           Scan this QR code with your <strong>FIB Mobile App</strong>.
                        </p>
                        {/* Simulated QR Code Visual */}
                        <div className="w-48 h-48 bg-white rounded-xl p-2 flex items-center justify-center mb-4">
                           <div className="w-full h-full border-4 border-dashed border-black/20 flex flex-col items-center justify-center gap-2">
                             <ShieldCheck className="w-8 h-8 text-indigo-600" />
                             <span className="text-xs text-black/40 font-mono font-bold tracking-widest">{paymentResult.readableCode}</span>
                           </div>
                        </div>
                        <p className="text-xs text-[color:var(--foreground)] opacity-50 font-mono mb-4">
                           Or enter code manually: <strong className="text-[color:var(--foreground)] opacity-100">{paymentResult.readableCode}</strong>
                        </p>
                        <p className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded-full">
                           Expires: {new Date(paymentResult.validUntil).toLocaleTimeString()}
                        </p>
                     </div>
                  ) : provider === 'zaincash' || provider === 'asiacell' ? (
                     <div className="w-full flex flex-col items-center bg-[color:var(--foreground)]/5 p-6 rounded-2xl border border-[color:var(--foreground)]/10 my-4">
                        <Smartphone className="w-12 h-12 text-indigo-500 mb-4" />
                        <p className="text-sm font-sans mb-4 text-[color:var(--foreground)] opacity-80">
                           {paymentResult.message}
                        </p>
                        <input 
                           type="text"
                           placeholder="Enter 6-digit OTP"
                           className="w-full max-w-xs text-center tracking-widest text-2xl p-3 mb-4 rounded-lg bg-[color:var(--foreground)]/10 border border-[color:var(--foreground)]/20 text-[color:var(--foreground)] outline-none focus:border-indigo-500"
                        />
                     </div>
                  ) : (
                     <div className="w-full flex flex-col items-center bg-[color:var(--foreground)]/5 p-6 rounded-2xl border border-[color:var(--foreground)]/10 my-4">
                        <CreditCard className="w-12 h-12 text-emerald-500 mb-4" />
                        <p className="text-sm font-sans mb-4 text-[color:var(--foreground)] opacity-80">
                           Redirecting you directly to the secure payment gateway...
                        </p>
                        <div className="w-full text-left bg-black/50 p-4 rounded-xl border border-white/10 font-mono text-xs text-emerald-300 break-all mb-4">
                          {paymentResult.redirect_url}
                        </div>
                     </div>
                  )}

                  <button onClick={reset} className="w-full py-4 text-sm font-medium rounded-lg bg-[color:var(--foreground)] text-[color:var(--background)] hover:scale-105 transition-all mt-4">
                    {provider === 'fib' ? 'I Have Paid' : provider === 'zaincash' || provider === 'asiacell' ? 'Verify & Pay' : 'Continue to Gateway'}
                  </button>
               </motion.div>
            )}

          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
