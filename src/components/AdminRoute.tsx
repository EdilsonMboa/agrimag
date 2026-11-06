import { LoaderCircle, ShieldAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { isFirebaseConfigured } from '../firebase/config';
import { AdminLogin } from './AdminLogin';

type AdminRouteProps = { children: ReactNode; onBack: () => void };

export function AdminRoute({ children, onBack }: AdminRouteProps) {
  const { configured, loading, user, isAdmin, logout } = useAuth();
  if (!configured) return <main className="grid min-h-screen place-items-center bg-[#061f25] px-5 text-white"><div className="max-w-md rounded-[28px] border border-amber-300/20 bg-[#0b2e34] p-7 text-center"><ShieldAlert className="mx-auto h-10 w-10 text-amber-300" /><h1 className="mt-5 font-display text-2xl font-extrabold">Firebase ainda não configurado</h1><p className="mt-3 text-sm leading-6 text-white/50">Adicione as variáveis `VITE_FIREBASE_*` no ambiente de deploy para activar o login Admin.</p><button onClick={onBack} className="focus-ring mt-6 rounded-xl bg-agriGreen px-4 py-3 text-sm font-bold">Voltar ao website</button></div></main>;
  if (loading) return <main className="grid min-h-screen place-items-center bg-[#061f25] text-agriGreen"><LoaderCircle className="h-8 w-8 animate-spin" /></main>;
  if (!user) return <AdminLogin onBack={onBack} />;
  if (!isAdmin) return <main className="grid min-h-screen place-items-center bg-[#061f25] px-5 text-white"><div className="max-w-md rounded-[28px] border border-red-300/20 bg-[#0b2e34] p-7 text-center"><ShieldAlert className="mx-auto h-10 w-10 text-red-300" /><h1 className="mt-5 font-display text-2xl font-extrabold">Acesso não autorizado</h1><p className="mt-3 text-sm leading-6 text-white/50">Esta conta não tem a claim `admin` necessária para abrir o painel.</p><button onClick={() => void logout()} className="focus-ring mt-6 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold">Terminar sessão</button></div></main>;
  return <>{children}</>;
}
