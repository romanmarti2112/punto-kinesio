/**
 * ============================================================
 *  DATOS DEL NEGOCIO
 * ============================================================
 *  Toda la información visible del sitio sale de este archivo.
 *  Para reutilizar la web con otro negocio, cambiá estos datos
 *  y las imágenes de src/assets/images/.
 *
 *  Regla: si un dato no está confirmado, dejalo en null o vacío.
 *  Los componentes ocultan o adaptan lo que falte.
 * ============================================================
 */
import type { ImageMetadata } from 'astro';

import heroImage from '../assets/images/hero.jpg';
import spaceImage from '../assets/images/espacio.jpg';
import careImage from '../assets/images/acompanamiento.jpg';
import kinesiologyImage from '../assets/images/kinesiologia.jpg';
import physioImage from '../assets/images/fisioterapia.jpg';
import wellbeingImage from '../assets/images/bienestar.jpg';
import ctaImage from '../assets/images/cta.jpg';
import galleryHands from '../assets/images/galeria-manos.jpg';
import galleryBack from '../assets/images/galeria-espalda.jpg';
import galleryBand from '../assets/images/galeria-banda.jpg';
import galleryLeg from '../assets/images/galeria-pierna.jpg';
import galleryMobility from '../assets/images/galeria-movilidad.jpg';
import galleryStretch from '../assets/images/galeria-estiramiento.jpg';

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

const whatsappMessage = 'Hola, vi la página de Punto Kinesio y quisiera consultar por un turno.';

export const business = {
  name: 'Punto Kinesio',
  activity: 'Kinesiología & Fisioterapia',
  tagline: 'Tu punto de encuentro con el movimiento.',
  description:
    'Punto Kinesio es un espacio de kinesiología y fisioterapia en Mendoza, Argentina. Atención personalizada y contacto directo por WhatsApp.',

  /**
   * Dominio público del sitio (se usa para canonical, Open Graph y datos estructurados).
   * PROVISORIO: reemplazar por el dominio definitivo antes de publicar.
   */
  siteUrl: 'https://puntokinesio.com.ar',
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
    mapsQuery: 'Punto Kinesio Mendoza',
  },

  whatsapp: {
    message: whatsappMessage,
    /** Números locales argentinos (código de área + número, sin 0 ni 15). */
    numbers: [
      { label: 'WhatsApp 1', number: '2615771502' },
      { label: 'WhatsApp 2', number: '2614167935' },
    ],
  },

  instagram: {
    handle: 'puntokinesio',
    url: 'https://www.instagram.com/puntokinesio/',
  },

  linktree: 'https://linktr.ee/PuntoKinesio',
  /** Perfiles adicionales (se usan en los datos estructurados). Facebook figura en el Linktree oficial. */
  sameAs: ['https://www.facebook.com/puntokinesio/'],

  images: {
    hero: {
      src: heroImage,
      alt: 'Kinesióloga trabajando la movilidad de la rodilla de un paciente recostado en una camilla',
    },
    space: {
      src: spaceImage,
      alt: 'Consultorio luminoso con camilla, ventanal y equipamiento de fisioterapia',
    },
    care: {
      src: careImage,
      alt: 'Manos de una profesional acompañando el movimiento del hombro de una paciente',
    },
    wellbeing: {
      src: wellbeingImage,
      alt: 'Paciente relajada recibiendo terapia manual en la espalda',
    },
    cta: {
      src: ctaImage,
      alt: 'Persona realizando un estiramiento sobre una colchoneta, en blanco y negro',
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
        alt: 'Profesional guiando un ejercicio con elemento de resistencia',
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
        alt: 'Profesional realizando terapia manual en el hombro de una paciente',
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
    { src: galleryHands, alt: 'Terapia manual en la zona lumbar', shape: 'tall' },
    { src: galleryBand, alt: 'Ejercicio guiado con banda elástica', shape: 'square' },
    { src: galleryStretch, alt: 'Estiramiento sobre colchoneta', shape: 'square' },
    { src: galleryLeg, alt: 'Manos trabajando sobre la pierna de un paciente', shape: 'wide' },
    { src: galleryMobility, alt: 'Ejercicio de movilidad en el piso', shape: 'square' },
    { src: galleryBack, alt: 'Profesional trabajando la espalda de un paciente', shape: 'square' },
  ] satisfies GalleryItem[],

  /** Preguntas frecuentes. Solo respuestas que no dependen de datos sin confirmar. */
  faqs: [
    {
      question: '¿Cómo solicito un turno?',
      answer:
        'Escribinos por WhatsApp a cualquiera de nuestros dos números y coordinamos día y horario.',
    },
    {
      question: '¿Dónde está Punto Kinesio?',
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
      answer: 'Seguinos en Instagram como @puntokinesio.',
    },
  ] satisfies Faq[],
};

export type Business = typeof business;
