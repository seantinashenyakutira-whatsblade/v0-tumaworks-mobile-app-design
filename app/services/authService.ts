import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserRole, UserProfile } from '../types';

export class AuthService {
  /**
   * Listen for user login/logout changes
   */
  static onAuthStateChange(callback: (user: any) => void) {
    return onAuthStateChanged(auth, callback);
  }

  /**
   * Log into the system with email and password
   */
  static async login(email: string, pass: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return userCredential.user;
  }

  /**
   * Register a new user and create their Firestore initialization record
   */
  static async signup(email: string, pass: string, name: string, role: UserRole) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    // Initialize user in Firestore Database
    await setDoc(doc(db, 'users', user.uid), {
      id: user.uid,
      name: name,
      email: email,
      role: role,
      rating: 5.0,
      reviewsCount: 0,
      walletBalance: 0,
      escrowBalance: 0,
      pendingEarnings: 0,
      isPremium: false,
      location: { lat: -15.3875, lng: 28.3228 }, // Default to Lusaka, Zambia coordinates
      createdAt: serverTimestamp(),
    });

    return user;
  }

  /**
   * Phone number OTP verification flow (for Zambia Mobile Money users)
   */
  static async setupPhoneAuth(phoneNumber: string, containerId: string) {
    const verifier = new RecaptchaVerifier(auth, containerId, {
       'size': 'invisible',
    });
    return await signInWithPhoneNumber(auth, phoneNumber, verifier);
  }

  /**
   * Logout from all sessions
   */
  static async logout() {
    await signOut(auth);
  }
}
