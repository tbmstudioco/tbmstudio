"use client";

const calendlyEmbedUrl =
  "https://calendly.com/tbmstudio603/30min?hide_gdpr_banner=1&background_color=07060b&text_color=ffffff&primary_color=6d5cff";

export default function CalendlySection() {
  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto w-full max-w-[1000px]">
        <iframe
          title="Schedule a call with TBM STUDIOZ"
          src={calendlyEmbedUrl}
          className="block h-[700px] w-full border-0 bg-transparent"
          loading="lazy"
        />
      </div>
    </section>
  );
}
