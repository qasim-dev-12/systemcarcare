import fs from "fs";
import * as cheerio from "cheerio";

const file = "app/page.js";
const src = fs.readFileSync(file, "utf8");

function findJsonStringSpan(text, declPrefix) {
  const declIdx = text.indexOf(declPrefix);
  if (declIdx === -1) throw new Error(`declaration not found: ${declPrefix}`);
  const valueStart = declIdx + declPrefix.length; // index of opening "
  if (text[valueStart] !== '"') throw new Error("expected opening quote");
  let i = valueStart + 1;
  while (i < text.length) {
    if (text[i] === "\\") {
      i += 2;
      continue;
    }
    if (text[i] === '"') {
      return { valueStart, valueEnd: i + 1 }; // includes closing quote
    }
    i++;
  }
  throw new Error("closing quote not found");
}

const declPrefix = "const CONTENT_HTML = ";
const { valueStart, valueEnd } = findJsonStringSpan(src, declPrefix);
const jsonLiteral = src.slice(valueStart, valueEnd);
const html = JSON.parse(jsonLiteral);

const $ = cheerio.load(html, { decodeEntities: false });

const $heading = $("#ea-home-rev-h2");
if ($heading.length === 0) throw new Error("reviews heading not found");
const $section = $heading.closest("section");
if ($section.length === 0) throw new Error("reviews section not found");

// Kicker: "Verified Google reviews" -> "Customer reviews"
$section.find(".ea-kicker").first().text("Customer reviews");

// Score line: drop the Google "G" logo icon, keep the number + stars.
const $revhead = $section.find(".ea-revhead").first();
$revhead.find("svg.ea-proof__ico").remove();
$revhead.find("svg.ea-revhead__stars").attr("aria-label", "Rated 4.5 out of 5");

// Lead line: drop the "Google" attribution wording.
$section
  .find(".ea-lead")
  .first()
  .text("Rated 4.5 out of 5 from 741 verified customer reviews.");

// Per-review meta: "X ago on Google" -> "X ago"
$section.find(".ea-rev__meta").each((_, el) => {
  const $el = $(el);
  $el.text($el.text().replace(/\s*on Google\s*$/i, ""));
});

// Track aria-label referenced Google explicitly.
$section
  .find("[data-au-carousel-track]")
  .attr("aria-label", "What our customers say");

// Drop the "Read All Reviews on Google" CTA (external Google Maps deep link).
$section.find(".ea-revcta").remove();

const updatedHtml = $("body").html();

const updatedJsonLiteral = JSON.stringify(updatedHtml);
const result =
  src.slice(0, valueStart) + updatedJsonLiteral + src.slice(valueEnd);

fs.writeFileSync(file, result, "utf8");
console.log("reviews section updated, new file length", result.length);
