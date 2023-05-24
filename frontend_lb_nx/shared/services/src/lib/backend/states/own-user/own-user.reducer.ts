import {User} from "@frontend-lb-nx/shared/entities";
import {createReducer, on} from "@ngrx/store";
import * as OwnUserActions from "./own-user.actions";
import * as AuthActions from "../auth/auth.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {state} from "@angular/animations";
import {updateSelectedAchievement} from "./own-user.actions";

export const ownUserFeatureKey = 'ownUser';

export interface OwnUserState{
    ownUser?: User;
    isLoading: boolean;
    error?: HttpErrorResponse;
}

export const initialOwnUserState: OwnUserState={
    ownUser: undefined,
    isLoading: true,
}

export const reducer = createReducer(
    initialOwnUserState,
    on(OwnUserActions.updateSelectedAchievement, (state) => ({...state, isLoading: true})),
    on(AuthActions.allLoaded, (state, {user}) => ({...state,ownUser: user, isLoading: false})),
    on(OwnUserActions.updateUser, (state) => {
        return { ...state, isLoading: true};
    }),
    on(OwnUserActions.updateUserSuccessful, (state,{user}) => {
        return {...state, ownUser: user, isLoading: false}
    }),
    on(OwnUserActions.updateUserFailure, (state, {error}) => ({...state, error, isLoading: false})),
);
