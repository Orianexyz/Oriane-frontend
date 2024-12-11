import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return date;
}

export function genHash(n: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < n; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function normalizeUrl(baseUrl: string, endsWithSlash = true): string {
  if (baseUrl.startsWith("/") && baseUrl.length > 1) {
    baseUrl = baseUrl.substring(1);
  }
  let normalizedUrl = baseUrl.replace(/([^:]\/)\/+/g, "$1");
  if (endsWithSlash && !normalizedUrl.endsWith("/")) {
    normalizedUrl += "/";
  }
  return normalizedUrl;
}
