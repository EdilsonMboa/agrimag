import { ArrowUpRight, BarChart3, CalendarRange, CheckCircle2, Compass, Leaf, Network, ShieldCheck } from 'lucide-react';
import type { Service } from '../types';
import { services } from '../data/services';
import { useLanguage } from '../i18n/LanguageContext';
import { serviceCopy } from '../i18n/translations';

type ServicesSectionProps = { onRequestQuote: (serviceTitle: string) => void };

const icons = {
  project: BarChart3,
  advisory: Compass,
  events: CalendarRange,
};

export function ServicesSection({ onRequestQuote }: ServicesSectionProps) {
  const { language, t } = useLanguage();

  return (
    <section id="servicos" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute right-[-7rem] top-24 h-72 w-72 rounded-full border border-agriGreen/10" />
      <div className="container-shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="eyebrow">{t.services.eyebrow}</span>
            <h2 className="section-title mt-5">{t.services.titleA} <span className="text-agriGreen">{t.services.titleB}</span></h2>
          </div>
          <div className="flex items-end justify-between gap-5 lg:pl-12">
            <p className="max-w-lg text-sm leading-7 text-slate-500">{t.services.description}</p>
            <span className="hidden shrink-0 font-display text-5xl font-extrabold tracking-[-0.08em] text-agriDark/10 sm:block">B2B</span>
          </div>
        </div>

        <div className="mt-14 divide-y divide-slate-200 border-y border-slate-200">
          {services.map((service: Service) => {
            const Icon = icons[service.icon];
            const copy = serviceCopy[language][service.id];
            return (
              <article key={service.id} className="group grid gap-6 py-8 transition lg:grid-cols-[80px_1fr_1.1fr_180px] lg:items-center lg:gap-8">
                <div className="flex items-center justify-between lg:block">
                  <span className="font-display text-2xl font-extrabold tracking-[-0.05em] text-agriGreen/50">{service.index}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl transition group-hover:bg-agriGreen group-hover:text-white lg:mt-4" style={{ background: service.accent, color: '#03454D' }}><Icon className="h-5 w-5" /></span>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-agriGreen">{copy.category}</p>
                  <h3 className="font-display text-2xl font-extrabold tracking-[-0.055em] text-agriDark sm:text-3xl">{copy.title}</h3>
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{t.services.executiveSummary}</p>
                  <p className="max-w-xl text-sm leading-6 text-slate-500">{copy.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {copy.bullets.map((bullet) => <li key={bullet} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600"><CheckCircle2 className="h-3.5 w-3.5 text-agriGreen" /> {bullet}</li>)}
                  </ul>
                </div>
                <button onClick={() => onRequestQuote(service.title)} className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-agriDark/15 px-4 py-3 text-xs font-bold text-agriDark transition hover:border-agriGreen hover:bg-agriGreen hover:text-white lg:justify-self-end">
                  {t.services.quote} <ArrowUpRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl bg-agriDark p-4 text-white"><Network className="h-5 w-5 shrink-0 text-agriGreen" /><span className="text-xs font-semibold text-white/75">{t.services.partners}</span></div>
          <div className="flex items-center gap-3 rounded-2xl bg-agriMint p-4 text-agriDark"><ShieldCheck className="h-5 w-5 shrink-0 text-agriGreen" /><span className="text-xs font-semibold">{t.services.context}</span></div>
          <div className="flex items-center gap-3 rounded-2xl bg-agriSand p-4 text-agriDark"><Leaf className="h-5 w-5 shrink-0 text-agriGreen" /><span className="text-xs font-semibold">{t.services.impact}</span></div>
        </div>
      </div>
    </section>
  );
}
