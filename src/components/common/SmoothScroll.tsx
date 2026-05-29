"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const NAV_OFFSET = -88;

function getHashFromHref(href: string): string | null {
  if (href.startsWith("#")) return href;
  if (href.startsWith("/#") && window.location.pathname === "/") {
    return href.slice(1);
  }
  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hash = getHashFromHref(href);
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash) as HTMLElement | null;
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: NAV_OFFSET });
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
