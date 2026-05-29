"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/common/MagneticButton";

export default function HeroCTAs() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
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
  );
}
