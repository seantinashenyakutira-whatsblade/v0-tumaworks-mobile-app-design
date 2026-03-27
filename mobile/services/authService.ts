import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from '../utils/types';

export class AuthService {
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
  }

  static async signUp(email: string, pass: string, profile: Partial<UserProfile>) {
    const { user } = await createUserWithEmailAndPassword(auth, email, pass);
    
    // Initial profile creation. Defaults to clientMode.
    const userProfile: UserProfile = {
      id: user.uid,
      name: profile.name || '',
      email: user.email!,
      phoneNumber: profile.phoneNumber || '',
      role: 'client',
      currentMode: 'client',
      walletBalance: 0,
      escrowBalance: 0,
      pendingEarnings: 0,
      rating: 5.0,
      reviewsCount: 0,
      isPremium: false,
      preferredLanguage: 'English',
      createdAt: new Date(),
      updatedAt: new Date(),
      location: profile.location,
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    return user;
  }

  static async signIn(email: string, pass: string) {
    return await signInWithEmailAndPassword(auth, email, pass);
  }

  static async logout() {
    await signOut(auth);
  }

  static async updateProfile(uid: string, updates: Partial<UserProfile>) {
    await updateDoc(doc(db, 'users', uid), {
      ...updates,
      updatedAt: serverTimestamp()
    });
  }

  static async switchRoleMode(uid: string, mode: 'client' | 'worker') {
    await updateDoc(doc(db, 'users', uid), {
      currentMode: mode,
      updatedAt: serverTimestamp()
    });
  }

  static onAuthStateChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
}
