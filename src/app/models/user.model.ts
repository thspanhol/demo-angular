export interface UserApi {
    id?: string;
    nome: string;
    email: string;
    senha: string;
  }
  
  export interface UserAuth {
    username: string;
    password: string;
  }

  interface BaseUser {
    username: string;
    role: string;
  }

  export interface LoginResponse extends BaseUser{
    token: string;
  }

  export interface UserRegister extends BaseUser {
    password: string;
  }

  export interface VerifyResponse extends BaseUser {
    userId: string;
  }