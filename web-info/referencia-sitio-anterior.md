# Tango Para La Vida

Landing page de **Tango Para La Vida**: programas de desarrollo de equipos y liderazgo que usan el tango como metodología (comunicación, confianza, liderar y seguir). Público: empresas y equipos. Tres niveles de programa (Fun / Team / Leaders), cada uno con 3 paquetes (Basic / Normal / Premium). El copy visible está en **inglés**.

## Regla obligatoria: skills y plugins de diseño

**Siempre que vayas a tocar algo del sitio (HTML, estilos, animaciones, layout, copy visual, componentes), usa antes estos skills y plugins de diseño. No es opcional ni depende del tamaño del cambio:**

1. **`emil-design-eng`**: filosofía de Emil Kowalski sobre pulido de UI y decisiones de animación (frecuencia, propósito, easing, duración, `:active`, sin `scale(0)`, solo `transform` y `opacity`, stagger corto, `prefers-reduced-motion`).
2. **`impeccable`**: ejecutar primero su paso de contexto (`.claude/skills/impeccable/scripts/impeccable context`, con `.cmd` en Windows) y seguir su referencia según el tipo de tarea (`animate`, `polish`, `critique`, `audit`, etc.). Respetar su `craft-floor` antes de editar UI. Su hook de detección corre solo tras editar archivos de UI.
3. **`ui-ux-pro-max`**: no es un plugin de Claude Code sino un skill instalado con el CLI `uipro` (paquete npm global `ui-ux-pro-max-cli`). Está en `.claude/skills/ui-ux-pro-max/` de este proyecto, junto con `design`, `design-system`, `brand`, `ui-styling`, `slides` y `banner-design`. Consultarlo con su script (`python .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --design-system` o `--domain ux|style|color|typography|motion|landing`). **Requiere Python 3**, que hoy NO está instalado en este equipo (solo existe el acceso directo de la Microsoft Store); no instalarlo por cuenta propia, pedírselo a la usuaria. Mientras tanto, sus datos son CSV legibles en `.claude/skills/ui-ux-pro-max/data/` (`ux-guidelines.csv`, `motion.csv`, `landing.csv`, `products.csv`, `typography.csv`, `colors.csv`).
4. **Los plugins de diseño instalados actualmente**: hoy `frontend-design` (`frontend-design:frontend-design`). Si se instalan otros plugins de diseño, se suman a esta lista. Revisar `~/.claude/plugins/installed_plugins.json` para ver cuáles hay.

Los skills viven en `../.claude/skills/` (workspace `Het Waterwerk Websites`). Si un skill propone algo que contradice la paleta o las reglas de marca de abajo, ganan las reglas de marca.

## Stack

Página única, sin build tools, todo por CDN. Se abre con un servidor local (usa `fetch('content.json')`).

- **Tailwind CSS** (Play CDN) con el tema de marca en el bloque `tailwind.config` del `<head>`.
- **daisyUI** (solo clases estructurales: `.btn`, `.card`, `.tabs`, `.collapse`, `.badge`, `.input`); los colores siempre vienen de las utilidades de marca, nunca del tema de daisyUI.
- **Alpine.js** para toda la interacción (menú móvil, selector de nivel, selector de paquete, slider, testimonios, FAQ, formulario).
- **Sistema de movimiento propio** (`motion.css` + `motion.js`, sin dependencias). **AOS ya no se usa**: no volver a añadirlo ni mezclar otra librería de animación.

```
index.html      Todo el markup con directivas Alpine y atributos data-fx / data-text
content.json    TODOS los textos editables (hero, benefits, programs, packages, method, testimonials, about, faq, finalCta, formulario, footer)
script.js       Componente Alpine `site()`: carga content.json, estado y métodos; arranca el motor de movimiento
motion.css      Todas las animaciones de aparición, de texto y detalles (nav, progreso, selección, scrollbar)
motion.js       Motor: IntersectionObserver, separación de texto en letras/palabras, scrub, scrollspy, glow del hero
assets/         Logos, favicon y assets/takeaways/ (fotos del slider, aún vacío)
README.md       Documentación detallada (edición de textos, TODOs previos a publicar)
```

