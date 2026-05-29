"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/common/MagneticButton";
import OrbitBackground from "@/components/common/OrbitBackground";
import { ArrowRight } from "lucide-react";

/* ─── Animated Headline Word ────────────────────── */
function AnimatedWord({
  word,
  delay,
  secondary,
  italic,
}: {
  word: string;
  delay: number;
  secondary?: boolean;
  italic?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.2, 1, 0.3, 1] }}
      className={`inline-block ${italic ? "font-serif italic font-normal" : secondary ? "text-white/50 font-light" : "text-white font-medium"}`}
    >
      {word}
    </motion.span>
  );
}

/* ─── Hero Section ──────────────────────────────── */
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black"
    >
      <div className="hero-orbit-wrap" aria-hidden="true">
        <OrbitBackground className="orbit-canvas orbit-canvas-hero" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-32 pb-20">
        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight leading-[1.05] mb-12 max-w-7xl">
          <div className="overflow-hidden py-1">
            <AnimatedWord word="We" delay={0.4} />
            <span className="mx-2 sm:mx-3" />
            <AnimatedWord word="ship" delay={0.45} />
            <span className="mx-2 sm:mx-3" />
            <AnimatedWord word="your" delay={0.5} secondary />
            <span className="mx-2 sm:mx-3" />
            <AnimatedWord word="viral" delay={0.55} italic />
          </div>
          <div className="overflow-hidden py-1">
            <AnimatedWord word="videos" delay={0.6} />
            <span className="mx-2 sm:mx-3" />
            <AnimatedWord word="in" delay={0.65} secondary />
            <span className="mx-2 sm:mx-3" />
            <AnimatedWord word="36" delay={0.7} italic />
            <span className="mx-2 sm:mx-3" />
            <AnimatedWord word="hours" delay={0.75} italic />
          </div>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          className="max-w-[460px] text-xl text-white/50 font-light leading-relaxed mb-16"
        >
          so you can focus on growing.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <MagneticButton>
            <Link
              href="#contact"
              id="hero-cta-book"
              className="group flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-medium text-xs tracking-widest uppercase hover:scale-[1.02] transition-all duration-500"
            >
              Book a call
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="#pricing"
              id="hero-cta-plans"
              className="group flex items-center gap-3 rounded-full border border-tbm-violet/45 bg-tbm-violet/15 px-10 py-5 text-sm font-medium uppercase tracking-widest text-white shadow-[0_0_32px_rgba(109,92,255,0.22)] backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:border-tbm-accent/70 hover:bg-tbm-violet/25 hover:shadow-[0_0_40px_rgba(109,92,255,0.35)]"
            >
              See plans
              <ArrowRight
                size={16}
                className="text-tbm-accent transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
        <div className="w-px h-12 bg-white/10" />
      </motion.div>
    </section>
  );
}
