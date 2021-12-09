import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const token = await this.storageService.get('token');

    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', token),
      });

      return next.handle(authReq).toPromise();
    }

    return next.handle(req).toPromise();
  }
}
