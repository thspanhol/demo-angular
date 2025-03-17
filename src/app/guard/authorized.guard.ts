import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthorizedGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router, private cookieService: CookieService){}

  canActivate(): boolean {
    if (!!this.cookieService.get('userToken')){
      return !!this.cookieService.get('userToken')
    } else {
      this.router.navigate(["/login"]);
      return false
    }
  }
};
