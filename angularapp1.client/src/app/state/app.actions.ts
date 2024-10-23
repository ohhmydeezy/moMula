import { createAction, props } from '@ngrx/store';
import { AppUser } from '../models/appUser';
import { Card } from '../models/card';
import { addCardRequestDto } from '../models/addCardRequest';
import { userTransaction } from '../models/userTransactionDto';
import { SavingsRequest } from '../models/savingsRequest';



export const loadCurrentUser = createAction(
  '[User] load user State',
);

export const loadCurrentUserSuccess = createAction(
  '[User] load User State Success',
  props<{ user: AppUser}>()
);

export const loadCurrentUserFailure = createAction(
  '[User] Load User State Failure',
  props<{ error: string }>()
);


export const showSpinner = createAction(
  '[UI] show loading spinner',
  props<{loading: boolean}>()
)

export const addCard = createAction(
  '[Card] Add Card',
  props<{ addCardRequestDto: addCardRequestDto }>()
)
export const addCardSuccess = createAction(
  '[Card] Added Card Succesfully',
  props<{ payload: Card }>()
)
export const addCardFailure = createAction(
  '[Card] Add Card Failure',
  props<{ error: string }>()
)
export const addSavings = createAction(
  '[Savings] Add Savings',
  props<{ savingsRequest: SavingsRequest }>()
)
export const addSavingsSuccess = createAction(
  '[Savings] Added Savings Succesfully',
  props<{ payload: number }>()
)
export const addSavingsFailure = createAction(
  '[Savings] Add Card Failure',
  props<{ error: Error }>()
)
export const addPayment = createAction(
  '[Card] Add Card Payment',
  props<{ payment: userTransaction }>()
)
export const addPaymentSuccess = createAction(
  '[Card] Added Payment Succesfully',
  props<{  payload: any}>()
)
export const addPaymentFailure = createAction(
  '[Card] Adding Payment Failure',
  props<{ error: Error }>()
)

export const RemoveCard = createAction(
  '[Card] Remove Card',
  props<{ cardId: number }>()
)
export const RemoveCardSuccess = createAction(
  '[Card] Card Removed Succesfully',
  props<{ cardId: number }>()
)
export const RemoveCardFailure = createAction(
  '[Card] Remove Card Failure',
  props<{ error: Error }>()
)


