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

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Link
        href="#contact"
        className="nav-cta fixed top-4 right-4 z-50 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all hover:opacity-90 sm:top-5 sm:right-6 sm:px-6 sm:py-3"
      >
        Book a call
      </Link>

      <header className="fixed top-0 inset-x-0 z-40 px-4 pt-4 sm:px-6 sm:pt-5 pointer-events-none">
        <div className="mx-auto w-fit max-w-[calc(100vw-9rem)] pointer-events-auto">
          <nav className="nav-pill flex w-fit items-center gap-10 rounded-full px-4 py-2.5 sm:gap-14 sm:px-5 sm:py-3">
            <Link
              href="/"
              className="inline-flex shrink-0"
              aria-label="TBM STUDIOZ home"
            >
              <TbmLogo variant="nav" />
            </Link>

            <div className="hidden md:flex items-center gap-4 lg:gap-5">
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

            <button
              type="button"
              className="md:hidden text-white p-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "nav-pill mt-2 flex flex-col gap-1 rounded-2xl p-4 md:hidden"
              )}
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
            </motion.div>
          )}
        </div>
      </header>
    </>
  );
}
