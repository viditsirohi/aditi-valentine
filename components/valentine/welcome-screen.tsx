"use client";

import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center px-4">
      {/* Pulsing heart */}
      <div
        className="text-7xl md:text-8xl"
        style={{ animation: "heartbeat 1.2s ease-in-out infinite" }}
      >
        💝
      </div>

      {/* Heading */}
      <div className="space-y-3">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
          style={{ fontFamily: "var(--font-dancing), cursive" }}
        >
          Hey Aditi!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md">
          I have a few very important questions for you...
        </p>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/aditi-valentine/image1.jpeg"
        alt="Us 💕"
        className="max-w-64 max-h-80 rounded-2xl border-2 border-primary/20 shadow-lg"
      />

      {/* Start button */}
      <Button
        size="lg"
        onClick={onStart}
        className="text-lg px-8 py-6 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-105"
        style={{ animation: "gentle-bounce 2s ease-in-out infinite" }}
      >
        Let&apos;s Go! 💕
      </Button>
    </div>
  );
}
