/**
 * Languages and shared interface texts (menu, buttons, footer, meta).
 *
 * - English is the default language, at the root (/). Dutch lives under /nl/.
 * - Both languages use the same HTML and the same section IDs, so the
 *   language switcher keeps the #section.
 * - Section copy lives in src/content/<language>.json (English = client copy, used as is).
 * - Dutch addresses the reader formally ("u").
 */

export const LANGUAGES = ['en', 'nl'] as const;
export type Language = (typeof LANGUAGES)[number];
export const DEFAULT_LANGUAGE: Language = 'en';

export const LANGUAGE_DETAILS: Record<Language, { label: string; name: string; htmlLang: string; ogLocale: string; home: string }> = {
  en: { label: 'EN', name: 'English', htmlLang: 'en', ogLocale: 'en_GB', home: '/' },
  nl: { label: 'NL', name: 'Nederlands', htmlLang: 'nl', ogLocale: 'nl_NL', home: '/nl/' },
};

/** Section IDs, identical in every language. */
export const SECTION_IDS = {
  benefits: 'benefits',
  programs: 'programs',
  method: 'how-it-works',
  about: 'about',
  faq: 'faq',
  contact: 'contact',
} as const;

const en = {
  meta: {
    // ≤ 60 characters, keyword first. TODO: confirm the main keyword (web-info/marca.md).
    title: 'Leadership training through tango | Tango Para La Vida',
    // ≤ 155 characters (shortened from the client meta text in en.json).
    description:
      'Experiential leadership, communication and team-building programs for organizations, using Argentine Tango as a practical laboratory for connection.',
    shareImageAlt: 'A group of participants gathered around two tango facilitators during a workshop',
  },
  brand: {
    name: 'Tango Para La Vida',
    byline: 'by Tango MJ',
    homeLink: 'Tango Para La Vida, home',
  },
  navigation: {
    label: 'Main',
    skipToContent: 'Skip to content',
    programs: 'Programs',
    method: 'Method',
    about: 'About',
    faq: 'FAQ',
    cta: 'Book a call',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
  },
  footer: {
    tagline: 'Using Argentine Tango as a practical laboratory for leadership, communication, collaboration and self-awareness.',
    explore: 'Explore',
    contact: 'Contact',
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    discoverySubject: 'Discovery call: Tango Para La Vida',
    linkedin: 'Tango MJ on LinkedIn',
    newTab: '(opens in a new tab)',
    programBy: 'A program by',
    legal: 'Het Waterwerk Rimburg V.O.F., KvK 89925688, VAT NL865155033B01',
    privacy: 'Privacy policy',
    rights: 'All rights reserved.',
    madeBy: 'Website by',
  },
};

export type UiText = typeof en;

const nl: UiText = {
  meta: {
    title: 'Leiderschapstraining via tango | Tango Para La Vida',
    description:
      "Ervaringsgerichte programma's voor leiderschap, communicatie en teambuilding voor organisaties, met de Argentijnse tango als praktisch laboratorium.",
    shareImageAlt: 'Een groep deelnemers rond twee tangobegeleiders tijdens een workshop',
  },
  brand: {
    name: 'Tango Para La Vida',
    byline: 'door Tango MJ',
    homeLink: 'Tango Para La Vida, naar de homepage',
  },
  navigation: {
    label: 'Hoofdmenu',
    skipToContent: 'Naar de inhoud',
    programs: "Programma's",
    method: 'Methode',
    about: 'Over ons',
    faq: 'Veelgestelde vragen',
    cta: 'Plan een gesprek',
    openMenu: 'Menu openen',
    closeMenu: 'Menu sluiten',
    language: 'Taal',
  },
  footer: {
    tagline: 'Argentijnse tango als praktisch laboratorium voor leiderschap, communicatie, samenwerking en zelfinzicht.',
    explore: 'Ontdekken',
    contact: 'Contact',
    email: 'E-mail',
    phone: 'Telefoon',
    whatsapp: 'WhatsApp',
    discoverySubject: 'Kennismakingsgesprek: Tango Para La Vida',
    linkedin: 'Tango MJ op LinkedIn',
    newTab: '(opent in een nieuw tabblad)',
    programBy: 'Een programma van',
    legal: 'Het Waterwerk Rimburg V.O.F., KvK 89925688, btw NL865155033B01',
    privacy: 'Privacyverklaring',
    rights: 'Alle rechten voorbehouden.',
    madeBy: 'Website door',
  },
};

export const UI_TEXT: Record<Language, UiText> = { en, nl };

/**
 * Contact and company details shared by every language. Source: the published
 * details of tangomj.nl (legal notice, contact page). TODO: booking link (web-info/marca.md).
 */
export const CONTACT = {
  email: 'info@tangomj.nl',
  phone: { display: '+31 6 21710803', href: 'tel:+31621710803' },
  whatsappUrl: 'https://wa.me/31621710803',
  address: { street: 'Kapelweien 2A', postalCode: '6374 LX', locality: 'Landgraaf', region: 'Limburg', country: 'NL' },
  company: { name: 'Het Waterwerk Rimburg V.O.F.', kvk: '89925688', vat: 'NL865155033B01' },
  linkedinUrl: 'https://www.linkedin.com/company/tango-mj',
  // Make.com webhook shared with the tangomj.nl contact form. Make routes by the `website` field.
  formEndpoint: 'https://hook.eu1.make.com/6haz3m8zqr7uooygiv8d1wz7y3kawiev',
  formWebsite: 'tangoparalavida',
  // Topic value the Make scenario already knows (tangomj.nl form).
  formSubject: 'Tango for business',
  // TODO: online booking link (calendar) once known; until then the discovery call CTA opens an email.
  bookingUrl: '',
  tangoMjUrl: 'https://www.tangomj.nl/',
  // TODO: own privacy policy for this site (web-info/estructura.md). Until then, Tango MJ's (same controller).
  privacyUrl: { en: 'https://www.tangomj.nl/privacy-policy/', nl: 'https://www.tangomj.nl/nl/privacyverklaring/' },
} as const;
