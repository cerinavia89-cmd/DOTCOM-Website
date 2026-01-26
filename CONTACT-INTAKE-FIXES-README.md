# Site Fixes — Contact + Intake (Jan 26, 2026)

## What was fixed

### Contact page (contact.html)
- Removed the local “fake submit / thank you message” behavior so the form can **POST to Formspree** and follow Formspree’s own thank-you/redirect behavior.
- Removed the extra inline script that was attempting to clone/replace the form (it wasn’t preventing the `main.js` submit handler and could cause side effects).
- Removed the **linked** email address (no more `mailto:` link). The email is now plain text.

### Intake form
Files updated:
- `intake.html` (inline intake script)
- `assets/js/intake.js` (intake logic used by other intake builds)

Changes:
- Ensured the final intake submission form **POSTs to Formspree**:
  - Form action set to `https://formspree.io/f/xlgjaeye`
  - Added a simple honeypot field (`_gotcha`) and a `form_type` hidden field
- Updated the “Email my files” UI so it reliably opens the user’s email client:
  - Added/confirmed a **mailto button** (`Email My Files →`)
  - Made the displayed email address clickable (mailto)
  - Corrected a typo where the email link used `infor@...` instead of `info@...`

## QA checks performed (static verification)
- ✅ `contact.html`
  - Form action points to `https://formspree.io/f/xlgjadre`
  - No `mailto:` link remains on the contact page
  - No inline script remains that replaces/clones the contact form
- ✅ `assets/js/main.js`
  - Contact form submit handler only prevents default **when NOT posting to Formspree**
- ✅ `intake.html` and `assets/js/intake.js`
  - Final intake form action points to `https://formspree.io/f/xlgjaeye`
  - “Email My Files →” opens a `mailto:` compose window
  - The visible email address is also a clickable mailto link

## Notes
- These changes are intentionally minimal and do **not** alter page layout/section order.
- Formspree redirect/thank-you behavior is controlled by your Formspree settings (or any redirect fields you add).
