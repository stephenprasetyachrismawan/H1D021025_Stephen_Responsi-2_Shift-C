import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}
  canLoad() {
    if (this.authService.loadToken() != null) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
