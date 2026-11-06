import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { firebaseAuth, isFirebaseConfigured } from './config';

type AuthContextValue = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  configured: boolean;
  error: string;
  signIn: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readableAuthError(error: unknown): string {
  const code = error instanceof Error ? error.message : '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) return 'Email ou palavra-passe inválidos.';
  if (code.includes('too-many-requests')) return 'Demasiadas tentativas. Tente novamente mais tarde.';
  if (code.includes('network-request-failed')) return 'Não foi possível contactar o Firebase. Verifique a ligação.';
  return 'Não foi possível iniciar a sessão. Tente novamente.';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!firebaseAuth) {
      setLoading(false);
      return undefined;
    }
    return onAuthStateChanged(firebaseAuth, async (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const token = await nextUser.getIdTokenResult();
      setIsAdmin(token.claims.admin === true);
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAdmin,
    loading,
    configured: isFirebaseConfigured,
    error,
    async signIn(email, password) {
      if (!firebaseAuth) return false;
      setError('');
      try {
        const result = await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
        const token = await result.user.getIdTokenResult(true);
        if (token.claims.admin !== true) {
          await signOut(firebaseAuth);
          setError('Esta conta não tem permissões de administrador.');
          return false;
        }
        setUser(result.user);
        setIsAdmin(true);
        return true;
      } catch (authError) {
        setError(readableAuthError(authError));
        return false;
      }
    },
    async logout() {
      if (firebaseAuth) await signOut(firebaseAuth);
      setUser(null);
      setIsAdmin(false);
    },
  }), [error, isAdmin, loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
