"use client";

import { processSteps } from "@/data";
import FadeIn from "@/components/animations/FadeIn";

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative py-40 px-6 section-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header - Minimalist */}
        <FadeIn className="mb-24 text-center max-w-3xl mx-auto">
          <span className="section-eyebrow text-white/40 mb-6 block">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white mb-6">
            Your videos,{" "}
            <span className="text-white/50 font-light italic">effortlessly.</span>
          </h2>
          <p className="text-base text-white/50 font-light">
            Begin your editing journey in three effortless steps.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.1}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 h-full">
                <span className="section-eyebrow text-[20px] tracking-[0.25em] text-white/40 mb-6 block">
                  Step {step.number}
                </span>
                <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-lg text-white/50 font-light leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contact"
            id="process-cta"
            className="inline-flex items-center rounded-full bg-white px-10 py-4 text-[10px] font-medium tracking-[0.25em] uppercase text-black hover:opacity-90 transition-opacity"
          >
            Edit now
          </a>
        </div>
      </div>
    </section>
  );
}
