import { Component, OnInit, DoCheck } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserApi, UserRegister, VerifyResponse } from '../../models/user.model';
import { Router } from '@angular/router';
import { ClassCookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {

  users: VerifyResponse[] = [];
  btnCreateUpdate: string = 'CREATE';
  inputUsername: string = '';
  inputPassword: string = '';
  inputRole: string = 'ADMIN';

  constructor(private apiService: ApiService, private cookieService: ClassCookieService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  };

  onVerify = () => this.apiService.verifyAuth().subscribe(resp => console.log(resp));

  loadUsers() {
    this.apiService.verifyAuth().subscribe(
      (data) => this.users = data,
      (error) => console.log("Error loading users", error)
    )
  };

  createUser() {

    const newUser: UserRegister = {
      username: this.inputUsername,
      password: this.inputPassword,
      role: this.inputRole
    };

    this.inputUsername = '';
    this.inputPassword = '';
    //this.inputRole = 'ADMIN';

    this.apiService.registerAuth(newUser).subscribe(() => this.loadUsers());
  }

  updateInputs(user: VerifyResponse) {

    this.inputUsername = user.username;
    this.inputPassword = '';
    //this.inputRole = 'ADMIN';
    this.btnCreateUpdate = user.userId;
  }

  updateUser() {

    const updateUser = {
      username: this.inputUsername,
      password: this.inputPassword,
      role: this.inputRole
    };

    this.inputUsername = '';
    this.inputPassword = '';
    //this.inputRole = 'ADMIN';

    this.apiService.updateAuth(this.btnCreateUpdate, updateUser).subscribe(() => {
      this.btnCreateUpdate = "CREATE"
      this.loadUsers();
    });
  }

  deleteUser(id: string) {
    this.apiService.deleteAuth(id).subscribe(() => {
      this.loadUsers();
    });
  }

  quitUpdate = () => {

    this.inputUsername = '';
    this.inputPassword = '';
    //this.inputRole = 'ADMIN';
    this.btnCreateUpdate = "CREATE"
  }

}
