# Intake + Thank You Updates

These changes were applied **only** to:
- `intake.html`
- `assets/js/intake.js`
- `thank-you.html`

## What changed

### `intake.html`
- Updated hero headline to: `Start your website build`
- Added reassurance paragraph: “Answer a few quick questions… This takes 2–4 minutes.”

### `assets/js/intake.js`
- Added required **package selection** as the first step:
  - 72-Hour Website
  - Business in a Box
  - Growth Website
- **Removed all file upload fields** (logo/images uploads are no longer present anywhere in the intake flow).
- Added text question instead:
  - “Do you have a logo and brand photos ready?” (placeholder: `Yes / No / Some`)
- Added section headings during the intake flow:
  - Business details
  - Website goals
  - Design preferences
  - Content
  - Your contact info
- Updated labels to lighter wording:
  - Business Summary → “What does your business do?”
  - Audience → “Who is your ideal customer?”
  - Website Goal → “What should your website help you do?”
  - Copy Status → “Do you already have written text for your website? (Testimonials, credentials, services/ business/ organization description, etc.)”
  - Notes → “Anything else you’d like us to know?”
- On the final review/submit screen:
  - Added **Send your logo & photos** email card (with `Email My Files →` button) **before** submit
  - Added reassurance text above submit
  - Upgraded submit button to: `Submit Intake →` with `dc-btn dc-btn-primary`

### `thank-you.html`
- Added “Next step: email your logo & photos” card near the top with:
  - `Email My Files →` mailto button
  - “Back to Home” secondary button

## QA checklist
- ✅ No layout sections were reordered or redesigned
- ✅ No upload inputs remain on the intake flow
- ✅ Package selection is required
- ✅ New copy matches provided wording
