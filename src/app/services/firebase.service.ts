import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  serverTimestamp,
  collectionData,
} from '@angular/fire/firestore';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  // === AUTENTICACIÓN ===
  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.correo, user.contrasena);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(
      this.auth,
      user.correo,
      user.contrasena
    );
  }

  /**
   * Cierre de sesión mejorado con gestión de estados y navegación
   * @version 2.0
   * @remarks Incluye:
   * - Limpieza de caché
   * - Redirección controlada
   * - Manejo de errores detallado
   */
  async signOut() {
    try {
      // 1. Cerrar sesión en Firebase
      await signOut(this.auth);

      // 2. Limpiar estados locales (opcional)
      if (typeof window !== 'undefined') {
        window.sessionStorage.clear();
      }

      // 3. Redirección con limpieza de historial
      await this.router.navigate(['/login'], {
        replaceUrl: true,
        state: { sessionClosed: true }
      });

      // 4. Recarga opcional para reset completo
      setTimeout(() => window.location.reload(), 500);

    } catch (error: unknown) {
      console.error('Error en signOut:', error);
      throw this.handleAuthError(error);
    }
  }

  // Manejador centralizado de errores de autenticación
  private handleAuthError(error: unknown): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(
      typeof error === 'string' ? error : 'Error desconocido en autenticación'
    );
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
    const colRef = collection(this.firestore, path);
    return collectionData(colRef, { idField: 'id' });
  }
  getCollectionWhere(
    collectionName: string,
    field: string,
    operator: any,
    value: any
  ): Observable<any[]> {
    const ref = collection(this.firestore, collectionName);
    const q = query(ref, where(field, operator, value));
    return collectionData(q, { idField: 'id' }); // incluye el id del documento si lo necesitas
  }
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
        fechaResolucion: serverTimestamp(),
      })
    );

    // 2. Crear registro de mantenimiento
    batchUpdates.push(
      addDoc(collection(this.firestore, 'mantenimientos'), {
        ...datosMantencion,
        alertaId,
        vehiculoId,
        createdAt: serverTimestamp(),
      })
    ];

    const vehiculoDoc = await getDoc(doc(this.firestore, vehiculoId));
    if (vehiculoDoc.exists()) {
      const data = vehiculoDoc.data();
      const tareaId = alertaId.split('/')[1]; // Extrae ID de la alerta

      batchUpdates.push(
        updateDoc(doc(this.firestore, vehiculoId), {
          [`contadores.${tareaId}`]: 0, // Reinicia el contador específico
        })
      );
    }

    return Promise.all(batchUpdates);
  }

  // === STORAGE ===
  async subirFactura(file: File, path: string): Promise<string> {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import(
      '@angular/fire/storage'
    );
    const storage = getStorage();
    const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }
}
