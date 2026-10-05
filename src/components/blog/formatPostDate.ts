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
