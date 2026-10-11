export function safeCallback(url: string | null | undefined): string {
  if (!url || !url.startsWith("/") || url.startsWith("//")) return "/";
  return url;
}
