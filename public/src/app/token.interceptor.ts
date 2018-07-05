import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
// import { access } from 'fs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = {};
    const token = window.localStorage['x-access-token'];
    if (token) {
      headers['x-access-token'] = token;
    }
    request = request.clone({
      setHeaders: headers
    });

    return next.handle(request);
  }
}
