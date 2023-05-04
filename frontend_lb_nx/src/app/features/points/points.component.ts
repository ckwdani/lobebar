import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectUser} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss'],
})
export class PointsComponent {
  $userObs = this.store.select(selectUser)

  shifts_num = 5;
  constructor(private store: Store) {
  }
}
