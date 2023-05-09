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
};

const initialState: SingleEventState = {isLoading: true};

@Injectable()
export class SingleEventStore extends ComponentStore<SingleEventState> {
  constructor(protected eventService: OrgEventBackendService) {
    super(initialState);
  }

  // viewModel
    readonly vm$ = this.select(({ event, isLoading, error }) => ({
        event,
        isLoading,
        error,
    }));

  // updater to set event
    readonly setEvent = this.updater((state, event: OrgEvent) => ({
        ...state,
        event,
        isLoading: false,
    }));


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
