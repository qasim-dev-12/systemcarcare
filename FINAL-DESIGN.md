# Final Design — Service Page Template Spec

This is the reference spec for building/rebuilding a service page on this site.
It is reverse-engineered from the canonical implementation at
`app/car-rust-proofing-dubai/page.js`, which is the page to copy from when
starting a new one. Don't redesign from scratch — clone that file's structure
and swap content.

## 1. File anatomy

Every service page is a single `page.js` with this exact shape:

```js
const STYLESHEETS = [...];     // shared site-wide hashed CSS files, same list on every page
const PAGE_STYLES = ["...", "...", "..."]; // one or more <style> blocks, page-specific CSS
const LD_JSON = ["...", "...", "..."];     // JSON-LD strings: Organization/WebSite/Breadcrumb+Service+WebPage, LocalBusiness, FAQPage
const CONTENT_HTML = "...";    // the entire visible page body as one HTML string

export const metadata = { title, description, alternates.canonical, openGraph, twitter, robots };

export default function Page() {
  return (
    <>
      {STYLESHEETS.map(...)}
      {PAGE_STYLES.map(css => <style dangerouslySetInnerHTML={{__html: css}} />)}
      {LD_JSON.map(json => <script type="application/ld+json" dangerouslySetInnerHTML={{__html: json}} />)}
      <div dangerouslySetInnerHTML={{ __html: CONTENT_HTML }} />
    </>
  );
}
```

`PAGE_STYLES` can be more than one string — treat each as an additive patch.
When extending an existing page's CSS, append a **new array element** rather
than editing the first giant string; it's far safer than trying to
string-match inside a 50KB minified blob. Later elements render as later
`<style>` tags, so equal-specificity rules in a later element win — use this
to override an earlier rule (e.g. a page-specific hero background) without
touching the original text.

Because `CONTENT_HTML` is one long escaped JS string, never hand-edit it
in place. Work in a scratch `.html` file with real characters, then splice it
back in with a small Node script that does
`lines[3] = "const CONTENT_HTML = " + JSON.stringify(html) + ";"`. Same for
the CSS array and the LD_JSON array (parse with `new Function("return "+rhs)`,
edit the object, `JSON.stringify` back).

## 2. Design tokens

Defined per-page inside `.ea-page{...}` at the top of `PAGE_STYLES[0]`:

```
--ea-lime:#e2242b      accent red (buttons, highlights, icons)
--ea-lime-hi:#ff4d4d   accent red hover state
--ea-green:#b01e24     secondary deep red (light-section accents, borders)
--ea-green-hi:#8c171c
--ea-green-soft:#fbeaea
--ea-green-line:#f0c9c9
--ea-ink:#0b0d0c       near-black background (hero, dark sections)
--ea-text:#4a504c      body text on light sections
--ea-head:#141815      headings on light sections
--ea-mute:#7a827c
--ea-line:#e3e8e4      hairline borders on light sections
--ea-soft:#f5f7f5      light section background
--ea-amber / --ea-amber-soft / --ea-amber-line   disclaimer/caution boxes
--ea-radius:16px       card corner radius
--ea-sec-y:76px / --ea-sec-y-tight:56px   vertical section padding (drives all spacing)
font-family: Montserrat, "Segoe UI", Arial, Helvetica, sans-serif
```

The global header/nav (`app/components/Header.js` + `app/legacy-chrome.css`)
uses a **separate** token set prefixed `--eas-*` (lime, white, text, panel,
line, wrap). Don't mix the two systems — page body uses `--ea-*`, chrome uses
`--eas-*`.

Color rule of thumb: dark sections (`.ea-sec--dark`, `.ea-hero`, `.ea-sec--deals`)
use `--ea-lime` for accents; light sections use `--ea-green`.

## 3. Section inventory (in the order they appear on the reference page)

Copy-paste the matching section block from `car-rust-proofing-dubai`, swap
copy/images, keep the classes.

