import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ClassCookieService {
  
  constructor(private cookieService: CookieService) { }

  setCookie = (name: string, value: string, days: number): void => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    this.cookieService.set(name, value, expirationDate);
  }

  getCookie = (name: string): string => {
    //console.log(this.cookieService.get(name));
    return this.cookieService.get(name);
  }

  deleteCookie = (name: string): void => {    
    this.cookieService.delete(name);
    //console.log(this.cookieService.get(name));
  }

  deleteAllCookies = (): void => {
    this.cookieService.deleteAll();
  }
}
