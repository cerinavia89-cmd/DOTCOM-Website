MODIFICATIONS — Restore original layouts + Formspree endpoints

Goal (per request):
- Return New Year Deal intake + Contact forms to their previous layouts
- Keep Formspree submission endpoints
- Redirect to /thank-you.html after submit for both forms
- No layout/structure changes

Changes made:
1) contact.html
   - Restored original form markup/layout (from provided site version)
   - Updated form action to https://formspree.io/f/xlgjadre
   - Updated field "name" attributes to: Name, Email, Message (Formspree field labels)
   - Replaced hidden _next with hidden _redirect="/thank-you.html"
   - Added hidden _gotcha spam trap (display:none)

2) assets/js/newyear-intake.js
   - Kept the guided questionnaire UX/layout intact
   - Updated final submission form action to https://formspree.io/f/xlgjaeye
   - Added hidden form_type="New Year Deal Intake — .com"
   - Updated redirect to hidden _redirect="/thank-you.html"
   - Added hidden _gotcha spam trap (display:none)
   - Updated hidden _subject to "CLIENT WEBSITE BRIEF — .com"
   - Updated per-field labels sent to Formspree to match the requested embed labels

QA checklist:
- Verified newyear-intake.html uses the original container where questions are injected.
- Verified contact.html form wrappers/classes/button remain unchanged visually (only attributes + hidden fields).
- Verified no sections were moved, resized, or restructured.
- Verified both forms redirect to /thank-you.html (thank-you.html present at site root).


============================================================
Added DotCom Online Conversion UI stylesheet
============================================================
- Created: assets/css/dotcom-conversion-ui.css (provided CSS pasted as-is)
- Linked in <head> of all HTML pages (after assets/css/styles.css):
  * index.html
  * deal.html
  * services.html
  * contact.html
  * intake.html
  * newyear-intake.html
  * business-in-a-box.html
  * faq.html
  * privacy.html
  * terms.html
  * refund.html
  * thank-you.html

- Renamed added stylesheet from assets/css/dotcom-conversion-ui.css to assets/css/conversion.css and updated all HTML <head> links accordingly.
- Appended forced button override rules to the VERY BOTTOM of assets/css/conversion.css to ensure gradients win against existing site CSS.


============================================================
DotCom Conversion Buttons (dc-btn) + CTA HTML updates
============================================================
- Appended "DOTCOM CONVERSION BUTTONS" (dc-btn, dc-btn-primary, dc-btn-secondary) styles to the VERY BOTTOM of assets/css/conversion.css.
- Updated homepage hero CTA buttons (index.html) to use dc-btn classes:
  * Primary: "Start My 72-Hour Website →" -> 72-hour.html
  * Secondary: "Explore Services" -> services.html
- Updated Services page hero CTA buttons (services.html) to use dc-btn classes:
  * Primary: "Start My Website →" -> start.html
  * Secondary: "72-Hour Website" -> 72-hour.html
- Replaced all button-styled "Contact" CTAs sitewide (elements with btn-style classes) with:
  * <a href="start.html" class="dc-btn dc-btn-primary">Start My Website →</a>
  (Navigation/header "Contact" links were not modified.)


---

DC BUTTON / CTA UPDATES (Jan 25, 2026)

Applied requested CTA/button swaps across:
- index.html (hero CTAs + lower CTA block)
- deal.html (main hero CTAs + readiness CTA)
- services.html (top CTAs + bottom CTA)
- business-in-a-box.html (hero CTAs + readiness CTA)
- Quick Start Panel (right-side drawer): standardized main action to Start My Website → and upgraded Explore Services to dc-btn-secondary.

Notes:
- Button swaps only; no section reordering or layout changes.