1. **Hero** — `.ea-hero > .ea-hero__stage > .ea-hero__wrap > [.ea-hero__copy, .ea-hero__media]`
   - Kicker, `<h1 class="ea-h1 ea-h1--long">` with `<span class="ea-h1__a">` (white,
     small), `<span class="ea-h1__b">` (red, huge — the emphasis word), `<span
     class="ea-h1__c">` (white, medium tail). This a/b/c color rhythm is fixed
     site-wide; don't reassign which span is red.
   - `.ea-hero__lead` paragraph.
   - `.ea-hero__feats` — 2×2 grid of 4 checkmark+label chips (plain icon list,
     no card background).
   - `.ea-hero__loc` — small pin + address line.
   - `.ea-hero__media > img.ea-hero__car` — the hero photo, masked on the left
     edge. Carries the Ken Burns zoom animation (`eaKenBurns`, 16s
     ease-in-out infinite alternate, scale 1→1.07). `.ea-hero` has
     `overflow:hidden` so the zoom can't bleed past the section.
   - `.ea-hero__badges` — 2-3 stacked pill badges top-right over the photo,
     slide-in on load (`eaBadgeIn`, staggered 0.2/0.35/0.5s delays).
   - `.ea-hero__live` — small pulsing-dot "At Work in [location]" pill,
     bottom-left over the photo. Dot pulses continuously (`eaPulseDot`).
   - Below the wrap: centered `.ea-ctapair` with `.ea-btn--wapill` (WhatsApp,
     green) + `.ea-btn--callpill` (Call, red) — both have the built-in
     floating bob animation (`eaBtnFloat`) already in the shared CSS.
   - **Mobile (<900px):** `.ea-hero__media` is hidden entirely and
     `.ea-hero__stage` switches to a `background: url(...) no-repeat center
     top/cover`. **This URL must point to a real photo of this page's own
     service** — never copy a sibling page's mobile hero URL. (This exact bug
     shipped on the rust-proofing page — a leftover ceramic-coating image —
     and was only caught by an actual mobile screenshot, not by code review.)
     If you don't have a portrait-cropped asset, reuse the same hero photo
     with `cover` + a sensible `center <y>%` position; don't leave a
     mismatched URL in place.

2. **Intro** (`.ea-sec--soft.ea-sec--introonly`) — kicker/h2/lead + a single
   row of 4 pill chips (`.ea-oils`, white rounded pills with check icon) naming
   the core sub-services. Optional but used on the reference page.

3. **Solutions / types grid** (`.ea-incl.ea-cols3`) — `.ea-incl__card` tiles:
   icon ring (`.ea-incl__ring`, 46px, colored by `--ea-green`) + title + 1-2
   sentence description. Use a **different icon per card** — reusing the same
   checkmark for every tile (an early draft of this page did that) reads as
   lazy. 6-9 cards is the sweet spot; `ea-cols3` wraps cleanly at any multiple
   of 3.

4. **Who may benefit** (`.ea-sec--soft.ea-sec--introonly`) — same kicker/h2/lead
   + `.ea-oils` pill pattern as the intro, listing applicable vehicle types.
   Optional, include when the service has broad vehicle-type applicability.

5. **Why it matters / key benefits banner** (`.ea-sec--deals`) — the dark
   red-gradient band. Centered kicker/h2/lead, then `.ea-offers.ea-cols3`:
   `.ea-offer` cards (icon chip + small uppercase eyebrow label + bold red
   value line). 6 items, 2 rows of 3.

6. **Process** (`.ea-sec--dark`, `.ea-steps` grid, `repeat(4,1fr)`) — numbered
   steps, **8 is the standard count** (inspect → photograph/document → clean
   → mask → treat → apply → cure/quality-check → aftercare). Each `.ea-step`
   gets a real workshop photo (`.ea-step__photo`, 533×464 aspect, object-fit
   cover) above the numbered circle.
   - `.ea-step` has `overflow:hidden;border-radius:12px` so the photo can
     zoom on hover (`transform:scale(1.06)` via `.ea-step:hover
     .ea-step__photo`) without bleeding past its rounded corners.
   - **Photo selection rule: every process-step photo must show a real
     technician actually doing something** — not an empty car on a lift.
     Check each candidate image before using it; this page has a known
     off-brand/people-less asset
     (`jaguar-suv-underbody-service-dubai.webp`, green lift, wrong
     sub-brand) that must **not** be used in new pages.
   - With only a handful of real photos for a service, it's fine to reuse
     them across steps — just never repeat the same photo in two
     horizontally- or vertically-adjacent grid cells (check the 4-column
     grid math: positions `i` and `i+1` in the same row, and `i` and `i+4`
     in the same column, must differ).

7. **Gallery / recent work** (`.ea-sec--soft`, `.ea-row.ea-gallery`) — 4+
   real photos, `figure > img + figcaption`. Mobile breakpoint turns this
   into a horizontally-scrolling snap carousel (`overflow-x:auto`,
   `scroll-snap-type:x mandatory`, items at `flex:0 0 84%`) — this is
   intentional, not a layout bug; don't "fix" it into a wrapping grid.
   Caption format: `Vehicle Model &middot; What Was Done`. Followed by a
   centered `.ea-ctapair` (WhatsApp + Call).

