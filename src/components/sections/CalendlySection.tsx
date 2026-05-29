"use client";

import { useInView } from "@/hooks/useInView";

const calendlyEmbedUrl =
  "https://calendly.com/tbmstudio603/30min?hide_gdpr_banner=1&background_color=07060b&text_color=ffffff&primary_color=6d5cff";

export default function CalendlySection() {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "400px 0px" });

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div ref={ref} className="mx-auto w-full max-w-[1000px]">
        {inView ? (
          <iframe
            title="Schedule a call with TBM STUDIOZ"
            src={calendlyEmbedUrl}
            className="block h-[700px] w-full border-0 bg-transparent"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-[700px] w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] text-sm text-white/40"
            aria-hidden="true"
          >
            Loading scheduler…
          </div>
        )}
      </div>
    </section>
  );
}
