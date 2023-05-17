import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSnack from './snack.reducer';

export const selectSnackState = createFeatureSelector<fromSnack.SnackState>(
  fromSnack.snackFeatureKey
);
export const selectSnacksLoading = createSelector(
    selectSnackState,
    (state: fromSnack.SnackState)=>state.isLoading
);

export const selectUsedSnacks = createSelector(
    selectSnackState,
    (state: fromSnack.SnackState)=>state.usedSnacks
);

