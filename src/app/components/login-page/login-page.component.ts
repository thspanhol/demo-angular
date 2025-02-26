import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  reactiveForm: FormGroup;

  constructor() {
    this.reactiveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLogin = () => this.reactiveForm.valid && console.log('Dados enviados: ', this.reactiveForm.value);

}
