import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap} from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as OrgEventActions from './orgEvent.actions';
import {ShiftTypeBackendService} from "../../entity-backend-services/shifts-type-backend.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {addOrgEvent} from "./orgEvent.actions";
import {OrgEventBackendService} from "@frontend-lb-nx/shared/services";


@Injectable()
export class OrgEventEffects {

  loadOrgEvents$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(OrgEventActions.loadOrgEvents),
        switchMap(( ) =>
            this.orgEventService.getTimed(1683116736, 1704067200).pipe(
                map((orgEvents) => {
                  return OrgEventActions.loadOrgEventsSuccess({orgEvents: orgEvents})
                }),
                catchError((error) => of(OrgEventActions.loadOrgEventsFailure({ error })))
            )));
  });


  addOrgEvent$ = createEffect(()=>{
      return this.actions$.pipe(
          ofType(OrgEventActions.addOrgEvent),
          switchMap((action)=>
          this.orgEventService.add(action.orgEvent).pipe(
              map(()=>{
                  return OrgEventActions.addOrgEventSuccess({orgEvent: action.orgEvent});
              }),
              catchError((error)=> of(OrgEventActions.addOrgEventFailure({error})))
          ))
      )
      }
  )
    deleteOrgEvent$ = createEffect(()=>{
            return this.actions$.pipe(
                ofType(OrgEventActions.deleteOrgEvent),
                switchMap((action)=>
                    this.orgEventService.delete(action.orgEvent.id?.toString()??"").pipe(
                        map(()=>{
                            return OrgEventActions.deleteOrgEventSuccess({orgEvent: action.orgEvent});
                        }),
                        catchError((error)=> of(OrgEventActions.deleteOrgEventFailure({error})))
                    ))
            )
        }
    )





  constructor(private actions$: Actions, private orgEventService: OrgEventBackendService) {}
}
