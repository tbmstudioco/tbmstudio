"use client";

import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { pricingPlans } from "@/data";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-6 section-surface overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="mb-16 text-center max-w-2xl mx-auto">
          <span className="section-eyebrow text-white/40 mb-6 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white mb-6">
            Simple, transparent{" "}
            <span className="text-white/50 font-light italic">pricing.</span>
          </h2>
          <p className="text-base text-white/50 font-light">
            No hidden fees. Just clear, flexible plans to suit your workflow.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-tbm-violet/40 bg-tbm-violet/10 card-glow"
                    : "border-white/8 bg-white/[0.02]"
                }`}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-white px-3 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-black">
                    {plan.badge}
                  </span>
                ) : null}

                <div className="mb-8">
                  <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-white/50 font-light">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-4xl font-normal text-white">{plan.price}</span>
                  <span className="ml-2 text-sm text-white/40">{plan.period}</span>
                </div>

                <ul className="mb-10 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/60 font-light">
                      <Check size={14} className="mt-0.5 shrink-0 text-white/50" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.id === "premium" ? "/portfolio" : "#contact"}
                  className={`block w-full rounded-full py-4 text-center text-[10px] font-medium tracking-[0.25em] uppercase transition-all ${
                    plan.highlighted
                      ? "bg-white text-black hover:opacity-90"
                      : "border border-white/15 text-white hover:border-white/30"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
