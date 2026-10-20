import type { Lang, SectionKey } from '../data/profile';

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** URL of a top-level page in the given language. */
export function href(lang: Lang, key: SectionKey | 'home') {
  const prefix = `${base}${lang === 'zh' ? '/zh' : ''}`;
  return key === 'home' ? `${prefix}/` : `${prefix}/${key}/`;
}

/** The same page in the other language; blog posts fall back to that language's home. */
export function otherLangPath(path: string, lang: Lang) {
  const rest = path.slice(base.length) || '/';
  if (rest.startsWith('/blog')) return lang === 'zh' ? `${base}/` : `${base}/zh/`;
  return lang === 'zh' ? `${base}${rest.replace(/^\/zh(?=\/|$)/, '') || '/'}` : `${base}/zh${rest}`;
}
