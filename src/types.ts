export type Magazine = {
  id: number;
  edition: string;
  date: string;
  title: string;
  excerpt: string;
  price: string;
  coverImage: string;
  accent: string;
  pages: number;
};

export type Service = {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  bullets: string[];
  icon: 'project' | 'advisory' | 'events';
  accent: string;
};
