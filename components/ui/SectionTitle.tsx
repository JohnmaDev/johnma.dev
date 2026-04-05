import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "text-center items-center" : "text-left items-start",
        className
      )}
    >
      {eyebrow && (
        <span className="font-mono text-xs tracking-[0.18em] uppercase text-[var(--color-fg-subtle)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--color-fg)]">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base text-[var(--color-fg-muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
