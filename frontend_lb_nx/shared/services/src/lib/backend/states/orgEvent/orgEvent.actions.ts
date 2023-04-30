import { createAction, props } from '@ngrx/store';
import {OrgEvent} from "@frontend-lb-nx/shared/entities";

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