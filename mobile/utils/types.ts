import { Timestamp } from 'firebase/firestore';

export type UserRole = 'client' | 'worker';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  role: 'client' | 'worker' | 'both';
  currentMode: UserRole;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  preferredLanguage: 'English' | 'Bemba' | 'Nyanja' | 'Tonga' | 'Swahili';
  walletBalance: number;
  escrowBalance: number;
  pendingEarnings: number;
  rating: number;
  reviewsCount: number;
  isPremium: boolean;
  premiumType?: 'individual' | 'business';
  premiumUntil?: Date | Timestamp;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  fcmToken?: string;
}

export type JobStatus = 'open' | 'assigned' | 'in-progress' | 'completed' | 'cancelled' | 'disputed';

export interface Job {
  id: string;
  clientId: string;
  workerId?: string;
  pendingWorkerId?: string; // For worker requests
  category: string;
  tags: string[];
  title: string;
  description: string;
  budget: number;
  escrowAmount: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: JobStatus;
  clientConfirmed: boolean;
  workerConfirmed: boolean;
  createdAt: Date | Timestamp;
  updatedAt: Date | Timestamp;
  completedAt?: Date | Timestamp;
}

export type TransactionType = 'deposit' | 'withdrawal' | 'payment' | 'escrow' | 'fee' | 'refund';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  status: 'pending' | 'success' | 'failed';
  gateway?: 'mtn' | 'airtel' | 'zamtel' | 'stripe';
  externalId?: string; // Stripe or MM reference
  taskId?: string;
  createdAt: Date | Timestamp;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  image?: string;
  translatedText?: {
    [lang: string]: string;
  };
  createdAt: Date | Timestamp;
}

export interface Chat {
  id: string;
  participants: string[];
  jobId: string;
  lastMessage?: string;
  updatedAt: Date | Timestamp;
}

export interface MarketplaceListing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: Date | Timestamp;
}
