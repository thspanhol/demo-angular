import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CookieService } from 'ngx-cookie-service';
import { BaseFormComponent } from '../base-form/base-form.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent extends BaseFormComponent {

  loginFailed = false;

  constructor(private router: Router, private apiService: ApiService, private cookieService: CookieService) {
    super();
    this.createForm();
  }

  override createForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      loginFailed: new FormControl(false)
    });
  }
  
  override onSubmit(): void {

    this.apiService.loginAuth(this.form.value).subscribe({
      next: (resp) => {
  
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 10);
  
        this.cookieService.set('userToken', resp.token, expirationDate);
        this.router.navigate(["/users"]);
      },
      error: (error) => this.loginFailed = true
    });
  }

}
