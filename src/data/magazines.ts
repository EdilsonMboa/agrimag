import type { Magazine } from '../types';

export const magazines: Magazine[] = [
  {
    id: 8,
    edition: 'Edição N.º 8',
    date: 'Maio / Junho 2018',
    title: 'Mulheres que fazem crescer Moçambique',
    excerpt: 'Histórias de liderança, inovação e resiliência no campo e nas cadeias de valor.',
    price: '150,00 MT',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85',
    accent: '#E4F2D6',
    pages: 48,
  },
  {
    id: 7,
    edition: 'Edição N.º 7',
    date: 'Março / Abril 2018',
    title: 'Agricultura que alimenta o futuro',
    excerpt: 'Tecnologia, financiamento e boas práticas para uma produção mais competitiva.',
    price: '150,00 MT',
    coverImage: 'https://images.unsplash.com/photo-1523742818080-7e2a5c4c1bd6?auto=format&fit=crop&w=900&q=85',
    accent: '#D8EEE7',
    pages: 42,
  },
  {
    id: 6,
    edition: 'Edição N.º 6',
    date: 'Janeiro / Fevereiro 2018',
    title: 'Do produtor ao mercado',
    excerpt: 'Logística, comércio e parcerias que aproximam quem produz de quem transforma.',
    price: '150,00 MT',
    coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=85',
    accent: '#F1E6CD',
    pages: 36,
  },
];
