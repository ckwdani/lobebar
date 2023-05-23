import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {
  loadOwnUsedSnacks,
  selectLoggedIn,
  selectUsedSnacks,
  selectUser,
  selectUserLoaded
} from "@frontend-lb-nx/shared/services";
import {map} from "rxjs/operators";
import {combineLatest, first} from "rxjs";

@Component({
  selector: 'frontend-lb-nx-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {
  $userObs = this.store.select(selectUser)



  //TODO: real shiftnumber
  shifts_num = 5;
  constructor(private store: Store) {

  }
}
