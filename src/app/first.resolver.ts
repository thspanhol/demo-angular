import { ResolveFn } from '@angular/router';

export const firstResolver: ResolveFn<any> = (route, state) => {

  //console.log(route);
  //console.log(state);
  console.log("Log do Resolver.");

  return true;
};
