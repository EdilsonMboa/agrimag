import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Language, type Translation } from './translations';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'pt';
    return window.localStorage.getItem('agrimag-language') === 'en' ? 'en' : 'pt';
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem('agrimag-language', nextLanguage);
  };

  const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en';
    document.title = language === 'pt'
      ? 'AgriMag — Agronegócios de Moçambique'
      : 'AgriMag — Mozambique Agribusiness';
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, toggleLanguage, t: translations[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
