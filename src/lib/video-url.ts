const DEFAULT_GITHUB_CDN =
  "https://media.githubusercontent.com/media/tbmstudioco/tbmstudio/main/public";

function getVideoBaseUrl() {
  const customBase = process.env.NEXT_PUBLIC_VIDEO_BASE_URL?.replace(/\/$/, "");
  if (customBase) return customBase;

  // Vercel deploys don't include Git LFS files — serve from GitHub media CDN instead.
  if (process.env.VERCEL === "1") return DEFAULT_GITHUB_CDN;

  return "";
}

/** Resolve a `/videos/...` path to a full URL in production when assets live in Git LFS. */
export function getPublicVideoUrl(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const base = getVideoBaseUrl();
  if (!base) return path;

  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
