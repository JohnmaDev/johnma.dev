import Link from "next/link";

const footerLinks = [
  { href: "https://github.com/JohnmaDev", label: "GitHub", external: true },
  { href: "#projects", label: "Proyectos", external: false },
  { href: "#trajectory", label: "Trayectoria", external: false },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] mt-32">
      <div className="container-content py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1.5">
            <span className="font-mono text-sm font-bold text-[var(--color-fg)]">
              Johnma.
            </span>
            <p className="text-xs text-[var(--color-fg-subtle)] max-w-[240px] text-center sm:text-left leading-relaxed">
              Exploración, aprendizaje y arquitectura de sistemas.
            </p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-5" aria-label="Footer navigation">
            {footerLinks.map(({ href, label, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] transition-colors duration-150"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-[var(--color-fg-subtle)] hover:text-[var(--color-fg-muted)] transition-colors duration-150"
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-center">
          <p className="text-xs text-[var(--color-fg-subtle)] font-mono">
            © {year} John Ma. Construido con Next.js + Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
}
