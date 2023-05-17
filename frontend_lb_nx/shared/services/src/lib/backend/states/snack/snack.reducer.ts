import { Action, createReducer, on } from '@ngrx/store';
import * as SnackActions from './snack.actions';
import {Snack} from "@frontend-lb-nx/shared/entities";
import {HttpErrorResponse} from "@angular/common/http";

export const snackFeatureKey = 'snack';

export interface SnackState {
    isLoading: boolean;
    usedSnacks: Snack[],
    error?: HttpErrorResponse,
}

export const initialState: SnackState = {
    isLoading: true,
    usedSnacks: [],
};

export const reducer = createReducer(
  initialState,

  on(SnackActions.loadOwnUsedSnacks, state => state),
    on(SnackActions.useSnack, (state,{snack})=>{
        return{...state, isLoading: true}
    }),
    on(SnackActions.useSnackSuccesfully, (state,{snackType})=>{
        return{...state, isLoading: false}
    }),
    on(SnackActions.useSnackFailure, (state,{error})=>({...state, error, isLoading: false}))
);
