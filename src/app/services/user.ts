import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlPrefix = '';
  endpoint = '/user/';

  constructor(private http: HttpClient) {
    this.urlPrefix = environment.baseUrl + this.endpoint;
  }


  getCount(){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'count'));
  }

  getItems(){
    return forkJoin(this.http.get<any[]>(this.urlPrefix));
  }

  getItem(id){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+id));
  }

  queryItems(query){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'?query='+JSON.stringify(query)));
  }


  updatetItem(id, item){
    return forkJoin(
      this.http.put<any>(
        this.urlPrefix+id,
        item
      )
    );
  }
}


export class User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  status?: string;
}