import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkCallouts from './src/plugins/remark-callouts.mjs';

export default defineConfig({
  site: 'https://yzy0304.github.io',
  markdown: {
    remarkPlugins: [remarkMath, remarkCallouts],
    rehypePlugins: [rehypeKatex],
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
