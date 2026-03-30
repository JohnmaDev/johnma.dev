"use client";

import Link from "next/link";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function HeroContent() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[var(--color-base)]">
      {/* Canvas Animated Background */}
      <AnimatedBackground />

      {/* Background: dot grid + radial glow (static beneath) */}
      <div className="absolute inset-0 dot-grid opacity-100 z-0" aria-hidden="true" />
      <div className="absolute inset-0 gradient-overlay z-0" aria-hidden="true" />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-base))",
        }}
        aria-hidden="true"
      />

      <div className="container-content relative z-10 py-24 lg:py-32 flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl flex flex-col gap-8 items-center">
          {/* Main headline - Ultra minimalist */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--color-fg)]">
            Johnma.
          </h1>

          {/* Minimal CTAs */}
          <div className="flex flex-wrap items-center gap-4 justify-center mt-8">
            <Link
              href="#projects"
              className={[
                "inline-flex items-center gap-2 h-10 px-5 rounded-full",
                "bg-[var(--color-fg)] text-[var(--color-base)]",
                "text-sm font-semibold",
                "hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200",
              ].join(" ")}
            >
              Proyectos
            </Link>
            <a
              href="https://github.com/JohnmaDev"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center gap-2 h-10 px-5 rounded-full",
                "border border-[var(--color-border)] text-[var(--color-fg-muted)] backdrop-blur-md",
                "text-sm font-medium",
                "hover:border-[var(--color-border-hover)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-hover)]",
                "hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
              ].join(" ")}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
