
import * as React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-surface-dark border border-white/5 shadow-xl",
      glass: "bg-surface-dark/60 backdrop-blur-md border border-white/10 shadow-glass",
      outline: "bg-transparent border border-white/10",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-2xl p-6", variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
