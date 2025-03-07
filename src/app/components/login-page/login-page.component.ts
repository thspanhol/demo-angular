import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ClassCookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  reactiveForm: FormGroup;
  loginFailed: boolean = false;
  

  constructor(private sharedService: SharedService, private router: Router, private apiService: ApiService, private cookieService: ClassCookieService) {
    this.reactiveForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLogin = () => this.apiService.loginAuth(this.reactiveForm.value).subscribe({
    next: (resp) => {
      //console.log(resp);
      this.setCookie('userToken', resp.token);
      this.router.navigate(["/users"]);
    },
    error: (error) => this.loginFailed = true
  });

  onVerify = () => this.apiService.verifyAuth().subscribe(resp => console.log(resp));

  setCookie(name: string, value: string) {
    this.cookieService.setCookie(name, value, 1);
  }

  getCookie (name: string) {
    this.cookieService.getCookie(name);
  }

  deleteCookie (name: string) {
    this.cookieService.deleteCookie(name);
  }
  
}
