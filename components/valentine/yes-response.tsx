"use client";

import { useEffect } from "react";
import { fireSmallHeartBurst } from "@/lib/confetti";

interface YesResponseProps {
  message: string;
  onDone: () => void;
}

export function YesResponse({ message, onDone }: YesResponseProps) {
  useEffect(() => {
    fireSmallHeartBurst();
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="text-5xl" style={{ animation: "heartbeat 1s ease-in-out infinite" }}>
        💖
      </div>
      <p className="text-xl font-semibold text-primary text-center max-w-sm">
        {message}
      </p>
    </div>
  );
}
