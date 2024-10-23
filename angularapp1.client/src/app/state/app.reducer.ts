import { createReducer, on } from '@ngrx/store';
import {
  addCard,
  addCardFailure,
  addCardSuccess,
  addPayment,
  addPaymentFailure,
  addPaymentSuccess,
  addSavings,
  addSavingsFailure,
  addSavingsSuccess,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  RemoveCard,
  RemoveCardFailure,
  RemoveCardSuccess,
  showSpinner,
} from './app.actions';
import { AppUser } from '../models/appUser';
import { Card } from '../models/card';
import * as AuthActions from '../auth/auth.actions';


export interface UserState {
  user: AppUser | undefined;
  selectedCard: Card | undefined;
  loading: boolean;
  error: string;
}

export const initialState: UserState = {
  user: undefined,
  selectedCard: undefined,
  loading: true,
  error: '',
};

export const appReducer = createReducer(
  initialState,
  on(loadCurrentUser, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(loadCurrentUserSuccess, (state, {user}  ) => ({
    ...state,
    user: user,
    loading: false,
  })),
  on(loadCurrentUserFailure, (state) => ({
    ...state,
    loading: false,
    error: 'failed to load user',
  })),
  on(addCard, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(addCardSuccess, (state, payload) => ({
    ...state,
    user: { ...state.user!, cards: [...state.user?.cards!, payload.payload] },
    loading: false,
    error: '',
  })),
  on(addCardFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(RemoveCard, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(RemoveCardSuccess, (state, action) => ({
    ...state,
    user: {
      ...state.user!,
      cards: [
        ...state.user!.cards!.filter((card) => card.id !== action.cardId),
      ],
    },
    loading: false,
    error: '',
  })),
  on(RemoveCardFailure, (state) => ({
    ...state,
    loading: false,
    error: 'Failed to remove Card',
  })),
  on(addSavings, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(addSavingsSuccess, (state, action) => ({
    ...state,
    user: { ...state.user!, savings: action.payload },
    loading: false,
    error: '',
  })),
  on(addSavingsFailure, (state) => ({
    ...state,
    loading: false,
    error: 'Failed to Add Savings',
  })),
  on(addPayment, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(addPaymentSuccess, (state, payload) => {
    return {
      ...state,
      user: {
        ...state.user!,
        cards: state.user?.cards?.map((card) => {
          if(card.id == payload.payload.cardId) {
            return {
              ...card,
              accountBalance: card.accountBalance + payload.payload.balanceChange,
              transactions: [...card.transactions ?? [], payload.payload]
            }
          }
          return card
        }) ?? []
      },
      selectedCard: {
        ...state.selectedCard!,
      },
      loading: false,
      error: '',
    }
  }),
  on(addPaymentFailure, (state) => ({
    ...state,
    loading: false,
    error: 'Failed to register Payment',
  })),
  on(showSpinner, (state, action) => {
    return {
      ...state,
      loading: action.loading,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: undefined
    };
  }),
);
