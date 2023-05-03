import { createAction, props } from '@ngrx/store';
import {Shift} from "@frontend-lb-nx/shared/entities";

export const loadOwnShifts = createAction(
  '[Shift] Load Own Shifts'
);

export const loadOwnShiftsSuccess = createAction(
    '[Shift] Load Own Shifts Success',
    props<{ownShifts: Shift[]}>()
);

export const loadOwnShiftsFailure = createAction(
    '[Shift] Load Own Shifts Failure',
    props<{error: number}>()
);

export const loadOutstandingShifts = createAction(
    '[Shift] Load Outstanding Shifts'
);

export const loadOutstandingShiftsSuccess = createAction(
    '[Shift] Load Outstanding Shifts Success',
    props<{outstandingShifts: Shift[]}>()
);

export const loadOutstandingShiftsFailure = createAction(
    '[Shift] Load Outstanding Shifts Failure',
    props<{error: number}>()
);

export const assignShift = createAction(
    '[Shift] Assigning Shifts',
    props<{shift: Shift}>()

);

export const assignShiftSuccess = createAction(
    '[Shift] Assign Shift Success',
    props<{shift: Shift}>()
);

export const assignShiftFailure = createAction(
    '[Shift] Assign Shift Failure',
    props<{error: number}>()
);





