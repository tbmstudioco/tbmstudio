"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import { faqs } from "@/data";
import { Plus, Minus } from "lucide-react";

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/8">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base font-medium text-white">{question}</span>
        <span className="shrink-0 text-white/50">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-white/50 font-light leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 px-6 section-surface overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="mb-16 text-center">
          <span className="section-eyebrow text-white/40 mb-6 block">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-white mb-6">
            Frequently asked{" "}
            <span className="text-white/50 font-light italic">questions.</span>
          </h2>
          <p className="text-base text-white/50 font-light">
            Still curious? Our team is ready to help with any questions about services, pricing, or
            workflows.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-6 md:px-10">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 text-center">
          <Link
            href="#contact"
            className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/50 hover:text-white transition-colors"
          >
            Contact Us →
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
