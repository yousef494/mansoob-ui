import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  urlPrefix = '';
  endpoint = '/reading/';

  constructor(private http: HttpClient, private auth: AuthService) {
    this.urlPrefix = environment.baseUrl + this.endpoint;
  }


  getCount(){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'count'));
  }

  getItems(){
    return forkJoin(this.http.get<any[]>(this.urlPrefix));
  }

  getItemsLimit(limit, query){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'time?query='+JSON.stringify(query)+'&sort=timestamp&limit='+limit, this.auth.httpOptions));
  }

  getItemsConsumptionLimit(limit,device_id){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'consumption?device_id='+device_id+'&limit='+limit));
  }

  getItem(id){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+id));
  }

  queryItems(query){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'?query='+JSON.stringify(query)));
  }

  createItem(item){
    return forkJoin(
      this.http.post<any>(
        this.urlPrefix,
        item
      )
    );
  }

  updatetItem(id, item){
    return forkJoin(
      this.http.patch<any>(
        this.urlPrefix+id,
        item
      )
    );
  }

  deleteItem(id){
    return forkJoin(
      this.http.delete<any>(
        this.urlPrefix+id
      )
    );
  }


}
