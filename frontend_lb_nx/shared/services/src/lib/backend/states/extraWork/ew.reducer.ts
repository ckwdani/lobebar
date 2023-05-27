import { Action, createReducer, on } from '@ngrx/store';
import * as SnackActions from './ew.actions';
import {DoneExtraWork, DoneExtraWorkTypes, Snack} from "@frontend-lb-nx/shared/entities";
import {HttpErrorResponse} from "@angular/common/http";

export const ewFeatureKey = 'ew';

export interface EWState {
    isLoading: boolean;
    doneEW: DoneExtraWork[],
    error?: HttpErrorResponse,
}

export const initialState: EWState = {
    isLoading: true,
    doneEW: [],
};

export const reducer = createReducer(
  initialState,

  on(SnackActions.loadOwnEW, (state) => state),
    on(SnackActions.loadOwnEWSuccess,(state, {doneEW})=>{
        return{...state, doneEW: doneEW, isLoading: false}
    }),
    on(SnackActions.loadOwnEWFailure, (state, {error})=>({
        ...state, error: error
    })),
    on(SnackActions.doEW, (state, {ewType})=>{
        return{...state, isLoading: true}
    }),
    on(SnackActions.doEWSuccesfully, (state, {ewType})=>{
        return{...state,  isLoading: false, doneEW: ewType}
    }),
    on(SnackActions.doEWFailure, (state, {error})=>({...state, error, isLoading: false}))
);
