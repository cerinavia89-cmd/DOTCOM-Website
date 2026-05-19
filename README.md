# Dotcom Online Landing Page — Requested Edits Applied

Edits were applied **only** to the existing landing page files (no redesign / no new sections / no navigation logic changes).

## Files changed
- `index.html`
- `assets/css/main.css`
- `assets/img/dotcom Logo.png` (cropped to remove extra transparent whitespace)

## Applied changes

### 1) Blue CTA section (newsletter)
- Replaced the previous 3-line CTA copy with:
  - **Your business deserves a page that works**
  - Let Dotcom Online handle the setup so you can focus on your customers and growth.
- Copy remains centered and the blue background styling is preserved.

### 2) Contact form section (below the blue CTA)
- Moved the contact form closer to the blue CTA by reducing excess top padding (kept comfortable spacing).
- Added **Phone Number** field.
- Made **all fields required**:
  - Name, Business Name, Email, Phone Number
  - Landing Page Type (dropdown)
  - Subscription Plan (dropdown)
  - Goal/message (textarea)
- Updated dropdown placeholders and options:
  - **Landing Page Type** (placeholder only) → Basic Landing Page / Premium Landing Page / Not Sure Yet
  - **Subscription Plan** (placeholder only) → Essential Care / Active Growth / Not Sure Yet
- Adjusted form structure so the submit button + note are centered and the form reads more balanced.

### 3) Right blue panel (split section with image on the left)
- Converted the 3 value items into **3 centered blocks with icons** (same Material Icons set used elsewhere on the page).
- Ensured each value item is centered (icon → heading → supporting text) and evenly spaced.
- Centered the **Get My Landing Page** button beneath the value items.
- Kept the left image and the blue panel background intact; mobile stacking remains clean.

### 4) Hero + header updates
- Hero section:
  - Removed the hero **Get My Landing Page** button.
  - Kept **See Plans** and removed the leftover offset so it aligns cleanly to the left.
- Hero form:
  - Updated to match the contact form field set:
    Name / Business Name / Email / Phone Number / Landing Page Type / Subscription Plan / Goal-message
  - Made all hero form fields required and applied the same dropdown placeholder/option rules.
- Header:
  - Resized the header “Get My Landing Page” CTA to match nav link scale (subtle pill outline, no oversized block).
  - Doubled the perceived logo size **without increasing header height** by cropping transparent whitespace and scaling via CSS.

## QA checklist (passed)
- No unintended layout reordering or new components added.
- Blue CTA copy matches requested text and is centered.
- Both forms include the same required fields + dropdown placeholder rules.
- Story right blue panel uses icons and centered value blocks; CTA remains visible and centered.
- Header CTA button is no longer oversized; logo appears ~2x larger without stretching the header.
- No horizontal scrolling introduced on mobile.


## v4 Updates (Requested fixes)
- Header logo: adjusted vertical alignment with nav links/button.
- Contact form dropdowns: set consistent form-control height/padding to prevent clipped text.
- Footer: removed social icons, added a single "Policies" link; reduced footer padding; doubled footer logo size and scaled brand/tagline.
- Meet the designer section: added blue background behind heading and single designer card.


## v5 Updates (April 2026)
- Header: adjusted logo vertical alignment to sit inline with nav links/CTA.
- Copy: replaced occurrences of “build/built/builds/building” with “design/designed/designs/designing”; updated specific requested phrases.
- Buttons: increased subtext/readability under buttons (e.g., form notes and hero subtext).
- Pricing: updated heading to “Choose your landing page & Subscription”; removed large “$40/mo” from Monthly Plans; reformatted tiers with added spacing and removed checkmarks from tier titles; vertically centered pricing card content on desktop.
- Meet the designer: removed the white card treatment so content sits directly on the blue section; ensured text contrast.
- Footer: reduced footer logo size by ~35%.
- Forms: improved select styling so dropdown text is not clipped.

- Images: replaced hero background image; replaced Story split-section left image; replaced How it works section image.
- Story split-section: ensured full section background remains blue and vertically centered right-panel content on desktop.


### Hero overlay + form transparency
- Added a transparent blue overlay over the hero background image to improve text readability.
- Made the hero contact form background slightly transparent so the background image tiles are subtly visible behind the form.


