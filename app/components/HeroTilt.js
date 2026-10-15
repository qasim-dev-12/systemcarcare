"use client";

import { useEffect } from "react";

const MAX_TILT = 10; // degrees

// Adds a 3D tilt-on-hover + gentle idle float to the hero car photo.
// The image itself is flat (dangerouslySetInnerHTML legacy markup), so this
// fakes depth with perspective + rotateX/rotateY instead of a real 3D model.
export default function HeroTilt() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let media = null;
    let img = null;

    const bind = () => {
      media = document.querySelector(".ea-hmhero__media");
      img = media?.querySelector(".ea-hmhero__car");
      if (!media || !img || img.dataset.tiltReady) return;
      img.dataset.tiltReady = "true";

      img.classList.add("ea-hmhero__car--tilt");

      const onMove = (e) => {
        img.style.animationPlayState = "paused";
        const rect = media.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 2 * MAX_TILT;
        const rotateX = (0.5 - py) * 2 * MAX_TILT;
        img.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03,1.03,1.03)`;
        img.style.filter = `drop-shadow(${(-rotateY).toFixed(1)}px ${(rotateX + 10).toFixed(1)}px 22px rgba(0,0,0,.45))`;
      };

      const onLeave = () => {
        img.style.transform = "";
        img.style.filter = "";
        img.style.animationPlayState = "running";
      };

      media.addEventListener("mousemove", onMove);
      media.addEventListener("mouseleave", onLeave);
    };

    bind();
    const observer = new MutationObserver(bind);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
.ea-hmhero__media{perspective:1400px}
.ea-hmhero__car--tilt{
  transition:transform .2s ease-out,filter .2s ease-out;
  transform-style:preserve-3d;
  will-change:transform;
  animation:eaHeroFloat 6s ease-in-out infinite;
}
@keyframes eaHeroFloat{
  0%,100%{transform:perspective(1400px) translateY(0) rotateY(0deg) rotateX(0deg)}
  50%{transform:perspective(1400px) translateY(-10px) rotateY(2deg) rotateX(1deg)}
}
@media (prefers-reduced-motion: reduce){
  .ea-hmhero__car--tilt{animation:none}
}
`,
      }}
    />
  );
}
