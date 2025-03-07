import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';
import { ClassCookieService } from '../services/cookie.service';
import { inject, Inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(ClassCookieService);
  const token = cookieService.getCookie('userToken');


    const request = req.clone({ setHeaders: {
    Authorization: 'Bearer ' + token
   }})

  return next(request);

};
