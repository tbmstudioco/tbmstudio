import {
  featuredReelVideo,
  shortFormVideos as fallbackShortFormVideos,
} from "@/data/videos";
import { portfolioGridItems as fallbackPortfolioItems } from "@/data/portfolio";
import {
  getFrameioAsset,
  isFrameioConfigured,
  listFrameioFolderFiles,
} from "@/lib/frameio";
import type { PortfolioGridItem, SiteVideo } from "@/types/content";

function prefersLocalVideos() {
  if (process.env.VIDEO_SOURCE === "frameio") {
    return false;
  }

  if (process.env.VIDEO_SOURCE === "local") {
    return true;
  }

  return !isFrameioConfigured();
}

const GRID_PATTERNS = [
  "col-span-2 row-span-6 sm:col-span-2 sm:row-span-6",
  "col-span-2 row-span-3 sm:col-span-2 sm:row-span-3",
  "col-span-2 row-span-3 sm:col-span-2 sm:row-span-3",
  "col-span-2 row-span-3 sm:col-span-2 sm:row-span-3",
  "col-span-2 row-span-6 sm:col-span-2 sm:row-span-6",
  "col-span-2 row-span-3 sm:col-span-2 sm:row-span-3",
  "col-span-2 row-span-4 sm:col-span-2 sm:row-span-4",
  "col-span-2 row-span-3 sm:col-span-2 sm:row-span-3",
];

const ACCENT_PALETTES = [
  { accentFrom: "#c2410c", accentTo: "#7c2d12" },
  { accentFrom: "#92400e", accentTo: "#451a03" },
  { accentFrom: "#1e3a8a", accentTo: "#172554" },
  { accentFrom: "#0f766e", accentTo: "#134e4a" },
  { accentFrom: "#166534", accentTo: "#14532d" },
  { accentFrom: "#713f12", accentTo: "#422006" },
  { accentFrom: "#312e81", accentTo: "#1e1b4b" },
  { accentFrom: "#374151", accentTo: "#111827" },
];

function cleanTitle(name: string) {
  return name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
}

function toSiteVideo(asset: Awaited<ReturnType<typeof getFrameioAsset>>, index: number): SiteVideo {
  const fallback = fallbackShortFormVideos[index % fallbackShortFormVideos.length];

  return {
    id: index + 1,
    title: cleanTitle(asset.name),
    frameioFileId: asset.id,
    fallbackSrc: fallback.fallbackSrc,
    resolvedSrc: asset.streamUrl,
  };
}

function toPortfolioItem(asset: Awaited<ReturnType<typeof getFrameioAsset>>, index: number): PortfolioGridItem {
  const fallback = fallbackPortfolioItems[index % fallbackPortfolioItems.length];
  const palette = ACCENT_PALETTES[index % ACCENT_PALETTES.length];

  return {
    id: index + 1,
    title: cleanTitle(asset.name),
    category: asset.isVideo ? "Video" : "Creative",
    isVideo: asset.isVideo,
    image: asset.thumbnailUrl ?? fallback.image,
    videoSrc: asset.isVideo ? asset.streamUrl ?? undefined : undefined,
    posterSrc: asset.thumbnailUrl ?? fallback.posterSrc,
    frameioFileId: asset.id,
    gridClass: GRID_PATTERNS[index % GRID_PATTERNS.length],
    accentFrom: palette.accentFrom,
    accentTo: palette.accentTo,
  };
}

export async function getFeaturedReelVideo(): Promise<SiteVideo> {
  if (prefersLocalVideos()) {
    return featuredReelVideo;
  }

  const featuredFileId = process.env.FRAMEIO_FEATURED_REEL_FILE_ID;

  if (!featuredFileId) {
    return featuredReelVideo;
  }

  try {
    const asset = await getFrameioAsset(featuredFileId);

    return {
      id: 1,
      title: cleanTitle(asset.name),
      frameioFileId: asset.id,
      fallbackSrc: featuredReelVideo.fallbackSrc,
      resolvedSrc: asset.streamUrl,
    };
  } catch {
    return featuredReelVideo;
  }
}

export async function getShortFormVideos(): Promise<SiteVideo[]> {
  if (prefersLocalVideos()) {
    return fallbackShortFormVideos;
  }

  const folderId = process.env.FRAMEIO_SHORT_FORM_FOLDER_ID;

  if (!folderId) {
    return fallbackShortFormVideos;
  }

  try {
    const assets = await listFrameioFolderFiles(folderId);
    const videos = assets.filter((asset) => asset.isVideo && asset.streamUrl);

    if (!videos.length) {
      return fallbackShortFormVideos;
    }

    return videos.map(toSiteVideo);
  } catch {
    return fallbackShortFormVideos;
  }
}

export async function getPortfolioItems(): Promise<PortfolioGridItem[]> {
  if (prefersLocalVideos()) {
    return fallbackPortfolioItems;
  }

  const folderId = process.env.FRAMEIO_PORTFOLIO_FOLDER_ID;

  if (!folderId) {
    return fallbackPortfolioItems;
  }

  try {
    const assets = await listFrameioFolderFiles(folderId);

    if (!assets.length) {
      return fallbackPortfolioItems;
    }

    return assets.map(toPortfolioItem);
  } catch {
    return fallbackPortfolioItems;
  }
}

export async function getHomeContent() {
  const [featuredReel, shortFormVideos] = await Promise.all([
    getFeaturedReelVideo(),
    getShortFormVideos(),
  ]);

  return { featuredReel, shortFormVideos };
}
