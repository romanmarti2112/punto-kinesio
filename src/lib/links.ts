import { business } from '../data/business';

const digits = (value: string) => value.replace(/\D/g, '');

/**
 * Convierte un celular argentino local (ej. "2615771502" o "0261 15 577-1502")
 * al formato internacional que usa WhatsApp: 54 + 9 + área + número.
 */
export function toWhatsAppNumber(local: string): string {
  let n = digits(local);
  if (n.startsWith('549')) return n;
  if (n.startsWith('54')) n = n.slice(2);
  if (n.startsWith('0')) n = n.slice(1);
  // Quita el "15" que a veces se escribe después del código de área (área de 2 a 4 dígitos).
  if (n.length === 12) n = n.replace(/^(\d{2,4}?)15(\d{6,8})$/, '$1$2');
  return `549${n}`;
}

/** "2615771502" → "261 577-1502" */
export function formatPhone(local: string): string {
  const n = digits(local);
  return n.length === 10 ? `${n.slice(0, 3)} ${n.slice(3, 6)}-${n.slice(6)}` : local;
}

export function whatsappUrl(
  local = business.whatsapp.numbers[0].number,
  message = business.whatsapp.message,
) {
  return `https://wa.me/${toWhatsAppNumber(local)}?text=${encodeURIComponent(message)}`;
}

/** Mensaje base + interés puntual (ej. un servicio). */
export function whatsappUrlFor(topic: string) {
  return whatsappUrl(undefined, `${business.whatsapp.message} Me interesa: ${topic}.`);
}

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  business.location.street
    ? `${business.location.street}, ${business.location.city}`
    : business.location.mapsQuery,
)}`;

export const primaryWhatsApp = whatsappUrl();
