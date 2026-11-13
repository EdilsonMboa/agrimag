import { createRemoteJWKSet, jwtVerify } from 'jose';

export interface Env {
  R2_BUCKET: R2Bucket;
  FIREBASE_PROJECT_ID: string;
  ALLOWED_ORIGIN: string;
}

const MAX_PDF_BYTES = 20 * 1024 * 1024;
const MAX_THUMBNAIL_BYTES = 5 * 1024 * 1024;
const jwks = createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));

function cors(env: Env, headers: HeadersInit = {}) {
  return new Headers({ 'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN, 'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-File-Size', 'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS', Vary: 'Origin', ...headers });
}

function json(env: Env, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: cors(env, { 'Content-Type': 'application/json; charset=utf-8' }) });
}

function safeKey(raw: string) {
  const key = decodeURIComponent(raw).replace(/^\/+/, '');
  if (!key || key.includes('..') || !/^publications\/[a-zA-Z0-9_-]+\/(pdf|thumbnail)\/[a-zA-Z0-9._-]+$/.test(key)) return null;
  return key;
}

async function requireAdmin(request: Request, env: Env) {
  const header = request.headers.get('Authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, jwks, { issuer: `https://securetoken.google.com/${env.FIREBASE_PROJECT_ID}`, audience: env.FIREBASE_PROJECT_ID });
    return payload.admin === true;
  } catch {
    return false;
  }
}

function assetMetadata(key: string, contentType: string) {
  return { httpMetadata: { contentType, cacheControl: key.includes('/thumbnail/') ? 'public, max-age=31536000, immutable' : 'public, max-age=3600' } };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(env) });
    const url = new URL(request.url);

    if (url.pathname === '/health') return json(env, { ok: true, service: 'agrimag-r2-api' });

    if (url.pathname.startsWith('/assets/')) {
      const key = safeKey(url.pathname.slice('/assets/'.length));
      if (!key) return json(env, { error: 'Invalid asset key.' }, 400);
      const object = await env.R2_BUCKET.get(key, { onlyIf: request.headers });
      if (!object) return json(env, { error: 'Asset not found.' }, 404);
      if (!('body' in object)) return new Response(null, { status: 304, headers: cors(env, { ETag: object.httpEtag }) });
      const headers = cors(env);
      object.writeHttpMetadata(headers);
      headers.set('ETag', object.httpEtag);
      return new Response(object.body, { headers });
    }

    if (!url.pathname.startsWith('/api/admin/assets/')) return json(env, { error: 'Not found.' }, 404);
    if (!(await requireAdmin(request, env))) return json(env, { error: 'Admin access required.' }, 403);
    const key = safeKey(url.pathname.slice('/api/admin/assets/'.length));
    if (!key) return json(env, { error: 'Invalid asset key.' }, 400);

    if (request.method === 'DELETE') {
      await env.R2_BUCKET.delete(key);
      return json(env, { ok: true, key });
    }

    if (request.method !== 'PUT') return json(env, { error: 'Method not allowed.' }, 405);
    const contentType = request.headers.get('Content-Type') || 'application/octet-stream';
    const declaredSize = Number(request.headers.get('X-File-Size') || 0);
    const isPdf = key.includes('/pdf/');
    const maxBytes = isPdf ? MAX_PDF_BYTES : MAX_THUMBNAIL_BYTES;
    if ((isPdf && contentType !== 'application/pdf') || (!isPdf && !/^image\/(jpeg|png|webp)$/.test(contentType))) return json(env, { error: 'Invalid content type.' }, 415);
    if (declaredSize <= 0 || declaredSize > maxBytes) return json(env, { error: `File exceeds the ${maxBytes / 1024 / 1024} MB limit.` }, 413);
    await env.R2_BUCKET.put(key, request.body, { ...assetMetadata(key, contentType), customMetadata: { uploadedBy: 'agrimag-admin' } });
    return json(env, { ok: true, key, url: `${url.origin}/assets/${key}` });
  },
};
