import { cn } from "@/lib/utils";
import React from "react";

/**
 * Propiedades para el componente SectionTitle.
 */
interface SectionTitleProps {
  /** Texto pequeño encima del título. */
  eyebrow?: string;
  /** Título principal de la sección. */
  title: string;
  /** Descripción detallada opcional. */
  description?: string;
  /** Alineación del contenido. */
  align?: "left" | "center";
  /** Clases CSS adicionales. */
  className?: string;
}

/**
 * Componente para mostrar títulos de sección con subtítulo y descripción.
 */
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
