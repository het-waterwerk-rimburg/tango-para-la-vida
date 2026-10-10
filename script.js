/**
 * Tango Para La Vida — landing page behavior.
 * Alpine.js owns all interactivity (mobile menu, level selector, package
 * selector, FAQ accordion, contact form); motion.js/motion.css own every
 * scroll reveal and text animation via data-fx / data-text attributes in
 * index.html. This file only registers the Alpine component, the raw icon
 * markup it renders with x-html, and hands off to the motion engine once
 * the content has rendered.
 */

const ICONS = {
  trust: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/></svg>',
  communication: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.2 0-2.4-.25-3.5-.75L3 21l1.8-5.4A8.5 8.5 0 1 1 21 11.5z"/></svg>',
  collaboration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5"/><path d="M11 20c0-3 2.5-5 5-5s5 2 5 5"/></svg>',
  awareness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 3v3M12 18v3M21 12h-3M6 12H3M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6"/></svg>',
  leadership: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.6 5.8L21 9l-4.6 4.2L17.6 20 12 16.7 6.4 20l1.2-6.8L3 9l6.4-1.2z"/></svg>',
  resilience: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 1 3 6.7"/><path d="M3 21v-5h5"/></svg>',
  connection: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6"/></svg>'
};

const CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-secundario flex-shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>';

document.addEventListener('alpine:init', () => {
  Alpine.data('site', () => ({
    content: null,
    scrolled: false,
    mobileMenuOpen: false,
    selectedLevel: 0,
    selectedPackage: null, // set to the recommended package's id once content loads — never left null
    packageJustSelected: false, // true only after the visitor actively clicks a package card
    takeawaySlide: 0, // current slide in the "What participants take away" slider
    openFaqIndex: null,
    testimonialIndex: 0,
    testimonialsPaused: false, // transient: hover / keyboard focus inside the carousel
    testimonialsUserPaused: false, // deliberate: the play/pause button (starts paused under reduced motion)
    form: { name: '', email: '', phone: '', message: '' },
    formStatus: 'idle', // idle | sending | done | error

    async init() {
      const response = await fetch('content.json');
      this.content = await response.json();

      document.title = this.content.meta.siteTitle;
      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) descriptionTag.setAttribute('content', this.content.meta.siteDescription);

      window.addEventListener('scroll', () => { this.scrolled = window.scrollY > 8; }, { passive: true });

      this.selectedPackage = this.defaultPackageIdForLevel(this.selectedLevel);

      // Packages are level-specific (each level has its own Basic/Normal/Premium).
      // Switching levels resets the selection back to that level's recommended
      // package and hides the "Continue to Booking" button until the visitor
      // actively picks one again.
      this.$watch('selectedLevel', () => {
        this.selectedPackage = this.defaultPackageIdForLevel(this.selectedLevel);
        this.packageJustSelected = false;
        this.takeawaySlide = 0;
        // Soft crossfade of the level panel once Alpine has swapped its content.
        this.$nextTick(() => { if (window.TangoMotion) window.TangoMotion.swap(); });
      });

      this.startTestimonialAutoplay();

      // Content is rendered by Alpine, so the motion engine starts after it lands.
      await this.$nextTick();
      if (window.TangoMotion) window.TangoMotion.mount();
      else document.documentElement.classList.add('fx-off'); // motion.js missing: never leave content hidden
    },

    startTestimonialAutoplay() {
      // Reduced motion: never auto-rotate unless the visitor presses play themselves.
      this.testimonialsUserPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setInterval(() => {
        if (this.testimonialsPaused || this.testimonialsUserPaused || document.hidden || !this.content) return;
        this.nextTestimonial();
      }, 5000);
    },

    nextTestimonial() {
      const total = this.content.testimonials.items.length;
      this.testimonialIndex = (this.testimonialIndex + 1) % total;
    },

    prevTestimonial() {
      const total = this.content.testimonials.items.length;
      this.testimonialIndex = (this.testimonialIndex - 1 + total) % total;
    },

    icon(name) {
      return ICONS[name] || '';
    },

    defaultPackageIdForLevel(levelIndex) {
      const pkgs = this.content.programs.items[levelIndex].paquetes;
      const recommended = pkgs.find((p) => p.destacado);
      return recommended ? recommended.id : pkgs[0].id;
    },

    // The package the form's Package select (and the "Booking:" summary badge)
    // currently shows: whichever package is selected for the current level —
    // the visitor's own pick, or the recommended one by default.
    get currentPackage() {
      if (!this.content) return null;
      const level = this.content.programs.items[this.selectedLevel];
      return level.paquetes.find((p) => p.id === this.selectedPackage) || level.paquetes.find((p) => p.destacado) || level.paquetes[0];
    },

    get continueCtaText() {
      if (!this.content || !this.currentPackage) return '';
      const level = this.content.programs.items[this.selectedLevel];
      return this.content.packages.continueCtaTemplate
        .replace('{{package}}', this.currentPackage.nombre)
        .replace('{{level}}', level.nombre);
    },

    checkIcon() {
      return CHECK_ICON;
    },

    // Selecting a package no longer jumps the page straight to the contact
    // form — it just marks the choice and reveals a "Continue to Booking"
    // button, so the visitor can keep comparing options before committing.
    // The message box is cleared on every new selection, since a message
    // written for one package/level likely doesn't apply to another.
    choosePackage(pkg) {
      this.selectedPackage = pkg.id;
      this.packageJustSelected = true;
      this.form.message = '';
    },

    goToContact() {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    },

    // Hero level shortcuts: pick the level, then bring the level selector into view.
    jumpToLevel(i) {
      this.selectedLevel = i;
      this.$nextTick(() => {
        document.getElementById('programs').scrollIntoView({ behavior: 'smooth' });
      });
    },

    async submitForm() {
      if (!this.$refs.contactForm.checkValidity()) {
        this.$refs.contactForm.reportValidity();
        return;
      }

      const actionUrl = this.$refs.contactForm.getAttribute('action') || '';
      const isConfigured = actionUrl && !actionUrl.includes('REPLACE_ME');

      this.formStatus = 'sending';

      try {
        if (isConfigured) {
          const response = await fetch(actionUrl, {
            method: 'POST',
            body: new FormData(this.$refs.contactForm),
            headers: { Accept: 'application/json' }
          });
          if (!response.ok) throw new Error('Form submission failed');
        }
        // If no real endpoint is configured yet, we skip the network call
        // and simply confirm locally — nothing is sent anywhere until the
        // TODO in index.html (form action) is replaced with a real endpoint.
        this.formStatus = 'done';
        this.form = { name: '', email: '', phone: '', message: '' };
      } catch (err) {
        this.formStatus = 'error';
      }
    }
  }));
});
