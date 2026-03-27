import { 
  getDocs, 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  setDoc,
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  serverTimestamp,
  increment,
  runTransaction
} from 'firebase/firestore';
import { db, storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { UserProfile, Task, Transaction, Message, Chat, TaskStatus } from '../types';

export class DBService {
  // --- USERS ---
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
  }

  static async createUserProfile(userId: string, profile: Partial<UserProfile>) {
    // Use updateDoc instead of setDoc to prevent overwriting existing financial data
    // If it's a true creation, we do setDoc. We'll check if exists first.
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        ...profile,
        id: userId,
        createdAt: serverTimestamp(),
        walletBalance: 0,
        escrowBalance: 0,
        pendingEarnings: 0,
        rating: 5.0,
        reviewsCount: 0,
      });
    } else {
      await updateDoc(userRef, {
        ...profile
      });
    }
  }

  // --- TASKS ---
  static async createTask(task: Partial<Task>): Promise<string> {
    const docRef = await addDoc(collection(db, 'tasks'), {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'open',
      assignedWorkers: []
    });
    return docRef.id;
  }

  static async updateTaskStatus(taskId: string, status: TaskStatus, workerId?: string) {
    const update: any = { status, updatedAt: serverTimestamp() };
    if (workerId) update.workerId = workerId;
    await updateDoc(doc(db, 'tasks', taskId), update);
  }

  static async getJob(taskId: string): Promise<Task | null> {
    const d = await getDoc(doc(db, 'tasks', taskId));
    return d.exists() ? (d.data() as Task) : null;
  }

  static async getJobs(): Promise<Task[]> {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Task));
  }

  static async getWorkers(): Promise<UserProfile[]> {
    const q = query(collection(db, 'users'), where('role', 'in', ['worker', 'both']));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ ...doc.data(), id: doc.id } as UserProfile));
  }

  static async updateTask(taskId: string, data: Partial<Task>) {
    await updateDoc(doc(db, 'tasks', taskId), {
      ...data,
      updatedAt: serverTimestamp()
    });
  }

  // --- ESCROW & WALLET SYSTEM ---
  // Use WalletService instead for atomic escrow release

  // --- STORAGE / FILE UPLOAD ---
  static async uploadFile(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  // --- CHAT ---
  static async sendMessage(chatId: string, message: Partial<Message>) {
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      ...message,
      createdAt: serverTimestamp()
    });
    await updateDoc(doc(db, 'chats', chatId), {
      lastMessage: message.text,
      updatedAt: serverTimestamp()
    });
  }
}
