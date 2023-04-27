import { createAction, props } from '@ngrx/store';
import {ShiftType} from "@frontend-lb-nx/shared/entities";

export const loadShiftTypes = createAction(
  '[ShiftType] Load ShiftTypes'
);

export const loadShiftTypesSuccess = createAction(
  '[ShiftType] Load ShiftTypes Success',
  props<{ shiftTypes: ShiftType[] }>()
);

export const loadShiftTypesFailure = createAction(
  '[ShiftType] Load ShiftTypes Failure',
  props<{ error: number }>()
);

export const addShiftType = createAction(
    '[ShiftType] Adding ShiftType',
    props<{shiftType: ShiftType}>()
);

export const addShiftTypeSuccess = createAction(
    '[ShiftType] Adding ShiftType Success',
    props<{shiftType: ShiftType}>()
)

export const addShiftTypeFailure = createAction(
    '[ShiftType] Adding ShiftType Failure',
    props<{error: number}>()
)
