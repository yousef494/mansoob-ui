import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  urlPrefix = '';
  endpoint = '/notification';

  constructor(private http: HttpClient) {
    this.urlPrefix = environment.baseUrl + this.endpoint;
  }

  getCount(){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'count'));
  }

  getItems(){
    return forkJoin(this.http.get<any[]>(this.urlPrefix));
  }

  getItemsLimit(limit){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'time?sort=id&limit='+limit));
  }

  getItemsConsumptionLimit(limit){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'consumption?limit='+limit));
  }

  getItem(id){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+id));
  }

  queryItems(query){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'?query='+JSON.stringify(query)));
  }

  getItemsByUser(id){
    return forkJoin(this.http.get<any[]>(this.urlPrefix+'/user?id='+id));
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
