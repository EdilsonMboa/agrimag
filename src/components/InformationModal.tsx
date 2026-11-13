import { useState, useMemo } from 'react';
import { X, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { news } from '../data/news';

type NewsModalProps = {
  open: boolean;
  onClose: () => void;
};

const ITEMS_PER_PAGE = 4;

export function NewsModal({ open, onClose }: NewsModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { language, t } = useLanguage();

  // Ordena as notícias da mais recente para a mais antiga
  const sortedNews = useMemo(
    () => [...news].sort((a, b) => b.date.getTime() - a.date.getTime()),
    []
  );

  const totalPages = Math.ceil(sortedNews.length / ITEMS_PER_PAGE);

  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedNews.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedNews]);

  // Formata a data conforme o idioma escolhido
  const formatDate = (date: Date) =>
    date.toLocaleDateString(language === 'en' ? 'en-GB' : 'pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-agriDark/75 p-2 sm:p-4 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="news-title"
    >
      <button
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label={t.library.closeLibrary}
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[24px] sm:rounded-[32px] bg-[#F8FAFC] p-4 shadow-2xl sm:p-8 custom-scrollbar">
        <button
          onClick={onClose}
          className="focus-ring absolute right-4 top-4 sm:right-6 sm:top-6 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full bg-white text-agriDark shadow-md transition-transform hover:scale-105 active:scale-95"
          aria-label={t.library.close}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-10 sm:pr-12">
          <p className="eyebrow text-agriGreen font-semibold tracking-wider text-xs sm:text-sm">
            Notícias Recentes
          </p>

          <h2
            id="news-title"
            className="mt-2 font-display text-2xl font-extrabold tracking-[-0.03em] text-agriDark sm:text-4xl"
          >
            Acompanhe as Últimas Notícias do Nosso Projecto
          </h2>
        </div>

        {sortedNews.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            {language === 'en' ? 'No news yet.' : 'Ainda não existem notícias.'}
          </p>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedNews.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="relative h-52 sm:h-60 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${item.accent}, #03454D)` }}
                  >
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="h-full w-full object-cover mix-blend-multiply opacity-75 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-agriDark/90 via-agriDark/20 to-transparent" />

                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                      <h3 className="font-display text-base sm:text-lg font-bold leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-agriGreen" />
                      <span>{formatDate(item.date)}</span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {item.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80 pt-4 sm:pt-6">
                <p className="text-xs font-medium text-slate-500">
                  {t.library.page} <span className="font-bold text-agriDark">{currentPage}</span> {t.library.of}{' '}
                  <span className="font-bold text-agriDark">{totalPages}</span>
                </p>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 sm:py-2 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {t.library.previous}
                  </button>

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
                    {t.library.next}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}