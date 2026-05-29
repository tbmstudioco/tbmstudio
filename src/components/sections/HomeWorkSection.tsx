"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import FrameVideo from "@/components/common/FrameVideo";
import type { SiteVideo } from "@/types/content";

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function getCircularOffset(index: number, active: number, length: number) {
  let offset = index - active;

  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;

  return offset;
}

const AUTO_SLIDE_MS = 9000;

const carouselEase = [0.16, 1, 0.3, 1] as const;

const carouselTransition = {
  type: "tween" as const,
  duration: 0.9,
  ease: carouselEase,
};

function useCarouselOffset() {
  const [offsetStep, setOffsetStep] = useState(230);

  useEffect(() => {
    const update = () => {
      setOffsetStep(window.innerWidth < 640 ? 168 : window.innerWidth < 768 ? 200 : 230);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return offsetStep;
}

function ShortFormCarousel({ videos }: { videos: SiteVideo[] }) {
  const prefersReducedMotion = useReducedMotion();
  const offsetStep = useCarouselOffset();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, videos.length));
  };

  const prev = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, videos.length));
  };

  useEffect(() => {
    if (prefersReducedMotion || isHovered || videos.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => wrapIndex(prev + 1, videos.length));
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, isHovered, videos.length]);

  if (!videos.length) {
    return null;
  }

  return (
    <div
      className="relative mx-auto h-[min(72vh,560px)] min-h-[480px] max-w-6xl sm:h-[600px] md:h-[620px] [perspective:1400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {videos.map((item, index) => {
        const offset = getCircularOffset(index, activeIndex, videos.length);
        const isCenter = offset === 0;
        const absOffset = Math.abs(offset);

        if (absOffset > 2) {
          return null;
        }

        return (
          <motion.div
            key={item.id}
            initial={false}
            animate={{
              x: offset * (prefersReducedMotion ? offsetStep * 0.85 : offsetStep),
              y: isCenter ? -8 : absOffset * 6,
              scale: isCenter ? 1 : 0.84 - absOffset * 0.04,
              rotateY: prefersReducedMotion ? 0 : offset * -16,
              opacity: isCenter ? 1 : absOffset > 1 ? 0.28 : 0.52,
              zIndex: 10 - absOffset,
            }}
            transition={carouselTransition}
            className="absolute left-1/2 top-1/2 w-[min(68vw,240px)] sm:w-[260px] md:w-[300px] aspect-[9/16] -translate-x-1/2 -translate-y-1/2 will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              animate={{
                boxShadow: isCenter
                  ? "0 36px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255,255,255,0.12)"
                  : "0 18px 36px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
              transition={carouselTransition}
              className="relative h-full overflow-hidden rounded-[14px] border-2 border-white/90 bg-black"
            >
              <motion.div
                animate={{ scale: isCenter ? 1 : 1.06 }}
                transition={carouselTransition}
                className="h-full w-full"
              >
                <FrameVideo
                  src={item.resolvedSrc ?? item.fallbackSrc}
                  frameioFileId={item.frameioFileId}
                  fallbackSrc={item.fallbackSrc}
                  autoPlay={isCenter}
                  muted
                  loop
                  playsInline
                  preload={isCenter || absOffset === 1 ? "auto" : "metadata"}
                />
              </motion.div>

              <motion.div
                animate={{ opacity: isCenter ? 0 : 0.35 }}
                transition={{ duration: 0.5, ease: carouselEase }}
                className="pointer-events-none absolute inset-0 bg-black"
              />
            </motion.div>
          </motion.div>
        );
      })}

      {videos.length > 1 ? (
        <>
          <motion.button
            type="button"
            onClick={prev}
            aria-label="Show previous short-form video"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff6f2c] text-base text-white shadow-lg sm:left-4 sm:h-11 sm:w-11 sm:text-lg md:left-1/2 md:-translate-x-[260px]"
          >
            &#8592;
          </motion.button>

          <motion.button
            type="button"
            onClick={next}
            aria-label="Show next short-form video"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff6f2c] text-base text-white shadow-lg sm:right-4 sm:h-11 sm:w-11 sm:text-lg md:right-auto md:left-1/2 md:translate-x-[220px]"
          >
            &#8594;
          </motion.button>

          <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
            {videos.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to video ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className="group p-1"
                >
                  <motion.span
                    animate={{
                      width: isActive ? 28 : 8,
                      opacity: isActive ? 1 : 0.35,
                    }}
                    transition={carouselTransition}
                    className="block h-2 rounded-full bg-white"
                  />
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

type HomeWorkSectionProps = {
  shortFormVideos: SiteVideo[];
};

export default function HomeWorkSection({ shortFormVideos }: HomeWorkSectionProps) {
  return (
    <section id="work" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 section-surface">
      <div className="relative z-10 mx-auto max-w-7xl">
        <FadeIn className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="text-center md:text-left">
            <p className="section-eyebrow mb-4 tracking-[0.35em] text-white/45">
              Our Work
            </p>
            <h2 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Creative
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 self-center text-[10px] font-medium uppercase tracking-[0.25em] text-white/60 transition-colors hover:text-white md:self-auto"
          >
            View full portfolio
            <ArrowUpRight size={14} />
          </Link>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ShortFormCarousel videos={shortFormVideos} />
        </FadeIn>
      </div>
    </section>
  );
}
