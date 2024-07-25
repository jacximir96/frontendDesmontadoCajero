import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RolesService } from '../services/roles.service';
@Injectable({
  providedIn: 'root'
})
export class rolesGuard implements CanActivate  {

  constructor(private authService: RolesService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRoles'];
    const userRole = this.authService.getUserRole();
     console.log(userRole);
     console.log(expectedRole);
    if (this.authService.isAuthenticated() && expectedRole.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['access-denied']);
      return false;
    }
  }

};
