/**
 * ============================================================
 *  DATOS DEL NEGOCIO
 * ============================================================
 *  Toda la información visible del sitio sale de este archivo.
 *  DEMO de concepto: negocio, teléfonos y redes ficticios.
 *
 *  Regla: si un dato no está confirmado, dejalo en null o vacío.
 *  Los componentes ocultan o adaptan lo que falte.
 * ============================================================
 */
import type { ImageMetadata } from 'astro';

import heroImage from '../assets/hero.png';
import spaceImage from '../assets/espacio.png';
import careImage from '../assets/acompanamiento.png';
import kinesiologyImage from '../assets/kinesiologia.png';
import physioImage from '../assets/fisioterapia.png';
import wellbeingImage from '../assets/bienestar.png';
import ctaImage from '../assets/cta.png';
import galleryHands from '../assets/galeria-manos.png';
import galleryBack from '../assets/galeria-espalda.png';
import galleryBand from '../assets/galeria-banda.png';
import galleryLeg from '../assets/galeria-pierna.png';
import galleryMobility from '../assets/galeria-movilidad.png';
import galleryStretch from '../assets/galeria-estiramiento.png';

// ---------- Tipos ----------

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  image: Photo;
  /** Ej.: "45 minutos". null = no se muestra. */
  duration: string | null;
  /** Texto del botón. */
  ctaLabel: string;
}

export interface TeamMember {
  name: string;
  specialty: string;
  description: string;
  photo: Photo | null;
}

export interface GalleryItem extends Photo {
  /** Forma de la pieza en la grilla de escritorio. */
  shape: 'tall' | 'wide' | 'square';
}

export interface Reason {
  title: string;
  text: string;
}

export interface Faq {
  question: string;
  answer: string;
}

// ---------- Datos ----------

const whatsappMessage = 'Hola, vi la página de Eje Kinesio y quisiera consultar por un turno.';

