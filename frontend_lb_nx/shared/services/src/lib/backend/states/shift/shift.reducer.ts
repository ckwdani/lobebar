import { Action, createReducer, on } from '@ngrx/store';
import * as ShiftActions from './shift.actions';
import {insertShiftWithDate, Shift} from "@frontend-lb-nx/shared/entities";

export const shiftFeatureKey = 'shift';

export interface ShiftState {
    ownShifts: Shift[];
    ownOldShifts: Shift[];
    outstandingShifts: Shift[];
    isLoading: boolean;
    error?: number
}

export const initialState: ShiftState = {
    isLoading: true,
    ownShifts: [],
    ownOldShifts: [],
    outstandingShifts: [],
};

export const reducer = createReducer(
  initialState,

    on(ShiftActions.loadOwnShifts, state => ({...state, isLoading: true})),
    on(ShiftActions.loadOwnShiftsSuccess, (state, {ownShifts, ownOldShifts})=>{return {...state, ownShifts, ownOldShifts, isLoading: false}}),
    on(ShiftActions.loadOwnShiftsFailure, (state, {error}) =>({...state, error, success: false})),

    on(ShiftActions.loadOutstandingShifts, state => state),
    on(ShiftActions.loadOutstandingShiftsSuccess, (state, {outstandingShifts})=>{return {...state, outstandingShifts, isLoading: false}}),
    on(ShiftActions.loadOutstandingShiftsFailure, (state, {error}) =>({...state, error, success: false})),

    on(ShiftActions.changeShiftAssignment, state => state),
    on(ShiftActions.changeShiftAssignmentSuccess, (state, {shift, deassign})=>{
        return {...state,
            outstandingShifts: state.outstandingShifts.map(s => s.id !==shift.id ? s: shift),
            //check the insertion index for countdown
            ownShifts: deassign ? state.ownShifts.filter(s => s.id !==shift.id) : insertShiftWithDate(state.ownShifts, shift),
            //ownShifts: state.ownShifts.map(s => s.id !==shift.id ? s: shift),

        isLoading: false}
    }),
    on(ShiftActions.changeShiftAssignmentFailure, (state, {error}) =>({...state, error: error.status, success: false})),

    // on(ShiftActions.deassignShift, state => state),
    // on(ShiftActions.deassignShiftSuccess, (state, {shift})=>{return {...state, ownShifts: state.ownShifts.filter(s => s.id !==shift.id), isLoading: false}}),
    // on(ShiftActions.deassignShiftFailure, (state, {error}) =>({...state, error, success: false})),

    // all addShiftToEvent actions
    on(ShiftActions.addShiftToEvent, state => ({...state, isLoading: true})),
    on(ShiftActions.addShiftToEventSuccess, (state, {shift})=>{return {...state, outstandingShifts: [...state.outstandingShifts, shift], isLoading: false}}),
    on(ShiftActions.addShiftToEventFailure, (state, {error}) =>({...state, error: error.status, isLoading: false})),
);

