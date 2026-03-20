import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "default" | "gold" | "dark";
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  variant = "default",
}: AnimatedCardProps) {
  const variants = {
    default: "bg-card border-l-4 border-l-secondary hover:border-l-primary",
    gold: "bg-secondary/10 border-l-4 border-l-secondary hover:bg-secondary/20",
    dark: "bg-foreground text-background border-l-4 border-l-secondary",
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        variants[variant],
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
