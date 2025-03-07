import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ClassCookieService } from '../services/cookie.service';


@Injectable({
  providedIn: 'root'
})

export class AuthorizedGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router, private cookieService: ClassCookieService){}

  canActivate(): boolean {
    if (!!this.cookieService.getCookie('userToken')){
      return !!this.cookieService.getCookie('userToken')
    } else {
      this.router.navigate(["/login"]);
      return false
    }
  }
};
