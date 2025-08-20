// src/utils/buildImageUrl.ts
export function buildImageUrl(imagePath?: string | null): string | null {
  if (!imagePath) return null;

  // Ako je već full URL, vrati ga (normalize)
  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  // Normalize backslashes -> forward slashes (windows paths)
  let normalized = imagePath.replace(/\\/g, "/");

  // Ensure leading slash
  if (!normalized.startsWith("/")) normalized = "/" + normalized;

  // Encode URI parts (ne diramo `://` zato koristimo split i encode komponenti)
  // But here we just encode path part to handle spaces and special chars
  const parts = normalized.split("/").map((p) => encodeURIComponent(p));
  // parts[0] će biti '' za početni '/'
  const encodedPath = parts.join("/").replace(/%2F/g, "/");

  const base = (import.meta.env.VITE_API_URL ?? "").toString().replace(/\/+$/, "");
  if (!base) {
    // ako nema base, vrati relativni put (browser će pokušati da ga učita relativno)
    return encodedPath;
  }

  return `${base}${encodedPath}`;
}
