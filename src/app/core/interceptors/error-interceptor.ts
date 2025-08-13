import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401){
        alert('You are not logged in! Redirecting...');
        window.location.href=''
      }
      return throwError(() => error);
    })
  )
};
