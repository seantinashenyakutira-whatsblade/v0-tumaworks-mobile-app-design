import { db } from '../lib/firebase';
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
  // Deposit funds into available balance
  deposit: async (userId: string, amount: number, transactionId: string) => {
    const userRef = doc(db, 'users', userId);
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User does not exist");
      
      transaction.update(userRef, {
        walletBalance: increment(amount)
      });
      
      const transRef = doc(collection(db, 'transactions'));
      transaction.set(transRef, {
        id: transRef.id,
        userId,
        amount,
        type: 'deposit' as TransactionType,
        status: 'success',
        createdAt: serverTimestamp()
      });
    });
  },

  // Hold funds in escrow
  holdInEscrow: async (userId: string, amount: number, taskId: string) => {
    const userRef = doc(db, 'users', userId);
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User does not exist");
      
      const currentBalance = userDoc.data().walletBalance || 0;
      if (currentBalance < amount) throw new Error("Insufficient funds in Wallet");
      
      transaction.update(userRef, {
        walletBalance: increment(-amount),
        escrowBalance: increment(amount)
      });
      
      const transRef = doc(collection(db, 'transactions'));
      transaction.set(transRef, {
        id: transRef.id,
        userId,
        amount,
        type: 'escrow' as TransactionType,
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
    });
  },

  // Release Escrow -> Pending Earnings (Take 5% Platform Fee)
  releaseEscrow: async (clientId: string, workerId: string, amount: number, taskId: string) => {
    const clientRef = doc(db, 'users', clientId);
    const workerRef = doc(db, 'users', workerId);
    
    await runTransaction(db, async (transaction) => {
      const clientDoc = await transaction.get(clientRef);
      if (!clientDoc.exists()) throw new Error("Client does not exist");
      
      const escrow = clientDoc.data().escrowBalance || 0;
      if (escrow < amount) throw new Error("Insufficient escrow funds");
      
      const platformFee = amount * 0.05;
      const workerPayout = amount - platformFee;

      // Deduct from client's escrow
      transaction.update(clientRef, {
        escrowBalance: increment(-amount)
      });
      
      // Add to worker's pendingEarnings
      transaction.update(workerRef, {
        pendingEarnings: increment(workerPayout)
      });
      
      // Client Payment Record
      const cTransRef = doc(collection(db, 'transactions'));
      transaction.set(cTransRef, {
        id: cTransRef.id,
        userId: clientId,
        amount: -amount,
        type: 'payment' as TransactionType,
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
      
      // Worker Earning Record
      const wTransRef = doc(collection(db, 'transactions'));
      transaction.set(wTransRef, {
        id: wTransRef.id,
        userId: workerId,
        amount: workerPayout,
        type: 'payment' as TransactionType,
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });

      // Platform Fee Record
      const fTransRef = doc(collection(db, 'transactions'));
      transaction.set(fTransRef, {
        id: fTransRef.id,
        userId: workerId,
        amount: -platformFee,
        type: 'fee' as TransactionType,
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
    });
  },

  // Refund Escrow back to Client Wallet
  refundEscrow: async (clientId: string, amount: number, taskId: string) => {
    const clientRef = doc(db, 'users', clientId);
    await runTransaction(db, async (transaction) => {
      const clientDoc = await transaction.get(clientRef);
      if (!clientDoc.exists()) throw new Error("Client does not exist");
      
      const escrow = clientDoc.data().escrowBalance || 0;
      if (escrow < amount) throw new Error("Insufficient escrow funds to refund");
      
      transaction.update(clientRef, {
        escrowBalance: increment(-amount),
        walletBalance: increment(amount)
      });
      
      const transRef = doc(collection(db, 'transactions'));
      transaction.set(transRef, {
        id: transRef.id,
        userId: clientId,
        amount,
        type: 'escrow' as TransactionType, // Reversing escrow 
        status: 'success',
        taskId,
        createdAt: serverTimestamp()
      });
    });
  },

  // Worker Withdraws Funds
  withdrawFunds: async (workerId: string, amount: number) => {
    const workerRef = doc(db, 'users', workerId);
    await runTransaction(db, async (transaction) => {
      const workerDoc = await transaction.get(workerRef);
      if (!workerDoc.exists()) throw new Error("Worker does not exist");

      const pending = workerDoc.data().pendingEarnings || 0;
      if (pending < amount) throw new Error("Insufficient earnings to withdraw");

      const withdrawalFee = amount * 0.05; // 5% withdrawal fee
      const netPayout = amount - withdrawalFee;

      transaction.update(workerRef, {
        pendingEarnings: increment(-amount)
      });

      const transRef = doc(collection(db, 'transactions'));
      transaction.set(transRef, {
        id: transRef.id,
        userId: workerId,
        amount: -amount,
        type: 'withdrawal' as TransactionType,
        status: 'success',
        createdAt: serverTimestamp()
      });

      const feeRef = doc(collection(db, 'transactions'));
      transaction.set(feeRef, {
        id: feeRef.id,
        userId: workerId,
        amount: -withdrawalFee,
        type: 'fee' as TransactionType,
        status: 'success',
        createdAt: serverTimestamp()
      });
    });
  }
};
