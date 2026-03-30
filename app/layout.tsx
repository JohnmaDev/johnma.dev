import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "John Ma — Desenlace de Código",
    template: "%s | John Ma",
  },
  description:
    "Desarrollador enfocado en el aprendizaje continuo y la exploración tecnológica. Construyendo sistemas por curiosidad y pasión.",
  metadataBase: new URL("https://johnma.dev"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://johnma.dev",
    siteName: "John Ma",
    title: "John Ma — Explorador de Código",
    description:
      "Aprendiz de por vida. Construyendo software por pura pasión y curiosidad.",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Ma — Explorador de Código",
    description: "Aprendiz de por vida. Construyendo software por pura pasión y curiosidad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-base)] text-[var(--color-fg)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
