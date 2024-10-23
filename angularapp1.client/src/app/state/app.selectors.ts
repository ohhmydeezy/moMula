import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { Card } from '../models/card';

export const SelectAll = (state: AppState) => state['userState'];

export const selectUser = createSelector(SelectAll, (state) => state.user);

export const selectAllCards = createSelector(
  selectUser,
  (state) => state?.cards
)

export const selectCardbyId = (cardId: number) => 
  createSelector(
    selectAllCards,
    (cards: Card[] | null | undefined) => cards?.find(c => c.id === cardId)
  )

export const selectDataLoading = createSelector(
  SelectAll,
  (state) => state.loading
);

export const selectDataError = createSelector(
  SelectAll,
  (state) => state.error
);
