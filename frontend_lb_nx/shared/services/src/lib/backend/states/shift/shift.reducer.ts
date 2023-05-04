import { Action, createReducer, on } from '@ngrx/store';
import * as ShiftActions from './shift.actions';
import {Shift} from "@frontend-lb-nx/shared/entities";

export const shiftFeatureKey = 'shift';

export interface ShiftState {
    ownShifts: Shift[];
    outstandingShifts: Shift[];
    isLoading: boolean;
    error?: number
}

export const initialState: ShiftState = {
    isLoading: true,
    ownShifts: [],
    outstandingShifts: [],
};

export const reducer = createReducer(
  initialState,

    on(ShiftActions.loadOwnShifts, state => state),
    on(ShiftActions.loadOwnShiftsSuccess, (state, {ownShifts})=>{return {...state, ownShifts, isLoading: false}}),
    on(ShiftActions.loadOwnShiftsFailure, (state, {error}) =>({...state, error, success: false})),

    on(ShiftActions.loadOutstandingShifts, state => state),
    on(ShiftActions.loadOutstandingShiftsSuccess, (state, {outstandingShifts})=>{return {...state, outstandingShifts, isLoading: false}}),
    on(ShiftActions.loadOutstandingShiftsFailure, (state, {error}) =>({...state, error, success: false})),

    on(ShiftActions.assignShift, state => state),
    on(ShiftActions.assignShiftSuccess, (state, {shift})=>{return {...state, ownShifts: state.ownShifts.map(s => s.id !==shift.id ? s: shift), isLoading: false}}),
    on(ShiftActions.assignShiftFailure, (state, {error}) =>({...state, error, success: false})),
);
