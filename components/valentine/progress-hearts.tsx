"use client";

import { Heart } from "lucide-react";

interface ProgressHeartsProps {
  total: number;
  current: number;
}

export function ProgressHearts({ total, current }: ProgressHeartsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <Heart
          key={i}
          size={18}
          className={`transition-all duration-300 ${
            i < current
              ? "text-primary fill-primary scale-110"
              : "text-primary/30"
          }`}
        />
      ))}
    </div>
  );
}
