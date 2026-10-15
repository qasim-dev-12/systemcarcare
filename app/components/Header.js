"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO_HTML = "<a class=\"ea-hdr__logo\" href=\"/\" aria-label=\"System X Car Care home\"><img src=\"/wp-content/uploads/2024/04/Exotic-Auto-Services.webp\" width=\"112\" height=\"56\" alt=\"System X Car Care\" fetchpriority=\"high\" decoding=\"async\"></a>";
const NAV_INNER_HTML = "\n<button type=\"button\" class=\"ekit-menu-close\" aria-label=\"Close menu\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m5 5 14 14M19 5 5 19\"></path></svg></button>\n<ul class=\"elementskit-navbar-nav\"><li class=\"menu-item nav-item\"><a href=\"/\" class=\"ekit-menu-nav-link\">Home</a></li><li class=\"menu-item nav-item menu-item-has-children elementskit-dropdown-has\"><a href=\"/services\" class=\"ekit-menu-nav-link\">Services<svg class=\"ea-nav__caret\" viewBox=\"0 0 10 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m1 1 4 4 4-4\"></path></svg></a><span class=\"elementskit-submenu-indicator\" role=\"button\" tabindex=\"0\" aria-label=\"Show Services menu\"><svg viewBox=\"0 0 10 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m1 1 4 4 4-4\"></path></svg></span><div class=\"ea-mega ea-mega--services elementskit-submenu-panel\"><div class=\"ea-mega__in\"><ul class=\"ea-mega__grid ea-mega__grid--3\" aria-label=\"Services\"><li><a href=\"/car-paint-and-scratch-remover\"><span class=\"ea-mega__t\">Car Painting</span></a></li><li><a href=\"/paintless-dent-repair-abu-dhabi\"><span class=\"ea-mega__t\">Car Denting Service</span></a></li><li><a href=\"/detailing/paint-protection-film\"><span class=\"ea-mega__t\">Paint Protection Film</span></a></li><li><a href=\"/car-upholstery-mussafah\"><span class=\"ea-mega__t\">Car Upholstery Services</span></a></li><li><a href=\"/graphene-coating-abu-dhabi\"><span class=\"ea-mega__t\">Graphene Coating</span></a></li><li><a href=\"/car-interior-detailing-abu-dhabi\"><span class=\"ea-mega__t\">Car Interior Detailing</span></a></li><li><a href=\"/car-exterior-detailing-abu-dhabi\"><span class=\"ea-mega__t\">Car Exterior Detailing</span></a></li><li><a href=\"/ceramic-coating-abu-dhabi\"><span class=\"ea-mega__t\">Ceramic Coating</span></a></li><li><a href=\"/peelable-car-paint-abu-dhabi\"><span class=\"ea-mega__t\">Peelable Painting</span></a></li><li><a href=\"/car-window-tint-abu-dhabi\"><span class=\"ea-mega__t\">Car Window Tint</span></a></li><li><a href=\"/car-wrapping-abu-dhabi\"><span class=\"ea-mega__t\">Car Wrapping</span></a></li><li><a href=\"/car-body-kit-abu-dhabi\"><span class=\"ea-mega__t\">Car Body Kit</span></a></li><li><a href=\"/car-rust-proofing-abu-dhabi\"><span class=\"ea-mega__t\">Car Rust Proofing</span></a></li></ul><p class=\"ea-mega__foot\"><a href=\"/services\">All Services<svg class=\"ea-mega__arw\" viewBox=\"0 0 14 10\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M1 5h11M8.5 1.5 12 5l-3.5 3.5\"></path></svg></a></p></div></div></li><li class=\"menu-item nav-item\"><a href=\"/blogs\" class=\"ekit-menu-nav-link\">Blog</a></li><li class=\"menu-item nav-item current-menu-item current_page_item active\"><a href=\"/about-us\" class=\"ekit-menu-nav-link\">About</a></li><li class=\"menu-item nav-item\"><a href=\"/contact\" class=\"ekit-menu-nav-link\">Contact</a></li></ul>\n<div class=\"ea-nav__mobile-cta\">\n<a class=\"is-call\" href=\"tel:+971506432144\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1z\"></path></svg><span dir=\"ltr\">Call +971 50 643 2144</span></a>\n<a class=\"is-map\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Al+Quoz+Industrial+Area+2%2C+Dubai\" target=\"_blank\" rel=\"noopener\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg><span>Get Directions</span></a>\n</div>\n";
const ACTIONS_HTML = "<div class=\"ea-hdr__actions\"><a class=\"ea-hdr__lang\" href=\"/ar\" hreflang=\"ar\" lang=\"ar\" aria-label=\"التبديل إلى العربية\"><svg class=\"ea-flag\" viewBox=\"0 0 24 16\" aria-hidden=\"true\" focusable=\"false\"><rect width=\"6\" height=\"16\" fill=\"#ce1126\"></rect><rect x=\"6\" width=\"18\" height=\"5.34\" fill=\"#009739\"></rect><rect x=\"6\" y=\"5.34\" width=\"18\" height=\"5.33\" fill=\"#fff\"></rect><rect x=\"6\" y=\"10.67\" width=\"18\" height=\"5.33\" fill=\"#000\"></rect></svg><span class=\"ea-lang-label\">عربي</span></a>\n<a class=\"ea-hdr__call\" href=\"tel:+971506432144\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1z\"></path></svg><span dir=\"ltr\">+971 50 643 2144</span></a>\n<a class=\"ea-hdr__map\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Al+Quoz+Industrial+Area+2%2C+Dubai\" target=\"_blank\" rel=\"noopener\" aria-label=\"Find us on Google Maps\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg></a>\n</div>";
const HAMBURGER_SVG_HTML = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M3 6h18M3 12h18M3 18h18\"></path></svg>";

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
