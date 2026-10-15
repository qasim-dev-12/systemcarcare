import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { resolveUrl, rewriteUrls } from "./common.mjs";

const SRC_ROOT = "C:/My Web Sites/webAutos/exoticautoservices.ae";
const APP_ROOT = path.join(process.cwd(), "app");

// Must match the shared style block pulled out in extract-shared.mjs, so we
// never duplicate it into a page's own inline styles.
const SHARED_STYLE = fs.readFileSync(
  path.join("app", "legacy-chrome.css"),
  "utf8"
);

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}

function migratePage(srcRelDir, routeSlug) {
  const srcFile = path.join(SRC_ROOT, srcRelDir, "index.html");
  const html = fs.readFileSync(srcFile, "utf8");
  const $ = cheerio.load(html, { decodeEntities: false });

  const title = decodeEntities($("head > title").first().text() || "");
  const description = decodeEntities(
    $('head > meta[name="description"]').attr("content") || ""
  );
  const ogImage = $('head > meta[property="og:image"]').attr("content") || "";
  const robots = $('head > meta[name="robots"]').attr("content") || "";

  const stylesheetLinks = $('head link[rel="stylesheet"][data-precedence="wp"]')
    .map((_, el) => {
      const href = $(el).attr("href").replace(/\?.*$/, "");
      return resolveUrl(href, srcRelDir);
    })
    .get();

  const ldJsonBlocks = $('script[type="application/ld+json"]')
    .map((_, el) => $(el).html())
    .get();

  const contentOuter = $.html($("#content").first());
  const contentRewritten = rewriteUrls(contentOuter, srcRelDir);

  // Page-specific inline <style> blocks inside #content (Elementor per-widget
  // CSS), excluding the globally-shared ea-hdr/ea-ftr block.
  const $content = cheerio.load(contentRewritten, { decodeEntities: false });
  const pageStyles = $content("style")
    .map((_, el) => $content(el).html())
    .get()
    .filter((css) => css && css.trim() !== SHARED_STYLE.trim());
  $content("style").remove();
  const contentNoStyles = $content("body").html();

  const routeDir = routeSlug === "/" ? APP_ROOT : path.join(APP_ROOT, routeSlug);
  fs.mkdirSync(routeDir, { recursive: true });

  const src = `const STYLESHEETS = ${JSON.stringify(stylesheetLinks)};
const PAGE_STYLES = ${JSON.stringify(pageStyles)};
const LD_JSON = ${JSON.stringify(ldJsonBlocks)};
const CONTENT_HTML = ${JSON.stringify(contentNoStyles)};

export const metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  ${ogImage ? `openGraph: { images: [${JSON.stringify(ogImage)}] },` : ""}
  ${robots ? `robots: ${JSON.stringify(robots)},` : ""}
};

export default function Page() {
  return (
    <>
      {STYLESHEETS.map((href) => (
        <link key={href} rel="stylesheet" href={href} precedence="wp" />
      ))}
      {PAGE_STYLES.map((css, i) => (
        <style key={i} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      {LD_JSON.map((json, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
      <div dangerouslySetInnerHTML={{ __html: CONTENT_HTML }} />
    </>
  );
}
`;

  fs.writeFileSync(path.join(routeDir, "page.js"), src, "utf8");
  console.log(`migrated ${srcRelDir} -> ${routeSlug} (${stylesheetLinks.length} css, ${pageStyles.length} inline style, ${ldJsonBlocks.length} ld+json)`);
}

const PILOT = [
  ["", "/"],
  ["about-us", "about-us"],
  ["contact", "contact"],
  ["bmw/bmw-repair-abu-dhabi", "bmw/bmw-repair-abu-dhabi"],
  ["car-major-services-in-abu-dhabi", "car-major-services-in-abu-dhabi"],
  ["5-reasons-why-car-service-is-important", "5-reasons-why-car-service-is-important"],
  ["car-paint-and-scratch-remover", "car-paint-and-scratch-remover"],
  ["paintless-dent-repair-abu-dhabi", "paintless-dent-repair-abu-dhabi"],
  ["paint-protection-film-abu-dhabi", "detailing/paint-protection-film"],
  ["car-upholstery-mussafah", "car-upholstery-mussafah"],
  ["ceramic-coating-abu-dhabi", "graphene-coating-abu-dhabi"],
  ["car-detailing-mussafah", "car-exterior-detailing-abu-dhabi"],
  ["car-detailing-mussafah", "car-interior-detailing-abu-dhabi"],
  ["ceramic-coating-abu-dhabi", "ceramic-coating-abu-dhabi"],
  ["ceramic-coating-abu-dhabi", "peelable-car-paint-abu-dhabi"],
  ["ceramic-coating-abu-dhabi", "car-window-tint-abu-dhabi"],
  ["car-wrapping-abu-dhabi", "car-wrapping-abu-dhabi"],
  ["ceramic-coating-abu-dhabi", "car-body-kit-abu-dhabi"],
];

for (const [srcRelDir, routeSlug] of PILOT) {
  migratePage(srcRelDir, routeSlug);
}
