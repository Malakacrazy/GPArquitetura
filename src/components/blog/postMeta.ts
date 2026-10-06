/** Formats an ISO date as "5 de outubro de 2026" (pt-BR, São Paulo timezone) */
export const formatPostDate = (iso?: string): string =>
  iso
    ? new Date(iso).toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo',
      })
    : '';

/** Formats an ISO date as "Set 2026" (pt-BR, São Paulo timezone) */
export const formatMonthYear = (iso?: string): string => {
  if (!iso) return '';
  const text = new Date(iso).toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  });
  // "set. de 2026" -> "Set 2026"
  const [month, year] = text.replace('.', '').split(' de ');
  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
};

/** Reading time in minutes from the plain-text length of the body (~200 wpm, ~5 chars per word) */
export const readingMinutes = (chars?: number | null): number | undefined =>
  chars ? Math.max(1, Math.ceil(chars / 1000)) : undefined;

/** "Reforma · 6 min" style line (category and reading time, when available) */
export const postMeta = (post: { category?: string; chars?: number | null }): string =>
  [post.category, readingMinutes(post.chars) && `${readingMinutes(post.chars)} min`].filter(Boolean).join(' · ');

/** Plain text of a Portable Text block (spans only) */
export const blockText = (block: any): string =>
  (block?.children || []).map((child: any) => child.text || '').join('');

/** URL-safe anchor id for a heading ("Por que faz diferença?" -> "por-que-faz-diferenca") */
export const headingId = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
