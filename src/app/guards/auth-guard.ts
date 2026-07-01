import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  // const authService = inject(Auth);
  const router = inject(Router);

  const token = localStorage.getItem('token'); 
  const role = localStorage.getItem('role');
  const allowedRoles = route.data['roles'];

  // Not logged in
  if (!token) {
    return router.createUrlTree(['/login']);
  }

  // No role restriction
  if (!allowedRoles) {
    return true;
  }

  // Role allowed
  if (role && allowedRoles.includes(role)) {
    return true;
  }

  return false;

  // if(authService.isLoggedIn()){
  //   const user = authService.getCurrentUser();    
  //   const requiredRole = route.data['role'];
  //   console.log(requiredRole, user.role);
  //   return user.role === requiredRole; // for role based access control
  // }
  // else{
  //   router.navigate(['/login']);
  //   return false;
  // }
  
};
