import { Component } from '@angular/core';
import { SnacksBookerStore } from './snacks-booker.store';
import {Store} from "@ngrx/store";
import {selectSnackTypes} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {map} from "rxjs/operators";

@Component({
  selector: 'frontend-lb-nx-snacks-booker',
  templateUrl: './snacks-booker.component.html',
  styleUrls: ['./snacks-booker.component.scss'],
  providers: [SnacksBookerStore],
})
export class SnacksBookerComponent {


  snackTypesDisplay =this.store.select(selectSnackTypes).pipe(map(snackTypes => snackTypes.filter(snackType => snackType.showInBooking).map(snackType => snackType.name)));
  constructor(private snacksBookerStore: SnacksBookerStore, private store: Store) {
    this.snacksBookerStore.loadBookedSnacks$();
  }



}
