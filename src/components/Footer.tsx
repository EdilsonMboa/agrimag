import { Facebook, Instagram, Leaf, Linkedin, LockKeyhole, Mail, MapPin, Phone } from 'lucide-react';
import { BrandMark } from './Navbar';
import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contactos" className="bg-agriDark text-white">
      <div className="container-shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.85fr_0.85fr] lg:gap-20">
          <div>
            <BrandMark light />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">{t.footer.description}</p>
            <div className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-white/45"><MapPin className="h-4 w-4 text-agriGreen" /> {t.footer.location}</div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-agriGreen">{t.footer.contact}</p>
            <div className="mt-5 space-y-4 text-sm text-white/65">
              <p><span className="block text-xs font-semibold text-white/40">{t.footer.director}</span><span className="mt-1 block font-semibold text-white">Barnabé Zandamela</span></p>
              <a href="tel:+258841498204" className="flex items-center gap-3 transition hover:text-white"><Phone className="h-4 w-4 text-agriGreen" /> +258 84 149 8204</a>
              <a href="mailto:agrimagmz@gmail.com" className="flex items-center gap-3 transition hover:text-white"><Mail className="h-4 w-4 text-agriGreen" /> agrimagmz@gmail.com</a>
              <a href="mailto:zndml@yahoo.com" className="flex items-center gap-3 transition hover:text-white"><Mail className="h-4 w-4 text-agriGreen" /> zndml@yahoo.com</a>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-agriGreen">{t.footer.social}</p>
            <p className="mt-5 max-w-[230px] text-sm leading-6 text-white/55">{t.footer.socialText}</p>
            <div className="mt-6 flex gap-2">
              <a href="https://facebook.com/AgriMagMoz" target="_blank" rel="noreferrer" aria-label="Facebook AgriMagMoz" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-agriGreen hover:bg-agriGreen hover:text-white"><Facebook className="h-4 w-4" /></a>
              <a href="https://instagram.com/revista_agrimag" target="_blank" rel="noreferrer" aria-label="Instagram Revista AgriMag" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-agriGreen hover:bg-agriGreen hover:text-white"><Instagram className="h-4 w-4" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn AgriMag" className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-agriGreen hover:bg-agriGreen hover:text-white"><Linkedin className="h-4 w-4" /></a>
            </div>
            <p className="mt-5 text-xs font-semibold text-white/40">@AgriMagMoz · @revista_agrimag</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AgriMag. {t.footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-5"><p className="inline-flex items-center gap-2"><Leaf className="h-3.5 w-3.5 text-agriGreen" /> {t.footer.future}</p><a href="/admin" className="inline-flex items-center gap-1.5 transition hover:text-white" aria-label={t.footer.admin}><LockKeyhole className="h-3.5 w-3.5 text-agriGreen" /> {t.footer.admin}</a></div>
        </div>
      </div>
    </footer>
  );
}
