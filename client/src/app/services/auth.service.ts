import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RegisterUser } from '../types/User';
import { StorageService } from './storage.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}
  login(email: string, password: string) {
    this.httpClient
      .post(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .subscribe((res: any) => {
        this.storageService.set('token', res.token.token);
        this.storageService.set('expires', res.token.expires);
        this.router.navigateByUrl('tabs');
      });
  }
  register(user: RegisterUser) {
    this.httpClient
      .post(`${this.apiUrl}/register`, user)
      .subscribe((res: any) => {
        this.storageService.set('token', res.token.token);
        this.storageService.set('expires', res.token.expires);
        this.router.navigateByUrl('tabs');
      });
  }
}
