/**
 * Section entrances (Fase 4, web-info/diseno.md → Movimiento): elements with [data-reveal]
 * fade in and rise 12px once, when they enter the viewport. Elements that enter together
 * are staggered 60ms apart (at most 4 steps). Runs only when <html> has the "motion" class,
 * which BaseLayout never sets with prefers-reduced-motion.
 * After its entrance an element loses the reveal attributes, so its own transitions
 * (hover, selection) are not slowed down by the entrance timing.
 */
declare global {
  interface Window {
    __tplvReveal?: boolean;
  }
}

const STEP_MS = 60;
const MAX_STEPS = 4;

const root = document.documentElement;

if (root.classList.contains('motion')) {
  window.__tplvReveal = true;

  const finish = (element: HTMLElement) => {
    element.removeAttribute('data-reveal');
    element.removeAttribute('data-revealed');
    element.style.removeProperty('--reveal-delay');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target as HTMLElement)
        // Document order, so the stagger reads top to bottom, left to right.
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .forEach((element, index) => {
          observer.unobserve(element);
          element.style.setProperty('--reveal-delay', `${Math.min(index, MAX_STEPS) * STEP_MS}ms`);
          element.setAttribute('data-revealed', '');
          const done = (event: TransitionEvent) => {
            if (event.target !== element || event.propertyName !== 'opacity') return;
            element.removeEventListener('transitionend', done);
            finish(element);
          };
          element.addEventListener('transitionend', done);
        });
    },
    { rootMargin: '0px 0px -5% 0px', threshold: 0.05 },
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => observer.observe(element));
}

export {};