Los estilos de layout siguen siendo clases de Tailwind/daisyUI en el HTML (más un `<style>` pequeño en el `<head>`); el movimiento vive aparte en `motion.css`. Los textos no se escriben en el HTML: se editan en `content.json` y Alpine los pinta.

## Sistema de movimiento

Tesis: el tango es **guiar y seguir**. Un momento focal (el titular del hero entra letra a letra) y cada sección siguiente entra con una técnica distinta a la anterior.

- `data-fx="nombre"` anima el propio elemento al entrar en pantalla (una vez): `rise`, `haze`, `pop`, `settle`, `lead`, `follow`, `curtain`, `unfold`, `fan-l/c/r`, `flip-l/r`, `wipe`, `iris`, `cascade`.
- `data-text="nombre"` parte el texto y anima las piezas: `rise` (letras, hero), `mask` (palabras), `focus` (letras desde el desenfoque), `pairs` (letras alternas desde lados opuestos), `glide` (palabras), `scrub` (las palabras se iluminan con el scroll).
- Variables por elemento: `--i` (índice de stagger, 80ms por paso, tope 560ms), `--d` (retardo extra), `--dur` (duración). `.fx-child` anima un hijo cuando su ancestro `[data-fx]` se revela.
- Por sección: Hero `rise` letras · Benefits `curtain` + `mask` · Programs `unfold` + `fan` + `focus` · Method `flip` + `wipe` · Testimonials `settle` + `haze` · About `scrub` + `glide` · FAQ `lead/follow` + `pairs` · CTA final `iris` + anillo de pulso · Contacto `lead/follow` + `cascade` · Footer `rise`. Al añadir una sección, elegir una técnica que no sea la de la sección anterior.
- Las animaciones usan `fill-mode: backwards` y las propiedades individuales `translate` / `rotate` / `scale`, para no pisar los `hover:` de Tailwind. Solo `opacity`, `transform`, `filter` y `clip-path`.
- `window.TangoMotion.mount()` se llama desde `script.js` **después** de que Alpine pinte el contenido; un `MutationObserver` recoge lo que Alpine inserte después. `swap()` hace el crossfade del panel al cambiar de nivel (`data-swap`).
- `prefers-reduced-motion`: el texto no se parte, desaparecen movimiento, blur y recortes, y queda un fundido corto. Si el motor falla o `motion.js` no carga, se añade `html.fx-off` y todo queda visible.
- Hero: además de las letras del titular, dos trazos de suelo (`.hero-trails`, SVG) se dibujan una vez detrás: el azul marino "guía" y el dorado punteado (pasos) "sigue" medio segundo después. Forman parte del mismo momento focal; no añadir otro efecto al hero.
- Selector de nivel: control segmentado (`.level-switch`) con una píldora azul que se desliza al nivel elegido (`--sel`); flechas ← → cambian de nivel. Los chips del hero (`jumpToLevel(i)`) eligen nivel y bajan a Programs.
- Otros detalles: flecha de los CTA que avanza 4px en hover, enlaces del menú móvil que entran escalonados, check del paquete elegido que se dibuja, barra de progreso dorada bajo el header, subrayado dorado del nav con scrollspy, glow del hero que sigue al puntero (solo con puntero fino), `::selection`, scrollbar y `caret` con la paleta, `hover:` solo en dispositivos con hover (`hoverOnlyWhenSupported`), `:active` a `scale(0.97)`.
- daisyUI pinta la pestaña seleccionada en violeta por defecto: se fuerza al azul de marca con un override en el `<style>` del `<head>`.

## Marca

Paleta (definida en `tailwind.config`; no inventar colores nuevos, solo opacidad/tinte de estos):

| Token | Hex | Uso |
|---|---|---|
| `principal` | `#073a7c` | Azul marino: headings, bordes, botón secundario, footer y CTA final |
| `secundario` | `#3782d3` | Azul medio: eyebrows, badges, checks, focus de inputs |
| `acento` | `#7A1F2B` | Burdeos: hover de bordes y links, estados de error |
| `detalle` | `#f6b40e` | Dorado: CTA principal, selección, foco, línea decorativa |
| `texto` | `#2C2C2A` | Texto de cuerpo (con opacidad 0.5 a 0.8 para jerarquía) |
| `header` | `#F2EEE6` | Header y textos sobre azul |
| `bg` / `surface` | `#f6f6f6` / `#ffffff` | Fondo de página / cards |

