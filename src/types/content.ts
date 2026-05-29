export type SiteVideo = {
  id: number;
  title?: string;
  frameioFileId?: string;
  fallbackSrc: string;
  resolvedSrc?: string | null;
};

export type PortfolioGridItem = {
  id: number;
  title: string;
  category: string;
  isVideo: boolean;
  image: string;
  videoSrc?: string;
  posterSrc?: string;
  frameioFileId?: string;
  gridClass: string;
  accentFrom: string;
  accentTo: string;
};
