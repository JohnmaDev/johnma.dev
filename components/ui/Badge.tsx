import { cn } from "@/lib/utils";
import React from "react";

/**
 * Propiedades para el componente Badge.
 */
interface BadgeProps {
  /** Contenido del badge. */
  children: React.ReactNode;
  /** Variante visual del badge. */
  variant?: "default" | "muted" | "coming-soon";
  /** Clases CSS adicionales. */
  className?: string;
}

const variantStyles = {
  default:
    "bg-[var(--color-accent-dim)] text-[var(--color-accent)] border border-[var(--color-border)]",
  muted:
    "bg-transparent text-[var(--color-fg-subtle)] border border-[var(--color-border)]",
  "coming-soon":
    "bg-transparent text-[var(--color-fg-subtle)] border border-dashed border-[var(--color-border)]",
};

/**
 * Componente Badge para mostrar etiquetas cortas.
 */
export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "rounded-full px-2.5 py-0.5",
        "text-xs font-mono tracking-wide",
        "transition-colors duration-200",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
