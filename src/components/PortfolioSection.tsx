import { ArrowUpRight, CalendarDays, Camera, MapPin } from 'lucide-react';
import { portfolioItems } from '../data/portfolio';
import { useLanguage } from '../i18n/LanguageContext';

type PortfolioSectionProps = {
  onRequestQuote: () => void;
};

export function PortfolioSection({ onRequestQuote }: PortfolioSectionProps) {
  const { language, t } = useLanguage();
  const isEnglish = language === 'en';

  return (
    <section id="portfolio" className="relative overflow-hidden bg-agriDark py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full border border-white/10" />
      <div className="container-shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="eyebrow text-agriGreen">{t.portfolio.eyebrow}</span>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] sm:text-5xl">{t.portfolio.titleA} <span className="text-agriGreen">{t.portfolio.titleB}</span></h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/62 lg:pl-10">{t.portfolio.description}</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/7 shadow-xl transition duration-300 hover:-translate-y-1.5 hover:border-agriGreen/50">
              <div className="relative h-56 overflow-hidden" style={{ background: item.accent }}>
                <img src={item.image} alt={isEnglish ? `${item.titleEn} — ${t.portfolio.representative}` : `${item.title} — ${t.portfolio.representative}`} className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-agriDark via-agriDark/10 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-agriDark/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur"><Camera className="h-3.5 w-3.5 text-agriGreen" /> {t.portfolio.event}</div>
                <p className="absolute bottom-4 left-4 right-4 font-display text-xl font-extrabold leading-tight tracking-[-0.04em] text-white">{isEnglish ? item.titleEn : item.title}</p>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-agriGreen">{isEnglish ? item.categoryEn : item.category}</p>
                <p className="mt-3 text-sm leading-6 text-white/62">{isEnglish ? item.summaryEn : item.summary}</p>
                <p className="mt-5 inline-flex items-start gap-2 text-[10px] leading-4 text-white/35"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-agriGreen" /> {t.portfolio.representative}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="inline-flex items-center gap-2 text-xs text-white/42"><CalendarDays className="h-4 w-4 text-agriGreen" /> {isEnglish ? 'Portfolio structure ready for official records.' : 'Estrutura de portfólio pronta para receber os registos oficiais.'}</p>
          <button onClick={onRequestQuote} className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-agriGreen">{t.portfolio.learnMore} <ArrowUpRight className="h-4 w-4 text-agriGreen" /></button>
        </div>
      </div>
    </section>
  );
}
