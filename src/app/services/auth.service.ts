import { Injectable } from "@angular/core";
import { User } from "./user";
import { Router } from "@angular/router";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';



@Injectable()
export class AuthService {

  urlPrefix = '';
  endpoint = '/';

  private user: User = null;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    })
  };

  constructor(private router: Router, private http: HttpClient) {
    this.urlPrefix = this.endpoint;
  }

  isLoggedIn(): boolean {
    if (this.user !== null) {
      return true;
    }
  }

  setUser(user, token) {
    if (user != null) {
      let name = user['firstName'] + ' ' + user['lastName'];
      this.user = new User();
      this.user.id = user.id;
      this.user.name = name;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.email = user.email;
      this.user.role = user.role;
      this.user.avatar = user.id+"_avatar.png";
      //store in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(this.user));
    }
  }

  getUser(): User {
    return this.user || JSON.parse(localStorage.getItem('user'));
  }

  getUserId() {
    return this.getUser().id;
  }


  getUserName() {
    if (this.getUser() !== null) {
      return this.getUser().name;
    }
    return '';
  }

  getUserFirstName() {
    if (this.getUser() !== null) {
      return this.getUser().firstName;
    }
    return '';
  }

  getUserLastName() {
    if (this.getUser() !== null) {
      return this.getUser().lastName;
    }
    return '';
  }

  getUserEmail() {
    if (this.getUser() !== null) {
      return this.getUser().email;
    }
    return '';
  }

  getRole() {
    if (this.getUser() !== null) {
      return this.getUser().role;
    }
    return '';
  }


  getAvatar() {
    if (this.getUser() !== null) {
      return this.getUser().avatar;
    }
    return '';
  }

  isAdmin(): boolean {
      if (this.getRole() === "ADMIN") {
        return true;
      }
    return false;
  }


  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }


  // ------------- Methods ------------

  register(user) {
    return this.http.post<any>(environment.baseUrl + '/signup', user);
  }
  
  forgetPassword(user){
    return this.http.post<any>(environment.baseUrl + '/forget', user);
  }

  resetPassword(user){
    return this.http.post<any>(environment.baseUrl + '/reset', user);
  }

  login(credentials) {
    return this.http.post<any>(
      environment.baseUrl + '/login',
      credentials
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
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

  generateAPIAccessToken(device_id) {
    let data = { device_id: device_id, user_id: this.getUserId() };
    return this.http.post<any>(environment.baseUrl + '/auth/deviceToken', data);
  }
}
