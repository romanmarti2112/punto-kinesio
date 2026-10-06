// Captura cada sección por separado (con animaciones ya disparadas).
// Uso: node scripts/sections.mjs <ancho> <carpeta> [url]
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const [width = '1440', outDir = 'shots', url = 'http://localhost:4321/'] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const w = +width;

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({
  viewport: { width: w, height: w < 768 ? 844 : 900 },
  isMobile: w < 768,
  hasTouch: w < 1024,
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 300) {
    window.scrollTo({ top: y, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 60));
  }
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  window.scrollTo({ top: 0, behavior: 'instant' });
  await new Promise((r) => setTimeout(r, 1500));
});

// Primera pantalla tal como la ve el usuario.
await page.screenshot({ path: `${outDir}/${w}-00-viewport.png` });

const blocks = await page.$$('main > section, main > div, footer');
let i = 1;
for (const b of blocks) {
  const id = (await b.getAttribute('id')) ?? (await b.getAttribute('class'))?.split(' ')[0] ?? 'x';
  await b.screenshot({ path: `${outDir}/${w}-${String(i++).padStart(2, '0')}-${id}.png` });
}
await browser.close();
console.log('OK', i - 1, 'secciones');
