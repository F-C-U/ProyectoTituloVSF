import { Injectable, inject } from '@angular/core';
import { 
  Firestore, doc, setDoc, getDoc, updateDoc, 
  deleteDoc, collection, addDoc, serverTimestamp, 
  collectionData
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
        sendPasswordResetEmail, updateProfile } from '@angular/fire/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  // === MÉTODOS EXISTENTES (autenticación) ===
  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.correo, user.contrasena);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(this.auth, user.correo, user.contrasena);
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

  // === MÉTODOS EXISTENTES (Firestore CRUD) ===
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

  getCollection(path:string){
    const colRef = collection(this.firestore,path)
    return collectionData(colRef,{idField:'id'});
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  // === NUEVOS MÉTODOS PARA MANTENIMIENTO ===
  /**
   * Resuelve una alerta y registra el mantenimiento en Firestore.
   * @param alertaId Ejemplo: 'alertas/ABC123'
   * @param datosMantencion { fecha, costo, facturaUrl?, comentarios? }
   * @param vehiculoId Ejemplo: 'vehiculos/DEF456'
   */
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
    const batchUpdates: Promise<any>[] = [];

    // 1. Actualizar estado de la alerta
    batchUpdates.push(
      updateDoc(doc(this.firestore, alertaId), {
        estado: 'resuelto',
        fechaResolucion: serverTimestamp()
      })
    );

    // 2. Crear registro de mantenimiento
    batchUpdates.push(
      addDoc(collection(this.firestore, 'mantenimientos'), {
        ...datosMantencion,
        alertaId,
        vehiculoId,
        createdAt: serverTimestamp()
      })
    );

    // 3. Reiniciar contador de kilometraje (asumiendo estructura de vehículo)
    const vehiculoDoc = await getDoc(doc(this.firestore, vehiculoId));
    if (vehiculoDoc.exists()) {
      const data = vehiculoDoc.data();
      const tareaId = alertaId.split('/')[1]; // Extrae ID de la alerta
      
      batchUpdates.push(
        updateDoc(doc(this.firestore, vehiculoId), {
          [`contadores.${tareaId}`]: 0 // Reinicia el contador específico
        })
      );
    }

    return Promise.all(batchUpdates);
  }

  /**
   * Sube una factura a Firebase Storage.
   * @param file Archivo (File o Blob)
   * @param path Ruta personalizable (ej: 'facturas/vehiculo_DEF456')
   */
  async subirFactura(file: File, path: string): Promise<string> {
    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('@angular/fire/storage');
    const storage = getStorage();
    const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }
}