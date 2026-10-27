import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { MagazinesSection } from './components/MagazinesSection';
import { Navbar } from './components/Navbar';
import { QuoteModal } from './components/QuoteModal';
import { ServicesSection } from './components/ServicesSection';
import { Sidebar } from './components/Sidebar';
import { SubscriptionSection } from './components/SubscriptionSection';
import { MagazinesLibraryModal } from './components/MagazinesLibraryModal';
import { useLanguage } from './i18n/LanguageContext';
import { AdminPanel } from './components/AdminPanel';


const trackedSections = ['inicio', 'sobre', 'revistas', 'servicos', 'subscricao', 'contactos'];

function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="border-b border-slate-200 bg-white py-20 sm:py-28">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="section-title mt-5">{t.about.titleA} <span className="text-agriGreen">{t.about.titleB}</span></h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[24px] bg-agriDark p-6 text-white sm:translate-y-8"><p className="font-display text-4xl font-extrabold tracking-[-0.07em] text-agriGreen">01</p><h3 className="mt-8 font-display text-xl font-extrabold tracking-[-0.04em]">{t.about.card1Title}</h3><p className="mt-3 text-sm leading-6 text-white/58">{t.about.card1Text}</p></div>
          <div className="rounded-[24px] bg-agriMint p-6 text-agriDark"><p className="font-display text-4xl font-extrabold tracking-[-0.07em] text-agriGreen">02</p><h3 className="mt-8 font-display text-xl font-extrabold tracking-[-0.04em]">{t.about.card2Title}</h3><p className="mt-3 text-sm leading-6 text-agriDark/60">{t.about.card2Text}</p></div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(() => window.location.pathname === '/admin');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState<string | undefined>();
  const [activeSection, setActiveSection] = useState('inicio');
  const [magazinesLibraryOpen, setMagazinesLibraryOpen] = useState(false);


  useEffect(() => {
    const handleNavigation = () => setIsAdminRoute(window.location.pathname === '/admin');
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  useEffect(() => {
    if (isAdminRoute) return undefined;
    const observers = trackedSections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, { rootMargin: '-38% 0px -52% 0px' });
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [isAdminRoute]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || quoteOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen, quoteOpen]);

  const openQuote = (service?: string) => {
    setQuoteService(service);
    setQuoteOpen(true);
  };

  const leaveAdmin = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
  };

  if (isAdminRoute) return <AdminPanel onBack={leaveAdmin} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar activeSection={activeSection} onOpenMenu={() => setDrawerOpen(true)} onRequestQuote={() => openQuote()} />
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} onRequestQuote={() => openQuote()} />
      <main>
        <Hero
          onRequestQuote={() => openQuote()}
          onExploreMagazines={() => setMagazinesLibraryOpen(true)}
        />
        <AboutSection />
        <MagazinesSection />
        <ServicesSection onRequestQuote={openQuote} />
        <SubscriptionSection />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} service={quoteService} onClose={() => setQuoteOpen(false)} />
      <MagazinesLibraryModal
        open={magazinesLibraryOpen}
        onClose={() => setMagazinesLibraryOpen(false)}
      />
    </div>
  );
}
