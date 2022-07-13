import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getToken(): string | null {
    const userToken = localStorage.getItem('user-token');
    if (userToken) {
      return JSON.parse(userToken);
    }
    return null;
  }

  saveToken(data: string) {
    return localStorage.setItem('user-token', JSON.stringify(data));
  }

  clearToken() {
    localStorage.removeItem('user-token');
  }
}
