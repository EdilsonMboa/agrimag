# Configuração Firebase AgriMag

O repositório está preparado para o projecto Firebase `fena-f00d0`. Nenhuma credencial privada deve ser guardada no GitHub.

## 1. Activar os serviços

No Firebase Console, abrir o projecto `fena-f00d0` e activar:

- Authentication → Sign-in method → Email/Password.
- Firestore Database.
- Storage.
- App Check quando o domínio de produção estiver definido.

Associar uma aplicação Web ao projecto e copiar a configuração pública para um ficheiro `.env.local`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=fena-f00d0.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fena-f00d0
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

O ficheiro `.env.local` está excluído pelo `.gitignore`.

## 2. Criar a conta Admin

1. Criar a primeira conta no Firebase Console → Authentication → Users.
2. Confirmar o email e usar uma palavra-passe forte, única e guardada num gestor de palavras-passe.
3. Criar uma Service Account com o mínimo de permissões necessárias para executar apenas o bootstrap da claim.
4. Nunca colocar o JSON da Service Account no repositório.
5. Executar o script a partir de uma máquina segura:

```bash
ADMIN_EMAIL=admin@dominio.co.mz \
FIREBASE_ADMIN_PROJECT_ID=fena-f00d0 \
FIREBASE_ADMIN_CLIENT_EMAIL='firebase-adminsdk-...@fena-f00d0.iam.gserviceaccount.com' \
FIREBASE_ADMIN_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n' \
node scripts/set-admin-claim.mjs
```

A aplicação só permite `/admin` quando o token Firebase contém `admin: true`. Não existe registo público de administradores.

## 3. Publicar as regras

Com Firebase CLI autenticado e instalado:

```bash
firebase use fena-f00d0
firebase deploy --only firestore:rules,storage
```

As regras permitem leitura pública apenas para publicações, portfólio e serviços publicados/activos. Escrita, alteração e eliminação requerem a custom claim `admin`.

## 4. Próxima integração

A camada `src/firebase/publications.ts` já contém o contrato para:

- Listar publicações publicadas.
- Criar uma publicação.
- Carregar PDF para `publications/{id}/pdf/`.
- Carregar capa para `publications/{id}/thumbnail/`.
- Actualizar e eliminar publicações.

O passo seguinte é ligar estes serviços ao `AdminPanel` e substituir os mocks da homepage por consultas Firestore, mantendo fallback de loading/erro durante a migração.
