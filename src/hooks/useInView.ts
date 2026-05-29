"use client";

import { useEffect, useRef, useState, type Ref } from "react";

function isNearViewport(element: Element, rootMarginPx = 300) {
  const rect = element.getBoundingClientRect();
  return (
    rect.bottom >= -rootMarginPx &&
    rect.top <= window.innerHeight + rootMarginPx &&
    rect.right >= 0 &&
    rect.left <= window.innerWidth
  );
}

export function useInView<T extends Element>(
  options?: IntersectionObserverInit & { once?: boolean }
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;
  const rootMargin = options?.rootMargin ?? "300px 0px";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const marginPx = Number.parseInt(String(rootMargin), 10) || 300;

    if (isNearViewport(element, marginPx)) {
      setInView(true);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold: 0.01, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options are static per callsite
  }, [once, rootMargin]);

  return { ref, inView };
}

function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(value);
      } else {
        ref.current = value;
      }
    }
  };
}

export { mergeRefs };
