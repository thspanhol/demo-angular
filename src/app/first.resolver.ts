import { ResolveFn } from '@angular/router';
import { VerifyResponse } from './models/user.model';
import { inject } from '@angular/core';
import { ApiService } from './services/api.service';
import { take, finalize } from 'rxjs/operators';

export const firstResolver: ResolveFn<VerifyResponse[]> = (route, state) => {

  const apiService = inject(ApiService);

  //console.log(route);
  //console.log(state);

  console.log("Log do Resolver");

  return apiService.verifyAuth()
    // .pipe(
    //   take(1),
    //   finalize(() => console.log("Resolver finalizado"))
    // );

};
