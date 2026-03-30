import { cn } from "@/lib/utils";
import React from "react";

type ButtonVariant = "primary" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-fg)] text-[var(--color-base)] hover:bg-white hover:opacity-90 font-medium",
  ghost:
    "border border-[var(--color-border)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)]",
  link: "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] underline-offset-4 hover:underline p-0 h-auto",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-sm rounded-full",
  md: "h-10 px-6 text-sm rounded-full",
  lg: "h-12 px-8 text-base rounded-full",
};

export default function Button({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-[var(--font-geist-sans)]",
        "transition-all duration-200 ease-in-out",
        "select-none cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2",
        "disabled:opacity-40 disabled:pointer-events-none",
        variantStyles[variant],
        variant !== "link" && sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
