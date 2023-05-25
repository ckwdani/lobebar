import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {CountSnacks} from "@frontend-lb-nx/shared/entities";
import {Observable, of, tap} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {SnacksBookerService} from "@frontend-lb-nx/shared/services";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";


export interface SnacksBookerState {
  countSnacks: CountSnacks[];
  isUpdating: boolean;
  loading: boolean;
  error?: HttpErrorResponse;

};

const initialState: SnacksBookerState = {
    countSnacks: [],
    isUpdating: false,
    loading: true,
};

@Injectable()
export class SnacksBookerStore extends ComponentStore<SnacksBookerState> {
  constructor(private snacksBookerService: SnacksBookerService, private  snackBar: MatSnackBar, private datePipe: DatePipe) {
    super(initialState);
  }

    // Selectors

    readonly selectLoading$ = this.select(state => state.loading);

    readonly selectUpdating$ = this.select(state => state.isUpdating);

    readonly countSnacks$ = this.select(state => state.countSnacks);


    readonly  updateLoading = this.updater((state, loading: boolean) => ({
        ...state,
        loading
    }));

    readonly  updateUpdating = this.updater((state, isUpdating: boolean) => ({
        ...state,
        isUpdating: isUpdating
    }));



    readonly  updateAllBooked = this.updater((state) => ({
        ...state,
        isUpdating: false,
        countSnacks: state.countSnacks.map(countSnack => {
          return {
              ...countSnack,
              snacks: countSnack.snacks.map(snack => {
                  return {
                      ...snack,
                      booked: true
                  }
              })
          }
        })
    }));


    readonly updateError = this.updater((state, error: HttpErrorResponse) => ({
        ...state,
        error
    }));


    readonly updateCountSnacks = this.updater((state, countSnacks: CountSnacks[]) => ({
        ...state,
        countSnacks,
        isLoading: false,
        updating: false,
    }));

    readonly setDateSnacksBooked = this.updater((state, countSnacks: {date: Date, unbook: boolean}) => ({
        ...state,
        updating: false,
        countSnacks: state.countSnacks.map(countSnack => {
            const date = (new Date(countSnack.date as unknown as string));
            const check = date.getFullYear() === countSnacks.date.getFullYear() && date.getMonth() === countSnacks.date.getMonth() && date.getDate() === countSnacks.date.getDate();
            if(check){
                return {
                    ...countSnack,
                    snacks: countSnack.snacks.map(snack => {
                        return {
                            ...snack,
                            booked: !countSnacks.unbook
                        }
                    })
                }
            }else{
                return countSnack;
            }
        })
    }));

  readonly loadBookedSnacks$ =  this.effect(($origin: Observable<void>) => {
      return $origin.pipe(
            switchMap(() => this.snacksBookerService.getCountSnacks().pipe(
                tap(countSnacks => {
                    this.updateLoading(false);
                    this.updateUpdating(false);
                    this.updateCountSnacks(countSnacks)
                }),
                catchError(error => {
                    this.updateError(error);
                    return of(error);
                })
            ))
      );
  });

  // effect to book a date
    readonly bookDate = this.effect((countSnacks$: Observable<{ date: Date, unbook: boolean }>) => {
        return countSnacks$.pipe(
            switchMap(countSnacks => {
                this.updateUpdating(true);
                return this.snacksBookerService.setBookedDay(countSnacks.date, countSnacks.unbook).pipe(
                    tap(countSnacksIn => {
                        // this.updateLoading(false);
                        this.updateUpdating(false);
                        this.setDateSnacksBooked(countSnacks);
                        this.snackBar.open("Erfolgreich gebucht", "OK", {duration: 1000});
                    }),
                    catchError(error => {
                        this.snackBar.open("Es ist ein Fehler passiert!", "Close", {duration: 5000});
                        this.updateError(error);
                        return of(error);
                    })
                )
            })
        );
    });


    // set all booked
    readonly setAllBooked = this.effect(($origin: Observable<void>) => {
        return $origin.pipe(
            switchMap(() => {
                this.updateUpdating(true);
                return this.snacksBookerService.setBookAll().pipe(
                    tap(countSnacks => {
                        this.updateAllBooked();
                        this.updateUpdating(false);
                        this.updateLoading(false);

                    }),
                    catchError(error => {
                        this.updateError(error);
                        return of(error);
                    })
                )
            })
        );
    });


}
