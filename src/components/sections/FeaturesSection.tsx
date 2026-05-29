"use client";

import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { features } from "@/data";

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6 section-surface overflow-hidden border-t section-divider">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 max-w-3xl">
          <span className="section-eyebrow text-white/40 mb-6 block">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white mb-6">
            Why creators and brands{" "}
            <span className="text-white/50 font-light italic">choose TBM.</span>
          </h2>
          <p className="text-base text-white/50 font-light">
            Once you try TBM STUDIOZ, you&apos;ll never go anywhere else for video editing. Seriously.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.06}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 h-full hover:border-white/15 transition-colors">
                <h3 className="text-lg font-medium text-white mb-4">{feature.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-16 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center rounded-full bg-white px-10 py-4 text-[10px] font-medium tracking-[0.25em] uppercase text-black hover:opacity-90 transition-opacity"
          >
            Book a 15-min call
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
