import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { iUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  apiUrl: string;
  constructor(public http: HttpClient) {
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
    loginData?: {
      email: iUser['email'];
      password: iUser['password'];
    },
    token?: string
  ): Observable<{ user: iUser; token: string }> {
    if (loginData) {
      return this.http.post(this.apiUrl + 'login', loginData) as Observable<{
        user: iUser;
        token: string;
      }>;
    } else if (token) {
      return this.http.post(
        this.apiUrl + 'login',
        {},
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      ) as Observable<{
        user: iUser;
        token: string;
      }>;
    } else {
      return {} as Observable<{
        user: iUser;
        token: string;
      }>;
    }
  }

  updateUser(user: Partial<iUser>, authToken: string): Observable<iUser> {
    return this.http.patch(this.apiUrl, user, {
      headers: { Authorization: 'Bearer ' + authToken },
    }) as Observable<iUser>;
  }

  deleteSelfUser(authToken: string): Observable<{ deleted: boolean }> {
    return this.http.delete(this.apiUrl, {
      headers: { Authorization: 'Bearer ' + authToken },
    }) as Observable<{ deleted: boolean }>;
  }
}
