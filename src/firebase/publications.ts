import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firestore, firebaseStorage } from './config';
import { deleteR2Asset, uploadR2Asset } from '../r2/client';
import { isR2Configured } from '../r2/config';

export type PublicationCategory = 'regular' | 'brochure' | 'ministerial' | 'guide';
export type PublicationStatus = 'draft' | 'published' | 'archived';

export type PublicationRecord = {
  id: string;
  title: string;
  editionNumber: string;
  category: PublicationCategory;
  description: string;
  publicationDate: string;
  pages: number;
  isFree: true;
  status: PublicationStatus;
  pdfUrl: string;
  thumbnailUrl: string;
  pdfStoragePath: string;
  thumbnailStoragePath: string;
};

function requireFirebase() {
  if (!firestore) throw new Error('Firebase Firestore não está configurado neste ambiente.');
  return { firestore };
}

export async function listPublishedPublications(): Promise<PublicationRecord[]> {
  const { firestore: db } = requireFirebase();
  console.info('[AgriMag][Firestore][public:list:start]', { collection: 'publications', filter: 'status == published' });
  const snapshot = await getDocs(query(collection(db, 'publications'), where('status', '==', 'published')));
  const items = snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as PublicationRecord));
  console.info('[AgriMag][Firestore][public:list:success]', { count: items.length, ids: items.map((item) => item.id) });
  return items;
}

export async function listPublications(): Promise<PublicationRecord[]> {
  const { firestore: db } = requireFirebase();
  console.info('[AgriMag][Firestore][admin:list:start]', { collection: 'publications' });
  const snapshot = await getDocs(collection(db, 'publications'));
  const items = snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() } as PublicationRecord))
    .filter((item) => item.status !== 'archived');
  console.info('[AgriMag][Firestore][admin:list:success]', { count: items.length, items: items.map((item) => ({ id: item.id, status: item.status, title: item.title, pdfUrl: item.pdfUrl, thumbnailUrl: item.thumbnailUrl })) });
  return items;
}

export async function uploadPublicationAsset(file: File, publicationId: string, kind: 'pdf' | 'thumbnail') {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-');
  const path = `publications/${publicationId}/${kind}/${Date.now()}-${safeName}`;
  if (isR2Configured) {
    const uploaded = await uploadR2Asset(file, path);
    return { path: uploaded.key, url: uploaded.url };
  }
  if (!firebaseStorage) throw new Error('Configure VITE_R2_API_URL ou Firebase Storage antes de carregar ficheiros.');
  const snapshot = await uploadBytes(ref(firebaseStorage, path), file, { contentType: file.type });
  return { path, url: await getDownloadURL(snapshot.ref) };
}

export async function createPublication(input: Omit<PublicationRecord, 'id' | 'pdfUrl' | 'thumbnailUrl' | 'pdfStoragePath' | 'thumbnailStoragePath'>, pdf: File, thumbnail?: File) {
  const { firestore: db } = requireFirebase();
  console.info('[AgriMag][Firestore][create:start]', { title: input.title, status: input.status, pdfName: pdf.name, thumbnailName: thumbnail?.name });
  const publication = await addDoc(collection(db, 'publications'), { ...input, isFree: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  console.info('[AgriMag][Firestore][create:doc]', { id: publication.id });
  const pdfAsset = await uploadPublicationAsset(pdf, publication.id, 'pdf');
  const thumbnailAsset = thumbnail ? await uploadPublicationAsset(thumbnail, publication.id, 'thumbnail') : { path: '', url: '' };
  await updateDoc(doc(db, 'publications', publication.id), { pdfUrl: pdfAsset.url, pdfStoragePath: pdfAsset.path, thumbnailUrl: thumbnailAsset.url, thumbnailStoragePath: thumbnailAsset.path, updatedAt: serverTimestamp() });
  console.info('[AgriMag][Firestore][create:success]', { id: publication.id, status: input.status, pdfUrl: pdfAsset.url, thumbnailUrl: thumbnailAsset.url });
  return publication.id;
}

export async function updatePublication(id: string, changes: Partial<PublicationRecord>) {
  const { firestore: db } = requireFirebase();
  console.info('[AgriMag][Firestore][update:start]', { id, changes });
  await updateDoc(doc(db, 'publications', id), { ...changes, isFree: true, updatedAt: serverTimestamp() });
  console.info('[AgriMag][Firestore][update:success]', { id, status: changes.status });
}

export async function deletePublication(id: string) {
  const { firestore: db } = requireFirebase();
  const existing = (await getDocs(collection(db, 'publications'))).docs.find((item) => item.id === id)?.data() as Partial<PublicationRecord> | undefined;
  for (const path of [existing?.pdfStoragePath, existing?.thumbnailStoragePath]) {
    if (!path) continue;
    if (isR2Configured) await deleteR2Asset(path).catch(() => undefined);
    else if (firebaseStorage) await deleteObject(ref(firebaseStorage, path)).catch(() => undefined);
  }
  await deleteDoc(doc(db, 'publications', id));
}
