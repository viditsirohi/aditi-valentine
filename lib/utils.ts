import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const BASE = process.env.NODE_ENV === "production" ? "/aditi-valentine" : "";
export function asset(path: string) {
  return `${BASE}${path}`;
}
