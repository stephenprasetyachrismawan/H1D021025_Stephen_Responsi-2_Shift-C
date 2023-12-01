import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token-saya';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {
    this.loadToken();
  }

  loadToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  public getData(key: string) {
    return localStorage.getItem(key);
  }
  apiURL = () => 'http://localhost/res2api';

  logout() {
    localStorage.clear();

    return true;
  }
}
