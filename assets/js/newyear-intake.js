/*
 * New Year Deal Intake form logic for the .com site.
 *
 * Presents a guided questionnaire where only one question is visible at a time.
 * Collects answers in a single object and compiles a project brief upon completion.
 * Uses existing CSS classes (field, btn, btn-primary, btn-ghost) to maintain site styling.
 * This version restricts the business type options for the New Year Deal and labels the flow accordingly.
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

  const container = document.getElementById('ny-question-container');
  const answers = {};
  const fileInputs = {};

  // Define the sequence of steps. Each step returns an object containing the element to render
  // and a function to retrieve the user's input value.
  const steps = [
    {
      id: 'business_type',
      label: 'What type of business do you run?',
      render() {
        // Only allow service-based or general business types for the New Year Deal
        const select = createEl('select', {}, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select a type']));
        ['Service-based', 'Non-profit', 'Other'].forEach(val => {
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
      label: 'Provide a one-sentence description of your business',
      render() {
        const input = createEl('input', { id: 'description', name: 'description', type: 'text', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'description' }, ['One-sentence description']),
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
      label: 'Who is your target audience?',
      render() {
        const input = createEl('input', { id: 'targetAudience', name: 'targetAudience', type: 'text', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'targetAudience' }, ['Target audience']),
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
      label: 'What is your primary website goal?',
      render() {
        const input = createEl('input', { id: 'websiteGoal', name: 'websiteGoal', type: 'text', required: true });
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'websiteGoal' }, ['Primary website goal']),
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
      label: 'How would you like contact to be set up on your site?',
      render() {
        const select = createEl('select', { id: 'contactMethod', name: 'contactMethod', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select option']));
        ['Info Form', 'Email link'].forEach(val => {
          select.appendChild(createEl('option', { value: val }, [val]));
        });

        const note = createEl('p', { style: { marginTop: '8px', color: 'rgba(11,27,59,.62)', fontSize: '14px' } }, [
          'Note: If pages selected are “Home + Services” then an email link will be used.'
        ]);

        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'contactMethod' }, ['How would you like contact to be set up on your site?']),
          select,
          note
        ]);

        // If the user selected Home + Services, enforce the required contact setup (email link).
        if (answers.pages === 'Home + Services') {
          select.value = 'Email link';
          select.disabled = true;
        }

        return {
          el: field,
          getValue: () => (answers.pages === 'Home + Services' ? 'Email link' : select.value)
        };
      }
    },


    {
      id: 'domain_status',
      label: 'Do you have a domain for your website',
      render() {
        const select = createEl('select', { id: 'domainStatus', name: 'domainStatus', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select option']));
        ['Yes', 'No', 'Not sure', 'Get a custom domain for my website (Additional fee)'].forEach(val => {
          select.appendChild(createEl('option', { value: val }, [val]));
        });

        const urlLabel = createEl('label', { for: 'domainUrl', style: { marginTop: '12px', display: 'none' } }, ['If yes, enter your domain URL']);
        const urlInput = createEl('input', {
          type: 'text',
          id: 'domainUrl',
          name: 'domainUrl',
          placeholder: 'https://yourdomain.com',
          style: { display: 'none' }
        });

        const toggleUrlField = () => {
          const show = select.value === 'Yes';
          urlLabel.style.display = show ? 'block' : 'none';
          urlInput.style.display = show ? 'block' : 'none';
          if (!show) {
            urlInput.value = '';
            answers.domain_url = '';
          }
        };

        select.addEventListener('change', toggleUrlField);

        // Prepopulate when navigating back
        if (answers.domain_status) select.value = answers.domain_status;
        if (answers.domain_url) urlInput.value = answers.domain_url;
        toggleUrlField();

        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'domainStatus' }, ['Do you have a domain for your website']),
          select,
          urlLabel,
          urlInput
        ]);
        return {
          el: field,
          getValue: () => {
            // Save the domain URL alongside the selection
            if (select.value === 'Yes') {
              answers.domain_url = (urlInput.value || '').trim();
            } else {
              answers.domain_url = '';
            }
            return select.value;
          }
        };
      }
    },
    {
      id: 'business_email',
      label: 'Do you have a business email address?',
      render() {
        const select = createEl('select', { id: 'businessEmailStatus', name: 'businessEmailStatus', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select option']));
        select.appendChild(createEl('option', { value: 'Yes' }, ['Yes']));
        select.appendChild(createEl('option', { value: 'No' }, ['No']));
        select.appendChild(createEl('option', { value: 'Get me a business email (Additional charge)' }, ['Get me a business email (Additional charge)']));

        const emailInput = createEl('input', {
          id: 'businessEmailAddress',
          name: 'businessEmailAddress',
          type: 'email',
          placeholder: 'you@yourdomain.com',
          style: { display: 'none', marginTop: '10px' }
        }, []);

        // Prefill when navigating back
        if (answers.business_email_address) {
          emailInput.value = answers.business_email_address;
        }

        const note = createEl('p', { style: { marginTop: '8px', color: 'rgba(11,27,59,.62)', fontSize: '14px' } }, [
          'Note: Selecting “Get me a business email” has an additional charge.'
        ]);

        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'businessEmailStatus' }, ['Do you have a business email address?']),
          select,
          emailInput,
          note
        ]);

        const toggle = () => {
          emailInput.style.display = select.value === 'Yes' ? 'block' : 'none';
        };
        select.addEventListener('change', toggle);

        // Ensure correct state when navigating back
        toggle();

        return {
          el: field,
          getValue: () => {
            const val = select.value;
            if (val === 'Yes') {
              const addr = emailInput.value.trim();
              answers.business_email_address = addr;
              if (!addr) return '';
              return 'Yes';
            }
            answers.business_email_address = '';
            return val;
          }
        };
      }
    },

    {
      id: 'layout_style',
      label: 'Choose a layout style',
      render() {
        const options = [
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
        const feels = ['modern', 'warm', 'bold', 'calm'];
        let selected = null;
        const wrapper = createEl('div', { style: { display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', marginBottom: '24px' } });
        feels.forEach(feel => {
          const card = createEl('div', { style: { border: '2px solid transparent', borderRadius: '12px', padding: '12px', textAlign: 'center', cursor: 'pointer' } });
          const title = feel.charAt(0).toUpperCase() + feel.slice(1);
          card.appendChild(createEl('strong', {}, [title.charAt(0).toUpperCase() + title.slice(1) + ' & ' + (feel === 'modern' ? 'Professional' : feel === 'warm' ? 'Friendly' : feel === 'bold' ? 'Energetic' : 'Minimal')]));
          card.addEventListener('click', () => {
            wrapper.querySelectorAll('div').forEach(c => { c.style.borderColor = 'transparent'; });
            card.style.borderColor = 'var(--teal)';
            selected = feel;
          });
          wrapper.appendChild(card);
        });
        const field = createEl('div', {}, [
          createEl('label', { style: { fontWeight: '600', display: 'block', marginBottom: '8px' } }, ['Select a brand feel']),
          wrapper
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
        // Determine selected brand feel
        const feel = answers.brand_feel || 'modern';
        const wrapper = createEl('div', { style: { display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', marginBottom: '24px' } });
        let selected = null;
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
      label: 'Do you have written text you’d like to use for your website?',
      render() {
        const select = createEl('select', { id: 'copyStatus', name: 'copyStatus', required: true }, []);
        select.appendChild(createEl('option', { value: '', disabled: true, selected: true }, ['Select status']));
        ['Yes', 'Partially', 'No — please generate'].forEach(val => {
          select.appendChild(createEl('option', { value: val }, [val]));
        });

        const helper = createEl('p', { style: { marginTop: '8px', color: 'rgba(11,27,59,.62)', fontSize: '14px' } }, [
          'Examples: services/organization description, credentials, testimonials, etc.'
        ]);

        const textarea = createEl('textarea', {
          id: 'writtenText',
          name: 'writtenText',
          placeholder: 'Paste any written text you’d like us to use...',
          style: { marginTop: '10px' }
        }, []);

        // Prefill when navigating back
        if (answers.written_text) {
          textarea.value = answers.written_text;
        }

        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'copyStatus' }, ['Do you have written text you’d like to use for your website?']),
          select,
          helper,
          textarea
        ]);

        return {
          el: field,
          getValue: () => {
            answers.written_text = textarea.value.trim();
            return select.value;
          }
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
      label: 'Any additional notes?',
      render() {
        // Remove any mention of deadlines or timeframes in the placeholder
        const textarea = createEl('textarea', { id: 'additionalNotes', name: 'additionalNotes', placeholder: 'Anything else you’d like us to know?' }, []);
        const field = createEl('div', { class: 'field' }, [
          createEl('label', { for: 'additionalNotes' }, ['Additional notes']),
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
        const checkbox = createEl('input', {
          id: 'staticHosting',
          name: 'staticHosting',
          type: 'checkbox',
          required: true,
          style: { width: '22px', height: '22px', transform: 'scale(1.15)' }
        });
        const labelEl = createEl('label', { for: 'staticHosting', style: { fontWeight: '600' } }, ['I confirm I’m comfortable using static site hosting']);
        const checkNote = createEl('div', { style: { marginTop: '6px', color: 'rgba(11,27,59,.62)', fontSize: '14px' } }, ['Check Box']);

        const containerEl = createEl('div', { class: 'field' }, [
          createEl('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, [checkbox, labelEl]),
          checkNote
        ]);

        return {
          el: containerEl,
          getValue: () => checkbox.checked
        };
      }
    }


  ];

  let currentIndex = 0;

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
    container.appendChild(el);
    const actions = createEl('div', { style: { marginTop: '24px', display: 'flex', justifyContent: 'space-between' } });
    // Back button for all but first step
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
    lines.push(`Business Type: ${answers.business_type || ''}`);
    lines.push(`Business Summary: ${answers.description || ''}`);
    lines.push(`Audience: ${answers.target_audience || ''}`);
    lines.push('');
    lines.push(`Website Goal: ${answers.website_goal || ''}`);
    lines.push(`Pages: ${answers.pages || ''}`);
    lines.push(`Contact Method: ${answers.contact_method || ''}`);
    lines.push(`Domain: ${answers.domain_status || ''}${answers.domain_status === 'Yes' && answers.domain_url ? (' — ' + answers.domain_url) : ''}`);
    lines.push(`Business Email: ${answers.business_email === 'Yes' ? ('Yes — ' + (answers.business_email_address || '')) : (answers.business_email || '')}`);
    lines.push('');
    lines.push('Design:');
    lines.push(`Layout Style: ${answers.layout_style || ''}`);
    lines.push(`Brand Feel: ${answers.brand_feel || ''}`);
    lines.push(`Color Palette: ${answers.color_palette || ''}`);
    lines.push('');
    lines.push('Content:');
    lines.push(`Copy Status: ${answers.copy_status || ''}`);
    lines.push(`Written Text: ${answers.written_text || ''}`);
    lines.push(`About Info: ${answers.about_text || ''}`);
            lines.push('');
    lines.push('Assets:');
    lines.push('Please email logos and photos to info@dotcom.website.com');
lines.push('');
    lines.push('Package:');
    lines.push('');
    lines.push('Timeline:');
    lines.push('');
    lines.push('Client Details:');
    lines.push(`Name: ${answers.full_name || ''}`);
    lines.push(`Email: ${answers.email || ''}`);
    lines.push(`Business Name: ${answers.business_name || ''}`);
    lines.push(`Notes: ${answers.additional_notes || ''}`);
    return lines.join('\n');
  }

  function showSummary() {
    container.innerHTML = '';
    const heading = createEl('h2', {}, ['Review Your Website Brief']);
    const summaryText = compileSummary();
    const pre = createEl('pre', { style: { background: 'rgba(46,201,197,.05)', padding: '16px', borderRadius: '12px', whiteSpace: 'pre-wrap', border: '1px solid var(--line)' } }, [summaryText]);
    container.appendChild(heading);
    container.appendChild(pre);
    const form = createEl('form', { class: 'form', method: 'POST', action: 'https://formspree.io/f/xlgjaeye', enctype: 'multipart/form-data' }, []);


    // Form type metadata for filtering
    form.appendChild(createEl('input', { type: 'hidden', name: 'form_type', value: 'New Year Deal Intake — .com' }));

    // Send the full formatted brief as a single field
    const hiddenBrief = createEl('input', { type: 'hidden', name: 'brief_text', value: summaryText });
    form.appendChild(hiddenBrief);

    // Helpful metadata + redirect
    form.appendChild(createEl('input', { type: 'hidden', name: '_subject', value: 'CLIENT WEBSITE BRIEF — .com' }));
    form.appendChild(createEl('input', { type: 'hidden', name: '_redirect', value: '/thank-you.html' }));

    // Optional: spam protection
    form.appendChild(createEl('input', { type: 'text', name: '_gotcha', style: { display: 'none' }, tabIndex: -1, autoComplete: 'off' }));

    // Also send individual fields (makes Formspree emails easier to scan)
    const fieldMap = {
      business_type: 'Business Type',
      description: 'Business Summary',
      target_audience: 'Audience',
      website_goal: 'Website Goal',
      pages: 'Pages',
      contact_method: 'Contact Method',
      domain: 'Domain',
      business_email_address: 'Business Email',
      layout_style: 'Layout Style',
      brand_feel: 'Brand Feel',
      color_palette: 'Color Palette',
      copy_status: 'Copy Status',
      written_text: 'Written Text',
      about_text: 'About Info',
      full_name: 'Name',
      email: 'Email',
      business_name: 'Business Name',
      additional_notes: 'Notes',
      domain_status: 'Domain Status',
      static_hosting: 'Static Hosting'
    };

    Object.keys(fieldMap).forEach((k) => {
      if (typeof answers[k] === 'undefined' || answers[k] === null) return;
      let v = answers[k];
      if (Array.isArray(v)) v = v.join(', ');
      v = String(v).trim();
      if (!v) return;
      form.appendChild(createEl('input', { type: 'hidden', name: fieldMap[k], value: v }));
    });

    // Set reply-to for Formspree (uses the email field)
    if (answers.email) {
      form.appendChild(createEl('input', { type: 'hidden', name: '_replyto', value: String(answers.email).trim() }));
    }
    // Upload fields removed — assets are sent via email button on the confirmation page.
const submitBtn = createEl('button', { class: 'btn btn-primary', type: 'submit' }, ['Submit Intake']);
    form.appendChild(submitBtn);

    const note = createEl('p', { style: { marginTop: '8px', color: 'rgba(11,27,59,.62)', fontSize: '14px' } }, ['After submitting, you’ll be redirected to a confirmation page.']);
    container.appendChild(form);
    container.appendChild(note);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderStep();
  });
})();