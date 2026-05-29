"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/common/MagneticButton";
import OrbitBackground from "@/components/common/OrbitBackground";
import { ArrowRight } from "lucide-react";

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

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-black"
    >
      <div className="hero-orbit-wrap" aria-hidden="true">
        <OrbitBackground className="orbit-canvas orbit-canvas-hero" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-5 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
        <h1 className="mb-8 max-w-7xl text-[2.35rem] font-normal leading-[1.08] tracking-tight sm:mb-12 sm:text-7xl md:text-8xl">
          <div className="overflow-hidden py-0.5 sm:py-1">
            <AnimatedWord word="We" delay={0.4} />
            <span className="mx-1 sm:mx-3" />
            <AnimatedWord word="ship" delay={0.45} italic />
            <span className="mx-1 sm:mx-3" />
            <AnimatedWord word="your" delay={0.5} secondary />
            <span className="mx-1 sm:mx-3" />
            <AnimatedWord word="viral" delay={0.55} italic />
          </div>
          <div className="overflow-hidden py-0.5 sm:py-1">
            <AnimatedWord word="videos" delay={0.6} />
            <span className="mx-1 sm:mx-3" />
            <AnimatedWord word="in" delay={0.65} secondary />
            <span className="mx-1 sm:mx-3" />
            <AnimatedWord word="36" delay={0.7} italic />
            <span className="mx-1 sm:mx-3" />
            <AnimatedWord word="hours" delay={0.75} italic />
          </div>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          className="mb-10 max-w-[20rem] text-base font-light leading-relaxed text-white/55 sm:mb-16 sm:max-w-[460px] sm:text-xl"
        >
          <span className="sm:hidden">
            Affordable, fast and human powered video edits.
          </span>
          <span className="hidden sm:inline">so you can focus on growing.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="flex w-full max-w-[20rem] flex-row items-center justify-center gap-3 sm:max-w-none sm:gap-6"
        >
          <MagneticButton className="flex-1 sm:flex-none">
            <Link
              href="#contact"
              id="hero-cta-book"
              className="hero-cta-primary group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-500 hover:scale-[1.02] sm:w-auto sm:gap-3 sm:px-10 sm:py-5 sm:text-xs sm:tracking-widest sm:bg-white sm:text-black"
            >
              Book a call
              <ArrowRight
                size={14}
                className="hidden transition-transform group-hover:translate-x-1 sm:inline"
              />
            </Link>
          </MagneticButton>

          <MagneticButton className="flex-1 sm:flex-none">
            <Link
              href="#pricing"
              id="hero-cta-plans"
              className="hero-cta-secondary group flex w-full items-center justify-center gap-2 rounded-full border border-white bg-black px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-500 hover:scale-[1.02] sm:w-auto sm:gap-3 sm:border-tbm-violet/45 sm:bg-tbm-violet/15 sm:px-10 sm:py-5 sm:text-sm sm:tracking-widest sm:shadow-[0_0_32px_rgba(109,92,255,0.22)] sm:backdrop-blur-md sm:hover:border-tbm-accent/70 sm:hover:bg-tbm-violet/25 sm:hover:shadow-[0_0_40px_rgba(109,92,255,0.35)]"
            >
              See plans
              <ArrowRight
                size={16}
                className="hidden text-tbm-accent transition-transform duration-300 group-hover:translate-x-1 sm:inline"
              />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
        <div className="h-12 w-px bg-white/10" />
      </motion.div>
    </section>
  );
}
