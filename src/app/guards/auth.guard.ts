import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!localStorage.getItem('tds')) {
      await this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
