"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#projects", label: "Proyectos" },
  { href: "#trajectory", label: "Trayectoria" },
  { href: "#blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 ease-in-out",
        scrolled
          ? "border-b border-[var(--color-border)] backdrop-blur-xl bg-black/50"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-content">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center group focus-visible:outline-none"
            aria-label="John Ma — inicio"
          >
            <span className="font-mono text-lg font-bold text-[var(--color-fg)] tracking-tighter">
              Johnma<span className="text-[var(--color-fg-muted)]">.</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "px-3 py-1.5 rounded-md text-sm",
                  "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                  "hover:bg-[var(--color-surface-hover)]",
                  "transition-all duration-150",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/JohnmaDev"
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md",
                "text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                "border border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
                "hover:bg-[var(--color-surface-hover)]",
                "transition-all duration-150",
              ].join(" ")}
              aria-label="GitHub profile"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            className={[
              "md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-md",
              "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
              "border border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
              "transition-all duration-200",
            ].join(" ")}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Menú de navegación"
          >
            <span
              className={`block w-4 h-px bg-current transition-all duration-200 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-4 h-px bg-current transition-all duration-200 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] backdrop-blur-xl bg-black/80 flex flex-col gap-1 p-4 pb-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "px-4 py-3 rounded-xl text-base font-medium",
                  "text-[var(--color-fg)] text-center w-full",
                  "active:bg-[var(--color-surface-hover)] transition-colors duration-150",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
            <a
              href="https://github.com/JohnmaDev"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className={[
                "mt-2 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-medium",
                "text-[var(--color-base)] bg-[var(--color-fg)]",
                "active:opacity-80 transition-opacity duration-150",
              ].join(" ")}
            >
              <GithubIcon />
              GitHub
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function GithubIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.491.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.165 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}
