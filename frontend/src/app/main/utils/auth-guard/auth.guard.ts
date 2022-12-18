import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const account = this.authService.accountValue;

    if(account){
        if (route.data['role'] && route.data['role'].indexOf(account.role) === -1) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }
  
}
