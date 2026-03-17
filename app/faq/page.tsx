import { GlassCard } from "@/components/ui/GlassCard";
import { Link } from "lucide-react";
import NextLink from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "What materials are your hijabs made from?",
      a: "Our Premium Liquid Silk Collection is constructed from highly refractive, breathable silk blends to offer maximum elegance. Our Modal lines are engineered with a jersey-modal blend for supreme form retention and opacity. All materials undergo rigorous quality checks."
    },
    {
      q: "How long does shipping take within Iraq?",
      a: "Standard shipping across Iraq generally takes 1-3 business days. Deliveries to Baghdad are typically fulfilled within 24 hours. We provide tracking links for all dispatched parcels."
    },
    {
      q: "Do you offer international shipping?",
      a: "Currently, Hijab Essence is focused on the Iraqi market with localized payment gateways (FIB, ZainCash, FastPay). We are actively exploring international fulfillment options for the future."
    },
    {
      q: "What is your return/exchange policy?",
      a: "Because hygeine is our top priority, we cannot accept returns on worn hijabs. However, if there is a manufacturing defect, please contact us within 3 days of receiving your order with photos, and we will issue a replacement immediately."
    },
    {
      q: "How do I care for my Liquid Silk hijab?",
      a: "We highly recommend gentle hand-washing in cold water with a mild silk-friendly detergent. Avoid twisting or wringing. Lay flat to dry out of direct sunlight to maintain the stunning liquid refraction."
    }
  ];

  return (
    <main className="min-h-screen bg-[color:var(--background)] pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <NextLink href="/" className="inline-block mb-8 text-[color:var(--foreground)] opacity-60 hover:opacity-100 transition-opacity">
          &larr; Back to Home
        </NextLink>
        
        <h1 className="text-4xl md:text-6xl font-serif text-[color:var(--foreground)] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg md:text-xl font-sans text-[color:var(--foreground)] opacity-70 mb-12">
          Everything you need to know about our products, shipping, and policies.
        </p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <GlassCard key={index} className="p-6 md:p-8" variant="dark">
              <h3 className="text-xl md:text-2xl font-serif text-[color:var(--foreground)] mb-3">
                {faq.q}
              </h3>
              <p className="text-base font-sans leading-relaxed text-[color:var(--foreground)] opacity-70">
                {faq.a}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </main>
  );
}
