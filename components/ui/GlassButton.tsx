import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          /* Liquid Glass Base */
          "glass-panel hover:bg-white/10 hover:shadow-lg active:scale-95",
          /* Variants */
          variant === "primary" && "bg-white/15 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]",
          variant === "ghost" && "border-transparent bg-transparent shadow-none hover:glass-panel hover:bg-white/5",
          /* Sizes */
          size === "sm" && "h-9 px-4 rounded-2xl",
          size === "md" && "h-11 px-6 rounded-3xl",
          size === "lg" && "h-14 px-8 rounded-full text-base",
          size === "icon" && "h-12 w-12 rounded-full",
          className
        )}
        {...props}
      />
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
