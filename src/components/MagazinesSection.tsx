import { useState } from 'react';
import { ArrowUpRight, CalendarDays, Check, Download, FileText } from 'lucide-react';
import { magazines } from '../data/magazines';
import { downloadMagazinePdf } from '../lib/downloadPdf';

export function MagazinesSection() {
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const handleDownload = (edition: string) => {
    const magazine = magazines.find((item) => item.edition === edition);
    if (!magazine) return;
    downloadMagazinePdf(magazine.edition, magazine.date, magazine.title);
    setDownloaded(edition);
    window.setTimeout(() => setDownloaded(null), 3500);
  };

  return (
    <section id="revistas" className="bg-[#F8FAFC] py-24 sm:py-32">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Arquivo editorial</span>
            <h2 className="section-title mt-5">Ideias que se lêem.<br /><span className="text-agriGreen">Mudanças que se plantam.</span></h2>
          </div>
          <div className="max-w-sm lg:pb-1">
            <p className="text-sm leading-6 text-slate-500">Edições para quem quer entender o agronegócio moçambicano com mais contexto, proximidade e visão de futuro.</p>
            <a href="#subscricao" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-agriDark transition hover:text-agriGreen">Receber a próxima edição <ArrowUpRight className="h-4 w-4 text-agriGreen" /></a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {magazines.map((magazine, index) => (
            <article key={magazine.id} className="group overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
              <div className="relative h-[330px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${magazine.accent}, #03454D)` }}>
                <img src={magazine.coverImage} alt={`Capa da ${magazine.edition}`} className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-70 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-agriDark via-agriDark/10 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-start justify-between">
                  <span className="rounded-full bg-agriGreen px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">{magazine.edition}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm"><FileText className="h-4 w-4" /></span>
                </div>
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">{magazine.date}</p>
                  <h3 className="max-w-xs font-display text-2xl font-extrabold leading-[1.04] tracking-[-0.05em]">{magazine.title}</h3>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <p className="min-h-[48px] text-sm leading-6 text-slate-500">{magazine.excerpt}</p>
                <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Edição impressa</p>
                    <p className="mt-1 font-display text-xl font-extrabold tracking-[-0.04em] text-agriDark">{magazine.price}</p>
                  </div>
                  <button onClick={() => handleDownload(magazine.edition)} className="focus-ring inline-flex items-center gap-2 rounded-full bg-agriDark px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-agriGreen">
                    {downloaded === magazine.edition ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                    {downloaded === magazine.edition ? 'Descarregado' : 'Baixar Revista (PDF)'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400"><CalendarDays className="h-4 w-4 text-agriGreen" /> Consulte o arquivo completo através da nossa equipa.</div>
      </div>
    </section>
  );
}
