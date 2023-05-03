import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShift from './shift.reducer';

export const selectShiftState = createFeatureSelector<fromShift.ShiftState>(
  fromShift.shiftFeatureKey
);

export const selectOwnShifts=createSelector(
    selectShiftState,
    (state: fromShift.ShiftState)=>state.ownShifts
)

export const selectOutstandingShifts=createSelector(
    selectShiftState,
    (state: fromShift.ShiftState)=>state.outstandingShifts
)

export const selectShiftsLoading=createSelector(
    selectShiftState,
    (state: fromShift.ShiftState)=>state.isLoading
)

export const selectShiftsError=createSelector(
    selectShiftState,
    (state: fromShift.ShiftState)=>state.error
)
