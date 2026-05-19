$(document).ready(function () {
    
    "use strict";
    
    // Preloader
    
    $(window).load(function () { // makes sure the whole site is loaded
        $('.page-preloader .spinner').fadeOut(); // will first fade out the loading animation
        $('.page-preloader').delay(350).fadeOut('slow');
        // will fade out the white DIV that covers the website.
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    })
    
    // Animated typing text

    $(".animated-text").typed({
        strings: [
            "designed to convert.",
            "mobile-friendly.",
            "focused and clear.",
            "ready to launch."
        ],
        typeSpeed: 40,
        loop: true,
    });

    // PopUp Effect

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });

    $.extend(true, $.magnificPopup.defaults, {
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        }
    });

    // Owl Clients
    if ($("#owl-clients").length) {
        $("#owl-clients").owlCarousel({

            autoPlay: 3000,
            pagination: false,
            items: 2,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [979, 2],
            itemsTablet: [768, 2],
            itemsMobile: [479, 1]

        });
    }

// Owl Testimonils

    $("#owl-testimonials").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 600,
        paginationSpeed: 400,
        singleItem: true,
        transitionStyle: "goDown",
        autoPlay: true
    });

});


/*========================================
  Pricing Deck Stacks (v10)
  (Landing Page / Subscription section only)
========================================*/
(function () {
  function shouldIgnoreTarget(target) {
    return !!(target && target.closest && target.closest('a, button, input, textarea, select, label'));
  }

  function parseMs(val, fallback) {
    if (!val) return fallback;
    var s = String(val).trim();
    if (s.indexOf('ms') > -1) return parseFloat(s);
    if (s.indexOf('s') > -1) return parseFloat(s) * 1000;
    var n = parseFloat(s);
    return isNaN(n) ? fallback : n;
  }

  function initStack(stack) {
    var cards = Array.prototype.slice.call(stack.querySelectorAll('.deck-card'));
    if (!cards.length) return;

    stack.classList.add('deck-stack--ready');
    stack.setAttribute('tabindex', '0');
    stack.setAttribute('role', 'button');

    var visible = parseInt(stack.getAttribute('data-visible') || '6', 10);
    if (isNaN(visible) || visible < 3) visible = 6;

    var computed = window.getComputedStyle(stack);
    var duration = parseMs(computed.getPropertyValue('--deck-duration'), 520);
    var deckY = parseFloat(computed.getPropertyValue('--deck-y')) || 12;
    var animating = false;
    stack.classList.remove('is-animating');

    function layout(updateZ) {
      // Find tallest card so the stack never clips during animation
      var maxH = 0;
      cards.forEach(function (card) {
        maxH = Math.max(maxH, card.offsetHeight);
      });

      var pad = (Math.min(visible - 1, 6) * deckY) + 28; // offsets + cycle buffer
      stack.style.height = (maxH + pad) + 'px';

      cards.forEach(function (card, idx) {
        card.style.setProperty('--pos', idx);

        if (idx === 0) card.classList.add('is-front');
        else card.classList.remove('is-front');

        if (idx >= visible) card.classList.add('deck-card--hidden');
        else card.classList.remove('deck-card--hidden');

        if (updateZ) card.style.zIndex = String(100 - idx);
      });
    }

    layout(true);

    function cycle() {
      if (animating || cards.length < 2) return;
      animating = true;
      stack.classList.add('is-animating');

      var top = cards[0];

      // Extra "toss" motion so it feels like the top card rotates to the back
      top.style.setProperty('--cycle-rot', '5deg');
      top.style.setProperty('--bump-x', '8px');
      top.style.setProperty('--bump-y', '8px');

      var newOrder = cards.slice(1).concat([top]);

      // Animate to new positions (transforms transition smoothly)
      newOrder.forEach(function (card, idx) {
        card.style.setProperty('--pos', idx);

        if (idx >= visible) card.classList.add('deck-card--hidden');
        else card.classList.remove('deck-card--hidden');
      });

      // Mid-transition, switch stacking order so the moving card can settle behind
      window.setTimeout(function () {
        newOrder.forEach(function (card, idx) {
          card.style.zIndex = String(100 - idx);

          if (idx === 0) card.classList.add('is-front');
          else card.classList.remove('is-front');
        });
      }, Math.round(duration * 0.55));

      // Finish
      window.setTimeout(function () {
        top.style.removeProperty('--cycle-rot');
        top.style.removeProperty('--bump-x');
        top.style.removeProperty('--bump-y');

        cards = newOrder;
        layout(false);
        animating = false;
      }, duration + 40);
    }

    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0); 

    // Desktop: hover effect handled by CSS (no auto-cycling)

    // Mobile: tap cycles forward (click works on desktop too)
    stack.addEventListener('click', function (e) {
      if (shouldIgnoreTarget(e.target)) return;
      cycle();
    }, true);

    // Keyboard accessibility
    stack.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cycle();
      }
    });

    // Re-measure on resize
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        computed = window.getComputedStyle(stack);
        deckY = parseFloat(computed.getPropertyValue('--deck-y')) || deckY;
        duration = parseMs(computed.getPropertyValue('--deck-duration'), duration);
        layout(true);
      }, 150);
    });
  }

  function initAllStacks() {
    var stacks = document.querySelectorAll('[data-deck-stack]');
    if (!stacks || !stacks.length) return;
    Array.prototype.forEach.call(stacks, initStack);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllStacks);
  } else {
    initAllStacks();
  }
})();

