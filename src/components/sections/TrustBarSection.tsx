"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { trustBrands } from "@/data";

const pillThemes = [
  {
    border: "border-tbm-violet/35",
    bg: "bg-tbm-violet/10",
    glow: "shadow-[0_0_28px_rgba(109,92,255,0.14)]",
    text: "text-tbm-accent",
    ring: "ring-tbm-violet/20",
  },
  {
    border: "border-tbm-accent/30",
    bg: "bg-tbm-accent/8",
    glow: "shadow-[0_0_28px_rgba(184,174,255,0.12)]",
    text: "text-tbm-accent",
    ring: "ring-tbm-accent/20",
  },
  {
    border: "border-tbm-amber/35",
    bg: "bg-tbm-amber/10",
    glow: "shadow-[0_0_28px_rgba(255,159,67,0.12)]",
    text: "text-tbm-amber",
    ring: "ring-tbm-amber/20",
  },
  {
    border: "border-tbm-rose/35",
    bg: "bg-tbm-rose/10",
    glow: "shadow-[0_0_28px_rgba(255,107,138,0.12)]",
    text: "text-tbm-rose",
    ring: "ring-tbm-rose/20",
  },
  {
    border: "border-tbm-teal/35",
    bg: "bg-tbm-teal/10",
    glow: "shadow-[0_0_28px_rgba(45,212,191,0.12)]",
    text: "text-tbm-teal",
    ring: "ring-tbm-teal/20",
  },
] as const;

function TrustPill({
  brand,
  themeIndex,
}: {
  brand: (typeof trustBrands)[0];
  themeIndex: number;
}) {
  const theme = pillThemes[themeIndex % pillThemes.length];

  return (
    <figure
      className={`group flex shrink-0 items-center gap-3 rounded-full border px-3 py-2 pr-5 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] md:gap-3.5 md:px-4 md:py-2.5 md:pr-6 ${theme.border} ${theme.bg} ${theme.glow} ring-1 ${theme.ring}`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-black/40 ring-1 ${theme.ring} ${
          brand.variant === "portrait" ? "h-10 w-10 rounded-full" : "h-10 w-10 rounded-full p-1.5"
        }`}
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          sizes="40px"
          className={
            brand.variant === "portrait"
              ? "object-cover"
              : "object-contain p-0.5"
          }
        />
      </div>

      <figcaption
        className={`whitespace-nowrap text-[11px] font-medium tracking-[0.04em] md:text-xs ${theme.text}`}
      >
        {brand.name}
      </figcaption>
    </figure>
  );
}

export default function TrustBarSection() {
  const items = [...trustBrands, ...trustBrands];

  return (
    <section id="trust-bar" className="relative overflow-hidden border-y section-divider bg-black py-16">
      <p className="section-eyebrow mb-10 text-center text-white/45">
        Our work has been trusted by
      </p>
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max items-center gap-4 md:gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 55, ease: "linear", repeat: Infinity }}
        >
          {items.map((brand, i) => (
            <TrustPill
              key={`${brand.name}-${i}`}
              brand={brand}
              themeIndex={i % trustBrands.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
