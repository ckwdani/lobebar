import { Action, createReducer, on } from '@ngrx/store';
import * as OrgEventActions from './orgEvent.actions';
import {OrgEvent, OrgEventClass} from "@frontend-lb-nx/shared/entities";
import * as ShiftTypeActions from "../shift-types/shift-type.actions";

export const orgEventFeatureKey = 'orgEvent';

export interface OrgEventsState {
    comingEvents: OrgEvent[]
    orgEvent: OrgEvent;
    isLoading: boolean;
    error?: number
}

export const orgEventInitialState: OrgEventsState = {
    comingEvents: [],
    isLoading: false,
    orgEvent: new OrgEventClass()
};

export const reducer = createReducer(
  orgEventInitialState,
    on(OrgEventActions.loadOrgEvents, state => state),
    on(OrgEventActions.loadOrgEventsSuccess, (state, {orgEvents}) => { return {...state, comingEvents: orgEvents, isLoading: false}}),
    on(OrgEventActions.loadOrgEventsFailure, (state, {error}) => ({...state, error, success: false})),

    on(OrgEventActions.addOrgEvent, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.addOrgEventSuccess, (state,{orgEvent})=>{return{...state, orgEvent: orgEvent, isLoading: false}}),
    on(OrgEventActions.addOrgEventFailure, (state, {error}) => ({...state, error, success: false})),

    on(OrgEventActions.deleteOrgEvent, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.deleteOrgEventSuccess, (state,{orgEvent})=>{return{...state, orgEvent: state.orgEvent , isLoading: false}}),
    on(OrgEventActions.deleteOrgEventFailure, (state, {error}) => ({...state, error, success: false})),
);
