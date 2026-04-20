"use client";

import Link from "next/link";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import TypewriterEffect from "@/components/ui/TypewriterEffect";

export default function HeroContent() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[var(--color-base)]">
      {/* Canvas Animated Background (Cosmos: Zoom Infinito) */}
      <AnimatedBackground />

      {/* Decorative overlays */}
      <div className="absolute inset-0 dot-grid opacity-20 z-0 pointer-events-none mix-blend-screen" aria-hidden="true" />
      <div className="absolute inset-0 gradient-overlay z-0 pointer-events-none" aria-hidden="true" />

      {/* Bottom fade for smooth section transition, very subtle */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-0"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-base))",
        }}
        aria-hidden="true"
      />

      <div className="container-content relative z-10 flex flex-col items-center justify-center text-center">
        {/* Main profile identity - Abstraction pure */}
        <div className="flex flex-col gap-10 items-center animate-fade-in [animation-duration:2000ms]">
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter text-[var(--color-fg)] opacity-90 blur-[0.3px] min-h-[1.2em]">
            <TypewriterEffect 
              words={["Johnma.", "Fullstack.", "React.", "Next.js.", "Performance."]} 
              typingSpeed={100}
              deletingSpeed={50}
              delayBetweenWords={2500}
            />
          </h1>

          {/* Minimalist CTAs */}
          <div className="flex flex-wrap items-center gap-6 justify-center mt-2 opacity-80 hover:opacity-100 transition-opacity duration-500">
            <Link
              href="#projects"
              className={[
                "inline-flex items-center gap-2 h-10 px-6 rounded-full",
                "bg-white/10 text-white border border-white/20 backdrop-blur-md",
                "text-xs uppercase tracking-widest font-semibold",
                "hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
              ].join(" ")}
            >
              Ver Repositorios
            </Link>
            <a
              href="https://github.com/JohnmaDev"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center gap-2 h-10 px-6 rounded-full",
                "bg-transparent text-[var(--color-fg-muted)] border border-[var(--color-border)] backdrop-blur-md",
                "text-xs uppercase tracking-widest font-medium",
                "hover:border-white/30 hover:text-white hover:bg-white/5",
                "hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
              ].join(" ")}
            >
              Ver GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

