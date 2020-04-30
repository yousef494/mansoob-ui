import { Injectable } from "@angular/core";
import { User } from "./user";
import { Router } from "@angular/router";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
  })
};

@Injectable()
export class AuthService {

  urlPrefix = '';
  endpoint = '/';

  private loggedInUser: User = null;


  constructor(private router: Router, private http: HttpClient) {
    this.urlPrefix = this.endpoint;
  }

  isLoggedIn(): boolean {
    if (this.loggedInUser !== null) {
      return true;
    }
  }

  setLoggedInUser(user) {
    if (user != null) {
      this.loggedInUser = new User();
      this.loggedInUser.id = user.id;
      this.loggedInUser.name = user.name;
      this.loggedInUser.email = user.email;
      this.loggedInUser.role = user.role;
    }
  }

  getLoggedInUser(): User {
    return this.loggedInUser;
  }

  isAdmin(): boolean {
    if (localStorage.getItem('role') === "ADMIN") {
      return true;
    }
    return false;
  }

  login(credentials) {
    return this.http.post<any>(
      environment.baseUrl + '/login',
      credentials
    );
  }

  register(user) {
    return this.http.post<any>(environment.baseUrl + '/signup', user);
  }

  findUserByEmail(email) {
    let query = { 'email': email };
    return this.http.get<any>(environment.baseUrl + '/user?query=' + JSON.stringify(query));
  }

  getAuthUrl() {
    return this.http.get<any>(environment.baseUrl + '/auth');
  }

  authenticate(auth) {
    return this.http.post<any>(environment.baseUrl + '/auth', auth);
  }



  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  getUserName() {
    if (localStorage.getItem('name') !== null) {
      return localStorage.getItem('name');
    }
    return '';
  }

  getUserEmail() {
    if (localStorage.getItem('email') !== null) {
      return localStorage.getItem('email');
    }
    return '';
  }

  getUserId(){
    return localStorage.getItem('id');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
  }

  getUser() {
    if (localStorage.getItem('user') !== null) {
      return localStorage.getItem('user');
    }
    return '';
  }

  getRole() {
    if (localStorage.getItem('role') !== null) {
      return localStorage.getItem('role');
    }
    return '';
  }

  generateAPIAccessToken(device_id){
    let data = { device_id: device_id, user_id: this.getUserId() };
    return this.http.post<any>(environment.baseUrl + '/auth/deviceToken', data);
  }
}
