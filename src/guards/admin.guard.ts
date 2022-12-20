import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  error: Boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.authService.isAdmin()
    ) {
      return true;
    } else {
      // not admin so redirect to home page
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
