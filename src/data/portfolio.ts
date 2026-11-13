export type PortfolioItem = {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  summary: string;
  summaryEn: string;
  image: string;
  accent: string;
};

// Imagens editoriais representativas até os registos oficiais serem disponibilizados.
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'hotel-rani-forum',
    title: 'Fórum empresarial · Hotel Rani',
    titleEn: 'Business forum · Hotel Rani',
    category: 'Fóruns & eventos',
    categoryEn: 'Forums & events',
    summary: 'Agenda, curadoria e produção de encontros que colocam empresas, investidores e decisores à mesma mesa.',
    summaryEn: 'Agenda, curation and production for encounters that bring companies, investors and decision-makers to the same table.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78cqhKPvqG2XLrgXBMJ6Iwm0B5Uak67Z46OY1hzUzKdKlgnEBwcN5VCY&s=10',
    accent: '#CFEEDC',
  },
  {
    id: 'provincial-actions',
    title: 'Acções provinciais · cadeias de valor',
    titleEn: 'Provincial actions · value chains',
    category: 'Território & produção',
    categoryEn: 'Territory & production',
    summary: 'Comunicação e coordenação no terreno para aproximar produtores, parceiros e oportunidades fora dos grandes centros.',
    summaryEn: 'Field communication and coordination that connect producers, partners and opportunities beyond major centres.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdAvCcQ5x2rQib8cpFj7qUVd_ThppttvZRHymoCad1vmNOyei1xEnMwtze&s=10',
    accent: '#EAF0D4',
  },
  {
    id: 'investment-seminar',
    title: 'Seminários de investimento · BVM & Dubai Chamber',
    titleEn: 'Investment seminars · BVM & Dubai Chamber',
    category: 'Investimento & mercado',
    categoryEn: 'Investment & market',
    summary: 'Conteúdo, moderação e activação de parceiros para transformar informação sectorial em conversas de negócio.',
    summaryEn: 'Content, moderation and partner activation that turn sector knowledge into business conversations.',
    image: 'https://mediaoffice.ae/-/media/2022/april/18-04/01/dubai-chambers.jpg',
    accent: '#F3E3C7',
  },
];
