import { createAction, props } from '@ngrx/store';
import {DoneExtraWork, DoneExtraWorkTypes} from "@frontend-lb-nx/shared/entities";
import {HttpErrorResponse} from "@angular/common/http";

export const  loadOwnEW = createAction(
  '[EW] Load Own EW'
);

export const loadOwnEWSuccess = createAction(
    '[EW] Load Own EW Success',
    props<{doneEW: DoneExtraWork[]}>()
);

export const loadOwnEWFailure = createAction(
    '[EW] Load Own EW Failure',
    props<{error: HttpErrorResponse}>()
);

export const doEW = createAction(
    '[EW] Do EW',
    props<{ewType: DoneExtraWorkTypes, amount?: number, userId?: string}>()
);

export const doEWSuccesfully = createAction(
    '[EW] Use Snack Successfully',
    props<{ewType: DoneExtraWorkTypes}>()
);

export const doEWFailure = createAction(
    '[EW] Do EW Failure',
    props<{error: HttpErrorResponse}>()
);








