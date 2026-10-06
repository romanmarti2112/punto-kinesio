/**
 * Todo el JavaScript del sitio (~2 KB): animaciones de entrada, parallax,
 * estado de la navegación y menú mobile. Sin dependencias.
 */

const root = document.documentElement;
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

/* ---------- 1. Aparición progresiva ---------- */

const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!motionOK || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));
}

/* ---------- 2. Parallax sutil + desplazamiento horizontal ---------- */

const parallaxEls = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
const driftEls = [...document.querySelectorAll<HTMLElement>('[data-drift]')];
const visible = new Set<HTMLElement>();

if (motionOK && (parallaxEls.length || driftEls.length)) {
  const vio = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) visible.add(el);
      else visible.delete(el);
    }
    requestTick();
  });
  [...parallaxEls, ...driftEls].forEach((el) => vio.observe(el));
}

let ticking = false;
function requestTick() {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
}

function update() {
  ticking = false;
  const vh = window.innerHeight;
  for (const el of visible) {
    const host = el.parentElement ?? el;
    const rect = host.getBoundingClientRect();
    // -1 (abajo de la pantalla) … 0 (centrado) … 1 (arriba)
    const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
    if (el.dataset.parallax !== undefined) {
      // Máx. ±6 % del alto de la capa: queda dentro del margen de -8 % del marco.
      const speed = Math.min(Number(el.dataset.parallax) || 0.05, 0.06);
      el.style.setProperty('--py', `${(progress * speed * 100).toFixed(2)}%`);
    } else {
      const speed = Number(el.dataset.drift) || 12;
      el.style.setProperty('--dx', `${(-progress * speed).toFixed(2)}%`);
    }
  }
}

/* ---------- 3. Navegación: estado al hacer scroll + sección activa ---------- */

const nav = document.querySelector<HTMLElement>('[data-nav]');

function onScroll() {
  nav?.classList.toggle('is-scrolled', window.scrollY > 12);
  if (visible.size) requestTick();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', requestTick, { passive: true });
onScroll();

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
const sections = navLinks
  .map((a) => document.querySelector<HTMLElement>(a.hash))
  .filter((s): s is HTMLElement => Boolean(s));

if (sections.length && 'IntersectionObserver' in window) {
  const sio = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const id = `#${e.target.id}`;
        navLinks.forEach((a) => {
          if (a.hash === id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  sections.forEach((s) => sio.observe(s));
}

/* ---------- 4. Menú mobile ---------- */

const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');

function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  root.classList.toggle('menu-open', open);
  menu.toggleAttribute('inert', !open);
  if (open) menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
}

if (toggle && menu) {
  menu.setAttribute('inert', '');
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('menu-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (mq) => {
    if (mq.matches) setMenu(false);
  });
}
