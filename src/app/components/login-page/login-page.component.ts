import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  reactiveForm: FormGroup;
  loginFailed: boolean = false;
  

  constructor(private sharedService: SharedService, private router: Router) {
    this.reactiveForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onLogin = () => {
    //this.reactiveForm.valid && console.log('Dados enviados: ', this.reactiveForm.value);
    let formName = this.reactiveForm.get('name')?.value;
    let formPassword = this.reactiveForm.get('password')?.value;
    let listUsers = this.sharedService.getUsers();

    this.sharedService.setLogin(listUsers.some((user) => user.nome == formName && user.senha == formPassword));    

    this.router.navigate(["/users"]);
    this.loginFailed = true;
  }
  

}
