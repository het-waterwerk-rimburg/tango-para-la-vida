# CLAUDE.md — Tango Para La Vida

Responde siempre en español. Trabaja paso a paso y espera mi aprobación al final de cada fase.

> Plantilla de Het Waterwerk Websites. Guía completa: `../GUIA-DESARROLLO-WEB.md`.
> Al empezar, sustituye `Tango Para La Vida` y rellena la sección 8 a medida que se tomen decisiones.

---

## 1. Carpetas del proyecto

```
proyecto/
├── CLAUDE.md
├── web-info/            ← información del cliente (solo lectura, no la modifiques)
│   ├── marca.md         ← personalidad, público, tono, referencias
│   ├── estructura.md    ← páginas, secciones y su orden
│   ├── diseno.md        ← sistema visual (lo escribe la Fase 1)
│   └── imagenes/        ← fotos y logos del cliente
└── website/             ← aquí se construye el sitio (lo crea la Fase 2)
```

- Lee la información SIEMPRE desde `web-info/`.
- Construye SIEMPRE dentro de `website/`. No crees archivos del sitio fuera de esa carpeta.
- La única excepción a "solo lectura" es `web-info/diseno.md`, que escribe la Fase 1.
- Si falta `marca.md` o `estructura.md`, o siguen con los textos de ejemplo de la plantilla, detente y pídemelos. No inventes el contenido.

---

## 2. Stack

- **Astro** + **Tailwind CSS** + CSS propio + JavaScript (sin frameworks extra salvo que yo lo pida).
- Componentes en `website/src/components/`, páginas en `website/src/pages/`, layout base en `website/src/layouts/`.
- Tokens de `diseno.md` definidos una sola vez en la configuración de Tailwind / CSS global.
- Usa el plugin **context7** para consultar la documentación actual de Astro y Tailwind antes de escribir configuración.
- **Deploy:** no hagas deploy por tu cuenta. Cuando el sitio esté listo, pregúntame si voy a usar Netlify o Vercel.

---

## 3. Responsabilidades: cada skill tiene UN dueño

| Decisión | Dueño | Las demás skills NO pueden |
|---|---|---|
| Colores, tipografía, espaciado, radios | `ui-ux-pro-max` | Inventar o cambiar colores y fuentes |
| Layout, componentes, estética general | `impeccable` | Cambiar tokens de `diseno.md` |
| Animaciones y microinteracciones | `emil-design-eng` / `animate` (Emil Kowalski) | Cambiar layout, colores o textos |
| Revisión de accesibilidad y UX | `web-design-guidelines` | Rediseñar; solo reporta |
| Textos (si el cliente no los entrega) | `copywriting` | Cambiar diseño o estructura |
| SEO | `seo-audit` | Cambiar diseño o textos sin aprobación |

**Reglas:**
- La fuente única del sistema visual es `web-info/diseno.md`. Ninguna skill crea otro archivo de diseño (por ejemplo, un `DESIGN.md` nuevo). Si Impeccable lo intenta, redirígelo a `diseno.md`.
- Si una skill necesita algo que no es de su responsabilidad, se detiene y me lo indica.
- Invoca la skill por su nombre al empezar cada fase. No dependas de que se active sola.
- No uses la skill `frontend-design` (se solapa con Impeccable). Tampoco otras skills de estilo (`design-taste-frontend`, `minimalist-ui`, `high-end-visual-design`...) salvo que yo lo pida.

---

## 4. Verificación de skills (antes de la Fase 1)

Comprueba que estas skills están instaladas (en `.claude/skills/` del proyecto, del workspace `Het Waterwerk Websites/.claude/skills/` o globales). Si falta alguna, instálala con su comando y avísame:

| Skill | Comando de instalación |
|---|---|
| ui-ux-pro-max | `npx skills add https://github.com/nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max` |
| impeccable | `npx impeccable install` |
| web-design-guidelines | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| emil-design-eng + animate | `npx skills add emilkowalski/skills --skill emil-design-eng animate` |

Si una instalación falla, muéstrame el error y espera. Si un nombre de skill no existe, lista los disponibles con `--list`.

---

## 5. Flujo por fases

### Fase 0 — Preparación
1. Lee `web-info/marca.md` y `web-info/estructura.md`.
2. Revisa `web-info/imagenes/` y lista las imágenes disponibles (nombre, tamaño, orientación).
3. Resúmeme en pocas líneas lo que entendiste del proyecto (cliente, público, idiomas, páginas) y espera mi confirmación.

