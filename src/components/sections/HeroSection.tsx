import OrbitBackground from "@/components/common/OrbitBackground";
import HeroCTAs from "@/components/sections/HeroCTAs";

function HeadlineWord({
  word,
  italic,
  secondary,
}: {
  word: string;
  italic?: boolean;
  secondary?: boolean;
}) {
  return (
    <span
      className={`inline-block ${italic ? "font-serif italic font-normal" : secondary ? "text-white/50 font-light" : "text-white font-medium"}`}
    >
      {word}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-black"
    >
      <div className="hero-orbit-wrap" aria-hidden="true">
        <OrbitBackground className="orbit-canvas orbit-canvas-hero" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-24 pb-16 text-center sm:px-6 sm:pt-32 sm:pb-20">
        <h1 className="mb-8 max-w-7xl text-[2.35rem] font-normal leading-[1.08] tracking-tight sm:mb-12 sm:text-7xl md:text-8xl">
          <div className="py-0.5 sm:py-1">
            <HeadlineWord word="We" />
            <span className="mx-1 sm:mx-3" />
            <HeadlineWord word="ship" italic />
            <span className="mx-1 sm:mx-3" />
            <HeadlineWord word="your" secondary />
            <span className="mx-1 sm:mx-3" />
            <HeadlineWord word="viral" italic />
          </div>
          <div className="py-0.5 sm:py-1">
            <HeadlineWord word="videos" />
            <span className="mx-1 sm:mx-3" />
            <HeadlineWord word="in" secondary />
            <span className="mx-1 sm:mx-3" />
            <HeadlineWord word="36" italic />
            <span className="mx-1 sm:mx-3" />
            <HeadlineWord word="hours" italic />
          </div>
        </h1>

        <p className="mb-10 max-w-[20rem] text-base font-light leading-relaxed text-white/55 sm:mb-16 sm:max-w-[460px] sm:text-xl">
          <span className="sm:hidden">Affordable, fast and human powered video edits.</span>
          <span className="hidden sm:inline">so you can focus on growing.</span>
        </p>

        <HeroCTAs />
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
        <div className="h-12 w-px bg-white/10" />
      </div>
    </section>
  );
}
