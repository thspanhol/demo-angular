import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginResponse, UserAuth, UserRegister, VerifyResponse } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private apiURL = "https://crud-node-a7h4.onrender.com/usuarios"
  // private apiAuth = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ///// AUTH

  loginAuth(user: UserAuth): Observable<LoginResponse> {
    return this.http.post<any>("api/v1/auth/login", user).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // serv
      errorMessage = `Código: ${error.status}, Mensagem: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  verifyAuth(): Observable<VerifyResponse[]> {
    return this.http.get<VerifyResponse[]>("api/v1/auth/verify");
  }

  registerAuth(user: UserRegister): Observable<VerifyResponse> {
    return this.http.post<VerifyResponse>('api/v1/auth/register', user);
  }

  deleteAuth(id: string): Observable<void> {
    return this.http.delete<void>('api/v1/auth/' + id)
  }

  updateAuth(id: string, user: UserRegister): Observable<VerifyResponse> {
    return this.http.put<VerifyResponse>('api/v1/auth/' + id, user)
  }

  // ///////

  // // GET
  // getUsers(): Observable<UserApi[]> {
  //   return this.http.get<any>(this.apiURL);
  // }

  // // POST
  // createUser(user: any): Observable<void> {
  //   return this.http.post<any>(this.apiURL, user);
  // }

  // // PUT
  // updateUser(id: string, user: any): Observable<void> {
  //   return this.http.put<any>(`${this.apiURL}/${id}`, user);
  // }

  // // DELETE
  // deleteUser(id: string): Observable<void> {
  //   return this.http.delete<any>(`${this.apiURL}/${id}`);
  // }
}
