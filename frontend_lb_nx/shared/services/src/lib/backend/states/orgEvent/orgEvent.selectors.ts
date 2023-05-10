import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrgEvents from './orgEvent.reducer';

export const selectOrgEventsState = createFeatureSelector<fromOrgEvents.OrgEventsState>(
    fromOrgEvents.orgEventFeatureKey
);

export const selectOrgEvents = createSelector(
    selectOrgEventsState,
    (state: fromOrgEvents.OrgEventsState)=>[...state.pastEvents, ...state.comingEvents]
)

export const selectCommingOrgEvents = createSelector(
    selectOrgEventsState,
    (state: fromOrgEvents.OrgEventsState)=>state.comingEvents
)


export const selectOrgEventsLoading = createSelector(
    selectOrgEventsState,
    (state: fromOrgEvents.OrgEventsState)=>state.isLoading
)

export const selectOrgEventsError = createSelector(
    selectOrgEventsState,
    (state: fromOrgEvents.OrgEventsState)=>state.error
)
