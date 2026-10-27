import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t.languageAria}
      title={t.languageAria}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full border font-bold transition hover:border-agriGreen hover:bg-agriGreen ${compact ? 'h-10 w-10 border-white/15 bg-white/10 px-0 text-white' : 'border-white/20 px-3 py-2 text-xs text-white'}`}
    >
      <Languages className="h-4 w-4" />
      <span>{t.languageLabel}</span>
    </button>
  );
}
