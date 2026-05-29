"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import FrameVideo from "@/components/common/FrameVideo";
import type { SiteVideo } from "@/types/content";

type ServicesSectionProps = {
  featuredReel: SiteVideo;
};

export default function ServicesSection({ featuredReel }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55, 1], [0.82, 1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], [120, -80]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.4, 1, 1, 0.9]);

  return (
    <section
      ref={sectionRef}
      id="show-reel"
      className="relative py-40 px-6 section-surface overflow-hidden [perspective:1300px]"
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-24">
          <div className="max-w-3xl">
            <span className="section-eyebrow text-white/40 mb-6 block">
              Featured Reel
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white mb-8">
              See your brand in motion as the screen <span className="text-white/50 font-light italic">moves toward you</span>.
            </h2>
            <p className="text-base text-white/50 font-light leading-relaxed">
              Scroll down to trigger a depth effect that brings the video panel closer and makes the showcase feel immersive.
            </p>
          </div>
        </FadeIn>

        <motion.div
          style={{ scale, y, rotateX, opacity }}
          className="origin-center will-change-transform"
        >
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-tbm-violet/20 bg-white/[0.03] card-glow-warm">
            <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/60 pointer-events-none" />

            <FrameVideo
              src={featuredReel.resolvedSrc ?? featuredReel.fallbackSrc}
              frameioFileId={featuredReel.frameioFileId}
              fallbackSrc={featuredReel.fallbackSrc}
              className="w-full h-[48vh] md:h-[62vh]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />

            <div className="absolute left-0 right-0 bottom-0 p-6 md:p-10 flex items-end justify-between gap-6">
              <div>
                <p className="section-eyebrow tracking-[0.28em] text-white/60 mb-3">
                  Dynamic showcase
                </p>
                <h3 className="text-2xl md:text-3xl text-white font-medium tracking-tight">
                  Cinematic Video Screen
                </h3>
              </div>
              <a
                href="#contact"
                className="shrink-0 text-[10px] font-medium tracking-[0.22em] uppercase text-white hover:opacity-75 transition-opacity"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
