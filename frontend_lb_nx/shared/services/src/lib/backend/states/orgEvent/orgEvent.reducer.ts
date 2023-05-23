import { Action, createReducer, on } from '@ngrx/store';
import * as OrgEventActions from './orgEvent.actions';
import {OrgEvent, OrgEventClass, Shift} from "@frontend-lb-nx/shared/entities";
import * as ShiftTypeActions from "../shift-types/shift-type.actions";
import * as ShiftActions from "../shift/shift.actions";
import {changeShiftAssignmentSuccess} from "../shift/shift.actions";

export const orgEventFeatureKey = 'orgEvent';

export interface OrgEventsState {
    comingEvents: OrgEvent[]
    pastEvents: OrgEvent[]
    orgEvent: OrgEvent;

    // those timestamps are for controlling from when the events are loaded
    lowerTimestamp: number;
    higherTimestamp: number;

    isLoading: boolean;
    error?: number
}

const monthSeconds = 60*60*24*30;
export const orgEventInitialState: OrgEventsState = {
    lowerTimestamp: Math.floor((Date.now() / 1000) - monthSeconds * 3),
    higherTimestamp: Math.floor((Date.now() / 1000) + monthSeconds * 9),
    comingEvents: [],
    pastEvents: [],
    isLoading: false,
    orgEvent: new OrgEventClass()
};

export const reducer = createReducer(
  orgEventInitialState,
    on(OrgEventActions.loadOrgEvents, state => ({...state, isLoading: true})),
    on(OrgEventActions.loadOrgEventsSuccess, (state, {orgEventsPast, orgEventsFuture}) => { return {...state, comingEvents: orgEventsFuture, pastEvents: orgEventsPast, isLoading: false}}),
    on(OrgEventActions.loadOrgEventsFailure, (state, {error}) => ({...state, error, success: false})),

    on(OrgEventActions.loadMoreFromPast, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.loadMoreFromFuture, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.loadMoreSuccess, (state, {orgEvents, months}) => {
       if(months > 0){
           return {...state, comingEvents: [...state.comingEvents, ...orgEvents], higherTimeStamp: state.higherTimestamp + monthSeconds * months, isLoading: false}
         }else{
              return {...state, pastEvents: [...orgEvents, ...state.pastEvents], lowerTimestamp: state.lowerTimestamp - monthSeconds * - months, isLoading: false}
       }
    }),

    on(OrgEventActions.addOrgEvent, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.addOrgEventSuccess, (state,{orgEvent})=>{
        const [pastEvents, upcomingEvents] = addToOneArray(orgEvent, state.pastEvents, state.comingEvents);
        return{...state, pastEvents: pastEvents, comingEvents: upcomingEvents, isLoading: false}
    }),
    on(OrgEventActions.addOrgEventFailure, (state, {error}) => ({...state, error, success: false})),

    on(OrgEventActions.deleteOrgEvent, (state) => {return{...state, isLoading: true}}),
    on(OrgEventActions.deleteOrgEventSuccess, (state,{orgEvent})=>{
        const [pastEvents, upcomingEvents] = removeEventFromArrays(orgEvent, state.pastEvents, state.comingEvents);
        return{...state, pastEvents: pastEvents, comingEvents: upcomingEvents, isLoading: false}
    }),
    on(OrgEventActions.editOrgEventSuccess, (state,{orgEvent})=>{
        const [pastEvents, upcomingEvents] = editEvent(orgEvent, state.pastEvents, state.comingEvents);
        return{...state, pastEvents: pastEvents, comingEvents: upcomingEvents, isLoading: false}
    }),
    on(OrgEventActions.deleteOrgEventFailure, (state, {error}) => ({...state, error, success: false})),

    /**
     * Updates the orgEvent in the state
     * Comes from [ShiftActions]
     */
    on(ShiftActions.addShiftToEventSuccess, (state, {shift})=>{
        const [pastEvents, upcomingEvents] = addShifttoEvent(shift, state.pastEvents, state.comingEvents);
        return {...state, pastEvents: pastEvents, comingEvents: upcomingEvents}}
    ),

    on(ShiftActions.EditDescSuccess, (state, {shift})=>{
        const [pastEvents, upcomingEvents] = editShiftFromEvent(shift, state.pastEvents, state.comingEvents);
        return {...state, pastEvents: pastEvents, comingEvents: upcomingEvents}
    }),

    on(ShiftActions.deleteShiftFromEventSuccess, (state, {shift})=>{
        const [pastEvents, upcomingEvents] = deleteShiftFromEvent(shift, state.pastEvents, state.comingEvents);
        return {...state, pastEvents: pastEvents, comingEvents: upcomingEvents}}
    ),

    on(ShiftActions.changeShiftAssignmentSuccess, (state, {shift})=>{
        const [pastEvents, upcomingEvents] = assignShift(shift, state.pastEvents, state.comingEvents);
        return {...state, pastEvents: pastEvents, comingEvents: upcomingEvents}}
    ),



);

