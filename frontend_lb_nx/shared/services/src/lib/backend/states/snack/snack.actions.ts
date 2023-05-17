import { createAction, props } from '@ngrx/store';
import {Snack, SnackType} from "@frontend-lb-nx/shared/entities";
import {HttpErrorResponse} from "@angular/common/http";

export const loadOwnUsedSnacks = createAction(
  '[Snack] Load Own Used Snacks'
);

export const loadOwnUsedSnacksSuccesfully = createAction(
    '[Snack] Load Own Used Snacks Success',
    props<{ownUsedSnacks: Snack[]}>()
);

export const loadOwnUsedSnacksFailure = createAction(
    '[Snack] Load Own Used Snacks Failure',
    props<{error: HttpErrorResponse}>()
);

export const loadOwnUsedSnacksCount = createAction(
    '[Snack] Load Count Own Used Snacks'
);

export const loadOwnUsedSnacksCountSuccesfully = createAction(
    '[Snack] Load Count Own Used Snacks Success'
);

export const loadOwnUsedSnacksCountFailure = createAction(
    '[Snack] Load Own Used Snacks Failure'
);


export const useSnack = createAction(
    '[Snack] Use Snack',
    props<{snack: Snack, userId?: string}>()
);

export const useSnackSuccesfully = createAction(
    '[Snack] Use Snack Successfully',
    props<{snackType: SnackType}>()
);

export const useSnackFailure = createAction(
    '[Snack] Use Snack Failure',
    props<{error: HttpErrorResponse}>()
);








