import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Mail, Send } from 'lucide-react';

export function SubscriptionSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  return (
    <section id="subscricao" className="bg-[#F8FAFC] py-24 sm:py-32">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[30px] bg-agriGreen px-6 py-12 text-white shadow-soft sm:px-12 lg:px-16 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/15" />
          <div className="pointer-events-none absolute -bottom-40 right-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute inset-0 noise-overlay opacity-70" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/70"><Mail className="h-3.5 w-3.5" /> Fique por dentro</span>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] sm:text-5xl">A próxima história começa na sua caixa de entrada.</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/75">Receba novas edições, oportunidades e conversas importantes do agronegócio moçambicano — sem ruído, só o que interessa.</p>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row" noValidate>
                <label className="sr-only" htmlFor="newsletter-email">O seu email</label>
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-agriDark/45" />
                  <input id="newsletter-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus('idle'); }} placeholder="O seu melhor email" className="focus-ring h-14 w-full rounded-2xl border-0 bg-white pl-11 pr-4 text-sm text-agriDark outline-none placeholder:text-slate-400" aria-invalid={status === 'error'} />
                </div>
                <button type="submit" className="focus-ring inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-agriDark px-5 text-sm font-bold text-white transition hover:bg-[#022f35]">
                  Subscrever <Send className="h-4 w-4" />
                </button>
              </form>
              <div className="mt-4 min-h-5 text-xs font-semibold" aria-live="polite">
                {status === 'error' && <span className="text-white">Introduza um email válido para continuar.</span>}
                {status === 'success' && <span className="inline-flex items-center gap-2 text-white"><Check className="h-4 w-4" /> Está feito — a próxima edição vai chegar até si.</span>}
                {status === 'idle' && <span className="text-white/55">Sem spam. Pode sair quando quiser.</span>}
              </div>
              <a href="#contactos" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-white/75 transition hover:text-white">Prefere falar connosco? <ArrowUpRight className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
