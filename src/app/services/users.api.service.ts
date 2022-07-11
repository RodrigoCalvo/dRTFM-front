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

  getUsers(): Observable<Array<User>> {
    return this.http.get(this.apiUrl) as Observable<Array<User>>;
  }

  addUser(user: User): Observable<User> {
    return this.http.post(this.apiUrl, user) as Observable<User>;
  }

  updateUser(id: iUser['_id'], user: User): Observable<User> {
    return this.http.patch(this.apiUrl + id, user) as Observable<User>;
  }
  deleteUser(id: iUser['_id']): Observable<User> {
    return this.http.delete(this.apiUrl + id) as Observable<User>;
  }
}
