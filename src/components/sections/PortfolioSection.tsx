"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioItems } from "@/data";
import FadeIn from "@/components/animations/FadeIn";

const categories = ["All", "Social Media", "YouTube", "Commercials"];

function PortfolioCard({
  item,
}: {
  item: (typeof portfolioItems)[0];
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group relative aspect-video bg-white/[0.03] overflow-hidden rounded-xl border border-white/5 cursor-pointer"
    >
      {/* Clean Background - Placeholder for actual content */}
      <div className="absolute inset-0 bg-white/5 transition-colors group-hover:bg-white/10" />
      
      {/* Understated Info */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="section-eyebrow tracking-[0.2em] text-white/60 mb-2 block">
          {item.category}
        </span>
        <h3 className="text-xl font-medium text-white tracking-tight">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((i) => i.category.includes(activeCategory));

  return (
    <section id="work" className="relative py-40 px-6 section-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header - Minimalist */}
        <FadeIn className="mb-24">
          <div className="max-w-3xl">
            <span className="section-eyebrow text-white/40 mb-6 block">
              Case Studies
            </span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white mb-8">
              A collection of <span className="text-white/50 font-light italic">transformative</span> narratives.
            </h2>
          </div>
        </FadeIn>

        {/* Filter Pills - Clean */}
        <FadeIn delay={0.1} className="mb-14">
          <div className="flex flex-wrap gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`section-eyebrow tracking-[0.3em] transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.slice(0, 4).map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Understated CTA */}
        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <a
            href="#contact"
            id="portfolio-cta"
            className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors"
          >
            Request Full Portfolio Review
          </a>
        </div>
      </div>
    </section>
  );
}
