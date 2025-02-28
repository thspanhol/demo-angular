import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserApi } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private mensagem: string = 'Mensagem Inicial';
  private login: boolean = false;
  private users: UserApi[] = [{nome: "admin", email: "admin@gmail.com", senha: "admin"}];

  constructor(private apiService: ApiService) {
    //this.loadUsers();
  };


  getMensagem(): string {
    return this.mensagem;
  }

  setMensagem(novaMensagem: string) {
    this.mensagem = novaMensagem;
  }

  getLogin(): boolean {
    return this.login;
  }

  setLogin(param: boolean) {
    this.login = param;
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(
      (data) => this.users = data,
      (error) => console.log("Error loading users", error)
    )
  };

  getUsers(): UserApi[] {
    return this.users;
  }
}
