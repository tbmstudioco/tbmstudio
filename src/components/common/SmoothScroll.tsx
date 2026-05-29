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

function prefersNativeScroll() {
  return window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (prefersNativeScroll()) return;

    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let frameId = 0;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

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
      cancelAnimationFrame(frameId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
