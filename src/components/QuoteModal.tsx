import { FormEvent, useState } from 'react';
import { Check, Mail, Phone, Send, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type QuoteModalProps = {
  open: boolean;
  service?: string;
  onClose: () => void;
};

export function QuoteModal({ open, service, onClose }: QuoteModalProps) {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  const closeModal = () => {
    setSent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="quote-title">
      <button onClick={closeModal} className="absolute inset-0 bg-agriDark/70 backdrop-blur-sm" aria-label={t.quote.closeForm} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
        <button onClick={closeModal} className="focus-ring absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-agriDark" aria-label={t.quote.close}>
          <X className="h-4 w-4" />
        </button>
        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-agriMint text-agriGreen"><Check className="h-7 w-7" /></div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.05em] text-agriDark">{t.quote.received}</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">{t.quote.receivedText}</p>
            <button onClick={closeModal} className="focus-ring mt-7 rounded-full bg-agriDark px-5 py-3 text-sm font-bold text-white transition hover:bg-agriGreen">{t.quote.close}</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">{t.quote.eyebrow}</span>
            <h2 id="quote-title" className="mt-4 pr-8 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-agriDark">{t.quote.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{t.quote.description.replace('{service}', service ? `${t.quote.servicePrefix} ${service}` : '')}</p>
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">{t.quote.name}</span><input required name="name" className="focus-ring h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none" placeholder={t.quote.namePlaceholder} /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">{t.quote.organization}</span><input required name="company" className="focus-ring h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none" placeholder={t.quote.organizationPlaceholder} /></label>
              </div>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">{t.quote.email}</span><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input required type="email" name="email" className="focus-ring h-12 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none" placeholder={t.quote.emailPlaceholder} /></div></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">{t.quote.help}</span><textarea required name="message" rows={3} className="focus-ring w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none" placeholder={t.quote.helpPlaceholder} /></label>
              <button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-agriGreen px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#08aa50]">{t.quote.send} <Send className="h-4 w-4" /></button>
            </form>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Phone className="h-3.5 w-3.5 text-agriGreen" />
              {t.quote.call}{' '}
              <a
                href="tel:+258841498204"
                className="font-semibold text-slate-600 transition hover:text-agriGreen underline decoration-slate-300 underline-offset-2"
              >
                +258 84 149 8204
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
