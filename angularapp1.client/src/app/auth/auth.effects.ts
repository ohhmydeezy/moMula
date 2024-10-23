import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map,  tap } from 'rxjs/operators';
import { AccountService } from '../../../services/account.service';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  SignUp,
  SignUpFailure,
  SignUpSuccess,
} from './auth.actions';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  #accountService = inject(AccountService);
  #actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(login),
      exhaustMap(({ loginRequestDto }) => {
        return this.#accountService.login(loginRequestDto).pipe(
          map((user) => ({ type: '[Auth] Login Success', user, redirect: true })),
          catchError((error) => {
            return of(loginFailure({message: error}));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(loginSuccess),
        tap({
          next: (user) => localStorage.setItem('user', JSON.stringify(user)),
        })
      ),
    { dispatch: false }
  );

  signUp$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(SignUp),
      exhaustMap(({ signUpRequest }) => {
        return this.#accountService
          .register(signUpRequest)
          .pipe(
            map((user) => SignUpSuccess({ payload: user })),
            catchError((error) => {
              return of(SignUpFailure({message: error}));
            })
          );
      })
    )
  );

  logOut$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(logout),
        tap({
          next: () => localStorage.clear(),
        })
      ),
    { dispatch: false }
  );

  
}
