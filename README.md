# Tango Para La Vida — Landing Page

Landing page de una sola página, sin build tools (todo vía CDN, se abre directo en el
navegador). Stack:

- **Tailwind CSS** (Play CDN) — utilidades + la paleta/tipografía/radios/sombras de la marca.
- **daisyUI** — capa de componentes sobre Tailwind (botones, cards, badges, inputs, tabs,
  collapse) usada solo por sus clases estructurales; los colores siempre vienen de nuestras
  propias utilidades (`bg-principal`, `text-detalle`, etc.), nunca de la paleta por defecto de
  daisyUI.
- **Alpine.js** — toda la interacción: carga de `content.json`, menú móvil, selector de
  niveles, selector de paquetes, acordeón de FAQ y el formulario de contacto.
- **AOS (Animate On Scroll)** — todas las animaciones de aparición al hacer scroll, vía
  atributos `data-aos` en el HTML.

## Estructura

```
index.html      # Todo el markup, con directivas Alpine (x-data, x-for, x-text, x-show...)
                 # y atributos data-aos para las animaciones
content.json    # TODOS los textos editables de la página (incluye programas y paquetes)
script.js       # Registra el componente Alpine `site()`: fetch de content.json, estado
                 # (menú, nivel seleccionado, paquete seleccionado, FAQ abierta, formulario)
assets/         # Logos (copiados desde ./logo/)
```

No hay `styles.css`: todos los estilos son clases de Tailwind/daisyUI directamente en el HTML.

## Cómo editar los textos

Todos los textos visibles (títulos, párrafos, botones, items de listas, preguntas frecuentes,
características de los paquetes, etc.) viven en **`content.json`**. Para cambiar cualquier copy:

1. Abrí `content.json`.
2. Buscá la sección correspondiente (`hero`, `benefits`, `programs`, `packages`, `faq`,
   `formulario`, etc.).
3. Editá el valor del texto entre comillas y guardá.
4. Recargá la página en el navegador — no hace falta tocar `index.html`.

No borres ninguna clave (lo que está a la izquierda de `:`), solo los valores. Alpine.js lee
`content.json` en el arranque (`x-init="init()"` en el `<body>`) y pinta todo automáticamente.

**Ojo con `packages`**: los nombres, características y notas de precio de los 3 paquetes
(Basic / Normal / Premium) son un placeholder inventado para que puedas ver el diseño
funcionando — reemplazalos por el contenido real en `content.json` antes de publicar.

## Cómo cambiar colores, tipografía, bordes o sombras

Todo eso vive en un solo lugar: el bloque `tailwind.config` dentro de `<head>` en
`index.html` (justo después del `<script src="https://cdn.tailwindcss.com">`). Por ejemplo:

- Colores de marca (`colors.principal`, `colors.secundario`, `colors.acento`, `colors.detalle`,
  `colors.texto`, `colors.header`) → se usan en el HTML como clases `bg-principal`,
  `text-secundario`, `border-detalle`, etc. También aceptan opacidad: `bg-principal/10`.
- Tipografía (`fontFamily.sans`).
- Bordes redondeados (`borderRadius.sm/md/lg`, en píxeles) → clases `rounded-sm` (12px),
  `rounded-md` (20px), `rounded-lg` (28px); `rounded-full` para los botones tipo pill.
- Sombras (`boxShadow.card`, `card-hover`, `button`) → clases `shadow-card`, `shadow-card-hover`,
  `shadow-button`.

Cambiar un valor ahí actualiza automáticamente todos los lugares del sitio que usan esa clase.

## Programas, paquetes y el formulario

- **Programas**: la sección "Programs" es un selector de 3 niveles (Fun / Team / Leaders) hecho
  con daisyUI `tabs` + Alpine (`selectedLevel`). Al hacer clic en un nivel, el panel de abajo
  muestra reactivamente su detalle completo (propósito — que ya incluye el "ideal for" en el
  mismo texto —, qué se lleva el equipo, y los 3 paquetes de ese nivel). Level 4 (Volition
  Intensive) fue removido de `content.json` — si querés volver a agregarlo, sumá un objeto más
  al array `programs.items`.
- **Paquetes**: viven dentro de la misma card del nivel (no en una sección aparte), 3 tarjetas
  seleccionables (Basic / Normal / Premium) por nivel. "Normal" queda marcado como recomendado
  (`paquetes[].destacado: true`). Al hacer clic en una card (método `choosePackage` en
  `script.js`) se marca la elección, se limpia el mensaje del formulario, y aparece un botón
  "Continue to Booking" para bajar al formulario cuando el visitante quiera.
- **"What participants take away"**: un slider con una foto/ícono + frase por cada resultado —
  ver la sección de fotos más abajo.
- **FAQ**: usa el componente `collapse` de daisyUI, controlado por Alpine (`openFaqIndex`) —
  solo una pregunta abierta a la vez.
