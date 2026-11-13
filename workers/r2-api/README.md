# AgriMag R2 API

Worker Cloudflare que protege uploads para o bucket R2 com Firebase Authentication + custom claim `admin: true`.

## Configuração

```bash
cd workers/r2-api
npm install
npx wrangler login
npx wrangler r2 bucket create agrimag-media
npx wrangler secret put ALLOWED_ORIGIN
```

O `ALLOWED_ORIGIN` deve ser a origem exacta do frontend, por exemplo `https://fena-f00d0.web.app` ou o domínio de produção.

## Desenvolvimento

```bash
npm run dev
```

## Deploy

```bash
npm run deploy
```

Depois do deploy, adicionar no `.env.local` do frontend:

```env
VITE_R2_API_URL=https://agrimag-r2-api.<subdomain>.workers.dev
```

O Worker expõe:

- `GET /health`
- `GET /assets/publications/{id}/pdf/{file}`
- `GET /assets/publications/{id}/thumbnail/{file}`
- `PUT /api/admin/assets/{key}`
- `DELETE /api/admin/assets/{key}`

As credenciais R2 ficam apenas nos bindings do Worker. O browser nunca recebe a Access Key ou Secret Key.
