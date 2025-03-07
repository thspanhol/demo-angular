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

  export interface UserRegister {
    username: string;
    password: string;
    role: string;
  }

  export interface LoginResponse {
    username: string;
    role: string;
    token: string;
  }

  export interface VerifyResponse {
    userId: string;
    username: string;
    role: string;
  }