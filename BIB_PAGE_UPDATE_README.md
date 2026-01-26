# Business-in-a-Box Page Edits (business-in-a-box.html)

## Changes applied
- Header nav CTA text updated to **“Start my Site”**.
- Removed the **“Coming soon bundle”** badge and removed favicon/apple-touch icon tags from the page `<head>`.
- Moved the hero content up slightly by reducing `.page-head` top padding and `.ticker` top margin.
- Updated the Business-in-a-Box summary line to: **“4-page website + Domain + Business email setup”**.
- Replaced **all** Business-in-a-Box price mentions on `business-in-a-box.html` with:
  - `<p class="price">$599 setup + $119/month</p>`
  - Added the requested clarity + “Why monthly?” copy under the price using the existing `.small` class.
- Moved the hero **“Start Business in a Box →”** button into the **Bundle pricing** card.
- Ensured **Compare Packages** and **Need it faster?** buttons are side-by-side (two-button row in hero).
- Added the **What’s included** and **Who this is for** headers + subtext *inside* their respective cards (moved existing heading/subhead elements into the cards; no new sections added).
- Stretched the **I’m ready.** callout to full card width and removed its extra Start button so the primary CTA lives in the Bundle pricing card.
- Removed the **Start…** + **See Other Options** button row under “What’s included” (both buttons removed).
- Updated the bottom steps:
  - “Choose 3–5 pages” → **“Choose 4 pages”**
  - “You get two rounds of revisions…” → **“You get one round of revisions…”**

## Files changed
- `business-in-a-box.html`
- `assets/css/styles.css`

## QA checklist
- Layout structure preserved (no section reordering or new components).
- Pricing text is consistent across the page.
- Buttons and CTAs match requested placement.
- No favicon tags remain on this page.
