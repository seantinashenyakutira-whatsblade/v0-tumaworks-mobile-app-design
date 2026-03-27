export type UserRole = 'client' | 'worker' | 'both';
export type TaskStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'disputed' | 'cancelled';
export type TransactionType = 'deposit' | 'payment' | 'withdrawal' | 'escrow' | 'fee';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  profileImage?: string;
  rating: number;
  reviewsCount: number;
  experience?: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  isPremium: boolean;
  walletBalance: number;
  escrowBalance: number;
  pendingEarnings: number;
  createdAt: any; // Firestore Timestamp
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  tags: string[];
  icon?: string;
}

export interface Task {
  id: string;
  clientId: string;
  workerId?: string;
  serviceId?: string;
  description: string;
  budget: number;
  escrowAmount: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: TaskStatus;
  pendingWorkerId?: string;
  clientConfirmed?: boolean;
  workerConfirmed?: boolean;
  createdAt: any;
  updatedAt: any;
}

export interface Dispute {
  id: string;
  jobId: string;
  reason: string;
  status: 'open' | 'resolved';
  resolution?: string;
  createdAt: any;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  imageUrl?: string;
  createdAt: any;
}

export interface Chat {
  id: string;
  taskId: string;
  participants: string[];
  lastMessage?: string;
  updatedAt: any;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  status: 'pending' | 'success' | 'failed';
  taskId?: string; // If related to a specific task
  createdAt: any;
}

export interface WorkerProfile extends UserProfile {
  skills: string[];
  availability: boolean;
  completedJobs: number;
}
