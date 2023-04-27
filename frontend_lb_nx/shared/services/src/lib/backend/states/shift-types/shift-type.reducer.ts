import { Action, createReducer, on } from '@ngrx/store';
import * as ShiftTypeActions from './shift-type.actions';
import {ShiftType} from "@frontend-lb-nx/shared/entities";

export const shiftTypeFeatureKey = 'shiftType';

export interface ShiftTypesState {
    shiftTypes: ShiftType[];
    isLoading: boolean;
    error?: number
}

export const shiftTypeInitialState: ShiftTypesState = {
    isLoading: true,
    shiftTypes: [],
};

export const reducer = createReducer(
  shiftTypeInitialState,

  on(ShiftTypeActions.loadShiftTypes, state => state),
  on(ShiftTypeActions.loadShiftTypesSuccess, (state, {shiftTypes}) => { return {...state, shiftTypes, isLoading: false}}),
  on(ShiftTypeActions.loadShiftTypesFailure, (state, {error}) => ({...state, error, success: false})),

);
