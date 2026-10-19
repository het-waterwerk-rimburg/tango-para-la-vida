# Sistema visual — Tango Para La Vida

> Escrito en la **Fase 1** (`/ui-ux-pro-max`, 18-10-2026). Opción elegida por el cliente: **B · Sobrio moderno**.
> Muestra visual: https://claude.ai/artifact/EjGXxPNASnwCUBBnS5MywQ
> Es la única fuente de verdad del diseño: ninguna skill puede crear otro archivo de diseño.
> **Ajuste 19-10-2026 (petición del cliente, `/ui-ux-pro-max`):** más protagonismo del azul medio `#3782d3` y menos crema como fondo. Ver tabla y reglas.

**Dirección:** corporativo, limpio, de corte suizo. Mucho espacio en blanco, jerarquía con tamaño y peso (no con color), una sola familia sans y la cursiva serif reservada a citas. El color de marca se usa con contención: el azul marino lleva la marca, el dorado solo marca la acción principal.
Referencias: masteryhaus.com (estructura de oferta, espacio), ideou.com (programas por niveles y método), theschooloflife.com (tono serio y humano).

## Colores
Paleta de marca fija, idéntica a tangomj.nl. No se añaden tonos nuevos: las variantes se hacen con opacidad o `color-mix`.

| Token | Hex | Uso | Contraste sobre fondo |
|---|---|---|---|
| `--color-principal` | `#073a7c` | Azul marino. Titulares, citas, enlaces de navegación activos, footer, bandas oscuras puntuales (CTA final), bordes de foco secundarios | 11.02 sobre blanco · 10.21 sobre crema |
| `--color-secundario` | `#3782d3` | Azul medio, segundo color de marca con presencia visible: barritas de acento sobre títulos (beneficios, pilares), comilla grande de las citas, filetes de citas, checks, flechas, iconos de la FAQ, bordes de las píldoras de focus y **numeración del método** (texto grande en negrita: ≥18.66px bold, umbral 3:1). Nunca en texto pequeño | 3.97 sobre blanco: ✅ no-texto y texto grande · ❌ texto normal |
| `--color-secundario-ink` | `#2b65a5` | `color-mix(in srgb, #3782d3 78%, #000)`. Texto en azul medio: numeración del método, etiquetas, enlaces en texto | 5.99 sobre blanco · 5.55 sobre crema ✅ |
| `--color-acento` | `#7a1f2b` | Burdeos. Uso mínimo: hover de enlaces de texto, estados de error | 9.45 sobre crema ✅ |
| `--color-detalle` | `#f6b40e` | Dorado. **Solo** fondo del botón principal (reservar o contactar) y anillo de foco. Nunca como texto sobre fondo claro | Texto `#2c2c2a` sobre dorado: 7.63 ✅ · dorado sobre azul marino: 6.01 ✅ |
| `--color-texto` | `#2c2c2a` | Texto de cuerpo y titulares secundarios | 13.99 sobre blanco ✅ |
| `--color-texto-muted` | `#2c2c2a` al 70 % | Texto secundario (metadatos, notas). Mínimo 70 %: al 60 % falla AA | 5.10 sobre crema ✅ |
| `--color-crema` | `#f2eee6` | Crema de marca. **Solo texto sobre azul marino** (contacto, pie). Desde el 19-10-2026 ya no se usa como fondo | Crema sobre azul marino: 9.52 ✅ |
| `--color-azul-suave` | `#ebf2fb` | `#3782d3` al 10 % sobre blanco. Fondo de bloques puntuales: prensa, citas ("lo que se llevan"), etiqueta "Recommended", mensaje de éxito | Azul marino 9.78 · texto 12.41 · texto atenuado 5.04 · `-ink` 5.31 ✅ |
| `--color-bg` | `#ffffff` | Fondo principal de página | — |
| `--color-bg-alt` | `#f5f9fd` | `#3782d3` al 5 % sobre blanco (antes gris `#f6f6f6`). Fondo alterno de secciones (Programas, Facilitadores) | Azul marino 10.42 · texto atenuado 5.15 ✅ |
| `--color-surface` | `#ffffff` | Tarjetas y paneles sobre `--color-bg-alt` | — |
| `--color-line` | `#073a7c` al 14 % | Bordes y divisores | Decorativo |

