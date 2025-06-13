import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  router = inject(Router);
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);

  //Loading
  private loadingElement: HTMLIonLoadingElement | null = null;

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

  async presentLoading() {
    this.loadingElement = await this.loadingCtrl.create({
      spinner: 'crescent',
      duration: 0,
    });
    await this.loadingElement.present();
  }

  async dismissLoading() {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
      this.loadingElement = null;
    }
  }

  async presentToast(options: ToastOptions) {
    const toast = await this.toastCtrl.create(options);
    toast.present();
  }

  //Local Storage
  saveInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromlocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
  clearLocalStorage() {
    localStorage.clear();
  }

  //Router Links
  routerLink(url: string) {
    return this.router.navigateByUrl(url);
  }

  routerLinkWithExtras(url: string, extras: any) {
    return this.router.navigateByUrl(url, extras);
  }

  routerLinkExtras() {
    return this.router.getCurrentNavigation()?.extras.state;
  }

  //Manejo de imágenes
  async optimizeImage(
    file: File,
    maxSize: number = 1600,
    quality: number = 0.75
  ): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!file.type.match('image.*')) {
        reject(new Error('El archivo no es una imagen'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('No se pudo crear contexto de canvas'));
            return;
          }

          // Calcular nuevas dimensiones manteniendo aspect ratio
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir a WebP
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Error en la conversión'));
                return;
              }

              const optimizedFile = new File(
                [blob],
                this.generateFileName(file.name, 'webp'),
                {
                  type: 'image/webp',
                  lastModified: Date.now(),
                }
              );

              resolve(optimizedFile);
            },
            'image/webp',
            quality
          );
        };

        img.onerror = () => reject(new Error('Error al cargar la imagen'));
      };

      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsDataURL(file);
    });
  }

  async imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  private generateFileName(originalName: string, newExtension: string): string {
    return originalName.replace(/\.[^/.]+$/, '') + '.' + newExtension;
  }
}
