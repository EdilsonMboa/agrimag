import { firebaseAuth } from '../firebase/config';
import { isR2Configured, r2ApiUrl } from './config';

function requireR2() {
  if (!isR2Configured) throw new Error('Cloudflare R2 ainda não está configurado neste ambiente.');
  if (!firebaseAuth?.currentUser) throw new Error('É necessário iniciar sessão como administrador.');
  return firebaseAuth.currentUser;
}

function encodeKey(key: string) {
  return key.split('/').map(encodeURIComponent).join('/');
}

export async function uploadR2Asset(file: File, key: string) {
  const user = requireR2();
  const token = await user.getIdToken(true);
  const response = await fetch(`${r2ApiUrl}/api/admin/assets/${encodeKey(key)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': file.type, 'X-File-Size': String(file.size) },
    body: file,
  });
  if (!response.ok) throw new Error((await response.json().catch(() => null))?.error || 'Não foi possível carregar o ficheiro para o Cloudflare R2.');
  return { key, url: `${r2ApiUrl}/assets/${encodeKey(key)}` };
}

export async function deleteR2Asset(key: string) {
  const user = requireR2();
  const token = await user.getIdToken(true);
  const response = await fetch(`${r2ApiUrl}/api/admin/assets/${encodeKey(key)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok && response.status !== 404) throw new Error('Não foi possível eliminar o ficheiro do Cloudflare R2.');
}
