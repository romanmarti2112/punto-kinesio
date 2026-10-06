// QA automático con el Edge del sistema.
// Uso: node scripts/qa.mjs [url=http://localhost:4321/] [carpeta-capturas]
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:4321/';
const outDir = process.argv[3];
const widths = [375, 390, 430, 768, 1024, 1440];
if (outDir) mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' });
let problems = 0;

for (const width of widths) {
  const height = width < 768 ? 844 : width < 1024 ? 1024 : 900;
  const page = await browser.newPage({
    viewport: { width, height },
    isMobile: width < 768,
    hasTouch: width < 1024,
  });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) =>
    errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText}`),
  );
  page.on('response', (r) => r.status() >= 400 && errors.push(`HTTP ${r.status()}: ${r.url()}`));

  await page.goto(url, { waitUntil: 'networkidle' });

  // Recorre la página para disparar animaciones y carga diferida.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.6) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 900));
  });

  const overflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width && (r.right > vw + 1 || r.left < -1)) {
        // Ignora lo que está dentro de un contenedor con overflow recortado o desplazable.
        let p = el.parentElement;
        let clipped = false;
        while (p && p !== document.body) {
          const o = getComputedStyle(p).overflowX;
          if (o !== 'visible') {
            clipped = true;
            break;
          }
          p = p.parentElement;
        }
        if (!clipped)
          offenders.push(
            `${el.tagName.toLowerCase()}.${[...el.classList].join('.')} (${Math.round(r.left)}→${Math.round(r.right)})`,
          );
      }
    }
    return { scrollW: document.documentElement.scrollWidth, vw, offenders: offenders.slice(0, 8) };
  });

  const h1s = await page.locator('h1').count();
  // Las fotos del carrusel mobile se revelan al deslizar: no cuentan.
  const hidden = await page
    .locator('[data-reveal]:not(.is-in):not(.gallery__scroller [data-reveal])')
    .count();
  const imgsNoAlt = await page.locator('img:not([alt])').count();

  const hasHScroll = overflow.scrollW > overflow.vw;
  const status =
    !errors.length && !hasHScroll && h1s === 1 && !hidden && !imgsNoAlt ? 'OK ' : 'REVISAR';
  if (status !== 'OK ') problems++;
  console.log(
    `\n[${status}] ${width}px — scrollWidth ${overflow.scrollW}/${overflow.vw}, h1=${h1s}, sin revelar=${hidden}, img sin alt=${imgsNoAlt}`,
  );
  if (overflow.offenders.length)
    console.log('  fuera del viewport:', overflow.offenders.join(' | '));
  errors.forEach((e) => console.log('  ' + e));

  if (outDir) await page.screenshot({ path: `${outDir}/full-${width}.png`, fullPage: true });
  await page.close();
}

// Inventario de links (una sola vez).
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });
const links = await page.$$eval('a[href]', (as) => [
  ...new Set(as.map((a) => a.getAttribute('href'))),
]);
const ids = await page.$$eval('[id]', (els) => els.map((e) => e.id));
console.log('\nLinks:');
for (const href of links) {
  const broken = href.startsWith('#') && href.length > 1 && !ids.includes(href.slice(1));
  if (broken) problems++;
  console.log(`  ${broken ? '✗ ANCLA ROTA' : '·'} ${href}`);
}
await browser.close();
console.log(`\nProblemas: ${problems}`);
process.exit(problems ? 1 : 0);
