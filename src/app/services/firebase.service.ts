import { Injectable, inject } from '@angular/core';
import { 
  Firestore, doc, setDoc, getDoc, updateDoc, 
  deleteDoc, collection, addDoc, serverTimestamp, 
  collectionData
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
        sendPasswordResetEmail, updateProfile, signOut } from '@angular/fire/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // === AUTENTICACIÓN ===
  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.correo, user.contrasena);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.correo, user.contrasena);
  }

  /**
   * Cierra sesión con manejo de errores tipado y limpieza profunda
   */
  async signOut() {
    try {
      await signOut(this.auth);
      window.location.reload(); // Limpia estados de la app
    } catch (error: unknown) {
      let errorMessage = 'Error desconocido al cerrar sesión';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      throw new Error(errorMessage);
    }
  }

  updateUser(displayName: string) {
    const user = this.auth.currentUser;
    if (user) {
      return updateProfile(user, { displayName });
    }
    throw new Error('Usuario no autenticado');
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  // === FIRESTORE CRUD ===
  setDocument(path: string, data: any) {
    return setDoc(doc(this.firestore, path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(this.firestore, path))).data() || null;
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(this.firestore, path), data);
  }

  deleteDocument(path: string) {
    return deleteDoc(doc(this.firestore, path));
  }

  getCollection(path: string) {
    return collectionData(collection(this.firestore, path), { idField: 'id' });
  }

  // === USUARIO ===
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // === MANTENIMIENTO ===
  async resolverAlerta(
    alertaId: string,
    datosMantencion: {
      fecha: string;
      costo: number;
      facturaUrl?: string;
      comentarios?: string;
    },
    vehiculoId: string
  ) {
    const batchUpdates = [
      updateDoc(doc(this.firestore, alertaId), {
        estado: 'resuelto',
        fechaResolucion: serverTimestamp()
      }),
      addDoc(collection(this.firestore, 'mantenimientos'), {
        ...datosMantencion,
        alertaId,
        vehiculoId,
        createdAt: serverTimestamp()
      })
    ];

    const vehiculoDoc = await getDoc(doc(this.firestore, vehiculoId));
    if (vehiculoDoc.exists() && vehiculoDoc.data()['contadores']) {
      const tareaId = alertaId.split('/')[1];
      batchUpdates.push(
        updateDoc(doc(this.firestore, vehiculoId), {
          [`contadores.${tareaId}`]: 0
        })
      );
    }

    return Promise.all(batchUpdates);
  }

  // === STORAGE ===
  async subirFactura(file: File, path: string): Promise<string> {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('@angular/fire/storage');
    const storage = getStorage();
    const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }
}