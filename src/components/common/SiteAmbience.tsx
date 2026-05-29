"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const SNAKE_PATH =
  "M -140 220 C 120 60, 380 380, 620 240 S 980 40, 1240 260 S 1520 480, 1580 680";

function SnakeLine() {
  return (
    <svg
      className="snake-canvas"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="snake-grad" gradientUnits="userSpaceOnUse" x1="0" y1="200" x2="1440" y2="700">
          <stop offset="0%" stopColor="#6d5cff" stopOpacity="0" />
          <stop offset="30%" stopColor="#b8aeff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#ff9f43" stopOpacity="1" />
          <stop offset="70%" stopColor="#ff6b8a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6d5cff" stopOpacity="0" />
        </linearGradient>
        <filter id="snake-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        className="snake-line"
        d={SNAKE_PATH}
        fill="none"
        stroke="url(#snake-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        filter="url(#snake-glow)"
      />
    </svg>
  );
}

export default function SiteAmbience() {
  const pathname = usePathname();
  const snakeLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const snakeLayer = snakeLayerRef.current;
    if (!snakeLayer) return;

    if (pathname !== "/") {
      snakeLayer.style.clipPath = "inset(0 0 0 0)";
      snakeLayer.style.opacity = "1";
      return;
    }

    const updateSnakeClip = () => {
      const showReel = document.getElementById("show-reel");
      if (!showReel) {
        snakeLayer.style.clipPath = "inset(0 0 0 0)";
        snakeLayer.style.opacity = "1";
        return;
      }

      const top = showReel.getBoundingClientRect().top;
      const vh = window.innerHeight;

      if (top >= vh) {
        snakeLayer.style.clipPath = `inset(${vh}px 0 0 0)`;
        snakeLayer.style.opacity = "0";
        return;
      }

      snakeLayer.style.opacity = "1";
      snakeLayer.style.clipPath =
        top <= 0 ? "inset(0 0 0 0)" : `inset(${top}px 0 0 0)`;
    };

    updateSnakeClip();
    window.addEventListener("scroll", updateSnakeClip, { passive: true });
    window.addEventListener("resize", updateSnakeClip);

    const retry = window.setTimeout(updateSnakeClip, 100);

    return () => {
      window.removeEventListener("scroll", updateSnakeClip);
      window.removeEventListener("resize", updateSnakeClip);
      window.clearTimeout(retry);
    };
  }, [pathname]);

  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <div className="site-ambience-root" aria-hidden="true">
      <div ref={snakeLayerRef} className="snake-layer">
        <SnakeLine />
      </div>
      <div className="site-grain site-grain-primary" />
      <div className="site-grain site-grain-secondary" />
    </div>
  );
}
