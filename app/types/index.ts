export type UserRole = 'client' | 'worker' | 'both';
export type TaskStatus = 'open' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
export type TransactionType = 'deposit' | 'payment' | 'withdrawal' | 'escrow';

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
  pendingBalance: number; // Added for Escrow
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
  userId: string; // The client
  serviceId: string;
  description: string;
  price: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: TaskStatus;
  assignedWorkers: string[]; // List of worker IDs who can see it
  selectedWorkerId?: string; // The one chosen by the user
  createdAt: any;
  updatedAt: any;
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
