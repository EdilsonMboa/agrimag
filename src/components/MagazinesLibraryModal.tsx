import { useState, useMemo } from 'react';
import { X, Download, CalendarDays, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { magazines } from '../data/magazines';
import { downloadMagazinePdf } from '../lib/downloadPdf';

type MagazinesLibraryModalProps = {
  open: boolean;
  onClose: () => void;
};

const ITEMS_PER_PAGE = 4; // Reduzido ligeiramente para 4 para não ficar demasiado longo no telemóvel

export function MagazinesLibraryModal({
  open,
  onClose,
}: MagazinesLibraryModalProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(magazines.length / ITEMS_PER_PAGE);
  
  const paginatedMagazines = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return magazines.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-agriDark/75 p-2 sm:p-4 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="magazines-library-title"
    >
      <button
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label="Fechar biblioteca de revistas"
      />

      {/* Caixa do Modal com padding menor no telemóvel (p-4) e maior no PC (sm:p-8) */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[24px] sm:rounded-[32px] bg-[#F8FAFC] p-4 shadow-2xl sm:p-8 custom-scrollbar">
        <button
          onClick={onClose}
          className="focus-ring absolute right-4 top-4 sm:right-6 sm:top-6 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white text-agriDark shadow-md transition-transform hover:scale-105 active:scale-95"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-10 sm:pr-12">
          <p className="eyebrow text-agriGreen font-semibold tracking-wider text-xs sm:text-sm">Arquivo AgriMag</p>

          <h2
            id="magazines-library-title"
            className="mt-2 font-display text-2xl font-extrabold tracking-[-0.03em] text-agriDark sm:text-4xl"
          >
            Todas as Edições Anteriores
          </h2>

          <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600">
            Explore o nosso acervo completo e descarregue as versões digitais em PDF.
          </p>
        </div>

        {/* Grelha de Revistas (1 coluna no telemóvel, 2 no tablet, 3 no PC) */}
        <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedMagazines.map((magazine) => (
            <article
              key={magazine.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="relative h-52 sm:h-60 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${magazine.accent}, #03454D)`,
                }}
              >
                <img
                  src={magazine.coverImage}
                  alt={`Capa da ${magazine.edition}`}
                  className="h-full w-full object-cover mix-blend-multiply opacity-75 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-agriDark/90 via-agriDark/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {magazine.edition}
                  </span>

                  <h3 className="mt-1.5 sm:mt-2 font-display text-base sm:text-lg font-bold leading-snug line-clamp-1">
                    {magazine.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-agriGreen" />
                    <span>{magazine.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-agriGreen" />
                    <span>{magazine.pages} páginas</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    downloadMagazinePdf(
                      magazine.edition,
                      magazine.date,
                      magazine.title,
                    )
                  }
                  className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-agriGreen px-4 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#079947] hover:shadow-md active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  Baixar Revista (PDF)
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Controlo de Paginação Responsivo */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80 pt-4 sm:pt-6">
            <p className="text-xs font-medium text-slate-500">
              Página <span className="font-bold text-agriDark">{currentPage}</span> de <span className="font-bold text-agriDark">{totalPages}</span>
            </p>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 sm:py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </button>

              {/* Números de página ocultos em telemóveis muito pequenos para não partir o layout, visíveis a partir de tablets (sm) */}
              <div className="hidden sm:flex items-center gap-1 px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`grid h-8 w-8 place-items-center rounded-lg text-xs font-bold transition-all ${
                      currentPage === page
                        ? 'bg-agriGreen text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-200/60'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 sm:py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Seguinte
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}