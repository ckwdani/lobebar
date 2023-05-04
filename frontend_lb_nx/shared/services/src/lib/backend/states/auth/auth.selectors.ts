import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {asapScheduler, observeOn} from "rxjs";

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);

export const selectToken = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.token
);
export const selectIsLoading = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.isLoading
);

export const selectUserLoaded = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.userLoaded
);

export const selectUser = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.user
);

export const selectLoggedIn = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.loggedIn
);

export const selectIsAccepted = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.user?.approved
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state: fromAuth.AuthState) => state.error
);
