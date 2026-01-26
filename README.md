# .com — 4‑Page Static Website (GitHub Pages Ready)

This project is a clean, modern, tech‑forward 4‑page static site for the **.com** brand:

- Home (`index.html`)
- New Year’s Deal (`deal.html`) — **only page that shows pricing**
- Services (`services.html`)
- Contact (`contact.html`)

## Project structure

```
/
  index.html
  deal.html
  services.html
  contact.html
  assets/
    css/
      styles.css
    js/
      main.js
    images/
      logo-wordmark.png
      logo-mark.png
      favicon-32.png
      favicon-16.png
      apple-touch-icon.png
      icon-192.png
```

## Notes

- The Contact form is **static** and uses a small JavaScript handler to show a confirmation message (no backend).
- To make the form send email or store submissions, connect it to a form provider (e.g., Formspree, Basin, Netlify Forms) or your own endpoint.
- CTA buttons use a solid teal color, and gradients are only used as subtle background accents.

## Deploy to GitHub Pages

1. Create a new GitHub repository (public or private).
2. Upload the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`) / `(root)`
5. Save. GitHub Pages will publish your site.

## Edit the site

- Update content directly in the HTML files.
- Global styles live in `assets/css/styles.css`.
- Interactions (tabs, drawer, contact confirmation) are in `assets/js/main.js`.
- Replace logos in `assets/images/` if needed (keep filenames the same to avoid link changes).


## Homepage modification log (requested)
- Removed the decorative homepage hero image and its associated right-side panel that were creating the large blank/white area beneath the ticker.
  - Location: `index.html` inside `<section class="hero">` (`<aside class="hero-panel">…</aside>` and `<img class="hero-art">`).
- Removed the extra top padding on the first section after the hero so content starts immediately after the ticker.
  - Location: `index.html` first `<section class="section">` (`style="padding-top:0;"`).
- Added homepage-scoped CSS overrides to eliminate remaining hero spacing.
  - Location: `assets/css/styles.css` (`body.home …` overrides).

- Added a new homepage image directly below the ticker.
  - Location: `index.html` inside `<section class="hero">` (added `<img class="hero-art" src="assets/images/home-image-1.png">`).
  - Asset: `assets/images/home-image-1.png`.
  - Spacing: `assets/css/styles.css` (`body.home .hero .hero-art { margin-top: 16px; }`).


## Recent modifications (site-wide)
- Header: added tagline “The part of the internet that matters” directly under the logo.
- Footer: reduced vertical padding/spacing, removed all “Typeform” branding, moved the same tagline under the logo, and updated the brand description copy.

## Services page modification log (requested)

- Removed stray placeholder text: “Illustrative image for the Packages page”.
- Moved the “Pick your stage, we’ll handle the build” bubble above the “Choose the website package…” header and aligned its icon + text inline.
- Adjusted the “Most Popular” badge spacing on the Business Launch (BIB) card to align card content more closely with the other package cards.
- Updated the Quick Launch package:
  - Title changed to “Quick Launch Website”.
  - Added line under the title: “Also known as “72-Hour Website” — get online fast.”
  - CTA button text updated to “Start Quick Launch”.
