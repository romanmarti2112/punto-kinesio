import type { APIRoute } from 'astro';
import { business } from '../data/business';

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', business.siteUrl).href}\n`,
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