- **Teléfono en el formulario**: el campo es de texto libre (`type="tel"`), sin ninguna máscara
  ni patrón de formato — acepta cualquier forma de escribir el número.

## Fotos del slider "What participants take away"

Cada punto de "lo que se lleva el equipo" (`programs.items[].resultados[]`) tiene un campo
`imagen` que apunta a un archivo dentro de `assets/takeaways/`. **Todavía no hay fotos ahí** —
mientras el archivo no exista, el slide muestra automáticamente un ícono de respaldo (no rompe
nada), así que podés ir agregando fotos de a una.

Para activar una foto: descargala de un banco gratuito de uso comercial (sin atribución) —

- Tango / conexión: https://unsplash.com/s/photos/tango-argentino
- Confianza en equipos: https://unsplash.com/s/photos/trust-business
- Trabajo en equipo: https://unsplash.com/s/photos/teamwork
- Liderazgo: https://unsplash.com/s/photos/leadership

— y guardala **exactamente** con el nombre que espera cada slide (formato `.jpg`, se puede
cambiar la extensión en `content.json` si preferís `.png`/`.webp`):

| Nivel | Frase | Archivo esperado |
|---|---|---|
| Fun | Communication goes beyond words. | `assets/takeaways/fun-1.jpg` |
| Fun | Vulnerability strengthens connection. | `assets/takeaways/fun-2.jpg` |
| Fun | Trust is built through shared experiences. | `assets/takeaways/fun-3.jpg` |
| Fun | Growth begins outside the comfort zone. | `assets/takeaways/fun-4.jpg` |
| Team | Experience both leadership and followership. | `assets/takeaways/team-1.jpg` |
| Team | Improve clarity, timing and responsiveness. | `assets/takeaways/team-2.jpg` |
| Team | Understand how trust is created. | `assets/takeaways/team-3.jpg` |
| Team | Develop adaptability in collaborative environments. | `assets/takeaways/team-4.jpg` |
| Team | Increase awareness to enable better choices. | `assets/takeaways/team-5.jpg` |
| Leaders | Leadership is relational, not positional. | `assets/takeaways/leaders-1.jpg` |
| Leaders | Balance clarity with care. | `assets/takeaways/leaders-2.jpg` |
| Leaders | Recognize personal leadership patterns. | `assets/takeaways/leaders-3.jpg` |
| Leaders | Develop sustainable self-leadership. | `assets/takeaways/leaders-4.jpg` |

Recomendado: fotos horizontales (apaisadas), ya que se recortan a una caja de 16:9 aprox.
(`object-cover`).

## Pendientes antes de publicar (buscar `TODO` en el código)

- **`index.html`** → `<form action="https://formspree.io/f/REPLACE_ME">`: reemplazar por el
  endpoint real de [Formspree](https://formspree.io/) o [Getform](https://getform.io/). Hasta
  que no se reemplace, el formulario no envía datos a ningún lado: solo muestra el mensaje de
  confirmación (método `submitForm` en `script.js`).
- **`index.html`** → botones "Book a Discovery Call" (`href="#contact"`): reemplazar por el
  link real de agenda (Calendly u otro) si se prefiere saltar directo a un calendario en vez de
  bajar al formulario de contacto.
- **`content.json`** → `footer.contacto.email` y `footer.contacto.telefono`: confirmar los
  datos de contacto reales.
- **`content.json`** → sección `packages`: reemplazar características y notas de precio
  inventadas por las reales.
- **`content.json`** → sección `testimonials`: las 3 tarjetas son placeholders visibles a
  propósito (dicen literalmente "Add a real quote..."), no inventé testimonios falsos con
  nombres inventados. Reemplazalas por citas reales de participantes/clientes antes de publicar
  — si no tenés ninguna todavía, sacá la sección del `index.html` en vez de dejarla así.

## Cómo probar el sitio localmente

Como `script.js` usa `fetch('content.json')`, abrir `index.html` con doble clic (protocolo
`file://`) puede fallar por CORS en algunos navegadores. Para evitarlo, levantá un servidor
local simple desde la carpeta del proyecto:

**Con Python 3:**
```bash
python -m http.server 8000
```
Luego abrí [http://localhost:8000](http://localhost:8000) en el navegador.

**Con Node.js (si tenés `npx` instalado):**
```bash
npx serve .
```

También necesitás conexión a internet, porque Tailwind, daisyUI, Alpine.js, AOS y la fuente
Manrope se cargan desde sus CDN.

## Responsive

El sitio está pensado mobile-first con los breakpoints estándar de Tailwind (`sm`, `md`, `lg`).
Probado en tres anchos de referencia: 375px (mobile), 768px (tablet) y 1440px (desktop). El
menú se colapsa en mobile/tablet (`< 768px`) y se expande en desktop.
