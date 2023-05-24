import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth'])
      return false;
    }
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('_rg'));
    return user && user.token
  }

}
