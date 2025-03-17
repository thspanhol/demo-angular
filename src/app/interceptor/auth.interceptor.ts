import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(CookieService);
  const token = cookieService.get('userToken');

    const request = req.clone({ setHeaders: {
    Authorization: 'Bearer ' + token
   }})

  return next(request);

};
