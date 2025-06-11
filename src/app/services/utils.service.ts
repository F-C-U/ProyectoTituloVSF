import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class UtilsService {
  router = inject(Router);

  saveInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromlocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  routerLink(url:string){
    return this.router.navigateByUrl(url);
  }

  routerLinkWithExtras(url:string, extras:any){
    return this.router.navigateByUrl(url, extras);
  }
  routerLinkExtras(){
    return this.router.getCurrentNavigation()?.extras.state;
  }
}
