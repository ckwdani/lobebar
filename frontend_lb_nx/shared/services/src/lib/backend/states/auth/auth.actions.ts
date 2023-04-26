import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
    props<{ username: string, password: string }>()
);



export const loginSuccessfull = createAction(
    '[Auth] Login Success',
    props<{ token: string }>()
);

export const loadAuthsFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: number }>()
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
