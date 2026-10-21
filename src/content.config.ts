import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // Files starting with "_" are ignored, so they can hold templates.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    // Image path under public/, e.g. /images/uploads/photo.webp (set from the /admin/ editor).
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'zh']).default('zh'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
