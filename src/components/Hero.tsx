import { ArrowDownRight, ArrowUpRight, BookOpen, BriefcaseBusiness, MapPin, Sprout, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type HeroProps = {
  onRequestQuote: () => void;
  onExploreMagazines: () => void;
};


export function Hero({
  onRequestQuote,
  onExploreMagazines,
}: HeroProps) {
  const { language, t } = useLanguage();
  const coverTitle = language === 'en' ? 'Women Growing Mozambique' : 'Mulheres que fazem crescer Moçambique';

  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-agriDark pt-[112px] text-white lg:pt-0">
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-80" />
      <div className="pointer-events-none absolute -right-40 top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-agriGreen/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-56 -left-40 h-[28rem] w-[28rem] rounded-full border border-white/8" />
      <div className="container-shell relative grid min-h-[660px] items-center gap-14 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6 lg:py-24">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5 text-agriGreen" /> {t.hero.eyebrow}
          </div>
          <h1 className="max-w-[720px] font-display text-[3.3rem] font-extrabold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-[5.75rem]">
            {t.hero.titleA} <span className="text-agriGreen">{t.hero.titleB}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/66 sm:text-lg sm:leading-8">
            {t.hero.description}
          </p>
          <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm"><div className="flex items-center gap-2 text-xs font-bold text-white"><BookOpen className="h-4 w-4 text-agriGreen" /> {t.hero.mediaPillar}</div><p className="mt-2 text-xs leading-5 text-white/55">{t.hero.mediaPillarText}</p></div>
            <div className="rounded-2xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm"><div className="flex items-center gap-2 text-xs font-bold text-white"><BriefcaseBusiness className="h-4 w-4 text-agriGreen" /> {t.hero.servicesPillar}</div><p className="mt-2 text-xs leading-5 text-white/55">{t.hero.servicesPillarText}</p></div>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onExploreMagazines}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-agriGreen px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#08aa50]"
            >
              {t.hero.explore}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <button onClick={onRequestQuote} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/24 px-5 py-3.5 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/8">
              {t.hero.talk} <ArrowDownRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/12 pt-6 text-xs text-white/48">
            <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-agriGreen" /> {t.hero.specialized}</span>
            <span className="inline-flex items-center gap-2"><Sprout className="h-4 w-4 text-agriGreen" /> {t.hero.valueChains}</span>
            <span className="inline-flex items-center gap-2"><TrendingUp className="h-4 w-4 text-agriGreen" /> {t.hero.purpose}</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px] lg:ml-auto">
          <div className="absolute -left-7 top-10 hidden h-24 w-24 rounded-full border border-agriGreen/40 lg:block" />
          <div className="absolute -right-4 bottom-12 hidden h-20 w-20 rounded-full border border-white/15 lg:block" />
          <div className="relative mx-auto aspect-[0.86] w-[74%] rotate-[-4deg] overflow-hidden rounded-[28px] bg-agriSand shadow-floating transition duration-500 hover:rotate-[-1deg]">
            <img src="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1000&q=90" alt="Campo agrícola ao amanhecer em Moçambique" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-agriDark/10 via-transparent to-agriDark/80" />
            <div className="absolute inset-x-6 top-6 flex items-center justify-between text-white/80">
              <span className="rounded-full border border-white/30 bg-agriDark/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur">AgriMag</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]">N.º 08</span>
            </div>
            <div className="absolute inset-x-7 bottom-7">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-agriGreen">{t.hero.magazineLabel}</p>
              <h2 className="font-display text-3xl font-extrabold leading-[0.98] tracking-[-0.06em] text-white">{coverTitle}</h2>
              <div className="mt-5 h-px w-12 bg-agriGreen" />
            </div>
          </div>
          <div className="animate-float-slow absolute -right-1 top-8 rounded-2xl bg-white px-4 py-3 text-agriDark shadow-xl lg:-right-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-agriGreen">{t.hero.since}</p>
            <p className="mt-0.5 font-display text-lg font-extrabold tracking-[-0.05em]">{t.hero.moving}</p>
          </div>
          <div className="animate-float-slower absolute -bottom-2 left-0 rounded-2xl border border-white/10 bg-[#0d5c5b]/90 px-4 py-3 text-white shadow-xl backdrop-blur lg:-left-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">{t.hero.community}</p>
            <p className="mt-0.5 font-display text-lg font-extrabold tracking-[-0.05em]">{t.hero.field}</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 items-center gap-3 pb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/35 lg:flex">
        <span className="h-px w-8 bg-white/20" /> {t.hero.scroll} <span className="h-px w-8 bg-white/20" />
      </div>
    </section>
  );
}
