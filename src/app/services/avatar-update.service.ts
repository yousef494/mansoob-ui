import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEventType,
  HttpEvent
} from "@angular/common/http";

import { forkJoin } from 'rxjs';
import { map, tap, last } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'


@Injectable({
  providedIn: "root"
})

@Injectable({
  providedIn: 'root'
})
export class AvatarUpdateService {

  public progressSource = new BehaviorSubject<number>(0);

  urlPrefix = '';
  endpoint = '/upload/avatar/';

  constructor(
    private http: HttpClient,
    private auth: AuthService) {
    this.urlPrefix = environment.baseUrl + this.endpoint;
  }


  upload(file: File) {
    let formData = new FormData();
    formData.append("file", file);

    let headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    })


    const req = new HttpRequest(
      "POST",
      this.urlPrefix + this.auth.getUserId(),
      formData,
      {
        headers: headers,
        reportProgress: true
      }
    );

    return forkJoin(this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    ));
  }

  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}