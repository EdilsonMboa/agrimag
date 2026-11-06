import { FormEvent, useState } from 'react';
import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useAuth } from '../firebase/AuthContext';

type AdminLoginProps = { onBack: () => void };

export function AdminLogin({ onBack }: AdminLoginProps) {
  const { signIn, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    await signIn(email, password);
    setSubmitting(false);
  };

  return <main className="grid min-h-screen place-items-center bg-[#061f25] px-5 py-10 text-white"><div className="w-full max-w-md"><button onClick={onBack} className="focus-ring mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/55 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Voltar ao website</button><section className="rounded-[28px] border border-white/10 bg-[#0b2e34] p-6 shadow-2xl shadow-black/30 sm:p-8"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-agriGreen shadow-lg shadow-agriGreen/20"><LockKeyhole className="h-6 w-6" /></div><p className="mt-7 text-[11px] font-bold uppercase tracking-[0.22em] text-agriGreen">Área protegida</p><h1 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.06em]">Entrar no painel</h1><p className="mt-3 text-sm leading-6 text-white/48">Acesso reservado a contas AgriMag com a permissão administrativa.</p><form onSubmit={submit} className="mt-7 space-y-4"><label className="block text-xs font-bold text-white/75">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="focus-ring mt-1.5 h-12 w-full rounded-xl border border-white/10 bg-[#061f25] px-3 text-sm font-normal text-white outline-none" /></label><label className="block text-xs font-bold text-white/75">Palavra-passe<input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="focus-ring mt-1.5 h-12 w-full rounded-xl border border-white/10 bg-[#061f25] px-3 text-sm font-normal text-white outline-none" /></label>{error && <p role="alert" className="rounded-xl bg-red-400/10 px-3 py-2.5 text-xs font-semibold text-red-300">{error}</p>}<button disabled={submitting} className="focus-ring flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-agriGreen text-sm font-bold transition hover:bg-[#08aa50] disabled:cursor-wait disabled:opacity-60"><ShieldCheck className="h-4 w-4" /> {submitting ? 'A validar...' : 'Entrar com segurança'}</button></form><p className="mt-6 text-center text-[11px] leading-5 text-white/32">Não existe registo público. A conta Admin é criada e autorizada fora do browser.</p></section></div></main>;
}
