import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updateProfile } from '@angular/fire/auth';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  auth = inject(AngularFirestore);
  firestore = inject(AngularFirestore)

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  } 
  signOut() {
    return getAuth().signOut();
  }
  updateUser(displayName: string) {
  const user = getAuth().currentUser;
  if (user) {
    return updateProfile(user, { displayName });
  } else {
    return Promise.reject(new Error('No user is currently signed in.'));
  }
  }
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email)
  }
}

