import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from '@angular/fire/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.email, user.password);
  }

  signOut() {
    return this.auth.signOut();
  }

  updateUser(displayName: string) {
    const user = this.auth.currentUser;
    if (user) {
      return updateProfile(user, { displayName });
    } else {
      return Promise.reject(new Error('No user is currently signed in.'));
    }
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(this.firestore, path), data);
  }

  async getDocument(path: string) {
    const snapshot = await getDoc(doc(this.firestore, path));
    return snapshot.exists() ? snapshot.data() : null;
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(this.firestore, path), data);
  }

  deleteDocument(path: string) {
    return deleteDoc(doc(this.firestore, path));
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}
