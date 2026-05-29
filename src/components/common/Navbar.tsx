"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import TbmLogo from "./TbmLogo";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Work", href: "/portfolio" },
  { name: "Pricing", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/#process" },
];

const ctaClassName =
  "nav-cta shrink-0 rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all hover:opacity-90";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Link
        href="#contact"
        className={cn(ctaClassName, "fixed top-5 right-6 z-50 hidden md:inline-flex")}
      >
        Book a call
      </Link>

      <header className="fixed top-0 inset-x-0 z-40 pointer-events-none">
        {/* Mobile: logo left, menu right — no pill, no header CTA */}
        <div className="px-5 pt-5 md:hidden pointer-events-auto">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex shrink-0" aria-label="TBM STUDIOZ home">
              <TbmLogo variant="nav" />
            </Link>

            <button
              type="button"
              className="text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="nav-pill mt-3 flex flex-col gap-1 rounded-2xl p-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 rounded-full px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white nav-cta"
              >
                Book a call
              </Link>
            </motion.div>
          )}
        </div>

        {/* Desktop: centered nav pill */}
        <div className="hidden md:block px-6 pt-5 pointer-events-auto">
          <div className="mx-auto flex max-w-7xl justify-center">
            <nav className="nav-pill flex w-fit items-center gap-14 rounded-full px-5 py-3">
              <Link href="/" className="inline-flex shrink-0" aria-label="TBM STUDIOZ home">
                <TbmLogo variant="nav" />
              </Link>

              <div className="flex items-center gap-4 lg:gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
