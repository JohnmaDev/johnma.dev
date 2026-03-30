import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={[
        "rounded-3xl border border-[var(--color-border)] backdrop-blur-xl",
        "bg-[var(--color-surface)]",
        "p-6 sm:p-8",
        "transition-all duration-300 ease-in-out",
        hover
          ? "hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
