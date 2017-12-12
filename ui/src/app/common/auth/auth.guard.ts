import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const targetUrl: string = state.url;
    return this.authService.canAccess(targetUrl).map(canAccess => {
      if (!canAccess) {
        this.router.navigate(['login'], { queryParams: { redirectTo: targetUrl } });
      }
      return canAccess;
    });
  }
}
