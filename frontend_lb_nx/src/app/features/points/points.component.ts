import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {loadOwnUsedSnacks, selectUsedSnacks, selectUser} from "@frontend-lb-nx/shared/services";
import {map} from "rxjs/operators";

@Component({
  selector: 'frontend-lb-nx-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {
  $userObs = this.store.select(selectUser)
  $ownUsedSnacks = this.store.select(selectUsedSnacks).pipe(map(snacks => snacks??[]));

  //TODO: real shiftnumber
  shifts_num = 5;
  constructor(private store: Store) {
    this.store.dispatch(loadOwnUsedSnacks())
  }
}
