import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  urlPrefix = '';
  endpoint = '/device/';

  constructor(private http: HttpClient, private auth: AuthService) {
    this.urlPrefix = environment.baseUrl + this.endpoint;
  }


  getCount() {
    return forkJoin(this.http.get<any[]>(this.urlPrefix + 'count'));
  }

  getItems() {
    return forkJoin(this.http.get<any[]>(this.urlPrefix));
  }

  getItem(id) {
    return forkJoin(this.http.get<any[]>(this.urlPrefix + id));
  }

  queryItems(query) {
    return forkJoin(this.http.get<any[]>(this.urlPrefix + '?query=' + JSON.stringify(query)));
  }


  updatetItem(id, item) {
    return forkJoin(
      this.http.patch<any>(
        this.urlPrefix + id,
        item
      )
    );
  }


  queryShares(query) {
    return forkJoin(
      this.http.get<any[]>(
        environment.baseUrl + '/user_device/' + '?query=' + JSON.stringify(query)
      )
    );
  }


  createShare(item) {
    return forkJoin(
      this.http.post<any>(
        environment.baseUrl + '/user_device/',
        item
      )
    );
  }

  deleteShare(id) {
    return forkJoin(
      this.http.delete<any>(
        environment.baseUrl + '/user_device/'+id
      )
    );
  }


}
