import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs'; // change to new RxJS 6 import syntax
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  urlPrefix = '';
  endpoint = '/contact/';

  constructor(private http: HttpClient) {
    this.urlPrefix = environment.baseUrl + this.endpoint;
  }


    //to be moved to service
    sendMessage(messageContent: any) {
      return forkJoin(
        this.http.post<any>(
          this.urlPrefix,
          JSON.stringify(messageContent)
        )
      );
    }
}
