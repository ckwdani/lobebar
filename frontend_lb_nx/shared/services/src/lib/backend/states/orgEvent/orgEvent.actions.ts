import { createAction, props } from '@ngrx/store';
import {OrgEvent, ShiftType} from "@frontend-lb-nx/shared/entities";


export const loadOrgEvents = createAction(
    '[OrgEvents] Load OrgEvents'
);

export const loadOrgEventsSuccess = createAction(
    '[OrgEvents] Load OrgEvents Success',
    props<{ orgEvents: OrgEvent[] }>()
);

export const loadOrgEventsFailure = createAction(
    '[OrgEvents] Load OrgEvents Failure',
    props<{ error: number }>()
);

export const addOrgEvent = createAction(
    '[OrgEvent] Adding OrgEvent',
    props<{orgEvent: OrgEvent}>()
);

export const addOrgEventSuccess = createAction(
    '[OrgEvent] Adding OrgEvent Success',
    props<{orgEvent: OrgEvent}>()
)

export const addOrgEventFailure = createAction(
    '[OrgEvent] Adding OrgEvent Failure',
    props<{error: number}>()
)

export const deleteOrgEvent = createAction(
    '[OrgEvent] Deleting OrgEvent',
    props<{orgEvent: OrgEvent}>()
);

export const deleteOrgEventSuccess = createAction(
    '[OrgEvent] Deleting OrgEvent Success',
    props<{orgEvent: OrgEvent}>()
)

export const deleteOrgEventFailure = createAction(
    '[OrgEvent] Deleting OrgEvent Failure',
    props<{error: number}>()
)