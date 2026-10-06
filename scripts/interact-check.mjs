// Prueba de interacción: menú mobile, FAQ y movimiento reducido.
import { chromium } from 'playwright-core';
const url = process.argv[2] ?? 'http://localhost:4321/';
const out = process.argv[3];
const b = await chromium.launch({ channel: 'msedge' });
const ok = (c, m) => console.log(`${c ? '✓' : '✗'} ${m}`);

const p = await b.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await p.goto(url, { waitUntil: 'networkidle' });
await p.click('[data-menu-toggle]');
await p.waitForTimeout(900);
ok(
  (await p.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'true',
  'menú abre (aria-expanded=true)',
);
ok(await p.isVisible('#menu-mobile a[href="#servicios"]'), 'links del menú visibles');
if (out) await p.screenshot({ path: `${out}/menu-390.png` });
await p.click('#menu-mobile a[href="#servicios"]');
await p.waitForTimeout(1200);
ok(
  (await p.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'false',
  'menú cierra al elegir link',
);
const top = await p.evaluate(
  () => document.querySelector('#servicios').getBoundingClientRect().top,
);
ok(Math.abs(top - 68) < 30, `scroll a #servicios (top=${Math.round(top)}px, bajo la nav)`);
await p.click('[data-menu-toggle]');
await p.keyboard.press('Escape');
await p.waitForTimeout(300);
ok(
  (await p.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'false',
  'Escape cierra el menú',
);

await p.locator('.qa summary').first().click();
await p.waitForTimeout(600);
ok(
  await p
    .locator('.qa')
    .first()
    .evaluate((d) => d.open),
  'FAQ se despliega',
);
ok(await p.isVisible('.wa-float'), 'botón flotante de WhatsApp visible');

const r = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
await r.goto(url, { waitUntil: 'networkidle' });
const hidden = await r.evaluate(
  () =>
    [...document.querySelectorAll('[data-reveal]')].filter(
      (e) => getComputedStyle(e).opacity !== '1',
    ).length,
);
ok(hidden === 0, `movimiento reducido: todo visible sin animar (${hidden} ocultos)`);
const anim = await r.evaluate(
  () => getComputedStyle(document.querySelector('.ticker__track')).animationDuration,
);
ok(parseFloat(anim) < 0.1, `movimiento reducido: cinta detenida (${anim})`);

const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
await d.goto(url, { waitUntil: 'networkidle' });
await d.hover('.wa-float');
await d.waitForTimeout(500);
ok(
  (await d.locator('.wa-float__tip').evaluate((e) => getComputedStyle(e).opacity)) === '1',
  'tooltip de WhatsApp en desktop',
);
if (out)
  await d.screenshot({
    path: `${out}/tooltip-1440.png`,
    clip: { x: 1100, y: 780, width: 340, height: 120 },
  });
await b.close();
