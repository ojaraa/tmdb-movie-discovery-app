import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export const fallbackBgImage = "/assets/bg.jpg";
export   const fallbackPoster = "/assets/poster.png"