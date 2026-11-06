import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const email = process.env.ADMIN_EMAIL?.trim();
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim();
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!email || !projectId || !clientEmail || !privateKey) {
  console.error('Defina ADMIN_EMAIL, FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL e FIREBASE_ADMIN_PRIVATE_KEY.');
  process.exit(1);
}

const app = getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const user = await getAuth(app).getUserByEmail(email);
await getAuth(app).setCustomUserClaims(user.uid, { admin: true });
console.log(`Claim admin atribuída a ${user.email}. O utilizador deve terminar e iniciar sessão novamente.`);
