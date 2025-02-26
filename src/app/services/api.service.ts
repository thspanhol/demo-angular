import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApi } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "https://crud-node-a7h4.onrender.com/usuarios"

  constructor(private http: HttpClient) { }

  // GET
  getUsers(): Observable<UserApi[]> {
    return this.http.get<any>(this.apiURL);
  }

  // POST
  createUser(user: any): Observable<void> {
    return this.http.post<any>(this.apiURL, user);
  }

  // PUT
  updateUser(id: string, user: any): Observable<void> {
    return this.http.put<any>(`${this.apiURL}/${id}`, user);
  }

  // DELETE
  deleteUser(id: string): Observable<void> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }
}