**Reglas de uso**
- Un solo elemento dorado por pantalla visible: el CTA principal. El resto de botones son de contorno azul.
- El azul medio aporta el color de la página (acentos y fondos tintados); el azul marino sigue llevando titulares y bandas oscuras. Fondos posibles: blanco, `bg-alt`, `azul-suave` y azul marino. Crema nunca como fondo.
- Selección de texto: `#3782d3` al 22 %.
- Sin degradados (tampoco el resplandor dorado del sitio anterior).
- Fotografía sin filtros de color; sobre foto, texto blanco o crema solo con una capa azul marino que garantice 4.5:1.

## Tipografía
- **Familia principal:** **IBM Plex Sans** (Google Fonts, autoalojada): pesos 400, 500, 600 y 700. Cursiva 400 solo si hace falta en texto.
- **Citas y testimonios:** **IBM Plex Serif** cursiva 400. No se usa en titulares, botones ni texto corrido.
- **Números:** `font-variant-numeric: tabular-nums` en precios, duraciones y numeración del método.
- **Titulares y botones en mayúscula tipo frase** ("Book a discovery call"), salvo nombres propios y de programa.
- **Sin etiquetas en mayúsculas encima de los títulos** (eyebrows): el título se sostiene solo.

| Rol | Tamaño | Peso | Interlineado | Tracking |
|---|---|---|---|---|
| Display (titular del hero) | `clamp(2.5rem, 1.6rem + 3.6vw, 4rem)` (40 → 64px) | 600 | 1.05 | -0.03em |
| H2 (título de sección) | `clamp(1.875rem, 1.4rem + 1.8vw, 2.75rem)` (30 → 44px) | 600 | 1.12 | -0.02em |
| H3 (tarjeta, programa) | `clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)` (20 → 24px) | 600 | 1.25 | -0.01em |
| Lead (subtítulo) | `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)` (17 → 20px) | 400 | 1.6 | 0 |
| Body | 17px (1.0625rem) | 400 | 1.65 | 0 |
| Small (metadatos, notas) | 14px | 400 / 500 | 1.5 | 0 |
| Label (botones, navegación) | 15.5px | 500 / 600 | 1 | 0.005em |
| Cita | `clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)` (20 → 26px) | Plex Serif 400 cursiva | 1.45 | 0 |

- Medida de línea: 60–72 caracteres en texto corrido (`max-width: 68ch`).
- Titulares con `text-wrap: balance`.

## Espaciado
Escala de 4px: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.
- **Secciones:** padding vertical `clamp(4rem, 3rem + 5vw, 8rem)` (64 → 128px).
- **Contenedor:** `max-width: 1200px`, márgenes laterales `clamp(1.25rem, 5vw, 4rem)` (mínimo 20px en móvil).
- **Intro de sección → contenido:** 48–64px. Entre tarjetas: 24px. Dentro de tarjeta: 28–32px.
- Más espacio encima de un título que debajo.

## Radios
- **Botones:** `999px` (píldora).
- **Tarjetas y paneles:** 16px.
- **Inputs:** 12px.
- **Imágenes:** 16px (las fotografías grandes del hero pueden ir a sangre, sin radio).

## Sombras y bordes
- **Bordes:** 1px `--color-line` en tarjetas y divisores; 1.5px en botones de contorno (`#073a7c` al 35 %, al 100 % en hover).
- **Sombra en reposo:** ninguna, o `0 1px 2px rgba(7, 58, 124, 0.04)`.
- **Sombra en hover (solo tarjetas interactivas):** `0 16px 36px rgba(7, 58, 124, 0.10)`.
- **Foco:** anillo de 2px `--color-detalle` con `outline-offset: 3px` (sobre azul marino también dorado: 6.01 ✅).
- Divisores finos de 1px entre filas (método, listas de paquetes) en lugar de tarjetas cuando no hace falta separar objetos.

## Movimiento (lo aplica la Fase 4)
- **Tesis:** sobriedad. Un solo momento de entrada suave por sección, nada de texto partido en letras ni efectos distintos por sección (se retira el sistema del sitio anterior).
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (entradas) · `cubic-bezier(0.4, 0, 1, 1)` (salidas).
- **Duraciones:** 0.2s (hover y estados) · 0.45s (entradas de sección) · 0.3s (cambio de nivel o paquete, fundido cruzado).
- **Entradas:** `opacity` 0 → 1 y `translateY` 12px → 0, una vez, con `IntersectionObserver`; escalonado de 60ms como máximo entre hermanos.
- **Botones:** sin zoom; cambio de color o borde en hover y `scale(0.98)` en `:active`.
- **Reduced motion:** obligatorio. Todo visible desde el inicio, sin desplazamientos.
