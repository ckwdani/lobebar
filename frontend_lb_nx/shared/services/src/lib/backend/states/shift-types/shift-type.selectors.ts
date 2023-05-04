import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShiftType from './shift-type.reducer';

export const selectShiftTypeState = createFeatureSelector<fromShiftType.ShiftTypesState>(
  fromShiftType.shiftTypeFeatureKey
);

export const selectShiftTypes = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.shiftTypes
)

export const selectEWTypes = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.ew_types
)

export const selectShiftTypesLoading = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.isLoading
)

    export const selectShiftTypesAdding = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.isAddingShiftType
)

export const selectShiftTypesAddingError = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=> ({adding: state.isAddingShiftType, error: state.error})
)
export const selectDeletingError = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=> ({adding: state.isDeletingShiftType, error: state.error})
)

export const selectShiftTypesError = createSelector(
    selectShiftTypeState,
    (state: fromShiftType.ShiftTypesState)=>state.error
)
