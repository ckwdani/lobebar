import { Action, createReducer, on } from '@ngrx/store';
import * as ShiftTypeActions from './shift-type.actions';
import {DoneExtraWorkTypes, ShiftType, SnackType} from "@frontend-lb-nx/shared/entities";
import {error} from "ng-packagr/lib/utils/log";

export const shiftTypeFeatureKey = 'shiftType';

export interface ShiftTypesState {
    shiftTypes: ShiftType[];
    ew_types: DoneExtraWorkTypes[];
    snackTypes: SnackType[];
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
    snackTypes: [],
};

export const reducer = createReducer(
  shiftTypeInitialState,

  on(ShiftTypeActions.loadShiftTypes, state => state),
  on(ShiftTypeActions.loadShiftTypesSuccess, (state, {shiftTypes, ew_types, snackTypes}) => { return {...state, shiftTypes, ew_types, snackTypes, isLoading: false, error: undefined}}),
  on(ShiftTypeActions.loadShiftTypesFailure, (state, {error}) => ({...state, error, success: false})),

    on(ShiftTypeActions.addShiftType, (state) => {return{...state, isAddingShiftType: true}}),
    on(ShiftTypeActions.addShiftTypeSuccess, (state,{shiftType})=>{return{...state, shiftTypes: state.shiftTypes.concat(shiftType) , isAddingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.addShiftTypeFailure, (state, {error}) => ({...state, error, isAddingShiftType: false})),


    on(ShiftTypeActions.addExtraWorkType, (state) => {return{...state, isAddingShiftType: true}}),
    on(ShiftTypeActions.addExtraWorkTypeSuccess, (state,{ew_type})=>{return{...state, ew_types: state.ew_types.concat(ew_type) , isAddingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.addExtraWorkTypeFailure, (state, {error}) => ({...state, error, isAddingShiftType: false})),

    on(ShiftTypeActions.addSnackType, (state) => {return{...state, isAddingShiftType: true}}),
    on(ShiftTypeActions.addSnackTypeSuccess, (state,{snackType})=>{return{...state, snackTypes: state.snackTypes.concat(snackType) , isAddingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.addSnackTypeFailure, (state, {error}) => ({...state, error, isAddingShiftType: false})),

    on(ShiftTypeActions.deleteShiftType, (state) => {return{...state, isDeletingShiftType: true}}),
    on(ShiftTypeActions.deleteShiftTypeSuccess, (state,{shiftType})=>{return{...state, shiftTypes: state.shiftTypes.filter(item=>item!==shiftType) , isDeletingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.deleteShiftTypeFailure, (state, {error}) => ({...state, error, isDeletingShiftType: false})),

    on(ShiftTypeActions.EditName, (state) => {return{...state, isAddingShiftType: true, error: undefined}}),
    on(ShiftTypeActions.EditNameSuccess, (state,{shiftType, ew_type, snackType})=>{
        if(shiftType){
            return{...state, shiftTypes: state.shiftTypes.map(item=>item.id===shiftType.id?shiftType:item) , isAddingShiftType: false, error: undefined}
        }
        if(ew_type){
            return{...state, ew_types: state.ew_types.map(item=>item.id===ew_type.id?ew_type:item) , isAddingShiftType: false, error: undefined}
        }
        if(snackType)
        {
            return{...state, snackTypes: state.snackTypes.map(item=>item.id===snackType.id?snackType:item) , isAddingShiftType: false, error: undefined}
        }
        return state;
    }),
    on(ShiftTypeActions.EditNameFailure, (state, {error}) => ({...state, error, isAddingShiftType: false})),

    on(ShiftTypeActions.deleteEWT, (state) => {return{...state, isDeletingShiftType: true}}),
    on(ShiftTypeActions.deleteEWTSuccess, (state,{ew_type})=>{return{...state, ew_types: state.ew_types.filter(item=>item!==ew_type) , isDeletingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.deleteEWTFailure, (state, {error}) => ({...state, error, isDeletingShiftType: false})),

    on(ShiftTypeActions.deleteSnT, (state) => {return{...state, isDeletingShiftType: false}}),
    on(ShiftTypeActions.deleteSnTSuccess, (state,{snackTypes})=>{return{...state, snackTypes: state.snackTypes.filter(item=>item!==snackTypes) , isDeletingShiftType: false, error: undefined}}),
    on(ShiftTypeActions.deleteSnTFailure, (state, {error}) => ({...state, error, isDeletingShiftType: false})),
);
