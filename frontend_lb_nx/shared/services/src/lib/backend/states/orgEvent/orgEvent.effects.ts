import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, concatMap, switchMap, withLatestFrom, filter} from 'rxjs/operators';
import {Observable, EMPTY, of, combineLatest} from 'rxjs';
import * as OrgEventActions from './orgEvent.actions';
import {ShiftTypeBackendService} from "../../entity-backend-services/shifts-type-backend.service";
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {addOrgEvent} from "./orgEvent.actions";
import {OrgEventBackendService, selectOrgEventsState} from "@frontend-lb-nx/shared/services";
import {State, Store} from "@ngrx/store";


@Injectable()
export class OrgEventEffects {

  loadOrgEvents$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(OrgEventActions.loadOrgEvents),
        withLatestFrom(this.store.select(selectOrgEventsState)),
        switchMap(([, state] ) => {
                return combineLatest([this.orgEventService.getTimed(state.lowerTimestamp, Math.floor(Date.now() / 1000)), this.orgEventService.getTimed(Math.floor(Date.now() / 1000), state.higherTimestamp)]).pipe(
                    // filter the states where one of the two is undefined
                    filter(([orgEvents1, orgEvents2]) => orgEvents1 !== undefined && orgEvents2 !== undefined),
                    map(([orgEventsPast, orgEventsFuture]) => {
                        return OrgEventActions.loadOrgEventsSuccess({orgEventsPast: orgEventsPast, orgEventsFuture: orgEventsFuture})
                    }),
                    catchError((error) => of(OrgEventActions.loadOrgEventsFailure({error})))
                )
            }
        ));
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

    loadMorePast$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(OrgEventActions.loadMoreFromPast),
            withLatestFrom(this.store.select(selectOrgEventsState)),
            switchMap(([action, storeStuff])=>
                this.orgEventService.getTimed(storeStuff.lowerTimestamp - 60*60*24*30*action.months, storeStuff.lowerTimestamp).pipe(
                    map((orgEvents) => {
                        return OrgEventActions.loadMoreSuccess({orgEvents: orgEvents, months: -action.months})
                    }),
                    catchError((error) => of(OrgEventActions.loadOrgEventsFailure({ error })))
                )));
    });

    loadMoreFuture$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(OrgEventActions.loadMoreFromFuture),
            withLatestFrom(this.store.select(selectOrgEventsState)),
            switchMap(([action, storeStuff])=>
                this.orgEventService.getTimed(storeStuff.higherTimestamp , storeStuff.higherTimestamp + 60*60*24*30*action.months).pipe(
                    map((orgEvents) => {
                        return OrgEventActions.loadMoreSuccess({orgEvents: orgEvents, months: action.months})
                    }),
                    catchError((error) => of(OrgEventActions.loadOrgEventsFailure({ error })))
                )));
    });




  constructor(private actions$: Actions, private orgEventService: OrgEventBackendService, private store: Store) {}
}