/* Add-ons multi-select (checkbox dropdown) */
(function () {
  function initMultiSelect(root) {
    var toggle = root.querySelector('.addons-toggle');
    var menu = root.querySelector('.addons-menu');
    if (!toggle || !menu) return;

    var checkboxes = Array.prototype.slice.call(menu.querySelectorAll('input[type="checkbox"]'));

    function updateLabel() {
      var selected = checkboxes
        .filter(function (cb) { return cb.checked; })
        .map(function (cb) {
          var label = cb.parentNode;
          return label ? label.textContent.replace(/\s+/g, ' ').trim() : '';
        })
        .filter(Boolean);

      if (!selected.length) {
        toggle.textContent = 'Select add-ons';
        return;
      }
      if (selected.length <= 2) {
        toggle.textContent = selected.join(', ');
        return;
      }
      toggle.textContent = selected.slice(0, 2).join(', ') + ' +' + (selected.length - 2);
    }

    function setOpen(open) {
      if (open) {
        root.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
      } else {
        root.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
      }
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(!root.classList.contains('is-open'));
    });

    menu.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    checkboxes.forEach(function (cb) {
      cb.addEventListener('change', updateLabel);
    });

    document.addEventListener('click', function () {
      setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    updateLabel();
  }

  function initAll() {
    var roots = document.querySelectorAll('[data-addons-multiselect]');
    if (!roots || !roots.length) return;
    Array.prototype.forEach.call(roots, initMultiSelect);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();



/*========================================
  Offer Modal Popup (v21)
  - Appears 4 seconds after load
  - Only once per browser session (sessionStorage)
========================================*/
(function () {
  function initOfferModal() {
    var modalOverlay = document.getElementById('offerModalOverlay');
    if (!modalOverlay) return;

    var closeButton = modalOverlay.querySelector('.offer-modal-close');
    var noThanksButton = modalOverlay.querySelector('.offer-modal-no-thanks');
    var modalForm = modalOverlay.querySelector('form.offer-modal-form');

    // Forms use separate Web3Forms access keys:
    // - standard contact form: contact-form
    // - popup offer form: offer-modal-form
    // Do not copy one form action/key into the other.
    if (modalForm && !modalForm.getAttribute('method')) modalForm.setAttribute('method', 'POST');

    var hasSeenOffer = sessionStorage.getItem('dotcomOfferModalSeen');

    function openOfferModal() {
      modalOverlay.classList.add('is-visible');
      modalOverlay.setAttribute('aria-hidden', 'false');
      sessionStorage.setItem('dotcomOfferModalSeen', 'true');

      var firstField = modalOverlay.querySelector('input, select, button');
      if (firstField && firstField.focus) {
        try { firstField.focus(); } catch (e) {}
      }
    }

    function closeOfferModal() {
      modalOverlay.classList.remove('is-visible');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }

    /* Offer modal: Add-ons multi-select dropdown */
    var addonsWrap = modalOverlay.querySelector('[data-offer-addons-multiselect]');
    if (addonsWrap) {
      var addonsToggle = addonsWrap.querySelector('.offer-addons-toggle');
      var addonsMenu = addonsWrap.querySelector('.offer-addons-menu');
      var addonsRequired = addonsWrap.querySelector('.offer-addons-required');
      var addonCheckboxes = addonsWrap.querySelectorAll('input[type="checkbox"][name="add_ons[]"]');
      var noneCheckbox = addonsWrap.querySelector('input[data-offer-addon-none]');

      function closeAddonsMenu() {
        addonsWrap.classList.remove('is-open');
        if (addonsToggle) addonsToggle.setAttribute('aria-expanded', 'false');
        if (addonsMenu) addonsMenu.setAttribute('aria-hidden', 'true');
      }

      function openAddonsMenu() {
        addonsWrap.classList.add('is-open');
        if (addonsToggle) addonsToggle.setAttribute('aria-expanded', 'true');
        if (addonsMenu) addonsMenu.setAttribute('aria-hidden', 'false');
      }

      function syncAddonsLabel() {
        var selected = [];
        addonCheckboxes.forEach(function (cb) {
          if (cb.checked) selected.push(cb.value);
        });

        var label = 'Select add-ons';
        if (selected.length === 1) label = selected[0];
        else if (selected.length > 1) label = selected.length + ' selected';

        if (addonsToggle) addonsToggle.textContent = label;
        if (addonsRequired) addonsRequired.value = selected.join(', ');
      }

      if (addonsToggle) {
        addonsToggle.addEventListener('click', function (e) {
          e.preventDefault();
          if (addonsWrap.classList.contains('is-open')) closeAddonsMenu();
          else openAddonsMenu();
        });
      }

      addonCheckboxes.forEach(function (cb) {
        cb.addEventListener('change', function () {
          // If "None" is selected, clear others. If any other is selected, clear "None".
          if (noneCheckbox && cb === noneCheckbox && cb.checked) {
            addonCheckboxes.forEach(function (other) {
              if (other !== noneCheckbox) other.checked = false;
            });
          } else if (noneCheckbox && cb !== noneCheckbox && cb.checked) {
            noneCheckbox.checked = false;
          }
          syncAddonsLabel();
        });
      });

      // Close the menu when clicking outside
      document.addEventListener('click', function (event) {
        if (!addonsWrap.contains(event.target)) closeAddonsMenu();
      });

      // Prevent clicks inside menu from closing immediately
      if (addonsMenu) {
        addonsMenu.addEventListener('click', function (e) { e.stopPropagation(); });
      }

      // Initialize label / required field
      syncAddonsLabel();

      // Ensure menu closes when modal closes
      var prevClose = closeOfferModal;
      closeOfferModal = function () {
        closeAddonsMenu();
        prevClose();
      };
    }

    if (!hasSeenOffer) {
      window.setTimeout(openOfferModal, 4000);
    }

    if (closeButton) closeButton.addEventListener('click', closeOfferModal);
    if (noThanksButton) noThanksButton.addEventListener('click', closeOfferModal);

    modalOverlay.addEventListener('click', function (event) {
      if (event.target === modalOverlay) closeOfferModal();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeOfferModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOfferModal);
  } else {
    initOfferModal();
  }
})();
