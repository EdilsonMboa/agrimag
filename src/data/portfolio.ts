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
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
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
    image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=85',
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
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85',
    accent: '#F3E3C7',
  },
];
