import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs';
import { of } from 'rxjs';
import { CreditCardService } from '../../../services/credit-card.service';
import { AccountService } from '../../../services/account.service';
import {
  addCard,
  addCardFailure,
  addCardSuccess,
  addPayment,
  addPaymentFailure,
  addPaymentSuccess,
  addSavings,
  addSavingsSuccess,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  RemoveCard,
  RemoveCardFailure,
  RemoveCardSuccess,
  showSpinner,
} from './app.actions';
import { Router } from '@angular/router';
import { loginSuccess, SignUpSuccess } from '../auth/auth.actions';
import { ToastrService } from 'ngx-toastr';

export class DataEffects {
  #cardService = inject(CreditCardService);
  #acccountService = inject(AccountService);
  #actions = inject(Actions);
  #router = inject(Router);
  #toastr = inject(ToastrService)

  loadCurrentUser$ = createEffect(() =>
    this.#actions.pipe(
      ofType('[Auth] Login Success'),
      exhaustMap((action) => {
        return this.#acccountService
          .getCurrentUserDetails(action.user.userId)
          .pipe(
            map((resp) => loadCurrentUserSuccess({ user: resp })),
            catchError((error) =>
              of(
                loadCurrentUserFailure({ error: error }),
                showSpinner({ loading: false })
              )
            )
          );
      })
    )
  );

  addSavings$ = createEffect(() =>
    this.#actions.pipe(
      ofType(addSavings),
      exhaustMap(({savingsRequest}) => {
        return this.#acccountService.addSavings(savingsRequest).pipe(
          map((updatedSavings) =>
            addSavingsSuccess({ payload: updatedSavings })
          ),
          catchError((error) => {
            return of(addCardFailure({ error: error }));
          })
        );
      })
    )
  );

  addCard$ = createEffect(() =>
    this.#actions.pipe(
      ofType(addCard),
      exhaustMap(({ addCardRequestDto }) => {
        return this.#acccountService.addCard(addCardRequestDto).pipe(
          map((Card) => addCardSuccess({ payload: Card })),
          catchError((error) => {
            return of(addCardFailure({ error: error.error }));
          })
        );
      })
    )
  );

  removeCard$ = createEffect(() =>
    this.#actions.pipe(
      ofType(RemoveCard),
      exhaustMap((action) => {
        return this.#acccountService.deleteCard(action.cardId).pipe(
          map(() => RemoveCardSuccess({cardId: action.cardId})),
          catchError((error) => {
            return of(RemoveCardFailure({ error: error }));
          })
        );
      })
    )
  );

  addPayment$ = createEffect(() =>
    this.#actions.pipe(
      ofType(addPayment),
      exhaustMap(({ payment }) => {
        return this.#cardService.addPayment(payment).pipe(
          map((payment) => addPaymentSuccess({ payload: payment })),
          catchError((error) => {
            return of(addPaymentFailure({ error: error }));
          })
        );
      })
    )
  );

  navigateToDashboard = createEffect(
    () =>
      this.#actions.pipe(
        ofType(
          loginSuccess,
          addCardSuccess,
          addPaymentSuccess,
          RemoveCardSuccess
        ),
        tap(() => {
          this.#router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  navigateToSignin$ = createEffect(
    () =>
      this.#actions.pipe(
        ofType(SignUpSuccess),
        tap({
          next: () => this.#router.navigate(['/sign-in']),
        })
      ),
    { dispatch: false }
  );

  showSuccess$ = createEffect(
    () =>
      this.#actions.pipe(
        ofType(SignUpSuccess, addCardSuccess, addPaymentSuccess, addSavingsSuccess),
        tap({
          next: () => this.#toastr.success('Saved'),
        })
      ),
    { dispatch: false }
  );
}
