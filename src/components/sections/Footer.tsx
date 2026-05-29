"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import TbmLogo from "@/components/common/TbmLogo";
import { socialIconComponents } from "@/components/common/SocialIcons";
import { socialLinks } from "@/data";

const socialIcons = socialIconComponents;

const footerLinks = {
  Services: [
    "Social Media Editing",
    "YouTube Editing",
    "Motion Graphics",
    "Ads & Commercials",
    "Creative Strategy",
  ],
  Company: [
    { label: "Our Work", href: "/portfolio" },
    { label: "Process", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="footer-frost relative overflow-hidden border-t section-divider">
      {/* Top CTA bar */}
      <div className="border-b border-white/5 py-10 px-6">
        <FadeIn className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4 leading-tight">
              <span className="block">High-quality video edits, delivered in</span>
              <span className="block text-white/50 font-light italic">36 hours.</span>
            </h3>
            <p className="text-base text-white/40 font-light max-w-sm">
              Affordable, reliable, and tailored to your style — powered by real editors.
            </p>
          </div>
          <motion.a
            href="#contact"
            id="footer-cta"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0 flex items-center gap-3 px-10 py-5 rounded-full bg-white text-tbm-black font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-all"
          >
            Book a call <ArrowUpRight size={14} />
          </motion.a>
        </FadeIn>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        {/* Brand col */}
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" id="footer-logo" className="inline-flex shrink-0 mb-6" aria-label="TBM STUDIOZ home">
            <TbmLogo variant="footer" />
          </Link>
          <p className="text-xs text-white/45 leading-relaxed max-w-xs mb-6">
            We don't edit videos. We build attention. Premium creative agency
            specializing in social media, YouTube, ads, and motion graphics.
          </p>
          {/* Socials */}
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <motion.a
                  key={social.id}
                  href={social.href}
                  id={social.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-lg border border-white/8 bg-tbm-gray/50 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={17} />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Link cols */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/30 mb-6">
              {category}
            </p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={typeof link === "string" ? link : link.label}>
                  <Link
                    href={typeof link === "string" ? "#" : link.href}
                    className="text-xs text-white/45 hover:text-white transition-colors duration-200"
                  >
                    {typeof link === "string" ? link : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/45">
            © {new Date().getFullYear()} TBM STUDIOZ. All rights reserved.
          </p>
          <p className="text-[11px] text-white/30 sm:flex-1 sm:text-center">
            Crafted with obsession in India 🇮🇳
          </p>
          <Link
            href="/"
            className="inline-flex shrink-0 self-end sm:self-auto opacity-60 transition-opacity hover:opacity-100"
            aria-label="TBM STUDIOZ home"
          >
            <TbmLogo variant="footer" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
