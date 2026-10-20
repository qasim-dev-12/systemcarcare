"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO_HTML = "<a class=\"ea-hdr__logo\" href=\"/\" aria-label=\"System X Car Care home\"><img src=\"/wp-content/uploads/2024/04/Exotic-Auto-Services.webp\" width=\"123\" height=\"56\" alt=\"System X Car Care\" fetchpriority=\"high\" decoding=\"async\"></a>";
const NAV_INNER_HTML = "\n<button type=\"button\" class=\"ekit-menu-close\" aria-label=\"Close menu\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\" stroke-linecap=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m5 5 14 14M19 5 5 19\"></path></svg></button>\n<ul class=\"elementskit-navbar-nav\"><li class=\"menu-item nav-item\"><a href=\"/\" class=\"ekit-menu-nav-link\">Home</a></li><li class=\"menu-item nav-item menu-item-has-children elementskit-dropdown-has\"><a href=\"/services\" class=\"ekit-menu-nav-link\">Services<svg class=\"ea-nav__caret\" viewBox=\"0 0 10 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m1 1 4 4 4-4\"></path></svg></a><span class=\"elementskit-submenu-indicator\" role=\"button\" tabindex=\"0\" aria-label=\"Show Services menu\" aria-expanded=\"false\"><svg viewBox=\"0 0 10 6\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m1 1 4 4 4-4\"></path></svg></span><div class=\"ea-mega ea-mega--services elementskit-submenu-panel\"><div class=\"ea-mega__in\"><ul class=\"ea-mega__grid ea-mega__grid--5\" aria-label=\"Services\"><li><a href=\"/car-paint-and-scratch-remover\"><span class=\"ea-mega__ic\"><img src=\"/wp-content/uploads/service-icons/car-painting-icon.webp\" width=\"24\" height=\"24\" alt=\"\" loading=\"lazy\" decoding=\"async\"></span><span class=\"ea-mega__t\">Car Painting</span></a></li><li><a href=\"/paintless-dent-repair-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><circle cx=\"12\" cy=\"15\" r=\"5\"></circle><path d=\"M12 10V3\"></path><path d=\"M9 3h6\"></path></svg></span><span class=\"ea-mega__t\">Car Denting Service</span></a></li><li><a href=\"/detailing/paint-protection-film\"><span class=\"ea-mega__ic\"><img src=\"/wp-content/uploads/service-icons/paint-protection-film-icon.webp\" width=\"24\" height=\"24\" alt=\"\" loading=\"lazy\" decoding=\"async\"></span><span class=\"ea-mega__t\">Paint Protection Film</span></a></li><li><a href=\"/car-upholstery-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M7 13V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v7\"></path><path d=\"M5 13h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4Z\"></path><path d=\"M5 17v2\"></path><path d=\"M19 17v2\"></path></svg></span><span class=\"ea-mega__t\">Car Upholstery Services</span></a></li><li><a href=\"/graphene-coating-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 3 20 7.5v9L12 21 4 16.5v-9Z\"></path><path d=\"M12 21v-9\"></path><path d=\"M20 7.5 12 12 4 7.5\"></path></svg></span><span class=\"ea-mega__t\">Graphene Coating</span></a></li><li><a href=\"/car-interior-detailing-dubai\"><span class=\"ea-mega__ic\"><img src=\"/wp-content/uploads/service-icons/car-detailing-icon.webp\" width=\"24\" height=\"24\" alt=\"\" loading=\"lazy\" decoding=\"async\"></span><span class=\"ea-mega__t\">Interior &amp; Exterior Detailing</span></a></li><li><a href=\"/ceramic-coating-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6Z\"></path><path d=\"M12 9c1.5 1.8 2.3 3 2.3 4.3A2.3 2.3 0 0 1 12 15.6a2.3 2.3 0 0 1-2.3-2.3C9.7 12 10.5 10.8 12 9Z\"></path></svg></span><span class=\"ea-mega__t\">Ceramic Coating</span></a></li><li><a href=\"/peelable-car-paint-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M4 9 12 5l8 4-8 4-8-4Z\"></path><path d=\"M4 13l8 4 8-4\"></path><path d=\"M15 3c1.5 1 1.5 2.5 0 3.5\"></path></svg></span><span class=\"ea-mega__t\">Peelable Painting</span></a></li><li><a href=\"/car-window-tint-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"4\" y=\"5\" width=\"16\" height=\"12\" rx=\"2\"></rect><path d=\"M7 17 17 7\"></path><path d=\"M11 17 19 9\"></path></svg></span><span class=\"ea-mega__t\">Car Window Tint</span></a></li><li><a href=\"/residential-window-tinting-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M3 10 12 3l9 7\"></path><path d=\"M5 9v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V9\"></path></svg></span><span class=\"ea-mega__t\">Residential Window Tinting</span></a></li><li><a href=\"/office-window-tinting-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"4\" y=\"3\" width=\"16\" height=\"18\" rx=\"1\"></rect><path d=\"M9 21v-4h6v4\"></path><path d=\"M8 7h2M14 7h2M8 12h2M14 12h2\"></path></svg></span><span class=\"ea-mega__t\">Office Window Tinting</span></a></li><li><a href=\"/car-wrapping-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3\" y=\"9\" width=\"6\" height=\"12\" rx=\"1\"></rect><circle cx=\"6\" cy=\"6\" r=\"3\"></circle><path d=\"M9 12h12\"></path><path d=\"M9 17h8\"></path></svg></span><span class=\"ea-mega__t\">Car Wrapping</span></a></li><li><a href=\"/car-body-kit-dubai\"><span class=\"ea-mega__ic\"><img src=\"/wp-content/uploads/service-icons/auto-body-shop-icon.webp\" width=\"24\" height=\"24\" alt=\"\" loading=\"lazy\" decoding=\"async\"></span><span class=\"ea-mega__t\">Car Body Kit</span></a></li><li><a href=\"/car-rust-proofing-dubai\"><span class=\"ea-mega__ic\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"color:#e2242b\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6Z\"></path><path d=\"m9 12 2 2 4-4\"></path></svg></span><span class=\"ea-mega__t\">Car Rust Proofing</span></a></li></ul></div></div></li><li class=\"menu-item nav-item current-menu-item current_page_item active\"><a href=\"/about-us\" class=\"ekit-menu-nav-link\">About</a></li></ul>\n<div class=\"ea-nav__mobile-cta\">\n<a class=\"is-call\" href=\"tel:+971506432144\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1z\"></path></svg><span dir=\"ltr\">Call +971 50 643 2144</span></a>\n<a class=\"is-map\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Al+Quoz+Industrial+Area+2%2C+Dubai\" target=\"_blank\" rel=\"noopener\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg><span>Get Directions</span></a>\n</div>\n";
const ACTIONS_HTML = "<div class=\"ea-hdr__actions\"><a class=\"ea-hdr__whatsapp\" href=\"https://wa.me/971506432144\" target=\"_blank\" rel=\"noopener\" aria-label=\"Chat with us on WhatsApp\"><svg viewBox=\"0 0 448 512\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z\"></path></svg><span>WhatsApp</span></a>\n<a class=\"ea-hdr__call\" href=\"tel:+971506432144\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.8 2.1z\"></path></svg><span dir=\"ltr\">+971 50 643 2144</span></a>\n<a class=\"ea-hdr__map\" href=\"https://www.google.com/maps/search/?api=1&amp;query=Al+Quoz+Industrial+Area+2%2C+Dubai\" target=\"_blank\" rel=\"noopener\" aria-label=\"Find us on Google Maps\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg></a>\n</div>";
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

  const toggleSubmenu = (li) => {
    const mega = li && li.querySelector(".ea-mega");
    if (!mega) return;
    const indicator = li.querySelector(".elementskit-submenu-indicator");
    const isOpen = mega.classList.toggle("elementskit-submenu-panel-open");
    if (indicator) indicator.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

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
            const indicator = e.target.closest(".elementskit-submenu-indicator");
            if (indicator) {
              e.preventDefault();
              toggleSubmenu(indicator.closest("li.elementskit-dropdown-has"));
              return;
            }
            // On mobile the "Services" row's hit area is mostly the link itself,
            // not the small chevron, so a tap there should expand the drawer
            // submenu instead of navigating straight to /services.
            const link = e.target.closest("a.ekit-menu-nav-link");
            const dropdownLi = link && link.closest("li.elementskit-dropdown-has");
            if (dropdownLi && window.matchMedia("(max-width: 1024px)").matches) {
              e.preventDefault();
              toggleSubmenu(dropdownLi);
            }
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            const indicator = e.target.closest(".elementskit-submenu-indicator");
            if (indicator) {
              e.preventDefault();
              toggleSubmenu(indicator.closest("li.elementskit-dropdown-has"));
            }
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
