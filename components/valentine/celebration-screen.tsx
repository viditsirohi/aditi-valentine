"use client";

import { useEffect } from "react";
import { fireValentineConfetti } from "@/lib/confetti";
import { asset } from "@/lib/utils";

export function CelebrationScreen() {
  useEffect(() => {
    fireValentineConfetti();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center px-4 pb-12">
      {/* Hero */}
      <div
        className="text-7xl md:text-8xl"
        style={{ animation: "heartbeat 1s ease-in-out infinite" }}
      >
        🎉
      </div>

      <div className="space-y-3">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary"
          style={{ fontFamily: "var(--font-dancing), cursive" }}
        >
          Yay! You said YES!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          You&apos;ve made me the happiest person in the world! 🥰
        </p>
      </div>

      {/* Gallery — video is the main attraction, images surround it */}
      <div className="w-full max-w-lg space-y-4">
        {/* Hero video — front and center */}
        <video
          src={asset("/vid2.mp4")}
          className="w-full rounded-2xl border-2 border-primary/30 shadow-xl mx-auto"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Images surrounding the video */}
        {/* eslint-disable @next/next/no-img-element */}
        <div className="flex gap-3 justify-center">
          <img
            src={asset("/image4.jpeg")}
            alt="Mountain top 💕"
            className="max-h-44 rounded-xl border-2 border-primary/20 shadow-md"
          />
          <img
            src={asset("/image5.jpeg")}
            alt="Snow selfie 💕"
            className="max-h-44 rounded-xl border-2 border-primary/20 shadow-md"
          />
        </div>

        <div className="flex justify-center">
          <img
            src={asset("/image6.jpeg")}
            alt="Hiking together 💕"
            className="max-h-44 rounded-xl border-2 border-primary/20 shadow-md"
          />
        </div>
        {/* eslint-enable @next/next/no-img-element */}
      </div>

      {/* Final message */}
      <div className="space-y-2 mt-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-primary"
          style={{ fontFamily: "var(--font-dancing), cursive" }}
        >
          Happy Valentine&apos;s Day!
        </h2>
        <p className="text-xl text-foreground font-semibold">
          I love you, Aditi! ❤️
        </p>
      </div>
    </div>
  );
}
