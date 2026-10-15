import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { rewriteUrls } from "./common.mjs";

const SLUG = "about-us"; // depth of the sample page these fragments came from

function read(name) {
  return fs.readFileSync(path.join("scripts", name), "utf8");
}

// ---------------- Header ----------------
const hdrRewritten = rewriteUrls(read("_hdr-inner.html"), SLUG);
const $h = cheerio.load(hdrRewritten, { decodeEntities: false });

const logoHtml = $h(".ea-hdr__logo").first().toString();
const navInner = $h("nav.ea-nav").first().html() || "";
const actionsHtml = $h(".ea-hdr__actions").first().toString();
const hamburgerSvg = $h(".elementskit-menu-hamburger").first().html() || "";

const headerSrc = `"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO_HTML = ${JSON.stringify(logoHtml)};
const NAV_INNER_HTML = ${JSON.stringify(navInner)};
const ACTIONS_HTML = ${JSON.stringify(actionsHtml)};
const HAMBURGER_SVG_HTML = ${JSON.stringify(hamburgerSvg)};

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const links = nav.querySelectorAll("a[href]");
    links.forEach((a) => {
      const href = a.getAttribute("href");
      const isCurrent =
        href === pathname || (href !== "/" && pathname?.startsWith(href + "/"));
      const li = a.closest("li");
      if (!li) return;
      li.classList.toggle("current-menu-item", isCurrent);
      li.classList.toggle("current_page_item", isCurrent);
      li.classList.toggle("active", isCurrent);
    });
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="ea-hdr">
      <div className="ea-hdr__bar">
        <span dangerouslySetInnerHTML={{ __html: LOGO_HTML }} />
        <nav
          ref={navRef}
          className={
            "ea-nav elementskit-menu-offcanvas-elements" + (open ? " active" : "")
          }
          aria-label="Main"
          dangerouslySetInnerHTML={{ __html: NAV_INNER_HTML }}
          onClick={(e) => {
            if (e.target.closest(".ekit-menu-close")) setOpen(false);
          }}
        />
        <div
          className={
            "elementskit-menu-overlay elementskit-menu-offcanvas-elements" +
            (open ? " active" : "")
          }
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
        <span dangerouslySetInnerHTML={{ __html: ACTIONS_HTML }} />
        <button
          type="button"
          className="elementskit-menu-hamburger"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          dangerouslySetInnerHTML={{ __html: HAMBURGER_SVG_HTML }}
        />
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join("app", "components", "Header.js"), headerSrc, "utf8");

// ---------------- Footer ----------------
const ftrRewritten = rewriteUrls(read("_ftr-inner.html"), SLUG);
const footerSrc = `const FOOTER_HTML = ${JSON.stringify(ftrRewritten)};

export default function Footer() {
  return <div className="ea-ftr" dangerouslySetInnerHTML={{ __html: FOOTER_HTML }} />;
}
`;
fs.writeFileSync(path.join("app", "components", "Footer.js"), footerSrc, "utf8");

// ---------------- Floating widgets ----------------
const widgetsRewritten = rewriteUrls(read("_widgets.html"), SLUG);
const widgetsSrc = `"use client";

const WIDGETS_HTML = ${JSON.stringify(widgetsRewritten)};

export default function FloatingWidgets() {
  return <div dangerouslySetInnerHTML={{ __html: WIDGETS_HTML }} />;
}
`;
fs.writeFileSync(
  path.join("app", "components", "FloatingWidgets.js"),
  widgetsSrc,
  "utf8"
);

// ---------------- Preamble (GTM/ClickCease noscript + skip link) ----------------
const preambleRewritten = rewriteUrls(read("_preamble.html"), SLUG);
const preambleSrc = `const PREAMBLE_HTML = ${JSON.stringify(preambleRewritten)};

export default function Preamble() {
  return <div dangerouslySetInnerHTML={{ __html: PREAMBLE_HTML }} />;
}
`;
fs.writeFileSync(path.join("app", "components", "Preamble.js"), preambleSrc, "utf8");

console.log("Shared components written.");
