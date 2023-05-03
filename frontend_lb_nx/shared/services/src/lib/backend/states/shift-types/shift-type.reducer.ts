import { Action, createReducer, on } from '@ngrx/store';
import * as ShiftTypeActions from './shift-type.actions';
import {ShiftType} from "@frontend-lb-nx/shared/entities";

export const shiftTypeFeatureKey = 'shiftType';

export interface ShiftTypesState {
    shiftTypes: ShiftType[];
    ew_types: ShiftType[];
    isLoading: boolean;
    isAddingShiftType: boolean;
    isDeletingShiftType: boolean;
    error?: number
}

export const shiftTypeInitialState: ShiftTypesState = {
    isAddingShiftType: false,
    isDeletingShiftType: false,
    isLoading: true,
    shiftTypes: [],
    ew_types: [],
};

export const reducer = createReducer(
  shiftTypeInitialState,

  on(ShiftTypeActions.loadShiftTypes, state => state),
  on(ShiftTypeActions.loadShiftTypesSuccess, (state, {shiftTypes, ew_types}) => { return {...state, shiftTypes, ew_types, isLoading: false, error: undefined}}),
  on(ShiftTypeActions.loadShiftTypesFailure, (state, {error}) => ({...state, error, success: false})),

    on(ShiftTypeActions.addShiftType, (state) => {return{...state, isAddingShiftType: true}}),
    on(ShiftTypeActions.addShiftTypeSuccess, (state,{shiftType})=>{return{...state, shiftTypes: state.shiftTypes.concat(shiftType) , isAddingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.addShiftTypeFailure, (state, {error}) => ({...state, error, isAddingShiftType: false})),


    on(ShiftTypeActions.addExtraWorkType, (state) => {return{...state, isAddingShiftType: true}}),
    on(ShiftTypeActions.addExtraWorkTypeSuccess, (state,{ew_type})=>{return{...state, ew_types: state.ew_types.concat(ew_type) , isAddingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.addExtraWorkTypeFailure, (state, {error}) => ({...state, error, isAddingShiftType: false})),

    on(ShiftTypeActions.deleteShiftType, (state) => {return{...state, isDeletingShiftType: true}}),
    on(ShiftTypeActions.deleteShiftTypeSuccess, (state,{shiftType})=>{return{...state, shiftTypes: state.shiftTypes.filter(item=>item!==shiftType) , isDeletingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.deleteShiftTypeFailure, (state, {error}) => ({...state, error, isDeletingShiftType: false})),

    on(ShiftTypeActions.deleteEWT, (state) => {return{...state, isDeletingShiftType: true}}),
    on(ShiftTypeActions.deleteEWTSuccess, (state,{ew_type})=>{return{...state, ew_types: state.ew_types.filter(item=>item!==ew_type) , isDeletingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.deleteEWTFailure, (state, {error}) => ({...state, error, isDeletingShiftType: false})),
);
