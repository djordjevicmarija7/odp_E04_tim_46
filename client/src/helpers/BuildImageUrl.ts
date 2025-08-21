export function buildImageUrl(imagePath?: string | null): string | null {
  if (!imagePath) return null;

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }


  let normalized = imagePath.replace(/\\/g, "/");

 
  if (!normalized.startsWith("/")) normalized = "/" + normalized;


  const parts = normalized.split("/").map((p) => encodeURIComponent(p));
 
  const encodedPath = parts.join("/").replace(/%2F/g, "/");

  const base = (import.meta.env.VITE_API_URL ?? "").toString().replace(/\/+$/, "");
  if (!base) {
    
    return encodedPath;
  }

  return `${base}${encodedPath}`;
}
