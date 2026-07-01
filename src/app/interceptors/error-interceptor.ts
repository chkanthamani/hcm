import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  return next(req).pipe(catchError((error: HttpErrorResponse)=>{
    console.log(error);
    if(error.status === 401 || error.status === 403){
      // alert('Unauthorized');
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      router.navigate(['/login']);
    }
    else if(error.status == 404){
      alert('Page Not Found');
    }
    return throwError(()=>error);
  }));
};
