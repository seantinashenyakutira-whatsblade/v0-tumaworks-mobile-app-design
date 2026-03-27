import { db } from '../firebase/config';
import { 
  doc, 
  updateDoc, 
  increment, 
  collection, 
  addDoc, 
  serverTimestamp, 
  runTransaction 
} from 'firebase/firestore';
import { TransactionType } from '../types';

export const WalletService = {
  /**
   * atomicity is key for financial transactions.
   * We use Firestore transactions to prevent race conditions (double spending).
   */
  
  // Deposit funds into available balance
  deposit: async (userId: string, amount: number, transactionId: string) => {
    const userRef = doc(db, 'users', userId);
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User does not exist");
      
      transaction.update(userRef, {
        walletBalance: increment(amount)
      });
      
      const transRef = collection(db, 'transactions');
      transaction.set(doc(transRef), {
        userId,
        amount,
        type: 'deposit' as TransactionType,
        status: 'success',
        externalId: transactionId,
        createdAt: serverTimestamp()
      });
    });
  },

  // Move funds from wallet to escrow (pending)
  holdInEscrow: async (userId: string, amount: number, taskId: string) => {
    const userRef = doc(db, 'users', userId);
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User does not exist");
      
      const currentBalance = userDoc.data().walletBalance || 0;
      if (currentBalance < amount) throw new Error("Insufficient funds");
      
      transaction.update(userRef, {
        walletBalance: increment(-amount),
        pendingBalance: increment(amount)
      });
      
      const transRef = collection(db, 'transactions');
      transaction.set(doc(transRef), {
        userId,
        amount,
        type: 'escrow' as TransactionType,
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
    });
  },

  // Release funds from escrow to worker
  releaseEscrow: async (clientId: string, workerId: string, amount: number, taskId: string) => {
    const clientRef = doc(db, 'users', clientId);
    const workerRef = doc(db, 'users', workerId);
    
    await runTransaction(db, async (transaction) => {
      const clientDoc = await transaction.get(clientRef);
      if (!clientDoc.exists()) throw new Error("Client does not exist");
      
      const pending = clientDoc.data().pendingBalance || 0;
      if (pending < amount) throw new Error("Insufficient pending funds");
      
      // Deduct from client's pending
      transaction.update(clientRef, {
        pendingBalance: increment(-amount)
      });
      
      // Add to worker's available
      transaction.update(workerRef, {
        walletBalance: increment(amount)
      });
      
      // Record for client
      const transRef = collection(db, 'transactions');
      transaction.set(doc(transRef), {
        userId: clientId,
        amount,
        type: 'payment' as TransactionType,
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
      
      // Record for worker
      transaction.set(doc(transRef), {
        userId: workerId,
        amount,
        type: 'deposit' as TransactionType,
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
    });
  }
};
