import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {CountSnacks} from "@frontend-lb-nx/shared/entities";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {SnacksBookerService} from "@frontend-lb-nx/shared/services";


export interface SnacksBookerState {
  countSnacks: CountSnacks[];
  loading: boolean;

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


    readonly countSnacks$ = this.select(state => state.countSnacks);

  // select countsnacks
    readonly selectCountSnacks$ = this.select(state => state.countSnacks);


  readonly loadBookedSnacks$ =  this.effect(($origin: Observable<void>) => {
      return $origin.pipe(
            switchMap(() => this.snacksBookerService.getCountSnacks())
      );
  });


}
