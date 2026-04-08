"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

export default function TypewriterEffect({
  words,
  typingSpeed = 120,
  deletingSpeed = 60,
  delayBetweenWords = 2500,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

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
    <span className="inline-block relative">
      <span className="relative z-10">{displayText}</span>
      {/* Animated Cursor */}
      <span className="animate-[pulse_1s_ease-in-out_infinite] w-[0.08em] h-[0.9em] bg-current inline-block align-baseline ml-1 translate-y-[0.1em] opacity-80" />
    </span>
  );
}
