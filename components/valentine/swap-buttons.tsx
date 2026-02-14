"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface SwapButtonsProps {
  onYes: () => void;
  isValentine?: boolean;
}

export function SwapButtons({ onYes, isValentine }: SwapButtonsProps) {
  // false = normal (left=Yes, right=No), true = swapped (left=No, right=Yes)
  const [swapped, setSwapped] = useState(false);

  const yesLabel = "Yes 💕";
  const noLabel = "No 💔";

  const leftIsYes = !swapped;

  const handleLeftEnter = () => {
    if (!leftIsYes) {
      // Left is currently "No" — swap
      setSwapped(false);
    }
  };

  const handleRightEnter = () => {
    if (leftIsYes) {
      // Right is currently "No" — swap
      setSwapped(true);
    }
  };

  const handleLeftClick = () => {
    if (leftIsYes) onYes();
    // If left is No, do nothing (shouldn't happen since it swaps on hover)
  };

  const handleRightClick = () => {
    if (!leftIsYes) onYes();
    // If right is No, do nothing
  };

  const yesClasses = `text-base font-semibold rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all hover:scale-105 ${
    isValentine ? "px-10 py-6 text-lg" : "px-8"
  }`;

  const noClasses =
    "text-base font-semibold border-2 border-primary/30 hover:border-primary/50 select-none cursor-pointer transition-all";

  return (
    <div className="flex items-center gap-4">
      <Button
        size="lg"
        variant={leftIsYes ? "default" : "outline"}
        className={leftIsYes ? yesClasses : noClasses}
        onMouseEnter={handleLeftEnter}
        onClick={handleLeftClick}
      >
        {leftIsYes ? yesLabel : noLabel}
      </Button>

      <Button
        size="lg"
        variant={!leftIsYes ? "default" : "outline"}
        className={!leftIsYes ? yesClasses : noClasses}
        onMouseEnter={handleRightEnter}
        onClick={handleRightClick}
      >
        {leftIsYes ? noLabel : yesLabel}
      </Button>
    </div>
  );
}
