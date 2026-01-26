/*
 * Intake form logic for the .com intake page.
 *
 * Presents a guided questionnaire where only one question is visible at a time.
 * Collects answers in a single object and compiles a project brief upon completion.
 * Uses existing CSS classes (field, btn, btn-primary, btn-ghost) to maintain site styling.
 */

(function () {
  // Helper to create DOM elements
  const createEl = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'class') {
        el.className = v;
      } else if (k === 'style') {
        Object.assign(el.style, v);
      } else if (k.startsWith('on')) {
        el.addEventListener(k.substring(2), v);
      } else {
        el.setAttribute(k, v);
      }
    });
    children.forEach(child => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child) {
        el.appendChild(child);
      }
    });
    return el;
  };

  const container = document.getElementById('question-container');
  const answers = {};
  // Keep references to file inputs so they can be appended to the final form
  const fileInputs = {};

  // Define the sequence of steps. Each step returns an object containing the element to render
  // and a function to retrieve the user's input value.
  const steps = [

    {
      id: 'package',
      label: 'Which website package are you starting?',
      render() {
        const wrapper = createEl('div', { class: 'card white', style: { marginBottom: '20px' } }, []);
        wrapper.appendChild(createEl('h3', {}, ['Which website package are you starting?']));

        const makeRadio = (value, text, required = false) => {
          const input = createEl('input', { type: 'radio', name: 'package', value, required: required === true });
          const label = createEl('label', {}, [input, ' ', text]);
          return label;
        };

        const opt1 = makeRadio('72-Hour Website', '72-Hour Website ($250 setup + $35/month)', true);
        const opt2 = makeRadio('Business in a Box', 'Business in a Box ($599 setup + $119/month)');
        const opt3 = makeRadio('Growth Website', 'Growth Website (custom pricing)');

        wrapper.appendChild(opt1);
        wrapper.appendChild(createEl('br'));
        wrapper.appendChild(opt2);
        wrapper.appendChild(createEl('br'));
        wrapper.appendChild(opt3);

        return {
          el: wrapper,
          getValue: () => {
            const checked = wrapper.querySelector('input[name="package"]:checked');
            return checked ? checked.value : '';
          }
        };
      }
    },
    {
      id: 'business_type',
      label: 'What type of business do you run?',
      render() {
        // Select field for business type
        const select = createEl('select', {}, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select a type']));
        ['Service-based', 'Product-based', 'E-commerce', 'Non-profit', 'Other'].forEach(val => {
          select.appendChild(createEl('option', { value: val }, [val]));
        });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'businessType' }, ['Business type']),
          Object.assign(select, { id: 'businessType', name: 'businessType', required: true })
        ]);
        return {
          el: field,
          getValue: () => select.value
        };
      }
    },
    {
      id: 'description',
      label: 'What does your business do?',
      render() {
        const input = createEl('input', { id: 'description', name: 'description', type: 'text', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'description' }, ['What does your business do?']),
          input
        ]);
        return {
          el: field,
          getValue: () => input.value.trim()
        };
      }
    },
    {
      id: 'target_audience',
      label: 'Who is your ideal customer?',
      render() {
        const input = createEl('input', { id: 'targetAudience', name: 'targetAudience', type: 'text', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'targetAudience' }, ['Who is your ideal customer?']),
          input
        ]);
        return {
          el: field,
          getValue: () => input.value.trim()
        };
      }
    },
    {
      id: 'website_goal',
      label: 'What should your website help you do?',
      render() {
        const input = createEl('input', { id: 'websiteGoal', name: 'websiteGoal', type: 'text', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'websiteGoal' }, ['What should your website help you do?']),
          input
        ]);
        return {
          el: field,
          getValue: () => input.value.trim()
        };
      }
    },
    {
      id: 'pages',
      label: 'Which page combination do you need?',
      render() {
        const select = createEl('select', { id: 'pagesSelect', name: 'pagesSelect', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select pages']));
        select.appendChild(createEl('option', { value: 'Home + Contact' }, ['Home + Contact']));
        select.appendChild(createEl('option', { value: 'Home + Services' }, ['Home + Services']));
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'pagesSelect' }, ['Page selection']),
          select
        ]);
        return {
          el: field,
          getValue: () => select.value
        };
      }
    },
    {
      id: 'contact_method',
      label: 'Preferred contact method',
      render() {
        const select = createEl('select', { id: 'contactMethod', name: 'contactMethod', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select method']));
        ['Form', 'Email'].forEach(val => {
          select.appendChild(createEl('option', { value: val }, [val]));
        });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'contactMethod' }, ['Preferred contact method']),
          select
        ]);
        return {
          el: field,
          getValue: () => select.value
        };
      }
    },
    {
      id: 'domain_status',
      label: 'Do you already have a domain?',
      render() {
        const select = createEl('select', { id: 'domainStatus', name: 'domainStatus', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select status']));
        ['Yes', 'No', 'Not sure'].forEach(val => {
          select.appendChild(createEl('option', { value: val }, [val]));
        });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'domainStatus' }, ['Domain status']),
          select
        ]);
        return {
          el: field,
          getValue: () => select.value
        };
      }
    },
    {
      id: 'layout_style',
      label: 'Choose a layout style',
      render() {
        // Present three layout images for selection. Use assets from assets/layouts.
        const options = [
          // Use correct paths for layout previews (files in /assets/layouts have spaces)
          { value: 'classic-service', label: 'Classic Service', img: 'assets/layouts/classic - service.png' },
          { value: 'brand-minimal', label: 'Brand Minimal', img: 'assets/layouts/brand - minimal.png' },
          { value: 'offer-focused', label: 'Offer Focused', img: 'assets/layouts/offer - focused.png' }
        ];
        let selected = null;
        const wrapper = createEl('div', { class: 'layout-options', style: { display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', marginBottom: '24px' } });
        options.forEach(opt => {
          const imgEl = createEl('img', { src: opt.img, alt: opt.label, style: { width: '100%', height: 'auto', borderRadius: '12px', border: '2px solid transparent', cursor: 'pointer' } });
          const caption = createEl('div', { style: { textAlign: 'center', marginTop: '6px', fontSize: '14px', color: 'var(--navy-2)' } }, [opt.label]);
          const card = createEl('div', { style: { cursor: 'pointer' } }, [imgEl, caption]);
          card.addEventListener('click', () => {
            // remove highlight from previous selection
            wrapper.querySelectorAll('img').forEach(i => { i.style.borderColor = 'transparent'; });
            imgEl.style.borderColor = 'var(--teal)';
            selected = opt.value;
          });
          wrapper.appendChild(card);
        });
        const field = createEl('div', {}, [
          createEl('label', { style: { fontWeight: '600', display: 'block', marginBottom: '8px' } }, ['Select a layout style']),
          wrapper
        ]);
        return {
          el: field,
          getValue: () => selected
        };
      }
    },
    {
      id: 'brand_feel',
      label: 'Choose a brand feel',
      render() {
        const feels = [
          { value: 'modern', label: 'Modern & Professional' },
          { value: 'warm', label: 'Warm & Friendly' },
          { value: 'bold', label: 'Bold & Energetic' },
          { value: 'calm', label: 'Calm & Minimal' }
        ];
        let selected = null;
        const optionsContainer = createEl('div', { class: 'feel-options', style: { display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' } });
        feels.forEach(opt => {
          const btn = createEl('button', { type: 'button', class: 'btn btn-ghost', style: { border: '2px solid var(--line)', borderRadius: '12px', padding: '12px 16px', cursor: 'pointer', flex: '1 1 220px' } }, [opt.label]);
          btn.addEventListener('click', () => {
            // reset others
            optionsContainer.querySelectorAll('button').forEach(b => {
              b.style.backgroundColor = 'transparent';
              b.style.borderColor = 'var(--line)';
            });
            btn.style.backgroundColor = 'var(--teal)';
            btn.style.borderColor = 'var(--teal)';
            selected = opt.value;
          });
          optionsContainer.appendChild(btn);
        });
        const field = createEl('div', {}, [
          createEl('label', { style: { fontWeight: '600', display: 'block', marginBottom: '8px' } }, ['Select a brand feel']),
          optionsContainer
        ]);
        return {
          el: field,
          getValue: () => selected
        };
      }
    },
    {
      id: 'color_palette',
      label: 'Choose a color palette',
      render() {
        // This step depends on the previously selected brand_feel.
        const feel = answers['brand_feel'];
        const wrapper = createEl('div', { class: 'palette-options', style: { display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', marginBottom: '24px' } });
        let selected = null;
        // Load five palette images for the selected feel
        for (let i = 1; i <= 5; i++) {
          const filename = `${feel}-${i}.png`;
          const imgSrc = `assets/palettes/${filename}`;
          const imgEl = createEl('img', { src: imgSrc, alt: `Palette ${i}`, style: { width: '100%', height: 'auto', borderRadius: '12px', border: '2px solid transparent', cursor: 'pointer' } });
          const caption = createEl('div', { style: { textAlign: 'center', marginTop: '6px', fontSize: '14px', color: 'var(--navy-2)' } }, [`Palette ${i}`]);
          const card = createEl('div', { style: { cursor: 'pointer' } }, [imgEl, caption]);
          card.addEventListener('click', () => {
            wrapper.querySelectorAll('img').forEach(iEl => { iEl.style.borderColor = 'transparent'; });
            imgEl.style.borderColor = 'var(--teal)';
            selected = `${feel}-${i}`;
          });
          wrapper.appendChild(card);
        }
        const field = createEl('div', {}, [
          createEl('label', { style: { fontWeight: '600', display: 'block', marginBottom: '8px' } }, ['Select a color palette']),
          wrapper
        ]);
        return {
          el: field,
          getValue: () => selected
        };
      }
    },
    {
      id: 'copy_status',
      // Updated wording to avoid jargon
      label: 'Do you already have written text for your website? (Testimonials, credentials, services/ business/ organization description, etc.)',
      render() {
        const select = createEl('select', { id: 'copyStatus', name: 'copyStatus', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select status']));
        ['Yes', 'Partially', 'No — please generate'].forEach(val => {
          select.appendChild(createEl('option', { value: val }, [val]));
        });
        const field = createEl('div', { class: 'field' }, [
          // Use plain language for the label
          createEl('label', { for: 'copyStatus' }, ['Do you already have written text for your website? (Testimonials, credentials, services/ business/ organization description, etc.)']),
          select
        ]);
        return {
          el: field,
          getValue: () => select.value
        };
      }
    },
    {
      id: 'about_text',
      label: 'Tell us about your business',
      render() {
        const textarea = createEl('textarea', { id: 'aboutText', name: 'aboutText', required: true, placeholder: 'Share a few sentences about your company' }, []);
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'aboutText' }, ['About text']),
          textarea
        ]);
        return {
          el: field,
          getValue: () => textarea.value.trim()
        };
      }
    },
    {
      id: 'brand_notes',
      label: 'Do you have any brand tone notes?',
      render() {
        const textarea = createEl('textarea', { id: 'brandNotes', name: 'brandNotes', placeholder: 'Describe the tone or voice you’d like' }, []);
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'brandNotes' }, ['Brand tone notes']),
          textarea
        ]);
        return {
          el: field,
          getValue: () => textarea.value.trim()
        };
      }
    },
    {
      id: 'keywords',
      label: 'Words to include or avoid',
      render() {
        const textarea = createEl('textarea', { id: 'keywords', name: 'keywords', placeholder: 'List words to include or avoid in copy' }, []);
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'keywords' }, ['Words to include or avoid']),
          textarea
        ]);
        return {
          el: field,
          getValue: () => textarea.value.trim()
        };
      }
    },

    {
      id: 'assets_ready',
      label: 'Do you have a logo and brand photos ready?',
      render() {
        const input = createEl('input', { id: 'assetsReady', name: 'Assets Ready', type: 'text', placeholder: 'Yes / No / Some', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'assetsReady' }, ['Do you have a logo and brand photos ready?']),
          input
        ]);
        return {
          el: field,
          getValue: () => input.value.trim()
        };
      }
    },
    {
      id: 'full_name',
      label: 'What is your full name?',
      render() {
        const input = createEl('input', { id: 'fullName', name: 'fullName', type: 'text', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'fullName' }, ['Full name']),
          input
        ]);
        return {
          el: field,
          getValue: () => input.value.trim()
        };
      }
    },
    {
      id: 'email',
      label: 'What is your email?',
      render() {
        const input = createEl('input', { id: 'emailField', name: 'email', type: 'email', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'emailField' }, ['Email']),
          input
        ]);
        return {
          el: field,
          getValue: () => input.value.trim()
        };
      }
    },
    {
      id: 'business_name',
      label: 'What is your business name?',
      render() {
        const input = createEl('input', { id: 'businessName', name: 'businessName', type: 'text' });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'businessName' }, ['Business name']),
          input
        ]);
        return {
          el: field,
          getValue: () => input.value.trim()
        };
      }
    },
    {
      id: 'additional_notes',
      label: 'Anything else you’d like us to know?',
      render() {
        // Remove any mention of deadlines or timeframes in the placeholder
        const textarea = createEl('textarea', { id: 'additionalNotes', name: 'additionalNotes', placeholder: 'Anything else you’d like us to know?' }, []);
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'additionalNotes' }, ['Anything else you’d like us to know?']),
          textarea
        ]);
        return {
          el: field,
          getValue: () => textarea.value.trim()
        };
      }
    },
    {
      id: 'static_hosting',
      label: 'Confirm static hosting',
      render() {
        const checkbox = createEl('input', { id: 'staticHosting', name: 'staticHosting', type: 'checkbox', required: true });
        const labelEl = createEl('label', { for: 'staticHosting', style: { fontWeight: '600' } }, ['I confirm I’m comfortable using static site hosting']);
        const container = createEl('div', { class: 'field' }, [
          createEl('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [checkbox, labelEl])
        ]);
        return {
          el: container,
          getValue: () => checkbox.checked
        };
      }
    }
  ];

  let currentIndex = 0;


  const sectionForStep = (stepId) => {
    const businessDetails = new Set(['package','business_type','description','business_name']);
    const websiteGoals = new Set(['website_goal','pages','contact_method','domain_status','static_hosting']);
    const designPrefs = new Set(['layout_style','brand_feel','color_palette']);
    const content = new Set(['copy_status','about_text','brand_notes','keywords','assets_ready','additional_notes']);
    const contact = new Set(['full_name','email']);
    if (businessDetails.has(stepId)) return 'Business details';
    if (websiteGoals.has(stepId)) return 'Website goals';
    if (designPrefs.has(stepId)) return 'Design preferences';
    if (content.has(stepId)) return 'Content';
    if (contact.has(stepId)) return 'Your contact info';
    return '';
  };

  function renderStep() {
    container.innerHTML = '';
    const step = steps[currentIndex];
    const { el, getValue } = step.render();
    // Prepopulate simple input/select/textarea fields if the user is navigating back
    const savedValue = answers[step.id];
    if (savedValue !== undefined && savedValue !== null) {
      const inputEl = el.querySelector('input, select, textarea');
      if (inputEl) {
        inputEl.value = savedValue;
      }
    }
    // Add progress indicator
    const progress = createEl('p', { style: { color: 'rgba(11,27,59,.62)', marginBottom: '16px' } }, [`Step ${currentIndex + 1} of ${steps.length}`]);
    container.appendChild(progress);
    const sectionTitle = sectionForStep(step.id);
    if (sectionTitle) {
      container.appendChild(createEl('h3', { style: { margin: '0 0 12px' } }, [sectionTitle]));
    }
    container.appendChild(el);
    const actions = createEl('div', { style: { marginTop: '24px', display: 'flex', justifyContent: 'space-between' } });
    // Back button: only show if not on first step
    if (currentIndex > 0) {
      const backBtn = createEl('button', { class: 'btn btn-ghost', type: 'button' }, ['Back']);
      backBtn.addEventListener('click', () => {
        currentIndex--;
        renderStep();
      });
      actions.appendChild(backBtn);
    }
    const nextBtn = createEl('button', { class: 'btn btn-primary', type: 'button' }, [currentIndex < steps.length - 1 ? 'Next' : 'Finish']);
    nextBtn.addEventListener('click', () => {
      const value = getValue();
      if (value === undefined || value === null || value === '' || (typeof value === 'boolean' && value === false)) {
        // If checkbox is boolean, false means unchecked; treat as invalid
        alert('Please provide an answer before continuing.');
        return;
      }
      answers[step.id] = value;
      currentIndex++;
      if (currentIndex < steps.length) {
        renderStep();
      } else {
        showSummary();
      }
    });
    actions.appendChild(nextBtn);
    container.appendChild(actions);
  }

  function compileSummary() {
    const lines = [];
    lines.push('CLIENT WEBSITE BRIEF — .com');
    lines.push('');
    lines.push(`Package: ${answers.package || ''}`);
    lines.push('');
    lines.push(`Business Type: ${answers.business_type || ''}`);
    lines.push(`What does your business do?: ${answers.description || ''}`);
    lines.push(`Who is your ideal customer?: ${answers.target_audience || ''}`);
    lines.push('');
    lines.push(`What should your website help you do?: ${answers.website_goal || ''}`);
    lines.push(`Pages: ${answers.pages || ''}`);
    lines.push(`Contact Method: ${answers.contact_method || ''}`);
    lines.push(`Domain: ${answers.domain_status || ''}`);
    lines.push('');
    lines.push('Design:');
    lines.push(`Layout Style: ${answers.layout_style || ''}`);
    lines.push(`Brand Feel: ${answers.brand_feel || ''}`);
    lines.push(`Color Palette: ${answers.color_palette || ''}`);
    lines.push('');
    lines.push('Content:');
    lines.push(`Copy Status: ${answers.copy_status || ''}`);
    lines.push(`About Info: ${answers.about_text || ''}`);
    lines.push(`Brand Notes: ${answers.brand_notes || ''}`);
    lines.push(`Keywords: ${answers.keywords || ''}`);
    lines.push('');
    lines.push('Assets:');
    lines.push(`Assets Ready: ${answers.assets_ready || ''}`);
    lines.push('');
    lines.push('Timeline:');
    lines.push('');
    lines.push('Client Details:');
    lines.push(`Name: ${answers.full_name || ''}`);
    lines.push(`Email: ${answers.email || ''}`);
    lines.push(`Business Name: ${answers.business_name || ''}`);
    lines.push(`Anything else you’d like us to know?: ${answers.additional_notes || ''}`);
    return lines.join('\n');
  }

  function showSummary() {
    container.innerHTML = '';
    const heading = createEl('h2', {}, ['Review Your Website Brief']);
    const summaryText = compileSummary();
    const pre = createEl('pre', { style: { background: 'rgba(46,201,197,.05)', padding: '16px', borderRadius: '12px', whiteSpace: 'pre-wrap', border: '1px solid var(--line)' } }, [summaryText]);
    container.appendChild(heading);
    container.appendChild(pre);
    // Build final form
    const form = createEl('form', { class: 'form', id: 'intakeForm', method: 'POST', action: 'https://formspree.io/f/xlgjaeye' }, []);
    // Formspree metadata + spam protection
    const hiddenFormType = createEl('input', { type: 'hidden', name: 'form_type', value: 'Client Website Brief — .com' });
    form.appendChild(hiddenFormType);
    const hiddenRedirect = createEl('input', { type: 'hidden', name: '_redirect', value: '/thank-you.html' });
    form.appendChild(hiddenRedirect);
    const honeypot = createEl('input', { type: 'text', name: '_gotcha', style: { display: 'none' }, tabIndex: '-1', autoComplete: 'off' });
    form.appendChild(honeypot);

    // Hidden field to include compiled brief
    const hiddenBrief = createEl('input', { type: 'hidden', name: 'website_brief', value: summaryText });
    form.appendChild(hiddenBrief);
    const hiddenPackage = createEl('input', { type: 'hidden', name: 'package', value: answers.package || '' });
    form.appendChild(hiddenPackage);
    // Add visible contact fields: name, email, business name, additional notes if not already included
    // Dedicated "Email your files" section (no uploads on the form)
    const emailCard = createEl('div', { class: 'card white', style: { margin: '18px 0' } }, []);
    emailCard.appendChild(createEl('h3', {}, ['Send your logo & photos']));
    emailCard.appendChild(createEl('p', { style: { margin: '0 0 10px', color: '#6b7280', fontSize: '14px' } }, [
      'After you submit this intake, email any files (logo, photos, brand colors, inspiration screenshots) to: ',
      createEl('strong', {}, ['info@dotcom.website'])
    ]));
    emailCard.appendChild(createEl('a', {
      class: 'dc-btn dc-btn-secondary',
      href: 'mailto:info@dotcom.website?subject=DotCom%20Online%20Website%20Assets&body=Hi%20DotCom%20Online%2C%0A%0AI%20just%20submitted%20my%20intake.%20Here%20are%20my%20files%20for%20the%20website%20build.%0A%0AName%3A%20%0ABusiness%20Name%3A%20%0APackage%3A%20%0A%0AThank%20you!'
    }, ['Email My Files →']));
    emailCard.appendChild(createEl('p', { style: { margin: '10px 0 0', color: '#6b7280', fontSize: '13px' } }, [
      'Tip: Attach files directly to the email (logo PNG/SVG, photos, brand kit, inspiration links).'
    ]));
    form.appendChild(emailCard);

    const reassurance = createEl('p', { style: { fontSize: '14px', color: '#6b7280', marginBottom: '10px' } }, [
      'After you submit, we’ll review your details and confirm next steps.'
    ]);
    form.appendChild(reassurance);

    const submitBtn = createEl('button', { class: 'dc-btn dc-btn-primary', type: 'submit' }, ['Submit Intake →']);
    form.appendChild(submitBtn);
    const note = createEl('p', { style: { marginTop: '8px', color: 'rgba(11,27,59,.62)', fontSize: '14px' } }, ['Your responses will be sent when deployed with a form service.']);
    container.appendChild(form);
    container.appendChild(note);
  }

  // Kick off
  document.addEventListener('DOMContentLoaded', function () {
    renderStep();
  });
})();