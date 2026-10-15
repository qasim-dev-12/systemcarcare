"use client";

import { useEffect } from "react";

// Progressively enhances any `[data-au-carousel]` block already present in
// the legacy page markup (prev/next buttons, dots, scroll-snap track) with
// real click behaviour. The markup and CSS already exist per-page; this is
// the one piece that was never wired up.
//
// Mounted once in the root layout. A MutationObserver (not a plain mount
// effect) is required because the legacy content is injected via
// dangerouslySetInnerHTML inside `children`, which swaps on every
// client-side route change without this component remounting.
export default function CarouselEnhancer() {
  useEffect(() => {
    const wireUp = (root) => {
      if (root.dataset.auCarouselReady) return;
      root.dataset.auCarouselReady = "true";

      const track = root.querySelector("[data-au-carousel-track]");
      if (!track) return;
      const prevBtn = root.querySelector("[data-au-carousel-prev]");
      const nextBtn = root.querySelector("[data-au-carousel-next]");
      const dots = Array.from(root.querySelectorAll("[data-au-carousel-dot]"));
      const slides = Array.from(track.children);
      if (slides.length === 0) return;

      const closestIndex = () => {
        let closest = 0;
        let min = Infinity;
        slides.forEach((slide, i) => {
          const d = Math.abs(slide.offsetLeft - track.scrollLeft);
          if (d < min) {
            min = d;
            closest = i;
          }
        });
        return closest;
      };

      const refreshUI = () => {
        const closest = closestIndex();
        dots.forEach((dot, i) =>
          dot.setAttribute("aria-current", i === closest ? "true" : "false")
        );
        if (prevBtn) prevBtn.disabled = closest === 0;
        if (nextBtn) nextBtn.disabled = closest === slides.length - 1;
      };

      const goTo = (index) => {
        const clamped = Math.max(0, Math.min(slides.length - 1, index));
        track.scrollTo({ left: slides[clamped].offsetLeft, behavior: "smooth" });
      };

      prevBtn?.addEventListener("click", () => goTo(closestIndex() - 1));
      nextBtn?.addEventListener("click", () => goTo(closestIndex() + 1));
      dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

      let frame = null;
      track.addEventListener(
        "scroll",
        () => {
          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = null;
            refreshUI();
          });
        },
        { passive: true }
      );

      refreshUI();
    };

    const scan = () => {
      document.querySelectorAll("[data-au-carousel]").forEach(wireUp);
    };

    scan();

    const observer = new MutationObserver(() => scan());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
