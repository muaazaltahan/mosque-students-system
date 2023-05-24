import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User, UserToken } from '../models';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  userValue = this.user.value;
  userToken = new BehaviorSubject<UserToken>(null);
  userTokenValue = this.userToken.value;

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string,
    private router: Router
  ) { }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('_rg'));
    return user && user.token
  }

  signup(model: { name: string, email: string, password: string, password_confirmation: string }) {
    let self = this;
    this.http.post<User>(this.apiUrl + '/api/register', model).pipe(
      take(1)
    ).subscribe({
      next(value) {
        self.user.next(value);
        self.saveUserToLocalStorage(value);
        self.router.navigate(['/']);
      },
      error(err) {
        console.error(err);
      },
    });
  }

  signin(model: { email: string, password: string }) {
    let self = this;
    this.http.post<User>(this.apiUrl + '/api/login', model).pipe(
      take(1)
    ).subscribe({
      next(value) {
        self.user.next(value);
        self.saveUserToLocalStorage(value);
        self.router.navigate(['/']);
      },
      error(err) {
        console.error(err);
      },
    })
  }


  saveUserToLocalStorage(user: any) {
    const data = { token: user.token, name: user.name, email: user.email };
    // add token if exists
    localStorage.setItem('_rg', JSON.stringify(data));
  }
}
