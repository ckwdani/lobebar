import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {CountSnacks} from "@frontend-lb-nx/shared/entities";
import {Observable, of, tap} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {SnacksBookerService} from "@frontend-lb-nx/shared/services";
import {HttpErrorResponse} from "@angular/common/http";


export interface SnacksBookerState {
  countSnacks: CountSnacks[];
  loading: boolean;
  error?: HttpErrorResponse;

};

const initialState: SnacksBookerState = {
    countSnacks: [],
    loading: true
};

@Injectable()
export class SnacksBookerStore extends ComponentStore<SnacksBookerState> {
  constructor(private snacksBookerService: SnacksBookerService) {
    super(initialState);
  }

    // Selectors

    readonly selectLoading$ = this.select(state => state.loading);

    readonly countSnacks$ = this.select(state => state.countSnacks);

  // select countsnacks
    readonly selectCounSnacks$ = this.select(state => state.countSnacks);

    readonly  updateLoading = this.updater((state, loading: boolean) => ({
        ...state,
        loading
    }));


    readonly updateError = this.updater((state, error: HttpErrorResponse) => ({
        ...state,
        error
    }));


    readonly updateCountSnacks = this.updater((state, countSnacks: CountSnacks[]) => ({
        ...state,
        countSnacks,
        isLoading: false,
    }));


  readonly loadBookedSnacks$ =  this.effect(($origin: Observable<void>) => {
      return $origin.pipe(
            switchMap(() => this.snacksBookerService.getCountSnacks().pipe(
                tap(countSnacks => {
                    this.updateLoading(false);
                    this.updateCountSnacks(countSnacks)
                }),
                catchError(error => {
                    this.updateError(error);
                    return of(error);
                })
            ))
      );
  });


}
