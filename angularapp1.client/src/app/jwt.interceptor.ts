import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthUser } from './auth/auth.selector';
import { first, switchMap } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  #store = inject(Store) 

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.#store.select(selectAuthUser).pipe(first(), switchMap(user => {
      const authRequest = !!user?.token ? req.clone({
        setHeaders: {Authorization: 'Bearer ' + user?.token},
      }) : req;
      return next.handle(authRequest)
    }))
  }
}
