import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromState from './auth.reducer'

export const selectAuthState = createFeatureSelector<fromState.AuthState>("authState")

export const selectAuthUser = createSelector(
    selectAuthState,
    (state) => state.user
  );

  export const selectError = createSelector(
    selectAuthState,
    (state) => state.errorMessage
  );

  export const selectLoading = createSelector(
    selectAuthState,
    (state) => state.loading
  );

