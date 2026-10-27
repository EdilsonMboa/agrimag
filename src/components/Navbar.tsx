import { ArrowUpRight, Leaf, Menu } from 'lucide-react';

type NavbarProps = {
  activeSection: string;
  onOpenMenu: () => void;
  onRequestQuote: () => void;
};

const links = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Revistas', href: '#revistas' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Subscrição', href: '#subscricao' },
  { label: 'Contactos', href: '#contactos' },
];

export function BrandMark() {
  return (
    <a href="#inicio" className="group inline-flex items-center gap-2.5" aria-label="AgriMag — início">
      <img 
        src="/Images/Logo AgriMag-01.png" 
        alt="AgriMag" 
        className="h-[130px] w-auto brightness-0 invert" 
      />
    </a>
  );
}

export function Navbar({ activeSection, onOpenMenu, onRequestQuote }: NavbarProps) {
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-40 hidden h-20 border-b border-white/10 bg-agriDark/95 text-white shadow-lg shadow-agriDark/5 backdrop-blur-lg lg:block">
        <div className="container-shell flex h-full items-center justify-between gap-8">
          <BrandMark />
          <nav className="flex items-center gap-7" aria-label="Navegação principal">
            {links.map((link) => {
              const section = link.href.slice(1);
              const isActive = activeSection === section;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-[13px] font-semibold transition-colors ${isActive ? 'text-white' : 'text-white/62 hover:text-white'}`}
                >
                  {link.label}
                  <span className={`absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 rounded-full bg-agriGreen transition-all ${isActive ? 'w-full' : 'w-0'}`} />
                </a>
              );
            })}
          </nav>
          <button onClick={onRequestQuote} className="focus-ring inline-flex items-center gap-2 rounded-full bg-agriGreen px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-agriGreen/20 transition hover:-translate-y-0.5 hover:bg-[#08aa50]">
            Solicitar Cotação <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <header className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center justify-between border-b border-agriDark/10 bg-slate-50/95 px-5 backdrop-blur-lg lg:hidden">
        <BrandMark />
        <button onClick={onOpenMenu} className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-agriDark text-white" aria-label="Abrir menu">
          <Menu className="h-5 w-5" />
        </button>
      </header>
    </>
  );
}
