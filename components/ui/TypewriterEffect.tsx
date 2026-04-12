"use client";

import { useEffect, useState, memo } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
  cursorClassName?: string;
}

/**
 * Componente que simula un efecto de escritura (typewriter).
 * Refactorizado para mayor robustez y flexibilidad de estilos.
 */
const TypewriterEffect = ({
  words,
  typingSpeed = 120,
  deletingSpeed = 60,
  delayBetweenWords = 2500,
  className = "",
  cursorClassName = "",
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  return (
    <span className={`inline-block relative ${className}`}>
      <span className="relative z-10">{displayText}</span>
      {/* Cursor Animado con mayor detalle visual */}
      <span 
        className={`inline-block w-[0.08em] h-[0.9em] bg-current ml-1 translate-y-[0.1em] opacity-80 animate-pulse transition-all duration-300 ${cursorClassName}`} 
        aria-hidden="true"
      />
    </span>
  );
};

export default memo(TypewriterEffect);
