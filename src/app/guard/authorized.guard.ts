import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';


@Injectable({
  providedIn: 'root'
})

export class AuthorizedGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router){}

  canActivate(): boolean {
    return this.sharedService.getLogin();
  }
  
};
