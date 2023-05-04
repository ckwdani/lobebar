import { createAction, props } from '@ngrx/store';
import {User} from "@frontend-lb-nx/shared/entities";
import {HttpErrorResponse} from "@angular/common/http";


export const login = createAction(
  '[Auth] Login',
    props<{ username: string, password: string }>()
);



export const loginSuccessfull = createAction(
    '[Auth] Login Success',
    props<{ token: string }>()
);

export const loadUser = createAction(
    '[Auth] Load User',
);
export const allLoaded = createAction(
    '[Auth] User Loaded',
    props<{ user: User }>()
);

export const loadUserError = createAction(
    '[Auth] User Load ',
    props<{ error: HttpErrorResponse }>()
);



export const loadAuthsFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadTokenFromLocal = createAction(
    '[Auth] Load Token From Local',
);

export const logout = createAction(
    '[Auth] Logout',
);

export const loginRequired = createAction(
    '[Auth] Login Required',
);
