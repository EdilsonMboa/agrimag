import { useEffect, useState } from 'react';
import type { Magazine } from '../types';
import { isFirebaseConfigured } from './config';
import { listPublishedPublications } from './publications';

function toMagazine(id: number, item: Awaited<ReturnType<typeof listPublishedPublications>>[number]): Magazine {
  return {
    id,
    edition: item.editionNumber,
    date: item.publicationDate,
    title: item.title,
    excerpt: item.description,
    price: '150,00 MT',
    coverImage: item.thumbnailUrl,
    pdfUrl: item.pdfUrl,
    accent: '#CFEEDC',
    pages: item.pages,
  };
}

export function usePublishedMagazines(fallback: Magazine[]) {
  const [items, setItems] = useState<Magazine[]>(fallback);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    let active = true;
    setLoading(true);
    listPublishedPublications()
      .then((records) => { if (active) setItems(records.map((record, index) => toMagazine(Number(record.editionNumber.match(/\d+/)?.[0]) || index + 1, record))); })
      .catch((reason: unknown) => { if (active) setError(reason instanceof Error ? reason.message : 'Não foi possível carregar as revistas.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [fallback]);

  return { items, loading, error };
}
