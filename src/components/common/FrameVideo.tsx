"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
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
  /** Parent-controlled visibility — use when the video sits inside transformed/animated containers. */
  load?: boolean;
  /** Use an internal viewport observer when `load` is not provided. */
  lazy?: boolean;
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
  load,
  lazy = false,
}: FrameVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, inView } = useInView<HTMLDivElement>();
  const shouldLoad = load ?? (!lazy || inView);

  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!shouldLoad) {
      setVideoSrc(undefined);
      setIsLoading(false);
      setHasError(false);
      return;
    }

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
          setHasError(false);
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
  }, [shouldLoad, src, frameioFileId, fallbackSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (!autoPlay) {
      video.pause();
      return;
    }

    const tryPlay = () => {
      void video.play().catch(() => {
        // Autoplay can fail on mobile without user gesture.
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay();
      return;
    }

    video.addEventListener("canplay", tryPlay, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [autoPlay, videoSrc]);

  const handleVideoError = () => {
    if (videoSrc !== fallbackSrc) {
      setVideoSrc(fallbackSrc);
      setHasError(false);
      return;
    }

    setHasError(true);
  };

  return (
    <div ref={lazy && load === undefined ? containerRef : undefined} className={cn("relative h-full w-full bg-black", className)}>
      {!shouldLoad || isLoading ? (
        <div className="absolute inset-0 bg-white/5" aria-hidden="true" />
      ) : null}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-[10px] uppercase tracking-[0.2em] text-white/50">
          Video unavailable
        </div>
      ) : null}
      {shouldLoad && videoSrc ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoSrc}
          poster={poster}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload={preload}
          onError={handleVideoError}
        />
      ) : null}
    </div>
  );
}
