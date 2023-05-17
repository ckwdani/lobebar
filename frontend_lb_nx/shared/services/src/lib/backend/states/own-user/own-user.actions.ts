import { createAction, props } from '@ngrx/store';
import {Achievement, User} from "@frontend-lb-nx/shared/entities";
import {HttpErrorResponse} from "@angular/common/http";

export const loadOwnUser = createAction(
    '[OwnUser] Load Own User'
);

export const loadOwnUserSuccessfull = createAction(
    '[OwnUser] User Loaded Successfully',
    props<{ user: User }>()
);

export const loadOwnUserError = createAction(
    '[OwnUser] User Load ',
    props<{ error: HttpErrorResponse }>()
);

export const updateUser = createAction(
    '[OwnUser] Update User',
    props<{ user: User }>()
);

export const updateSelectedAchievement = createAction(
    '[OwnUser] Update Achievement',
    props<{achievement: Achievement}>()
)

export const updateUserSuccessful = createAction(
    '[OwnUser] Update User Success',
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    '[OwnUser] Update User Failure',
    props<{ error: HttpErrorResponse }>()
);