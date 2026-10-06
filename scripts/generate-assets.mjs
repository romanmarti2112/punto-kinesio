// Genera favicons PNG y la imagen para redes (Open Graph) a partir de los datos y fotos del proyecto.
// Uso: node scripts/generate-assets.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));

const pin = (size, bg = '#f6f3ee') => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${bg}"/>
  <g transform="translate(16 16) scale(0.78) translate(-16 -16)">
    <path fill="#0e1419" d="M16 1C9.6 1 4.5 6 4.5 12.3 4.5 20.6 16 31 16 31s11.5-10.4 11.5-18.7C27.5 6 22.4 1 16 1Z"/>
    <circle cx="16" cy="12.2" r="6.4" fill="#f6f3ee"/>
    <circle cx="16" cy="12.2" r="3.9" fill="#0b6fb3"/>
  </g>
</svg>`;

await sharp(Buffer.from(pin(180)))
  .png()
  .toFile(root('public/apple-touch-icon.png'));
await sharp(
  Buffer.from(
    pin(32, 'transparent').replace('<rect width="32" height="32" fill="transparent"/>', ''),
  ),
)
  .png()
  .toFile(root('public/favicon-32.png'));
await sharp(Buffer.from(pin(192)))
  .png()
  .toFile(root('public/icon-192.png'));
await sharp(Buffer.from(pin(512)))
  .png()
  .toFile(root('public/icon-512.png'));

// Open Graph 1200×630: foto a la derecha, marca a la izquierda.
const W = 1200;
const H = 630;
const photo = await sharp(root('src/assets/images/hero.jpg'))
  .resize(560, H, { fit: 'cover', position: 'attention' })
  .toBuffer();

const text = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#f6f3ee"/>
  <g transform="translate(72 92)">
    <path transform="scale(1.6)" fill="#0e1419" d="M12 0C5.4 0 0 5.3 0 11.8 0 20.4 12 32 12 32s12-11.6 12-20.2C24 5.3 18.6 0 12 0Z"/>
    <circle cx="19.2" cy="18.6" r="10.6" fill="#f6f3ee"/>
    <circle cx="19.2" cy="18.6" r="6.4" fill="#0b6fb3"/>
  </g>
  <text x="72" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="600" letter-spacing="-3" fill="#0e1419">punto<tspan fill="#0b6fb3">kinesio</tspan></text>
  <text x="76" y="368" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="5" fill="#5a6570">KINESIOLOGÍA &amp; FISIOTERAPIA</text>
  <rect x="76" y="430" width="10" height="10" rx="5" fill="#0b6fb3"/>
  <text x="100" y="441" font-family="Segoe UI, Arial, sans-serif" font-size="24" font-weight="600" fill="#27313a">Mendoza, Argentina</text>
  <text x="76" y="540" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#5a6570">Turnos por WhatsApp</text>
</svg>`;

await sharp(Buffer.from(text))
  .composite([{ input: photo, left: W - 560, top: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(root('public/og-image.jpg'));

console.log('Recursos generados en /public');
