import { createAction, props } from '@ngrx/store';
import {OrgEvent, Shift} from "@frontend-lb-nx/shared/entities";
import {HttpErrorResponse} from "@angular/common/http";

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
    '[Shift] Load Outstanding Shifts',
    props<{userId: string}>()
);

export const loadOutstandingShiftsSuccess = createAction(
    '[Shift] Load Outstanding Shifts Success',
    props<{outstandingShifts: Shift[]}>()
);

export const loadOutstandingShiftsFailure = createAction(
    '[Shift] Load Outstanding Shifts Failure',
    props<{error: number}>()
);

export const changeShiftAssignment = createAction(
    '[Shift] Assigning Shifts',
    props<{shift: Shift, deassign: boolean}>()
);

export const changeShiftAssignmentSuccess = createAction(
    '[Shift] Assign Shift Success',
    props<{shift: Shift, deassign: boolean}>()
);

export const changeShiftAssignmentFailure = createAction(
    '[Shift] Assign Shift Failure',
    props<{error: HttpErrorResponse, deassign: boolean}>()
);


export const addShiftToEvent = createAction(
    '[Shift] Add Shift To Event',
    props<{shift: Shift, event: OrgEvent}>()
);

export const addShiftToEventSuccess = createAction(
    '[Shift] Add Shift To Event Success',
    props<{shift: Shift}>()
);

export const addShiftToEventFailure = createAction(
    '[Shift] Add Shift To Event Failure',
    props<{error: HttpErrorResponse}>()
);


export const deleteShiftFromEvent = createAction(
    '[Shift] Delete Shift From Event',
    props<{shift: Shift}>()
);

export const deleteShiftFromEventSuccess = createAction(
    '[Shift] Delete Shift From Event Success',
    props<{shift: Shift}>()
);

export const deleteShiftFromEventFailure = createAction(
    '[Shift] Delete Shift From Event Failure',
    props<{error: HttpErrorResponse}>()
);



