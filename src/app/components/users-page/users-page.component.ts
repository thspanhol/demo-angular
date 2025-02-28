import { Component, OnInit, DoCheck } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserApi } from '../../models/user.model';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css'
})
export class UsersPageComponent {

  users: UserApi[] = [];
  btnCreateUpdate: string = 'CREATE';
  inputUsername: string = '';
  inputEmail: string = '';
  inputPassword: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();    
  };

  loadUsers() {
    this.apiService.getUsers().subscribe(
      (data) => this.users = data,
      (error) => console.log("Error loading users", error)
    )
  };

  newUser: UserApi = {
    nome: "Teste User",
    email: "teste@gmail.com",
    senha: "SenhaTeste"
  };

  editUser: UserApi = {
    nome: "Update User",
    email: "update@gmail.com",
    senha: "UpdateTeste"
  };

  createUser() {

    let newUser = {
      nome: this.inputUsername,
      email: this.inputEmail,
      senha: this.inputPassword
    };

    this.inputUsername = '';
    this.inputEmail = '';
    this.inputPassword = '';

    this.apiService.createUser(newUser).subscribe(() => this.loadUsers());
  }

  updateInputs(user: UserApi) {

    this.inputUsername = user.nome;
    this.inputEmail = user.email;
    this.inputPassword = user.senha;
    this.btnCreateUpdate = user.id!;

  }

  updateUser() {

    let updateUser = {
      nome: this.inputUsername,
      email: this.inputEmail,
      senha: this.inputPassword
    };

    this.inputUsername = '';
    this.inputEmail = '';
    this.inputPassword = '';

    this.apiService.updateUser(this.btnCreateUpdate, updateUser).subscribe(() => {
      this.btnCreateUpdate = "CREATE"
      this.loadUsers();
    });
  }

  deleteUser(id: string) {
    this.apiService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  quitUpdate = () => {

    this.inputUsername = '';
    this.inputEmail = '';
    this.inputPassword = '';
    this.btnCreateUpdate = "CREATE"

  }

}
