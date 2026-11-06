import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firestore, firebaseStorage } from './config';

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
  if (!firestore || !firebaseStorage) throw new Error('Firebase não está configurado neste ambiente.');
  return { firestore, firebaseStorage };
}

export async function listPublishedPublications(): Promise<PublicationRecord[]> {
  const items = await listPublications();
  return items.filter((item) => item.status === 'published');
}

export async function listPublications(): Promise<PublicationRecord[]> {
  const { firestore: db } = requireFirebase();
  const snapshot = await getDocs(collection(db, 'publications'));
  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() } as PublicationRecord))
    .filter((item) => item.status !== 'archived');
}

export async function uploadPublicationAsset(file: File, publicationId: string, kind: 'pdf' | 'thumbnail') {
  const { firebaseStorage: storage } = requireFirebase();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-');
  const path = `publications/${publicationId}/${kind}/${Date.now()}-${safeName}`;
  const snapshot = await uploadBytes(ref(storage, path), file, { contentType: file.type });
  return { path, url: await getDownloadURL(snapshot.ref) };
}

export async function createPublication(input: Omit<PublicationRecord, 'id' | 'pdfUrl' | 'thumbnailUrl' | 'pdfStoragePath' | 'thumbnailStoragePath'>, pdf: File, thumbnail?: File) {
  const { firestore: db } = requireFirebase();
  const publication = await addDoc(collection(db, 'publications'), { ...input, isFree: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  const pdfAsset = await uploadPublicationAsset(pdf, publication.id, 'pdf');
  const thumbnailAsset = thumbnail ? await uploadPublicationAsset(thumbnail, publication.id, 'thumbnail') : { path: '', url: '' };
  await updateDoc(doc(db, 'publications', publication.id), { pdfUrl: pdfAsset.url, pdfStoragePath: pdfAsset.path, thumbnailUrl: thumbnailAsset.url, thumbnailStoragePath: thumbnailAsset.path, updatedAt: serverTimestamp() });
  return publication.id;
}

export async function updatePublication(id: string, changes: Partial<PublicationRecord>) {
  const { firestore: db } = requireFirebase();
  await updateDoc(doc(db, 'publications', id), { ...changes, isFree: true, updatedAt: serverTimestamp() });
}

export async function deletePublication(id: string) {
  const { firestore: db } = requireFirebase();
  const existing = (await getDocs(collection(db, 'publications'))).docs.find((item) => item.id === id)?.data() as Partial<PublicationRecord> | undefined;
  for (const path of [existing?.pdfStoragePath, existing?.thumbnailStoragePath]) {
    if (path && firebaseStorage) await deleteObject(ref(firebaseStorage, path)).catch(() => undefined);
  }
  await deleteDoc(doc(db, 'publications', id));
}
