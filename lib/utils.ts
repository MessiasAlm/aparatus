import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneForWhatsapp(phone: string): string {
  const numbersOnly = phone.replace(/\D/g, "");

  if (!numbersOnly.startsWith("55")) {
    return "55" + numbersOnly;
  }

  return numbersOnly;
}

export function formatSearchForText(search: string) {
  if (!search) return "";
  try {
    return decodeURIComponent(search).replace(/\0/g, "");
  } catch {
    // Fallback para o comportamento antigo
    return search.replace(/%20/g, " ").replace(/\0/g, "");
  }
}