## v9 updates
- Replaced the Meet the designer photo with the uploaded headshot and centered it within the circular crop.
- Updated the hero typed copy from "built to convert" to "designed to convert."
- Added Additional Services checkboxes to both forms and converted the lower contact form to a one-column layout.
- Updated Premium Landing Page pricing/copy and expanded the Care Plans card content.
- Enlarged and centered the How it works image, and aligned footer brand elements more cleanly.

---

## Update (v10) — Stacked, staggered pricing decks

### Files changed (v10)
- `index.html`
- `index-particles.html` (kept in sync)
- `assets/css/main.css`
- `assets/js/main.js`

### What changed (v10)
- Replaced the flat pricing cards in the **Landing Page / Subscription** section with **three stacked “deck-style” card groups**:
  1) Landing Pages (Basic + Premium)
  2) Add-ons & Bundles (7 cards)
  3) Launch + Maintenance Plans (Essential Care + Active Growth)
- Added staggered layering (diagonal offsets + depth shadows). Only the top card is fully readable; others peek behind.
- Added hover/tap cycling interaction:
  - Desktop: hover cycles the top card to the back
  - Mobile: tap cycles forward
  - Smooth transform-based animation (~0.52s) using minimal JS
- Updated care plan pricing to **$40/mo** (Essential Care) and **$60/mo** (Active Growth) per spec.
- Removed the old “Additional services” footnote line (services are now shown as a dedicated stack). Kept the monthly subscription note.

### QA gate (v10)
- ✔ No layout changes outside `#price`
- ✔ Deck styles are scoped to `#price` to avoid side effects
- ✔ No branding/typography system changes outside the subscription section


## v11 follow-up tweaks

### 1) Pricing decks: cleaner separation + title spacing
- Converted the deck column wrapper to a flex layout (scoped to `#price`) with controlled gaps so stacked layers **don’t overlap into neighboring stacks**.
- Increased spacing between each stack title and its card deck.
- Slightly reduced the “toss” motion on cycle so the stack interaction stays contained.

### 2) Contact forms: “Add-ons” multi-select dropdown (2 forms)
- Updated the Dotcom contact forms to replace **“Additional Services”** with **“Add-ons”**.
- Replaced the old inline checkboxes with a **dropdown menu containing checkboxes** (multi-select).
- Removed the standalone Domain / Business Email checkbox area and included those options inside the Add-ons dropdown.

### Files changed (v11)
- `index.html`
- `index-particles.html`
- `assets/css/main.css`
- `assets/js/main.js`

### QA gate (v11)
- ✔ No layout changes outside `#price` and the specified contact form fields
- ✔ Deck spacing prevents stacks from visually intruding into adjacent columns
- ✔ Add-ons dropdown is minimal JS + transform-friendly, consistent styling

## v12
- Fixed JS syntax error in assets/js/main.js that prevented page from finishing load (preloader never dismissed).
- Corrected preloader spinner selector.


---
## v13 Updates (Choose your setup + deck spacing + add-ons updates)
- Updated pricing section heading to **“Choose your setup”**.
- Increased spacing between the three deck stacks and tightened deck sizing to prevent stacks overlapping each other.
- Added more space between each stack title and its cards.
- Updated Add-ons & Bundles offer cards:
  - Removed **Payment Processor Setup** card
  - **Add-A-Page** is now **$75** (removed e-commerce option)
  - **Business Setup Bundle** monthly add-on updated to **$5/month**
  - **E-Com Bundle** renamed to **Website Starter Bundle** and updated to **$90** (removed payment/max-products text)
- Contact forms: updated Add-ons dropdown options to match the new offers and aligned checkbox + label rows.

Files modified in v13:
- `index.html`
- `index-particles.html`
- `assets/css/main.css`
- `assets/js/main.js`


---

## v14 (May 2026) – Alignment polish
- Pricing/Setup stacks: switched the deck container to a 3-column grid on desktop so all stacks stay aligned horizontally with consistent spacing (no touching/overlap).
- Add-ons dropdown (both forms): fixed checkbox alignment by overriding Bootstrap inline checkbox positioning; added consistent spacing between checkbox and label.
- How it works: centered the right-side tiles image and increased perceived size via CSS scale/translate while keeping the section dimensions unchanged.
- Hero: reduced the “See Plans” subtext size to better match the form note.

