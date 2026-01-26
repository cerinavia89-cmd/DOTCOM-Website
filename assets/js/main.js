/* ==========================================================
   .com — minimal vanilla JS
   - Mobile nav toggle
   - Pill tabs (Home)
   - Drawer (“Let’s Talk” panel)
   - Contact form success message (no backend)
   ========================================================== */

(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav
  const mobileBtn = $("#mobileToggle");
  const nav = $("#siteNav");
  if (mobileBtn && nav) {
    mobileBtn.addEventListener("click", () => {
      nav.classList.toggle("mobile-open");
      mobileBtn.setAttribute("aria-expanded", nav.classList.contains("mobile-open") ? "true" : "false");
    });
    // Close menu when clicking a link
    $$("#siteNav a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("mobile-open")));
  }

  // Drawer
  const drawerOpeners = $$("[data-open-drawer]");
  const drawer = $("#drawer");
  const backdrop = $("#drawerBackdrop");
  const closeBtn = $("#drawerClose");
  function openDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.add("open");
    backdrop.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    // focus first actionable
    const first = drawer.querySelector("a,button,input,select,textarea");
    if (first) first.focus();
  }
  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
  }
  drawerOpeners.forEach((btn) => btn.addEventListener("click", (e) => { e.preventDefault(); openDrawer(); }));
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  // Tabs
  const tabList = $("#pillTabs");
  if (tabList) {
    const tabs = $$("button[role='tab']", tabList);
    const panels = $$("[data-tab-panel]");
    const activate = (tab) => {
      const target = tab.getAttribute("aria-controls");
      tabs.forEach((t) => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
      panels.forEach((p) => p.hidden = (p.id !== target));
    };
    tabs.forEach((t) => {
      t.addEventListener("click", () => activate(t));
      t.addEventListener("keydown", (e) => {
        const i = tabs.indexOf(t);
        if (e.key === "ArrowRight") { e.preventDefault(); activate(tabs[(i + 1) % tabs.length]); tabs[(i + 1) % tabs.length].focus(); }
        if (e.key === "ArrowLeft") { e.preventDefault(); activate(tabs[(i - 1 + tabs.length) % tabs.length]); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
      });
    });
    // Initialize
    activate(tabs.find(t => t.getAttribute("aria-selected") === "true") || tabs[0]);
  }

  // Contact form
  // If the form posts to Formspree, allow the native submit/redirect behavior.
  // Otherwise (no backend), fall back to the local success message.
  const form = $("#contactForm");
  const success = $("#formSuccess");
  if (form) {
    const action = (form.getAttribute("action") || "").toLowerCase();
    const isFormspree = action.includes("formspree.io");
    if (!isFormspree) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.hidden = true;
        if (success) success.hidden = false;
        // scroll to success for clarity
        if (success) success.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }
})();