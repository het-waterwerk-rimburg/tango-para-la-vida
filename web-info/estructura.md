# Estructura — Tango Para La Vida

> Redactado en la Fase 0 (18-10-2026). Los textos en inglés del cliente están en
> `textos-en.json` (copia del `content.json` del sitio anterior) y se usan tal cual.
> Cada sección indica su clave en ese archivo. Lo marcado con **[PENDIENTE]** falta.
> El orden sigue el recorrido de una decisión B2B: qué es, por qué funciona, qué se compra,
> cómo se trabaja, quién lo hace y cómo empezar.

## Mapa del sitio
- [ ] Inicio, una sola página larga: `/` (EN) y `/nl/` (NL), con los mismos IDs de sección.
- [ ] Privacy policy: `/privacy/` y `/nl/privacy/`. **[PENDIENTE]** Texto (puede basarse en el de tangomj.nl).

---

## Página: Inicio

### 1. Header
- Logo, enlaces a Programs, Method, About y FAQ, selector EN/NL y botón "Book a call" (`header`).

### 2. Hero (`#top`)
- **Objetivo:** en 5 segundos, "formación de liderazgo y equipos para empresas, a través del tango, seria y con método".
- **Titular:** "Leadership learned through movement, not slides." (`hero.titulo`)
- **Subtítulo:** `hero.subtitulo`
- **CTA:** "Book a discovery call" → contacto o agenda. Secundario: "Explore the programs" → `#programs`.
- **Imagen:** `imagenes/taller-grupo.jpg` (grupo alrededor de una pareja de facilitadores). **[PENDIENTE]** Consentimiento de imagen de las personas reconocibles (ver la auditoría legal de tangomj.nl, hallazgo C-7).

### 3. Prensa / confianza (nueva)
- **Objetivo:** prueba social real sin testimonios inventados.
- **Contenido:** "As featured in" con RTV Parkstad y el artículo de prensa (solo nombres y enlaces, sin capturas de terceros). **[PENDIENTE]** Confirmar el medio del artículo y su enlace.

### 4. Por qué funciona (`#benefits`)
- **Contenido:** `benefits.titulo`, `benefits.subtitulo` y los 6 beneficios (`benefits.items`).
- **Nota de diseño:** evitar 6 tarjetas iguales con icono (prohibido por la plantilla). Se resolverá en la Fase 3.

### 5. Programas y paquetes (`#programs`)
- **Contenido:** `programs` (3 niveles: propósito, focus, lo que se llevan los participantes, nota del método) y, por nivel, sus 3 paquetes (`programs.items[].paquetes`, textos en `packages`).
- **Precios:** **[PENDIENTE]**.
- **Imágenes del slider "What participants take away":** no existen. Se sustituyen por un diseño tipográfico, sin slider.

### 6. Método (`#how-it-works`)
- **Contenido:** `method` (titular, tagline, subtítulo, 6 etapas con objetivo, actividades y pregunta).

### 7. Facilitadores (`#about`)
- **Contenido:** `about.titulo`, `about.parrafo1`, `about.parrafo2`, `about.pilares` y `about.facilitadores`.
- **Imágenes:** `imagenes/joel-retrato.webp` (1024×1024) y `imagenes/maddie-retrato.png` (solo 231×213: **[PENDIENTE]** retrato de Maddie en buena resolución).
- **Biografías:** **[PENDIENTE]** Confirmar o sustituir; las actuales son un marcador.

### 8. Testimonios (`#testimonials`): oculta hasta tener testimonios reales
- **Contenido:** `testimonials`. Se diseña y se deja desactivada con un interruptor.

### 9. FAQ (`#faq`)
- **Contenido:** `faq.items` (6 preguntas).

### 10. CTA final + contacto (`#contact`)
- **CTA:** `finalCta`.
- **Formulario:** `formulario`. Campos: nombre, email, empresa **[PENDIENTE: ¿añadir?]**, teléfono (opcional), nivel, paquete y mensaje, con nivel y paquete sincronizados con la sección de programas.
- **Destino:** **[PENDIENTE]** (¿webhook de Make.com como tangomj.nl?). Agenda: **[PENDIENTE]**.

### Footer
- Tagline (`footer.tagline`), enlaces, email info@tangomj.nl, teléfono **[PENDIENTE]**, "A program by Tango MJ" con enlace a tangomj.nl, datos legales de Het Waterwerk Rimburg V.O.F. (KvK 89925688, BTW NL865155033B01) y enlace a privacidad. Crédito "Website by Waterwerk Websolutions" (ya existe en el sitio actual).
