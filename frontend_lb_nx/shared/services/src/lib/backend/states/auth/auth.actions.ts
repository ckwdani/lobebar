import { createAction, props } from '@ngrx/store';

export const loadAuths = createAction(
  '[Auth] Load Auths'
);

export const loginSuccessfull = createAction(
    '[Auth] Login Success',
    props<{ token: string }>()
);

export const loadAuthsFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: number }>()
);
