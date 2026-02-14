"use client";

import { ImageIcon, VideoIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPlaceholderProps {
  type?: "photo" | "video";
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-28 h-28",
  md: "w-44 h-44",
  lg: "w-64 h-52",
};

const iconSizes = {
  sm: 20,
  md: 28,
  lg: 36,
};

export function MediaPlaceholder({
  type = "photo",
  size = "md",
  label,
  className,
}: MediaPlaceholderProps) {
  const Icon = type === "video" ? VideoIcon : ImageIcon;
  const defaultLabel = type === "video" ? "Our video here" : "Our photo here";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 bg-secondary/40",
        sizeClasses[size],
        className
      )}
    >
      <Icon
        size={iconSizes[size]}
        className="text-primary/40"
        strokeWidth={1.5}
      />
      <p className="text-xs text-muted-foreground px-2 text-center">
        {label ?? defaultLabel}
      </p>
    </div>
  );
}
