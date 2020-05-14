import { HttpHeaders, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { helpers } from 'chart.js';
import { environment } from '../../environments/environment';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  
    if (req.url.startsWith(environment.baseUrl) && req.url.indexOf('login')==-1
    && req.url.indexOf('upload')==-1) {
      console.log(req.url);
      const token = localStorage.getItem('token');
      let headersOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': token
      });
      req = req.clone({ headers: headersOptions });
    }

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success)
            this.toasterService.success(evt.body.message, evt.body.status);
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            console.log(err.error);
            this.toasterService.error(err.error.message, err.error.status);
          } catch (e) {
            this.toasterService.error('An error occurred', '');
          }
          //log error 
        }
        return of(err);
      }));

  }

}