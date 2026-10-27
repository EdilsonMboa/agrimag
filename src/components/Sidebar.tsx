import { ArrowUpRight, CalendarDays, FileText, Home, Instagram, Leaf, Mail, Menu, Phone, Sprout, Users, X } from 'lucide-react';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
};

const links = [
  { label: 'Início', href: '#inicio', icon: Home },
  { label: 'Sobre a AgriMag', href: '#sobre', icon: Sprout },
  { label: 'Edições da revista', href: '#revistas', icon: FileText },
  { label: 'Serviços corporativos', href: '#servicos', icon: Users },
  { label: 'Subscrição', href: '#subscricao', icon: CalendarDays },
  { label: 'Contactos', href: '#contactos', icon: Mail },
];

export function Sidebar({ open, onClose, onRequestQuote }: SidebarProps) {
  if (!open) return null;

  const handleLinkClick = () => onClose();

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu mobile">
      <button className="absolute inset-0 h-full w-full bg-agriDark/50 backdrop-blur-[2px]" onClick={onClose} aria-label="Fechar menu" />
      <aside className="animate-slide-in-left relative flex h-full w-[78%] max-w-[360px] flex-col overflow-y-auto bg-agriDark px-6 pb-7 pt-6 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <a href="#inicio" onClick={handleLinkClick} className="inline-flex items-center gap-2 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10"><Leaf className="h-4 w-4 text-agriGreen" /></span>
            <span className="font-display text-xl font-extrabold tracking-[-0.05em]">Agri<span className="text-agriGreen">Mag</span></span>
          </a>
          <button onClick={onClose} className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white" aria-label="Fechar menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="my-8 h-px bg-white/10" />
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Explorar</p>
        <nav className="space-y-1" aria-label="Navegação mobile">
          {links.map(({ label, href, icon: Icon }) => (
            <a key={href} href={href} onClick={handleLinkClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
              <Icon className="h-[18px] w-[18px] text-agriGreen transition group-hover:scale-110" />
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-10">
          <button onClick={() => { onClose(); onRequestQuote(); }} className="focus-ring flex w-full items-center justify-between rounded-2xl bg-agriGreen px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#08aa50]">
            Solicitar Cotação <ArrowUpRight className="h-4 w-4" />
          </button>
          <div className="mt-7 space-y-3 border-t border-white/10 pt-5 text-xs text-white/52">
            <p className="font-semibold text-white/75">Fale connosco</p>
            <a href="tel:+258841498204" className="flex items-center gap-2 hover:text-white"><Phone className="h-3.5 w-3.5 text-agriGreen" /> +258 84 149 8204</a>
            <a href="mailto:agrimagmz@gmail.com" className="flex items-center gap-2 hover:text-white"><Mail className="h-3.5 w-3.5 text-agriGreen" /> agrimagmz@gmail.com</a>
            <a href="https://instagram.com/revista_agrimag" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><Instagram className="h-3.5 w-3.5 text-agriGreen" /> @AgriMagMoz</a>
          </div>
        </div>
      </aside>
    </div>
  );
}
