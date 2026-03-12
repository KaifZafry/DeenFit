export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:7000";

export function apiUrl(path) {
  if (!path) return API_BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = String(path).startsWith("/") ? String(path) : `/${path}`;
  return `${API_BASE_URL}${normalized}`;
}

export function apiFetch(path, options) {
  return fetch(apiUrl(path), options);
}

