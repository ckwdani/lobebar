import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

    export const authFeatureKey = 'auth';

export interface AuthState {
    token?: string;
    error?: number;

    isLoading: boolean
}

export const initialState: AuthState = {
    isLoading: true
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.login, state => state),
  on(AuthActions.loginSuccessfull, (state, {token}) => ({...state, token, isLoading: false})),
  on(AuthActions.loadAuthsFailure, (state, {error}) => ({...state, error, isLoading: false})),
  on(AuthActions.loadTokenFromLocal, (state, ) => ({...state, isLoading: true})),
  on(AuthActions.loginRequired, (state) => ({...state, isLoading: false})),

);