export const business = {
  name: 'Eje Kinesio',
  activity: 'Kinesiología & Fisioterapia',
  tagline: 'Tu eje para volver a moverte.',
  description:
    'Eje Kinesio es un espacio de ejemplo (demo de concepto) de kinesiología y fisioterapia en Mendoza, Argentina.',

  /**
   * Dominio público del sitio (se usa para canonical, Open Graph y datos estructurados).
   * PROVISORIO: reemplazar por el dominio definitivo antes de publicar.
   */
  siteUrl: 'https://example.com',
  locale: 'es-AR',

  location: {
    city: 'Mendoza',
    region: 'Mendoza',
    country: 'Argentina',
    countryCode: 'AR',
    /** Dirección exacta: todavía no confirmada. Completar cuando esté disponible. */
    street: null as string | null,
    /** Coordenadas del centro de la ciudad, solo para la ilustración del mapa. */
    cityCoordinates: '32°53′S · 68°50′O',
    /** Búsqueda que abre el botón "Cómo llegar". Cambiala por la dirección exacta cuando exista. */
    mapsQuery: 'Plaza Independencia, Mendoza',
  },

  whatsapp: {
    message: whatsappMessage,
    /** Números locales argentinos (código de área + número, sin 0 ni 15). */
    numbers: [
      { label: 'WhatsApp 1', number: '2610000001' },
      { label: 'WhatsApp 2', number: '2610000002' },
    ],
  },

  instagram: {
    handle: 'tu.usuario',
    url: '#instagram',
  },

  linktree: '',
  /** Perfiles adicionales (se usan en los datos estructurados). */
  sameAs: [] as string[],

  images: {
    hero: {
      src: heroImage,
      alt: 'Imagen de servicio (placeholder)',
    },
    space: {
      src: spaceImage,
      alt: 'Imagen de local (placeholder)',
    },
    care: {
      src: careImage,
      alt: 'Imagen de servicio (placeholder)',
    },
    wellbeing: {
      src: wellbeingImage,
      alt: 'Imagen de servicio (placeholder)',
    },
    cta: {
      src: ctaImage,
      alt: 'Imagen de servicio (placeholder)',
    },
  } satisfies Record<string, Photo>,

  /** Servicios. Agregá, quitá o editá elementos de esta lista. */
  services: [
    {
      slug: 'kinesiologia',
      name: 'Kinesiología',
      description:
        'Acompañamiento profesional orientado al movimiento y a la funcionalidad del cuerpo, con un abordaje pensado para cada persona.',
      image: {
        src: kinesiologyImage,
        alt: 'Imagen de servicio (placeholder)',
      },
      duration: null,
      ctaLabel: 'Consultar',
    },
    {
      slug: 'fisioterapia',
      name: 'Fisioterapia',
      description:
        'Atención profesional enfocada en el bienestar físico, en un espacio tranquilo y con seguimiento cercano.',
      image: {
        src: physioImage,
        alt: 'Imagen de servicio (placeholder)',
      },
      duration: null,
      ctaLabel: 'Consultar',
    },
  ] satisfies Service[],

  /** Motivos para elegir el espacio (sin certificaciones ni resultados). */
  reasons: [
    {
      title: 'Atención personalizada',
      text: 'Cada consulta empieza por escucharte y conocer tu situación.',
    },
    {
      title: 'Acompañamiento profesional',
      text: 'Cercanía y dedicación en cada etapa del proceso.',
    },
    {
      title: 'Un espacio orientado al bienestar',
      text: 'Un ambiente cuidado y tranquilo, pensado para que te sientas a gusto.',
    },
    {
      title: 'Atención en Mendoza',
      text: 'Estamos en la ciudad, cerca tuyo.',
    },
    {
      title: 'Contacto directo por WhatsApp',
      text: 'Consultás y coordinás tu turno sin vueltas.',
    },
  ] satisfies Reason[],

  /**
   * Equipo. Mientras esté vacío se muestra una presentación de "próximamente".
   * Ejemplo de carga:
   * { name: 'Nombre Apellido', specialty: 'Lic. en Kinesiología', description: '...', photo: { src: fotoImportada, alt: '...' } }
   */
  team: [] as TeamMember[],

  /** Galería. Reemplazá estas imágenes por fotos reales del espacio. */
  gallery: [
    { src: galleryHands, alt: 'Imagen de local (placeholder)', shape: 'tall' },
    { src: galleryBand, alt: 'Imagen de local (placeholder)', shape: 'square' },
    { src: galleryStretch, alt: 'Imagen de local (placeholder)', shape: 'square' },
    { src: galleryLeg, alt: 'Imagen de local (placeholder)', shape: 'wide' },
    { src: galleryMobility, alt: 'Imagen de local (placeholder)', shape: 'square' },
    { src: galleryBack, alt: 'Imagen de local (placeholder)', shape: 'square' },
  ] satisfies GalleryItem[],

  /** Preguntas frecuentes. Solo respuestas que no dependen de datos sin confirmar. */
  faqs: [
    {
      question: '¿Cómo solicito un turno?',
      answer:
        'Escribinos por WhatsApp a cualquiera de nuestros dos números y coordinamos día y horario.',
    },
    {
      question: '¿Dónde está Eje Kinesio?',
      answer:
        'Estamos en Mendoza, Argentina. Podés buscarnos en Google Maps o escribirnos por WhatsApp para consultar la dirección.',
    },
    {
      question: '¿Qué servicios ofrecen?',
      answer:
        'Kinesiología y fisioterapia. Si tenés dudas sobre tu caso, escribinos y te orientamos.',
    },
    {
      question: '¿Trabajan con obras sociales?',
      answer: 'Escribinos por WhatsApp y te informamos las opciones disponibles para tu caso.',
    },
    {
      question: '¿Dónde puedo ver novedades?',
      answer: 'Seguinos en Instagram (acá iría el usuario del negocio).',
    },
  ] satisfies Faq[],
};

export type Business = typeof business;
