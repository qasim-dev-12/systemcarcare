"use client";

import { useEffect } from "react";

// Activates the data-au-anim="reveal"/"stagger" and data-au-parallax hooks
// already present in every ea-page/ea-post template. The markup has shipped
// sitewide since the WP migration but nothing ever observed it, so every
// page has rendered fully static. This is the missing wiring, not new markup.
export default function ScrollReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealTargets = document.querySelectorAll(
      "[data-au-anim]:not([data-au-bound])"
    );
    if (reduceMotion) {
      revealTargets.forEach((el) => el.classList.add("au-in"));
    } else if (revealTargets.length) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("au-in");
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealTargets.forEach((el) => {
        el.dataset.auBound = "true";
        io.observe(el);
      });
    }

    if (reduceMotion) return;

    const parallaxEls = document.querySelectorAll(
      "[data-au-parallax]:not([data-au-p-bound])"
    );
    if (!parallaxEls.length) return;

    parallaxEls.forEach((el) => (el.dataset.auPBound = "true"));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        parallaxEls.forEach((el) => {
          const strength = parseFloat(el.dataset.auParallax) || 20;
          const rect = el.getBoundingClientRect();
          const vh = window.innerHeight || 1;
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          el.style.transform = `translateY(${(-progress * strength).toFixed(1)}px)`;
        });
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-au-anim="reveal"]{opacity:0;transform:translateY(26px) scale(.985);transition:opacity .7s cubic-bezier(.16,.8,.3,1),transform .7s cubic-bezier(.16,.8,.3,1)}
[data-au-anim="reveal"].au-in{opacity:1;transform:translateY(0) scale(1)}
[data-au-anim="stagger"]>*{opacity:0;transform:translateY(20px) scale(.97);transition:opacity .55s cubic-bezier(.16,.8,.3,1),transform .55s cubic-bezier(.16,.8,.3,1)}
[data-au-anim="stagger"].au-in>*{opacity:1;transform:translateY(0) scale(1)}
[data-au-anim="stagger"].au-in>*:nth-child(1){transition-delay:.03s}
[data-au-anim="stagger"].au-in>*:nth-child(2){transition-delay:.08s}
[data-au-anim="stagger"].au-in>*:nth-child(3){transition-delay:.13s}
[data-au-anim="stagger"].au-in>*:nth-child(4){transition-delay:.18s}
[data-au-anim="stagger"].au-in>*:nth-child(5){transition-delay:.23s}
[data-au-anim="stagger"].au-in>*:nth-child(6){transition-delay:.28s}
[data-au-anim="stagger"].au-in>*:nth-child(n+7){transition-delay:.32s}
[data-au-parallax]{will-change:transform}
@media (prefers-reduced-motion: reduce){
  [data-au-anim]{opacity:1 !important;transform:none !important;transition:none !important}
  [data-au-anim]>*{opacity:1 !important;transform:none !important;transition:none !important}
}
`,
      }}
    />
  );
}
