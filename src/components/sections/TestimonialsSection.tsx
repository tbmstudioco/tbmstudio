"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data";
import FadeIn from "@/components/animations/FadeIn";

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div className="flex-shrink-0 w-80 p-8 rounded-xl border border-white/5 bg-white/[0.02] mx-4 flex flex-col justify-between">
      <p className="text-sm text-white/60 leading-relaxed font-light">
        "{testimonial.review}"
      </p>
      
      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/5">
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-medium text-white/50 border border-white/10 shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-xs font-medium text-white leading-tight">{testimonial.name}</p>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialRow({
  reversed = false,
}: {
  reversed?: boolean;
}) {
  const items = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden py-4 opacity-50 hover:opacity-100 transition-opacity duration-500">
      <motion.div
        className="flex"
        animate={{ x: reversed ? ["0%", "33.33%"] : ["0%", "-33.33%"] }}
        transition={{
          duration: 45,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="relative py-40 section-surface overflow-hidden"
    >
      <div className="relative z-20">
        {/* Header - Minimalist */}
        <FadeIn className="mb-24 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
            <div className="max-w-xl">
              <span className="section-eyebrow text-white/40 mb-6 block">
                Our Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-normal tracking-tight leading-tight text-white mb-8">
                Loved by <span className="text-white/50 font-light italic">creators and brands.</span>
              </h2>
            </div>
            
            <div className="flex flex-col gap-6 items-start md:items-end">
              {[
                { value: "4.5 Rating", label: "Client Satisfaction" },
                { value: "15+ Projects", label: "Completed Success" },
              ].map((badge) => (
                <div key={badge.label} className="text-right">
                  <div className="text-lg font-normal text-white">{badge.value}</div>
                  <div className="section-eyebrow tracking-[0.2em] text-white/30 mt-1">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Marquee rows */}
        <div className="space-y-4">
          <TestimonialRow />
        </div>
      </div>
    </section>
  );
}
