"use client";

import { useEffect, useState } from "react";

interface FloatingHeart {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // Generate hearts only on client to avoid hydration mismatch
  useEffect(() => {
    setHearts(
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 14 + Math.random() * 18,
        duration: 7 + Math.random() * 8,
        delay: Math.random() * 8,
        opacity: 0.1 + Math.random() * 0.12,
      }))
    );
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-0"
          style={{
            left: heart.left,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `float-up ${heart.duration}s ${heart.delay}s linear infinite`,
          }}
        >
          💗
        </span>
      ))}
    </div>
  );
}
