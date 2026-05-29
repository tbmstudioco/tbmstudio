const FRAMEIO_ORIGIN = "https://api.frame.io";
const FRAMEIO_API_BASE = `${FRAMEIO_ORIGIN}/v4`;

type MediaLink = {
  url?: string | null;
  download_url?: string | null;
  inline_url?: string | null;
};

type FrameioFileData = {
  id?: string;
  name?: string;
  media_type?: string;
  type?: string;
  media_links?: {
    high_quality?: MediaLink;
    efficient?: MediaLink;
    original?: MediaLink;
    thumbnail?: MediaLink;
  };
};

type FrameioFileResponse = {
  data?: FrameioFileData;
  errors?: Array<{ title?: string; detail?: string }>;
};

type FrameioFolderResponse = {
  data?: FrameioFileData[];
  links?: { next?: string | null };
  errors?: Array<{ title?: string; detail?: string }>;
};

export type FrameioAsset = {
  id: string;
  name: string;
  isVideo: boolean;
  streamUrl: string | null;
  thumbnailUrl: string | null;
};

function pickStreamUrl(mediaLinks?: FrameioFileData["media_links"]) {
  if (!mediaLinks) return null;

  return (
    mediaLinks.high_quality?.url ??
    mediaLinks.efficient?.url ??
    mediaLinks.original?.inline_url ??
    mediaLinks.original?.url ??
    mediaLinks.original?.download_url ??
    null
  );
}

function pickThumbnailUrl(mediaLinks?: FrameioFileData["media_links"]) {
  if (!mediaLinks?.thumbnail) return null;

  return mediaLinks.thumbnail.url ?? mediaLinks.thumbnail.download_url ?? null;
}

function getAuthHeaders() {
  const token = process.env.FRAMEIO_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Frame.io is not configured. Set FRAMEIO_ACCESS_TOKEN.");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };
}

function getAccountId() {
  const accountId = process.env.FRAMEIO_ACCOUNT_ID;

  if (!accountId) {
    throw new Error("Frame.io is not configured. Set FRAMEIO_ACCOUNT_ID.");
  }

  return accountId;
}

async function frameioRequest<T>(pathOrUrl: string): Promise<T> {
  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : pathOrUrl.startsWith("/v4")
      ? `${FRAMEIO_ORIGIN}${pathOrUrl}`
      : `${FRAMEIO_API_BASE}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;

  const response = await fetch(url, {
    headers: getAuthHeaders(),
    next: { revalidate: 300 },
  });

  const payload = (await response.json()) as T & {
    errors?: Array<{ title?: string; detail?: string }>;
  };

  if (!response.ok) {
    const detail = payload.errors?.[0]?.detail ?? payload.errors?.[0]?.title ?? response.statusText;
    throw new Error(`Frame.io request failed: ${detail}`);
  }

  return payload;
}

export function isFrameioConfigured() {
  return Boolean(process.env.FRAMEIO_ACCESS_TOKEN && process.env.FRAMEIO_ACCOUNT_ID);
}

export async function getFrameioStreamUrl(fileId: string) {
  const accountId = getAccountId();
  const path = `/accounts/${accountId}/files/${fileId}?include=media_links.high_quality,media_links.efficient,media_links.original`;
  const payload = await frameioRequest<FrameioFileResponse>(path);
  const streamUrl = pickStreamUrl(payload.data?.media_links);

  if (!streamUrl) {
    throw new Error("Frame.io file has no playable media link yet.");
  }

  return streamUrl;
}

export async function getFrameioAsset(fileId: string): Promise<FrameioAsset> {
  const accountId = getAccountId();
  const path = `/accounts/${accountId}/files/${fileId}?include=media_links.high_quality,media_links.efficient,media_links.original,media_links.thumbnail`;
  const payload = await frameioRequest<FrameioFileResponse>(path);
  const data = payload.data;

  if (!data?.id || !data.name) {
    throw new Error("Frame.io file response was incomplete.");
  }

  return {
    id: data.id,
    name: data.name,
    isVideo: Boolean(data.media_type?.startsWith("video/")),
    streamUrl: pickStreamUrl(data.media_links),
    thumbnailUrl: pickThumbnailUrl(data.media_links),
  };
}

export async function listFrameioFolderFiles(folderId: string): Promise<FrameioAsset[]> {
  const accountId = getAccountId();
  let nextPath: string | null = `/accounts/${accountId}/folders/${folderId}/children?page_size=50`;
  const fileIds: string[] = [];

  while (nextPath) {
    const currentPath = nextPath;
    const payload: FrameioFolderResponse = await frameioRequest<FrameioFolderResponse>(currentPath);

    for (const item of payload.data ?? []) {
      if (item.type === "file" && item.id) {
        fileIds.push(item.id);
      }
    }

    nextPath = payload.links?.next ?? null;
  }

  const assets = await Promise.all(
    fileIds.map(async (fileId) => {
      try {
        return await getFrameioAsset(fileId);
      } catch {
        return null;
      }
    })
  );

  return assets.filter((asset): asset is FrameioAsset => asset !== null);
}
