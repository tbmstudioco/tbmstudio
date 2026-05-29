"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import FrameVideo from "@/components/common/FrameVideo";
import type { PortfolioGridItem } from "@/types/content";

function PortfolioTile({
  item,
  index,
}: {
  item: PortfolioGridItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const poster = item.posterSrc ?? item.image;
  const isLocalPoster = poster.startsWith("/");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${item.gridClass}`}
    >
      {item.videoSrc ? (
        <>
          {!isHovered || !isLocalPoster ? (
            <Image
              src={poster}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className={`object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-0" : "opacity-100"
              }`}
            />
          ) : null}
          <FrameVideo
            src={item.videoSrc}
            fallbackSrc={item.videoSrc}
            poster={isLocalPoster ? poster : undefined}
            autoPlay={isHovered}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      ) : (
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          background: `linear-gradient(135deg, ${item.accentFrom}, ${item.accentTo})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

      {item.isVideo ? (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-[#f5c518] text-black shadow-[0_8px_30px_rgba(245,197,24,0.45)] transition-all duration-300 ${
              isHovered ? "scale-110 opacity-0" : "opacity-100 group-hover:scale-110"
            }`}
          >
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </div>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="section-eyebrow tracking-[0.22em] text-white/60">{item.category}</p>
        <h3 className="mt-1 text-sm font-medium text-white">{item.title}</h3>
      </div>
    </motion.article>
  );
}

export default function PortfolioCreativeGrid({
  items,
}: {
  items: PortfolioGridItem[];
}) {
  return (
    <>
      <section className="relative min-h-screen section-surface px-4 pb-48 pt-32 sm:px-6">
        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeIn className="mb-14 text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.35em] text-white/45">
              Our Work
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-7xl">
              Creative
            </h1>
          </FadeIn>

          <div className="grid auto-rows-[72px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[80px] sm:grid-cols-4 lg:grid-cols-6">
            {items.map((item, index) => (
              <PortfolioTile key={item.frameioFileId ?? item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-52 sm:h-60"
      >
        <div
          className="absolute inset-0 backdrop-blur-2xl"
          style={{
            WebkitMaskImage: "linear-gradient(to top, black 45%, transparent 100%)",
            maskImage: "linear-gradient(to top, black 45%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tbm-black/85 via-tbm-black/35 to-transparent" />
        <div className="absolute inset-x-[8%] bottom-0 h-32 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/10 to-transparent" />
      </div>
    </>
  );
}
