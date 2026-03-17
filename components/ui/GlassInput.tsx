import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-2xl border bg-transparent px-4 py-2 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          /* Liquid Glass styling */
          "glass-panel border-white/10 hover:border-white/20 focus-visible:border-white/40 focus-visible:ring-white/20",
          error && "border-red-500/50 focus-visible:ring-red-500/20",
          className
        )}
        {...props}
      />
    );
  }
);

GlassInput.displayName = "GlassInput";

export { GlassInput };
