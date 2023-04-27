import { createAction, props } from '@ngrx/store';
import {User} from "@frontend-lb-nx/shared/entities";

export const register = createAction(
    '[Auth] Register',
    props<{user: User}>()
)

export const registerSuccessfull = createAction(
    '[Auth] Register Success',
    props<{user: User}>()
)

export const registerError = createAction(
    '[Auth] Register Failure',
    props<{error: number}>()
)
