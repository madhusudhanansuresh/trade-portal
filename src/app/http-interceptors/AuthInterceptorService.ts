import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authToken = '0jGopc7yWzwKJjdK8SJqciaq-czIrNYLElE_hw5Zj1VYAzFutsq2hA==';
    const authReq = authToken
      ? req.clone({
          headers: req.headers.set('x-functions-key', `${authToken}`)
        })
      : req;

    return next.handle(authReq);
  }
}
