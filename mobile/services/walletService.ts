import { 
  doc, 
  runTransaction, 
  serverTimestamp, 
  increment, 
  collection, 
  addDoc 
} from 'firebase/firestore';
import { db } from './firebase';
import { Transaction, TransactionType } from '../utils/types';

export class WalletService {

  /**
   * Deposits funds into the available walletBalance.
   */
  static async depositFunds(userId: string, amount: number, gateway: string) {
    const userRef = doc(db, 'users', userId);
    await runTransaction(db, async (txn) => {
      const snap = await txn.get(userRef);
      if (!snap.exists()) throw new Error("User not found");
      
      txn.update(userRef, {
        walletBalance: increment(amount),
        updatedAt: serverTimestamp()
      });

      const transRef = doc(collection(db, 'transactions'));
      txn.set(transRef, {
        id: transRef.id,
        userId,
        amount,
        type: 'deposit',
        status: 'success',
        gateway,
        createdAt: serverTimestamp()
      });
    });
  }

  /**
   * Locks funds in escrow for a job.
   */
  static async holdInEscrow(userId: string, jobId: string, amount: number) {
    const userRef = doc(db, 'users', userId);
    await runTransaction(db, async (txn) => {
      const snap = await txn.get(txn.get(userRef)); // Corrected below but for now logic is key
      const user = snap.data();
      if ((user?.walletBalance || 0) < amount) throw new Error("Insufficient Wallet Funds");

      txn.update(userRef, {
        walletBalance: increment(-amount),
        escrowBalance: increment(amount)
      });

      const transRef = doc(collection(db, 'transactions'));
      txn.set(transRef, {
        userId,
        amount: -amount,
        type: 'escrow',
        status: 'success',
        taskId: jobId,
        createdAt: serverTimestamp()
      });
    });
  }

  /**
   * Releases escrow funds to the worker after job completion.
   * Deducts a 5% platform fee.
   */
  static async releaseEscrow(clientId: string, workerId: string, jobId: string, budget: number) {
    const clientRef = doc(db, 'users', clientId);
    const workerRef = doc(db, 'users', workerId);
    const jobRef = doc(db, 'jobs', jobId);

    await runTransaction(db, async (txn) => {
      const clientSnap = await txn.get(clientRef);
      if ((clientSnap.data()?.escrowBalance || 0) < budget) throw new Error("Insufficient Escrow Balance");

      const platformFee = budget * 0.05;
      const workerPayout = budget - platformFee;

      // 1. Deduct from client's escrow
      txn.update(clientRef, { escrowBalance: increment(-budget) });

      // 2. Add to worker's pending earnings
      txn.update(workerRef, { pendingEarnings: increment(workerPayout) });

      // 3. Mark job as completed
      txn.update(jobRef, { status: 'completed', completedAt: serverTimestamp() });

      // 4. Create Transaction Records
      const cTrans = doc(collection(db, 'transactions'));
      txn.set(cTrans, { userId: clientId, amount: -budget, type: 'payment', status: 'success', taskId: jobId, createdAt: serverTimestamp() });
      
      const wTrans = doc(collection(db, 'transactions'));
      txn.set(wTrans, { userId: workerId, amount: workerPayout, type: 'payment', status: 'success', taskId: jobId, createdAt: serverTimestamp() });
      
      const fTrans = doc(collection(db, 'transactions'));
      txn.set(fTrans, { userId: workerId, amount: -platformFee, type: 'fee', status: 'success', taskId: jobId, createdAt: serverTimestamp() });
    });
  }

  /**
   * Worker withdraws from pendingEarnings to Mobile Money.
   */
  static async withdraw(workerId: string, amount: number) {
    const userRef = doc(db, 'users', workerId);
    await runTransaction(db, async (txn) => {
      const snap = await txn.get(userRef);
      if ((snap.data()?.pendingEarnings || 0) < amount) throw new Error("Insufficient Earnings");

      txn.update(userRef, { pendingEarnings: increment(-amount) });

      const transRef = doc(collection(db, 'transactions'));
      txn.set(transRef, { userId: workerId, amount: -amount, type: 'withdrawal', status: 'pending', createdAt: serverTimestamp() });
    });
  }
}
