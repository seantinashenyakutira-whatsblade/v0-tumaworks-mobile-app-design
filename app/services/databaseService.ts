import { 
  getDocs, 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
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
import { UserProfile, Task, Transaction, Message, Chat } from '../types';

export class DBService {
  // --- USERS ---
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
  }

  static async createUserProfile(userId: string, profile: Partial<UserProfile>) {
    await updateDoc(doc(db, 'users', userId), {
      ...profile,
      id: userId,
      createdAt: serverTimestamp(),
      walletBalance: 0,
      rating: 5.0,
      reviewsCount: 0,
    });
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
    if (workerId) update.selectedWorkerId = workerId;
    await updateDoc(doc(db, 'tasks', taskId), update);
  }

  // --- ESCROW & WALLET SYSTEM ---
  static async payForTask(userId: string, workerId: string, amount: number, taskId: string) {
    await runTransaction(db, async (transaction) => {
      const userRef = doc(db, 'users', userId);
      const workerRef = doc(db, 'users', workerId);
      const taskRef = doc(db, 'tasks', taskId);
      
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw "User not found";
      
      const balance = userDoc.data().walletBalance || 0;
      if (balance < amount) throw "Insufficient balance";

      // 1. Deduct from client
      transaction.update(userRef, { walletBalance: increment(-amount) });
      
      // 2. Add to worker
      transaction.update(workerRef, { walletBalance: increment(amount) });
      
      // 3. Mark task completed
      transaction.update(taskRef, { status: 'completed' });
      
      // 4. Record transaction
      const transRef = doc(collection(db, 'transactions'));
      transaction.set(transRef, {
        userId,
        amount,
        type: 'payment',
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
    });
  }

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
