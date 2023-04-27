import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShiftType from './shift-type.reducer';

export const selectShiftTypeState = createFeatureSelector<fromShiftType.ShiftTypesState>(
  fromShiftType.shiftTypeFeatureKey
);

export const selectShiftTypes = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.shiftTypes
)

export const selectShiftTypesLoading = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.isLoading
)

export const selectShiftTypesError = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.error
)
