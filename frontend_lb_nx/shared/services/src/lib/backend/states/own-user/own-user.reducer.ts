import {User} from "@frontend-lb-nx/shared/entities";
import {createReducer} from "@ngrx/store";


export const ownUserFeatureKey = 'ownUser';

export interface OwnUserState{
    ownUser?: User;
    isLoading: boolean;
    error?: number
}

export const initialOwnUserState: OwnUserState={
    ownUser: undefined,
    isLoading: true,
}

export const reducer = createReducer(
    initialOwnUserState
)