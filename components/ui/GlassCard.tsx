import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "luminous" | "dark";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-panel p-6 transition-all duration-300",
          variant === "luminous" && "bg-white/10 border-white/20 shadow-[0_0_24px_rgba(255,255,255,0.15)]",
          variant === "dark" && "bg-black/20 border-white/5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
