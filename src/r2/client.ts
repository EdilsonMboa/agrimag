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

export async function checkR2Health() {
  if (!isR2Configured) return { ok: false, message: 'VITE_R2_API_URL não está configurado.' };
  try {
    const response = await fetch(`${r2ApiUrl}/health`, { headers: { Accept: 'application/json' } });
    const body = await response.json().catch(() => null) as { service?: string; ok?: boolean } | null;
    const result = { ok: response.ok && body?.ok === true, status: response.status, service: body?.service || 'unknown', url: r2ApiUrl };
    console.info('[AgriMag][R2][health]', result);
    return result;
  } catch (error) {
    console.error('[AgriMag][R2][health:error]', error);
    return { ok: false, message: error instanceof Error ? error.message : 'Falha de rede ao contactar o Worker R2.', url: r2ApiUrl };
  }
}

export async function uploadR2Asset(file: File, key: string) {
  const user = requireR2();
  const token = await user.getIdToken(true);
  const encodedKey = encodeKey(key);
  const url = `${r2ApiUrl}/api/admin/assets/${encodedKey}`;
  console.info('[AgriMag][R2][upload:start]', { key, url, name: file.name, type: file.type, size: file.size, user: user.uid });
  const response = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': file.type, 'X-File-Size': String(file.size) },
    body: file,
  });
  const body = await response.json().catch(() => null) as { error?: string; url?: string } | null;
  if (!response.ok) {
    console.error('[AgriMag][R2][upload:error]', { key, status: response.status, body });
    throw new Error(body?.error || `R2 respondeu com HTTP ${response.status}.`);
  }
  const result = { key, url: body?.url || `${r2ApiUrl}/assets/${encodedKey}`, status: response.status };
  console.info('[AgriMag][R2][upload:success]', result);
  return result;
}

export async function deleteR2Asset(key: string) {
  const user = requireR2();
  const token = await user.getIdToken(true);
  const url = `${r2ApiUrl}/api/admin/assets/${encodeKey(key)}`;
  console.info('[AgriMag][R2][delete:start]', { key, url, user: user.uid });
  const response = await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok && response.status !== 404) {
    const body = await response.json().catch(() => null) as { error?: string } | null;
    console.error('[AgriMag][R2][delete:error]', { key, status: response.status, body });
    throw new Error(body?.error || `R2 respondeu com HTTP ${response.status}.`);
  }
  console.info('[AgriMag][R2][delete:success]', { key, status: response.status });
}
