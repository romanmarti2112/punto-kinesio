// Captura de pantalla con el Edge del sistema (sin descargar navegadores).
// Uso: node scripts/shot.mjs <url> <salida.png> [ancho=1440] [alto=900] [full=1]
import { chromium } from 'playwright-core';

const [url, out, width = '1440', height = '900', full = '1'] = process.argv.slice(2);
if (!url || !out) {
  console.error('Uso: node scripts/shot.mjs <url> <salida.png> [ancho] [alto] [full]');
  process.exit(1);
}

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: +width, height: +height } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
await page.screenshot({ path: out, fullPage: full === '1' });
await browser.close();
console.log('OK', out);