### Fase 1 — Sistema visual · invocar `/ui-ux-pro-max`
1. A partir de `marca.md` (y el logo, si está en `imagenes/`), propón **2 opciones** de paleta + combinación de fuentes.
2. Comprueba el contraste de cada opción (AA: 4.5:1 en texto normal). Si un color de marca no llega, propón una variante `-ink` más oscura para texto.
3. Espera a que yo elija.
4. Escribe la opción elegida en `web-info/diseno.md` como tokens: colores (con uso de cada uno), fuentes, escala tipográfica, espaciado, radios, sombras, movimiento.
5. No escribas código del sitio en esta fase.

### Fase 2 — Montaje del proyecto
1. Crea el proyecto Astro dentro de `website/` y añade Tailwind.
2. Copia las imágenes de `web-info/imagenes/` a `website/src/assets/images/` y úsalas con el componente `<Image>` de Astro (optimización automática).
3. Configura los tokens de `diseno.md` en Tailwind / CSS global. Autoaloja las fuentes si es posible.
4. Crea el layout base: head con SEO básico (title, description, canonical, Open Graph), header, footer.
5. Si hay varios idiomas, configura las rutas `/xx/` y `hreflang` desde el principio.

### Fase 3 — Diseño y maquetación · invocar `/impeccable`
1. Indica a Impeccable que use `web-info/diseno.md` como sistema visual y `web-info/estructura.md` como guía de contenido.
2. Construye **una sección por vez**, en el orden de `estructura.md`.
3. Usa solo los tokens de `diseno.md`.
4. Usa las imágenes reales del cliente. Si falta una imagen, deja un marcador claro (`TODO: imagen de ...`), nunca imágenes de stock inventadas.
5. Sin animaciones en esta fase (solo estados hover y focus básicos).
6. Al terminar cada sección, revisa en móvil (360-390px) y escritorio, y espera mi aprobación.

### Fase 4 — Movimiento · invocar `/emil-design-eng` (y `/animate` para piezas concretas)
1. No cambies layout, colores ni textos.
2. Animaciones sutiles y con propósito: entrada de secciones, hover, transiciones.
3. Solo `opacity` y `transform`. Una sola librería de animación como máximo (preferible CSS + JS nativo).
4. Respeta `prefers-reduced-motion`.

### Fase 5 — Revisión · invocar `/web-design-guidelines` y después `/impeccable polish`
1. Reporta los problemas en formato archivo:línea.
2. Corrige solo lo que yo apruebe.
3. Repasa la checklist de la sección 7.
4. Al terminar, pregúntame: ¿deploy en Netlify o Vercel?

---

## 6. Prohibido
- Degradados morados, emojis como iconos, tres tarjetas iguales con icono como recurso por defecto.
- Textos genéricos ("soluciones innovadoras", "llevamos tu negocio al siguiente nivel"). Usa el tono de `marca.md`.
- Rayas largas (—) en textos visibles. Usa comas, puntos o dos puntos.
- Reescribir textos que entregue el cliente. El copy entregado es exacto.
- Fuentes por defecto (Inter, Roboto, Arial) salvo que estén en `diseno.md`.
- Modificar archivos de `web-info/` (excepto `diseno.md` en la Fase 1).

---

## 7. Checklist antes de entregar

**Calidad**
- [ ] Sin scroll horizontal a 360px. Grids con `minmax(0, 1fr)`. Áreas táctiles de 44px o más.
- [ ] Contraste AA en todos los textos (incluidos hovers y texto sobre foto).
- [ ] Foco visible en todos los elementos interactivos.
- [ ] `prefers-reduced-motion` respetado.
- [ ] Imágenes optimizadas, con `alt`, y la del hero con `fetchpriority="high"`.

**SEO**
- [ ] `<title>` con la keyword al principio, 60 caracteres o menos. Meta description de 155 o menos.
- [ ] `canonical`, Open Graph (`og:image` absoluta, idealmente 1200×630) y `twitter:card`.
- [ ] JSON-LD adecuado al negocio (`LocalBusiness`, `ProfessionalService`...) con zona de servicio real.
- [ ] `robots.txt` y `sitemap.xml` (con alternates `hreflang` si hay varios idiomas).
- [ ] Si hay varios idiomas: mismo HTML e IDs de sección en todos, `x-default` definido.

