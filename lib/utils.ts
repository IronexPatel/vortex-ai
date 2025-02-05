import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Code copied to clipboard!");
    },
    (err) => {
      console.error("Error copying text: ", err);
    }
  );
};
