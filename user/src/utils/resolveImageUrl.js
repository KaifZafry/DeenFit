import { BASE_IMG_URL } from "./Constants";

export function resolveImageUrl(value) {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || /^data:/i.test(trimmed)) return trimmed;
  return `${BASE_IMG_URL}${trimmed}`;
}

