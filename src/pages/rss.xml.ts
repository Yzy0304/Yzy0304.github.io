import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

export async function GET({ site }: APIContext) {
  const root = new URL(import.meta.env.BASE_URL, site).href.replace(/\/$/, '');
  const items = (await getPosts())
    .map((p) => {
      const url = `${root}/blog/${p.id}/`;
      return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${p.data.date.toUTCString()}</pubDate>${p.data.description ? `<description>${esc(p.data.description)}</description>` : ''}</item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Zhenyu Yao · Blog</title><link>${root}/blog/</link><description>Notes on computer vision, vision-language models, and anomaly detection.</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
