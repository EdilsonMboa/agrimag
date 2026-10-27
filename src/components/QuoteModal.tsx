import { FormEvent, useState } from 'react';
import { Check, Mail, Phone, Send, X } from 'lucide-react';

type QuoteModalProps = {
  open: boolean;
  service?: string;
  onClose: () => void;
};

export function QuoteModal({ open, service, onClose }: QuoteModalProps) {
  const [sent, setSent] = useState(false);

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
      <button onClick={closeModal} className="absolute inset-0 bg-agriDark/70 backdrop-blur-sm" aria-label="Fechar formulário" />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8">
        <button onClick={closeModal} className="focus-ring absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-agriDark" aria-label="Fechar">
          <X className="h-4 w-4" />
        </button>
        {sent ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-agriMint text-agriGreen"><Check className="h-7 w-7" /></div>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.05em] text-agriDark">Pedido recebido.</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">Obrigado pelo contacto. A equipa AgriMag vai responder-lhe em breve através dos dados enviados.</p>
            <button onClick={closeModal} className="focus-ring mt-7 rounded-full bg-agriDark px-5 py-3 text-sm font-bold text-white transition hover:bg-agriGreen">Fechar</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Vamos conversar</span>
            <h2 id="quote-title" className="mt-4 pr-8 font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.055em] text-agriDark">Dê o próximo passo com a AgriMag.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Conte-nos um pouco sobre o seu desafio{service ? ` em ${service}` : ''}. Criamos uma proposta à medida.</p>
            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">Nome</span><input required name="name" className="focus-ring h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none" placeholder="O seu nome" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">Organização</span><input required name="company" className="focus-ring h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none" placeholder="Nome da organização" /></label>
              </div>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">Email</span><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input required type="email" name="email" className="focus-ring h-12 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none" placeholder="nome@empresa.co.mz" /></div></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold text-agriDark">Como podemos ajudar?</span><textarea required name="message" rows={3} className="focus-ring w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none" placeholder="Descreva brevemente o seu projecto..." /></label>
              <button type="submit" className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-agriGreen px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#08aa50]">Enviar pedido <Send className="h-4 w-4" /></button>
            </form>
            <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400"><Phone className="h-3.5 w-3.5 text-agriGreen" /> Ou ligue +258 84 149 8204</p>
          </>
        )}
      </div>
    </div>
  );
}
