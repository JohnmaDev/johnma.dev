import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "muted" | "coming-soon";
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

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "rounded-full px-2.5 py-0.5",
        "text-xs font-mono tracking-wide",
        "transition-colors duration-200",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
