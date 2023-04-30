import { Action, createReducer, on } from '@ngrx/store';
import * as OrgEventActions from './orgEvent.actions';
import {OrgEvent, OrgEventClass} from "@frontend-lb-nx/shared/entities";

export const orgEventFeatureKey = 'orgEvent';

export interface OrgEventState {
    orgEvent: OrgEvent;
    isLoading: boolean;
    error?: number
}

export const orgEventInitialState: OrgEventState = {
    isLoading: false,
    orgEvent: new OrgEventClass()
};

export const reducer = createReducer(
  orgEventInitialState,

    on(OrgEventActions.addOrgEvent, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.addOrgEventSuccess, (state,{orgEvent})=>{return{...state, orgEvent: orgEvent, isLoading: false}}),
    on(OrgEventActions.addOrgEventFailure, (state, {error}) => ({...state, error, success: false})),

    /*
    on(ShiftTypeActions.deleteShiftType, (state) => {return{...state, isLoading: true}}),
    on(ShiftTypeActions.deleteShiftTypeSuccess, (state,{shiftType})=>{return{...state, shiftTypes: state.shiftTypes.filter(item=>item!==shiftType) , isLoading: false}}),
    on(ShiftTypeActions.deleteShiftTypeFailure, (state, {error}) => ({...state, error, success: false})),

     */
);
