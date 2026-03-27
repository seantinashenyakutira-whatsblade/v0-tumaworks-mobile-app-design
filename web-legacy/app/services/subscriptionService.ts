import { db } from '../firebase/config';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const SubscriptionService = {
  upgradeToPremium: async (userId: string, planId: string) => {
    // In a real app, this would be a webhook after Stripe payment
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      isPremium: true,
      premiumPlan: planId,
      premiumSince: serverTimestamp()
    });
  }
};