/**
 * Adds an event to one of the arrays, this cant be done directly in the reducer, because the date has to be compared
 * @param orgevent
 * @param pastEvents
 * @param upcomingEvents
 */
export function addToOneArray(orgevent: OrgEvent, pastEvents: OrgEvent[], upcomingEvents: OrgEvent[]): [OrgEvent[], OrgEvent[]]{
    const pastEventsMut = [...pastEvents];
    const upcomingEventsMut = [...upcomingEvents];
    if (orgevent.start.getTime() < Date.now()){
        pastEventsMut.push(orgevent);
    }else{
        upcomingEventsMut.push(orgevent);
    }
    return [pastEventsMut, upcomingEventsMut];
}


/**
 * If shift is assigned or unassiged this is called to update the state
 * @param shift
 * @param pastEvents
 * @param upcomingEvents
 */
export function assignShift(shift: Shift, pastEvents: OrgEvent[], upcomingEvents: OrgEvent[]): [OrgEvent[], OrgEvent[]]{
    return [
        pastEvents.map(event => {
            if(event.id === shift.orgEvent?.id){
                return {...event, shifts: event.shifts?.map(s => s.id === shift.id ? shift : s)}
            }
            return event;
        }),
        upcomingEvents.map(event => {
            if(event.id === shift.orgEvent?.id){
                return {...event, shifts: event.shifts?.map(s => s.id === shift.id ? shift : s)}
            }
            return event;
        })
    ];
}

export function editEvent(orgEvent: OrgEvent, pastEvents: OrgEvent[], upcomingEvents: OrgEvent[]): [OrgEvent[], OrgEvent[]]{
    return [
        pastEvents.map(event => {
            if(event.id === orgEvent.id){
                return {...event, name: orgEvent.name, end: orgEvent.end};
            }
            return event;
        }),
        upcomingEvents.map(event => {
            if(event.id === orgEvent.id){
                return {...event, name: orgEvent.name, end: orgEvent.end};
            }
            return event;
        })
    ];
}


/**
 * delete shift from event that is either in past or future
 */
export function deleteShiftFromEvent(shift: Shift, pastEvents: OrgEvent[], upcomingEvents: OrgEvent[]): [OrgEvent[], OrgEvent[]]{
    return [
        pastEvents.map(event => {
            if(event.id === shift.orgEvent?.id){
                return {...event, shifts: event.shifts?.filter(s => s.id !== shift.id)};
            }
            return event;
        }),
        upcomingEvents.map(event => {
            if(event.id === shift.orgEvent?.id){
                return {...event, shifts: event.shifts?.filter(s => s.id !== shift.id)};
            }
            return event;
        })
    ];
}

/**
 * edit shift from event that is either in past or future
 */
export function editShiftFromEvent(shift: Shift, pastEvents: OrgEvent[], upcomingEvents: OrgEvent[]): [OrgEvent[], OrgEvent[]]{
    return [
        pastEvents.map(event => {
            if(event.id === shift.orgEvent?.id){
                return {...event, shifts: event.shifts?.map(s => s.id !==shift.id ? s: shift)};
            }
            return event;
        }),
        upcomingEvents.map(event => {
            if(event.id === shift.orgEvent?.id){
                return {...event, shifts: event.shifts?.map(s => s.id !==shift.id ? s: shift)};
            }
            return event;
        })
    ];
}

/**
 * finds the correct event and adds the shift to it
 * @param shift
 * @param pastEvents
 * @param upcomingEvents
 */
export  function  addShifttoEvent(shift: Shift, pastEvents: OrgEvent[], upcomingEvents: OrgEvent[]): [OrgEvent[], OrgEvent[]]{


    const pastEventsMut = pastEvents.map(event => {
        if(event.id === shift.orgEvent?.id){
            return {...event, shifts: [...event.shifts??[], shift]};
        }
        return event;
    });
    const upcomingEventsMut = upcomingEvents.map(event => {
        if(event.id === shift.orgEvent?.id){
            return {...event, shifts: [...event.shifts??[], shift]};

        }
        return event;
    });
    return [pastEventsMut, upcomingEventsMut];
}

/**
 * Removes an event from one of the arrays, this cant be done directly in the reducer, because the date has to be compared
 * @param orgevent
 * @param pastEvents
 * @param upcomingEvents
 */
export function removeEventFromArrays(orgevent: OrgEvent, pastEvents: OrgEvent[], upcomingEvents: OrgEvent[]): [OrgEvent[], OrgEvent[]]{

        pastEvents = pastEvents.filter(event => event.id !== orgevent.id);
        upcomingEvents = upcomingEvents.filter(event => event.id !== orgevent.id);

        return [pastEvents, upcomingEvents];
}
