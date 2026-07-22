/**
 * Tango Para La Vida — landing page behavior.
 * Alpine.js owns all interactivity (mobile menu, level selector, package
 * selector, FAQ accordion, contact form); AOS owns scroll-reveal animation
 * via data-aos attributes in index.html. This file only registers the
 * Alpine component and the raw icon markup it renders with x-html.
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
    selectedPackage: null,
    openFaqIndex: null,
    testimonialIndex: 0,
    testimonialsPaused: false,
    form: { name: '', email: '', phone: '', message: '', package: '' },
    formStatus: 'idle', // idle | sending | done | error

    async init() {
      const response = await fetch('content.json');
      this.content = await response.json();

      document.title = this.content.meta.siteTitle;
      const descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) descriptionTag.setAttribute('content', this.content.meta.siteDescription);

      window.addEventListener('scroll', () => { this.scrolled = window.scrollY > 8; }, { passive: true });

      // Packages are level-specific (each level has its own Basic/Normal/Premium),
      // so switching levels should clear any "Selected ✓" highlight from before.
      this.$watch('selectedLevel', () => { this.selectedPackage = null; });

      this.startTestimonialAutoplay();

      await this.$nextTick();
      if (window.AOS) {
        window.AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 60 });
      }
    },

    startTestimonialAutoplay() {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      setInterval(() => {
        if (this.testimonialsPaused || !this.content) return;
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

    // The package the "What You'll Get" section currently shows: whichever
    // package the visitor picked in the Packages section, or — before they've
    // picked one — the recommended ("Normal") package for the selected level.
    get currentPackage() {
      if (!this.content) return null;
      const level = this.content.programs.items[this.selectedLevel];
      return level.paquetes.find((p) => p.id === this.selectedPackage) || level.paquetes.find((p) => p.destacado) || level.paquetes[0];
    },

    get packageBenefitsSubtitle() {
      if (!this.content || !this.currentPackage) return '';
      const level = this.content.programs.items[this.selectedLevel];
      return this.content.packageBenefits.subtituloTemplate
        .replace('{{package}}', this.currentPackage.nombre)
        .replace('{{level}}', level.nombre);
    },

    checkIcon() {
      return CHECK_ICON;
    },

    choosePackage(pkg) {
      const level = this.content.programs.items[this.selectedLevel];
      const label = `${pkg.nombre} (${level.nombre})`;

      this.selectedPackage = pkg.id;
      this.form.package = label;

      if (!this.form.message.trim()) {
        this.form.message = this.content.formulario.packagePrefillTemplate.replace('{{package}}', label);
      }

      this.$nextTick(() => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
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
        this.form = { name: '', email: '', phone: '', message: '', package: '' };
        this.selectedPackage = null;
      } catch (err) {
        this.formStatus = 'error';
      }
    }
  }));
});
