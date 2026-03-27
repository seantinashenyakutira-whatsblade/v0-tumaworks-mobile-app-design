import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  Timestamp,
  runTransaction
} from 'firebase/firestore';
import { db } from './firebase';
import { Job, MarketplaceListing, UserProfile, JobStatus } from '../utils/types';

export class DatabaseService {

  // --- JOBS & TASKS ---
  
  static async createJob(job: Partial<Job>): Promise<string> {
    const docRef = await addDoc(collection(db, 'jobs'), {
      ...job,
      status: 'open',
      clientConfirmed: false,
      workerConfirmed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  }

  static async updateJob(jobId: string, updates: Partial<Job>) {
    await updateDoc(doc(db, 'jobs', jobId), {
      ...updates,
      updatedAt: serverTimestamp()
    });
  }

  static async getJob(jobId: string): Promise<Job | null> {
    const d = await getDoc(doc(db, 'jobs', jobId));
    return d.exists() ? ({ id: d.id, ...d.data() } as Job) : null;
  }

  static async getJobsByCategory(category: string): Promise<Job[]> {
    const q = query(
      collection(db, 'jobs'), 
      where('category', '==', category),
      where('status', '==', 'open'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
  }

  static async getWorkerActiveJobs(workerId: string): Promise<Job[]> {
    const q = query(
        collection(db, 'jobs'), 
        where('workerId', '==', workerId),
        where('status', 'in', ['assigned', 'in-progress']),
        orderBy('updatedAt', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
  }

  // --- WORKERS ---

  static async getNearbyWorkers(category: string): Promise<UserProfile[]> {
    // Basic filter by category. (In real production, use GeoFirestore or Cloud Functions)
    const q = query(
      collection(db, 'users'), 
      where('role', 'in', ['worker', 'both']),
      where('services', 'array-contains', category)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile));
  }

  // --- MARKETPLACE ---

  static async createMarketplaceListing(listing: Partial<MarketplaceListing>) {
    return await addDoc(collection(db, 'marketplace'), {
        ...listing,
        createdAt: serverTimestamp()
    });
  }

  static async getMarketplaceListings(): Promise<MarketplaceListing[]> {
      const q = query(collection(db, 'marketplace'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as MarketplaceListing));
  }

}
