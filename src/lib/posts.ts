import { getCollection } from 'astro:content';

// Drafts show up in `npm run dev` but are left out of the production build.
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
