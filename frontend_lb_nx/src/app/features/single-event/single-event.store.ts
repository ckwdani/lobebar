import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {OrgEvent} from "@frontend-lb-nx/shared/entities";
import {Observable, of, tap} from "rxjs";
import {OrgEventBackendService} from "@frontend-lb-nx/shared/services";
import {catchError, switchMap} from "rxjs/operators";

export interface SingleEventState {
  event?: OrgEvent,
  isLoading: boolean,
  error?: string,
  showAddShift: boolean,
};

const initialState: SingleEventState = {isLoading: true, showAddShift: false};

@Injectable()
export class SingleEventStore extends ComponentStore<SingleEventState> {
  constructor(protected eventService: OrgEventBackendService) {
    super(initialState);
  }

  // viewModel
    readonly vm$ = this.select(({ event, isLoading, error , showAddShift}) => ({
        event,
        isLoading,
        error,
        showAddShift,
    }));

  // updater to set event
    readonly setEvent = this.updater((state, event: OrgEvent) => ({
        ...state,
        event,
        isLoading: false,
    }));

    // toggle showAddShift
    readonly toggleShowAddShift = this.updater((state) => ({
        ...state,
        showAddShift: !state.showAddShift,
    }));

    // select missing persons to fill up shifts




  // updater to set error
    readonly setError = this.updater((state, error: string) => ({
        ...state,
        error,
        isLoading: false,
    }));

  // effect to fetch event by id
    readonly fetchEvent = this.effect((id$: Observable<string>) =>
        id$.pipe(
            switchMap((id) =>
                this.eventService.getById(id).pipe(
                    tap((event) => this.setEvent(event)),
                    catchError((error) => of(this.setError(error))),
                ),
            ),
        ),
    );


}
