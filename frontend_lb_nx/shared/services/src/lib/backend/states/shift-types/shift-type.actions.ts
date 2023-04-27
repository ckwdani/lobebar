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
