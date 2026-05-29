"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FrameVideoProps = {
  src?: string | null;
  frameioFileId?: string;
  fallbackSrc: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
};

export default function FrameVideo({
  src,
  frameioFileId,
  fallbackSrc,
  poster,
  className,
  autoPlay = false,
  muted = true,
  loop = true,
  playsInline = true,
  preload = "metadata",
}: FrameVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialSrc = src || fallbackSrc;
  const [videoSrc, setVideoSrc] = useState(initialSrc);
  const [isLoading, setIsLoading] = useState(Boolean(frameioFileId && !src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (src) {
      setVideoSrc(src);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    if (!frameioFileId) {
      setVideoSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    let cancelled = false;

    async function loadFrameioVideo() {
      setIsLoading(true);

      try {
        const response = await fetch(`/api/videos/${frameioFileId}`);
        const payload = (await response.json()) as { url?: string };

        if (!response.ok || !payload.url) {
          throw new Error("Frame.io video unavailable");
        }

        if (!cancelled) {
          setVideoSrc(payload.url);
          setHasError(false);
        }
      } catch {
        if (!cancelled) {
          setVideoSrc(fallbackSrc);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadFrameioVideo();

    return () => {
      cancelled = true;
    };
  }, [src, frameioFileId, fallbackSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!autoPlay) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      void video.play().catch(() => {
        setHasError(true);
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay();
      return;
    }

    video.addEventListener("canplay", tryPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, [autoPlay, videoSrc]);

  return (
    <div className={cn("relative h-full w-full bg-black", className)}>
      {isLoading ? (
        <div className="absolute inset-0 animate-pulse bg-white/5" aria-hidden="true" />
      ) : null}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/50">
          Video unavailable
        </div>
      ) : null}
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={videoSrc}
        poster={poster}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
