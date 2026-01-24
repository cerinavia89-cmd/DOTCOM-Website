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