## v15
- Standardized button subtext sizing to match the pricing note.
- Swapped the images between the How It Works and Story (Get Started) sections.
- Updated Add-ons deck: Pop-up Offer Feature price changed to $25.
- Footer: Policies link now points to new policies.html and added FAQ's link to new faqs.html.
- Added new pages: policies.html (Terms of Service, Privacy Policy, Refund Policy) and faqs.html.


## v16 updates
- Matched hero button subtext sizing to the "Start My Page" form note text.
- Adjusted the How it works right-panel image so the full tile image remains visible without being cut off.
- Rebuilt the Clients Trust Us section to use only the Trustworthy Solutions and Calista Worldwide logos, cropped and recolored to navy for cleaner display.
- Replaced placeholder testimonials with the provided client reviews and company names (no portrait image used).


## v17 updates
- Reduced the hero button subtext by 25%.
- Centered and increased the How it works right-panel image size by ~25% while keeping it fully visible.
- Removed the client ticker logo strip (owl-clients) from the Clients Trust Us section.
- Updated Policies/FAQ pages so the Home nav link goes to index.html.
- Forced the footer FAQ link color to white.


## v18 updates
- Fixed Home nav link behavior on Policies and FAQ pages (removed scroll intercept and set brand/home to index.html).
- Centered the How it works image and increased size while keeping it fully visible.
- Reduced hero CTA subtext size by 50%.
- Removed any remaining client logo ticker markup and guarded the carousel init.
- Updated testimonial pagination dots to navy.


## v19 updates
- Forced hero "See Plans" subtext to render at 50% smaller size (overriding the hero body copy rule).
- Shifted the How it works image slightly right on desktop to create more space from the text while keeping it centered vertically.
- Restored Policies/FAQ Home nav link color to brand blue.


## v20 updates
- Set both contact form "Start My Page" subtext notes to 9px and navy.
- Centered the How it works image in the right panel and increased spacing from the left text column.


## v21 updates
- Added $0 Design Offer modal popup (shows once per session after 4 seconds) with overlay, close controls, and offer form.


## v22 updates
- Updated offer modal copy to "$0/design with launch + maintenance plan payment & sign up.".
- Replaced offer modal Add-ons <select> with a checkbox multi-select dropdown (supports multiple selections).


## v23 updates
- Offer modal add-ons dropdown: reduced checkbox size and aligned option text to the right of each checkbox.
- Prevented offer modal text input styling from applying to checkbox inputs.


## v24 updates
- Offer modal add-ons list updated: removed Payment Processor Setup and E-Com Bundle; added Website Starter Bundle.
- Fixed hero form add-ons dropdown checkbox alignment/sizing (override signup-form input styles).


## v25 updates
- Added “Website Starter Bundle” option to the Offer Modal add-ons multi-select (previously missing).


## v26 updates
- Confirmed the offer modal add-ons menu includes “Website Starter Bundle”.
- Center-aligned the footer brand block (logo + Dotcom Online + tagline) without changing layout.


## v27 updates
- Adjusted header alignment so the logo and nav links sit horizontally aligned with the “Get My Landing Page” CTA button (moved logo/links down only).


## v28 updates
- Header: aligned the logo, nav links, and “Get My Landing Page” button on the same horizontal row using alignment rules (removed offset-based positioning).


## v29 updates
- Header: resized the .com logo in the navbar and constrained its height so it aligns cleanly with the nav links and “Get My Landing Page” button (alignment only).


## Follow-up adjustments (Hero + Pricing alignment)
- **Hero form fixed and aligned**
  - Restored proper `<form>` wrapper for the hero form (it previously had a closing `</form>` without an opening tag).
  - Wrapped the hero form in a `col-md-8 col-md-offset-2` container (`.hero-form-wrap`) so its width matches the hero text column (no full-width stretching).
- **Hero button subtext**
  - Confirmed: “No tech skills needed. We handle everything.” sits directly under the **See Plans** button.
- **Pricing cards alignment / spacing**
  - Disabled the “deck stack” overlay behavior by removing `data-deck-stack` attributes so all pricing cards display normally (no overlap).
  - Widened pricing columns/stacks for easier viewing and removed decorative stack layers when not active.