**Lanzamiento**
- [ ] Formulario de contacto conectado a un destino real (no solo validación).
- [ ] Dominio final actualizado en canonical, sitemap, robots, OG y JSON-LD.
- [ ] Google Search Console + envío del sitemap. Google Business Profile si es negocio local.
- [ ] Footer con datos legales que correspondan (KvK/BTW, privacidad).
- [ ] Imágenes no usadas fuera de la carpeta pública.

---

## 8. Decisiones del proyecto (mantener actualizado)

Anota aquí lo que se decida durante el desarrollo, para que la siguiente sesión no lo pierda:

- **Idiomas:** EN por defecto (`/`) + NL (`/nl/`). Decidido el 18-10-2026.
- **Dominio:** [pendiente]
- **Deploy:** [Netlify / Vercel]
- **Migración:** el sitio anterior (HTML + Tailwind CDN + Alpine + `content.json`, con sistema de movimiento propio) se reconstruye en Astro dentro de `website/`. Sigue en la raíz y en git como referencia hasta que el nuevo esté listo; sus reglas están en `web-info/referencia-sitio-anterior.md`.
- **Peticiones expresas del cliente (18-10-2026):** sitio más sobrio, premium y serio, para empresas; que inspire confianza, elegancia y experiencia; colores de marca como en tangomj.nl; oferta con programas, paquetes, metodología y testimonios.
- **Sistema visual (Fase 1, 18-10-2026):** opción B "Sobrio moderno": IBM Plex Sans + IBM Plex Serif cursiva para citas, paleta de tangomj con contención (dorado solo en el CTA principal). Tokens en `web-info/diseno.md`.
- **Montaje (Fase 2, 18-10-2026):** Astro 7.4 + Tailwind 4.3 (`@tailwindcss/vite`, tokens en `website/src/styles/global.css` con `@theme`), fuentes IBM Plex autoalojadas con la API de fuentes de Astro, `@astrojs/sitemap` con hreflang, `robots.txt` como endpoint. Textos de interfaz (menú, pie, meta) en `website/src/i18n/languages.ts`; copy de secciones en `website/src/content/en.json` (copia del cliente) y `nl.json` (Fase 3). La home se monta en `website/src/views/HomePage.astro`.
- **Neerlandés:** trato de **u** (decidido el 18-10-2026).
- **Dominio provisional:** `https://www.tangoparalavida.example` en `astro.config.mjs` (TODO antes de publicar).
- **Privacidad provisional:** el pie enlaza a la privacyverklaring de tangomj.nl (mismo responsable) hasta tener una propia.
- **Cabecera en móvil:** por debajo de 520px el botón "Book a call" y por debajo de 640px el selector EN/NL pasan al menú desplegable, para que el nombre de marca quepa sin cortes.
- **Datos de empresa (18-10-2026, sacados de tangomj.nl):** teléfono/WhatsApp +31 6 21710803, dirección Kapelweien 2A, 6374 LX Landgraaf, LinkedIn de Tango MJ. Centralizados en `CONTACT` (`website/src/i18n/languages.ts`). En el pie: email, teléfono y LinkedIn (la dirección se quitó del pie el 19-10-2026 a petición del cliente; sigue en el JSON-LD). El webhook de Make.com del formulario de tangomj está guardado en `CONTACT.formEndpoint` (decidido el 18-10-2026: el formulario se envía a ese webhook con `website = "tangoparalavida"`).
- **Prensa (Fase 3, 18-10-2026):** banda crema tras el hero con RTV Parkstad (enlace real) y el titular del artículo "Tango is krachtig middel voor verbinding". Medio: De Limburger, con enlace al artículo (facilitado por el cliente el 18-10-2026) (`prensa` en `content/*.json`).
- **Por qué funciona (Fase 3, 18-10-2026):** lista editorial (intro fija a la izquierda + 6 beneficios en dos columnas con filetes), sin tarjetas ni iconos. CTA de contorno hacia el método. Traducción NL en `nl.json`, pendiente de revisión del cliente.
- **Programas y paquetes (Fase 3, 18-10-2026):** selector de nivel como pestañas (flechas, Inicio/Fin), por nivel propósito, focus, nota del método y "lo que se llevan" (tipográfico, sin slider), 3 paquetes como tarjetas y barra de resumen con "Continue to booking" (dorado). La elección nivel + paquete se guarda en `sessionStorage` (`tplv-selection`) y se emite con el evento `tplv:selection`; el formulario la cambia con `tplv:set-selection`. Los enlaces del índice del hero llevan `data-select-level`. Nivel por defecto: Fun; paquete: Normal (recomendado). Sin JS se muestran los tres niveles.
- **Método (Fase 3, 18-10-2026):** cabecera con el lema en cita (Plex Serif cursiva), 6 etapas en filas con filetes (número, etapa + objetivo, actividades, pregunta clave en cursiva); etiquetas de columna `labelObjetivo/labelActividades/labelPregunta` en `method`. Debajo, la nota del método del nivel elegido en Programas (escucha `tplv:selection` y lee `sessionStorage`) y CTA dorado "Find your starting point" → contacto.
- **Facilitadores (Fase 3, 18-10-2026):** idea + 3 pilares ("Embodied," en azul, "not theoretical" atenuado) + 2 fichas con retrato pequeño (112px, porque el de Maddie solo mide 231×213). Biografías reescritas a partir de las reales de tangomj.nl, en tono empresa: pendientes de revisión del cliente, igual que la mención a NLP de la intro.
- **FAQ (Fase 3):** `<details>` nativos, sin JS.
- **Contacto (Fase 3):** banda azul marino con la llamada final ("Book a discovery call" abre un email con asunto mientras no haya agenda: `CONTACT.bookingUrl`), email, teléfono y WhatsApp, y el formulario. El formulario envía JSON al webhook de Make con `subject = "Tango for business"` y `website = "tangoparalavida"`; nivel, paquete, teléfono e idioma van al principio de `message` y también como campos sueltos. Nivel y paquete sincronizados con Programas. No se ha hecho un envío real de prueba.
- **Movimiento (Fase 4, 19-10-2026, `emil-design-eng`):** entradas de sección con `data-reveal` (opacidad + 12px, 0.45s, `--ease-enter`, una vez, escalonado 60ms con máximo 4 pasos) en `src/scripts/reveal.ts`; solo con `html.motion`, que el `<head>` nunca pone con `prefers-reduced-motion` (y si el script falla, `motion-done` lo muestra todo a los 3s). La foto del hero no se oculta (LCP). Selector de nivel: píldora azul que se desliza (transform) y fundido de 0.3s del panel nuevo; con teclado, sin animación. Botones: transición de `transform` para el `scale(0.98)`. FAQ: la respuesta entra con un fundido corto al abrir. Verificado en tiempo real con Edge headless + DevTools Protocol.
- **Estilo de separadores (19-10-2026, petición del cliente):** nada de palabras separadas por "·" ni viñetas de punto entre palabras (se ve "hecho por IA"). Usar jerarquía (etiqueta + valor con espacio), dos líneas, comas o paréntesis. "What participants take away" se presenta como citas en bloque crema (Plex Serif cursiva), no como lista con guiones.
- **Revisión (Fase 5, 19-10-2026):** foco = contorno azul marino + halo dorado (3:1 en cualquier fondo); `color-scheme: light`; áreas táctiles de 44px en pie y contacto; `translate="no"` en marca, programas y paquetes; tipografía del contenido con "…", comillas y apóstrofos tipográficos (sin cambiar palabras). Pulido de Impeccable: sin desbordes a 360/1280px, sin errores de consola, validación del formulario vacío correcta.
- **Testimonios:** la sección se diseña pero queda oculta hasta tener testimonios reales. Nada inventado.
- **Imágenes:** se reutilizan fotos de tangomj.nl (`web-info/imagenes/`). No usar la foto del artículo de prensa ni la captura de RTV Parkstad (derechos de terceros).
- **Textos:** el copy en inglés del cliente está en `web-info/textos-en.json` y se usa tal cual. El neerlandés hay que traducirlo y que lo revise el cliente.
- **Entorno:** Python 3.12 está instalado, así que el buscador de `ui-ux-pro-max` funciona (`python <skill>/scripts/search.py ...`).
- **Reglas del detector de Impeccable ignoradas a propósito (y por qué):** ninguna
- **Pendientes:** ver los puntos **[PENDIENTE]** de `web-info/marca.md` y `web-info/estructura.md` (precios, biografías, teléfono, agenda, destino del formulario, retrato de Maddie, consentimiento de imagen, logo propio, keyword, tono NL).
