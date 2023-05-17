import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {User} from "@frontend-lb-nx/shared/entities";
import {allLoaded} from "./auth.actions";
import {HttpErrorResponse} from "@angular/common/http";

    export const authFeatureKey = 'auth';

export interface AuthState {
    token?: string;
    error?: HttpErrorResponse;

    user?: User;

    isLoading: boolean;

    loggedIn: boolean;

    userLoaded: boolean;
}

export const initialState: AuthState = {
    isLoading: true,
    loggedIn: false,
    userLoaded: false
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.login, state => ({...state, userLoaded: false, isLoading: true, loggedIn: false})),

  on(AuthActions.loginSuccessfull, (state, {token}) => ({...state, token, loggedIn: true})),
  on(AuthActions.loadAuthsFailure, (state, {error}) => ({...state, error, isLoading: false, loggedIn: false})),

  on(AuthActions.loadTokenFromLocal, (state, ) => ({...state, isLoading: true})),
  on(AuthActions.loginRequired, (state) => ({...state, isLoading: false, loggedIn: false})),

  on(AuthActions.allLoaded, (state, {user}) => ({...state, user, isLoading: false, userLoaded: true, loggedIn: true})),
  on(AuthActions.loadUser, (state) => ({...state, isLoading: true, userLoaded: false})),
  on(AuthActions.loadUserError, (state, {error}) => ({...state, error, isLoading: false})),
  on(AuthActions.logout, () => (initialState)),
);
