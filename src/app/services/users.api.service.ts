import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, iUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:9000/user/';
  }

  getUsers(): Observable<Array<iUser>> {
    return this.http.get(this.apiUrl) as Observable<Array<iUser>>;
  }

  getUser(id: iUser['_id']): Observable<iUser> {
    return this.http.get(this.apiUrl + id) as Observable<iUser>;
  }

  addUser(user: iUser): Observable<{ user: iUser; token: string }> {
    return this.http.post(this.apiUrl, user) as Observable<{
      user: iUser;
      token: string;
    }>;
  }

  loginUser(
    email: iUser['email'],
    password: iUser['password']
  ): Observable<{ user: iUser; token: string }> {
    return this.http.post(this.apiUrl + 'login', {
      email,
      password,
    }) as Observable<{ user: iUser; token: string }>;
  }

  updateUser(id: iUser['_id'], user: iUser): Observable<iUser> {
    return this.http.patch(this.apiUrl + id, user) as Observable<iUser>;
  }

  deleteSelfUser(): Observable<{ deleted: boolean }> {
    return this.http.delete(this.apiUrl) as Observable<{ deleted: boolean }>;
  }
}