8. **Why choose us** (`.ea-sec`, `.ea-benefits` 2-column list) — icon +
   title + 1-sentence proof point, 6 items. Has a subtle hover
   `translateX(4px)` nudge.

9. **Benefits / disclaimer** (`.ea-sec--soft.ea-sec--introonly`, optional) —
   kicker/h2/lead followed by a small amber box
   (`background:var(--ea-amber-soft);border:1px solid var(--ea-amber-line)`)
   with one honest caveat sentence (e.g. "results depend on X; no treatment
   can guarantee Y"). Keep this to one short paragraph — it's a liability
   safety net, not the page's main voice.

10. **FAQ** (`.ea-sec--soft`, `.ea-faqs`, native `<details>/<summary>`) — 5-6
    questions, first one `open`. Keep the **FAQPage JSON-LD in sync** with
    whatever is actually rendered in this section — mismatched structured
    data is a real SEO defect, not cosmetic.

11. **Final CTA** (`.ea-sec--tight`, `.ea-final`) — heading, one paragraph,
    Call (`ea-btn--lime`) + WhatsApp (`ea-btn--ghost`) buttons, then
    `.ea-nap` (address / hours / phone) and a terms line.

## 4. Copy tone

Confident, benefit-driven marketing language ("Keep your car stronger,
safer and lasting longer") — not hedged/legal-safe phrasing ("may be
suitable", "results depend on..."). Keep exactly **one** honest caveat
(section 9 above) rather than qualifying every sentence. Match the
established site voice for claims like "Certified technicians" — these
phrases already appear elsewhere on the site, so reuse them rather than
inventing new unverifiable claims (e.g. don't add "100% customer
satisfaction" — it isn't used anywhere else on the site).

## 5. Images

- **Real photos only.** Never caption a stock/generic image as if it were a
  specific customer project (e.g. don't invent "Ford F-150 rust-proofing"
  captions if no such photo exists in `public/wp-content/uploads`).
- Before using any candidate photo, open it and confirm what it actually
  shows — alt text and filenames can be misleading (see the
  `jaguar-suv-underbody-service-dubai.webp` case above).
- Gallery/process images: 533×464 (object-fit: cover). Hero: 825×628
  desktop. Always set explicit `width`/`height` attributes matching the real
  asset to avoid layout shift.
- `loading="lazy" decoding="async"` on every below-the-fold image; the hero
  image gets `fetchpriority="high"` instead.

## 6. Icons

Inline SVG, `viewBox="0 0 24 24"`, `fill="none" stroke="currentColor"
stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"`, colored
via `style="color:#e2242b"` when outside a context that already sets the
color. Use a **different glyph per concept** (shield, droplet, layers,
package, warning-triangle, clock, sun, car, etc.) — don't reuse the generic
checkmark-circle for everything; it's fine for repetitive pill lists
(`.ea-oils`) but not for a grid of cards meant to look distinct.

## 7. Animation conventions

- **Scroll reveal/stagger**: add `data-au-anim="reveal"` to section headers
  (`.ea-head`) and `data-au-anim="stagger"` to the list/grid that follows.
  This is handled by the site's existing IntersectionObserver engine — no
  new JS needed, just the attribute.
- **Hero Ken Burns**: `.ea-hero__car{animation:eaKenBurns 16s ease-in-out
  infinite alternate}` — slow continuous zoom, 1 → 1.07 scale.
- **Hero badge entrance**: `.ea-hero__badge{animation:eaBadgeIn .5s ease
  both}` with staggered `animation-delay` per badge (0.2s, 0.35s, 0.5s),
  sliding in from the right.
- **"At work" live indicator**: `.ea-hero__live` fades up once
  (`eaFadeUp`), its dot (`.ea-hero__live-dot`) pulses forever
  (`eaPulseDot`, a `box-shadow` ring expand/fade — cheaper than animating
  `transform` + `opacity` separately).
- **Process photo hover zoom**: `.ea-step:hover .ea-step__photo{transform:
  scale(1.06)}`, clipped by the parent's `overflow:hidden`.
- **Gallery hover zoom**: already built into the shared CSS
  (`.ea-gallery figure:hover img{transform:scale(1.05)}`) — don't duplicate.
- **CTA button float**: `.ea-btn--wapill` / `.ea-btn--callpill` already
  bob continuously (`eaBtnFloat`) — don't add a second animation on top.
- **Always** wrap new animations in a
  `@media (prefers-reduced-motion:reduce){ ... {animation:none} ...
  {transition:none} }` block. Every addition above does this.

## 8. Mobile / responsiveness

Breakpoints used throughout (narrowest-relevant wins, mobile-first isn't
used — these are all `max-width` overrides):

| Width | What changes |
|---|---|
| 1180px | 5-col grids → 3-col; brand grid → 4-col |
| 1080px | booking form → 2-col |
| 1024px | USP strip wraps to rows; services grid → 2-col; steps → 2-col; shop/why-grid stack to 1 col |
| 900px | **Hero media is replaced by a CSS background-image**; hero copy becomes a single flex column; section vertical padding shrinks (`--ea-sec-y:52px`) |
| 760px | Most `--cols` grids collapse to 1; gallery becomes a horizontal snap carousel; benefits list → 1 col |
| 620px | Last few 2-col grids (`.ea-incl`, hero feature chips) → 1 col |

**Verification is mandatory, not optional** — code review alone missed the
wrong-mobile-hero-image bug; only an actual Playwright screenshot at a phone
viewport (390×844) caught it. Before calling a page done:
1. `npx next build` must compile clean (ignore the unrelated Next.js
   version-upgrade nag if present).
2. Screenshot the full page at a mobile viewport (390px) and at desktop
   (1400px) and actually look at them, section by section — don't just
   check for horizontal overflow. Check `document.documentElement.scrollWidth
   === window.innerWidth` for true page-level overflow (an individual
   carousel's `scrollWidth` being larger than the viewport is expected and
   not a bug).
3. Hover-state screenshots for anything with a new hover animation.

## 9. Header / navigation / sitemap

Every new service page has to be wired into **three** places, not just
created. Missing any of these means the page exists but nothing links to it
(or search engines never find it):

1. **`app/components/Header.js`** — holds three top-level mega-menu
   dropdowns — **Car Painting**, **Car Protection**, **Car Accessories** —
   each an `<li class="menu-item nav-item menu-item-has-children
   elementskit-dropdown-has">` containing `.ea-mega.ea-mega--services >
   .ea-mega__in > ul.ea-mega__grid .ea-mega__grid--{3|4|5}`. Add the new
   page's link to whichever of the three category dropdowns it belongs to
   (reuse an existing icon pattern: `<img>` for items that have a
   `/wp-content/uploads/service-icons/*.webp` asset, inline SVG otherwise).
   Often the menu item **already exists** but points at a placeholder page
   (e.g. a generic sibling page, or `/contact`) because the dedicated page
   hadn't been built yet — search for the exact `<span
   class="ea-mega__t">Item Name</span>` text first and just repoint its
   preceding `href`, rather than assuming you need to add a new `<li>`. Be
   careful: several unrelated menu items can share the same placeholder
   href — only touch the one whose link text matches.
2. **`app/page.js`** (homepage) — the services section has a card per
   service (`<a href="..."><span class="ea-hmsvc__shot"><img ...></span>
   <span class="ea-hmsvc__b"><h3>Service Name</h3><p>...</p></span></a>`).
   Find the card by its `<h3>` text and repoint that anchor's `href` to the
   new page. Same placeholder caveat as above — check what it currently
   points to before assuming it's already correct.
3. **`app/sitemap.js`** — add `{ path: "/new-page-slug", priority: 0.7–0.8,
   changeFrequency: "monthly" }` to the `routes` array, grouped near other
   car-care service routes. Service pages use 0.8; narrower/secondary pages
   use 0.7.

If a sub-item genuinely has no page yet (out of scope for the current task),
point it at the closest existing page rather than letting it 404 — and say
so explicitly when reporting the change, since that's a placeholder, not a
finished link.

## 10. Build checklist for a new page

1. Copy `app/car-rust-proofing-dubai/page.js` as the starting point.
2. Swap `STYLESHEETS` only if the new page needs a CSS file the reference
   page doesn't use (usually not).
3. Rewrite `LD_JSON`: Organization/WebSite stay as-is, update
   BreadcrumbList/Service/WebPage URLs+names, update FAQPage to match the
   real FAQ section.
4. Rewrite `CONTENT_HTML` section by section per §3 above, using only real
   photos (§5) and distinct icons (§6).
5. Add the animation layer from §7 (it's mostly copy-paste CSS + the right
   class names in the markup).
6. Update `metadata` (title/description/canonical/OG/Twitter).
7. Wire the page in per §9: `Header.js` mega-menu link, the homepage
   `app/page.js` service card link, and `app/sitemap.js`.
8. Run `npm run lint` on every file you touched, then `npm run build` — both
   must pass clean before the verification pass in §8.
9. Run the verification steps in §8. Don't report the page done without a
   mobile screenshot.
