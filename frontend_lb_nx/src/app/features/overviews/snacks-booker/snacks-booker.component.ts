import { Component } from '@angular/core';
import { SnacksBookerStore } from './snacks-booker.store';
import {Store} from "@ngrx/store";
import {
  selectShiftTypesLoading,
  selectSnackTypes
} from "../../../../../shared/services/src/lib/backend/states/shift-types/shift-type.selectors";
import {map} from "rxjs/operators";
import {CountSnacks, SnackType} from "@frontend-lb-nx/shared/entities";
import {selectLoggedIn, selectSnacksLoading} from "@frontend-lb-nx/shared/services";
import {tap} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-snacks-booker',
  templateUrl: './snacks-booker.component.html',
  styleUrls: ['./snacks-booker.component.scss'],
  providers: [SnacksBookerStore],
})
export class SnacksBookerComponent {


  snackTypesDisplay =this.store.select(selectSnackTypes).pipe(map(snackTypes => this.generateSnackTypesDisplayArray(snackTypes)));
  countSnacks$ = this.snacksBookerStore.countSnacks$;
  loading$ = this.snacksBookerStore.selectLoading$;
  loadingSnackTypes$ = this.store.select(selectShiftTypesLoading)
  constructor(private snacksBookerStore: SnacksBookerStore, private store: Store) {
    this.store.select(selectLoggedIn).subscribe(loggedIn => {
        if (loggedIn){

          this.snacksBookerStore.loadBookedSnacks$();
        }
    });

  }



  generateSnackTypesDisplayArray(snackTypes: SnackType[]): {displayedString: string, getter: (element: CountSnacks) => string}[] {

    return snackTypes.filter(snackType => snackType.showInBooking).map(snackType => {
      return  {
        displayedString: snackType.name!,
        getter: (element: CountSnacks) => {
          const firstOrDefault = element.snacks.find(snack => snack.id.uid === snackType.id);
          if (firstOrDefault?.id.uid === snackType.id){
            return firstOrDefault?.count.toString() ?? "";
          }
          else {
            return "";
          }
        }
      };
    });
  }

  getDate(snackCount: CountSnacks){
    return snackCount.date as unknown as string;
  }
}
