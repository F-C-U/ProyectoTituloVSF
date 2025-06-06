import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  saveInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromlocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
}
