import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectUser} from "@frontend-lb-nx/shared/services";

@Component({
  selector: 'frontend-lb-nx-own-user-overview',
  templateUrl: './own-user-overview.component.html',
  styleUrls: ['./own-user-overview.component.scss'],
})
export class OwnUserOverviewComponent {

  $userObs = this.store.select(selectUser);

  // constructor with store
    constructor(public store: Store){

    }
}
