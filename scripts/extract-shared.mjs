import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const SRC_ROOT = "C:/My Web Sites/webAutos/exoticautoservices.ae";
const SAMPLE = path.join(SRC_ROOT, "about-us", "index.html");

const html = fs.readFileSync(SAMPLE, "utf8");
const $ = cheerio.load(html, { decodeEntities: false });

// ---- shared ea-hdr / ea-ftr style block ----
const hdr = $(".ea-hdr").first();
const sharedStyle = hdr.find("> style").first().html() || "";
fs.writeFileSync(
  path.join("app", "legacy-chrome.css"),
  sharedStyle + "\n",
  "utf8"
);

// ---- header markup (innerHTML, minus its style tag) ----
const hdrClone = hdr.clone();
hdrClone.find("> style").remove();
const hdrInner = hdrClone.html() || "";
fs.writeFileSync(path.join("scripts", "_hdr-inner.html"), hdrInner, "utf8");

// ---- footer markup ----
const ftrInner = $(".ea-ftr").first().html() || "";
fs.writeFileSync(path.join("scripts", "_ftr-inner.html"), ftrInner, "utf8");

// ---- floating widgets: scroll-top, fab, ctabar ----
const scrollTop = $.html($("#ast-scroll-top").first());
const fab = $.html($(".ea-fab").first());
const ctabar = $.html($(".ea-ctabar").first());
fs.writeFileSync(
  path.join("scripts", "_widgets.html"),
  [scrollTop, fab, ctabar].join("\n"),
  "utf8"
);

// ---- body preamble (GTM noscript, ClickCease noscript, skip-link) ----
const preamble = [];
$("body")
  .children()
  .each((i, el) => {
    const $el = $(el);
    if ($el.is("#page")) return false;
    if ($el.is('script[type="application/ld+json"]')) return; // page-specific, not shared
    preamble.push($.html(el));
  });
fs.writeFileSync(
  path.join("scripts", "_preamble.html"),
  preamble.join("\n"),
  "utf8"
);

// ---- body class list (minus page-id specific classes) ----
console.log("body class:", $("body").attr("class"));
console.log("done. shared style bytes:", sharedStyle.length);
