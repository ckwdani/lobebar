import { Component } from '@angular/core';
import {ShiftType} from "@frontend-lb-nx/shared/entities";
import {
  ShiftTypeBackendService
} from "../../../../shared/services/src/lib/backend/entity-backend-services/shifts-type-backend.service";
import {Store} from "@ngrx/store";
import {ShiftTypeAddStore} from './shift-type-add.store';

@Component({
  selector: 'frontend-lb-nx-shift-type-add',
  templateUrl: './shift-type-add.component.html',
  styleUrls: ['./shift-type-add.component.scss'],
  providers: [ShiftTypeAddStore],
})
export class ShiftTypeAddComponent {
  constructor(private  shiftTypeService: ShiftTypeBackendService, private store: ShiftTypeAddStore) {
  }

  model: ShiftType={
    id: "asasd",
    name: "test",
    value: 0,
  }

  sendShiftType(){
    // this.store.addShiftType(this.model)
    //this.shiftTypeService.add(this.model).subscribe(next => next)
  }
}
