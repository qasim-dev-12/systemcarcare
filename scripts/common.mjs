import * as cheerio from "cheerio";

// Resolves an href/src found in a page at `slugPath` (e.g. "about-us" or
// "bmw/bmw-repair-abu-dhabi", "" for site root) against the site root, the
// same way a browser would given the original relative path, then collapses
// the HTTrack "index.html" suffix into a clean route.
export function resolveUrl(raw, slugPath) {
  if (!raw) return raw;
  if (/^(https?:|mailto:|tel:|#|data:)/i.test(raw)) return raw;
  const base = `http://_/${slugPath}${slugPath ? "/" : ""}`;
  let pathname;
  try {
    pathname = new URL(raw, base).pathname;
  } catch {
    return raw;
  }
  if (pathname.endsWith("/index.html")) {
    pathname = pathname.slice(0, -"index.html".length);
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
  }
  return pathname === "" ? "/" : pathname;
}

// Rewrites every href/src in an HTML fragment from HTTrack-relative to
// root-absolute, given the fragment's original folder depth (slugPath).
export function rewriteUrls(html, slugPath) {
  const $ = cheerio.load(html, { decodeEntities: false });
  $("[href]").each((_, el) => {
    const $el = $(el);
    $el.attr("href", resolveUrl($el.attr("href"), slugPath));
  });
  $("[src]").each((_, el) => {
    const $el = $(el);
    $el.attr("src", resolveUrl($el.attr("src"), slugPath));
  });
  // cheerio wraps fragments in html/body; pull the body's inner html back out
  return $("body").html();
}