- Tipografía: **Manrope** (400 a 800) desde Google Fonts. Escala fluida: h1 `clamp(2.5rem,…,5.25rem)` con tracking `-0.035em`; h2 de sección `clamp(2rem,…,3.25rem)` con `-0.025em`; texto de cards 15px con `leading-relaxed`. Títulos y botones en **mayúscula tipo frase** ("Book a discovery call"), salvo nombres propios y de programa.
- Sin etiquetas/eyebrows en mayúsculas encima de los títulos (el título se sostiene solo). Las claves `hero.eyebrow` y `about.eyebrow` siguen en `content.json` pero ya no se pintan.
- Jerarquía de CTA: **dorado = reservar/contactar** (header, hero, Method, CTA final, enviar formulario), con flecha SVG; **contorno azul = navegar dentro de la página** ("Explore the programs", "See how it works"). No usar botones azules sólidos que compitan con el dorado, salvo "Continue to booking" dentro del flujo de paquetes.
- Iconos siempre en SVG (chevrons del slider, flechas, checks); nunca caracteres como ‹ › ✓ ↓.
- Navegación: 4 enlaces (Programs, Method, About, FAQ) + botón "Book a call" visible también en móvil; el menú móvil se cierra con Escape y hay enlace "Skip to content".
- Radios: `sm` 14px, `md` 20px, `lg` 28px, `rounded-full` para botones y pills.
- Cards y botones con **borde sólido visible** (1.5px cards, 2px botones). Botones: zoom `hover:scale-[1.04]`; cards: solo `translateY`, sin `scale`.
- Easing de marca: `cubic-bezier(0.22, 1, 0.36, 1)` (`ease-premium`).
- Sin gradientes salvo el resplandor sutil dorado del hero (ya existente).
- Respetar `prefers-reduced-motion` siempre.
- Accesibilidad (reglas de `ui-ux-pro-max`): texto ≥ 4,5:1 de contraste (para texto usar `text-secundario-ink`, no `text-secundario`; no bajar de `text-texto/70`), áreas táctiles ≥ 24px, y todo contenido que rote solo lleva botón de pausa/play, prev/next y se detiene con hover, foco y reduced motion.

## Estructura de la página

Header fijo → Hero (con accesos a los 3 niveles) → Benefits (6 cards) → Programs + Packages (tabs de nivel, slider "What participants take away", 3 paquetes) → Method (6 etapas) → Testimonials (carrusel) → About (pilares y facilitadores) → FAQ → CTA final → Contacto (formulario con nivel y paquete sincronizados) → Footer.

## Reglas de trabajo

- Nunca borrar claves de `content.json`; solo cambiar valores. Si se añade una sección, añadir sus claves.
- Nivel y paquete seleccionados (`selectedLevel`, `selectedPackage`) están compartidos entre Programs, Method y el formulario. No romper esa sincronía.
- Mantener el orden de scripts en el `<head>`: `script.js` debe cargarse antes que Alpine.
- Como el contenido se renderiza con Alpine (`x-if="content"`), cualquier animación que dependa de elementos del DOM debe inicializarse **después** de que `content` cargue (hoy `init()` espera `$nextTick`).
- Al tocar diseño, actualizar este archivo si cambia el stack o las reglas de marca.

## Pendiente antes de publicar (ver README)

- Endpoint real del formulario (`formspree.io/f/REPLACE_ME`) y link de agenda (Calendly u otro).
- Email y teléfono reales en `footer.contacto`.
- Paquetes: características y precios reales (hoy son placeholder).
- Testimonios reales (hoy placeholders visibles a propósito) o quitar la sección.
- Fotos del slider en `assets/takeaways/` (hay iconos de respaldo).
- `<meta name="description">` está vacío en el HTML (se rellena por JS desde `content.json`); para SEO conviene ponerlo estático.
