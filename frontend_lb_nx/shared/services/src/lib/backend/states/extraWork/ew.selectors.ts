import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEw from './ew.reducer';

export const selectEwState = createFeatureSelector<fromEw.EWState>(
  fromEw.ewFeatureKey
);
export const selectEwsLoading = createSelector(
    selectEwState,
    (state: fromEw.EWState)=>state.isLoading
);

export const selectUsedEws = createSelector(
    selectEwState,
    (state: fromEw.EWState)=>state.doneEW
);

